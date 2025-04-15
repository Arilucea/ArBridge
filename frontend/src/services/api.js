const API_BASE_URL = "http://localhost:8000";

// Submit a new Solana to EVM bridge request
export const submitSolanaToEvmRequest = async (formData) => {
  const response = await fetch(`${API_BASE_URL}/bridge/solana-to-evm`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.error || "Failed to process Solana to EVM bridge request");
  }
  
  return data;
};

// Submit a new EVM to Solana bridge request
export const submitEvmToSolanaRequest = async (formData) => {
  const response = await fetch(`${API_BASE_URL}/bridge/evm-to-solana`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.error || "Failed to process EVM to Solana bridge request");
  }
  
  return data;
};

// Check the status of a request
export const checkRequestStatus = async (requestId) => {
  const response = await fetch(`${API_BASE_URL}/bridge/requests/${requestId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch request details");
  }
  
  return data;
};

// Fetch pending requests
export const fetchPendingRequests = async () => {
  const response = await fetch(`${API_BASE_URL}/bridge/pending-requests`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  
  if (!response.ok) {
    throw new Error("Failed to fetch pending requests");
  }
  
  // Filter out empty strings
  return data.filter(id => id.trim() !== "");
};

// Fetch completed requests
export const fetchCompletedRequests = async () => {
  const response = await fetch(`${API_BASE_URL}/bridge/completed-requests`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  
  if (!response.ok) {
    throw new Error("Failed to fetch completed requests");
  }
  
  // Filter out empty strings
  return data.filter(id => id.trim() !== "");
};

// Fetch block explorer URLs
export const fetchBlockExplorers = async () => {
  const response = await fetch(`${API_BASE_URL}/bridge/block_explorers`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch block explorers");
  }
  
  return data;
};