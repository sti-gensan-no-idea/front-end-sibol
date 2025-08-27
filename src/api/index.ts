// Complete API Module Exports
export { default as api } from './core/apiService';
export { STORAGE_KEYS, ApiError } from './core/apiService';

// Export all API endpoints
export { authAPI } from './endpoints/auth';
export { propertiesAPI } from './endpoints/properties';
export { teamsAPI } from './endpoints/teams';
export { eventsAPI } from './endpoints/events';
export { notificationsAPI } from './endpoints/notifications';
export { analyticsAPI } from './endpoints/analytics';
export { crmAPI } from './endpoints/crm';
export { siteViewingsAPI } from './endpoints/siteViewings';
export { maintenanceAPI } from './endpoints/maintenance';
export { paymentsAPI } from './endpoints/payments';
export { bookmarksAPI } from './endpoints/bookmarks';
export { accountsAPI } from './endpoints/accounts';
export { usersAPI } from './endpoints/users';

// Export all types
export * from './types';

// Consolidated API object for easy access
import { authAPI } from './endpoints/auth';
import { propertiesAPI } from './endpoints/properties';
import { teamsAPI } from './endpoints/teams';
import { eventsAPI } from './endpoints/events';
import { notificationsAPI } from './endpoints/notifications';
import { analyticsAPI } from './endpoints/analytics';
import { crmAPI } from './endpoints/crm';
import { siteViewingsAPI } from './endpoints/siteViewings';
import { maintenanceAPI } from './endpoints/maintenance';
import { paymentsAPI } from './endpoints/payments';
import { bookmarksAPI } from './endpoints/bookmarks';
import { accountsAPI } from './endpoints/accounts';
import { usersAPI } from './endpoints/users';

export const API = {
  auth: authAPI,
  properties: propertiesAPI,
  teams: teamsAPI,
  events: eventsAPI,
  notifications: notificationsAPI,
  analytics: analyticsAPI,
  crm: crmAPI,
  siteViewings: siteViewingsAPI,
  maintenance: maintenanceAPI,
  payments: paymentsAPI,
  bookmarks: bookmarksAPI,
  accounts: accountsAPI,
  users: usersAPI,
};

export default API;
