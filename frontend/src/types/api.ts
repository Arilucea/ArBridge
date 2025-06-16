
import { CHAINS } from "../utils/constants";

export interface SolanaFormData {
  token_mint: string;
  token_account: string;
  origin_network: typeof CHAINS.SOLANA;
  destination_account: string;
}

export interface EvmFormData {
  token_contract: string;
  token_id: string;
  token_owner: string;
  origin_network: typeof CHAINS.EVM;
  destination_account: string;
}

export interface RequestInput {
  contract_or_mint: string;
  token_id?: string; // Optional for EVM
  token_account?: string; // Optional for Solana, but likely needed
  token_owner?: string; // Only for EVM
  origin_network: string; // Can be refined to CHAINS.SOLANA | CHAINS.EVM
  destination_account: string;
}

export interface RequestOutput {
  detination_contract_id_or_mint: string | null;
  detination_token_id_or_account: string | null;
}

export interface RequestStatusResponse {
  id: string;
  status: string; // Could be a union type of possible statuses
  last_update: number; // Timestamp
  input: RequestInput;
  tx_hashes: string[];
  output: RequestOutput;
}

export interface BlockExplorers {
  EVM: string;
  SOLANA: string;
}