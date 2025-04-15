import React from "react";
import { useBridge } from "../../contexts/BridgeContext";
import { fetchPendingRequests, checkRequestStatus } from "../../services/api";
import RequestsTable from "../shared/RequestsTable";
import LoadingSpinner from "../shared/LoadingSpinner";

const PendingRequestsList = ({ 
  setActiveTab, 
  setRequestId, 
  isLoading, 
  setIsLoading, 
  setError, 
  setResponse 
}) => {  
  const { pendingRequests, setPendingRequests } = useBridge();

  const handleCheckPendingRequest = async (requestId) => {
    setActiveTab("check-request");
    setRequestId(requestId);
    let data = await checkRequestStatus(requestId)
    setResponse(data)
  };    

  const fetchRequests = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchPendingRequests();
      setPendingRequests(data);
    } catch (error) {
      setError(error.message || "An error occurred while fetching pending requests");
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