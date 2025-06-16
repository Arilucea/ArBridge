
import React, { createContext, useState, useEffect, useContext, ReactNode, Dispatch, SetStateAction } from "react";
import { fetchBlockExplorers } from "../services/api";
import { CHAINS } from "../utils/constants";
import { SolanaFormData, EvmFormData, BlockExplorers } from "../types/api"; // Import types

// Define the shape of the context data
interface BridgeContextType {
  bridgeType: string; // Consider 'solana-to-evm' | 'evm-to-solana' for stricter typing
  setBridgeType: Dispatch<SetStateAction<string>>;
  solanaForm: SolanaFormData;
  setSolanaForm: Dispatch<SetStateAction<SolanaFormData>>;
  evmForm: EvmFormData;
  setEvmForm: Dispatch<SetStateAction<EvmFormData>>;
  currentForm: SolanaFormData | EvmFormData; // Union type based on bridgeType
  // setCurrentForm type is complex - it depends on bridgeType. Often managed implicitly.
  // Explicitly providing setCurrentForm might require conditional typing or a wrapper function.
  pendingRequests: string[];
  setPendingRequests: Dispatch<SetStateAction<string[]>>;
  completedRequests: string[];
  setCompletedRequests: Dispatch<SetStateAction<string[]>>;
  blockExplorers: BlockExplorers;
  // setBlockExplorers is internal to the provider in this setup
}

// Create the context with a default value (null or a default object)
// Using null requires checks wherever useContext is used.
// Using a default object avoids null checks but needs careful default values.
const BridgeContext = createContext<BridgeContextType | null>(null);

interface BridgeProviderProps {
  children: ReactNode;
}

// Initial state for forms
const initialSolanaForm: SolanaFormData = {
  token_mint: "",
  token_account: "",
  origin_network: CHAINS.SOLANA,
  destination_account: "",
};

const initialEvmForm: EvmFormData = {
  token_contract: "",
  token_id: "",
  token_owner: "",
  origin_network: CHAINS.EVM,
  destination_account: "",
};

// Initial state for block explorers
const initialBlockExplorers: BlockExplorers = {
    EVM: "",
    SOLANA: ""
};


export const BridgeProvider: React.FC<BridgeProviderProps> = ({ children }) => {
  // Bridge type state
  const [bridgeType, setBridgeType] = useState<string>("solana-to-evm");

  // Form states
  const [solanaForm, setSolanaForm] = useState<SolanaFormData>(initialSolanaForm);
  const [evmForm, setEvmForm] = useState<EvmFormData>(initialEvmForm);

  // Pending and completed requests
  const [pendingRequests, setPendingRequests] = useState<string[]>([]);
  const [completedRequests, setCompletedRequests] = useState<string[]>([]);

  // Block explorer URLs
  const [blockExplorers, setBlockExplorers] = useState<BlockExplorers>(initialBlockExplorers);

  // Helper to determine which form to use based on bridgeType
  const currentForm = bridgeType === "solana-to-evm" ? solanaForm : evmForm;
  // The 'setCurrentForm' concept is implicitly handled by setSolanaForm/setEvmForm

  useEffect(() => {
    // Load block explorers on context initialization
    const loadExplorers = async (): Promise<void> => {
      try {
        const explorers: BlockExplorers = await fetchBlockExplorers();
        setBlockExplorers(explorers);
      } catch (error) {
        console.error("Failed to load block explorers:", error);
        // Handle error appropriately, e.g., set default explorers or show error message
      }
    };

    loadExplorers();
  }, []); // Empty dependency array ensures this runs only once on mount

  // The value provided to the context consumers
  const contextValue: BridgeContextType = {
    bridgeType,
    setBridgeType,
    solanaForm,
    setSolanaForm,
    evmForm,
    setEvmForm,
    currentForm, // Provide the derived current form
    // setCurrentForm is not directly provided, state setters are used instead
    pendingRequests,
    setPendingRequests,
    completedRequests,
    setCompletedRequests,
    blockExplorers
  };


  return (
    <BridgeContext.Provider value={contextValue}>
      {children}
    </BridgeContext.Provider>
  );
};

// Custom hook to use the BridgeContext
// Includes a check to ensure the context is used within a provider
export const useBridge = (): BridgeContextType => {
  const context = useContext(BridgeContext);
  if (context === null) {
    throw new Error("useBridge must be used within a BridgeProvider");
  }
  return context;
};