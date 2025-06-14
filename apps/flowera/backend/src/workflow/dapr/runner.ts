import type { TWorkflow, WorkflowActivityContext, WorkflowContext, WorkflowRuntime } from "@dapr/dapr";
import type { IWorkflowGraph, IWorkflowNode } from "../nodes/_all";
import type { TWorkflowActivity } from "@dapr/dapr/types/workflow/Activity.type";
import { findRootGraphNodes } from "../utils/graph-util";
import type { IDaprWorkflowRunnerContext } from "./types";

export const createDaprWorkflowFromGraph = (graph: IWorkflowGraph) => {
  const activityByName = new Map<string, TWorkflowActivity<any, any>>();

  const daprWorkflow: TWorkflow = async function* (ctx: WorkflowContext, payload: any): any {
    debugger;
    const workflowResult = new Map<string, any>();
    const graphRoots = findRootGraphNodes(graph);
    for (const rootNode of graphRoots) {
      const result = yield runGraphNode({
        graph,
        dapr: ctx,
        graphNode: rootNode,
        activityByName,
        payload,
      });
      workflowResult.set(rootNode.name, result);
    }
    return { sonuc: true };
  };

  for (const node of graph.nodes) {
    const activity = worflowNodeToDaprActivity(node);
    activityByName.set(node.name, activity);
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
  workflowWorker.registerWorkflowWithName(workflow.name, workflow.daprWorkflow);
  for (const kv of workflow.activities.entries()) {
    const activityName = kv[0];
    const activity = kv[1];
    workflowWorker.registerActivityWithName(activityName, activity);
  }
};

const runGraphNode = function* (ctx: IDaprWorkflowRunnerContext) {
  debugger;
  const graphNodeResult = new Map<string, any>();

  const activity = ctx.activityByName.get(ctx.graphNode.name);
  if (activity) {
    const sourceActivityResult = yield runActivity(ctx.dapr, activity, ctx.graphNode, ctx.payload);

    const outputEdges = ctx.graph.edges.filter((edge) => edge.source === ctx.graphNode.name);
    for (const edge of outputEdges) {
      const graphNode = ctx.graph.nodes.find((node) => node.name === edge.target);
      if (graphNode) {
        const result = yield runGraphNode({ ...ctx, graphNode, payload: sourceActivityResult });
        graphNodeResult.set(graphNode.name, result);
      }
    }
  }
  return graphNodeResult;
};

const worflowNodeToDaprActivity = (node: IWorkflowNode): TWorkflowActivity<any, any> => {
  // TODO node.baseType dan başlayarak node tipine göre işlem yaptırılacak. mail gönder, http request, http response, http webhook, wait?, if?, switch?
  return async (_: WorkflowActivityContext, request: any) => {
    const result = true;
    return result;
  };
};

const runActivity = function* (
  daprContext: WorkflowContext,
  activity: TWorkflowActivity<any, any>,
  node: IWorkflowNode,
  payload: any,
) {
  // TODO callActivity yerine waitForExternalEvent whenAll vs olabilecek
  /* TODO activity işlemleri:
            - direk çağrılabilir(ctx.callActivity)
            - node tipi if/switch ise koşullu çağrılabilir
            - node tipi wait ise beklemeye geçilebilir,
            - node tipi return ise sonuç return edilebilir.
        */
  if (node.baseType === "condition") {
    if (node.conditionType === "if") {
    }
  }
  const taskResult = yield daprContext.callActivity(activity, payload);
  return taskResult;
};

/** MAIL
    "Sender": "tys.info@inferatech.com.tr",
    "Address": "smtp-mail.outlook.com:587",
    "User": "tys.info@inferatech.com.tr",
    "Password": "123.123Ti.!",
    "Secure": "1",
    "Base64": ""
 */
