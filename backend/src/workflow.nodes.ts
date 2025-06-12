// #region Core Base Types
interface IWorkflowBaseNode<T extends "trigger" | "action" | "condition" | "response"> {
    id: string;
    name: string;
    baseType: T;
    properties: {};
}

// Base node categories
interface IWorkflowTriggerNode<T extends string> extends IWorkflowBaseNode<"trigger"> {
    baseType: 'trigger';
    triggerType: T;
}

interface IWorkflowActionNode<T extends string> extends IWorkflowBaseNode<"action"> {
    baseType: 'action';
    actionType: T;
}

interface IWorkflowConditionNode<T extends string> extends IWorkflowBaseNode<"condition"> {
    baseType: 'condition';
    conditionType: T;
}

interface IWorkflowResponseNode<T extends string> extends IWorkflowBaseNode<"response"> {
    baseType: 'response';
    responseType: T;
}
// #endregion

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

// #region AI & Machine Learning Nodes
export interface IWorkflowOpenAINode extends IWorkflowActionNode<"openai"> {
    actionType: "openai";
    properties: {
        operation: "chat" | "completion" | "embedding" | "image" | "audio" | "moderation";
        model: string;
        prompt?: string;
        messages?: {
            role: "system" | "user" | "assistant";
            content: string;
        }[];
        maxTokens?: number;
        temperature?: number;
        topP?: number;
        frequencyPenalty?: number;
        presencePenalty?: number;
        stop?: string[];
        stream?: boolean;
        functions?: any[];
        functionCall?: any;
    };
}

export interface IWorkflowAzureOpenAINode extends IWorkflowActionNode<"azureOpenAI"> {
    actionType: "azureOpenAI";
    properties: {
        endpoint: string;
        apiKey: string;
        deploymentName: string;
        apiVersion: string;
        operation: "chat" | "completion" | "embedding";
        prompt?: string;
        messages?: {
            role: "system" | "user" | "assistant";
            content: string;
        }[];
        maxTokens?: number;
        temperature?: number;
    };
}

export interface IWorkflowImageRecognitionNode extends IWorkflowActionNode<"imageRecognition"> {
    actionType: "imageRecognition";
    properties: {
        provider: "azure" | "aws" | "google" | "openai";
        operation: "detect" | "analyze" | "classify" | "ocr";
        imageUrl?: string;
        imageData?: string;
        confidence?: number;
        features?: string[];
    };
}

export interface IWorkflowSentimentAnalysisNode extends IWorkflowActionNode<"sentimentAnalysis"> {
    actionType: "sentimentAnalysis";
    properties: {
        provider: "azure" | "aws" | "google" | "openai";
        text: string;
        language?: string;
        returnScores?: boolean;
    };
}

export interface IWorkflowTextTranslationNode extends IWorkflowActionNode<"textTranslation"> {
    actionType: "textTranslation";
    properties: {
        provider: "azure" | "aws" | "google";
        text: string;
        sourceLanguage?: string;
        targetLanguage: string;
        format?: "text" | "html";
    };
}

export type IWorkflowAINodes = 
    | IWorkflowOpenAINode 
    | IWorkflowAzureOpenAINode 
    | IWorkflowImageRecognitionNode 
    | IWorkflowSentimentAnalysisNode
    | IWorkflowTextTranslationNode;
// #endregion

// #region Action Nodes
export interface IWorkflowHttpRequestNode extends IWorkflowActionNode<"httpRequest"> {
    actionType: "httpRequest";
    properties: {
        url: string;
        method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
        headers?: Record<string, string>;
        body?: any;
        timeout?: number;
        authentication?: {
            type: "none" | "basic" | "bearer" | "oauth2";
            credentials?: Record<string, string>;
        };
        followRedirects?: boolean;
    };
}

export interface IWorkflowMailNode extends IWorkflowActionNode<"mail"> {
    actionType: "mail";
    properties: {
        to: string[];
        cc?: string[];
        bcc?: string[];
        subject: string;
        body: string;
        bodyType: "text" | "html";
        attachments?: {
            filename: string;
            content: string;
            contentType: string;
        }[];
        priority?: "low" | "normal" | "high";
    };
}

