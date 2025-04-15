import React from "react";
import { useBridge } from "../../contexts/BridgeContext";
import { fetchCompletedRequests, checkRequestStatus } from "../../services/api";
import RequestsTable from "../shared/RequestsTable";
import LoadingSpinner from "../shared/LoadingSpinner";

const CompletedRequestsList = ({ 
  setActiveTab, 
  setRequestId, 
  isLoading, 
  setIsLoading, 
  setError,
  setResponse 
}) => {
  const { completedRequests, setCompletedRequests } = useBridge();

  const handleCheckCompletedRequest = async (requestId) => {
    setActiveTab("check-request");
    setRequestId(requestId);
    let data = await checkRequestStatus(requestId)
    setResponse(data)
  };

  const fetchRequests = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchCompletedRequests();
      setCompletedRequests(data);
    } catch (error) {
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