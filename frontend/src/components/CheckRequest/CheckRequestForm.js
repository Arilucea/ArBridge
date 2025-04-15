import React from "react";
import { checkRequestStatus } from "../../services/api";

const CheckRequestForm = ({ 
  requestId, 
  setRequestId, 
  isLoading, 
  setIsLoading, 
  setError, 
  setResponse 
}) => {
  const handleRequestIdChange = (e) => {
    setRequestId(e.target.value);
  };

  const handleCheckRequest = async (e) => {
    e.preventDefault();
    if (!requestId.trim()) {
      setError("Please enter a request ID");
      return;
    }

    setIsLoading(true);
    setResponse(null);
    setError(null);

    try {
      const data = await checkRequestStatus(requestId);
      setResponse(data);
    } catch (error) {
      setError(error.message || "An error occurred while fetching the request");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="check-request">
      <h2>Request Status</h2>
      <form onSubmit={handleCheckRequest} className="bridge-form">
        <div className="form-group">
          <label htmlFor="request-id">Request ID</label>
          <input
            type="text"
            id="request-id"
            value={requestId}
            onChange={handleRequestIdChange}
            required
            placeholder="Enter your request ID"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="submit-button"
        >
          {isLoading ? "Checking..." : "Check Status"}
        </button>
      </form>
    </div>
  );
};

export default CheckRequestForm;