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