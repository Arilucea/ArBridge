
import React from "react";
import { checkRequestStatus } from "../../services/api";
import { RequestStatusResponse } from "../../types/api";

interface CheckRequestFormProps {
  requestId: string;
  setRequestId: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  setResponse: React.Dispatch<React.SetStateAction<RequestStatusResponse | null>>;
}

const CheckRequestForm: React.FC<CheckRequestFormProps> = ({
  requestId,
  setRequestId,
  isLoading,
  setIsLoading,
  setError,
  setResponse
}) => {
  const handleRequestIdChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setRequestId(e.target.value);
  };

  const handleCheckRequest = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (!requestId.trim()) {
      setError("Please enter a request ID");
      return;
    }

    setIsLoading(true);
    setResponse(null);
    setError(null);

    try {
      const data: RequestStatusResponse = await checkRequestStatus(requestId);
      setResponse(data);
    } catch (error: any) { // Catch specific error types if possible
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
            aria-label="Request ID"
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