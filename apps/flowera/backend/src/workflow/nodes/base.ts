// #region Core Base Types
interface IWorkflowBaseNode<N extends string, T extends "trigger" | "action" | "condition" | "response"> {
  name: N;
  baseType: T;
  properties: {};
}

// Base node categories
interface IWorkflowTriggerNode<N extends string, T extends string> extends IWorkflowBaseNode<N, "trigger"> {
  baseType: "trigger";
  triggerType: T;
}

interface IWorkflowActionNode<N extends string, T extends string> extends IWorkflowBaseNode<N, "action"> {
  baseType: "action";
  actionType: T;
}

interface IWorkflowConditionNode<N extends string, T extends string> extends IWorkflowBaseNode<N, "condition"> {
  baseType: "condition";
  conditionType: T;
}

interface IWorkflowResponseNode<N extends string, T extends string> extends IWorkflowBaseNode<N, "response"> {
  baseType: "response";
  responseType: T;
}
// #endregion

export type {
  IWorkflowBaseNode,
  IWorkflowTriggerNode,
  IWorkflowActionNode,
  IWorkflowConditionNode,
  IWorkflowResponseNode,
};
