// Enhanced API Client with Interceptors and Error Handling
import axios, { AxiosInstance, AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { API_BASE_URL, STORAGE_KEYS, REQUEST_TIMEOUT } from '../../config/api';
import { store } from '../../store';
import { setSessionExpired, clearAuth } from '../../store/slices/authSlice';

interface ApiError {
  message: string;
  statusCode?: number;
  detail?: string;
  errors?: Record<string, any>;
}

class ApiClient {
  private axiosInstance: AxiosInstance;
  private refreshTokenPromise: Promise<any> | null = null;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: API_BASE_URL,
      timeout: REQUEST_TIMEOUT,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor
    this.axiosInstance.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

        // Handle 401 Unauthorized
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          // Check if token refresh is already in progress
          if (!this.refreshTokenPromise) {
            this.refreshTokenPromise = this.refreshAccessToken();
          }

          try {
            await this.refreshTokenPromise;
            this.refreshTokenPromise = null;
            
            // Retry original request with new token
            const token = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
            if (token && originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            return this.axiosInstance(originalRequest);
          } catch (refreshError) {
            // Refresh failed, logout user
            store.dispatch(setSessionExpired(true));
            store.dispatch(clearAuth());
            window.location.href = '/signin';
            return Promise.reject(refreshError);
          }
        }

        // Handle other errors
        const apiError: ApiError = {
          message: this.getErrorMessage(error),
          statusCode: error.response?.status,
          detail: (error.response?.data as any)?.detail,
          errors: (error.response?.data as any)?.errors,
        };

        return Promise.reject(apiError);
      }
    );
  }

  private async refreshAccessToken() {
    const refreshToken = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    try {
      const response = await axios.post(
        `${API_BASE_URL}/auth/refresh`,
        { refresh_token: refreshToken },
        { timeout: REQUEST_TIMEOUT }
      );

      const { access_token } = response.data;
      localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, access_token);
      
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  private getErrorMessage(error: AxiosError): string {
    if (error.response?.data) {
      const data = error.response.data as any;
      return data.detail || data.message || 'An error occurred';
    }
    if (error.request) {
      return 'Network error. Please check your connection.';
    }
    return error.message || 'An unexpected error occurred';
  }

  // Public methods
  setToken(token: string) {
    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, token);
  }

  clearToken() {
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
  }

  // HTTP methods
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.get<T>(url, config);
    return response.data;
  }

  async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.post<T>(url, data, config);
    return response.data;
  }

  async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.put<T>(url, data, config);
    return response.data;
  }

  async patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.patch<T>(url, data, config);
    return response.data;
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.delete<T>(url, config);
    return response.data;
  }

  // File upload
  async uploadFile<T>(
    url: string,
    file: File,
    additionalData?: Record<string, any>,
    onProgress?: (progress: number) => void
  ): Promise<T> {
    const formData = new FormData();
    formData.append('file', file);

    if (additionalData) {
      Object.keys(additionalData).forEach((key) => {
        formData.append(key, additionalData[key]);
      });
    }

    const config: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (progressEvent.total && onProgress) {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          onProgress(progress);
        }
      },
    };

    const response = await this.axiosInstance.post<T>(url, formData, config);
    return response.data;
  }

  // Bulk operations
  async bulkOperation<T>(
    operations: Array<{
      method: 'get' | 'post' | 'put' | 'delete';
      url: string;
      data?: any;
    }>
  ): Promise<T[]> {
    const promises = operations.map((op) => {
      switch (op.method) {
        case 'get':
          return this.get<T>(op.url);
        case 'post':
          return this.post<T>(op.url, op.data);
        case 'put':
          return this.put<T>(op.url, op.data);
        case 'delete':
          return this.delete<T>(op.url);
        default:
          throw new Error(`Unsupported method: ${op.method}`);
      }
    });

    return Promise.all(promises);
  }

  // Paginated requests
  async getPaginated<T>(
    url: string,
    params?: {
      limit?: number;
      offset?: number;
      [key: string]: any;
    }
  ): Promise<{
    items: T[];
    total: number;
    limit: number;
    offset: number;
    hasNext: boolean;
    hasPrev: boolean;
  }> {
    const response = await this.get<any>(url, { params });
    return {
      items: response.items || [],
      total: response.total || 0,
      limit: response.limit || params?.limit || 10,
      offset: response.offset || params?.offset || 0,
      hasNext: response.has_next || false,
      hasPrev: response.has_prev || false,
    };
  }
}

export const apiClient = new ApiClient();
export default apiClient;
