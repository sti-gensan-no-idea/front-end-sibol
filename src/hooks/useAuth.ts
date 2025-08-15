import { useState, useCallback } from 'react';
import { authService, type LoginCredentials, type TokenResponse } from '../services';

interface UseAuthReturn {
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  userRole: string | null;
  userId: string | null;
  signin: (credentials: LoginCredentials, role?: string) => Promise<boolean>;
  signup: (userData: any, role: string) => Promise<boolean>;
  logout: () => void;
}

export const useAuth = (): UseAuthReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signin = useCallback(async (credentials: LoginCredentials, role?: string): Promise<boolean> => {
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
        default:
          tokenResponse = await authService.clientSignin(credentials);
      }

      authService.storeAuthData(tokenResponse);
      return true;
    } catch (err: any) {
      setError(err.message || 'Sign in failed');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const signup = useCallback(async (userData: any, role: string): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      switch (role) {
        case 'client':
          await authService.registerClient(userData);
          break;
        case 'developer':
          await authService.registerDeveloper(userData);
          break;
        case 'broker':
          await authService.registerBroker(userData);
          break;
        case 'agent':
          await authService.registerAgent(userData);
          break;
        default:
          throw new Error('Invalid role');
      }
      return true;
    } catch (err: any) {
      setError(err.message || 'Sign up failed');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    authService.logout();
    setError(null);
  }, []);

  return {
    loading,
    error,
    isAuthenticated: authService.isAuthenticated(),
    userRole: authService.getUserRole(),
    userId: authService.getUserId(),
    signin,
    signup,
    logout,
  };
};
