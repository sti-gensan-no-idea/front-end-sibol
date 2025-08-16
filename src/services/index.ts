<<<<<<< HEAD
// Export core services - gradually adding back
export { authService, AuthService } from './authService';
export { apiService, ApiError } from './apiService';
export { dataService, DataService } from './dataService';
export { default as propertyService, PropertyService } from './propertyService';

// Re-export all types
export type * from '../types/api';
=======
// Export all services and types for easy importing
export { authService, AuthService } from './authService';
export { dataService, DataService } from './dataService';
export { apiService, ApiError } from './apiService';

// Re-export all types
export type * from '../types/api';
>>>>>>> main