export interface IWorkflowScriptNode extends IWorkflowActionNode<"script"> {
    actionType: "script";
    properties: {
        language: "javascript" | "python" | "bash" | "powershell";
        code: string;
        timeout?: number;
        environment?: Record<string, string>;
        args?: string[];
        workingDirectory?: string;
    };
}

export interface IWorkflowFileOperationNode extends IWorkflowActionNode<"fileOperation"> {
    actionType: "fileOperation";
    properties: {
        operation: "read" | "write" | "copy" | "move" | "delete" | "compress" | "extract";
        sourcePath: string;
        destinationPath?: string;
        encoding?: "utf8" | "base64" | "binary";
        createDirectories?: boolean;
        overwrite?: boolean;
        compressionType?: "zip" | "tar" | "gzip";
    };
}

export interface IWorkflowFTPNode extends IWorkflowActionNode<"ftp"> {
    actionType: "ftp";
    properties: {
        operation: "upload" | "download" | "list" | "delete" | "mkdir";
        host: string;
        port: number;
        username: string;
        password: string;
        protocol: "ftp" | "ftps" | "sftp";
        localPath?: string;
        remotePath: string;
        passive?: boolean;
        secure?: boolean;
    };
}

export type IWorkflowBasicActionNodes = 
    | IWorkflowHttpRequestNode 
    | IWorkflowMailNode 
    | IWorkflowScriptNode
    | IWorkflowFileOperationNode
    | IWorkflowFTPNode;
// #endregion

// #region Data Storage & Database Nodes
export interface IWorkflowDatabaseNode extends IWorkflowActionNode<"database"> {
    actionType: "database";
    properties: {
        operation: "select" | "insert" | "update" | "delete" | "transaction";
        table: string;
        query?: string;
        data?: Record<string, any>;
        conditions?: Record<string, any>;
        connection: {
            type: "mysql" | "postgresql" | "mongodb" | "sqlite" | "mssql" | "oracle";
            host: string;
            port: number;
            database: string;
            username: string;
            password: string;
            ssl?: boolean;
        };
        transactionQueries?: string[];
    };
}

export interface IWorkflowRedisNode extends IWorkflowActionNode<"redis"> {
    actionType: "redis";
    properties: {
        operation: "get" | "set" | "del" | "exists" | "expire" | "lpush" | "rpush" | "lpop" | "rpop" | "hget" | "hset";
        host: string;
        port: number;
        password?: string;
        database?: number;
        key: string;
        value?: any;
        expiration?: number;
        field?: string;
    };
}

export interface IWorkflowElasticsearchNode extends IWorkflowActionNode<"elasticsearch"> {
    actionType: "elasticsearch";
    properties: {
        operation: "index" | "get" | "search" | "update" | "delete" | "bulk";
        host: string;
        port: number;
        index: string;
        type?: string;
        id?: string;
        document?: any;
        query?: any;
        authentication?: {
            username: string;
            password: string;
        };
        ssl?: boolean;
    };
}

export type IWorkflowDataStorageNodes = 
    | IWorkflowDatabaseNode 
    | IWorkflowRedisNode 
    | IWorkflowElasticsearchNode;
// #endregion

// #region Data Transformation Nodes
export interface IWorkflowDataTransformNode extends IWorkflowActionNode<"dataTransform"> {
    actionType: "dataTransform";
    properties: {
        operation: "map" | "filter" | "reduce" | "sort" | "group" | "merge" | "split";
        source: string;
        transformations: {
            field: string;
            operation: "rename" | "format" | "calculate" | "extract" | "replace" | "convert";
            target?: string;
            expression?: string;
            options?: Record<string, any>;
        }[];
        outputFormat?: "json" | "xml" | "csv" | "yaml";
    };
}

export interface IWorkflowDataValidationNode extends IWorkflowActionNode<"dataValidation"> {
    actionType: "dataValidation";
    properties: {
        schema: any; // JSON Schema
        data: any;
        validationRules?: {
            field: string;
            rules: ("required" | "email" | "url" | "number" | "date" | "regex")[];
            customPattern?: string;
            min?: number;
            max?: number;
        }[];
        onValidationFail: "stop" | "continue" | "transform";
        errorHandling?: {
            logErrors: boolean;
            returnErrors: boolean;
        };
    };
}

