import type { TWorkflow, WorkflowActivityContext, WorkflowContext } from "@dapr/dapr";
import type { IWorkflowGraph, IWorkflowNode } from "../nodes/_all";
import type { TWorkflowActivity } from "@dapr/dapr/types/workflow/Activity.type";

export const createDaprWorkflowFromGraph = (wf: IWorkflowGraph<any>) => {
  const activityByName = new Map<string, TWorkflowActivity<any, any>>();
  for (const node of wf.nodes) {
    const activity = worflowNodeToDaprActivity(node);
    activityByName.set(node.name, activity);
  }
  const daprWorkflow: TWorkflow = async function* (ctx: WorkflowContext, payload: any): any {
    // TODO implement
    const instanceId = ctx.getWorkflowInstanceId();
    for (const node of wf.nodes) {
      const activity = activityByName.get(node.name);
      if (activity) {
        // TODO activityInput hesaplanacak.
        const activityInput = {};
        /* TODO activity işlemleri: 
            - direk çağrılabilir(ctx.callActivity) 
            - node tipi if/switch ise koşullu çağrılabilir
            - node tipi waith ise beklemeye geçilebilir, 
            - node tipi return ise sonuç return edilebilir.
        */
        yield ctx.callActivity(activity, activityInput);
      }
    }
  };

  return {
    name: wf.name,
    workflow: daprWorkflow,
    activities: activityByName,
  };
};

const worflowNodeToDaprActivity = (node: IWorkflowNode<any>): TWorkflowActivity<any, any> => {
  // TODO node.baseType dan başlayarak node tipine göre işlem yaptırılacak
  return async (_: WorkflowActivityContext, request: any) => {
    return true;
  };
};
