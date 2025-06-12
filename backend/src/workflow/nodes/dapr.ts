import { IWorkflowActionNode } from "./base";

// #region Dapr Integration Nodes
export interface IWorkflowDaprStateStoreNode extends IWorkflowActionNode<"stateStore"> {
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

export interface IWorkflowDaprPubSubNode extends IWorkflowActionNode<"pubSub"> {
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

export interface IWorkflowDaprServiceInvocationNode extends IWorkflowActionNode<"serviceInvocation"> {
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

export interface IWorkflowDaprBindingNode extends IWorkflowActionNode<"binding"> {
    actionType: "binding";
    properties: {
        bindingName: string;
        operation: string;
        data?: any;
        metadata?: Record<string, string>;
        direction: "input" | "output";
    };
}

export interface IWorkflowDaprSecretsNode extends IWorkflowActionNode<"secrets"> {
    actionType: "secrets";
    properties: {
        storeName: string;
        key: string;
        keys?: string[];
        metadata?: Record<string, string>;
    };
}

export interface IWorkflowDaprConfigurationNode extends IWorkflowActionNode<"configuration"> {
    actionType: "configuration";
    properties: {
        storeName: string;
        operation: "get" | "subscribe" | "unsubscribe";
        keys: string[];
        metadata?: Record<string, string>;
        subscriptionId?: string;
    };
}

export interface IWorkflowDaprLockNode extends IWorkflowActionNode<"lock"> {
    actionType: "lock";
    properties: {
        operation: "tryLock" | "unlock";
        storeName: string;
        resourceId: string;
        lockOwner: string;
        expiryInSeconds?: number;
    };
}

export interface IWorkflowDaprWorkflowNode extends IWorkflowActionNode<"workflow"> {
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

export interface IWorkflowDaprActivityCallNode extends IWorkflowActionNode<"daprActivity"> {
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

export interface IWorkflowDaprSubWorkflowNode extends IWorkflowActionNode<"daprSubWorkflow"> {
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

export interface IWorkflowDaprTimerNode extends IWorkflowActionNode<"daprTimer"> {
    actionType: "daprTimer";
    properties: {
        duration: string;
        fireAt?: string;
    };
}

export interface IWorkflowDaprWaitForExternalEventNode extends IWorkflowActionNode<"daprWaitForExternalEvent"> {
    actionType: "daprWaitForExternalEvent";
    properties: {
        eventName: string;
        timeout?: string;
    };
}

export interface IWorkflowDaprParallelNode extends IWorkflowActionNode<"daprParallel"> {
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

export interface IWorkflowDaprContinueAsNewNode extends IWorkflowActionNode<"daprContinueAsNew"> {
    actionType: "daprContinueAsNew";
    properties: {
        input?: any;
        preserveUnprocessedEvents?: boolean;
    };
}

export type IWorkflowDaprNodes = 
    | IWorkflowDaprStateStoreNode 
    | IWorkflowDaprPubSubNode 
    | IWorkflowDaprServiceInvocationNode 
    | IWorkflowDaprBindingNode 
    | IWorkflowDaprSecretsNode 
    | IWorkflowDaprConfigurationNode 
    | IWorkflowDaprLockNode 
    | IWorkflowDaprWorkflowNode
    | IWorkflowDaprActivityCallNode
    | IWorkflowDaprSubWorkflowNode
    | IWorkflowDaprTimerNode
    | IWorkflowDaprWaitForExternalEventNode
    | IWorkflowDaprParallelNode
    | IWorkflowDaprContinueAsNewNode;
// #endregion
