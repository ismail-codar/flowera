
interface IWorkflowNode<N> {
    name: N;
    properties: {};
}


export interface IWorkflow<N> {
    nodes: IWorkflowNode<N>[];
    edges: {
        label?: string;
        source: N;
        target: N;
    }[];
}


const w1: IWorkflow<"mail" | "onay" | "teşekkür"> =  {
    nodes: [
        { name: "mail", properties: {} },
        { name: "onay", properties: {} },
        { name: "teşekkür", properties: {} }
    ],
    edges: [
        { label: "Mail gönder", source: "mail", target: "onay" },
        { label: "Onay", source: "onay", target: "teşekkür" }
    ]
}