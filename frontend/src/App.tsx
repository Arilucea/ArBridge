import React, { useState } from "react";
import { BridgeProvider } from "./contexts/BridgeContext"; // Ensure correct path
import Layout from "./components/Layout/Layout"; // Ensure correct path
// --- FIX: Import both the component and the props interface ---
import NewRequestForm, { NewRequestFormProps } from "./components/NewRequest/NewRequestForm"; // Ensure correct path
// --- End Fix ---
import CheckRequestForm from "./components/CheckRequest/CheckRequestForm"; // Ensure correct path
import PendingRequestsList from "./components/PendingRequests/PendingRequestsList"; // Ensure correct path
import CompletedRequestsList from "./components/CompletedRequests/CompletedRequestsList"; // Ensure correct path
import RequestDetails from "./components/CheckRequest/RequestDetails"; // Ensure correct path
import ErrorMessage from "./components/shared/ErrorMessage"; // Ensure correct path
import { RequestStatusResponse } from "./types/api"; // Ensure correct path
import "./App.css";

function App() {
  // Navigation state
  const [activeTab, setActiveTab] = useState<string>("new-request");

  // Shared states
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<RequestStatusResponse | null>(null);
  const [requestId, setRequestId] = useState<string>("");

  const handleTabChange = (tab: string): void => {
    setActiveTab(tab);
    setError(null);
    setResponse(null);
  };

  return (
    <BridgeProvider>
      <Layout activeTab={activeTab} onTabChange={handleTabChange}>

        {/* --- FIX: Use explicit prop object workaround --- */}
        {activeTab === "new-request" && (() => {
          // Explicitly create the props object with the correct type
          const newRequestProps: NewRequestFormProps = {
            isLoading: isLoading,
            setIsLoading: setIsLoading,
            setError: setError,
            setResponse: setResponse,
          };
          // Pass the structured props object via spread attributes
          return <NewRequestForm {...newRequestProps} />;
        })()}
        {/* --- End Fix --- */}


        {activeTab === "check-request" && (
          <CheckRequestForm
            requestId={requestId}
            setRequestId={setRequestId}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            setError={setError}
            setResponse={setResponse}
          />
        )}

        {activeTab === "pending-requests" && (
          <PendingRequestsList
            setActiveTab={setActiveTab}
            setRequestId={setRequestId}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            setError={setError}
            setResponse={setResponse}
          />
        )}

        {activeTab === "completed-requests" && (
          <CompletedRequestsList
            setActiveTab={setActiveTab}
            setRequestId={setRequestId}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            setError={setError}
            setResponse={setResponse}
          />
        )}

        {/* Error and Response Display */}
        {error && <ErrorMessage message={error} />}

        {response && (
          <div className="response-container">
            <h2>
              {activeTab === "new-request"
                ? "Bridge Request Submitted"
                : "Request Status"}
            </h2>
            <RequestDetails response={response} />
          </div>
        )}
      </Layout>
    </BridgeProvider>
  );
}

export default App;