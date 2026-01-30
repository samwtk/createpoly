import type {
  PolicyConfig,
  TurnkeyPolicy,
  ConsensusConfig,
  ConditionConfig,
  EthereumCondition,
  SolanaConditionConfig,
  TronCondition,
  ActivityCondition,
} from "@/types/policy";

export function buildConsensusExpression(config: ConsensusConfig): string {
  if (config.users.length === 0) return "";

  const userConditions = config.users
    .map((u) => `user.id == '${u.userId}'`)
    .join(" || ");

  switch (config.operator) {
    case "any":
      return `approvers.any(user, ${userConditions})`;
    case "all":
      return `approvers.all(user, ${userConditions})`;
    case "count":
      const threshold = config.countThreshold || 1;
      return `approvers.count(user, ${userConditions}) >= ${threshold}`;
    default:
      return `approvers.any(user, ${userConditions})`;
  }
}

function buildEthereumCondition(conditions: EthereumCondition[]): string {
  if (conditions.length === 0) return "";

  return conditions
    .map((c) => {
      const field = `eth.tx.${c.field}`;
      if (c.operator === "startsWith") {
        return `${field}.startsWith('${c.value}')`;
      }
      // Handle numeric vs string values
      const isNumericField = ["value", "gas", "gas_price", "chain_id"].includes(
        c.field
      );
      const formattedValue = isNumericField ? c.value : `'${c.value}'`;
      return `${field} ${c.operator} ${formattedValue}`;
    })
    .join(" && ");
}

function buildSolanaCondition(config: SolanaConditionConfig): string {
  const parts: string[] = [];

  // Add instruction count if specified
  if (config.instructionCount) {
    parts.push(
      `solana.tx.instructions.count() ${config.instructionCount.operator} ${config.instructionCount.value}`
    );
  }

  // Add transfer count if specified
  if (config.transferCount) {
    parts.push(
      `solana.tx.transfers.count() ${config.transferCount.operator} ${config.transferCount.value}`
    );
  }

  // Build transfer/spl_transfer conditions
  for (const condition of config.conditions) {
    if ("type" in condition) {
      // Transfer condition
      const txField =
        condition.type === "transfers"
          ? "solana.tx.transfers"
          : "solana.tx.spl_transfers";

      const innerCondition = `transfer.${condition.field} ${condition.operator} '${condition.value}'`;

      switch (condition.quantifier) {
        case "all":
          parts.push(`${txField}.all(transfer, ${innerCondition})`);
          break;
        case "any":
          parts.push(`${txField}.any(transfer, ${innerCondition})`);
          break;
        case "count":
          parts.push(
            `${txField}.count(transfer, ${innerCondition}) >= ${condition.countValue || 1}`
          );
          break;
      }
    } else {
      // Instruction condition
      if (condition.field === "count") {
        parts.push(
          `solana.tx.instructions.count() ${condition.operator} ${condition.value}`
        );
      } else {
        const innerCondition = `i.${condition.field} ${condition.operator} '${condition.value}'`;
        switch (condition.quantifier) {
          case "all":
            parts.push(`solana.tx.instructions.all(i, ${innerCondition})`);
            break;
          case "any":
            parts.push(`solana.tx.instructions.any(i, ${innerCondition})`);
            break;
        }
      }
    }
  }

  return parts.join(" && ");
}

function buildTronCondition(conditions: TronCondition[]): string {
  if (conditions.length === 0) return "";

  return conditions
    .map((c) => {
      const base = "tron.tx.contract[0]";
      if (c.contractType && !c.field) {
        return `${base}.type == '${c.contractType}'`;
      }
      if (c.field) {
        const fieldPath = `${base}.${c.field}`;
        const isNumeric = c.field === "amount";
        const formattedValue = isNumeric ? c.value : `'${c.value}'`;
        return `${fieldPath} ${c.operator} ${formattedValue}`;
      }
      return "";
    })
    .filter(Boolean)
    .join(" && ");
}

function buildActivityCondition(conditions: ActivityCondition[]): string {
  if (conditions.length === 0) return "";

  return conditions
    .map((c) => `activity.${c.field} ${c.operator} '${c.value}'`)
    .join(" && ");
}

export function buildConditionExpression(config: ConditionConfig): string {
  if (config.rawCondition) {
    return config.rawCondition;
  }

  switch (config.chain) {
    case "ethereum":
      return config.ethereum ? buildEthereumCondition(config.ethereum) : "";
    case "solana":
      return config.solana ? buildSolanaCondition(config.solana) : "";
    case "tron":
      return config.tron ? buildTronCondition(config.tron) : "";
    case "activity":
      return config.activity ? buildActivityCondition(config.activity) : "";
    default:
      return "";
  }
}

export function buildPolicy(config: PolicyConfig): TurnkeyPolicy {
  const policy: TurnkeyPolicy = {
    policyName: config.policyName || "Unnamed Policy",
    effect: config.effect,
  };

  if (config.consensus && config.consensus.users.length > 0) {
    policy.consensus = buildConsensusExpression(config.consensus);
  }

  if (config.condition) {
    const conditionExpr = buildConditionExpression(config.condition);
    if (conditionExpr) {
      policy.condition = conditionExpr;
    }
  }

  if (config.notes) {
    policy.notes = config.notes;
  }

  return policy;
}

export function formatPolicyJson(policy: TurnkeyPolicy): string {
  return JSON.stringify(policy, null, 2);
}
