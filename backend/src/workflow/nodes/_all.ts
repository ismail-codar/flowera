import { IWorkflowBasicActionNodes } from './action';
import { IWorkflowAINodes } from './ai';
import { IWorkflowCloudServicesNodes } from './cloud';
import { IWorkflowDaprNodes } from './dapr';
import { IWorkflowDataStorageNodes } from './storage';
import { IWorkflowDataTransformationNodes } from './transform';
import { IWorkflowDelayNode, IWorkflowFlowControlNodes } from './flow';
import { IWorkflowHumanInteractionNodes } from './interaction';
import { IWorkflowIntegrationNodes } from './integration';
import { IWorkflowErrorHandlingNodes } from './monitoring';
import { IWorkflowResponseNodes } from './response';
import { IWorkflowSecurityNodes } from './security';
import { IWorkflowTriggerNodes } from './trigger';

// #region Final Union Types
export type IWorkflowAllActionNodes = 
    | IWorkflowBasicActionNodes
    | IWorkflowAINodes
    | IWorkflowDataStorageNodes
    | IWorkflowDataTransformationNodes
    | IWorkflowHumanInteractionNodes
    | IWorkflowDaprNodes
    | IWorkflowErrorHandlingNodes
    | IWorkflowSecurityNodes
    | IWorkflowIntegrationNodes
    | IWorkflowCloudServicesNodes
    | IWorkflowDelayNode;

export type IWorkflowAllConditionNodes = IWorkflowFlowControlNodes;

export type IWorkflowNode = 
    | IWorkflowTriggerNodes
    | IWorkflowAllActionNodes 
    | IWorkflowAllConditionNodes 
    | IWorkflowResponseNodes;
// #endregion

export interface IWorkflow {
    nodes: IWorkflowNode[];
    edges: {
        label?: string;
        source: string;
        target: string;
    }[];
}