export interface IWorkflowCSVProcessorNode extends IWorkflowActionNode<"csvProcessor"> {
    actionType: "csvProcessor";
    properties: {
        operation: "parse" | "generate" | "filter" | "transform";
        inputData?: string;
        delimiter?: string;
        hasHeader?: boolean;
        encoding?: "utf8" | "latin1" | "ascii";
        filters?: {
            column: string;
            operator: "equals" | "contains" | "greaterThan" | "lessThan";
            value: any;
        }[];
        transformations?: {
            column: string;
            operation: "uppercase" | "lowercase" | "trim" | "format" | "calculate";
            expression?: string;
        }[];
    };
}

export interface IWorkflowJSONProcessorNode extends IWorkflowActionNode<"jsonProcessor"> {
    actionType: "jsonProcessor";
    properties: {
        operation: "parse" | "stringify" | "extract" | "transform" | "validate";
        inputData: any;
        jsonPath?: string;
        transformations?: {
            path: string;
            operation: "set" | "delete" | "rename" | "transform";
            value?: any;
            expression?: string;
        }[];
        schema?: any;
        outputFormat?: "json" | "xml" | "yaml";
    };
}

export interface IWorkflowXMLProcessorNode extends IWorkflowActionNode<"xmlProcessor"> {
    actionType: "xmlProcessor";
    properties: {
        operation: "parse" | "generate" | "transform" | "validate";
        inputData?: string;
        xpath?: string;
        xsltTemplate?: string;
        schema?: string;
        namespaces?: Record<string, string>;
        outputFormat?: "xml" | "json" | "text";
        preserveWhitespace?: boolean;
    };
}

export type IWorkflowDataTransformationNodes = 
    | IWorkflowDataTransformNode 
    | IWorkflowDataValidationNode 
    | IWorkflowCSVProcessorNode
    | IWorkflowJSONProcessorNode
    | IWorkflowXMLProcessorNode;
// #endregion

// #region Flow Control Nodes
export interface IWorkflowIfNode extends IWorkflowConditionNode<"if"> {
    conditionType: "if";
    properties: {
        conditions: {
            field: string;
            operator: "equals" | "notEquals" | "contains" | "notContains" | "greaterThan" | "lessThan" | "greaterThanOrEqual" | "lessThanOrEqual" | "isEmpty" | "isNotEmpty" | "regex";
            value: any;
            logicalOperator?: "AND" | "OR";
        }[];
        trueBranch: string; // node id
        falseBranch?: string; // node id
    };
}

export interface IWorkflowSwitchNode extends IWorkflowConditionNode<"switch"> {
    conditionType: "switch";
    properties: {
        field: string;
        cases: {
            value: any;
            branch: string; // node id
        }[];
        defaultBranch?: string; // node id
    };
}

export interface IWorkflowFilterNode extends IWorkflowConditionNode<"filter"> {
    conditionType: "filter";
    properties: {
        conditions: {
            field: string;
            operator: "equals" | "notEquals" | "contains" | "notContains" | "greaterThan" | "lessThan" | "greaterThanOrEqual" | "lessThanOrEqual" | "isEmpty" | "isNotEmpty";
            value: any;
            logicalOperator?: "AND" | "OR";
        }[];
        passthrough: boolean; // whether to pass items that match or don't match
    };
}

export interface IWorkflowLoopNode extends IWorkflowConditionNode<"loop"> {
    conditionType: "loop";
    properties: {
        loopType: "forEach" | "while" | "doWhile" | "for";
        iterableField?: string;
        condition?: {
            field: string;
            operator: "equals" | "notEquals" | "greaterThan" | "lessThan";
            value: any;
        };
        maxIterations?: number;
        loopBody: string[]; // array of node ids
        breakCondition?: {
            field: string;
            operator: "equals" | "notEquals" | "greaterThan" | "lessThan";
            value: any;
        };
    };
}

export interface IWorkflowParallelNode extends IWorkflowConditionNode<"parallel"> {
    conditionType: "parallel";
    properties: {
        branches: {
            name: string;
            nodes: string[]; // array of node ids
        }[];
        waitForAll: boolean;
        timeout?: number;
        failureMode: "failFast" | "continueOnError" | "waitForAll";
    };
}

