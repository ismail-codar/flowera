import type { IWorkflowBasicActionNodes } from "./action";
import type { IWorkflowAINodes } from "./ai";
import type { IWorkflowCloudServicesNodes } from "./cloud";
import type { IWorkflowDaprNodes } from "./dapr";
import type { IWorkflowDataStorageNodes } from "./storage";
import type { IWorkflowDataTransformationNodes } from "./transform";
import type { IWorkflowDelayNode, IWorkflowFlowControlNodes } from "./flow";
import type { IWorkflowHumanInteractionNodes } from "./interaction";
import type { IWorkflowIntegrationNodes } from "./integration";
import type { IWorkflowErrorHandlingNodes } from "./monitoring";
import type { IWorkflowResponseNodes } from "./response";
import type { IWorkflowSecurityNodes } from "./security";
import type { IWorkflowTriggerNodes } from "./trigger";

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

export type IWorkflowNode<N extends string = string> =
  | IWorkflowTriggerNodes<N>
  | IWorkflowAllActionNodes<N>
  | IWorkflowAllConditionNodes<N>
  | IWorkflowResponseNodes<N>;
// #endregion

// interface IWorkflowNode<N> {
//     name: N
// }

export interface IWorkflowGraph<N extends string = string> {
  name: string;
  nodes: IWorkflowNode<N>[];
  edges: {
    label?: string;
    source: N;
    target: N;
  }[];
}
