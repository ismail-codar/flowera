import { IWorkflowActionNode } from "./base";

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