export interface IWorkflowDelayNode extends IWorkflowActionNode<"delay"> {
    actionType: "delay";
    properties: {
        duration: number;
        unit: "milliseconds" | "seconds" | "minutes" | "hours";
        dynamicDelay?: {
            field: string;
            multiplier?: number;
        };
    };
}

export type IWorkflowFlowControlNodes = 
    | IWorkflowIfNode 
    | IWorkflowSwitchNode 
    | IWorkflowFilterNode
    | IWorkflowLoopNode
    | IWorkflowParallelNode
    | IWorkflowDelayNode;
// #endregion

// #region Human Interaction Nodes
export interface IWorkflowApprovalNode extends IWorkflowActionNode<"approval"> {
    actionType: "approval";
    properties: {
        approvers: string[];
        approvalType: "any" | "majority" | "unanimous";
        message: string;
        timeout?: number;
        timeoutAction: "approve" | "reject" | "escalate";
        escalationUsers?: string[];
        attachments?: {
            name: string;
            url: string;
            type: string;
        }[];
        customFields?: {
            name: string;
            type: "text" | "number" | "boolean" | "select";
            required: boolean;
            options?: string[];
        }[];
    };
}

export interface IWorkflowUserInputNode extends IWorkflowActionNode<"userInput"> {
    actionType: "userInput";
    properties: {
        title: string;
        description?: string;
        fields: {
            name: string;
            label: string;
            type: "text" | "number" | "email" | "password" | "textarea" | "select" | "multiselect" | "checkbox" | "radio" | "date" | "time" | "datetime" | "file";
            required: boolean;
            defaultValue?: any;
            options?: string[];
            validation?: {
                min?: number;
                max?: number;
                pattern?: string;
                customValidation?: string;
            };
        }[];
        submitButtonText?: string;
        cancelButtonText?: string;
        timeout?: number;
        allowAnonymous?: boolean;
    };
}

export interface IWorkflowNotificationNode extends IWorkflowActionNode<"notification"> {
    actionType: "notification";
    properties: {
        channels: ("email" | "sms" | "push" | "slack" | "teams" | "webhook")[];
        recipients: string[];
        title: string;
        message: string;
        priority: "low" | "normal" | "high" | "urgent";
        template?: string;
        variables?: Record<string, any>;
        actionButtons?: {
            text: string;
            action: string;
            style?: "primary" | "secondary" | "danger";
        }[];
        attachments?: {
            name: string;
            content: string;
            type: string;
        }[];
    };
}

export interface IWorkflowSurveyNode extends IWorkflowActionNode<"survey"> {
    actionType: "survey";
    properties: {
        title: string;
        description?: string;
        questions: {
            id: string;
            question: string;
            type: "text" | "number" | "rating" | "yesno" | "multiple" | "single" | "matrix";
            required: boolean;
            options?: string[];
            scale?: {
                min: number;
                max: number;
                labels?: Record<number, string>;
            };
        }[];
        anonymous?: boolean;
        multipleSubmissions?: boolean;
        timeout?: number;
        thankYouMessage?: string;
    };
}

export type IWorkflowHumanInteractionNodes = 
    | IWorkflowApprovalNode 
    | IWorkflowUserInputNode 
    | IWorkflowNotificationNode
    | IWorkflowSurveyNode;
// #endregion

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

// #region Response Nodes
export interface IWorkflowWebhookResponseNode extends IWorkflowResponseNode<"webhookResponse"> {
    responseType: "webhookResponse";
    properties: {
        statusCode: number;
        headers?: Record<string, string>;
        body?: any;
        bodyType: "json" | "text" | "html" | "xml" | "binary";
        cookies?: {
            name: string;
            value: string;
            domain?: string;
            path?: string;
            expires?: string;
            maxAge?: number;
            secure?: boolean;
            httpOnly?: boolean;
            sameSite?: "strict" | "lax" | "none";
        }[];
        responseDelay?: number;
        compression?: "gzip" | "deflate" | "br" | "none";
        cacheControl?: {
            maxAge?: number;
            noCache?: boolean;
            noStore?: boolean;
            mustRevalidate?: boolean;
            private?: boolean;
            public?: boolean;
        };
    };
}

