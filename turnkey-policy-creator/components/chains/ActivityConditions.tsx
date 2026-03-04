"use client";

import React from "react";
import { Button } from "@/components/ui/button";
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
  { value: "resource", label: "Activity Resource" },
  { value: "action", label: "Activity Action" },
];

const operatorOptions = [
  { value: "==", label: "equals (==)" },
  { value: "!=", label: "not equals (!=)" },
];

const activityTypeExamples = [
  "ACTIVITY_TYPE_CREATE_API_KEYS",
  "ACTIVITY_TYPE_CREATE_USERS",
  "ACTIVITY_TYPE_CREATE_PRIVATE_KEYS",
  "ACTIVITY_TYPE_SIGN_RAW_PAYLOAD",
  "ACTIVITY_TYPE_CREATE_INVITATIONS",
  "ACTIVITY_TYPE_ACCEPT_INVITATION",
  "ACTIVITY_TYPE_CREATE_POLICY",
  "ACTIVITY_TYPE_DISABLE_PRIVATE_KEY",
  "ACTIVITY_TYPE_DELETE_USERS",
  "ACTIVITY_TYPE_DELETE_API_KEYS",
  "ACTIVITY_TYPE_DELETE_INVITATION",
  "ACTIVITY_TYPE_DELETE_ORGANIZATION",
  "ACTIVITY_TYPE_DELETE_POLICY",
  "ACTIVITY_TYPE_CREATE_USER_TAG",
  "ACTIVITY_TYPE_DELETE_USER_TAGS",
  "ACTIVITY_TYPE_CREATE_ORGANIZATION",
  "ACTIVITY_TYPE_SIGN_TRANSACTION",
  "ACTIVITY_TYPE_APPROVE_ACTIVITY",
  "ACTIVITY_TYPE_REJECT_ACTIVITY",
  "ACTIVITY_TYPE_DELETE_AUTHENTICATORS",
  "ACTIVITY_TYPE_CREATE_AUTHENTICATORS",
  "ACTIVITY_TYPE_CREATE_PRIVATE_KEY_TAG",
  "ACTIVITY_TYPE_DELETE_PRIVATE_KEY_TAGS",
  "ACTIVITY_TYPE_SET_PAYMENT_METHOD",
  "ACTIVITY_TYPE_ACTIVATE_BILLING_TIER",
  "ACTIVITY_TYPE_DELETE_PAYMENT_METHOD",
  "ACTIVITY_TYPE_CREATE_POLICY_V2",
  "ACTIVITY_TYPE_CREATE_POLICY_V3",
  "ACTIVITY_TYPE_CREATE_API_ONLY_USERS",
  "ACTIVITY_TYPE_UPDATE_ROOT_QUORUM",
  "ACTIVITY_TYPE_UPDATE_USER_TAG",
  "ACTIVITY_TYPE_UPDATE_PRIVATE_KEY_TAG",
  "ACTIVITY_TYPE_CREATE_AUTHENTICATORS_V2",
  "ACTIVITY_TYPE_CREATE_ORGANIZATION_V2",
  "ACTIVITY_TYPE_CREATE_USERS_V2",
  "ACTIVITY_TYPE_ACCEPT_INVITATION_V2",
  "ACTIVITY_TYPE_CREATE_SUB_ORGANIZATION",
  "ACTIVITY_TYPE_CREATE_SUB_ORGANIZATION_V2",
  "ACTIVITY_TYPE_UPDATE_ALLOWED_ORIGINS",
  "ACTIVITY_TYPE_CREATE_PRIVATE_KEYS_V2",
  "ACTIVITY_TYPE_UPDATE_USER",
  "ACTIVITY_TYPE_UPDATE_POLICY",
  "ACTIVITY_TYPE_SET_PAYMENT_METHOD_V2",
  "ACTIVITY_TYPE_CREATE_SUB_ORGANIZATION_V3",
  "ACTIVITY_TYPE_CREATE_WALLET",
  "ACTIVITY_TYPE_CREATE_WALLET_ACCOUNTS",
  "ACTIVITY_TYPE_INIT_USER_EMAIL_RECOVERY",
  "ACTIVITY_TYPE_RECOVER_USER",
  "ACTIVITY_TYPE_SET_ORGANIZATION_FEATURE",
  "ACTIVITY_TYPE_REMOVE_ORGANIZATION_FEATURE",
  "ACTIVITY_TYPE_SIGN_RAW_PAYLOAD_V2",
  "ACTIVITY_TYPE_SIGN_TRANSACTION_V2",
  "ACTIVITY_TYPE_EXPORT_PRIVATE_KEY",
  "ACTIVITY_TYPE_EXPORT_WALLET",
  "ACTIVITY_TYPE_CREATE_SUB_ORGANIZATION_V4",
  "ACTIVITY_TYPE_EMAIL_AUTH",
  "ACTIVITY_TYPE_EXPORT_WALLET_ACCOUNT",
  "ACTIVITY_TYPE_INIT_IMPORT_WALLET",
  "ACTIVITY_TYPE_IMPORT_WALLET",
  "ACTIVITY_TYPE_INIT_IMPORT_PRIVATE_KEY",
  "ACTIVITY_TYPE_IMPORT_PRIVATE_KEY",
  "ACTIVITY_TYPE_CREATE_POLICIES",
  "ACTIVITY_TYPE_SIGN_RAW_PAYLOADS",
  "ACTIVITY_TYPE_CREATE_READ_ONLY_SESSION",
  "ACTIVITY_TYPE_CREATE_OAUTH_PROVIDERS",
  "ACTIVITY_TYPE_DELETE_OAUTH_PROVIDERS",
  "ACTIVITY_TYPE_CREATE_SUB_ORGANIZATION_V5",
  "ACTIVITY_TYPE_OAUTH",
  "ACTIVITY_TYPE_CREATE_API_KEYS_V2",
  "ACTIVITY_TYPE_CREATE_READ_WRITE_SESSION",
  "ACTIVITY_TYPE_EMAIL_AUTH_V2",
  "ACTIVITY_TYPE_CREATE_SUB_ORGANIZATION_V6",
  "ACTIVITY_TYPE_DELETE_PRIVATE_KEYS",
  "ACTIVITY_TYPE_DELETE_WALLETS",
  "ACTIVITY_TYPE_CREATE_READ_WRITE_SESSION_V2",
  "ACTIVITY_TYPE_DELETE_SUB_ORGANIZATION",
  "ACTIVITY_TYPE_INIT_OTP_AUTH",
  "ACTIVITY_TYPE_OTP_AUTH",
  "ACTIVITY_TYPE_CREATE_SUB_ORGANIZATION_V7",
  "ACTIVITY_TYPE_UPDATE_WALLET",
  "ACTIVITY_TYPE_UPDATE_POLICY_V2",
  "ACTIVITY_TYPE_CREATE_USERS_V3",
  "ACTIVITY_TYPE_INIT_OTP_AUTH_V2",
  "ACTIVITY_TYPE_INIT_OTP",
  "ACTIVITY_TYPE_VERIFY_OTP",
  "ACTIVITY_TYPE_OTP_LOGIN",
  "ACTIVITY_TYPE_STAMP_LOGIN",
  "ACTIVITY_TYPE_OAUTH_LOGIN",
  "ACTIVITY_TYPE_UPDATE_USER_NAME",
  "ACTIVITY_TYPE_UPDATE_USER_EMAIL",
  "ACTIVITY_TYPE_UPDATE_USER_PHONE_NUMBER",
  "ACTIVITY_TYPE_INIT_FIAT_ON_RAMP",
  "ACTIVITY_TYPE_CREATE_SMART_CONTRACT_INTERFACE",
  "ACTIVITY_TYPE_DELETE_SMART_CONTRACT_INTERFACE",
  "ACTIVITY_TYPE_ENABLE_AUTH_PROXY",
  "ACTIVITY_TYPE_DISABLE_AUTH_PROXY",
  "ACTIVITY_TYPE_UPDATE_AUTH_PROXY_CONFIG",
  "ACTIVITY_TYPE_CREATE_OAUTH2_CREDENTIAL",
  "ACTIVITY_TYPE_UPDATE_OAUTH2_CREDENTIAL",
  "ACTIVITY_TYPE_DELETE_OAUTH2_CREDENTIAL",
  "ACTIVITY_TYPE_OAUTH2_AUTHENTICATE",
  "ACTIVITY_TYPE_DELETE_WALLET_ACCOUNTS",
  "ACTIVITY_TYPE_DELETE_POLICIES",
  "ACTIVITY_TYPE_ETH_SEND_RAW_TRANSACTION",
  "ACTIVITY_TYPE_ETH_SEND_TRANSACTION",
  "ACTIVITY_TYPE_CREATE_FIAT_ON_RAMP_CREDENTIAL",
  "ACTIVITY_TYPE_UPDATE_FIAT_ON_RAMP_CREDENTIAL",
  "ACTIVITY_TYPE_DELETE_FIAT_ON_RAMP_CREDENTIAL",
  "ACTIVITY_TYPE_EMAIL_AUTH_V3",
  "ACTIVITY_TYPE_INIT_USER_EMAIL_RECOVERY_V2",
  "ACTIVITY_TYPE_INIT_OTP_AUTH_V3",
  "ACTIVITY_TYPE_INIT_OTP_V2",
  "ACTIVITY_TYPE_UPSERT_GAS_USAGE_CONFIG",
  "ACTIVITY_TYPE_CREATE_TVC_APP",
  "ACTIVITY_TYPE_CREATE_TVC_DEPLOYMENT",
  "ACTIVITY_TYPE_CREATE_TVC_MANIFEST_APPROVALS",
  "ACTIVITY_TYPE_SOL_SEND_TRANSACTION",
];

