export type Role = "developer" | "broker" | "agent" | "client";

export interface CredentialItem {
  key: "prc_license" | "government_id" | "dhsud_cpd" | "lts";
  label: string;
  optional?: boolean; // default false = required
  accept: string[]; // ["application/pdf","image/png","image/jpeg"]
  maxMB: number; // 5
  helper: string; // small helper copy under dropzone
}

export interface RoleConfig {
  displayName: string;                 // e.g., "Developer"
  statusBadgeText: string;            // e.g., "Verified Agent Badge"
  credentials: CredentialItem[];      // drives Step 3 dropzones
  personalFields?: {                  // optional additional fields by role
    prcNumber?: boolean;              // for agent/broker if needed
    companyName?: boolean;            // for developer
  };
}

export const ROLE_CONFIG: Record<Role, RoleConfig> = {
  developer: {
    displayName: "Developer",
    statusBadgeText: "Verified Developer Badge",
    credentials: [
      { 
        key: "dhsud_cpd", 
        label: "DHSUD/CPD Certificate", 
        optional: true, 
        accept: ["application/pdf","image/png","image/jpeg"], 
        maxMB: 5, 
        helper: "PDF, JPG, or PNG (Max 5MB)" 
      },
      { 
        key: "lts", 
        label: "License to Sell (LTS)", 
        optional: true, 
        accept: ["application/pdf","image/png","image/jpeg"], 
        maxMB: 5, 
        helper: "Upload LTS or proof" 
      }
    ],
    personalFields: { companyName: true }
  },
  broker: {
    displayName: "Broker",
    statusBadgeText: "Verified Broker Badge",
    credentials: [
      { 
        key: "prc_license", 
        label: "PRC License", 
        accept: ["application/pdf","image/png","image/jpeg"], 
        maxMB: 5, 
        helper: "PDF, JPG, or PNG (Max 5MB)" 
      },
      { 
        key: "government_id", 
        label: "Government ID (Optional)", 
        optional: true, 
        accept: ["application/pdf","image/png","image/jpeg"], 
        maxMB: 5, 
        helper: "Any valid ID" 
      }
    ],
    personalFields: { prcNumber: true }
  },
  agent: {
    displayName: "Agent",
    statusBadgeText: "Verified Agent Badge",
    credentials: [
      { 
        key: "prc_license", 
        label: "PRC License (Optional)", 
        optional: true, 
        accept: ["application/pdf","image/png","image/jpeg"], 
        maxMB: 5, 
        helper: "PDF, JPG, or PNG (Max 5MB)" 
      },
      { 
        key: "government_id", 
        label: "Government ID (Optional)", 
        optional: true, 
        accept: ["application/pdf","image/png","image/jpeg"], 
        maxMB: 5, 
        helper: "Any valid ID" 
      }
    ],
    personalFields: { prcNumber: true }
  },
  client: {
    displayName: "Client",
    statusBadgeText: "Verified Client",
    credentials: [
      { 
        key: "government_id", 
        label: "Government ID (Optional)", 
        optional: true, 
        accept: ["application/pdf","image/png","image/jpeg"], 
        maxMB: 5, 
        helper: "Optional for faster verification" 
      }
    ]
  }
};

export const isValidRole = (role: string): role is Role => {
  return Object.keys(ROLE_CONFIG).includes(role);
};
