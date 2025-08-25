import { api } from "@/lib/api/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { paths } from "@/generated/atuna";

type LeadResponse = paths["/site-viewings/crm/leads"]["get"]["responses"]["200"]["content"]["application/json"];
type LeadCreate = paths["/site-viewings/crm/leads"]["post"]["requestBody"]["content"]["application/json"];
type LeadStatusEnum = paths["/site-viewings/crm/leads"]["get"]["parameters"]["query"]["status"];

// Query keys
export const leadsKeys = {
  all: ["leads"] as const,
  lists: () => [...leadsKeys.all, "list"] as const,
  list: (filters: Record<string, any>) => [...leadsKeys.lists(), filters] as const,
  details: () => [...leadsKeys.all, "detail"] as const,
  detail: (id: string) => [...leadsKeys.details(), id] as const,
  pipeline: () => [...leadsKeys.all, "pipeline"] as const,
};

// Get leads
export const useLeads = (filters?: { 
  status?: LeadStatusEnum;
  agent_id?: string;
}) => {
  return useQuery({
    queryKey: leadsKeys.list(filters || {}),
    queryFn: async () => {
      const response = await api.GET("/site-viewings/crm/leads", {
        params: { query: filters }
      });
      if (response.error) throw new Error(response.error as any);
      return response.data;
    },
  });
};

// Get single lead
export const useLead = (id: string, enabled = true) => {
  return useQuery({
    queryKey: leadsKeys.detail(id),
    queryFn: async () => {
      const response = await api.GET("/site-viewings/crm/leads/{lead_id}", {
        params: { path: { lead_id: id } }
      });
      if (response.error) throw new Error(response.error as any);
      return response.data;
    },
    enabled: enabled && !!id,
  });
};

// Create lead
export const useCreateLead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: LeadCreate) => {
      const response = await api.POST("/site-viewings/crm/leads", { body: data });
      if (response.error) throw new Error(response.error as any);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: leadsKeys.lists() });
      queryClient.invalidateQueries({ queryKey: leadsKeys.pipeline() });
    },
  });
};

// Update lead status
export const useUpdateLeadStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ 
      leadId, 
      status, 
      notes 
    }: { 
      leadId: string; 
      status: LeadStatusEnum; 
      notes?: string;
    }) => {
      const response = await api.PUT("/site-viewings/crm/leads/{lead_id}/status", {
        params: { 
          path: { lead_id: leadId },
          query: { new_status: status, notes }
        }
      });
      
      if (response.error) throw new Error(response.error as any);
      return response.data;
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: leadsKeys.lists() });
      queryClient.invalidateQueries({ queryKey: leadsKeys.detail(variables.leadId) });
      queryClient.invalidateQueries({ queryKey: leadsKeys.pipeline() });
    },
  });
};

// Get pipeline summary
export const usePipelineSummary = (agentId?: string) => {
  return useQuery({
    queryKey: leadsKeys.pipeline(),
    queryFn: async () => {
      const response = await api.GET("/site-viewings/crm/pipeline-summary", {
        params: { query: { agent_id: agentId } }
      });
      if (response.error) throw new Error(response.error as any);
      return response.data;
    },
  });
};
