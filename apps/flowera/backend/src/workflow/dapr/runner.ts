import type { TWorkflow, WorkflowActivityContext, WorkflowContext } from "@dapr/dapr";
import type { IWorkflowGraph, IWorkflowNode } from "../nodes/_all";
import type { TWorkflowActivity } from "@dapr/dapr/types/workflow/Activity.type";
import { findRootGraphNodes } from "../utils/graph-util";
import type { IDaprWorkflowRunnerContext } from "./types";

export const createDaprWorkflowFromGraph = (wf: IWorkflowGraph) => {
  const workflowResult = new Map<string, any>();
  const activityByName = new Map<string, TWorkflowActivity<any, any>>();

  const daprWorkflow: TWorkflow = async function* (ctx: WorkflowContext, payload: any): any {
    const graphRoots = findRootGraphNodes(wf);
    for (const rootNode of graphRoots) {
      const result = yield runGraphRootNode({
        dapr: ctx,
        graphNode: rootNode,
        activityByName,
        payload,
      });
      workflowResult.set(rootNode.name, result);
    }
  };

  for (const node of wf.nodes) {
    const activity = worflowNodeToDaprActivity(node);
    activityByName.set(node.name, activity);
  }

  return {
    name: wf.name,
    workflow: daprWorkflow,
    activities: activityByName,
    workflowResult,
  };
};

const worflowNodeToDaprActivity = (node: IWorkflowNode): TWorkflowActivity<any, any> => {
  // TODO node.baseType dan başlayarak node tipine göre işlem yaptırılacak
  return async (_: WorkflowActivityContext, request: any) => {
    return true;
  };
};

const runGraphRootNode = function* (ctx: IDaprWorkflowRunnerContext) {
  const activity = ctx.activityByName.get(ctx.graphNode.name);
  if (activity) {
    // TODO activityInput hesaplanacak
    const activityInput = {};
    yield ctx.dapr.callActivity(activity, activityInput);
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
