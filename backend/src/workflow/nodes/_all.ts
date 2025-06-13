import { IWorkflowBasicActionNodes } from "./action";
import { IWorkflowAINodes } from "./ai";
import { IWorkflowCloudServicesNodes } from "./cloud";
import { IWorkflowDaprNodes } from "./dapr";
import { IWorkflowDataStorageNodes } from "./storage";
import { IWorkflowDataTransformationNodes } from "./transform";
import { IWorkflowDelayNode, IWorkflowFlowControlNodes } from "./flow";
import { IWorkflowHumanInteractionNodes } from "./interaction";
import { IWorkflowIntegrationNodes } from "./integration";
import { IWorkflowErrorHandlingNodes } from "./monitoring";
import { IWorkflowResponseNodes } from "./response";
import { IWorkflowSecurityNodes } from "./security";
import { IWorkflowTriggerNodes } from "./trigger";

// #region Final Union Types
export type IWorkflowAllActionNodes<N extends string> =
  | IWorkflowBasicActionNodes<N>
  | IWorkflowAINodes<N>
  | IWorkflowDataStorageNodes<N>
  | IWorkflowDataTransformationNodes<N>
  | IWorkflowHumanInteractionNodes<N>
  | IWorkflowDaprNodes<N>
  | IWorkflowErrorHandlingNodes<N>
  | IWorkflowSecurityNodes<N>
  | IWorkflowIntegrationNodes<N>
  | IWorkflowCloudServicesNodes<N>
  | IWorkflowDelayNode<N>;

export type IWorkflowAllConditionNodes<N extends string> = IWorkflowFlowControlNodes<N>;

export type IWorkflowNode<N extends string> =
  | IWorkflowTriggerNodes<N>
  | IWorkflowAllActionNodes<N>
  | IWorkflowAllConditionNodes<N>
  | IWorkflowResponseNodes<N>;
// #endregion

// interface IWorkflowNode1<N> {
//     name: N
// }

export interface IWorkflow<N extends string> {
  nodes: IWorkflowNode<N>[];
  edges: {
    label?: string;
    source: N;
    target: N;
  }[];
}
