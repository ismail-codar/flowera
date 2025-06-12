import { IWorkflow } from '../src/workflow/nodes/_all';

// Define the nodes based on the mermaid graph
const manualApprovalWorkflow: IWorkflow<
'Manuel Tetikleme' 
| 'Onay E-postası Gönder' 
| 'Webhook - Onay Yanıtı' 
| 'Karar Kontrolü'
| 'Onay Sonucu Bildir'
| 'Onay Teşekkür Sayfası'
| 'Red Sonucu Bildir'
| 'Red Teşekkür Sayfası'
> = {
    nodes: [
        {
          name: 'Manuel Tetikleme',
          baseType: 'trigger',
          triggerType: 'manuel',
          properties: {},
        },
        {
          name: 'Onay E-postası Gönder',
          baseType: 'action',
          actionType: 'mail',
          properties: {
            to: ['recipient@example.com'],
            subject: 'Onay İsteği',
            body: 'Lütfen onayınızı yapın.',
            bodyType: 'text',
          },
        },
        {
          name: 'Webhook - Onay Yanıtı',
          baseType: 'response',
          responseType: 'webhookResponse',
          properties: {
            statusCode: 200,
            body: 'Onay alındı',
            bodyType: 'text',
          },
        },
        {
          name: 'Karar Kontrolü',
          baseType: 'condition',
          conditionType: 'if',
          properties: {
            conditions: [
              {
                field: 'approvalStatus',
                operator: 'equals',
                value: 'approved',
              },
            ],
            trueBranch: 'Onay Sonucu Bildir',
            falseBranch: 'Red Sonucu Bildir',
          },
        },
        {
          name: 'Onay Sonucu Bildir',
          baseType: 'action',
          actionType: 'mail',
          properties: {
            to: ['recipient@example.com'],
            subject: 'Onay Sonucu',
            body: 'Onay başarıyla tamamlandı.',
            bodyType: 'text',
          },
        },
        {
          name: 'Onay Teşekkür Sayfası',
          baseType: 'response',
          responseType: 'httpResponse',
          properties: {
            statusCode: 200,
            body: 'Onay teşekkürler',
            bodyType: 'text',
          },
        },
        {
          name: 'Red Sonucu Bildir',
          baseType: 'action',
          actionType: 'mail',
          properties: {
            to: ['recipient@example.com'],
            subject: 'Red Sonucu',
            body: 'Onay reddedildi.',
            bodyType: 'text',
          },
        },
        {
          name: 'Red Teşekkür Sayfası',
          baseType: 'response',
          responseType: 'httpResponse',
          properties: {
            statusCode: 200,
            body: 'Red teşekkürler',
            bodyType: 'text',
          },
        },
      ],
      edges: [
        { source: "Manuel Tetikleme", target: "Onay E-postası Gönder" },
        { source: "Onay E-postası Gönder", target: "Webhook - Onay Yanıtı" },
        { source: "Webhook - Onay Yanıtı", target: "Karar Kontrolü" },
        { source: "Karar Kontrolü", target: "Onay Sonucu Bildir", label: "Onay" },
        { source: "Karar Kontrolü", target: "Red Sonucu Bildir", label: "Red" },
        { source: "Onay Sonucu Bildir", target: "Onay Teşekkür Sayfası" },
        { source: "Red Sonucu Bildir", target: "Red Teşekkür Sayfası" },
      ],
};

export default manualApprovalWorkflow;
