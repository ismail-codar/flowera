import { IWorkflowActionNode, IWorkflowConditionNode } from "./base";

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
