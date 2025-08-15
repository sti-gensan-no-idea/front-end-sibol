import apiService from './apiService';
import type {
  LoginCredentials,
  TokenResponse,
  ClientRegister,
  DeveloperRegister,
  BrokerRegister,
  AgentRegister,
} from '../types/api';

export class AuthService {
  // Client authentication
  async clientSignin(credentials: LoginCredentials): Promise<TokenResponse> {
    return apiService.post<TokenResponse>('/auth/signin', credentials);
  }

  // Developer authentication
  async developerSignin(credentials: LoginCredentials): Promise<TokenResponse> {
    return apiService.post<TokenResponse>('/auth/developer/signin', credentials);
  }

  // Broker authentication
  async brokerSignin(credentials: LoginCredentials): Promise<TokenResponse> {
    return apiService.post<TokenResponse>('/auth/broker/signin', credentials);
  }

  // Agent authentication
  async agentSignin(credentials: LoginCredentials): Promise<TokenResponse> {
    return apiService.post<TokenResponse>('/auth/agent/signin', credentials);
  }

  // Admin authentication
  async adminSignin(credentials: LoginCredentials): Promise<TokenResponse> {
    return apiService.post<TokenResponse>('/auth/admin/signin', credentials);
  }

  // Client registration
  async registerClient(userData: ClientRegister): Promise<any> {
    return apiService.post('/register/client', userData);
  }

  // Developer registration
  async registerDeveloper(userData: DeveloperRegister): Promise<any> {
    return apiService.post('/register/developer', userData);
  }

  // Broker registration
  async registerBroker(userData: BrokerRegister): Promise<any> {
    return apiService.post('/register/broker', userData);
  }

  // Agent registration
  async registerAgent(userData: AgentRegister): Promise<any> {
    return apiService.post('/register/agent', userData);
  }

  // Logout
  logout(): void {
    apiService.clearToken();
    // Clear any other stored user data
    localStorage.removeItem('user_id');
    localStorage.removeItem('user_role');
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!localStorage.getItem('access_token');
  }

  // Get current user role
  getUserRole(): string | null {
    return localStorage.getItem('user_role');
  }

  // Get current user ID
  getUserId(): string | null {
    return localStorage.getItem('user_id');
  }

  // Store authentication data
  storeAuthData(tokenData: TokenResponse): void {
    apiService.setToken(tokenData.access_token);
    localStorage.setItem('user_id', tokenData.user_id);
    localStorage.setItem('user_role', tokenData.role);
  }
}

export const authService = new AuthService();
export default authService;
