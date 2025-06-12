import { IWorkflowActionNode } from "./base";

// #region Data Transformation Nodes
export interface IWorkflowDataTransformNode <N extends string> extends IWorkflowActionNode<N, "dataTransform"> {
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

export interface IWorkflowDataValidationNode <N extends string> extends IWorkflowActionNode<N, "dataValidation"> {
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

export interface IWorkflowCSVProcessorNode <N extends string> extends IWorkflowActionNode<N, "csvProcessor"> {
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

export interface IWorkflowJSONProcessorNode <N extends string> extends IWorkflowActionNode<N, "jsonProcessor"> {
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

export interface IWorkflowXMLProcessorNode <N extends string> extends IWorkflowActionNode<N, "xmlProcessor"> {
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

export type IWorkflowDataTransformationNodes<N extends string> = 
    | IWorkflowDataTransformNode <N>
    | IWorkflowDataValidationNode <N>
    | IWorkflowCSVProcessorNode<N>
    | IWorkflowJSONProcessorNode<N>
    | IWorkflowXMLProcessorNode<N>;
// #endregion
