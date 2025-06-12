import { IWorkflowResponseNode } from "./base";

// #region Response Nodes
export interface IWorkflowWebhookResponseNode <N extends string> extends IWorkflowResponseNode<N, "webhookResponse"> {
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

export interface IWorkflowHttpResponseNode <N extends string> extends IWorkflowResponseNode<N, "httpResponse"> {
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

export interface IWorkflowApiResponseNode <N extends string> extends IWorkflowResponseNode<N, "apiResponse"> {
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

export interface IWorkflowWebhookSuccessResponseNode <N extends string> extends IWorkflowWebhookResponseNode<N> {
    properties: IWorkflowWebhookResponseNode<N>['properties'] & {
        statusCode: 200 | 201 | 202 | 204;
        successMessage?: string;
        acknowledgment?: {
            received: boolean;
            processedAt: string;
            transactionId?: string;
        };
    };
}

export interface IWorkflowWebhookErrorResponseNode <N extends string> extends IWorkflowWebhookResponseNode<N> {
    properties: IWorkflowWebhookResponseNode<N>['properties'] & {
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

export interface IWorkflowWebhookAsyncResponseNode <N extends string> extends IWorkflowWebhookResponseNode<N> {
    properties: IWorkflowWebhookResponseNode<N>['properties'] & {
        statusCode: 202;
        callbackUrl?: string;
        pollUrl?: string;
        estimatedDuration?: number;
        jobId: string;
        status: "accepted" | "processing" | "queued";
    };
}

export interface IWorkflowConditionalResponseNode <N extends string> extends IWorkflowResponseNode<N, "conditionalResponse"> {
    responseType: "conditionalResponse";
    properties: {
        conditions: {
            field: string;
            operator: "equals" | "notEquals" | "contains" | "notContains" | "greaterThan" | "lessThan" | "isEmpty" | "isNotEmpty";
            value: any;
            response: IWorkflowWebhookResponseNode<N> | IWorkflowHttpResponseNode<N> | IWorkflowApiResponseNode<N>;
        }[];
        defaultResponse: IWorkflowWebhookResponseNode<N> | IWorkflowHttpResponseNode<N> | IWorkflowApiResponseNode<N>;
    };
}

export interface IWorkflowResponseTemplateNode <N extends string> extends IWorkflowResponseNode<N, "responseTemplate"> {
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

export type IWorkflowResponseNodes<N extends string> = 
    | IWorkflowWebhookResponseNode <N>
    | IWorkflowHttpResponseNode <N>
    | IWorkflowApiResponseNode<N>
    | IWorkflowWebhookSuccessResponseNode<N>
    | IWorkflowWebhookErrorResponseNode<N>
    | IWorkflowWebhookAsyncResponseNode<N>
    | IWorkflowConditionalResponseNode<N>
    | IWorkflowResponseTemplateNode<N>;
// #endregion
