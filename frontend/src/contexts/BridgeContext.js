import React, { createContext, useState, useEffect, useContext } from "react";
import { fetchBlockExplorers } from "../services/api";
import { CHAINS } from "../utils/constants";

const BridgeContext = createContext(null);

export const BridgeProvider = ({ children }) => {
  // Bridge type state
  const [bridgeType, setBridgeType] = useState("solana-to-evm");

  // Form states
  const [solanaForm, setSolanaForm] = useState({
    token_mint: "",
    token_account: "",
    origin_network: CHAINS.SOLANA,
    destination_account: "",
  });

  const [evmForm, setEvmForm] = useState({
    token_contract: "",
    token_id: "",
    token_owner: "",
    origin_network: CHAINS.EVM,
    destination_account: "",
  });

  // Pending and completed requests
  const [pendingRequests, setPendingRequests] = useState([]);
  const [completedRequests, setCompletedRequests] = useState([]);
  
  // Block explorer URLs
  const [blockExplorers, setBlockExplorers] = useState({
    EVM: "",
    SOLANA: ""
  });

  // Helper to determine which form to use based on bridgeType
  const currentForm = bridgeType === "solana-to-evm" ? solanaForm : evmForm;
  const setCurrentForm = bridgeType === "solana-to-evm" ? setSolanaForm : setEvmForm;

  useEffect(() => {
    // Load block explorers on context initialization
    const loadExplorers = async () => {
      try {
        const explorers = await fetchBlockExplorers();
        setBlockExplorers(explorers);
      } catch (error) {
        console.error("Failed to load block explorers:", error);
      }
    };
    
    loadExplorers();
  }, []);

  return (
    <BridgeContext.Provider
      value={{
        bridgeType,
        setBridgeType,
        solanaForm,
        setSolanaForm,
        evmForm,
        setEvmForm,
        currentForm,
        setCurrentForm,
        pendingRequests,
        setPendingRequests,
        completedRequests,
        setCompletedRequests,
        blockExplorers
      }}
    >
      {children}
    </BridgeContext.Provider>
  );
};

export const useBridge = () => useContext(BridgeContext);