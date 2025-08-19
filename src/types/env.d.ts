/// <reference types="vite/client" />

/**
 * Environment Variables Type Definitions
 * This file provides TypeScript support for Vite environment variables
 */

interface ImportMetaEnv {
  // API Configuration
  readonly VITE_API_BASE_URL: string;
  readonly VITE_API_TIMEOUT: string;
  readonly VITE_API_VERSION: string;

  // Application Information
  readonly VITE_APP_NAME: string;
  readonly VITE_APP_VERSION: string;
  readonly VITE_APP_DESCRIPTION: string;

  // Environment Configuration
  readonly VITE_NODE_ENV: 'development' | 'staging' | 'production';
  readonly VITE_DEBUG_MODE: string;
  readonly VITE_ENABLE_LOGGING: string;

  // Authentication Configuration
  readonly VITE_TOKEN_STORAGE_KEY: string;
  readonly VITE_SESSION_TIMEOUT: string;
  readonly VITE_ENABLE_REMEMBER_ME: string;

  // UI/UX Configuration
  readonly VITE_DEFAULT_THEME: 'light' | 'dark' | 'system';
  readonly VITE_ENABLE_THEME_SWITCH: string;
  readonly VITE_DEFAULT_LOCALE: string;
  readonly VITE_ENABLE_ANIMATIONS: string;

  // Feature Flags
  readonly VITE_ENABLE_CHATBOT: string;
  readonly VITE_ENABLE_NOTIFICATIONS: string;
  readonly VITE_ENABLE_ANALYTICS: string;
  readonly VITE_ENABLE_SITE_VIEWING: string;
  readonly VITE_ENABLE_CRM: string;
  readonly VITE_ENABLE_MAINTENANCE_TRACKER: string;
  readonly VITE_ENABLE_PAYMENT_DASHBOARD: string;

  // File Upload Configuration
  readonly VITE_MAX_FILE_SIZE: string;
  readonly VITE_ALLOWED_FILE_TYPES: string;

  // Map & Location Services
  readonly VITE_MAP_API_KEY?: string;
  readonly VITE_DEFAULT_MAP_LAT: string;
  readonly VITE_DEFAULT_MAP_LNG: string;
  readonly VITE_DEFAULT_MAP_ZOOM: string;

  // Analytics & Tracking
  readonly VITE_GA_TRACKING_ID?: string;
  readonly VITE_ENABLE_ERROR_TRACKING: string;

  // Performance Configuration
  readonly VITE_ENABLE_SERVICE_WORKER: string;
  readonly VITE_ENABLE_LAZY_LOADING: string;
  readonly VITE_IMAGE_QUALITY: string;

  // Security Configuration
  readonly VITE_CORS_ORIGINS: string;
  readonly VITE_ENABLE_CSRF_PROTECTION: string;
  readonly VITE_CSP_LEVEL: 'strict' | 'moderate' | 'permissive';

  // Development Tools
  readonly VITE_ENABLE_REACT_DEVTOOLS: string;
  readonly VITE_ENABLE_REDUX_DEVTOOLS: string;
  readonly VITE_ENABLE_HMR: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
