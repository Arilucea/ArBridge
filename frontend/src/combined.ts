// // Script combinado generado automáticamente (recursivo)
// // Contiene el código de los archivos .tsx encontrados en: /home/javier/MS_U/ArBridge/frontend/src y subdirectorios
// // Fecha de generación: 2025-04-15 13:04:35 CEST
// // ================================================================

// // ===== Inicio Contenido de: types/api.ts =====

// import { CHAINS } from "../utils/constants";

// export interface SolanaFormData {
//   token_mint: string;
//   token_account: string;
//   origin_network: typeof CHAINS.SOLANA;
//   destination_account: string;
// }

// export interface EvmFormData {
//   token_contract: string;
//   token_id: string;
//   token_owner: string;
//   origin_network: typeof CHAINS.EVM;
//   destination_account: string;
// }

// export interface RequestInput {
//   contract_or_mint: string;
//   token_id?: string; // Optional for EVM
//   token_account?: string; // Optional for Solana, but likely needed
//   token_owner?: string; // Only for EVM
//   origin_network: string; // Can be refined to CHAINS.SOLANA | CHAINS.EVM
//   destination_account: string;
// }

// export interface RequestOutput {
//   detination_contract_id_or_mint: string | null;
//   detination_token_id_or_account: string | null;
// }

// export interface RequestStatusResponse {
//   id: string;
//   status: string; // Could be a union type of possible statuses
//   last_update: number; // Timestamp
//   input: RequestInput;
//   tx_hashes: string[];
//   output: RequestOutput;
// }

// export interface BlockExplorers {
//   EVM: string;
//   SOLANA: string;
// }


// // ===== Fin Contenido de: types/api.ts =====


// // ===== Inicio Contenido de: App.tsx =====

// import React, { useState } from "react";
// import { BridgeProvider } from "./contexts/BridgeContext";
// import Layout from "./components/Layout/Layout";
// import NewRequestForm from "./components/NewRequest/NewRequestForm";
// import CheckRequestForm from "./components/CheckRequest/CheckRequestForm";
// import PendingRequestsList from "./components/PendingRequests/PendingRequestsList";
// import CompletedRequestsList from "./components/CompletedRequests/CompletedRequestsList";
// import RequestDetails from "./components/CheckRequest/RequestDetails";
// import ErrorMessage from "./components/shared/ErrorMessage";
// import { RequestStatusResponse } from "./types/api";
// import "./App.css";

// function App() {
//   // Navigation state
//   const [activeTab, setActiveTab] = useState<string>("new-request");

//   // Shared states
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);
//   const [response, setResponse] = useState<RequestStatusResponse | null>(null);
//   const [requestId, setRequestId] = useState<string>("");

//   const handleTabChange = (tab: string): void => {
//     setActiveTab(tab);
//     setError(null);
//     setResponse(null);
//     // Keep requestId if switching to check-request? Or clear it? Currently keeps.
//   };

//   return (
//     <BridgeProvider>
//       <Layout activeTab={activeTab} onTabChange={handleTabChange}>
//         {activeTab === "new-request" && (
//           <NewRequestForm
//             setIsLoading={setIsLoading}
//             isLoading={isLoading}
//             setError={setError}
//             setResponse={setResponse}
//           />
//         )}

//         {activeTab === "check-request" && (
//           <CheckRequestForm
//             requestId={requestId}
//             setRequestId={setRequestId}
//             isLoading={isLoading}
//             setIsLoading={setIsLoading}
//             setError={setError}
//             setResponse={setResponse}
//           />
//         )}

//         {activeTab === "pending-requests" && (
//           <PendingRequestsList
//             setActiveTab={setActiveTab}
//             setRequestId={setRequestId}
//             isLoading={isLoading}
//             setIsLoading={setIsLoading}
//             setError={setError}
//             setResponse={setResponse}
//           />
//         )}

//         {activeTab === "completed-requests" && (
//           <CompletedRequestsList
//             setActiveTab={setActiveTab}
//             setRequestId={setRequestId}
//             isLoading={isLoading}
//             setIsLoading={setIsLoading}
//             setError={setError}
//             setResponse={setResponse}
//           />
//         )}

//         {/* Error and Response Display */}
//         {error && <ErrorMessage message={error} />}

//         {response && (
//           <div className="response-container">
//             <h2>
//               {activeTab === "new-request"
//                 ? "Bridge Request Submitted"
//                 : "Request Status"}
//             </h2>
//             {/* RequestDetails expects non-null response, so only render if response exists */}
//             <RequestDetails response={response} />
//           </div>
//         )}
//       </Layout>
//     </BridgeProvider>
//   );
// }

// export default App;

// // ===== Fin Contenido de: App.tsx =====

// // ===== Inicio Contenido de: App.test.tsx =====

// import React from 'react';
// import { render, screen } from '@testing-library/react';
// import App from './App';

// // Basic smoke test - might need more specific tests depending on functionality
// test('renders navigation tabs', () => {
//   render(<App />);
//   // Check if a key element like the navigation or initial form is present
//   const newRequestButton = screen.getByRole('button', { name: /New Request/i });
//   expect(newRequestButton).toBeInTheDocument();
  
//   // Example: Check for initial form title (assuming 'new-request' is default)
//   // const formTitle = screen.getByRole('heading', { name: /Solana to EVM Bridge/i });
//   // expect(formTitle).toBeInTheDocument();
// });


// // ===== Fin Contenido de: App.test.tsx =====

// // ===== Inicio Contenido de: components/CheckRequest/CheckRequestForm.tsx =====

// import React from "react";
// import { checkRequestStatus } from "../../services/api";
// import { RequestStatusResponse } from "../../types/api";

// interface CheckRequestFormProps {
//   requestId: string;
//   setRequestId: React.Dispatch<React.SetStateAction<string>>;
//   isLoading: boolean;
//   setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
//   setError: React.Dispatch<React.SetStateAction<string | null>>;
//   setResponse: React.Dispatch<React.SetStateAction<RequestStatusResponse | null>>;
// }

// const CheckRequestForm: React.FC<CheckRequestFormProps> = ({
//   requestId,
//   setRequestId,
//   isLoading,
//   setIsLoading,
//   setError,
//   setResponse
// }) => {
//   const handleRequestIdChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
//     setRequestId(e.target.value);
//   };

