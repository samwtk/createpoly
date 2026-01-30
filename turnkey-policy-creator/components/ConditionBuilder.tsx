"use client";

import React from "react";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Filter } from "lucide-react";
import { EthereumConditions } from "@/components/chains/EthereumConditions";
import { SolanaConditions } from "@/components/chains/SolanaConditions";
import { TronConditions } from "@/components/chains/TronConditions";
import { ActivityConditions } from "@/components/chains/ActivityConditions";
import type {
  ConditionConfig,
  ChainType,
  EthereumCondition,
  SolanaConditionConfig,
  TronCondition,
  ActivityCondition,
} from "@/types/policy";

interface ConditionBuilderProps {
  config: ConditionConfig;
  onChange: (config: ConditionConfig) => void;
}

const chainOptions = [
  { value: "ethereum", label: "Ethereum / EVM" },
  { value: "solana", label: "Solana" },
  { value: "tron", label: "Tron" },
  { value: "activity", label: "Activity-based" },
  { value: "raw", label: "Raw Expression" },
];

export function ConditionBuilder({ config, onChange }: ConditionBuilderProps) {
  const handleChainChange = (chain: string) => {
    if (chain === "raw") {
      onChange({
        ...config,
        chain: "activity",
        rawCondition: config.rawCondition || "",
      });
    } else {
      const newConfig: ConditionConfig = {
        chain: chain as ChainType,
      };

      // Initialize chain-specific config
      if (chain === "ethereum") {
        newConfig.ethereum = config.ethereum || [];
      } else if (chain === "solana") {
        newConfig.solana = config.solana || { conditions: [] };
      } else if (chain === "tron") {
        newConfig.tron = config.tron || [];
      } else if (chain === "activity") {
        newConfig.activity = config.activity || [];
      }

      onChange(newConfig);
    }
  };

  const handleEthereumChange = (conditions: EthereumCondition[]) => {
    onChange({ ...config, ethereum: conditions });
  };

  const handleSolanaChange = (solanaConfig: SolanaConditionConfig) => {
    onChange({ ...config, solana: solanaConfig });
  };

  const handleTronChange = (conditions: TronCondition[]) => {
    onChange({ ...config, tron: conditions });
  };

  const handleActivityChange = (conditions: ActivityCondition[]) => {
    onChange({ ...config, activity: conditions });
  };

  const handleRawChange = (rawCondition: string) => {
    onChange({ ...config, rawCondition });
  };

  const isRawMode = !!config.rawCondition;
  const currentChain = isRawMode ? "raw" : config.chain;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Filter className="h-5 w-5" />
        <Label className="text-lg font-semibold">Condition (When it applies)</Label>
      </div>

      <p className="text-sm text-muted-foreground">
        Define the conditions under which this policy applies.
      </p>

      <div>
        <Label className="text-xs">Condition Type</Label>
        <Select
          options={chainOptions}
          value={currentChain}
          onChange={(e) => handleChainChange(e.target.value)}
        />
      </div>

      <div className="mt-4">
        {config.chain === "ethereum" && !isRawMode && (
          <EthereumConditions
            conditions={config.ethereum || []}
            onChange={handleEthereumChange}
          />
        )}

        {config.chain === "solana" && !isRawMode && (
          <SolanaConditions
            config={config.solana || { conditions: [] }}
            onChange={handleSolanaChange}
          />
        )}

        {config.chain === "tron" && !isRawMode && (
          <TronConditions
            conditions={config.tron || []}
            onChange={handleTronChange}
          />
        )}

        {config.chain === "activity" && !isRawMode && (
          <ActivityConditions
            conditions={config.activity || []}
            onChange={handleActivityChange}
          />
        )}

        {isRawMode && (
          <div className="space-y-2">
            <Label className="text-base font-semibold">Raw Condition Expression</Label>
            <p className="text-sm text-muted-foreground">
              Enter a raw policy condition expression. Use this for advanced
              conditions not supported by the visual builder.
            </p>
            <Textarea
              className="font-mono text-sm"
              rows={4}
              placeholder="eth.tx.to == '0x...' && eth.tx.value <= 1000000000000000000"
              value={config.rawCondition || ""}
              onChange={(e) => handleRawChange(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Refer to the{" "}
              <a
                href="https://docs.turnkey.com/concepts/policies/language"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline"
              >
                Turnkey Policy Language documentation
              </a>{" "}
              for syntax help.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