export interface IWorkflowHttpResponseNode extends IWorkflowResponseNode<"httpResponse"> {
    responseType: "httpResponse";
    properties: {
        statusCode: number;
        statusMessage?: string;
        headers?: Record<string, string>;
        body?: any;
        bodyType: "json" | "text" | "html" | "xml" | "stream" | "buffer";
        encoding?: "utf8" | "ascii" | "base64" | "binary";
        redirect?: {
            url: string;
            permanent?: boolean;
        };
        attachment?: {
            filename: string;
            contentType: string;
            inline?: boolean;
        };
    };
}

export interface IWorkflowApiResponseNode extends IWorkflowResponseNode<"apiResponse"> {
    responseType: "apiResponse";
    properties: {
        statusCode: number;
        data?: any;
        message?: string;
        errors?: {
            field?: string;
            code: string;
            message: string;
        }[];
        meta?: {
            timestamp: string;
            requestId?: string;
            version?: string;
            pagination?: {
                page: number;
                limit: number;
                total: number;
                hasNext: boolean;
                hasPrevious: boolean;
            };
        };
        headers?: Record<string, string>;
        links?: {
            self?: string;
            next?: string;
            previous?: string;
            first?: string;
            last?: string;
        };
    };
}

export interface IWorkflowWebhookSuccessResponseNode extends IWorkflowWebhookResponseNode {
    properties: IWorkflowWebhookResponseNode['properties'] & {
        statusCode: 200 | 201 | 202 | 204;
        successMessage?: string;
        acknowledgment?: {
            received: boolean;
            processedAt: string;
            transactionId?: string;
        };
    };
}

export interface IWorkflowWebhookErrorResponseNode extends IWorkflowWebhookResponseNode {
    properties: IWorkflowWebhookResponseNode['properties'] & {
        statusCode: 400 | 401 | 403 | 404 | 409 | 422 | 429 | 500 | 502 | 503;
        error: {
            code: string;
            message: string;
            details?: any;
            timestamp: string;
        };
        retryAfter?: number;
    };
}

export interface IWorkflowWebhookAsyncResponseNode extends IWorkflowWebhookResponseNode {
    properties: IWorkflowWebhookResponseNode['properties'] & {
        statusCode: 202;
        callbackUrl?: string;
        pollUrl?: string;
        estimatedDuration?: number;
        jobId: string;
        status: "accepted" | "processing" | "queued";
    };
}

export interface IWorkflowConditionalResponseNode extends IWorkflowResponseNode<"conditionalResponse"> {
    responseType: "conditionalResponse";
    properties: {
        conditions: {
            field: string;
            operator: "equals" | "notEquals" | "contains" | "notContains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
            value: any;
            response: IWorkflowWebhookResponseNode | IWorkflowHttpResponseNode | IWorkflowApiResponseNode;
        }[];
        defaultResponse: IWorkflowWebhookResponseNode | IWorkflowHttpResponseNode | IWorkflowApiResponseNode;
    };
}

export interface IWorkflowResponseTemplateNode extends IWorkflowResponseNode<"responseTemplate"> {
    responseType: "responseTemplate";
    properties: {
        template: {
            name: string;
            version: string;
        };
        variables?: Record<string, any>;
        transformations?: {
            field: string;
            transformation: "uppercase" | "lowercase" | "trim" | "format" | "encrypt" | "hash";
            options?: Record<string, any>;
        }[];
        validation?: {
            schema: any; // JSON Schema
            validateInput: boolean;
            validateOutput: boolean;
        };
    };
}

export type IWorkflowResponseNodes = 
    | IWorkflowWebhookResponseNode 
    | IWorkflowHttpResponseNode 
    | IWorkflowApiResponseNode
    | IWorkflowWebhookSuccessResponseNode
    | IWorkflowWebhookErrorResponseNode
    | IWorkflowWebhookAsyncResponseNode
    | IWorkflowConditionalResponseNode
    | IWorkflowResponseTemplateNode;
// #endregion