//   const handleCheckRequest = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
//     e.preventDefault();
//     if (!requestId.trim()) {
//       setError("Please enter a request ID");
//       return;
//     }

//     setIsLoading(true);
//     setResponse(null);
//     setError(null);

//     try {
//       const data: RequestStatusResponse = await checkRequestStatus(requestId);
//       setResponse(data);
//     } catch (error: any) { // Catch specific error types if possible
//       setError(error.message || "An error occurred while fetching the request");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="check-request">
//       <h2>Request Status</h2>
//       <form onSubmit={handleCheckRequest} className="bridge-form">
//         <div className="form-group">
//           <label htmlFor="request-id">Request ID</label>
//           <input
//             type="text"
//             id="request-id"
//             value={requestId}
//             onChange={handleRequestIdChange}
//             required
//             placeholder="Enter your request ID"
//             aria-label="Request ID"
//           />
//         </div>
//         <button
//           type="submit"
//           disabled={isLoading}
//           className="submit-button"
//         >
//           {isLoading ? "Checking..." : "Check Status"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default CheckRequestForm;

// // ===== Fin Contenido de: components/CheckRequest/CheckRequestForm.tsx =====

// // ===== Inicio Contenido de: components/CheckRequest/RequestDetails.tsx =====

// import React from "react";
// import { useBridge } from "../../contexts/BridgeContext";
// import { CHAINS, STATUS_MAP } from "../../utils/constants";
// import { formatTimestamp, isEVMTransaction } from "../../utils/formatters";
// import { RequestStatusResponse } from "../../types/api"; // Import the type

// interface RequestDetailsProps {
//   response: RequestStatusResponse; // Use the imported type, ensure it's not null here
// }

// const RequestDetails: React.FC<RequestDetailsProps> = ({ response }) => {
//   const context = useBridge(); // Get the whole context

//   // Handle case where context might be null if not properly provided
//   if (!context) {
//       // Optionally render an error or loading state, or return null
//       // This depends on whether the context is guaranteed to be available
//       console.error("BridgeContext not found!");
//       return null;
//   }

//   const { blockExplorers } = context; // Destructure after checking context

//   // No need for !response check due to prop type guarantee

//   // Get the mapped status or use original if not found
//   const mappedStatus: string = STATUS_MAP[response.status] || response.status;

//   // Determine the labels based on origin network
//   const isEVMOrigin: boolean = response.input.origin_network === CHAINS.EVM;
//   // Corrected labels based on the destination network (implicitly the opposite)
//   const destinationTokenLabel: string = !isEVMOrigin ? "Destination Token Account" : "Destination Token ID"; // If origin is Solana, dest is EVM (Token ID)
//   const destinationContractLabel: string = !isEVMOrigin ? "Destination Token Mint" : "Destination Contract ID"; // If origin is Solana, dest is EVM (Contract ID)

//   const getTransactionExplorerUrl = (hash: string): string => {
//     if (!blockExplorers.EVM || !blockExplorers.SOLANA) {
//       console.warn("Block explorer URLs not loaded yet.");
//       return "#"; // Return a placeholder link
//     }
//     if (isEVMTransaction(hash)) {
//       return blockExplorers.EVM.replace("{}", hash);
//     } else {
//       return blockExplorers.SOLANA.replace("{}", hash);
//     }
//   };

//   return (
//     <div className="request-details-container">
//       <table className="request-details-table">
//         <tbody>
//           <tr>
//             <th>Request ID</th>
//             <td>{response.id}</td>
//           </tr>
//           <tr>
//             <th>Status</th>
//             <td>
//               <span className="status-badge" data-status={response.status.toLowerCase()}>
//                 {mappedStatus}
//               </span>
//             </td>
//           </tr>
//           <tr>
//             <th>Last Updated</th>
//             <td>{formatTimestamp(response.last_update)}</td>
//           </tr>

//           <tr>
//             <th colSpan={2} className="section-header">Input Details</th>
//           </tr>
//           <tr>
//              {/* Label changes based on origin */}
//             <th>{isEVMOrigin ? 'Token Contract' : 'Token Mint'}</th>
//             <td>{response.input.contract_or_mint}</td>
//           </tr>
//           {/* Conditionally render Token ID (only relevant for EVM origin) */}
//           {isEVMOrigin && (
//              <tr>
//                  <th>Token ID</th>
//                  <td>{response.input.token_id || 'N/A'}</td>
//              </tr>
//           )}
//            {/* Conditionally render Token Account (relevant for Solana origin) */}
//            {!isEVMOrigin && (
//               <tr>
//                   <th>Token Account</th>
//                   <td>{response.input.token_account || 'N/A'}</td>
//               </tr>
//            )}
//            {/* Conditionally render Token Owner (only relevant for EVM origin) */}
//            {isEVMOrigin && (
//                <tr>
//                    <th>Token Owner</th>
//                    <td>{response.input.token_owner || 'N/A'}</td>
//                </tr>
//            )}
//           <tr>
//             <th>Origin Network</th>
//             <td>{response.input.origin_network}</td>
//           </tr>
//           <tr>
//             <th>Destination Account</th>
//             <td>{response.input.destination_account}</td>
//           </tr>

//           <tr>
//             <th colSpan={2} className="section-header">Transaction Hashes</th>
//           </tr>
//           <tr>
//             <th>Tx Hashes</th>
//             <td>
//               {response.tx_hashes && response.tx_hashes.length > 0
//                 ? response.tx_hashes.map((hash, index) => (
//                     <React.Fragment key={index}>
//                       {index > 0 && <div className="tx-hash-separator"></div>}
//                       <div className="tx-hash">
//                         <a
//                           href={getTransactionExplorerUrl(hash)}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="tx-link"
//                           title={`View transaction in ${isEVMTransaction(hash) ? 'EVM' : 'Solana'} explorer`}
//                         >
//                           {hash}
//                         </a>
//                       </div>
//                     </React.Fragment>
//                   ))
//                 : 'N/A'}
//             </td>
//           </tr>

