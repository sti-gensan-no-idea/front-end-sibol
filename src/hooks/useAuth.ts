import { useState, useCallback, useEffect } from 'react';
import { authService, type LoginCredentials, type TokenResponse } from '../services';

export type UserRole = 'client' | 'developer' | 'agent' | 'broker' | 'admin';

interface UseAuthReturn {
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  userRole: UserRole | null;
  userId: string | null;
  userEmail: string | null;
  sessionExpiry: number | null;
  signin: (credentials: LoginCredentials, role: UserRole) => Promise<boolean>;
  signup: (userData: any, role: UserRole) => Promise<boolean>;
  logout: () => void;
  refreshSession: () => Promise<boolean>;
  checkSession: () => boolean;
  hasPermission: (permission: string) => boolean;
  canAccessRoute: (route: string) => boolean;
}

// Role-based permissions
const ROLE_PERMISSIONS: Record<UserRole, string[]> = {
  client: [
    'view_properties',
    'bookmark_properties', 
    'schedule_viewings',
    'make_payments',
    'request_maintenance',
    'view_own_data'
  ],
  agent: [
    'view_properties',
    'manage_leads',
    'schedule_viewings',
    'update_lead_status',
    'view_team_data',
    'access_crm'
  ],
  broker: [
    'view_properties',
    'manage_teams',
    'assign_properties',
    'manage_agents',
    'view_team_analytics',
    'access_broker_dashboard',
    'commission_management'
  ],
  developer: [
    'upload_properties',
    'manage_properties',
    'bulk_operations',
    'view_property_analytics',
    'manage_maintenance',
    'access_developer_dashboard'
  ],
  admin: [
    'manage_users',
    'approve_accounts',
    'system_analytics',
    'export_data',
    'access_admin_dashboard',
    'full_access'
  ]
};

// Route access by role
const ROLE_ROUTES: Record<UserRole, string[]> = {
  client: ['/client/*', '/properties/view/*', '/bookmarks', '/payments', '/maintenance'],
  agent: ['/agent/*', '/crm/*', '/leads/*', '/site-viewings/*'],
  broker: ['/broker/*', '/teams/*', '/analytics/broker/*', '/commission/*'],
  developer: ['/developer/*', '/properties/manage/*', '/analytics/developer/*'],
  admin: ['/admin/*', '/users/*', '/analytics/*', '/reports/*']
};

