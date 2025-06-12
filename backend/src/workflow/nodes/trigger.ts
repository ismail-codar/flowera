import { IWorkflowTriggerNode } from "./base";

// #region Trigger Nodes
export interface IWorkflowManuelTriggerNode <N extends string> extends IWorkflowTriggerNode<N, "manuel"> {
    triggerType: "manuel";
}

export interface IWorkflowTimerTriggerNode <N extends string> extends IWorkflowTriggerNode<N, "timer"> {
    triggerType: "timer";
    properties: {
        interval: number;
        unit: "seconds" | "minutes" | "hours" | "days";
        startDate?: string;
        endDate?: string;
    };
}

export interface IWorkflowWebhookTriggerNode <N extends string> extends IWorkflowTriggerNode<N, "webhook"> {
    triggerType: "webhook";
    properties: {
        path: string;
        method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
        authentication?: "none" | "basic" | "bearer" | "apiKey";
        responseMode: "sync" | "async";
    };
}

export interface IWorkflowScheduleTriggerNode <N extends string> extends IWorkflowTriggerNode<N, "schedule"> {
    triggerType: "schedule";
    properties: {
        cronExpression: string;
        timezone?: string;
        startDate?: string;
        endDate?: string;
        maxExecutions?: number;
    };
}

export interface IWorkflowFileTriggerNode <N extends string> extends IWorkflowTriggerNode<N, "file"> {
    triggerType: "file";
    properties: {
        watchPath: string;
        events: ("created" | "modified" | "deleted" | "moved")[];
        filePattern?: string;
        recursive?: boolean;
        debounceMs?: number;
    };
}

export interface IWorkflowEmailTriggerNode <N extends string> extends IWorkflowTriggerNode<N, "email"> {
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

export type IWorkflowTriggerNodes<N extends string> = 
    | IWorkflowManuelTriggerNode<N> 
    | IWorkflowTimerTriggerNode<N> 
    | IWorkflowWebhookTriggerNode<N>
    | IWorkflowScheduleTriggerNode<N>
    | IWorkflowFileTriggerNode<N>
    | IWorkflowEmailTriggerNode<N>;
// #endregion
