import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AudioProvider } from "./context/AudioProvider";
import "./index.css";
import App from "./App";

const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <AudioProvider>
        <App />
      </AudioProvider>
    </StrictMode>
  );
} else {
  console.error("Root element not found");
}
