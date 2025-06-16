// Script combinado generado automáticamente (recursivo)
// Contiene el código de los archivos .js encontrados en: /home/javier/MS_U/ArBridge/frontend/src y subdirectorios
// Fecha de generación: 2025-04-15 13:01:30 CEST
// ================================================================

// ===== Inicio Contenido de: App.js =====

import React, { useState } from "react";
import { BridgeProvider } from "./contexts/BridgeContext";
import Layout from "./components/Layout/Layout";
import NewRequestForm from "./components/NewRequest/NewRequestForm";
import CheckRequestForm from "./components/CheckRequest/CheckRequestForm";
import PendingRequestsList from "./components/PendingRequests/PendingRequestsList";
import CompletedRequestsList from "./components/CompletedRequests/CompletedRequestsList";
import RequestDetails from "./components/CheckRequest/RequestDetails";
import ErrorMessage from "./components/shared/ErrorMessage";
import "./App.css";

function App() {
  // Navigation state
  const [activeTab, setActiveTab] = useState("new-request");
  
  // Shared states
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);
  const [requestId, setRequestId] = useState("");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setError(null);
    setResponse(null);
  };

  return (
    <BridgeProvider>
      <Layout activeTab={activeTab} onTabChange={handleTabChange}>
        {activeTab === "new-request" && (
          <NewRequestForm 
            setIsLoading={setIsLoading} 
            isLoading={isLoading}
            setError={setError}
            setResponse={setResponse}
          />
        )}

        {activeTab === "check-request" && (
          <CheckRequestForm 
            requestId={requestId}
            setRequestId={setRequestId}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            setError={setError}
            setResponse={setResponse}
          />
        )}

        {activeTab === "pending-requests" && (
          <PendingRequestsList 
            setActiveTab={setActiveTab}
            setRequestId={setRequestId}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            setError={setError}
            setResponse={setResponse}
          />
        )}

        {activeTab === "completed-requests" && (
          <CompletedRequestsList 
            setActiveTab={setActiveTab}
            setRequestId={setRequestId}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            setError={setError}
            setResponse={setResponse}
          />
        )}

        {/* Error and Response Display */}
        {error && <ErrorMessage message={error} />}

        {response && (
          <div className="response-container">
            <h2>
              {activeTab === "new-request"
                ? "Bridge Request Submitted"
                : "Request Status"}
            </h2>
            <RequestDetails response={response} />
          </div>
        )}
      </Layout>
    </BridgeProvider>
  );
}

export default App;

// ===== Fin Contenido de: App.js =====

// ===== Inicio Contenido de: App.test.js =====

import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});


// ===== Fin Contenido de: App.test.js =====

// ===== Inicio Contenido de: components/CheckRequest/CheckRequestForm.js =====

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

// ===== Fin Contenido de: components/CheckRequest/CheckRequestForm.js =====

// ===== Inicio Contenido de: components/CheckRequest/RequestDetails.js =====

import React from "react";
import { useBridge } from "../../contexts/BridgeContext";
import { CHAINS, STATUS_MAP } from "../../utils/constants";
import { formatTimestamp, isEVMTransaction } from "../../utils/formatters";

