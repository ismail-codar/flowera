import type { TWorkflow, WorkflowActivityContext, WorkflowContext, WorkflowRuntime } from "@dapr/dapr";
import type { IWorkflowGraph, IWorkflowNode } from "../nodes/_all";
import type { TWorkflowActivity } from "@dapr/dapr/types/workflow/Activity.type";
import { findRootGraphNodes } from "../utils/graph-util";
import type { IDaprWorkflowRunnerContext as IDaprWorkflowRunnerInput } from "./types";
import { activityRegistry } from "./activity-registry";
import type { IRouter } from "express";
import type { IWorkflowIfNode } from "../nodes/flow";

export const createDaprWorkflowFromGraph = (graph: IWorkflowGraph, httpServer: IRouter) => {
  const daprActivities = new Map<string, TWorkflowActivity<any, any>>();

  const daprWorkflow: TWorkflow = async function* (daprContext: WorkflowContext, payload: any): any {
    const workflowInstanceId = daprContext.getWorkflowInstanceId();
    console.log({ workflowInstanceId });
    const workflowResult = new Map<string, any>();
    const graphRoots = findRootGraphNodes(graph);

    for (const rootNode of graphRoots) {
      const graphNodeResult = new Map<string, any>();
      const stack: IDaprWorkflowRunnerInput[] = [
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

        const activity = daprActivities.get(currentStackItem.graphNode.activityKey);
        if (!activity) continue;

        let sourceActivityResult: any = null;
        // const sourceActivityResult = runActivity(ctx.dapr, activity, ctx.graphNode, ctx.payload);
        // TODO callActivity yerine waitForExternalEvent whenAll vs olabilecek
        /* TODO activity işlemleri:
            - direk çağrılabilir(ctx.callActivity)
            - node tipi if/switch ise koşullu çağrılabilir
            - node tipi wait ise beklemeye geçilebilir,
            - node tipi return ise sonuç return edilebilir.
        */
        if (currentStackItem.graphNode.baseType === "response") {
          if (currentStackItem.graphNode.responseType === "webhookResponse") {
            // webhook cevap alınması
            const sourceGraphNodeName = graph.edges.find(
              (edge) => edge.target === currentStackItem.graphNode.name,
            )?.source;
            sourceActivityResult = yield daprContext.waitForExternalEvent(`webhook_${sourceGraphNodeName}`);
            console.log("webhook", currentStackItem.graphNode.name, sourceActivityResult);
          } else if (currentStackItem.graphNode.responseType === "httpResponse") {
            // TODO son aktivite olup worflow result döndürtsün şeklinde de kullanılabilir
            sourceActivityResult = yield daprContext.callActivity(activity, { ...currentStackItem });
          } else {
            throw new Error(`Unsupported response type: ${currentStackItem.graphNode.responseType}`);
          }
        } else if (currentStackItem.graphNode.baseType === "condition") {
          if (currentStackItem.graphNode.conditionType === "if") {
            // if trueBranch falseBranch yönlendirmesi
            sourceActivityResult = yield daprContext.callActivity(activity, { ...currentStackItem });
            if (sourceActivityResult && "result" in sourceActivityResult) {
              const ifNode = currentStackItem.graphNode as IWorkflowIfNode;
              const nextNode = sourceActivityResult.result
                ? graph.nodes.find((node) => node.name === ifNode.properties.trueBranch)
                : graph.nodes.find((node) => node.name === ifNode.properties.falseBranch);
              stack.push({
                graphNode: nextNode as IWorkflowNode<string>,
                payload: sourceActivityResult,
              });
            }
          } else {
            throw new Error(`Unsupported condition type: ${currentStackItem.graphNode.conditionType}`);
          }
          // condition tiplerinde stack e eklenme yukardaki gibi özel yapılır
          continue;
        } else {
          sourceActivityResult = yield daprContext.callActivity(activity, { ...currentStackItem });
          graphNodeResult.set(currentStackItem.graphNode.name, sourceActivityResult);
        }

        const outputEdges = graph.edges.filter((edge) => edge.source === currentStackItem.graphNode.name);
        for (const edge of outputEdges) {
          const nextNode = graph.nodes.find((node) => node.name === edge.target);
          if (nextNode) {
            stack.push({
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
    const activity = activityRegistry.get(node.activityKey);
    daprActivities.set(node.activityKey || node.name, activity);
  }

  return {
    graph,
    daprWorkflow,
    daprActivities,
  };
};

export const registerWorkflowToDapr = (
  workflowWorker: WorkflowRuntime,
  workflowByName: Map<string, ReturnType<typeof createDaprWorkflowFromGraph>>,
  workflowGraph: IWorkflowGraph,
  httpServer: IRouter,
) => {
  const workflow = createDaprWorkflowFromGraph(workflowGraph, httpServer);
  workflowByName.set(workflowGraph.name, workflow);
  // registerWorkflowWithName ile kaydedilen workflow workflowClient.scheduleNewWorkflow(workflowName, { input }); şeklinde çağrılıyor
  workflowWorker.registerWorkflowWithName(workflowGraph.name, workflow.daprWorkflow);
  for (const kv of workflow.daprActivities.entries()) {
    const activityKey = kv[0];
    const activity = kv[1];
    if (!activity) {
      console.warn(`Activity ${activityKey} not found`);
      continue;
    }
    workflowWorker.registerActivityWithName(activityKey, activity);
  }
};
