import { useState, useCallback } from "react";

import {
  authService,
  type LoginCredentials,
  type TokenResponse,
  type UserRole,
} from "../services";

export interface UseAuthReturn {
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  userRole: string | null;
  userId: string | null;
  userEmail: string | null;
  sessionExpiry: number | null;
  signin: (credentials: LoginCredentials, role?: string) => Promise<boolean>;
  signup: (userData: any, role: string) => Promise<boolean>;
  logout: () => void;
  hasPermission: (permission: string) => boolean;
  canAccessRoute: (route: string) => boolean;
  checkSession: () => boolean;
  refreshSession: () => boolean;
}

export const useAuth = (): UseAuthReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signin = useCallback(
    async (credentials: LoginCredentials, role?: string): Promise<boolean> => {
      setLoading(true);
      setError(null);

      try {
        let tokenResponse: TokenResponse;

        // Choose the appropriate signin method based on role
        switch (role) {
          case "developer":
            tokenResponse = await authService.developerSignin(credentials);
            break;
          case "broker":
            tokenResponse = await authService.brokerSignin(credentials);
            break;
          case "agent":
            tokenResponse = await authService.agentSignin(credentials);
            break;
          case "admin":
            tokenResponse = await authService.adminSignin(credentials);
            break;
          default:
            tokenResponse = await authService.clientSignin(credentials);
        }

        authService.storeAuthData(tokenResponse);

        return true;
      } catch (err: any) {
        setError(err.message || "Sign in failed");

        return false;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const signup = useCallback(
    async (userData: any, role: string): Promise<boolean> => {
      setLoading(true);
      setError(null);

      try {
        switch (role) {
          case "client":
            await authService.registerClient(userData);
            break;
          case "developer":
            await authService.registerDeveloper(userData);
            break;
          case "broker":
            await authService.registerBroker(userData);
            break;
          case "agent":
            await authService.registerAgent(userData);
            break;
          default:
            throw new Error("Invalid role");
        }

        return true;
      } catch (err: any) {
        setError(err.message || "Sign up failed");

        return false;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const logout = useCallback(() => {
    authService.logout();
    setError(null);
  }, []);

  const hasPermission = useCallback((permission: string): boolean => {
    const role = authService.getUserRole();
    if (!role) return false;
    
    // Define role-based permissions
    const permissions: Record<string, string[]> = {
      admin: ['all'],
      broker: ['manage_team', 'view_reports', 'manage_properties', 'manage_agents'],
      developer: ['manage_properties', 'view_reports', 'upload_properties'],
      agent: ['manage_leads', 'schedule_viewings', 'view_properties'],
      client: ['view_properties', 'book_viewings', 'manage_bookmarks']
    };
    
    const rolePermissions = permissions[role] || [];
    return rolePermissions.includes('all') || rolePermissions.includes(permission);
  }, []);

  const canAccessRoute = useCallback((route: string): boolean => {
    const role = authService.getUserRole();
    if (!role) return false;
    
    // Define route access rules
    const routeAccess: Record<string, string[]> = {
      '/admin': ['admin'],
      '/broker': ['admin', 'broker'],
      '/developer': ['admin', 'developer'],
      '/agent': ['admin', 'broker', 'agent'],
      '/client': ['admin', 'broker', 'agent', 'client']
    };
    
    const allowedRoles = routeAccess[route] || ['client'];
    return allowedRoles.includes(role);
  }, []);

  const checkSession = useCallback((): boolean => {
    return authService.isAuthenticated();
  }, []);

  const refreshSession = useCallback((): boolean => {
    return authService.extendSession();
  }, []);

  return {
    loading,
    error,
    isAuthenticated: authService.isAuthenticated(),
    userRole: authService.getUserRole(),
    userId: authService.getUserId(),
    userEmail: localStorage.getItem('user_email'),
    sessionExpiry: authService.getSessionExpiry(),
    signin,
    signup,
    logout,
    hasPermission,
    canAccessRoute,
    checkSession,
    refreshSession,
  };
};

export { type UserRole };
