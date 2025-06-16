// ===== Inicio Contenido de: components/PendingRequests/PendingRequestsList.tsx =====

import React, { useEffect } from "react"; // Added useEffect
import { useBridge } from "../../contexts/BridgeContext";
import { fetchPendingRequests, checkRequestStatus } from "../../services/api";
import RequestsTable from "../shared/RequestsTable";
import LoadingSpinner from "../shared/LoadingSpinner";
import { RequestStatusResponse } from "../../types/api";

interface PendingRequestsListProps {
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  setRequestId: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  setResponse: React.Dispatch<React.SetStateAction<RequestStatusResponse | null>>;
}

const PendingRequestsList: React.FC<PendingRequestsListProps> = ({
  setActiveTab,
  setRequestId,
  isLoading,
  setIsLoading,
  setError,
  setResponse
}) => {
  const context = useBridge();

    // Fetch on initial mount
    useEffect(() => {
      if (context) {
          fetchRequests();
      }
    }, []); 


  // Handle context potentially being null during initial render
  if (!context) {
    return <LoadingSpinner />; // Or some other placeholder/error
  }
  // Destructure after confirming context exists
  const { pendingRequests, setPendingRequests } = context;


  const handleCheckPendingRequest = async (idToCheck: string): Promise<void> => {
     // Navigate first
    setActiveTab("check-request");
    setRequestId(idToCheck); // Set ID for the check form

     // Then fetch details for display
     setIsLoading(true);
     setError(null);
     setResponse(null); // Clear previous response
     try {
       const data: RequestStatusResponse = await checkRequestStatus(idToCheck);
       setResponse(data); // Set response for details view in App.tsx
     } catch (error: any) {
       setError(error.message || "Failed to fetch details for request ID: " + idToCheck);
       setActiveTab("pending-requests"); // Stay here on error?
     } finally {
       setIsLoading(false);
     }
  };

  const fetchRequests = async (): Promise<void> => {
    // Check context exists before using its setters if necessary inside here too
    if (!context || !context.setPendingRequests) {
        setError("Context not available to fetch requests.");
        return;
    }
    setIsLoading(true);
    setError(null);

    try {
        const data: string[] = await fetchPendingRequests();
        // Ensure setter exists before calling
        context.setPendingRequests(data);

    } catch (error: any) {
        setError(error.message || "An error occurred while fetching completed requests");
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="pending-requests">
      <h2>Pending Requests</h2>

      {isLoading ? (
        <LoadingSpinner />
      ) : pendingRequests.length === 0 ? (
        <div className="no-pending-requests">
          <p>No pending requests found.</p>
        </div>
      ) : (
        <RequestsTable
          requests={pendingRequests}
          onCheckRequest={handleCheckPendingRequest}
          emptyMessage="No pending requests available."
        />
      )}

      <button
        onClick={fetchRequests}
        className="submit-button"
        disabled={isLoading}
      >
        {isLoading ? "Refreshing..." : "Refresh Pending Requests"}
      </button>
    </div>
  );
};

export default PendingRequestsList;

// ===== Fin Contenido de: components/PendingRequests/PendingRequestsList.tsx =====