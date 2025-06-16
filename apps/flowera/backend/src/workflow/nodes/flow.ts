import { IWorkflowActionNode, IWorkflowConditionNode } from "./base";

// #region Flow Control Nodes
export interface IWorkflowIfNode<N extends string = string> extends IWorkflowConditionNode<N, "if"> {
  conditionType: "if";
  properties: {
    conditions: {
      field: string;
      operator:
        | "equals"
        | "notEquals"
        | "contains"
        | "notContains"
        | "greaterThan"
        | "lessThan"
        | "greaterThanOrEqual"
        | "lessThanOrEqual"
        | "isEmpty"
        | "isNotEmpty"
        | "regex";
      value: any;
      logicalOperator?: "AND" | "OR";
    }[];
    trueBranch: N; // node name
    falseBranch?: N; // node name
  };
}

export interface IWorkflowSwitchNode<N extends string> extends IWorkflowConditionNode<N, "switch"> {
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

export interface IWorkflowFilterNode<N extends string> extends IWorkflowConditionNode<N, "filter"> {
  conditionType: "filter";
  properties: {
    conditions: {
      field: string;
      operator:
        | "equals"
        | "notEquals"
        | "contains"
        | "notContains"
        | "greaterThan"
        | "lessThan"
        | "greaterThanOrEqual"
        | "lessThanOrEqual"
        | "isEmpty"
        | "isNotEmpty";
      value: any;
      logicalOperator?: "AND" | "OR";
    }[];
    passthrough: boolean; // whether to pass items that match or don't match
  };
}

export interface IWorkflowLoopNode<N extends string> extends IWorkflowConditionNode<N, "loop"> {
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

export interface IWorkflowParallelNode<N extends string> extends IWorkflowConditionNode<N, "parallel"> {
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

export interface IWorkflowDelayNode<N extends string> extends IWorkflowActionNode<N, "delay"> {
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

export type IWorkflowFlowControlNodes<N extends string> =
  | IWorkflowIfNode<N>
  | IWorkflowSwitchNode<N>
  | IWorkflowFilterNode<N>
  | IWorkflowLoopNode<N>
  | IWorkflowParallelNode<N>
  | IWorkflowDelayNode<N>;
// #endregion
