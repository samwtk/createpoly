"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select } from "@/components/ui/select";
import { Sparkles } from "lucide-react";
import { policyPresets, getPresetsByCategory } from "@/lib/presets";
import type { PolicyConfig, PolicyPreset } from "@/types/policy";

interface PolicyPresetsProps {
  onSelect: (config: PolicyConfig) => void;
}

const categoryOptions = [
  { value: "all", label: "All Presets" },
  { value: "ethereum", label: "Ethereum" },
  { value: "solana", label: "Solana" },
  { value: "tron", label: "Tron" },
  { value: "general", label: "General" },
];

export function PolicyPresets({ onSelect }: PolicyPresetsProps) {
  const [category, setCategory] = useState("all");
  const filteredPresets = getPresetsByCategory(category);

  const handlePresetClick = (preset: PolicyPreset) => {
    // Deep clone to avoid mutations
    const config = JSON.parse(JSON.stringify(preset.config));
    onSelect(config);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            <CardTitle className="text-lg">Policy Presets</CardTitle>
          </div>
          <Select
            className="w-36"
            options={categoryOptions}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {filteredPresets.map((preset) => (
            <Button
              key={preset.id}
              type="button"
              variant="outline"
              className="h-auto py-3 px-4 flex flex-col items-start text-left"
              onClick={() => handlePresetClick(preset)}
            >
              <span className="font-medium text-sm">{preset.name}</span>
              <span className="text-xs text-muted-foreground font-normal mt-1">
                {preset.description}
              </span>
            </Button>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-3">
          Click a preset to load it into the builder. Remember to replace
          placeholder values like &lt;USER_ID&gt; and &lt;ALLOWED_ADDRESS&gt;.
        </p>
      </CardContent>
    </Card>
  );
}
