export type PolicyEffect = "EFFECT_ALLOW" | "EFFECT_DENY";

export type ChainType = "ethereum" | "solana" | "tron" | "activity";

export type ConsensusOperator = "any" | "all" | "count";

export interface UserCondition {
  id: string;
  userId: string;
}

export interface ConsensusConfig {
  operator: ConsensusOperator;
  users: UserCondition[];
  countThreshold?: number;
}

// Ethereum condition types
export interface EthereumCondition {
  field: "to" | "value" | "chain_id" | "gas" | "gas_price" | "data";
  operator: "==" | "!=" | ">" | "<" | ">=" | "<=" | "startsWith";
  value: string;
}

// Solana condition types
export type SolanaTransferField = "to" | "from" | "amount";
export type SolanaQuantifier = "all" | "any" | "count";

export interface SolanaTransferCondition {
  type: "transfers" | "spl_transfers";
  quantifier: SolanaQuantifier;
  field: SolanaTransferField;
  operator: "==" | "!=" | ">" | "<" | ">=" | "<=";
  value: string;
  countValue?: number;
}

export interface SolanaInstructionCondition {
  quantifier: SolanaQuantifier;
  field: "program_key" | "count";
  operator: "==" | "!=" | ">" | "<" | ">=" | "<=";
  value: string;
}

export interface SolanaConditionConfig {
  conditions: (SolanaTransferCondition | SolanaInstructionCondition)[];
  instructionCount?: { operator: "==" | ">" | "<" | ">=" | "<="; value: number };
  transferCount?: { operator: "==" | ">" | "<" | ">=" | "<="; value: number };
}

// Tron condition types
export type TronContractType =
  | "TransferContract"
  | "TriggerSmartContract"
  | "DelegateResourceContract"
  | "UnDelegateResourceContract"
  | "FreezeBalanceV2Contract"
  | "UnfreezeBalanceV2Contract"
  | "AccountPermissionUpdateContract";

export interface TronCondition {
  contractType?: TronContractType;
  field?: "owner_address" | "to_address" | "amount" | "contract_address";
  operator: "==" | "!=" | ">" | "<" | ">=" | "<=";
  value: string;
}

// Activity condition types
export interface ActivityCondition {
  field: "type" | "resource";
  operator: "==" | "!=";
  value: string;
}

export interface ConditionConfig {
  chain: ChainType;
  ethereum?: EthereumCondition[];
  solana?: SolanaConditionConfig;
  tron?: TronCondition[];
  activity?: ActivityCondition[];
  rawCondition?: string;
}

export interface PolicyConfig {
  policyName: string;
  effect: PolicyEffect;
  consensus?: ConsensusConfig;
  condition?: ConditionConfig;
  notes?: string;
}

export interface TurnkeyPolicy {
  policyName: string;
  effect: PolicyEffect;
  consensus?: string;
  condition?: string;
  notes?: string;
}

export interface PolicyPreset {
  id: string;
  name: string;
  description: string;
  category: "ethereum" | "solana" | "tron" | "general";
  config: PolicyConfig;
  docUrl?: string;
}
