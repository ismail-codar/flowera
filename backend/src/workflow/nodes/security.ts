import { IWorkflowActionNode } from "./base";

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
