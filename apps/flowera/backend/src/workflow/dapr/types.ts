import type { WorkflowContext } from "@dapr/dapr";
import type { IWorkflowGraph, IWorkflowNode } from "../nodes/_all";
import type { TWorkflowActivity } from "@dapr/dapr/types/workflow/Activity.type";

export interface IDaprWorkflowRunnerContext {
  graph: IWorkflowGraph;
  dapr: WorkflowContext;
  graphNode: IWorkflowNode;
  activityByName: Map<string, TWorkflowActivity<any, any>>;
  payload: any;
}
