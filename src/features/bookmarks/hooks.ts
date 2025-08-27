import { api } from "@/lib/api/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { paths } from "@/generated/atuna";

type BookmarkResponse = paths["/bookmarks/"]["get"]["responses"]["200"]["content"]["application/json"];
type BookmarkCreate = paths["/bookmarks/"]["post"]["requestBody"]["content"]["application/json"];

// Query keys
export const bookmarksKeys = {
  all: ["bookmarks"] as const,
  lists: () => [...bookmarksKeys.all, "list"] as const,
  list: (filters: Record<string, any>) => [...bookmarksKeys.lists(), filters] as const,
  details: () => [...bookmarksKeys.all, "detail"] as const,
  detail: (id: string) => [...bookmarksKeys.details(), id] as const,
};

// Get bookmarks
export const useBookmarks = (filters?: { limit?: number; offset?: number }) => {
  return useQuery({
    queryKey: bookmarksKeys.list(filters || {}),
    queryFn: async () => {
      const response = await api.GET("/bookmarks/", {
        params: { query: filters }
      });
      if (response.error) throw new Error(response.error as any);
      return response.data;
    },
  });
};

// Get single bookmark
export const useBookmark = (id: string, enabled = true) => {
  return useQuery({
    queryKey: bookmarksKeys.detail(id),
    queryFn: async () => {
      const response = await api.GET("/bookmarks/{bookmark_id}", {
        params: { path: { bookmark_id: id } }
      });
      if (response.error) throw new Error(response.error as any);
      return response.data;
    },
    enabled: enabled && !!id,
  });
};

// Add bookmark
export const useAddBookmark = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: BookmarkCreate) => {
      const response = await api.POST("/bookmarks/", { body: data });
      if (response.error) throw new Error(response.error as any);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: bookmarksKeys.lists() });
    },
  });
};

// Remove bookmark
export const useRemoveBookmark = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await api.DELETE("/bookmarks/{bookmark_id}", {
        params: { path: { bookmark_id: id } }
      });
      if (response.error) throw new Error(response.error as any);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: bookmarksKeys.lists() });
    },
  });
};
