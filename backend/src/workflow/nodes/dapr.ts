import { IWorkflowActionNode } from "./base";

// #region Dapr Integration Nodes
export interface IWorkflowDaprStateStoreNode <N extends string> extends IWorkflowActionNode<N, "stateStore"> {
    actionType: "stateStore";
    properties: {
        operation: "get" | "set" | "delete" | "bulk" | "transaction";
        storeName: string;
        key?: string;
        keys?: string[];
        value?: any;
        metadata?: Record<string, string>;
        etag?: string;
        consistency?: "eventual" | "strong";
        concurrency?: "first-write" | "last-write";
        transactionOperations?: {
            operation: "upsert" | "delete";
            request: {
                key: string;
                value?: any;
                etag?: string;
            };
        }[];
    };
}

export interface IWorkflowDaprPubSubNode <N extends string> extends IWorkflowActionNode<N, "pubSub"> {
    actionType: "pubSub";
    properties: {
        operation: "publish" | "subscribe";
        pubsubName: string;
        topic: string;
        data?: any;
        metadata?: Record<string, string>;
        subscriptionOptions?: {
            deadLetterTopic?: string;
            bulkSubscribe?: {
                enabled: boolean;
                maxMessagesCount?: number;
                maxAwaitDurationMs?: number;
            };
        };
    };
}

export interface IWorkflowDaprServiceInvocationNode <N extends string> extends IWorkflowActionNode<N, "serviceInvocation"> {
    actionType: "serviceInvocation";
    properties: {
        appId: string;
        methodName: string;
        httpVerb: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
        data?: any;
        metadata?: Record<string, string>;
        timeout?: number;
        retryPolicy?: {
            retryBackOff?: {
                initialInterval: string;
                maxInterval: string;
                multiplier: number;
            };
            retryTimeout?: string;
        };
    };
}

export interface IWorkflowDaprBindingNode <N extends string> extends IWorkflowActionNode<N, "binding"> {
    actionType: "binding";
    properties: {
        bindingName: string;
        operation: string;
        data?: any;
        metadata?: Record<string, string>;
        direction: "input" | "output";
    };
}

export interface IWorkflowDaprSecretsNode <N extends string> extends IWorkflowActionNode<N, "secrets"> {
    actionType: "secrets";
    properties: {
        storeName: string;
        key: string;
        keys?: string[];
        metadata?: Record<string, string>;
    };
}

export interface IWorkflowDaprConfigurationNode <N extends string> extends IWorkflowActionNode<N, "configuration"> {
    actionType: "configuration";
    properties: {
        storeName: string;
        operation: "get" | "subscribe" | "unsubscribe";
        keys: string[];
        metadata?: Record<string, string>;
        subscriptionId?: string;
    };
}

export interface IWorkflowDaprLockNode <N extends string> extends IWorkflowActionNode<N, "lock"> {
    actionType: "lock";
    properties: {
        operation: "tryLock" | "unlock";
        storeName: string;
        resourceId: string;
        lockOwner: string;
        expiryInSeconds?: number;
    };
}

export interface IWorkflowDaprWorkflowNode <N extends string> extends IWorkflowActionNode<N, "workflow"> {
    actionType: "workflow";
    properties: {
        operation: "start" | "terminate" | "pause" | "resume" | "raiseEvent" | "getStatus" | "purge";
        instanceId?: string;
        workflowName?: string;
        input?: any;
        eventName?: string;
        eventData?: any;
        terminateReason?: string;
    };
}

export interface IWorkflowDaprActivityCallNode <N extends string> extends IWorkflowActionNode<N, "daprActivity"> {
    actionType: "daprActivity";
    properties: {
        activityName: string;
        input?: any;
        retryPolicy?: {
            maxNumberOfAttempts: number;
            firstRetryInterval: string;
            backoffCoefficient: number;
            maxRetryInterval: string;
            retryTimeout: string;
        };
    };
}

export interface IWorkflowDaprSubWorkflowNode <N extends string> extends IWorkflowActionNode<N, "daprSubWorkflow"> {
    actionType: "daprSubWorkflow";
    properties: {
        workflowName: string;
        input?: any;
        instanceId?: string;
        retryPolicy?: {
            maxNumberOfAttempts: number;
            firstRetryInterval: string;
            backoffCoefficient: number;
            maxRetryInterval: string;
            retryTimeout: string;
        };
    };
}

export interface IWorkflowDaprTimerNode <N extends string> extends IWorkflowActionNode<N, "daprTimer"> {
    actionType: "daprTimer";
    properties: {
        duration: string;
        fireAt?: string;
    };
}

export interface IWorkflowDaprWaitForExternalEventNode <N extends string> extends IWorkflowActionNode<N, "daprWaitForExternalEvent"> {
    actionType: "daprWaitForExternalEvent";
    properties: {
        eventName: string;
        timeout?: string;
    };
}

export interface IWorkflowDaprParallelNode <N extends string> extends IWorkflowActionNode<N, "daprParallel"> {
    actionType: "daprParallel";
    properties: {
        tasks: {
            taskName: string;
            input?: any;
        }[];
        waitForAll: boolean;
        timeout?: string;
    };
}

export interface IWorkflowDaprContinueAsNewNode <N extends string> extends IWorkflowActionNode<N, "daprContinueAsNew"> {
    actionType: "daprContinueAsNew";
    properties: {
        input?: any;
        preserveUnprocessedEvents?: boolean;
    };
}

export type IWorkflowDaprNodes<N extends string> = 
    | IWorkflowDaprStateStoreNode <N>
    | IWorkflowDaprPubSubNode <N>
    | IWorkflowDaprServiceInvocationNode <N>
    | IWorkflowDaprBindingNode <N>
    | IWorkflowDaprSecretsNode <N>
    | IWorkflowDaprConfigurationNode <N>
    | IWorkflowDaprLockNode <N>
    | IWorkflowDaprWorkflowNode<N>
    | IWorkflowDaprActivityCallNode<N>
    | IWorkflowDaprSubWorkflowNode<N>
    | IWorkflowDaprTimerNode<N>
    | IWorkflowDaprWaitForExternalEventNode<N>
    | IWorkflowDaprParallelNode<N>
    | IWorkflowDaprContinueAsNewNode<N>;
// #endregion
