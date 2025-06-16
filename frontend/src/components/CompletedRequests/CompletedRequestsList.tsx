// ===== Inicio Contenido de: components/CompletedRequests/CompletedRequestsList.tsx =====

import React, { useEffect } from "react";
import { useBridge } from "../../contexts/BridgeContext";
import { fetchCompletedRequests, checkRequestStatus } from "../../services/api";
import RequestsTable from "../shared/RequestsTable";
import LoadingSpinner from "../shared/LoadingSpinner";
import { RequestStatusResponse } from "../../types/api";

interface CompletedRequestsListProps {
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  setRequestId: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  setResponse: React.Dispatch<React.SetStateAction<RequestStatusResponse | null>>;
}

const CompletedRequestsList: React.FC<CompletedRequestsListProps> = ({
  setActiveTab,
  setRequestId,
  isLoading,
  setIsLoading,
  setError,
  setResponse
}) => {
  const context = useBridge();

  useEffect(() => {
    if (context) {
        fetchRequests();
    }
  }, []); 


  // Handle context potentially being null during initial render before useEffect runs
  if (!context) {
      return <LoadingSpinner />; // Or some other placeholder/error
  }
  // Destructure after confirming context exists
  const { completedRequests, setCompletedRequests } = context;


  const handleCheckCompletedRequest = async (idToCheck: string): Promise<void> => {
    // Navigate first
    setActiveTab("check-request");
    setRequestId(idToCheck); // Set the ID for the check form

    // Then fetch details for display in the check-request tab
    setIsLoading(true);
    setError(null);
    setResponse(null); // Clear previous response
    try {
      const data: RequestStatusResponse = await checkRequestStatus(idToCheck);
      setResponse(data); // Set the response for the details view in App.tsx
    } catch (error: any) {
      setError(error.message || "Failed to fetch details for request ID: " + idToCheck);
      // Optionally navigate back or show error prominently
       setActiveTab("completed-requests"); // Stay on this tab if fetch fails?
    } finally {
      setIsLoading(false);
    }
  };

  // Define fetchRequests inside the component or use useCallback if needed elsewhere
  const fetchRequests = async (): Promise<void> => {
    // Check context exists before using its setters if necessary inside here too
    if (!context || !context.setCompletedRequests) {
        setError("Context not available to fetch requests.");
        return;
    }
    setIsLoading(true);
    setError(null);

    try {
        const data: string[] = await fetchCompletedRequests();
        // Ensure setter exists before calling
       context.setCompletedRequests(data);

    } catch (error: any) {
        setError(error.message || "An error occurred while fetching completed requests");
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="completed-requests">
      <h2>Completed Requests</h2>

      {isLoading ? (
        <LoadingSpinner />
      ) : completedRequests.length === 0 ? (
        <div className="no-completed-requests">
          <p>No completed requests found.</p>
        </div>
      ) : (
        <RequestsTable
          requests={completedRequests}
          onCheckRequest={handleCheckCompletedRequest}
          emptyMessage="No completed requests available."
        />
      )}

      <button
        onClick={fetchRequests}
        className="submit-button"
        disabled={isLoading}
      >
        {isLoading ? "Refreshing..." : "Refresh Completed Requests"}
      </button>
    </div>
  );
};

export default CompletedRequestsList;

// ===== Fin Contenido de: components/CompletedRequests/CompletedRequestsList.tsx =====