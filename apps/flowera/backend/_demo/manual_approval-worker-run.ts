import { DaprWorkflowClient, WorkflowRuntime, DaprClient } from "@dapr/dapr";
import { DaprServer, CommunicationProtocolEnum } from "@dapr/dapr";

import express from "express";
import bodyParser from "body-parser";
import { type createDaprWorkflowFromGraph, registerWorkflowToDapr } from "../src/workflow/dapr/runner";
import manualApprovalWorkflow from "./manual_approval";

const daprHost = process.env.DAPR_HOST ?? "localhost"; // Dapr Sidecar Host
const daprPort = process.env.DAPR_HTTP_PORT || "3500"; // Dapr Sidecar Port of this Example Server

const app = express();
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

const daprServer = new DaprServer({
  serverHost: "127.0.0.1", // App Host
  serverPort: process.env.APP_PORT || "3000", // App Port
  serverHttp: app,
  communicationProtocol: CommunicationProtocolEnum.HTTP, // Add this line
  clientOptions: {
    daprHost,
    daprPort,
  },
});

const daprClient = new DaprClient();
const workflowClient = new DaprWorkflowClient();
const workflowWorker = new WorkflowRuntime();
const workflowByName = new Map<string, ReturnType<typeof createDaprWorkflowFromGraph>>();

app.post("/start-workflow", async (req, res) => {
  // Schedule a new orchestration
  try {
    const workflowName = req.body.workflowName;
    const input = req.body.input;
    const workflow = workflowByName.get(workflowName);
    if (!workflow) throw new Error(`Workflow ${workflowName} not found`);
    const id = await workflowClient.scheduleNewWorkflow(workflowName, { input });
    console.log(`Orchestration scheduled with ID: ${id}`);

    // Wait for orchestration completion
    const state = await workflowClient.waitForWorkflowCompletion(id, undefined, 30);

    const orchestrationResult = `Orchestration completed! Result: ${state?.serializedOutput}`;
    console.log(orchestrationResult);
    res.send(orchestrationResult);
  } catch (error) {
    console.error("Error scheduling or waiting for orchestration:", error);
    throw error;
  }
});

async function start() {
  // TODO register işlemi rest api ile yada db den okuyup yapılabilir
  try {
    registerWorkflowToDapr(workflowWorker, workflowByName, manualApprovalWorkflow, app);
    await workflowWorker.start();
    console.log("Workflow runtime started successfully");
  } catch (error) {
    console.error("Error starting workflow runtime:", error);
  }

  // Initialize subscriptions before the server starts, the Dapr sidecar uses it.
  // This will also initialize the app server itself (removing the need for `app.listen` to be called).
  await daprServer.start();
}

start().catch((e) => {
  workflowWorker.stop();
  console.error(e);
  process.exit(1);
});
