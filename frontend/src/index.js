import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import ErrorBoundary from "./components/shared/ErrorBoundary";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ErrorBoundary showDetails={process.env.NODE_ENV === "development"}>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);