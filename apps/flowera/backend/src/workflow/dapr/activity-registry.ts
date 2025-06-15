import { WorkflowActivityContext } from "@dapr/dapr";

// TODO node.baseType dan başlayarak node tipine göre işlem yaptırılacak. mail gönder, http request, http response, http webhook, wait?, if?, switch?
export const activityRegistry = new Map<string, any>();

activityRegistry.set("manuelTrigger", async function manuelTrigger(_: WorkflowActivityContext, request: any) {
  debugger;
  const result = true;
  return result;
});
