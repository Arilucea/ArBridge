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