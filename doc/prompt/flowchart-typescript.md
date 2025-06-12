Generate data with IWorkflow type like the following mermaid graph

graph TD

A[Manuel Tetikleme] --> B[Onay E-postası Gönder]
B --> C[Webhook - Onay Yanıtı]
C --> D[Karar Kontrolü]

D -- Onay --> E[Onay Sonucu Bildir]
E --> F[Onay Teşekkür Sayfası]

D -- Red --> G[Red Sonucu Bildir]
G --> H[Red Teşekkür Sayfası]

@/backend/src/workflow/nodes/_all.ts @/backend/src/workflow/nodes/response.ts  @/backend\src\workflow\nodes\flow.ts @/backend\src\workflow\nodes\base.ts @/backend\src\workflow\nodes\action.ts