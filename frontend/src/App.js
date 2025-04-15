import React, { useState } from "react";
import { BridgeProvider } from "./contexts/BridgeContext";
import Layout from "./components/Layout/Layout";
import NewRequestForm from "./components/NewRequest/NewRequestForm";
import CheckRequestForm from "./components/CheckRequest/CheckRequestForm";
import PendingRequestsList from "./components/PendingRequests/PendingRequestsList";
import CompletedRequestsList from "./components/CompletedRequests/CompletedRequestsList";
import RequestDetails from "./components/CheckRequest/RequestDetails";
import ErrorMessage from "./components/shared/ErrorMessage";
import "./App.css";

function App() {
  // Navigation state
  const [activeTab, setActiveTab] = useState("new-request");
  
  // Shared states
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);
  const [requestId, setRequestId] = useState("");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setError(null);
    setResponse(null);
  };

  return (
    <BridgeProvider>
      <Layout activeTab={activeTab} onTabChange={handleTabChange}>
        {activeTab === "new-request" && (
          <NewRequestForm 
            setIsLoading={setIsLoading} 
            isLoading={isLoading}
            setError={setError}
            setResponse={setResponse}
          />
        )}

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