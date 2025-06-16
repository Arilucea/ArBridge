
import { SolanaFormData, EvmFormData, RequestStatusResponse, BlockExplorers } from "../types/api"; // Import types

// Use environment variable for base URL if available, otherwise default
const API_BASE_URL: string = process.env.REACT_APP_API_BASE_URL || "http://localhost:8000";


// Helper function for handling API responses
const handleResponse = async <T>(response: Response): Promise<T> => {
    // Check if the response is JSON, otherwise return text or handle differently
    const contentType = response.headers.get("content-type");
    let data: any; // Use 'any' initially, then cast or validate

    if (contentType && contentType.includes("application/json")) {
         data = await response.json();
    } else {
         // Handle non-JSON responses if necessary, e.g., plain text error messages
         data = await response.text(); // Get response as text
         if (!response.ok) {
             // Try to parse text as error message, or use default
             throw new Error(data || `Request failed with status ${response.status}`);
         }
         // If response is OK but not JSON, might need specific handling
         // For now, we assume successful non-JSON might need casting later
         return data as T; // Risky cast, better to handle specific non-JSON types
    }


    if (!response.ok) {
        // Try to extract error message from JSON data, default to generic message
        const errorMessage = data?.error || data?.message || `Request failed with status ${response.status}`;
        throw new Error(errorMessage);
    }

    return data as T; // Cast to expected type T
};


// Submit a new Solana to EVM bridge request
export const submitSolanaToEvmRequest = async (formData: SolanaFormData): Promise<RequestStatusResponse> => {
  const response = await fetch(`${API_BASE_URL}/bridge/solana-to-evm`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
       "Accept": "application/json", // Indicate we expect JSON back
    },
    body: JSON.stringify(formData),
  });
  return handleResponse<RequestStatusResponse>(response);
};

// Submit a new EVM to Solana bridge request
export const submitEvmToSolanaRequest = async (formData: EvmFormData): Promise<RequestStatusResponse> => {
  const response = await fetch(`${API_BASE_URL}/bridge/evm-to-solana`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify(formData),
  });
  return handleResponse<RequestStatusResponse>(response);
};

// Check the status of a request
export const checkRequestStatus = async (requestId: string): Promise<RequestStatusResponse> => {
  const response = await fetch(`${API_BASE_URL}/bridge/requests/${requestId}`, {
    method: "GET",
    headers: {
       "Accept": "application/json",
    },
  });
  return handleResponse<RequestStatusResponse>(response);
};

// Fetch pending requests (returns list of request IDs)
export const fetchPendingRequests = async (): Promise<string[]> => {
  const response = await fetch(`${API_BASE_URL}/bridge/pending-requests`, {
    method: "GET",
    headers: {
      "Accept": "application/json",
    },
  });
  // Expecting an array of strings
  const data = await handleResponse<string[]>(response);
  // Filter out empty strings just in case
  return data.filter(id => typeof id === 'string' && id.trim() !== "");
};

// Fetch completed requests (returns list of request IDs)
export const fetchCompletedRequests = async (): Promise<string[]> => {
  const response = await fetch(`${API_BASE_URL}/bridge/completed-requests`, {
    method: "GET",
    headers: {
       "Accept": "application/json",
    },
  });
   // Expecting an array of strings
   const data = await handleResponse<string[]>(response);
   // Filter out empty strings just in case
  return data.filter(id => typeof id === 'string' && id.trim() !== "");
};

// Fetch block explorer URLs
export const fetchBlockExplorers = async (): Promise<BlockExplorers> => {
  const response = await fetch(`${API_BASE_URL}/bridge/block_explorers`, {
    method: "GET",
    headers: {
      "Accept": "application/json",
    },
  });
  return handleResponse<BlockExplorers>(response);
};