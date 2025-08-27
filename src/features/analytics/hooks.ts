import { api } from "@/lib/api/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { paths } from "@/generated/atuna";

type AnalyticsDashboard = paths["/analytics/dashboard"]["get"]["responses"]["200"]["content"]["application/json"];
type SalesAnalytics = paths["/analytics/sales"]["get"]["responses"]["200"]["content"]["application/json"];
type LeadsAnalytics = paths["/analytics/leads"]["get"]["responses"]["200"]["content"]["application/json"];
type InventoryAnalytics = paths["/analytics/inventory"]["get"]["responses"]["200"]["content"]["application/json"];

// Query keys
export const analyticsKeys = {
  all: ["analytics"] as const,
  dashboard: () => [...analyticsKeys.all, "dashboard"] as const,
  sales: (filters?: any) => [...analyticsKeys.all, "sales", filters] as const,
  leads: (filters?: any) => [...analyticsKeys.all, "leads", filters] as const,
  inventory: (filters?: any) => [...analyticsKeys.all, "inventory", filters] as const,
  revenue: (filters?: any) => [...analyticsKeys.all, "revenue", filters] as const,
  agentPerformance: (filters?: any) => [...analyticsKeys.all, "agent-performance", filters] as const,
};

// Dashboard analytics
export const useDashboardAnalytics = () => {
  return useQuery({
    queryKey: analyticsKeys.dashboard(),
    queryFn: async () => {
      const response = await api.GET("/analytics/dashboard");
      if (response.error) throw new Error(response.error as any);
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Sales analytics
export const useSalesAnalytics = (filters?: {
  start_date?: string;
  end_date?: string;
}) => {
  return useQuery({
    queryKey: analyticsKeys.sales(filters),
    queryFn: async () => {
      const response = await api.GET("/analytics/sales", {
        params: { query: filters }
      });
      if (response.error) throw new Error(response.error as any);
      return response.data;
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

// Leads analytics
export const useLeadsAnalytics = (filters?: {
  start_date?: string;
  end_date?: string;
}) => {
  return useQuery({
    queryKey: analyticsKeys.leads(filters),
    queryFn: async () => {
      const response = await api.GET("/analytics/leads", {
        params: { query: filters }
      });
      if (response.error) throw new Error(response.error as any);
      return response.data;
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

// Inventory analytics
export const useInventoryAnalytics = (filters?: {
  project_name?: string;
}) => {
  return useQuery({
    queryKey: analyticsKeys.inventory(filters),
    queryFn: async () => {
      const response = await api.GET("/analytics/inventory", {
        params: { query: filters }
      });
      if (response.error) throw new Error(response.error as any);
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Revenue analytics
export const useRevenueAnalytics = (filters?: {
  period?: string;
  start_date?: string;
  end_date?: string;
}) => {
  return useQuery({
    queryKey: analyticsKeys.revenue(filters),
    queryFn: async () => {
      const response = await api.GET("/analytics/revenue", {
        params: { query: filters }
      });
      if (response.error) throw new Error(response.error as any);
      return response.data;
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

// Agent performance analytics
export const useAgentPerformance = (filters?: {
  agent_id?: string;
  team_id?: string;
}) => {
  return useQuery({
    queryKey: analyticsKeys.agentPerformance(filters),
    queryFn: async () => {
      const response = await api.GET("/analytics/agent-performance", {
        params: { query: filters }
      });
      if (response.error) throw new Error(response.error as any);
      return response.data;
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};
