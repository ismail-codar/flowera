import { IWorkflowActionNode } from "./base";

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
