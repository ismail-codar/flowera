// #region Core Base Types
interface IWorkflowBaseNode<T extends "trigger" | "action" | "condition" | "response"> {
    name: string;
    baseType: T;
    properties: {};
}

// Base node categories
interface IWorkflowTriggerNode<T extends string> extends IWorkflowBaseNode<"trigger"> {
    baseType: 'trigger';
    triggerType: T;
}

interface IWorkflowActionNode<T extends string> extends IWorkflowBaseNode<"action"> {
    baseType: 'action';
    actionType: T;
}

interface IWorkflowConditionNode<T extends string> extends IWorkflowBaseNode<"condition"> {
    baseType: 'condition';
    conditionType: T;
}

interface IWorkflowResponseNode<T extends string> extends IWorkflowBaseNode<"response"> {
    baseType: 'response';
    responseType: T;
}
// #endregion

export {
    IWorkflowBaseNode,
    IWorkflowTriggerNode,
    IWorkflowActionNode,
    IWorkflowConditionNode,
    IWorkflowResponseNode,
};