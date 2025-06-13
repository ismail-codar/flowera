import { IWorkflowActionNode } from "./base";

// #region Error Handling & Monitoring Nodes
export interface IWorkflowErrorHandlerNode<N extends string> extends IWorkflowActionNode<N, "errorHandler"> {
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

export interface IWorkflowRetryNode<N extends string> extends IWorkflowActionNode<N, "retry"> {
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

export interface IWorkflowLoggerNode<N extends string> extends IWorkflowActionNode<N, "logger"> {
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

export interface IWorkflowMetricsNode<N extends string> extends IWorkflowActionNode<N, "metrics"> {
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

export interface IWorkflowHealthCheckNode<N extends string> extends IWorkflowActionNode<N, "healthCheck"> {
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

export type IWorkflowErrorHandlingNodes<N extends string> =
  | IWorkflowErrorHandlerNode<N>
  | IWorkflowRetryNode<N>
  | IWorkflowLoggerNode<N>
  | IWorkflowMetricsNode<N>
  | IWorkflowHealthCheckNode<N>;
// #endregion