const resourceValues = [
  "USER",
  "PRIVATE_KEY",
  "POLICY",
  "WALLET",
  "ORGANIZATION",
  "INVITATION",
  "CREDENTIAL",
  "CONFIG",
  "RECOVERY",
  "AUTH",
  "OTP",
  "PAYMENT_METHOD",
  "SUBSCRIPTION",
];

const actionValues = ["CREATE", "UPDATE", "DELETE", "SIGN", "EXPORT", "IMPORT"];

export function ActivityConditions({
  conditions,
  onChange,
}: ActivityConditionsProps) {
  const addCondition = () => {
    onChange([...conditions, { field: "type", operator: "==", value: "" }]);
  };

  const updateCondition = (
    index: number,
    field: keyof ActivityCondition,
    value: string
  ) => {
    const updated = [...conditions];
    updated[index] = { ...updated[index], [field]: value };
    // Reset value when field changes
    if (field === "field") {
      updated[index].value = "";
    }
    onChange(updated);
  };

  const removeCondition = (index: number) => {
    onChange(conditions.filter((_, i) => i !== index));
  };

  const getValueInput = (condition: ActivityCondition, index: number) => {
    if (condition.field === "resource") {
      return (
        <Select
          options={[
            { value: "", label: "Select resource..." },
            ...resourceValues.map((v) => ({ value: v, label: v })),
          ]}
          value={condition.value}
          onChange={(e) => updateCondition(index, "value", e.target.value)}
        />
      );
    }

    if (condition.field === "action") {
      return (
        <Select
          options={[
            { value: "", label: "Select action..." },
            ...actionValues.map((v) => ({ value: v, label: v })),
          ]}
          value={condition.value}
          onChange={(e) => updateCondition(index, "value", e.target.value)}
        />
      );
    }

    // type field — dropdown of all activity types
    return (
      <Select
        options={[
          { value: "", label: "Select activity type..." },
          ...activityTypeExamples.map((v) => ({ value: v, label: v })),
        ]}
        value={condition.value}
        onChange={(e) => updateCondition(index, "value", e.target.value)}
      />
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <Label className="text-base font-semibold">Activity Conditions</Label>
          <a
            href="https://docs.turnkey.com/api-reference/queries/list-activities"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            Activity Types <ExternalLink className="h-3 w-3" />
          </a>
        </div>
        <Button type="button" variant="outline" size="sm" onClick={addCondition}>
          <Plus className="h-4 w-4 mr-1" />
          Add Condition
        </Button>
      </div>

      <p className="text-sm text-muted-foreground">
        Control permissions based on the type, resource, or action of an
        activity.{" "}
        <a
          href="https://docs.turnkey.com/api-reference/queries/list-activities"
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
              {getValueInput(condition, index)}
            </div>
          </div>

        </div>
      ))}
    </div>
  );
}
