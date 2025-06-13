import { DaprWorkflowClient, WorkflowRuntime, DaprClient, CommunicationProtocolEnum } from "@dapr/dapr";
import { createDaprWorkflow } from "../src/workflow/dapr/runner";
import manualApprovalWorkflow from "./manual_approval";

const workflowWorker = new WorkflowRuntime();

async function start() {
  // Update the gRPC client and worker to use a local address and port
  const workflowClient = new DaprWorkflowClient();

  const daprHost = process.env.DAPR_HOST ?? "127.0.0.1";
  const daprPort = process.env.DAPR_GRPC_PORT ?? "50001";

  const daprClient = new DaprClient({
    daprHost,
    daprPort,
    communicationProtocol: CommunicationProtocolEnum.GRPC,
  });

  const daprWorkflow = createDaprWorkflow(manualApprovalWorkflow);
  workflowWorker.registerWorkflow(daprWorkflow.workflow);
  for (const activity of daprWorkflow.activities) {
    workflowWorker.registerActivity(activity);
  }

  // Wrap the worker startup in a try-catch block to handle any errors during startup
  try {
    await workflowWorker.start();
    console.log("Workflow runtime started successfully");
  } catch (error) {
    console.error("Error starting workflow runtime:", error);
  }

  // Schedule a new orchestration
  try {
    const id = await workflowClient.scheduleNewWorkflow(daprWorkflow.workflow, {});
    console.log(`Orchestration scheduled with ID: ${id}`);

    // Wait for orchestration completion
    const state = await workflowClient.waitForWorkflowCompletion(id, undefined, 30);

    console.log(`Orchestration completed! Result: ${state?.serializedOutput}`);
  } catch (error) {
    console.error("Error scheduling or waiting for orchestration:", error);
    throw error;
  }

  await workflowClient.stop();
}

process.on("SIGTERM", () => {
  workflowWorker.stop();
});

start().catch((e) => {
  console.error(e);
  process.exit(1);
});
