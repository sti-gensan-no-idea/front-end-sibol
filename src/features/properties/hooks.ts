import { api } from "@/lib/api/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { paths } from "@/generated/atuna";

type PropertyResponse = paths["/properties/"]["get"]["responses"]["200"]["content"]["application/json"];
type PropertyCreate = paths["/properties/"]["post"]["requestBody"]["content"]["application/json"];
type PropertyUpdate = paths["/properties/{property_id}"]["put"]["requestBody"]["content"]["application/json"];

// Query keys
export const propertiesKeys = {
  all: ["properties"] as const,
  lists: () => [...propertiesKeys.all, "list"] as const,
  list: (filters: Record<string, any>) => [...propertiesKeys.lists(), filters] as const,
  details: () => [...propertiesKeys.all, "detail"] as const,
  detail: (id: string) => [...propertiesKeys.details(), id] as const,
};

// Get properties with filters
export const useProperties = (filters?: {
  status_filter?: string;
  property_type?: string;
  project_name?: string;
  location?: string;
  min_price?: number;
  max_price?: number;
  limit?: number;
  offset?: number;
}) => {
  return useQuery({
    queryKey: propertiesKeys.list(filters || {}),
    queryFn: async () => {
      const response = await api.GET("/properties/", {
        params: { query: filters }
      });
      if (response.error) throw new Error(response.error as any);
      return response.data;
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

// Get single property
export const useProperty = (id: string, enabled = true) => {
  return useQuery({
    queryKey: propertiesKeys.detail(id),
    queryFn: async () => {
      const response = await api.GET("/properties/{property_id}", {
        params: { path: { property_id: id } }
      });
      if (response.error) throw new Error(response.error as any);
      return response.data;
    },
    enabled: enabled && !!id,
  });
};

// Create property
export const useCreateProperty = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: PropertyCreate) => {
      const response = await api.POST("/properties/", { body: data });
      if (response.error) throw new Error(response.error as any);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: propertiesKeys.lists() });
    },
  });
};

// Update property
export const useUpdateProperty = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: PropertyUpdate }) => {
      const response = await api.PUT("/properties/{property_id}", {
        params: { path: { property_id: id } },
        body: data
      });
      if (response.error) throw new Error(response.error as any);
      return response.data;
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: propertiesKeys.lists() });
      queryClient.invalidateQueries({ queryKey: propertiesKeys.detail(variables.id) });
    },
  });
};

// Delete property
export const useDeleteProperty = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await api.DELETE("/properties/{property_id}", {
        params: { path: { property_id: id } }
      });
      if (response.error) throw new Error(response.error as any);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: propertiesKeys.lists() });
    },
  });
};

// Upload CSV
export const useUploadPropertiesCSV = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ file, project_name }: { file: File; project_name?: string }) => {
      const formData = new FormData();
      formData.append("file", file);
      
      const response = await api.POST("/properties/upload-csv", {
        body: formData,
        params: { query: { project_name } },
        headers: { "Content-Type": "multipart/form-data" }
      });
      
      if (response.error) throw new Error(response.error as any);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: propertiesKeys.lists() });
    },
  });
};

// Assign property
export const useAssignProperty = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ 
      propertyId, 
      assignmentData 
    }: { 
      propertyId: string; 
      assignmentData: { broker_id?: string; agent_id?: string } 
    }) => {
      const response = await api.POST("/properties/{property_id}/assign", {
        params: { path: { property_id: propertyId } },
        body: assignmentData
      });
      
      if (response.error) throw new Error(response.error as any);
      return response.data;
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: propertiesKeys.detail(variables.propertyId) });
    },
  });
};