const RequestDetails = ({ response }) => {
  const { blockExplorers } = useBridge();

  if (!response) return null;

  // Get the mapped status or use original if not found
  const mappedStatus = STATUS_MAP[response.status] || response.status;

  // Determine the labels based on origin network
  const isEVM = response.input.origin_network === CHAINS.EVM;
  const destinationTokenLabel = isEVM ? "Destination Token Account" : "Destination Token ID";
  const destinationContractLabel = isEVM ? "Destination Token Mint" : "Destination Contract ID";
  
  const getTransactionExplorerUrl = (hash) => {
    if (isEVMTransaction(hash)) {
      return blockExplorers.EVM.replace("{}", hash);
    } else {
      return blockExplorers.SOLANA.replace("{}", hash);
    }
  };

  return (
    <div className="request-details-container">
      <table className="request-details-table">
        <tbody>
          <tr>
            <th>Request ID</th>
            <td>{response.id}</td>
          </tr>
          <tr>
            <th>Status</th>
            <td>
              <span className="status-badge" data-status={response.status.toLowerCase()}>
                {mappedStatus}
              </span>
            </td>
          </tr>
          <tr>
            <th>Last Updated</th>
            <td>{formatTimestamp(response.last_update)}</td>
          </tr>
          
          <tr>
            <th colSpan="2" className="section-header">Input Details</th>
          </tr>
          <tr>
            <th>Contract/Mint</th>
            <td>{response.input.contract_or_mint}</td>
          </tr>
          <tr>
            <th>Token ID</th>
            <td>{response.input.token_id || 'N/A'}</td>
          </tr>
          <tr>
            <th>Token Owner</th>
            <td>{response.input.token_owner}</td>
          </tr>
          <tr>
            <th>Origin Network</th>
            <td>{response.input.origin_network}</td>
          </tr>
          <tr>
            <th>Destination Account</th>
            <td>{response.input.destination_account}</td>
          </tr>
          
          <tr>
            <th colSpan="2" className="section-header">Transaction Hashes</th>
          </tr>
          <tr>
            <th>Tx Hashes</th>
            <td>
              {response.tx_hashes && response.tx_hashes.length > 0 
                ? response.tx_hashes.map((hash, index) => (
                    <React.Fragment key={index}>
                      {index > 0 && <div className="tx-hash-separator"></div>}
                      <div className="tx-hash">
                        <a 
                          href={getTransactionExplorerUrl(hash)} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="tx-link"
                          title={`View transaction in ${isEVMTransaction(hash) ? 'EVM' : 'Solana'} explorer`}
                        >
                          {hash}
                        </a>
                      </div>
                    </React.Fragment>
                  ))
                : 'N/A'}
            </td>
          </tr>
          
          <tr>
            <th colSpan="2" className="section-header">Output Details</th>
          </tr>
          <tr>
            <th>{destinationContractLabel}</th>
            <td>{response.output.detination_contract_id_or_mint || 'N/A'}</td>
          </tr>
          <tr>
            <th>{destinationTokenLabel}</th>
            <td>{response.output.detination_token_id_or_account || 'N/A'}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default RequestDetails;

// ===== Fin Contenido de: components/CheckRequest/RequestDetails.js =====

// ===== Inicio Contenido de: components/CompletedRequests/CompletedRequestsList.js =====

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

// ===== Fin Contenido de: components/CompletedRequests/CompletedRequestsList.js =====

// ===== Inicio Contenido de: components/Layout/Layout.js =====

import React from "react";
import Navigation from "./Navigation";

const Layout = ({ children, activeTab, onTabChange }) => {
  return (
    <div className="app-container">
      <Navigation activeTab={activeTab} onTabChange={onTabChange} />
      <div className="container">
        {children}
      </div>
    </div>
  );
};

export default Layout;

// ===== Fin Contenido de: components/Layout/Layout.js =====

// ===== Inicio Contenido de: components/Layout/Navigation.js =====

import React from "react";

const Navigation = ({ activeTab, onTabChange }) => {
  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="logo-container">
          <img 
            src="arbridge-logo.png" 
            alt="ArBridge Logo" 
            className="logo" 
          />
        </div>
        <div className="tab-buttons">
          <button
            className={`tab-button ${activeTab === "new-request" ? "active" : ""}`}
            onClick={() => onTabChange("new-request")}
          >
            New Request
          </button>
          <button
            className={`tab-button ${activeTab === "check-request" ? "active" : ""}`}
            onClick={() => onTabChange("check-request")}
          >
            Check Request
          </button>
          <button
            className={`tab-button ${activeTab === "pending-requests" ? "active" : ""}`}
            onClick={() => onTabChange("pending-requests")}
          >
            Pending Requests
          </button>
          <button
            className={`tab-button ${activeTab === "completed-requests" ? "active" : ""}`}
            onClick={() => onTabChange("completed-requests")}
          >
            Completed Requests
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;

// ===== Fin Contenido de: components/Layout/Navigation.js =====

// ===== Inicio Contenido de: components/NewRequest/EvmToSolanaForm.js =====

import React from "react";
import { useBridge } from "../../contexts/BridgeContext";
import { CHAINS } from "../../utils/constants";

const EvmToSolanaForm = () => {
  const { evmForm, setEvmForm } = useBridge();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvmForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <>
      <div className="form-group">
        <label htmlFor="token_contract">Token Contract</label>
        <input
          type="text"
          id="token_contract"
          name="token_contract"
          value={evmForm.token_contract}
          onChange={handleChange}
          required
          placeholder="Enter EVM token contract address"
        />
      </div>

      <div className="form-group">
        <label htmlFor="token_id">Token ID</label>
        <input
          type="text"
          id="token_id"
          name="token_id"
          value={evmForm.token_id}
          onChange={handleChange}
          required
          placeholder="Enter token ID"
        />
      </div>

      <div className="form-group">
        <label htmlFor="token_owner">Token Owner</label>
        <input
          type="text"
          id="token_owner"
          name="token_owner"
          value={evmForm.token_owner}
          onChange={handleChange}
          required
          placeholder="Enter token owner address"
        />
      </div>

      <div className="form-group">
        <label htmlFor="origin_network">Origin Network</label>
        <select
          id="origin_network"
          name="origin_network"
          value={evmForm.origin_network}
          onChange={handleChange}
          required
          disabled
        >
          <option value={CHAINS.EVM}>EVM</option>
        </select>
        <small className="hint-text">
          Origin network is determined by the bridge direction
        </small>
      </div>

      <div className="form-group">
        <label htmlFor="destination_account">Destination Account</label>
        <input
          type="text"
          id="destination_account"
          name="destination_account"
          value={evmForm.destination_account}
          onChange={handleChange}
          required
          placeholder="Enter Solana destination account address"
        />
      </div>
    </>
  );
};

export default EvmToSolanaForm;

// ===== Fin Contenido de: components/NewRequest/EvmToSolanaForm.js =====

// ===== Inicio Contenido de: components/NewRequest/NewRequestForm.js =====

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

// ===== Fin Contenido de: components/NewRequest/NewRequestForm.js =====

// ===== Inicio Contenido de: components/NewRequest/SolanaToEvmForm.js =====

import React from "react";
import { useBridge } from "../../contexts/BridgeContext";
import { CHAINS } from "../../utils/constants";

const SolanaToEvmForm = () => {
  const { solanaForm, setSolanaForm } = useBridge();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSolanaForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <>
      <div className="form-group">
        <label htmlFor="token_mint">Token Mint</label>
        <input
          type="text"
          id="token_mint"
          name="token_mint"
          value={solanaForm.token_mint}
          onChange={handleChange}
          required
          placeholder="Enter Solana token mint address"
        />
      </div>

      <div className="form-group">
        <label htmlFor="token_account">Token Account</label>
        <input
          type="text"
          id="token_account"
          name="token_account"
          value={solanaForm.token_account}
          onChange={handleChange}
          required
          placeholder="Enter Solana token account address"
        />
      </div>

      <div className="form-group">
        <label htmlFor="origin_network">Origin Network</label>
        <select
          id="origin_network"
          name="origin_network"
          value={solanaForm.origin_network}
          onChange={handleChange}
          required
          disabled
        >
          <option value={CHAINS.SOLANA}>Solana</option>
        </select>
        <small className="hint-text">
          Origin network is determined by the bridge direction
        </small>
      </div>

      <div className="form-group">
        <label htmlFor="destination_account">Destination Account</label>
        <input
          type="text"
          id="destination_account"
          name="destination_account"
          value={solanaForm.destination_account}
          onChange={handleChange}
          required
          placeholder="Enter EVM destination account address"
        />
      </div>
    </>
  );
};

export default SolanaToEvmForm;

// ===== Fin Contenido de: components/NewRequest/SolanaToEvmForm.js =====

// ===== Inicio Contenido de: components/PendingRequests/PendingRequestsList.js =====

import React from "react";
import { useBridge } from "../../contexts/BridgeContext";
import { fetchPendingRequests, checkRequestStatus } from "../../services/api";
import RequestsTable from "../shared/RequestsTable";
import LoadingSpinner from "../shared/LoadingSpinner";

const PendingRequestsList = ({ 
  setActiveTab, 
  setRequestId, 
  isLoading, 
  setIsLoading, 
  setError, 
  setResponse 
}) => {  
  const { pendingRequests, setPendingRequests } = useBridge();

  const handleCheckPendingRequest = async (requestId) => {
    setActiveTab("check-request");
    setRequestId(requestId);
    let data = await checkRequestStatus(requestId)
    setResponse(data)
  };    

  const fetchRequests = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchPendingRequests();
      setPendingRequests(data);
    } catch (error) {
      setError(error.message || "An error occurred while fetching pending requests");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pending-requests">
      <h2>Pending Requests</h2>

      {isLoading ? (
        <LoadingSpinner />
      ) : pendingRequests.length === 0 ? (
        <div className="no-pending-requests">
          <p>No pending requests found.</p>
        </div>
      ) : (
        <RequestsTable 
          requests={pendingRequests} 
          onCheckRequest={handleCheckPendingRequest} 
        />
      )}

      <button
        onClick={fetchRequests}
        className="submit-button"
        disabled={isLoading}
      >
        {isLoading ? "Refreshing..." : "Refresh Pending Requests"}
      </button>
    </div>
  );
};

