/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string
  readonly VITE_API_TIMEOUT: string
  readonly VITE_API_VERSION: string
  readonly VITE_APP_NAME: string
  readonly VITE_APP_VERSION: string
  readonly VITE_APP_DESCRIPTION: string
  readonly VITE_NODE_ENV: string
  readonly VITE_DEBUG_MODE: string
  readonly VITE_ENABLE_LOGGING: string
  readonly VITE_TOKEN_STORAGE_KEY: string
  readonly VITE_SESSION_TIMEOUT: string
  readonly VITE_ENABLE_REMEMBER_ME: string
  readonly VITE_DEFAULT_THEME: string
  readonly VITE_ENABLE_THEME_SWITCH: string
  readonly VITE_DEFAULT_LOCALE: string
  readonly VITE_ENABLE_ANIMATIONS: string
  readonly VITE_ENABLE_CHATBOT: string
  readonly VITE_ENABLE_NOTIFICATIONS: string
  readonly VITE_ENABLE_ANALYTICS: string
  readonly VITE_ENABLE_SITE_VIEWING: string
  readonly VITE_ENABLE_CRM: string
  readonly VITE_ENABLE_MAINTENANCE_TRACKER: string
  readonly VITE_ENABLE_PAYMENT_DASHBOARD: string
  readonly VITE_MAX_FILE_SIZE: string
  readonly VITE_ALLOWED_FILE_TYPES: string
  readonly VITE_DEFAULT_MAP_LAT: string
  readonly VITE_DEFAULT_MAP_LNG: string
  readonly VITE_DEFAULT_MAP_ZOOM: string
  readonly VITE_ENABLE_ERROR_TRACKING: string
  readonly VITE_ENABLE_SERVICE_WORKER: string
  readonly VITE_ENABLE_LAZY_LOADING: string
  readonly VITE_IMAGE_QUALITY: string
  readonly VITE_CORS_ORIGINS: string
  readonly VITE_ENABLE_CSRF_PROTECTION: string
  readonly VITE_CSP_LEVEL: string
  readonly VITE_ENABLE_REACT_DEVTOOLS: string
  readonly VITE_ENABLE_REDUX_DEVTOOLS: string
  readonly VITE_ENABLE_HMR: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
