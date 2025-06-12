import { IWorkflowActionNode } from "./base";

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
