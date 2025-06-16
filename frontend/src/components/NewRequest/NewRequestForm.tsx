import React, { Dispatch, SetStateAction, FormEvent } from "react"; // Ensure all needed types are imported
import { useBridge } from "../../contexts/BridgeContext"; // Ensure correct relative path
import SolanaToEvmForm from "./SolanaToEvmForm"; // Ensure correct relative path
import EvmToSolanaForm from "./EvmToSolanaForm"; // Ensure correct relative path
import { submitSolanaToEvmRequest, submitEvmToSolanaRequest } from "../../services/api"; // Ensure correct relative path
import { RequestStatusResponse, SolanaFormData, EvmFormData } from "../../types/api"; // Ensure correct relative path
import LoadingSpinner from "../shared/LoadingSpinner"; // Ensure correct relative path

// --- FIX: Export the interface so App.tsx can import it ---
export interface NewRequestFormProps {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<string | null>>;
  setResponse: Dispatch<SetStateAction<RequestStatusResponse | null>>;
}
// --- End Fix ---

const NewRequestForm: React.FC<NewRequestFormProps> = ({ isLoading, setIsLoading, setError, setResponse }) => {
  const context = useBridge();

  // Handle context potentially being null
  if (!context) {
      return <LoadingSpinner />; // Or a suitable placeholder
  }

  const { bridgeType, setBridgeType, currentForm } = context;


  const handleBridgeTypeChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setBridgeType(e.target.value);
    setError(null);     // Clear errors when changing type
    setResponse(null);  // Clear previous response
  };

  const handleSubmitNewRequest = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);
    setResponse(null);
    setError(null);

    try {
      let data: RequestStatusResponse;
      if (bridgeType === "solana-to-evm") {
        // Type assertion might be needed if currentForm type isn't narrowed enough
        data = await submitSolanaToEvmRequest(currentForm as SolanaFormData);
      } else {
         // Type assertion might be needed
        data = await submitEvmToSolanaRequest(currentForm as EvmFormData);
      }

      setResponse(data);
      // Optionally clear the form here after successful submission
      // Example: context.setCurrentForm(initialStateForBridgeType);
    } catch (error: any) {
      setError(error.message || `An error occurred during the ${bridgeType} request`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="bridge-selection">
        <label htmlFor="bridge-type">Select Bridge Direction:</label>
        <select
          id="bridge-type"
          value={bridgeType}
          onChange={handleBridgeTypeChange}
          className="bridge-select"
           aria-label="Select Bridge Direction"
        >
          <option value="solana-to-evm">Solana to EVM</option>
          <option value="evm-to-solana">EVM to Solana</option>
        </select>
      </div>

      <form onSubmit={handleSubmitNewRequest} className="bridge-form">
        <h2>
          {bridgeType === "solana-to-evm"
            ? "Solana to EVM Bridge"
            : "EVM to Solana Bridge"}
        </h2>

        {/* Render the correct form based on the selected bridge type */}
        {bridgeType === "solana-to-evm" ? (
          <SolanaToEvmForm />
        ) : (
          <EvmToSolanaForm />
        )}

        <button type="submit" disabled={isLoading} className="submit-button">
          {isLoading ? "Processing..." : "Bridge Tokens"}
        </button>
      </form>
    </>
  );
};

export default NewRequestForm;