export default PendingRequestsList;

// ===== Fin Contenido de: components/PendingRequests/PendingRequestsList.js =====

// ===== Inicio Contenido de: components/shared/ErrorBoundary.js =====

import React, { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error("ErrorBoundary caught an error", error, errorInfo);
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="error-boundary">
          <h2>Something went wrong.</h2>
          <p>The application encountered an unexpected error. Please try refreshing the page.</p>
          {this.props.showDetails && (
            <details style={{ whiteSpace: "pre-wrap" }}>
              <summary>Error Details</summary>
              <p>{this.state.error && this.state.error.toString()}</p>
              <p>Component Stack Error Details:</p>
              <p>{this.state.errorInfo && this.state.errorInfo.componentStack}</p>
            </details>
          )}
          <button
            className="submit-button"
            style={{ width: "auto", marginTop: "1rem" }}
            onClick={() => window.location.reload()}
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

// ===== Fin Contenido de: components/shared/ErrorBoundary.js =====

// ===== Inicio Contenido de: components/shared/ErrorMessage.js =====

import React from "react";

const ErrorMessage = ({ message }) => {
  return (
    <div className="error-message">
      <p>Error: {message}</p>
    </div>
  );
};

export default ErrorMessage;

// ===== Fin Contenido de: components/shared/ErrorMessage.js =====

// ===== Inicio Contenido de: components/shared/LoadingSpinner.js =====

import React from "react";

const LoadingSpinner = () => {
  return <div className="loading-spinner">Loading...</div>;
};

export default LoadingSpinner;

// ===== Fin Contenido de: components/shared/LoadingSpinner.js =====

// ===== Inicio Contenido de: components/shared/RequestsTable.js =====

import React from "react";

const EmptyState = ({ message }) => {
  return (
    <div className="empty-state">
      <p>{message || "No requests found."}</p>
    </div>
  );
};

const RequestsTable = ({ requests, onCheckRequest, emptyMessage }) => {
  if (!requests || requests.length === 0) {
    return <EmptyState message={emptyMessage} />;
  }

  return (
    <div className="requests-table-container">
      <table className="requests-table">
        <thead>
          <tr>
            <th>Request ID</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {requests.map((requestId) => (
            <tr key={requestId}>
              <td
                className="request-id clickable"
                onClick={() => onCheckRequest(requestId)}
              >
                {requestId}
              </td>
              <td>
                <button
                  className="check-request-button"
                  onClick={() => onCheckRequest(requestId)}
                >
                  Check Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RequestsTable;

// ===== Fin Contenido de: components/shared/RequestsTable.js =====

// ===== Inicio Contenido de: contexts/BridgeContext.js =====

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

// ===== Fin Contenido de: contexts/BridgeContext.js =====

// ===== Inicio Contenido de: index.js =====

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import ErrorBoundary from "./components/shared/ErrorBoundary";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ErrorBoundary showDetails={process.env.NODE_ENV === "development"}>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);

// ===== Fin Contenido de: index.js =====

// ===== Inicio Contenido de: reportWebVitals.js =====

const reportWebVitals = onPerfEntry => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;


// ===== Fin Contenido de: reportWebVitals.js =====

// ===== Inicio Contenido de: services/api.js =====

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

// ===== Fin Contenido de: services/api.js =====

// ===== Inicio Contenido de: setupTests.js =====

// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';


// ===== Fin Contenido de: setupTests.js =====

// ===== Inicio Contenido de: utils/constants.js =====

export const CHAINS = {
    EVM: "EVM",
    SOLANA: "SOLANA",
  };
  
  export const STATUS_MAP = {
    'RequestReceived': 'Request Received',
    'TokenReceived': 'Token Received',
    'TokenMinted': 'Token Minted'
  };

// ===== Fin Contenido de: utils/constants.js =====

// ===== Inicio Contenido de: utils/formatters.js =====

export const formatTimestamp = (timestampObj) => {
    if (!timestampObj || typeof timestampObj.secs !== "number") {
      return "N/A";
    }
  
    // Convert seconds to milliseconds
    const date = new Date(timestampObj.secs * 1000);
  
    return date.toLocaleString("en-GB", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZoneName: "short",
    });
  };
  
  export const isEVMTransaction = (hash) => {
    return hash.startsWith("0x") && hash.length < 80;
  };

// ===== Fin Contenido de: utils/formatters.js =====

