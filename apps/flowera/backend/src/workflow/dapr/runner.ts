import type { TWorkflow, WorkflowActivityContext, WorkflowContext } from "@dapr/dapr";
import type { IWorkflowGraph, IWorkflowNode } from "../nodes/_all";
import type { TWorkflowActivity } from "@dapr/dapr/types/workflow/Activity.type";
import { findRootGraphNodes } from "../utils/graph-util";
import type { IDaprActivityRunner, IDaprWorkflowRunnerContext } from "./types";

export const createDaprWorkflowFromGraph = (wf: IWorkflowGraph) => {
  const workflowResult = new Map<string, any>();
  const activityByName = new Map<string, IDaprActivityRunner>();

  const daprWorkflow: TWorkflow = async function* (daprContext: WorkflowContext, payload: any): any {
    for (const node of wf.nodes) {
      const activity = activityByName.get(node.name);
      if (activity) {
        activity.ctx.dapr = daprContext;
      }
    }

    const graphRoots = findRootGraphNodes(wf);
    for (const rootNode of graphRoots) {
      const result = yield runGraphRootNode(activityByName, rootNode.name);
      workflowResult.set(rootNode.name, result);
    }
  };

  for (const node of wf.nodes) {
    const activity = worflowNodeToDaprActivity({
      dapr: undefined,
      graphNode: node,
    });
    activityByName.set(node.name, activity);
  }

  return {
    name: wf.name,
    workflow: daprWorkflow,
    activities: activityByName,
    workflowResult,
  };
};

const worflowNodeToDaprActivity = (ctx: IDaprWorkflowRunnerContext): IDaprActivityRunner => {
  // TODO node.baseType dan başlayarak node tipine göre işlem yaptırılacak
  const activity = {
    ctx,
    runner: async (_: WorkflowActivityContext, request: any) => {
        yield ctx.dapr?.callActivity(ctx.graphNode, request);
      return true;
    },
  };

  return activity;
};

const runGraphRootNode = function* (activityByName: Map<string, IDaprActivityRunner>, nodeName: string) {
  const activity = activityByName.get(nodeName);
  if (activity?.ctx.dapr) {
    // TODO activityInput hesaplanacak
    const activityInput = {};
    yield activity.ctx.dapr.callActivity(activity.runner, activityInput);
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
