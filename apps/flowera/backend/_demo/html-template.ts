import { compileTemplate } from "../src/workflow/utils/graph-util";

const template = `
<a href="localhost:3000/webhook?workflowInstanceId=_{workflowInstanceId}&workflowName=_{workflowName}&nodeName=_{nodeName}&payload=true">
✅ Onayla
</a>
`;

const workflowInstanceId = "45423534525v23";
const workflowName = "Deneme Workflow";
const nodeName = "Mail onayı";

const res = compileTemplate(template, {
  workflowInstanceId,
  workflowName,
  nodeName,
});
console.log(res);
