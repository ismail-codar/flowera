import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme.ts";

const rootElement = document.getElementById("root");
if (rootElement)
  createRoot(rootElement).render(
    <StrictMode>
      <MantineProvider theme={theme}>
        <App />
      </MantineProvider>
    </StrictMode>,
  );
