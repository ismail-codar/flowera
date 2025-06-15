import type { WorkflowActivityContext } from "@dapr/dapr";

// TODO node.baseType dan başlayarak node tipine göre işlem yaptırılacak. mail gönder, http request, http response, http webhook, wait?, if?, switch?
export const activityRegistry = new Map<string, any>();

activityRegistry.set("trigger_manuel", async function trigger_manuel(_: WorkflowActivityContext, request: any) {
  return { trigger_manuel: new Date() };
});

// action_mail action type
activityRegistry.set("action_mail", async function action_mail(_: WorkflowActivityContext, request: any) {
  return { action_mail: new Date() };
});

// response_webhookResponse response type
activityRegistry.set(
  "response_webhookResponse",
  async function response_webhookResponse(_: WorkflowActivityContext, request: any) {
    return { response_webhookResponse: new Date() };
  },
);

// condition_if condition type
activityRegistry.set("condition_if", async function condition_if(_: WorkflowActivityContext, request: any) {
  return { condition_if: new Date() };
});

// response_httpResponse response type
activityRegistry.set(
  "response_httpResponse",
  async function response_httpResponse(_: WorkflowActivityContext, request: any) {
    return { response_httpResponse: new Date() };
  },
);