// #region Error Handling & Monitoring Nodes
export interface IWorkflowErrorHandlerNode extends IWorkflowActionNode<"errorHandler"> {
    actionType: "errorHandler";
    properties: {
        errorTypes: ("timeout" | "validation" | "network" | "authentication" | "authorization" | "server" | "custom")[];
        actions: {
            errorType: string;
            action: "retry" | "skip" | "abort" | "fallback" | "log" | "notify";
            retryCount?: number;
            retryDelay?: number;
            fallbackNode?: string;
            notificationRecipients?: string[];
        }[];
        globalErrorAction?: "retry" | "skip" | "abort";
        logErrors?: boolean;
        captureStackTrace?: boolean;
    };
}

export interface IWorkflowRetryNode extends IWorkflowActionNode<"retry"> {
    actionType: "retry";
    properties: {
        maxAttempts: number;
        delayMs: number;
        backoffMultiplier?: number;
        maxDelayMs?: number;
        retryConditions?: {
            errorType: string;
            statusCodes?: number[];
            errorMessages?: string[];
        }[];
        onMaxRetriesExceeded: "fail" | "skip" | "fallback";
        fallbackNode?: string;
    };
}

export interface IWorkflowLoggerNode extends IWorkflowActionNode<"logger"> {
    actionType: "logger";
    properties: {
        level: "trace" | "debug" | "info" | "warn" | "error" | "fatal";
        message: string;
        data?: any;
        tags?: string[];
        destination: ("console" | "file" | "database" | "external")[];
        logFile?: string;
        structured?: boolean;
        includeContext?: boolean;
        includeTimestamp?: boolean;
    };
}

export interface IWorkflowMetricsNode extends IWorkflowActionNode<"metrics"> {
    actionType: "metrics";
    properties: {
        metricType: "counter" | "gauge" | "histogram" | "timer";
        name: string;
        value?: number;
        labels?: Record<string, string>;
        description?: string;
        unit?: string;
        destination: ("prometheus" | "influxdb" | "cloudwatch" | "datadog" | "custom")[];
        customEndpoint?: string;
    };
}

export interface IWorkflowHealthCheckNode extends IWorkflowActionNode<"healthCheck"> {
    actionType: "healthCheck";
    properties: {
        checks: {
            name: string;
            type: "http" | "database" | "service" | "custom";
            endpoint?: string;
            query?: string;
            timeout?: number;
            expectedStatus?: number;
            customCheck?: string;
        }[];
        onFailure: "continue" | "stop" | "retry";
        reportFormat: "json" | "text" | "prometheus";
        includeDetails?: boolean;
    };
}

export type IWorkflowErrorHandlingNodes = 
    | IWorkflowErrorHandlerNode 
    | IWorkflowRetryNode 
    | IWorkflowLoggerNode
    | IWorkflowMetricsNode
    | IWorkflowHealthCheckNode;
// #endregion

// #region Security & Authentication Nodes
export interface IWorkflowAuthenticationNode extends IWorkflowActionNode<"authentication"> {
    actionType: "authentication";
    properties: {
        provider: "oauth2" | "jwt" | "basic" | "apiKey" | "saml" | "ldap" | "custom";
        credentials?: {
            username?: string;
            password?: string;
            clientId?: string;
            clientSecret?: string;
            apiKey?: string;
            token?: string;
        };
        endpoints?: {
            authUrl?: string;
            tokenUrl?: string;
            userInfoUrl?: string;
        };
        scopes?: string[];
        redirectUri?: string;
        tokenStorage?: "memory" | "secure" | "external";
        refreshToken?: boolean;
    };
}

export interface IWorkflowEncryptionNode extends IWorkflowActionNode<"encryption"> {
    actionType: "encryption";
    properties: {
        operation: "encrypt" | "decrypt" | "hash" | "sign" | "verify";
        algorithm: "AES-256-GCM" | "RSA" | "SHA-256" | "HMAC-SHA256" | "bcrypt";
        data: string;
        key?: string;
        keySource?: "inline" | "environment" | "vault" | "kms";
        keyPath?: string;
        salt?: string;
        iv?: string;
        outputFormat?: "base64" | "hex" | "binary";
    };
}

