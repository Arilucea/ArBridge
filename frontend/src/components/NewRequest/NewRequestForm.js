import React from "react";
import { useBridge } from "../../contexts/BridgeContext";
import SolanaToEvmForm from "./SolanaToEvmForm";
import EvmToSolanaForm from "./EvmToSolanaForm";
import { submitSolanaToEvmRequest, submitEvmToSolanaRequest } from "../../services/api";

const NewRequestForm = ({ isLoading, setIsLoading, setError, setResponse }) => {
  const { bridgeType, setBridgeType, currentForm } = useBridge();

  const handleBridgeTypeChange = (e) => {
    setBridgeType(e.target.value);
    setError(null);
    setResponse(null);
  };

  const handleSubmitNewRequest = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setResponse(null);
    setError(null);

    try {
      let data;
      if (bridgeType === "solana-to-evm") {
        data = await submitSolanaToEvmRequest(currentForm);
      } else {
        data = await submitEvmToSolanaRequest(currentForm);
      }
      
      setResponse(data);
    } catch (error) {
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