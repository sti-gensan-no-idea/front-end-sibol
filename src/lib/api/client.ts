import createClient from "openapi-fetch";
import type { paths } from "@/generated/atuna";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

let token: string | null = null;
export const setToken = (t: string | null) => { token = t; };
export const getToken = () => token;
export const clearToken = () => { token = null; };

export const api = createClient<paths>({ 
  baseUrl,
});

// Add request interceptor for auth token
api.use({
  onRequest: ({ request }) => {
    if (token) {
      request.headers.set("Authorization", `Bearer ${token}`);
    }
    return request;
  },
  onResponse: ({ response }) => {
    if (response.status === 401) {
      clearToken();
      // Dispatch logout action if needed
      window.dispatchEvent(new CustomEvent("auth-expired"));
    }
    return response;
  }
});