export interface IWorkflowRateLimitNode extends IWorkflowActionNode<"rateLimit"> {
    actionType: "rateLimit";
    properties: {
        strategy: "fixed" | "sliding" | "token_bucket" | "leaky_bucket";
        limit: number;
        window: number;
        windowUnit: "seconds" | "minutes" | "hours" | "days";
        identifier?: string; // user ID, IP, etc.
        onLimitExceeded: "reject" | "queue" | "delay";
        queueSize?: number;
        delayMs?: number;
        headers?: {
            includeHeaders: boolean;
            rateLimitHeader?: string;
            remainingHeader?: string;
            resetHeader?: string;
        };
    };
}

export interface IWorkflowValidationNode extends IWorkflowActionNode<"validation"> {
    actionType: "validation";
    properties: {
        validationType: "input" | "output" | "both";
        schema?: any; // JSON Schema
        rules?: {
            field: string;
            type: "required" | "email" | "url" | "number" | "date" | "regex" | "length" | "range";
            value?: any;
            message?: string;
        }[];
        sanitization?: {
            field: string;
            operations: ("trim" | "escape" | "lowercase" | "uppercase" | "removeSpecialChars")[];
        }[];
        onValidationFail: "reject" | "sanitize" | "log";
        includeErrorDetails?: boolean;
    };
}

export type IWorkflowSecurityNodes = 
    | IWorkflowAuthenticationNode 
    | IWorkflowEncryptionNode 
    | IWorkflowRateLimitNode
    | IWorkflowValidationNode;
// #endregion

// #region Integration Nodes
export interface IWorkflowSlackNode extends IWorkflowActionNode<"slack"> {
    actionType: "slack";
    properties: {
        operation: "sendMessage" | "updateMessage" | "deleteMessage" | "createChannel" | "inviteUser" | "uploadFile";
        botToken: string;
        channel?: string;
        text?: string;
        blocks?: any[];
        attachments?: any[];
        threadTs?: string;
        messageId?: string;
        filePath?: string;
        fileName?: string;
        fileContent?: string;
        userId?: string;
        channelName?: string;
        channelType?: "public" | "private";
    };
}

export interface IWorkflowTeamsNode extends IWorkflowActionNode<"teams"> {
    actionType: "teams";
    properties: {
        operation: "sendMessage" | "sendCard" | "createMeeting" | "sendNotification";
        webhookUrl?: string;
        text?: string;
        title?: string;
        card?: any;
        meeting?: {
            subject: string;
            startTime: string;
            endTime: string;
            attendees: string[];
            location?: string;
        };
        mentions?: {
            userId: string;
            displayName: string;
        }[];
    };
}

export interface IWorkflowDiscordNode extends IWorkflowActionNode<"discord"> {
    actionType: "discord";
    properties: {
        operation: "sendMessage" | "sendEmbed" | "createInvite" | "manageRole";
        botToken?: string;
        webhookUrl?: string;
        channelId?: string;
        guildId?: string;
        content?: string;
        embed?: {
            title?: string;
            description?: string;
            color?: number;
            fields?: { name: string; value: string; inline?: boolean; }[];
            footer?: { text: string; iconUrl?: string; };
            thumbnail?: { url: string; };
            image?: { url: string; };
        };
        userId?: string;
        roleId?: string;
        roleName?: string;
    };
}

export interface IWorkflowJiraNode extends IWorkflowActionNode<"jira"> {
    actionType: "jira";
    properties: {
        operation: "createIssue" | "updateIssue" | "getIssue" | "searchIssues" | "addComment" | "transition";
        baseUrl: string;
        email: string;
        apiToken: string;
        projectKey?: string;
        issueKey?: string;
        issueType?: string;
        summary?: string;
        description?: string;
        assignee?: string;
        labels?: string[];
        priority?: string;
        customFields?: Record<string, any>;
        jql?: string;
        comment?: string;
        transitionId?: string;
    };
}

export interface IWorkflowGitHubNode extends IWorkflowActionNode<"github"> {
    actionType: "github";
    properties: {
        operation: "createIssue" | "createPR" | "updateIssue" | "addComment" | "mergePR" | "createRelease";
        token: string;
        owner: string;
        repo: string;
        title?: string;
        body?: string;
        labels?: string[];
        assignees?: string[];
        issueNumber?: number;
        prNumber?: number;
        head?: string;
        base?: string;
        tagName?: string;
        releaseName?: string;
        draft?: boolean;
        prerelease?: boolean;
    };
}

