import { api, setToken, clearToken, getToken } from "@/lib/api/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export interface AuthUser {
  id: string;
  email: string;
  role: string;
  first_name?: string;
  last_name?: string;
  is_active: boolean;
  is_verified: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthToken {
  access_token: string;
  token_type: string;
  user_id: string;
  role: string;
}

// Auth hook using React Query
export const useAuth = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Check if user is logged in on mount
  useEffect(() => {
    const storedToken = localStorage.getItem("access_token");
    if (storedToken) {
      setToken(storedToken);
    }

    // Listen for auth expiration
    const handleAuthExpired = () => {
      handleLogout();
    };

    window.addEventListener("auth-expired", handleAuthExpired);
    return () => window.removeEventListener("auth-expired", handleAuthExpired);
  }, []);

  // Get current user info
  const { data: user, isLoading: isLoadingUser, error: userError } = useQuery({
    queryKey: ["auth", "user"],
    queryFn: async () => {
      const response = await api.GET("/users/me");
      if (response.error) {
        throw new Error(response.error as any);
      }
      return response.data as AuthUser;
    },
    enabled: !!getToken(),
    retry: false,
  });

  // Login mutations for different roles
  const signinMutation = useMutation({
    mutationFn: async ({ credentials, role }: { credentials: LoginCredentials; role?: string }) => {
      const endpoint = role 
        ? `/auth/${role}/signin` as const
        : "/auth/signin" as const;
      
      const response = await api.POST(endpoint, {
        body: credentials
      });

      if (response.error) {
        throw new Error(response.error as any);
      }

      return response.data as AuthToken;
    },
    onSuccess: (data) => {
      setToken(data.access_token);
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("user_id", data.user_id);
      localStorage.setItem("user_role", data.role);
      queryClient.invalidateQueries({ queryKey: ["auth"] });
    },
  });

  // Logout
  const handleLogout = () => {
    clearToken();
    localStorage.removeItem("access_token");
    localStorage.removeItem("user_id");
    localStorage.removeItem("user_role");
    queryClient.clear();
    navigate("/signin");
  };

  // Registration mutations
  const registerMutation = useMutation({
    mutationFn: async ({ userData, role }: { userData: any; role: string }) => {
      const endpoint = `/register/${role}` as const;
      const response = await api.POST(endpoint, {
        body: userData
      });

      if (response.error) {
        throw new Error(response.error as any);
      }

      return response.data;
    },
  });

  return {
    // State
    user,
    isLoading: isLoadingUser || signinMutation.isPending || registerMutation.isPending,
    error: userError?.message || signinMutation.error?.message || registerMutation.error?.message || null,
    isAuthenticated: !!user && !!getToken(),
    
    // Actions
    signin: signinMutation.mutateAsync,
    register: registerMutation.mutateAsync,
    logout: handleLogout,
    
    // Utilities
    hasRole: (role: string) => user?.role === role,
    hasPermission: (permission: string) => {
      // Add permission logic based on user role
      return true; // Placeholder
    },
  };
};

// Auth query keys
export const authKeys = {
  all: ["auth"] as const,
  user: () => [...authKeys.all, "user"] as const,
};
