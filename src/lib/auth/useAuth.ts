import { 
  useSigninForAccessTokenAuthSigninPost,
  useDeveloperSigninAuthDeveloperSigninPost,
  useBrokerSigninAuthBrokerSigninPost,
  useAgentSigninAuthAgentSigninPost,
  useAdminSigninAuthAdminSigninPost,
  useCreateClientClientsPost
} from "@/lib/api/generated/atuna-client";
import type { UserLogin, Token, ClientRegister } from "@/lib/api/generated/model";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { saveAuth, clearAuth, getToken, getUserId, getRole, isAuthenticated } from "@/features/auth/auth.store";

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

// Auth hook using generated API hooks
export const useAuth = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Get current user info (TODO: This endpoint needs to be available in the API)
  const { data: user, isLoading: isLoadingUser, error: userError } = useQuery({
    queryKey: ["auth", "user"],
    queryFn: async () => {
      // TODO: Replace with actual /users/me endpoint when available
      // For now, create a mock user from stored data
      const userId = getUserId();
      const role = getRole();
      if (!userId || !role) {
        throw new Error('No user data available');
      }
      
      return {
        id: userId,
        email: localStorage.getItem('user_email') || `user-${userId}@atuna.org`,
        role,
        first_name: localStorage.getItem('user_first_name') || undefined,
        last_name: localStorage.getItem('user_last_name') || undefined,
        is_active: true,
        is_verified: true,
      } as AuthUser;
    },
    enabled: isAuthenticated(),
    retry: false,
  });

  // Login mutations for different roles using generated hooks
  const clientSignin = useSigninForAccessTokenAuthSigninPost();
  const developerSignin = useDeveloperSigninAuthDeveloperSigninPost();
  const brokerSignin = useBrokerSigninAuthBrokerSigninPost();
  const agentSignin = useAgentSigninAuthAgentSigninPost();
  const adminSignin = useAdminSigninAuthAdminSigninPost();

  // Registration mutation
  const clientRegister = useCreateClientClientsPost();

  // Unified signin method
  const signin = async (credentials: LoginCredentials, role?: string) => {
    const loginData: UserLogin = {
      email: credentials.email,
      password: credentials.password,
    };

    let result: Token;

    switch (role) {
      case 'developer':
        result = await developerSignin.mutateAsync({ data: loginData });
        break;
      case 'broker':
        result = await brokerSignin.mutateAsync({ data: loginData });
        break;
      case 'agent':
        result = await agentSignin.mutateAsync({ data: loginData });
        break;
      case 'admin':
        result = await adminSignin.mutateAsync({ data: loginData });
        break;
      default:
        result = await clientSignin.mutateAsync({ data: loginData });
        break;
    }

    // Save authentication data
    saveAuth({
      access_token: result.access_token,
      token_type: result.token_type,
      user_id: result.user_id,
      role: result.role as any,
    });

    // Store additional user info if available
    localStorage.setItem('user_email', credentials.email);

    // Invalidate auth queries
    queryClient.invalidateQueries({ queryKey: ["auth"] });

    return result;
  };

  // Register client
  const register = async (userData: ClientRegister) => {
    const result = await clientRegister.mutateAsync({ data: userData });
    return result;
  };

  // Logout
  const logout = () => {
    clearAuth();
    queryClient.clear();
    navigate("/signin");
  };

  const isLoading = 
    isLoadingUser || 
    clientSignin.isPending || 
    developerSignin.isPending ||
    brokerSignin.isPending ||
    agentSignin.isPending ||
    adminSignin.isPending ||
    clientRegister.isPending;

  const error = 
    userError?.message || 
    clientSignin.error?.message || 
    developerSignin.error?.message ||
    brokerSignin.error?.message ||
    agentSignin.error?.message ||
    adminSignin.error?.message ||
    clientRegister.error?.message || 
    null;

  return {
    // State
    user,
    isLoading,
    error,
    isAuthenticated: isAuthenticated() && !!user,
    
    // Actions
    signin,
    register,
    logout,
    
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
