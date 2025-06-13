import type { WorkflowContext } from "@dapr/dapr";
import { IWorkflowNode } from "../nodes/_all";
import { TWorkflowActivity } from "@dapr/dapr/types/workflow/Activity.type";

export interface IDaprWorkflowRunnerContext {
  dapr: WorkflowContext;
  graphNode: IWorkflowNode<any>;
  activityByName: Map<string, TWorkflowActivity<any, any>>;
  payload: any;
}
