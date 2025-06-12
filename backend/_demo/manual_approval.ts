import { IWorkflow } from '../src/workflow/nodes/_all';

// Define the nodes based on the mermaid graph
const manualApprovalWorkflow: IWorkflow = {
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
            trueBranch: 'node5',
            falseBranch: 'node7',
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
        {
            source: 'node1',
            target: 'node2',
        },
      ],
};

export default manualApprovalWorkflow;
