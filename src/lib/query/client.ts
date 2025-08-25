import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes default
      gcTime: 10 * 60 * 1000, // 10 minutes
    },
    mutations: {
      retry: 0,
    },
  },
});

// Feature-specific stale times
export const staleTimeConfig = {
  // Static/slow-changing data
  users: 10 * 60 * 1000, // 10 minutes
  properties: 2 * 60 * 1000, // 2 minutes
  
  // Medium frequency data
  analytics: 5 * 60 * 1000, // 5 minutes
  teams: 5 * 60 * 1000, // 5 minutes
  
  // High frequency data
  leads: 1 * 60 * 1000, // 1 minute
  notifications: 30 * 1000, // 30 seconds
  
  // Real-time data
  auth: 0, // Always fresh
};
