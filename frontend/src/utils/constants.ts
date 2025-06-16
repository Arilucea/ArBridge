
export const CHAINS = {
  SOLANA: "SOLANA",
  EVM: "EVM", // Represents any EVM-compatible chain supported by the backend
} as const; // Use 'as const' for stricter typing

// Mapping from backend status strings to user-friendly display strings
export const STATUS_MAP: { [key: string]: string } = {
  PENDING: "Pending Confirmation",
  PROCESSING: "Processing Bridge",
  COMPLETED: "Completed",
  FAILED_SOURCE_TX: "Failed (Source Tx)",
  FAILED_DEST_TX: "Failed (Destination Tx)",
  FAILED_VALIDATION: "Failed (Validation)",
  UNKNOWN: "Unknown Status",
};