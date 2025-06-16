import type { IWorkflowGraph } from "../src/workflow/nodes/_all";

// Define the nodes based on the mermaid graph
const manualApprovalWorkflow: IWorkflowGraph<
  | "Manuel Tetikleme"
  | "Onay E-postası Gönder"
  | "Webhook - Onay Yanıtı"
  | "Karar Kontrolü"
  | "Onay Sonucu Bildir"
  | "Onay Teşekkür Sayfası"
  | "Red Sonucu Bildir"
  | "Red Teşekkür Sayfası"
> = {
  name: "Manuel Onay Süreci",
  nodes: [
    {
      activityKey: "trigger_manuel",
      name: "Manuel Tetikleme",
      baseType: "trigger",
      triggerType: "manuel",
      properties: {},
    },
    {
      activityKey: "action_mail",
      name: "Onay E-postası Gönder",
      baseType: "action",
      actionType: "mail",
      properties: {
        to: ["icodar@gmail.com"],
        subject: "Onay İsteği",
        body: `<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8" />
        <title>Onayınız Gerekli</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #2c3e50;">Onay Gerekli</h2>
            <p>Merhaba,</p>
            <p>Aşağıdaki işlem için onayınız gerekiyor. Lütfen tercih ettiğiniz seçeneğe tıklayın:</p>
            <div style="text-align: center; margin: 30px 0;">
                <a
                    href="http://localhost:3000/webhook?workflowInstanceId=_{workflowInstanceId}&nodeName=_{nodeName}&payload=true"
                    style="background-color: #27ae60; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; margin: 0 10px; display: inline-block;"
                >
                    ✅ Onayla
                </a>
                <a
                    href="http://localhost:3000/webhook?workflowInstanceId=_{workflowInstanceId}&nodeName=_{nodeName}&payload=false"
                    style="background-color: #e74c3c; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; margin: 0 10px; display: inline-block;"
                >
                    ❌ Reddet
                </a>
            </div>
            <p>Bu e-posta otomatik olarak gönderilmiştir.</p>
            <p>İyi çalışmalar!</p>
        </div>
    </body>
</html>
`,
        bodyType: "text",
      },
    },
    {
      activityKey: "response_webhookResponse",
      name: "Webhook - Onay Yanıtı",
      baseType: "response",
      responseType: "webhookResponse",
      properties: {
        statusCode: 200,
        body: "Onay alındı",
        bodyType: "text",
      },
    },
    {
      activityKey: "condition_if",
      name: "Karar Kontrolü",
      baseType: "condition",
      conditionType: "if",
      properties: {
        conditions: [
          {
            field: "approvalStatus",
            operator: "equals",
            value: "approved",
          },
        ],
        trueBranch: "Onay Sonucu Bildir",
        falseBranch: "Red Sonucu Bildir",
      },
    },
    {
      activityKey: "action_mail",
      name: "Onay Sonucu Bildir",
      baseType: "action",
      actionType: "mail",
      properties: {
        to: ["icodar@gmail.com"],
        subject: "Onay Sonucu",
        body: `<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8" />
        <title>Süreç Onaylandı</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #27ae60;">✅ Süreç Onaylandı</h2>
            <p>Merhaba,</p>
            <p>İlgili süreç başarıyla <strong>onaylandı</strong>.</p>
            <p><strong>Durum:</strong> Onaylandı</p>
            <p>Bu e-posta otomatik olarak gönderilmiştir.</p>
        </div>
    </body>
</html>
`,
        bodyType: "text",
      },
    },
    {
      activityKey: "response_httpResponse",
      name: "Onay Teşekkür Sayfası",
      baseType: "response",
      responseType: "httpResponse",
      properties: {
        statusCode: 200,
        body: "Onay teşekkürler",
        bodyType: "text",
      },
    },
    {
      activityKey: "action_mail",
      name: "Red Sonucu Bildir",
      baseType: "action",
      actionType: "mail",
      properties: {
        to: ["icodar@gmail.com"],
        subject: "Red Sonucu",
        body: `<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8" />
        <title>Süreç Reddedildi</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #e74c3c;">❌ Süreç Reddedildi</h2>
            <p>Merhaba,</p>
            <p>İlgili süreç <strong>reddedildi</strong>.</p>
            <p><strong>Durum:</strong> Reddedildi</p>
            <p>Bu e-posta otomatik olarak gönderilmiştir.</p>
        </div>
    </body>
</html>
`,
        bodyType: "text",
      },
    },
    {
      activityKey: "response_httpResponse",
      name: "Red Teşekkür Sayfası",
      baseType: "response",
      responseType: "httpResponse",
      properties: {
        statusCode: 200,
        body: "Red teşekkürler",
        bodyType: "text",
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
