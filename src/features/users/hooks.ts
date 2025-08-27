import { api } from "@/lib/api/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { paths } from "@/generated/atuna";

type UserResponse = paths["/clients/"]["get"]["responses"]["200"]["content"]["application/json"];
type UserCreate = paths["/clients/"]["post"]["requestBody"]["content"]["application/json"];
type UserUpdate = paths["/clients/{client_id}"]["put"]["requestBody"]["content"]["application/json"];

// Query keys
export const usersKeys = {
  all: ["users"] as const,
  lists: () => [...usersKeys.all, "list"] as const,
  list: (type: string, filters: Record<string, any>) => [...usersKeys.lists(), type, filters] as const,
  details: () => [...usersKeys.all, "detail"] as const,
  detail: (id: string) => [...usersKeys.details(), id] as const,
};

// Get clients
export const useClients = (filters?: { limit?: number; offset?: number }) => {
  return useQuery({
    queryKey: usersKeys.list("clients", filters || {}),
    queryFn: async () => {
      const response = await api.GET("/clients/", {
        params: { query: filters }
      });
      if (response.error) throw new Error(response.error as any);
      return response.data;
    },
  });
};

// Get developers
export const useDevelopers = (filters?: { limit?: number; offset?: number }) => {
  return useQuery({
    queryKey: usersKeys.list("developers", filters || {}),
    queryFn: async () => {
      const response = await api.GET("/developers/", {
        params: { query: filters }
      });
      if (response.error) throw new Error(response.error as any);
      return response.data;
    },
  });
};

// Get agents
export const useAgents = (filters?: { limit?: number; offset?: number }) => {
  return useQuery({
    queryKey: usersKeys.list("agents", filters || {}),
    queryFn: async () => {
      const response = await api.GET("/agents/", {
        params: { query: filters }
      });
      if (response.error) throw new Error(response.error as any);
      return response.data;
    },
  });
};

// Get brokers
export const useBrokers = (filters?: { limit?: number; offset?: number }) => {
  return useQuery({
    queryKey: usersKeys.list("brokers", filters || {}),
    queryFn: async () => {
      const response = await api.GET("/brokers/", {
        params: { query: filters }
      });
      if (response.error) throw new Error(response.error as any);
      return response.data;
    },
  });
};

// Get single client
export const useClient = (id: string, enabled = true) => {
  return useQuery({
    queryKey: usersKeys.detail(id),
    queryFn: async () => {
      const response = await api.GET("/clients/{client_id}", {
        params: { path: { client_id: id } }
      });
      if (response.error) throw new Error(response.error as any);
      return response.data;
    },
    enabled: enabled && !!id,
  });
};

// Create client
export const useCreateClient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UserCreate) => {
      const response = await api.POST("/clients/", { body: data });
      if (response.error) throw new Error(response.error as any);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: usersKeys.lists() });
    },
  });
};

// Update client
export const useUpdateClient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UserUpdate }) => {
      const response = await api.PUT("/clients/{client_id}", {
        params: { path: { client_id: id } },
        body: data
      });
      if (response.error) throw new Error(response.error as any);
      return response.data;
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: usersKeys.lists() });
      queryClient.invalidateQueries({ queryKey: usersKeys.detail(variables.id) });
    },
  });
};
