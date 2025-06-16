import React from "react";
import { useBridge } from "../../contexts/BridgeContext";
import { CHAINS, STATUS_MAP } from "../../utils/constants";
import { formatTimestamp, isEVMTransaction } from "../../utils/formatters";
import { RequestStatusResponse } from "../../types/api"; // Import the type

interface RequestDetailsProps {
  response: RequestStatusResponse; // Use the imported type, ensure it's not null here
}

const RequestDetails: React.FC<RequestDetailsProps> = ({ response }) => {
  const context = useBridge(); // Get the whole context

  // Handle case where context might be null if not properly provided
  if (!context) {
      // Optionally render an error or loading state, or return null
      // This depends on whether the context is guaranteed to be available
      console.error("BridgeContext not found!");
      return null;
  }

  const { blockExplorers } = context; // Destructure after checking context

  // No need for !response check due to prop type guarantee

  // Get the mapped status or use original if not found
  const mappedStatus: string = STATUS_MAP[response.status] || response.status;

  // Determine the labels based on origin network
  const isEVMOrigin: boolean = response.input.origin_network === CHAINS.EVM;
  // Corrected labels based on the destination network (implicitly the opposite)
  const destinationTokenLabel: string = !isEVMOrigin ? "Destination Token ID" : "Destination Token Account"; 
  const destinationContractLabel: string = !isEVMOrigin ? "Destination Contract ID" : "Destination Token Mint" ; 

  const getTransactionExplorerUrl = (hash: string): string => {
    if (!blockExplorers.EVM || !blockExplorers.SOLANA) {
      console.warn("Block explorer URLs not loaded yet.");
      return "#"; // Return a placeholder link
    }
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
            <th colSpan={2} className="section-header">Input Details</th>
          </tr>
          <tr>
             {/* Label changes based on origin */}
            <th>{isEVMOrigin ? 'Token Contract' : 'Token Mint'}</th>
            <td>{response.input.contract_or_mint}</td>
          </tr>
          {/* Conditionally render Token ID (only relevant for EVM origin) */}
          {isEVMOrigin && (
             <tr>
                 <th>Token ID</th>
                 <td>{response.input.token_id || 'N/A'}</td>
             </tr>
          )}
           {/* Conditionally render Token Account (relevant for Solana origin) */}
           {!isEVMOrigin && (
              <tr>
                  <th>Token Account</th>
                  <td>{response.input.token_owner	 || 'N/A'}</td>
              </tr>
           )}
           {/* Conditionally render Token Owner (only relevant for EVM origin) */}
           {isEVMOrigin && (
               <tr>
                   <th>Token Owner</th>
                   <td>{response.input.token_owner || 'N/A'}</td>
               </tr>
           )}
          <tr>
            <th>Origin Network</th>
            <td>{response.input.origin_network}</td>
          </tr>
          <tr>
            <th>Destination Account</th>
            <td>{response.input.destination_account}</td>
          </tr>

          <tr>
            <th colSpan={2} className="section-header">Transaction Hashes</th>
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
            <th colSpan={2} className="section-header">Output Details</th>
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