import { IWorkflowActionNode } from "./base";

// #region Action Nodes
export interface IWorkflowHttpRequestNode <N extends string> extends IWorkflowActionNode<N, "httpRequest"> {
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

export interface IWorkflowMailNode<N extends string> extends IWorkflowActionNode<N, "mail"> {
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

export interface IWorkflowScriptNode <N extends string> extends IWorkflowActionNode<N, "script"> {
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

export interface IWorkflowFileOperationNode <N extends string> extends IWorkflowActionNode<N, "fileOperation"> {
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

export interface IWorkflowFTPNode <N extends string> extends IWorkflowActionNode<N, "ftp"> {
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


export type IWorkflowBasicActionNodes<N extends string> = 
    | IWorkflowHttpRequestNode <N>
    | IWorkflowMailNode <N>
    | IWorkflowScriptNode<N>
    | IWorkflowFileOperationNode<N>
    | IWorkflowFTPNode<N>;
// #endregion