//           <tr>
//             <th colSpan={2} className="section-header">Output Details</th>
//           </tr>
//           <tr>
//             <th>{destinationContractLabel}</th>
//             <td>{response.output.detination_contract_id_or_mint || 'N/A'}</td>
//           </tr>
//           <tr>
//             <th>{destinationTokenLabel}</th>
//             <td>{response.output.detination_token_id_or_account || 'N/A'}</td>
//           </tr>
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default RequestDetails;


// // ===== Fin Contenido de: components/CheckRequest/RequestDetails.tsx =====

// // ===== Inicio Contenido de: components/CompletedRequests/CompletedRequestsList.tsx =====

// import React, { useEffect } from "react"; // Added useEffect
// import { useBridge } from "../../contexts/BridgeContext";
// import { fetchCompletedRequests, checkRequestStatus } from "../../services/api";
// import RequestsTable from "../shared/RequestsTable";
// import LoadingSpinner from "../shared/LoadingSpinner";
// import { RequestStatusResponse } from "../../types/api";

// interface CompletedRequestsListProps {
//   setActiveTab: React.Dispatch<React.SetStateAction<string>>;
//   setRequestId: React.Dispatch<React.SetStateAction<string>>;
//   isLoading: boolean;
//   setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
//   setError: React.Dispatch<React.SetStateAction<string | null>>;
//   setResponse: React.Dispatch<React.SetStateAction<RequestStatusResponse | null>>;
// }

// const CompletedRequestsList: React.FC<CompletedRequestsListProps> = ({
//   setActiveTab,
//   setRequestId,
//   isLoading,
//   setIsLoading,
//   setError,
//   setResponse
// }) => {
//   const context = useBridge();

//   // Fetch on initial mount
//   useEffect(() => {
//       // Check if context and set function exist
//       if (context && context.setCompletedRequests) {
//           fetchRequests();
//       }
//       // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [context?.setCompletedRequests]); // Depend on the setter function from context

//   // Handle context potentially being null
//   if (!context) {
//       return <LoadingSpinner />; // Or some other placeholder/error
//   }
//   const { completedRequests, setCompletedRequests } = context;


//   const handleCheckCompletedRequest = async (idToCheck: string): Promise<void> => {
//     // Navigate first
//     setActiveTab("check-request");
//     setRequestId(idToCheck); // Set the ID for the check form