export interface IWorkflowTrelloNode extends IWorkflowActionNode<"trello"> {
    actionType: "trello";
    properties: {
        operation: "createCard" | "updateCard" | "moveCard" | "addComment" | "createList" | "createBoard";
        apiKey: string;
        token: string;
        boardId?: string;
        listId?: string;
        cardId?: string;
        name?: string;
        description?: string;
        position?: "top" | "bottom" | number;
        labels?: string[];
        members?: string[];
        dueDate?: string;
        comment?: string;
        boardName?: string;
        listName?: string;
    };
}

export type IWorkflowIntegrationNodes = 
    | IWorkflowSlackNode 
    | IWorkflowTeamsNode 
    | IWorkflowDiscordNode
    | IWorkflowJiraNode
    | IWorkflowGitHubNode
    | IWorkflowTrelloNode;
// #endregion

// #region Cloud Services Nodes
export interface IWorkflowAWSS3Node extends IWorkflowActionNode<"awsS3"> {
    actionType: "awsS3";
    properties: {
        operation: "upload" | "download" | "delete" | "list" | "copy" | "getPresignedUrl";
        accessKeyId: string;
        secretAccessKey: string;
        region: string;
        bucket: string;
        key?: string;
        localPath?: string;
        prefix?: string;
        expires?: number;
        metadata?: Record<string, string>;
        contentType?: string;
        acl?: "private" | "public-read" | "public-read-write";
        sourceKey?: string;
        destinationKey?: string;
    };
}

export interface IWorkflowAzureBlobNode extends IWorkflowActionNode<"azureBlob"> {
    actionType: "azureBlob";
    properties: {
        operation: "upload" | "download" | "delete" | "list" | "copy";
        connectionString: string;
        containerName: string;
        blobName?: string;
        localPath?: string;
        prefix?: string;
        metadata?: Record<string, string>;
        contentType?: string;
        accessTier?: "Hot" | "Cool" | "Archive";
        sourceBlobName?: string;
        destinationBlobName?: string;
    };
}

export interface IWorkflowGoogleCloudStorageNode extends IWorkflowActionNode<"gcs"> {
    actionType: "gcs";
    properties: {
        operation: "upload" | "download" | "delete" | "list" | "copy";
        keyFilename?: string;
        projectId: string;
        bucketName: string;
        fileName?: string;
        localPath?: string;
        prefix?: string;
        metadata?: Record<string, string>;
        gzip?: boolean;
        public?: boolean;
        sourceFileName?: string;
        destinationFileName?: string;
        destinationBucket?: string;
    };
}

export interface IWorkflowAWSLambdaNode extends IWorkflowActionNode<"awsLambda"> {
    actionType: "awsLambda";
    properties: {
        operation: "invoke" | "invokeAsync";
        accessKeyId: string;
        secretAccessKey: string;
        region: string;
        functionName: string;
        payload?: any;
        invocationType?: "RequestResponse" | "Event" | "DryRun";
        qualifier?: string;
        clientContext?: string;
    };
}

export interface IWorkflowAzureFunctionNode extends IWorkflowActionNode<"azureFunction"> {
    actionType: "azureFunction";
    properties: {
        functionUrl: string;
        code?: string;
        payload?: any;
        headers?: Record<string, string>;
        method?: "GET" | "POST" | "PUT" | "DELETE";
        timeout?: number;
    };
}

export interface IWorkflowGoogleCloudFunctionNode extends IWorkflowActionNode<"gcf"> {
    actionType: "gcf";
    properties: {
        functionUrl: string;
        payload?: any;
        headers?: Record<string, string>;
        method?: "GET" | "POST" | "PUT" | "DELETE";
        timeout?: number;
        authentication?: {
            type: "serviceAccount" | "idToken";
            keyFile?: string;
            audience?: string;
        };
    };
}

export type IWorkflowCloudServicesNodes = 
    | IWorkflowAWSS3Node 
    | IWorkflowAzureBlobNode 
    | IWorkflowGoogleCloudStorageNode
    | IWorkflowAWSLambdaNode
    | IWorkflowAzureFunctionNode
    | IWorkflowGoogleCloudFunctionNode;
// #endregion

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