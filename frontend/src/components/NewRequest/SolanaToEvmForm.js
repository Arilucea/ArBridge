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