//     // Then fetch details for display in the check-request tab
//     setIsLoading(true);
//     setError(null);
//     setResponse(null); // Clear previous response
//     try {
//       const data: RequestStatusResponse = await checkRequestStatus(idToCheck);
//       setResponse(data); // Set the response for the details view in App.tsx
//     } catch (error: any) {
//       setError(error.message || "Failed to fetch details for request ID: " + idToCheck);
//       // Optionally navigate back or show error prominently
//        setActiveTab("completed-requests"); // Stay on this tab if fetch fails?
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const fetchRequests = async (): Promise<void> => {
//     setIsLoading(true);
//     setError(null);

//     try {
//       const data: string[] = await fetchCompletedRequests();
//       if (setCompletedRequests) {
//         setCompletedRequests(data);
//       }
//     } catch (error: any) {
//       setError(error.message || "An error occurred while fetching completed requests");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="completed-requests">
//       <h2>Completed Requests</h2>

//       {isLoading ? (
//         <LoadingSpinner />
//       ) : completedRequests.length === 0 ? (
//         <div className="no-completed-requests">
//           <p>No completed requests found.</p>
//         </div>
//       ) : (
//         <RequestsTable
//           requests={completedRequests}
//           onCheckRequest={handleCheckCompletedRequest}
//           emptyMessage="No completed requests available."
//         />
//       )}

//       <button
//         onClick={fetchRequests}
//         className="submit-button"
//         disabled={isLoading}
//       >
//         {isLoading ? "Refreshing..." : "Refresh Completed Requests"}
//       </button>
//     </div>
//   );
// };

// export default CompletedRequestsList;

// // ===== Fin Contenido de: components/CompletedRequests/CompletedRequestsList.tsx =====

// // ===== Inicio Contenido de: components/Layout/Layout.tsx =====

// import React, { ReactNode } from "react";
// import Navigation from "./Navigation";

// interface LayoutProps {
//   children: ReactNode;
//   activeTab: string;
//   onTabChange: (tab: string) => void;
// }

// const Layout: React.FC<LayoutProps> = ({ children, activeTab, onTabChange }) => {
//   return (
//     <div className="app-container">
//       <Navigation activeTab={activeTab} onTabChange={onTabChange} />
//       <div className="container">
//         {children}
//       </div>
//     </div>
//   );
// };

// export default Layout;

// // ===== Fin Contenido de: components/Layout/Layout.tsx =====

// // ===== Inicio Contenido de: components/Layout/Navigation.tsx =====

// import React from "react";

// interface NavigationProps {
//     activeTab: string;
//     onTabChange: (tab: string) => void;
// }

// const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
//   return (
//     <nav className="navigation">
//       <div className="nav-container">
//         <div className="logo-container">
//           {/* Ensure the image is in the public folder or imported */}
//           <img
//             src="arbridge-logo.png" // Assumes logo is in public folder
//             alt="ArBridge Logo"
//             className="logo"
//           />
//         </div>
//         <div className="tab-buttons">
//           <button
//             className={`tab-button ${activeTab === "new-request" ? "active" : ""}`}
//             onClick={() => onTabChange("new-request")}
//             aria-current={activeTab === "new-request" ? "page" : undefined}
//           >
//             New Request
//           </button>
//           <button
//             className={`tab-button ${activeTab === "check-request" ? "active" : ""}`}
//             onClick={() => onTabChange("check-request")}
//              aria-current={activeTab === "check-request" ? "page" : undefined}
//           >
//             Check Request
//           </button>
//           <button
//             className={`tab-button ${activeTab === "pending-requests" ? "active" : ""}`}
//             onClick={() => onTabChange("pending-requests")}
//              aria-current={activeTab === "pending-requests" ? "page" : undefined}
//           >
//             Pending Requests
//           </button>
//           <button
//             className={`tab-button ${activeTab === "completed-requests" ? "active" : ""}`}
//             onClick={() => onTabChange("completed-requests")}
//              aria-current={activeTab === "completed-requests" ? "page" : undefined}
//           >
//             Completed Requests
//           </button>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navigation;

// // ===== Fin Contenido de: components/Layout/Navigation.tsx =====

// // ===== Inicio Contenido de: components/NewRequest/EvmToSolanaForm.tsx =====

// import React from "react";
// import { useBridge } from "../../contexts/BridgeContext";
// import { CHAINS } from "../../utils/constants";
// import LoadingSpinner from "../shared/LoadingSpinner"; // Import LoadingSpinner

// const EvmToSolanaForm: React.FC = () => {
//   const context = useBridge();

//   // Handle context potentially being null during initialization
//   if (!context) {
//     return <LoadingSpinner />; // Or some other placeholder/error message
//   }

//   const { evmForm, setEvmForm } = context;

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
//     const { name, value } = e.target;
//     setEvmForm((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   return (
//     <>
//       <div className="form-group">
//         <label htmlFor="token_contract">Token Contract</label>
//         <input
//           type="text"
//           id="token_contract"
//           name="token_contract"
//           value={evmForm.token_contract}
//           onChange={handleChange}
//           required
//           placeholder="Enter EVM token contract address"
//           aria-label="EVM Token Contract"
//         />
//       </div>

//       <div className="form-group">
//         <label htmlFor="token_id">Token ID</label>
//         <input
//           type="text"
//           id="token_id"
//           name="token_id"
//           value={evmForm.token_id}
//           onChange={handleChange}
//           required
//           placeholder="Enter token ID"
//            aria-label="Token ID"
//         />
//       </div>

//       <div className="form-group">
//         <label htmlFor="token_owner">Token Owner</label>
//         <input
//           type="text"
//           id="token_owner"
//           name="token_owner"
//           value={evmForm.token_owner}
//           onChange={handleChange}
//           required
//           placeholder="Enter token owner address"
//            aria-label="Token Owner"
//         />
//       </div>

//       <div className="form-group">
//         <label htmlFor="origin_network">Origin Network</label>
//         <select
//           id="origin_network"
//           name="origin_network"
//           value={evmForm.origin_network}
//           onChange={handleChange} // Although disabled, keep for consistency if it might become enabled
//           required
//           disabled // This field is determined by the bridge direction
//           aria-label="Origin Network"
//         >
//           {/* Only show the relevant option */}
//           <option value={CHAINS.EVM}>EVM</option>
//         </select>
//         <small className="hint-text">
//           Origin network is determined by the bridge direction (EVM to Solana).
//         </small>
//       </div>

//       <div className="form-group">
//         <label htmlFor="destination_account">Destination Account</label>
//         <input
//           type="text"
//           id="destination_account"
//           name="destination_account"
//           value={evmForm.destination_account}
//           onChange={handleChange}
//           required
//           placeholder="Enter Solana destination account address"
//           aria-label="Destination Solana Account"
//         />
//       </div>
//     </>
//   );
// };

// export default EvmToSolanaForm;

// // ===== Fin Contenido de: components/NewRequest/EvmToSolanaForm.tsx =====

// // ===== Inicio Contenido de: components/NewRequest/NewRequestForm.tsx =====

// import React from "react";
// import { useBridge } from "../../contexts/BridgeContext";
// import SolanaToEvmForm from "./SolanaToEvmForm";
// import EvmToSolanaForm from "./EvmToSolanaForm";
// import { submitSolanaToEvmRequest, submitEvmToSolanaRequest } from "../../services/api";
// import { RequestStatusResponse, SolanaFormData, EvmFormData } from "../../types/api";
// import LoadingSpinner from "../shared/LoadingSpinner"; // Import LoadingSpinner

// interface NewRequestFormProps {
//   isLoading: boolean;
//   setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
//   setError: React.Dispatch<React.SetStateAction<string | null>>;
//   setResponse: React.Dispatch<React.SetStateAction<RequestStatusResponse | null>>;
// }

// const NewRequestForm: React.FC<NewRequestFormProps> = ({ isLoading, setIsLoading, setError, setResponse }) => {
//   const context = useBridge();

//    // Handle context potentially being null
//    if (!context) {
//        return <LoadingSpinner />; // Or a suitable placeholder
//    }

//    const { bridgeType, setBridgeType, currentForm } = context;


//   const handleBridgeTypeChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
//     setBridgeType(e.target.value);
//     setError(null);     // Clear errors when changing type
//     setResponse(null);  // Clear previous response
//   };

//   const handleSubmitNewRequest = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
//     e.preventDefault();
//     setIsLoading(true);
//     setResponse(null);
//     setError(null);

//     try {
//       let data: RequestStatusResponse;
//       if (bridgeType === "solana-to-evm") {
//         // Type assertion might be needed if currentForm type isn't narrowed enough
//         data = await submitSolanaToEvmRequest(currentForm as SolanaFormData);
//       } else {
//          // Type assertion might be needed
//         data = await submitEvmToSolanaRequest(currentForm as EvmFormData);
//       }

//       setResponse(data);
//       // Optionally clear the form here after successful submission
//       // Example: context.setCurrentForm(initialStateForBridgeType);
//     } catch (error: any) {
//       setError(error.message || `An error occurred during the ${bridgeType} request`);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <>
//       <div className="bridge-selection">
//         <label htmlFor="bridge-type">Select Bridge Direction:</label>
//         <select
//           id="bridge-type"
//           value={bridgeType}
//           onChange={handleBridgeTypeChange}
//           className="bridge-select"
//            aria-label="Select Bridge Direction"
//         >
//           <option value="solana-to-evm">Solana to EVM</option>
//           <option value="evm-to-solana">EVM to Solana</option>
//         </select>
//       </div>

//       <form onSubmit={handleSubmitNewRequest} className="bridge-form">
//         <h2>
//           {bridgeType === "solana-to-evm"
//             ? "Solana to EVM Bridge"
//             : "EVM to Solana Bridge"}
//         </h2>

//         {/* Render the correct form based on the selected bridge type */}
//         {bridgeType === "solana-to-evm" ? (
//           <SolanaToEvmForm />
//         ) : (
//           <EvmToSolanaForm />
//         )}

//         <button type="submit" disabled={isLoading} className="submit-button">
//           {isLoading ? "Processing..." : "Bridge Tokens"}
//         </button>
//       </form>
//     </>
//   );
// };

// export default NewRequestForm;

// // ===== Fin Contenido de: components/NewRequest/NewRequestForm.tsx =====

// // ===== Inicio Contenido de: components/NewRequest/SolanaToEvmForm.tsx =====

// import React from "react";
// import { useBridge } from "../../contexts/BridgeContext";
// import { CHAINS } from "../../utils/constants";
// import LoadingSpinner from "../shared/LoadingSpinner"; // Import LoadingSpinner

// const SolanaToEvmForm: React.FC = () => {
//   const context = useBridge();

//    // Handle context potentially being null
//    if (!context) {
//        return <LoadingSpinner />;
//    }

//   const { solanaForm, setSolanaForm } = context;

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
//     const { name, value } = e.target;
//     setSolanaForm((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   return (
//     <>
//       <div className="form-group">
//         <label htmlFor="token_mint">Token Mint</label>
//         <input
//           type="text"
//           id="token_mint"
//           name="token_mint"
//           value={solanaForm.token_mint}
//           onChange={handleChange}
//           required
//           placeholder="Enter Solana token mint address"
//           aria-label="Solana Token Mint"
//         />
//       </div>

//       <div className="form-group">
//         <label htmlFor="token_account">Token Account</label>
//         <input
//           type="text"
//           id="token_account"
//           name="token_account"
//           value={solanaForm.token_account}
//           onChange={handleChange}
//           required
//           placeholder="Enter Solana token account address"
//           aria-label="Solana Token Account"
//         />
//       </div>

//       <div className="form-group">
//         <label htmlFor="origin_network">Origin Network</label>
//         <select
//           id="origin_network"
//           name="origin_network"
//           value={solanaForm.origin_network}
//           onChange={handleChange} // Keep for consistency, though disabled
//           required
//           disabled // Determined by bridge direction
//            aria-label="Origin Network"
//         >
//            {/* Only show the relevant option */}
//           <option value={CHAINS.SOLANA}>Solana</option>
//         </select>
//         <small className="hint-text">
//           Origin network is determined by the bridge direction (Solana to EVM).
//         </small>
//       </div>

//       <div className="form-group">
//         <label htmlFor="destination_account">Destination Account</label>
//         <input
//           type="text"
//           id="destination_account"
//           name="destination_account"
//           value={solanaForm.destination_account}
//           onChange={handleChange}
//           required
//           placeholder="Enter EVM destination account address"
//           aria-label="Destination EVM Account"
//         />
//       </div>
//     </>
//   );
// };

// export default SolanaToEvmForm;

// // ===== Fin Contenido de: components/NewRequest/SolanaToEvmForm.tsx =====

// // ===== Inicio Contenido de: components/PendingRequests/PendingRequestsList.tsx =====

// import React, { useEffect } from "react"; // Added useEffect
// import { useBridge } from "../../contexts/BridgeContext";
// import { fetchPendingRequests, checkRequestStatus } from "../../services/api";
// import RequestsTable from "../shared/RequestsTable";
// import LoadingSpinner from "../shared/LoadingSpinner";
// import { RequestStatusResponse } from "../../types/api";

// interface PendingRequestsListProps {
//   setActiveTab: React.Dispatch<React.SetStateAction<string>>;
//   setRequestId: React.Dispatch<React.SetStateAction<string>>;
//   isLoading: boolean;
//   setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
//   setError: React.Dispatch<React.SetStateAction<string | null>>;
//   setResponse: React.Dispatch<React.SetStateAction<RequestStatusResponse | null>>;
// }

// const PendingRequestsList: React.FC<PendingRequestsListProps> = ({
//   setActiveTab,
//   setRequestId,
//   isLoading,
//   setIsLoading,
//   setError,
//   setResponse
// }) => {
//   const context = useBridge();

//     // Fetch on initial mount
//     useEffect(() => {
//         if (context && context.setPendingRequests) {
//             fetchRequests();
//         }
//        // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [context?.setPendingRequests]); // Depend on the setter from context


//   // Handle context potentially being null
//   if (!context) {
//     return <LoadingSpinner />; // Or some other placeholder/error
//   }
//   const { pendingRequests, setPendingRequests } = context;


//   const handleCheckPendingRequest = async (idToCheck: string): Promise<void> => {
//      // Navigate first
//     setActiveTab("check-request");
//     setRequestId(idToCheck); // Set ID for the check form

//      // Then fetch details for display
//      setIsLoading(true);
//      setError(null);
//      setResponse(null); // Clear previous response
//      try {
//        const data: RequestStatusResponse = await checkRequestStatus(idToCheck);
//        setResponse(data); // Set response for details view in App.tsx
//      } catch (error: any) {
//        setError(error.message || "Failed to fetch details for request ID: " + idToCheck);
//        setActiveTab("pending-requests"); // Stay here on error?
//      } finally {
//        setIsLoading(false);
//      }
//   };

//   const fetchRequests = async (): Promise<void> => {
//     setIsLoading(true);
//     setError(null);

//     try {
//       const data: string[] = await fetchPendingRequests();
//        if (setPendingRequests) {
//            setPendingRequests(data);
//        }
//     } catch (error: any) {
//       setError(error.message || "An error occurred while fetching pending requests");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="pending-requests">
//       <h2>Pending Requests</h2>

//       {isLoading ? (
//         <LoadingSpinner />
//       ) : pendingRequests.length === 0 ? (
//         <div className="no-pending-requests">
//           <p>No pending requests found.</p>
//         </div>
//       ) : (
//         <RequestsTable
//           requests={pendingRequests}
//           onCheckRequest={handleCheckPendingRequest}
//           emptyMessage="No pending requests available."
//         />
//       )}

//       <button
//         onClick={fetchRequests}
//         className="submit-button"
//         disabled={isLoading}
//       >
//         {isLoading ? "Refreshing..." : "Refresh Pending Requests"}
//       </button>
//     </div>
//   );
// };

// export default PendingRequestsList;

// // ===== Fin Contenido de: components/PendingRequests/PendingRequestsList.tsx =====

// // ===== Inicio Contenido de: components/shared/ErrorBoundary.tsx =====

// import React, { Component, ErrorInfo, ReactNode } from "react";

// interface ErrorBoundaryProps {
//   children: ReactNode;
//   showDetails?: boolean; // Optional prop to control detail visibility
// }

// interface ErrorBoundaryState {
//   hasError: boolean;
//   error: Error | null;
//   errorInfo: ErrorInfo | null;
// }

// class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
//   constructor(props: ErrorBoundaryProps) {
//     super(props);
//     this.state = { hasError: false, error: null, errorInfo: null };
//   }

//   static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
//     // Update state so the next render will show the fallback UI.
//     return { hasError: true };
//   }

//   componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
//     // You can also log the error to an error reporting service
//     console.error("ErrorBoundary caught an error:", error, errorInfo);
//     this.setState({ error, errorInfo });
//   }

//   render(): ReactNode {
//     if (this.state.hasError) {
//       // You can render any custom fallback UI
//       return (
//         <div className="error-boundary">
//           <h2>Something went wrong.</h2>
//           <p>The application encountered an unexpected error. Please try refreshing the page.</p>
//           {this.props.showDetails && this.state.error && ( // Only show details if prop enabled and error exists
//             <details style={{ whiteSpace: "pre-wrap" }}>
//               <summary>Error Details</summary>
//               {this.state.error && <p>{this.state.error.toString()}</p>}
//               <br />
//               {this.state.errorInfo && (
//                   <>
//                      <p>Component Stack Error Details:</p>
//                      <p>{this.state.errorInfo.componentStack}</p>
//                   </>
//               )}
//             </details>
//           )}
//           <button
//             className="submit-button"
//             style={{ width: "auto", marginTop: "1rem" }}
//             onClick={() => window.location.reload()}
//           >
//             Refresh Page
//           </button>
//         </div>
//       );
//     }

//     return this.props.children;
//   }
// }

// export default ErrorBoundary;

// // ===== Fin Contenido de: components/shared/ErrorBoundary.tsx =====

// // ===== Inicio Contenido de: components/shared/ErrorMessage.tsx =====

// import React from "react";

// interface ErrorMessageProps {
//   message: string | null; // Allow null in case there's no error
// }

// const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
//    // Don't render anything if there is no message
//   if (!message) {
//     return null;
//   }

//   return (
//     <div className="error-message" role="alert"> {/* Added role="alert" for accessibility */}
//       <p>Error: {message}</p>
//     </div>
//   );
// };

// export default ErrorMessage;

// // ===== Fin Contenido de: components/shared/ErrorMessage.tsx =====

// // ===== Inicio Contenido de: components/shared/LoadingSpinner.tsx =====

// import React from "react";

// const LoadingSpinner: React.FC = () => {
//   // Added aria attributes for accessibility
//   return (
//       <div className="loading-spinner" role="status" aria-live="polite">
//           Loading...
//       </div>
//   );
// };

// export default LoadingSpinner;

// // ===== Fin Contenido de: components/shared/LoadingSpinner.tsx =====

// // ===== Inicio Contenido de: components/shared/RequestsTable.tsx =====

// import React from "react";

// interface EmptyStateProps {
//   message?: string;
// }

// const EmptyState: React.FC<EmptyStateProps> = ({ message }) => {
//   return (
//     <div className="empty-state">
//       <p>{message || "No requests found."}</p>
//     </div>
//   );
// };

// interface RequestsTableProps {
//   requests: string[]; // Expecting an array of request IDs (strings)
//   onCheckRequest: (requestId: string) => void; // Callback function when a request is clicked
//   emptyMessage?: string; // Optional message for the empty state
// }

// const RequestsTable: React.FC<RequestsTableProps> = ({ requests, onCheckRequest, emptyMessage }) => {
//   if (!requests || requests.length === 0) {
//     return <EmptyState message={emptyMessage} />;
//   }

//   return (
//     <div className="requests-table-container">
//       <table className="requests-table">
//         <thead>
//           <tr>
//             <th>Request ID</th>
//             <th>Action</th>{/* Added header for the button column */}
//           </tr>
//         </thead>
//         <tbody>
//           {requests.map((requestId) => (
//             <tr key={requestId}>
//               {/* Make ID clickable as well */}
//               <td
//                 className="request-id clickable"
//                 onClick={() => onCheckRequest(requestId)}
//                 style={{ cursor: 'pointer' }} // Add pointer cursor
//                 title={`View details for ${requestId}`} // Add title for hover tooltip
//               >
//                 {requestId}
//               </td>
//               <td>
//                 <button
//                   className="check-request-button"
//                   onClick={() => onCheckRequest(requestId)}
//                   aria-label={`Check details for request ${requestId}`} // Accessibility
//                 >
//                   Check Details
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default RequestsTable;

// // ===== Fin Contenido de: components/shared/RequestsTable.tsx =====

// // ===== Inicio Contenido de: contexts/BridgeContext.tsx =====

// import React, { createContext, useState, useEffect, useContext, ReactNode, Dispatch, SetStateAction } from "react";
// import { fetchBlockExplorers } from "../services/api";
// import { CHAINS } from "../utils/constants";
// import { SolanaFormData, EvmFormData, BlockExplorers } from "../types/api"; // Import types

// // Define the shape of the context data
// interface BridgeContextType {
//   bridgeType: string; // Consider 'solana-to-evm' | 'evm-to-solana' for stricter typing
//   setBridgeType: Dispatch<SetStateAction<string>>;
//   solanaForm: SolanaFormData;
//   setSolanaForm: Dispatch<SetStateAction<SolanaFormData>>;
//   evmForm: EvmFormData;
//   setEvmForm: Dispatch<SetStateAction<EvmFormData>>;
//   currentForm: SolanaFormData | EvmFormData; // Union type based on bridgeType
//   // setCurrentForm type is complex - it depends on bridgeType. Often managed implicitly.
//   // Explicitly providing setCurrentForm might require conditional typing or a wrapper function.
//   pendingRequests: string[];
//   setPendingRequests: Dispatch<SetStateAction<string[]>>;
//   completedRequests: string[];
//   setCompletedRequests: Dispatch<SetStateAction<string[]>>;
//   blockExplorers: BlockExplorers;
//   // setBlockExplorers is internal to the provider in this setup
// }

// // Create the context with a default value (null or a default object)
// // Using null requires checks wherever useContext is used.
// // Using a default object avoids null checks but needs careful default values.
// const BridgeContext = createContext<BridgeContextType | null>(null);

// interface BridgeProviderProps {
//   children: ReactNode;
// }

// // Initial state for forms
// const initialSolanaForm: SolanaFormData = {
//   token_mint: "",
//   token_account: "",
//   origin_network: CHAINS.SOLANA,
//   destination_account: "",
// };

// const initialEvmForm: EvmFormData = {
//   token_contract: "",
//   token_id: "",
//   token_owner: "",
//   origin_network: CHAINS.EVM,
//   destination_account: "",
// };

// // Initial state for block explorers
// const initialBlockExplorers: BlockExplorers = {
//     EVM: "",
//     SOLANA: ""
// };


// export const BridgeProvider: React.FC<BridgeProviderProps> = ({ children }) => {
//   // Bridge type state
//   const [bridgeType, setBridgeType] = useState<string>("solana-to-evm");

//   // Form states
//   const [solanaForm, setSolanaForm] = useState<SolanaFormData>(initialSolanaForm);
//   const [evmForm, setEvmForm] = useState<EvmFormData>(initialEvmForm);

//   // Pending and completed requests
//   const [pendingRequests, setPendingRequests] = useState<string[]>([]);
//   const [completedRequests, setCompletedRequests] = useState<string[]>([]);

//   // Block explorer URLs
//   const [blockExplorers, setBlockExplorers] = useState<BlockExplorers>(initialBlockExplorers);

//   // Helper to determine which form to use based on bridgeType
//   const currentForm = bridgeType === "solana-to-evm" ? solanaForm : evmForm;
//   // The 'setCurrentForm' concept is implicitly handled by setSolanaForm/setEvmForm

//   useEffect(() => {
//     // Load block explorers on context initialization
//     const loadExplorers = async (): Promise<void> => {
//       try {
//         const explorers: BlockExplorers = await fetchBlockExplorers();
//         setBlockExplorers(explorers);
//       } catch (error) {
//         console.error("Failed to load block explorers:", error);
//         // Handle error appropriately, e.g., set default explorers or show error message
//       }
//     };

//     loadExplorers();
//   }, []); // Empty dependency array ensures this runs only once on mount

//   // The value provided to the context consumers
//   const contextValue: BridgeContextType = {
//     bridgeType,
//     setBridgeType,
//     solanaForm,
//     setSolanaForm,
//     evmForm,
//     setEvmForm,
//     currentForm, // Provide the derived current form
//     // setCurrentForm is not directly provided, state setters are used instead
//     pendingRequests,
//     setPendingRequests,
//     completedRequests,
//     setCompletedRequests,
//     blockExplorers
//   };


//   return (
//     <BridgeContext.Provider value={contextValue}>
//       {children}
//     </BridgeContext.Provider>
//   );
// };

// // Custom hook to use the BridgeContext
// // Includes a check to ensure the context is used within a provider
// export const useBridge = (): BridgeContextType => {
//   const context = useContext(BridgeContext);
//   if (context === null) {
//     throw new Error("useBridge must be used within a BridgeProvider");
//   }
//   return context;
// };


// // ===== Fin Contenido de: contexts/BridgeContext.tsx =====

// // ===== Inicio Contenido de: index.tsx =====

// import React from "react";
// import ReactDOM from "react-dom/client";
// import "./index.css";
// import App from "./App";
// import ErrorBoundary from "./components/shared/ErrorBoundary";

// const rootElement = document.getElementById("root");

// // Ensure the root element exists before trying to create a root
// if (!rootElement) {
//   throw new Error("Failed to find the root element");
// }

// const root = ReactDOM.createRoot(rootElement);

// root.render(
//   <React.StrictMode>
//     {/* ErrorBoundary showDetails is true only in development */}
//     <ErrorBoundary showDetails={process.env.NODE_ENV === "development"}>
//       <App />
//     </ErrorBoundary>
//   </React.StrictMode>
// );


// // ===== Fin Contenido de: index.tsx =====

// // ===== Inicio Contenido de: reportWebVitals.ts =====

// import { ReportHandler } from 'web-vitals';

// const reportWebVitals = (onPerfEntry?: ReportHandler): void => { // Add void return type
//   if (onPerfEntry && onPerfEntry instanceof Function) {
//     import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
//       getCLS(onPerfEntry);
//       getFID(onPerfEntry);
//       getFCP(onPerfEntry);
//       getLCP(onPerfEntry);
//       getTTFB(onPerfEntry);
//     }).catch(error => {
//         // Handle potential errors during dynamic import
//         console.error("Error loading web-vitals:", error);
//     });
//   }
// };

// export default reportWebVitals;


// // ===== Fin Contenido de: reportWebVitals.ts =====

// // ===== Inicio Contenido de: services/api.ts =====

// import { SolanaFormData, EvmFormData, RequestStatusResponse, BlockExplorers } from "../types/api"; // Import types

// // Use environment variable for base URL if available, otherwise default
// const API_BASE_URL: string = process.env.REACT_APP_API_BASE_URL || "http://localhost:8000";


// // Helper function for handling API responses
// const handleResponse = async <T>(response: Response): Promise<T> => {
//     // Check if the response is JSON, otherwise return text or handle differently
//     const contentType = response.headers.get("content-type");
//     let data: any; // Use 'any' initially, then cast or validate

//     if (contentType && contentType.includes("application/json")) {
//          data = await response.json();
//     } else {
//          // Handle non-JSON responses if necessary, e.g., plain text error messages
//          data = await response.text(); // Get response as text
//          if (!response.ok) {
//              // Try to parse text as error message, or use default
//              throw new Error(data || `Request failed with status ${response.status}`);
//          }
//          // If response is OK but not JSON, might need specific handling
//          // For now, we assume successful non-JSON might need casting later
//          return data as T; // Risky cast, better to handle specific non-JSON types
//     }


//     if (!response.ok) {
//         // Try to extract error message from JSON data, default to generic message
//         const errorMessage = data?.error || data?.message || `Request failed with status ${response.status}`;
//         throw new Error(errorMessage);
//     }

//     return data as T; // Cast to expected type T
// };


// // Submit a new Solana to EVM bridge request
// export const submitSolanaToEvmRequest = async (formData: SolanaFormData): Promise<RequestStatusResponse> => {
//   const response = await fetch(`${API_BASE_URL}/bridge/solana-to-evm`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//        "Accept": "application/json", // Indicate we expect JSON back
//     },
//     body: JSON.stringify(formData),
//   });
//   return handleResponse<RequestStatusResponse>(response);
// };

// // Submit a new EVM to Solana bridge request
// export const submitEvmToSolanaRequest = async (formData: EvmFormData): Promise<RequestStatusResponse> => {
//   const response = await fetch(`${API_BASE_URL}/bridge/evm-to-solana`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       "Accept": "application/json",
//     },
//     body: JSON.stringify(formData),
//   });
//   return handleResponse<RequestStatusResponse>(response);
// };

// // Check the status of a request
// export const checkRequestStatus = async (requestId: string): Promise<RequestStatusResponse> => {
//   const response = await fetch(`${API_BASE_URL}/bridge/requests/${requestId}`, {
//     method: "GET",
//     headers: {
//        "Accept": "application/json",
//     },
//   });
//   return handleResponse<RequestStatusResponse>(response);
// };

// // Fetch pending requests (returns list of request IDs)
// export const fetchPendingRequests = async (): Promise<string[]> => {
//   const response = await fetch(`${API_BASE_URL}/bridge/pending-requests`, {
//     method: "GET",
//     headers: {
//       "Accept": "application/json",
//     },
//   });
//   // Expecting an array of strings
//   const data = await handleResponse<string[]>(response);
//   // Filter out empty strings just in case
//   return data.filter(id => typeof id === 'string' && id.trim() !== "");
// };

// // Fetch completed requests (returns list of request IDs)
// export const fetchCompletedRequests = async (): Promise<string[]> => {
//   const response = await fetch(`${API_BASE_URL}/bridge/completed-requests`, {
//     method: "GET",
//     headers: {
//        "Accept": "application/json",
//     },
//   });
//    // Expecting an array of strings
//    const data = await handleResponse<string[]>(response);
//    // Filter out empty strings just in case
//   return data.filter(id => typeof id === 'string' && id.trim() !== "");
// };

// // Fetch block explorer URLs
// export const fetchBlockExplorers = async (): Promise<BlockExplorers> => {
//   const response = await fetch(`${API_BASE_URL}/bridge/block_explorers`, {
//     method: "GET",
//     headers: {
//       "Accept": "application/json",
//     },
//   });
//   return handleResponse<BlockExplorers>(response);
// };

// // ===== Fin Contenido de: services/api.ts =====

// // ===== Inicio Contenido de: utils/constants.ts =====

// export const CHAINS = {
//     SOLANA: "Solana",
//     EVM: "EVM", // Represents any EVM-compatible chain supported by the backend
// } as const; // Use 'as const' for stricter typing

// // Mapping from backend status strings to user-friendly display strings
// export const STATUS_MAP: { [key: string]: string } = {
//     PENDING: "Pending Confirmation",
//     PROCESSING: "Processing Bridge",
//     COMPLETED: "Completed",
//     FAILED_SOURCE_TX: "Failed (Source Tx)",
//     FAILED_DEST_TX: "Failed (Destination Tx)",
//     FAILED_VALIDATION: "Failed (Validation)",
//     UNKNOWN: "Unknown Status",
//     // Add other potential statuses from the backend API
// };


// // ===== Fin Contenido de: utils/constants.ts =====

// // ===== Inicio Contenido de: utils/formatters.ts =====

// /**
//  * Formats a Unix timestamp (seconds or milliseconds) into a localized date/time string.
//  * @param timestamp - The Unix timestamp (number).
//  * @returns A formatted date/time string, or "Invalid Date" if timestamp is invalid.
//  */
// export const formatTimestamp = (timestamp: number | string | null | undefined): string => {
//     if (timestamp === null || timestamp === undefined) {
//         return "N/A";
//     }

//     let numericTimestamp: number;
//     if (typeof timestamp === 'string') {
//         numericTimestamp = parseInt(timestamp, 10);
//         if (isNaN(numericTimestamp)) {
//             return "Invalid Date";
//         }
//     } else {
//         numericTimestamp = timestamp;
//     }

//     // Assume timestamp is in seconds if it's less than a large number (e.g., 1 Jan 2000 in ms)
//     // Adjust this threshold based on expected timestamp format (seconds vs ms)
//     const timestampInMs = numericTimestamp < 10000000000 ? numericTimestamp * 1000 : numericTimestamp;

//     const date = new Date(timestampInMs);

//     if (isNaN(date.getTime())) {
//         return "Invalid Date";
//     }

//     // Use Intl.DateTimeFormat for better localization and options
//     try {
//         return new Intl.DateTimeFormat(navigator.language, { // Use browser's locale
//             dateStyle: 'medium', // e.g., Sep 14, 2023
//             timeStyle: 'short',  // e.g., 1:30 PM
//         }).format(date);
//     } catch (e) {
//         console.error("Error formatting date:", e);
//         // Fallback to basic formatting if Intl fails
//         return date.toLocaleString();
//     }
// };

// /**
//  * Checks if a transaction hash likely belongs to an EVM chain.
//  * Basic check: EVM hashes are typically 0x prefixed and 66 characters long (0x + 64 hex chars).
//  * Solana hashes are Base58 encoded and variable length (usually 87-88 chars for signatures).
//  * @param hash - The transaction hash string.
//  * @returns True if the hash looks like an EVM hash, false otherwise.
//  */
// export const isEVMTransaction = (hash: string | null | undefined): boolean => {
//     if (!hash) {
//         return false;
//     }
//     // Check for '0x' prefix and length of 66 characters (0x + 64 hex)
//     return typeof hash === 'string' && hash.startsWith('0x') && hash.length === 66;
// };

// // ===== Fin Contenido de: utils/formatters.ts =====