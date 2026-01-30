"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Plus, Trash2, Users } from "lucide-react";
import type { ConsensusConfig, UserCondition } from "@/types/policy";

interface ConsensusBuilderProps {
  config: ConsensusConfig;
  onChange: (config: ConsensusConfig) => void;
}

const operatorOptions = [
  { value: "any", label: "Any user (OR)" },
  { value: "all", label: "All users (AND)" },
  { value: "count", label: "Minimum count" },
];

export function ConsensusBuilder({ config, onChange }: ConsensusBuilderProps) {
  const addUser = () => {
    const newUser: UserCondition = {
      id: crypto.randomUUID(),
      userId: "",
    };
    onChange({
      ...config,
      users: [...config.users, newUser],
    });
  };

  const updateUser = (id: string, userId: string) => {
    onChange({
      ...config,
      users: config.users.map((u) =>
        u.id === id ? { ...u, userId } : u
      ),
    });
  };

  const removeUser = (id: string) => {
    onChange({
      ...config,
      users: config.users.filter((u) => u.id !== id),
    });
  };

  const updateOperator = (operator: string) => {
    onChange({
      ...config,
      operator: operator as ConsensusConfig["operator"],
    });
  };

  const updateThreshold = (threshold: number) => {
    onChange({
      ...config,
      countThreshold: threshold,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Users className="h-5 w-5" />
        <Label className="text-lg font-semibold">Consensus (Who can act)</Label>
      </div>

      <p className="text-sm text-muted-foreground">
        Define which users are allowed to perform actions under this policy.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Label className="text-xs">Operator</Label>
          <Select
            options={operatorOptions}
            value={config.operator}
            onChange={(e) => updateOperator(e.target.value)}
          />
        </div>
        {config.operator === "count" && (
          <div className="w-32">
            <Label className="text-xs">Minimum Required</Label>
            <Input
              type="number"
              min={1}
              value={config.countThreshold || 1}
              onChange={(e) => updateThreshold(parseInt(e.target.value) || 1)}
            />
          </div>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label className="text-sm">Users</Label>
          <Button type="button" variant="outline" size="sm" onClick={addUser}>
            <Plus className="h-4 w-4 mr-1" />
            Add User
          </Button>
        </div>

        {config.users.length === 0 && (
          <p className="text-sm text-muted-foreground italic p-3 border rounded-lg bg-muted/30">
            No users added. Add at least one user to define who can act.
          </p>
        )}

        {config.users.map((user, index) => (
          <div key={user.id} className="flex items-center gap-2">
            <div className="flex-1">
              <Input
                placeholder="Enter User ID (UUID)"
                value={user.userId}
                onChange={(e) => updateUser(user.id, e.target.value)}
              />
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => removeUser(user.id)}
            >
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </div>
        ))}
      </div>

      {config.users.length > 0 && (
        <div className="p-3 bg-muted/50 rounded-lg text-sm">
          <span className="font-medium">Generated expression: </span>
          <code className="text-xs bg-background px-1 py-0.5 rounded">
            {config.operator === "any" && "approvers.any(user, ...)"}
            {config.operator === "all" && "approvers.all(user, ...)"}
            {config.operator === "count" &&
              `approvers.count(user, ...) >= ${config.countThreshold || 1}`}
          </code>
        </div>
      )}
    </div>
  );
}
