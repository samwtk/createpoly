"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Plus, Trash2, ExternalLink } from "lucide-react";
import type { ActivityCondition } from "@/types/policy";

interface ActivityConditionsProps {
  conditions: ActivityCondition[];
  onChange: (conditions: ActivityCondition[]) => void;
}

const fieldOptions = [
  { value: "type", label: "Activity Type" },
  { value: "resource", label: "Resource" },
];

const operatorOptions = [
  { value: "==", label: "equals (==)" },
  { value: "!=", label: "not equals (!=)" },
];

const activityTypeExamples = [
  "ACTIVITY_TYPE_SIGN_RAW_PAYLOAD_V2",
  "ACTIVITY_TYPE_SIGN_TRANSACTION_V2",
  "ACTIVITY_TYPE_CREATE_WALLET",
  "ACTIVITY_TYPE_CREATE_USERS",
  "ACTIVITY_TYPE_CREATE_POLICY",
  "ACTIVITY_TYPE_DELETE_POLICY",
];

export function ActivityConditions({
  conditions,
  onChange,
}: ActivityConditionsProps) {
  const addCondition = () => {
    onChange([
      ...conditions,
      { field: "type", operator: "==", value: "" },
    ]);
  };

  const updateCondition = (
    index: number,
    field: keyof ActivityCondition,
    value: string
  ) => {
    const updated = [...conditions];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const removeCondition = (index: number) => {
    onChange(conditions.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <Label className="text-base font-semibold">Activity Conditions</Label>
          <a
            href="https://docs.turnkey.com/concepts/policies/examples"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            Examples <ExternalLink className="h-3 w-3" />
          </a>
        </div>
        <Button type="button" variant="outline" size="sm" onClick={addCondition}>
          <Plus className="h-4 w-4 mr-1" />
          Add Condition
        </Button>
      </div>

      <p className="text-sm text-muted-foreground">
        Activity-based conditions control permissions based on the type of action
        being performed, rather than transaction details.{" "}
        <a
          href="https://docs.turnkey.com/api/activity-types"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          View all activity types
        </a>
      </p>

      {conditions.length === 0 && (
        <p className="text-sm text-muted-foreground italic">
          No conditions added.
        </p>
      )}

      {conditions.map((condition, index) => (
        <div
          key={index}
          className="flex flex-col gap-3 p-4 border rounded-lg bg-muted/30"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Condition {index + 1}</span>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => removeCondition(index)}
            >
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <Label className="text-xs">Field</Label>
              <Select
                options={fieldOptions}
                value={condition.field}
                onChange={(e) => updateCondition(index, "field", e.target.value)}
              />
            </div>
            <div>
              <Label className="text-xs">Operator</Label>
              <Select
                options={operatorOptions}
                value={condition.operator}
                onChange={(e) =>
                  updateCondition(index, "operator", e.target.value)
                }
              />
            </div>
            <div>
              <Label className="text-xs">Value</Label>
              <Input
                placeholder="ACTIVITY_TYPE_..."
                value={condition.value}
                onChange={(e) => updateCondition(index, "value", e.target.value)}
                list={`activity-types-${index}`}
              />
              <datalist id={`activity-types-${index}`}>
                {activityTypeExamples.map((type) => (
                  <option key={type} value={type} />
                ))}
              </datalist>
            </div>
          </div>

          <div className="text-xs text-muted-foreground">
            <p className="font-medium mb-1">Common activity types:</p>
            <ul className="list-disc list-inside space-y-0.5">
              <li>ACTIVITY_TYPE_SIGN_RAW_PAYLOAD_V2 - Sign raw payloads</li>
              <li>ACTIVITY_TYPE_SIGN_TRANSACTION_V2 - Sign transactions</li>
              <li>ACTIVITY_TYPE_CREATE_WALLET - Create wallets</li>
              <li>ACTIVITY_TYPE_CREATE_USERS - Create users</li>
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}
