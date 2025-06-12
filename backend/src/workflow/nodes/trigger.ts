import { IWorkflowTriggerNode } from "./base";

// #region Trigger Nodes
export interface IWorkflowManuelTriggerNode extends IWorkflowTriggerNode<"manuel"> {
    triggerType: "manuel";
}

export interface IWorkflowTimerTriggerNode extends IWorkflowTriggerNode<"timer"> {
    triggerType: "timer";
    properties: {
        interval: number;
        unit: "seconds" | "minutes" | "hours" | "days";
        startDate?: string;
        endDate?: string;
    };
}

export interface IWorkflowWebhookTriggerNode extends IWorkflowTriggerNode<"webhook"> {
    triggerType: "webhook";
    properties: {
        path: string;
        method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
        authentication?: "none" | "basic" | "bearer" | "apiKey";
        responseMode: "sync" | "async";
    };
}

export interface IWorkflowScheduleTriggerNode extends IWorkflowTriggerNode<"schedule"> {
    triggerType: "schedule";
    properties: {
        cronExpression: string;
        timezone?: string;
        startDate?: string;
        endDate?: string;
        maxExecutions?: number;
    };
}

export interface IWorkflowFileTriggerNode extends IWorkflowTriggerNode<"file"> {
    triggerType: "file";
    properties: {
        watchPath: string;
        events: ("created" | "modified" | "deleted" | "moved")[];
        filePattern?: string;
        recursive?: boolean;
        debounceMs?: number;
    };
}

export interface IWorkflowEmailTriggerNode extends IWorkflowTriggerNode<"email"> {
    triggerType: "email";
    properties: {
        protocol: "IMAP" | "POP3";
        host: string;
        port: number;
        username: string;
        password: string;
        folder?: string;
        markAsRead?: boolean;
        deleteAfterProcessing?: boolean;
        filters?: {
            from?: string;
            subject?: string;
            hasAttachment?: boolean;
        };
    };
}

export type IWorkflowTriggerNodes = 
    | IWorkflowManuelTriggerNode 
    | IWorkflowTimerTriggerNode 
    | IWorkflowWebhookTriggerNode
    | IWorkflowScheduleTriggerNode
    | IWorkflowFileTriggerNode
    | IWorkflowEmailTriggerNode;
// #endregion
