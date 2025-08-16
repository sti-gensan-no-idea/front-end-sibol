// Export core services - gradually adding back
export { authService, AuthService } from "./authService";
export { apiService, ApiError } from "./apiService";
export { dataService, DataService } from "./dataService";
export { default as propertyService, PropertyService } from "./propertyService";
export { analyticsService, AnalyticsService } from "./analyticsService";

// Export all analytics types
export type {
  DashboardAnalytics,
  SalesAnalytics,
  LeadsAnalytics,
  InventoryAnalytics,
  RevenueAnalytics,
  AgentStatistics,
  BrokerStatistics,
  TeamAnalytics,
} from "./analyticsService";

// Re-export all types
export type * from "../types/api";
