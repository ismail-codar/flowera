import type { WorkflowActivityContext } from "@dapr/dapr";
import nodemailer from "nodemailer";
import type { IDaprWorkflowRunnerContext } from "./types";
import type { IWorkflowMailNode } from "../nodes/action";
import type { IWorkflowIfNode } from "../nodes/flow";
import { compileTemplate } from "../utils/graph-util";

export const activityRegistry = new Map<string, any>();

activityRegistry.set("trigger_manuel", async function trigger_manuel(_: WorkflowActivityContext, request: any) {
  return { trigger_manuel: new Date() };
});

// action_mail action type
activityRegistry.set(
  "action_mail",
  async function action_mail(
    _: WorkflowActivityContext,
    { graphNode, payload }: IDaprWorkflowRunnerContext<IWorkflowMailNode>,
  ) {
    const mailConfig = {
      sender: '"TYS" tys.info@inferatech.com.tr',
      address: "smtp-mail.outlook.com",
      user: "tys.info@inferatech.com.tr",
      password: "123.123Ti.!",
    };

    const transporter = nodemailer.createTransport({
      host: mailConfig.address,
      port: 587,
      secure: false, // true for port 465, false for 587
      auth: {
        user: mailConfig.user,
        pass: mailConfig.password,
      },
    });

    const html = compileTemplate(graphNode.properties.body, {
      workflowInstanceId: _.getWorkflowInstanceId(),
      nodeName: encodeURIComponent(graphNode.name),
    });

    const mailOptions = {
      from: mailConfig.sender,
      to: graphNode.properties.to,
      subject: graphNode.properties.subject,
      html,
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log("Email sent: %s", info.messageId);
    } catch (error) {
      console.error("Error sending email:", error);
      return { action_mail: error };
    }

    return { action_mail: new Date() };
  },
);

// condition_if condition type
activityRegistry.set(
  "condition_if",
  async function condition_if(
    _: WorkflowActivityContext,
    { graphNode, payload }: IDaprWorkflowRunnerContext<IWorkflowIfNode>,
  ) {
    return { condition_if: new Date(), result: payload === "true" };
  },
);

// response_webhookResponse response type SİLME ! yoksa doğrudan worfklow result geliyor
activityRegistry.set(
  "response_webhookResponse",
  async function response_webhookResponse(_: WorkflowActivityContext, request: any) {
    return { response_webhookResponse: new Date() };
  },
);

// response_httpResponse response type
activityRegistry.set(
  "response_httpResponse",
  async function response_httpResponse(
    _: WorkflowActivityContext,
    { graphNode, payload }: IDaprWorkflowRunnerContext<IWorkflowIfNode>,
  ) {
    return { response_httpResponse: new Date(), payload };
  },
);
