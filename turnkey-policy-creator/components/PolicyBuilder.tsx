"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Shield, ShieldOff, FileText } from "lucide-react";
import { ConsensusBuilder } from "@/components/ConsensusBuilder";
import { ConditionBuilder } from "@/components/ConditionBuilder";
import { JsonOutput } from "@/components/JsonOutput";
import { PolicyPresets } from "@/components/PolicyPresets";
import { buildPolicy } from "@/lib/policy-builder";
import type {
  PolicyConfig,
  PolicyEffect,
  ConsensusConfig,
  ConditionConfig,
  TurnkeyPolicy,
} from "@/types/policy";

const defaultConsensus: ConsensusConfig = {
  operator: "any",
  users: [],
};

const defaultCondition: ConditionConfig = {
  chain: "ethereum",
  ethereum: [],
};

const defaultConfig: PolicyConfig = {
  policyName: "",
  effect: "EFFECT_ALLOW",
  consensus: defaultConsensus,
  condition: defaultCondition,
  notes: "",
};

export function PolicyBuilder() {
  const [config, setConfig] = useState<PolicyConfig>(defaultConfig);
  const [policy, setPolicy] = useState<TurnkeyPolicy>(() =>
    buildPolicy(defaultConfig)
  );

  // Update policy whenever config changes
  useEffect(() => {
    setPolicy(buildPolicy(config));
  }, [config]);

  const updateConfig = <K extends keyof PolicyConfig>(
    key: K,
    value: PolicyConfig[K]
  ) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
  };

  const handleEffectToggle = (effect: PolicyEffect) => {
    updateConfig("effect", effect);
  };

  const handleConsensusChange = (consensus: ConsensusConfig) => {
    updateConfig("consensus", consensus);
  };

  const handleConditionChange = (condition: ConditionConfig) => {
    updateConfig("condition", condition);
  };

  const handlePresetSelect = (presetConfig: PolicyConfig) => {
    setConfig(presetConfig);
  };

  const handleReset = () => {
    setConfig(defaultConfig);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left Column - Builder */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Policy Builder
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Policy Name */}
            <div className="space-y-2">
              <Label htmlFor="policyName">Policy Name</Label>
              <Input
                id="policyName"
                placeholder="Enter a descriptive name for this policy"
                value={config.policyName}
                onChange={(e) => updateConfig("policyName", e.target.value)}
              />
            </div>

            {/* Effect Toggle */}
            <div className="space-y-2">
              <Label>Effect</Label>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant={config.effect === "EFFECT_ALLOW" ? "default" : "outline"}
                  className={
                    config.effect === "EFFECT_ALLOW"
                      ? "bg-green-600 hover:bg-green-700"
                      : ""
                  }
                  onClick={() => handleEffectToggle("EFFECT_ALLOW")}
                >
                  <Shield className="h-4 w-4 mr-2" />
                  ALLOW
                </Button>
                <Button
                  type="button"
                  variant={config.effect === "EFFECT_DENY" ? "default" : "outline"}
                  className={
                    config.effect === "EFFECT_DENY"
                      ? "bg-red-600 hover:bg-red-700"
                      : ""
                  }
                  onClick={() => handleEffectToggle("EFFECT_DENY")}
                >
                  <ShieldOff className="h-4 w-4 mr-2" />
                  DENY
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                {config.effect === "EFFECT_ALLOW"
                  ? "This policy will ALLOW matching actions."
                  : "This policy will DENY matching actions. Deny always takes precedence over Allow."}
              </p>
            </div>

            {/* Divider */}
            <div className="border-t" />

            {/* Consensus */}
            <ConsensusBuilder
              config={config.consensus || defaultConsensus}
              onChange={handleConsensusChange}
            />

            {/* Divider */}
            <div className="border-t" />

            {/* Condition */}
            <ConditionBuilder
              config={config.condition || defaultCondition}
              onChange={handleConditionChange}
            />

            {/* Divider */}
            <div className="border-t" />

            {/* Notes */}
            <div className="space-y-2">
              <Label htmlFor="notes">Notes (Optional)</Label>
              <Textarea
                id="notes"
                placeholder="Add any notes or documentation for this policy"
                value={config.notes || ""}
                onChange={(e) => updateConfig("notes", e.target.value)}
                rows={3}
              />
            </div>

            {/* Reset Button */}
            <div className="flex justify-end">
              <Button type="button" variant="outline" onClick={handleReset}>
                Reset Form
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right Column - Output & Presets */}
      <div className="space-y-6">
        <JsonOutput policy={policy} />
        <PolicyPresets onSelect={handlePresetSelect} />
      </div>
    </div>
  );
}
