// Core API Configuration with Dynamic OpenAPI Integration
import axios, { AxiosInstance, AxiosError, AxiosRequestConfig } from 'axios';

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.atuna.org';
const API_TIMEOUT = parseInt(import.meta.env.VITE_API_TIMEOUT || '30000');

// Storage Keys
export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
  USER_ID: 'user_id',
  USER_ROLE: 'user_role',
} as const;

// API Error Class
export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public details?: any,
    public validationErrors?: Record<string, string[]>
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// Main API Class
class APIService {
  private static instance: APIService;
  private axiosInstance: AxiosInstance;
  private openApiSpec: any = null;
  private isInitialized = false;

  private constructor() {
    this.axiosInstance = axios.create({
      baseURL: API_BASE_URL,
      timeout: API_TIMEOUT,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  public static getInstance(): APIService {
    if (!APIService.instance) {
      APIService.instance = new APIService();
    }
    return APIService.instance;
  }

  private setupInterceptors() {
    // Request interceptor
    this.axiosInstance.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        
        // Log request in development
        if (import.meta.env.DEV) {
          console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`, config.data);
        }
        
        return config;
      },
      (error) => {
        console.error('Request error:', error);
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.axiosInstance.interceptors.response.use(
      (response) => {
        // Log response in development
        if (import.meta.env.DEV) {
          console.log(`API Response: ${response.config.url}`, response.data);
        }
        return response;
      },
      async (error: AxiosError) => {
        const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };
        
        // Handle 401 Unauthorized
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          
          // Clear auth data and redirect to login
          this.clearAuth();
          window.location.href = '/signin';
          return Promise.reject(new ApiError('Session expired. Please login again.', 401));
        }

        // Handle validation errors (422)
        if (error.response?.status === 422) {
          const validationErrors = (error.response.data as any)?.detail;
          return Promise.reject(new ApiError(
            'Validation failed',
            422,
            error.response.data,
            validationErrors
          ));
        }

        // Handle other errors
        const message = this.extractErrorMessage(error);
        const statusCode = error.response?.status;
        
        return Promise.reject(new ApiError(message, statusCode, error.response?.data));
      }
    );
  }

  private extractErrorMessage(error: AxiosError): string {
    if (error.response?.data) {
      const data = error.response.data as any;
      return data.detail || data.message || data.error || 'An error occurred';
    }
    if (error.request) {
      return 'Network error. Please check your connection.';
    }
    return error.message || 'An unexpected error occurred';
  }

  private clearAuth() {
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER_ID);
    localStorage.removeItem(STORAGE_KEYS.USER_ROLE);
  }

  // Initialize OpenAPI spec
  public async initialize(): Promise<void> {
    if (this.isInitialized) return;

    try {
      const response = await axios.get(`${API_BASE_URL}/openapi.json`);
      this.openApiSpec = response.data;
      this.isInitialized = true;
      console.log('API initialized with OpenAPI spec');
    } catch (error) {
      console.error('Failed to fetch OpenAPI spec:', error);
      // Continue without OpenAPI spec - use manual methods
      this.isInitialized = true;
    }
  }

  // Get axios instance for direct use
  public getAxiosInstance(): AxiosInstance {
    return this.axiosInstance;
  }

  // Generic request methods
  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.get<T>(url, config);
    return response.data;
  }

  public async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.post<T>(url, data, config);
    return response.data;
  }

  public async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.put<T>(url, data, config);
    return response.data;
  }

  public async patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.patch<T>(url, data, config);
    return response.data;
  }

  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.delete<T>(url, config);
    return response.data;
  }

  // File upload
  public async uploadFile<T>(
    url: string,
    file: File,
    additionalData?: Record<string, any>,
    onProgress?: (progress: number) => void
  ): Promise<T> {
    const formData = new FormData();
    formData.append('file', file);

    if (additionalData) {
      Object.entries(additionalData).forEach(([key, value]) => {
        formData.append(key, value);
      });
    }

    const response = await this.axiosInstance.post<T>(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (progressEvent.total && onProgress) {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          onProgress(progress);
        }
      },
    });

    return response.data;
  }

  // Set authentication token
  public setAuthToken(token: string) {
    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, token);
  }

  // Get OpenAPI spec
  public getOpenApiSpec(): any {
    return this.openApiSpec;
  }
}

// Export singleton instance
export const api = APIService.getInstance();

// Initialize API on import
api.initialize().catch(console.error);

export default api;
