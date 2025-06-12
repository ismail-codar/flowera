import { IWorkflowActionNode } from "./base";

// #region AI & Machine Learning Nodes
export interface IWorkflowOpenAINode <N extends string> extends IWorkflowActionNode<N, "openai"> {
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

export interface IWorkflowAzureOpenAINode <N extends string> extends IWorkflowActionNode<N, "azureOpenAI"> {
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

export interface IWorkflowImageRecognitionNode <N extends string> extends IWorkflowActionNode<N, "imageRecognition"> {
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

export interface IWorkflowSentimentAnalysisNode <N extends string> extends IWorkflowActionNode<N, "sentimentAnalysis"> {
    actionType: "sentimentAnalysis";
    properties: {
        provider: "azure" | "aws" | "google" | "openai";
        text: string;
        language?: string;
        returnScores?: boolean;
    };
}

export interface IWorkflowTextTranslationNode <N extends string> extends IWorkflowActionNode<N, "textTranslation"> {
    actionType: "textTranslation";
    properties: {
        provider: "azure" | "aws" | "google";
        text: string;
        sourceLanguage?: string;
        targetLanguage: string;
        format?: "text" | "html";
    };
}

export type IWorkflowAINodes<N extends string> = 
    | IWorkflowOpenAINode <N>
    | IWorkflowAzureOpenAINode <N>
    | IWorkflowImageRecognitionNode <N>
    | IWorkflowSentimentAnalysisNode<N>
    | IWorkflowTextTranslationNode<N>;
// #endregion
