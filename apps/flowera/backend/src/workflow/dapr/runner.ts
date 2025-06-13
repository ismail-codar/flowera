import type { TWorkflow } from "@dapr/dapr";
import type { IWorkflow } from "../nodes/_all";
import type { TWorkflowActivity } from "@dapr/dapr/types/workflow/Activity.type";

export const createDaprWorkflow = (wf: IWorkflow<any>) => {
  const daprWorkflow = {} as TWorkflow;
  const daprActivities: TWorkflowActivity<any, any>[] = [];

  return {
    workflow: daprWorkflow,
    activities: daprActivities,
  };
};
