import type { TWorkflow, WorkflowActivityContext, WorkflowContext, WorkflowRuntime } from "@dapr/dapr";
import type { IWorkflowGraph, IWorkflowNode } from "../nodes/_all";
import type { TWorkflowActivity } from "@dapr/dapr/types/workflow/Activity.type";
import { findRootGraphNodes } from "../utils/graph-util";
import type { IDaprWorkflowRunnerContext } from "./types";
import { activityRegistry } from "./activity-registry";

export const createDaprWorkflowFromGraph = (graph: IWorkflowGraph) => {
  const activityByName = new Map<string, TWorkflowActivity<any, any>>();

  const daprWorkflow: TWorkflow = async function* (daprContext: WorkflowContext, payload: any): any {
    const workflowResult = new Map<string, any>();
    const graphRoots = findRootGraphNodes(graph);
    for (const rootNode of graphRoots) {
      const graphNodeResult = new Map<string, any>();
      const stack: IDaprWorkflowRunnerContext[] = [
        {
          graphNode: rootNode,
          payload,
        },
      ];

      while (stack.length > 0) {
        const currentStackItem = stack.pop();
        if (!currentStackItem) continue;

        // Eğer zaten bu node işlendi ise atla
        if (graphNodeResult.has(currentStackItem.graphNode.name)) continue;

        const activity = activityByName.get(currentStackItem.graphNode.name);
        if (!activity) continue;

        // const sourceActivityResult = runActivity(ctx.dapr, activity, ctx.graphNode, ctx.payload);
        // TODO callActivity yerine waitForExternalEvent whenAll vs olabilecek
        /* TODO activity işlemleri:
            - direk çağrılabilir(ctx.callActivity)
            - node tipi if/switch ise koşullu çağrılabilir
            - node tipi wait ise beklemeye geçilebilir,
            - node tipi return ise sonuç return edilebilir.
        */
        const sourceActivityResult = yield daprContext.callActivity(activity, {});

        graphNodeResult.set(currentStackItem.graphNode.name, sourceActivityResult);

        const outputEdges = graph.edges.filter((edge) => edge.source === currentStackItem.graphNode.name);
        for (const edge of outputEdges) {
          const nextNode = graph.nodes.find((node) => node.name === edge.target);
          if (nextNode) {
            stack.push({
              ...currentStackItem,
              graphNode: nextNode,
              payload: sourceActivityResult,
            });
          }
        }
      }

      workflowResult.set(rootNode.name, graphNodeResult);
    }
    return { sonuc: true };
  };

  for (const node of graph.nodes) {
    let nodeKey = "";
    if (node.baseType === "trigger") {
      if (node.triggerType === "manuel") {
        nodeKey = "manuelTrigger";
      }
    }
    const activity = activityRegistry.get(nodeKey);
    activityByName.set(node.key || node.name, activity);
  }

  return {
    name: graph.name,
    daprWorkflow,
    activities: activityByName,
  };
};

export const registerWorkflowToDapr = (
  workflowWorker: WorkflowRuntime,
  workflowByName: Map<string, ReturnType<typeof createDaprWorkflowFromGraph>>,
  workflowGraph: IWorkflowGraph,
) => {
  const workflow = createDaprWorkflowFromGraph(workflowGraph);
  workflowByName.set(workflow.name, workflow);
  // registerWorkflowWithName ile kaydedilen workflow workflowClient.scheduleNewWorkflow(workflowName, { input }); şeklinde çağrılıyor
  workflowWorker.registerWorkflowWithName(workflow.name, workflow.daprWorkflow);
  for (const kv of workflow.activities.entries()) {
    const activityName = kv[0];
    const activity = kv[1];
    if (!activity) {
      console.warn(`Activity ${activityName} not found`);
      continue;
    }
    workflowWorker.registerActivityWithName(activityName, activity);
  }
};

/** MAIL
    "Sender": "tys.info@inferatech.com.tr",
    "Address": "smtp-mail.outlook.com:587",
    "User": "tys.info@inferatech.com.tr",
    "Password": "123.123Ti.!",
    "Secure": "1",
    "Base64": ""
 */
