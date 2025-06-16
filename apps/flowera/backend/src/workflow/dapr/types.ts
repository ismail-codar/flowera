import type { WorkflowContext } from "@dapr/dapr";
import type { IWorkflowGraph, IWorkflowNode } from "../nodes/_all";
import type { TWorkflowActivity } from "@dapr/dapr/types/workflow/Activity.type";

export interface IDaprWorkflowRunnerContext<G = IWorkflowNode, P = unknown> {
  graphNode: G;
  payload: P;
}
