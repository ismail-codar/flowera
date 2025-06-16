import type { IWorkflowGraph, IWorkflowNode } from "../nodes/_all";

export const findRootGraphNodes = (graph: IWorkflowGraph<any>): IWorkflowNode<any>[] => {
  const inputTargets = new Set(graph.edges.map((edge) => edge.target));
  const outputSources = new Set(graph.edges.map((edge) => edge.source));

  return graph.nodes.filter((node) => !inputTargets.has(node.name) && outputSources.has(node.name));
};

export const compileTemplate = (template, params: Record<string, any>) => {
  const fn = new Function(...Object.keys(params), `return \`${template.replaceAll("_{", "${")}\`;`);
  return fn(...Object.values(params));
};
