import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import ErrorBoundary from "./components/shared/ErrorBoundary";
import { BridgeProvider } from './contexts/BridgeContext';
const rootElement = document.getElementById("root");

// Ensure the root element exists before trying to create a root
if (!rootElement) {
  throw new Error("Failed to find the root element");
}

const root = ReactDOM.createRoot(rootElement);


root.render(
  <React.StrictMode>
    <ErrorBoundary showDetails={process.env.NODE_ENV === "development"}>
      <BridgeProvider> {/* <-- Explicit wrap if absolutely needed */}
        <App />
      </BridgeProvider>
    </ErrorBoundary>
  </React.StrictMode>
);