// Central export for all feature hooks
export { useAuth, authKeys } from "../lib/auth/useAuth";
export { ProtectedRoute } from "../lib/auth/ProtectedRoute";
export { usePermissions } from "../lib/auth/usePermissions";

// Properties
export * from "../features/properties/hooks";

// Users  
export * from "../features/users/hooks";

// Bookmarks
export * from "../features/bookmarks/hooks";

// Leads
export * from "../features/leads/hooks";

// Analytics
export * from "../features/analytics/hooks";

// API utilities
export { api, setToken, getToken, clearToken } from "../lib/api/client";
export { uploadFile, uploadPropertiesCSV, validateFile } from "../lib/api/upload";

// Chatbase
export { useChatbase, ChatbaseBootstrap } from "../lib/chatbase/bootstrap";