export const useAuth = (): UseAuthReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sessionExpiry, setSessionExpiry] = useState<number | null>(null);

  // Check session validity on mount and set up auto-logout
  useEffect(() => {
    const initializeAuth = () => {
      const token = localStorage.getItem('access_token');
      const expiry = localStorage.getItem('token_expiry');
      
      if (token && expiry) {
        const expiryTime = parseInt(expiry);
        setSessionExpiry(expiryTime);
        
        // Check if token is expired
        if (Date.now() > expiryTime) {
          logout();
          return;
        }
        
        // Set up auto-logout timer
        const timeUntilExpiry = expiryTime - Date.now();
        const timeoutId = setTimeout(() => {
          logout();
        }, timeUntilExpiry);
        
        return () => clearTimeout(timeoutId);
      }
    };

    initializeAuth();
  }, []);

  // Check session validity every 30 seconds
  useEffect(() => {
    const checkSessionInterval = setInterval(() => {
      if (!checkSession()) {
        logout();
      }
    }, 30000); // Check every 30 seconds

    return () => clearInterval(checkSessionInterval);
  }, []);

  const signin = useCallback(async (credentials: LoginCredentials, role: UserRole): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      let tokenResponse: TokenResponse;

      // Choose the appropriate signin method based on role
      switch (role) {
        case 'developer':
          tokenResponse = await authService.developerSignin(credentials);
          break;
        case 'broker':
          tokenResponse = await authService.brokerSignin(credentials);
          break;
        case 'agent':
          tokenResponse = await authService.agentSignin(credentials);
          break;
        case 'admin':
          tokenResponse = await authService.adminSignin(credentials);
          break;
        case 'client':
        default:
          tokenResponse = await authService.clientSignin(credentials);
      }

      // Store authentication data with expiration
      authService.storeAuthData(tokenResponse);
      
      // Set session expiry (default 8 hours from now)
      const expiryTime = Date.now() + (8 * 60 * 60 * 1000);
      localStorage.setItem('token_expiry', expiryTime.toString());
      localStorage.setItem('user_email', credentials.email);
      setSessionExpiry(expiryTime);

      // Verify the role matches what was requested
      if (tokenResponse.role !== role) {
        logout();
        setError(`Invalid credentials for ${role} role`);
        return false;
      }

      return true;
    } catch (err: any) {
      setError(err.message || 'Sign in failed');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const signup = useCallback(async (userData: any, role: UserRole): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      // Add role to userData
      const registrationData = { ...userData, role };

      switch (role) {
        case 'client':
          await authService.registerClient(registrationData);
          break;
        case 'developer':
          await authService.registerDeveloper(registrationData);
          break;
        case 'broker':
          await authService.registerBroker(registrationData);
          break;
        case 'agent':
          await authService.registerAgent(registrationData);
          break;
        default:
          throw new Error('Invalid role');
      }
      return true;
    } catch (err: any) {
      setError(err.message || 'Registration failed');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    authService.logout();
    localStorage.removeItem('token_expiry');
    localStorage.removeItem('user_email');
    setSessionExpiry(null);
    setError(null);
    
    // Redirect to appropriate sign-in page based on current location
    const currentPath = window.location.pathname;
    if (currentPath.includes('/developer')) {
      window.location.href = '/signin/developer';
    } else if (currentPath.includes('/broker')) {
      window.location.href = '/signin/broker';
    } else if (currentPath.includes('/agent')) {
      window.location.href = '/signin/agent';
    } else if (currentPath.includes('/admin')) {
      window.location.href = '/signin';
    } else {
      window.location.href = '/signin';
    }
  }, []);

  const refreshSession = useCallback(async (): Promise<boolean> => {
    const token = localStorage.getItem('access_token');
    if (!token) return false;

    try {
      // Extend session by another 8 hours
      const newExpiryTime = Date.now() + (8 * 60 * 60 * 1000);
      localStorage.setItem('token_expiry', newExpiryTime.toString());
      setSessionExpiry(newExpiryTime);
      return true;
    } catch (err) {
      logout();
      return false;
    }
  }, [logout]);

  const checkSession = useCallback((): boolean => {
    const token = localStorage.getItem('access_token');
    const expiry = localStorage.getItem('token_expiry');
    
    if (!token || !expiry) return false;
    
    const expiryTime = parseInt(expiry);
    return Date.now() < expiryTime;
  }, []);

  const hasPermission = useCallback((permission: string): boolean => {
    const role = authService.getUserRole() as UserRole;
    if (!role) return false;
    
    const rolePermissions = ROLE_PERMISSIONS[role] || [];
    return rolePermissions.includes(permission) || rolePermissions.includes('full_access');
  }, []);

  const canAccessRoute = useCallback((route: string): boolean => {
    const role = authService.getUserRole() as UserRole;
    if (!role) return false;
    
    const allowedRoutes = ROLE_ROUTES[role] || [];
    return allowedRoutes.some(allowedRoute => {
      if (allowedRoute.endsWith('/*')) {
        const basePath = allowedRoute.slice(0, -2);
        return route.startsWith(basePath);
      }
      return route === allowedRoute;
    });
  }, []);

  return {
    loading,
    error,
    isAuthenticated: authService.isAuthenticated() && checkSession(),
    userRole: authService.getUserRole() as UserRole,
    userId: authService.getUserId(),
    userEmail: localStorage.getItem('user_email'),
    sessionExpiry,
    signin,
    signup,
    logout,
    refreshSession,
    checkSession,
    hasPermission,
    canAccessRoute,
  };
};