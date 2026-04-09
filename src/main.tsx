import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { validateEnv } from "./lib/env";
import App from "./App.tsx";
import "./index.css";

// Validate environment variables on startup
validateEnv();

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>
);
