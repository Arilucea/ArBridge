
import React from "react";
import { useBridge } from "../../contexts/BridgeContext";
import { CHAINS } from "../../utils/constants";
import LoadingSpinner from "../shared/LoadingSpinner"; // Import LoadingSpinner

const EvmToSolanaForm: React.FC = () => {
  const context = useBridge();

  // Handle context potentially being null during initialization
  if (!context) {
    return <LoadingSpinner />; // Or some other placeholder/error message
  }

  const { evmForm, setEvmForm } = context;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
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
          aria-label="EVM Token Contract"
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
           aria-label="Token ID"
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
           aria-label="Token Owner"
        />
      </div>

      <div className="form-group">
        <label htmlFor="origin_network">Origin Network</label>
        <select
          id="origin_network"
          name="origin_network"
          value={evmForm.origin_network}
          onChange={handleChange} // Although disabled, keep for consistency if it might become enabled
          required
          disabled // This field is determined by the bridge direction
          aria-label="Origin Network"
        >
          {/* Only show the relevant option */}
          <option value={CHAINS.EVM}>EVM</option>
        </select>
        <small className="hint-text">
          Origin network is determined by the bridge direction (EVM to Solana).
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
          aria-label="Destination Solana Account"
        />
      </div>
    </>
  );
};

export default EvmToSolanaForm;
