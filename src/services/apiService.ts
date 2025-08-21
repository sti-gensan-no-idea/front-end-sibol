// src/services/apiService.ts
// -----------------------------------------------------------------------------
// Base API service with token handling and JSON/file helpers.
// Uses API_BASE_URL from src/config/api.ts (no hard-coded localhost).
// -----------------------------------------------------------------------------

import { API_BASE_URL } from "../config/api";

export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public response?: any,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

class ApiService {
  private baseURL: string;
  private token: string | null = null;

  constructor(baseURL: string = API_BASE_URL) {
    // normalize base URL: strip trailing slash if present
    this.baseURL = baseURL.replace(/\/+$/, "");
    this.token = localStorage.getItem("access_token");
  }

  setToken(token: string) {
    this.token = token;
    localStorage.setItem("access_token", token);
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem("access_token");
  }

  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    return headers;
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      // Try to parse JSON error; if not JSON, fall back to empty object
      const errorData = await response.json().catch(() => ({}));

      throw new ApiError(
        (errorData as any)?.detail ||
          (errorData as any)?.message ||
          "An error occurred",
        response.status,
        errorData,
      );
    }

    const contentType = response.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      return response.json() as Promise<T>;
    }

    // Non-JSON: return text as T (caller must handle)
    return (response.text() as unknown) as T;
  }

  /** Join base + endpoint safely */
  private url(endpoint: string): string {
    const path = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
    return `${this.baseURL}${path}`;
  }

  async get<T>(endpoint: string): Promise<T> {
    const response = await fetch(this.url(endpoint), {
      method: "GET",
      headers: this.getHeaders(),
    });
    return this.handleResponse<T>(response);
  }

  async post<T>(endpoint: string, data?: any): Promise<T> {
    const response = await fetch(this.url(endpoint), {
      method: "POST",
      headers: this.getHeaders(),
      body: data !== undefined ? JSON.stringify(data) : undefined,
    });
    return this.handleResponse<T>(response);
  }

  async put<T>(endpoint: string, data?: any): Promise<T> {
    const response = await fetch(this.url(endpoint), {
      method: "PUT",
      headers: this.getHeaders(),
      body: data !== undefined ? JSON.stringify(data) : undefined,
    });
    return this.handleResponse<T>(response);
  }

  async delete<T>(endpoint: string): Promise<T> {
    const response = await fetch(this.url(endpoint), {
      method: "DELETE",
      headers: this.getHeaders(),
    });
    return this.handleResponse<T>(response);
  }

  async uploadFile<T>(
    endpoint: string,
    file: File,
    additionalData?: Record<string, any>,
  ): Promise<T> {
    const formData = new FormData();
    formData.append("file", file);

    if (additionalData) {
      Object.keys(additionalData).forEach((key) => {
        formData.append(key, additionalData[key]);
      });
    }

    const headers: HeadersInit = {};
    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    const response = await fetch(this.url(endpoint), {
      method: "POST",
      headers,
      body: formData,
    });

    return this.handleResponse<T>(response);
  }
}

export const apiService = new ApiService();
export default apiService;
