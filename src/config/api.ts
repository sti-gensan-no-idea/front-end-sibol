// src/config/api.ts
// -----------------------------------------------------------------------------
// Centralized API configuration for both development and production builds.
// - Uses Vite env var VITE_API_BASE_URL when provided.
// - Otherwise, selects a sensible default based on the current page protocol.
// - Also exports endpoints, request defaults, and file limits.
// -----------------------------------------------------------------------------

/** Default API base URLs */
const DEFAULT_PROD = "https://api.atuna.org";  // Nginx + TLS (recommended for production)
const DEFAULT_DEV  = "https://atuna.org";  // Public FastAPI port for local dev/testing

/** Raw env var from Vite (compile-time replacement) */
const RAW_ENV = (import.meta.env?.VITE_API_BASE_URL ?? "").trim();

/** Remove any trailing slashes from a URL string */
function stripTrailingSlash(s: string): string {
  return s.replace(/\/+$/, "");
}

/**
 * Final base URL resolution:
 * - If VITE_API_BASE_URL is set, use it.
 * - Else if the current page is served over HTTPS, prefer the TLS API host.
 * - Else (HTTP dev), prefer the raw FastAPI port.
 */
export const API_BASE_URL = stripTrailingSlash(
  RAW_ENV ||
    (typeof window !== "undefined" && window.location.protocol === "https:"
      ? DEFAULT_PROD
      : DEFAULT_DEV),
);

/** Convenience helper to join base + path safely */
export const apiUrl = (path = ""): string => {
  const cleanPath = path.replace(/^\/+/, ""); // remove any leading slash
  return `${API_BASE_URL}/${cleanPath}`;
};

// -----------------------------------------------------------------------------
// API Endpoints (kept as RELATIVE paths; combine with API_BASE_URL at runtime).
// -----------------------------------------------------------------------------
export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    CLIENT_SIGNIN: "/auth/signin",
    DEVELOPER_SIGNIN: "/auth/developer/signin",
    BROKER_SIGNIN: "/auth/broker/signin",
    AGENT_SIGNIN: "/auth/agent/signin",
    ADMIN_SIGNIN: "/auth/admin/signin",
  },

  // Registration
  REGISTER: {
    CLIENT: "/register/client",
    DEVELOPER: "/register/developer",
    BROKER: "/register/broker",
    AGENT: "/register/agent",
  },

  // Properties
  PROPERTIES: {
    BASE: "/properties",
    UPLOAD_CSV: "/properties/upload-csv",
    ASSIGN: (id: string) => `/properties/${id}/assign`,
  },

  // Teams
  TEAMS: {
    BASE: "/teams",
    MEMBERS: (id: string) => `/teams/${id}/members`,
    REMOVE_MEMBER: (teamId: string, userId: string) =>
      `/teams/${teamId}/members/${userId}`,
  },

  // Events
  EVENTS: {
    BASE: "/events",
  },

  // Site Viewings
  SITE_VIEWINGS: {
    BASE: "/site-viewings",
    GUEST: "/site-viewings/guest",
  },

  // Analytics
  ANALYTICS: {
    DASHBOARD: "/analytics/dashboard",
    SALES: "/analytics/sales",
    LEADS: "/analytics/leads",
    INVENTORY: "/analytics/inventory",
    REVENUE: "/analytics/revenue",
  },

  // Notifications
  NOTIFICATIONS: {
    BASE: "/notifications",
    READ: (id: string) => `/notifications/${id}/read`,
  },

  // Bookmarks
  BOOKMARKS: {
    BASE: "/bookmarks",
  },

  // CRM
  CRM: {
    LEADS: "/crm/leads",
    UPDATE_STATUS: (id: string) => `/crm/leads/${id}/status`,
  },

  // Maintenance
  MAINTENANCE: {
    BASE: "/maintenance",
  },

  // Payments
  PAYMENTS: {
    BASE: "/payments",
    UPDATE_STATUS: (id: string) => `/payments/${id}/status`,
  },

  // Users
  USERS: {
    BASE: "/users",
    ME: "/users/me",
  },

  // Account Management (Admin)
  ACCOUNTS: {
    PENDING: "/accounts/pending",
    APPROVE: (id: string) => `/accounts/approve/${id}`,
    REJECT: (id: string) => `/accounts/reject/${id}`,
    BAN: (id: string) => `/accounts/ban/${id}`,
  },
};

// -----------------------------------------------------------------------------
// Request defaults, storage keys, and file limits
// -----------------------------------------------------------------------------
export const REQUEST_TIMEOUT = 10000;

export const STORAGE_KEYS = {
  ACCESS_TOKEN: "access_token",
  USER_ID: "user_id",
  USER_ROLE: "user_role",
  REFRESH_TOKEN: "refresh_token",
};

export const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

export const FILE_LIMITS = {
  MAX_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_TYPES: {
    CSV: ["text/csv"],
    EXCEL: [
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ],
    IMAGES: ["image/jpeg", "image/png", "image/jpg", "image/webp"],
  },
};

export default API_BASE_URL;
