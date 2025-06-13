import type { WorkflowContext } from "@dapr/dapr";
import { IWorkflowNode } from "../nodes/_all";
import { TWorkflowActivity } from "@dapr/dapr/types/workflow/Activity.type";

export interface IDaprWorkflowRunnerContext {
  dapr: WorkflowContext | undefined;
  graphNode: IWorkflowNode<any>;
}

export interface IDaprActivityRunner {
  ctx: IDaprWorkflowRunnerContext;
  runner: TWorkflowActivity<any, any>;
}
