import { createRoot } from "react-dom/client";
import { validateEnv } from "./lib/env";
import App from "./App.tsx";
import "./index.css";

// Validate environment variables on startup
validateEnv();

createRoot(document.getElementById("root")!).render(<App />);
