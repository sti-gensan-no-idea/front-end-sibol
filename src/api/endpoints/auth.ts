// Authentication API Endpoints
import api from '../core/apiService';
import { UserLogin, Token, ClientRegister, DeveloperRegister, BrokerRegister, AgentRegister, User } from '../types';

class AuthAPI {
  // Sign in endpoints
  async signin(credentials: UserLogin): Promise<Token> {
    return api.post<Token>('/auth/signin', credentials);
  }

  async developerSignin(credentials: UserLogin): Promise<Token> {
    return api.post<Token>('/auth/developer/signin', credentials);
  }

  async brokerSignin(credentials: UserLogin): Promise<Token> {
    return api.post<Token>('/auth/broker/signin', credentials);
  }

  async agentSignin(credentials: UserLogin): Promise<Token> {
    return api.post<Token>('/auth/agent/signin', credentials);
  }

  async adminSignin(credentials: UserLogin): Promise<Token> {
    return api.post<Token>('/auth/admin/signin', credentials);
  }

  // Registration endpoints
  async registerClient(data: ClientRegister): Promise<User> {
    return api.post<User>('/register/client', data);
  }

  async registerDeveloper(data: DeveloperRegister): Promise<any> {
    return api.post('/register/developer', data);
  }

  async registerBroker(data: BrokerRegister): Promise<any> {
    return api.post('/register/broker', data);
  }

  async registerAgent(data: AgentRegister): Promise<any> {
    return api.post('/register/agent', data);
  }

  // Sign in with role detection
  async signinWithRole(credentials: UserLogin, role: string): Promise<Token> {
    const endpoints: Record<string, string> = {
      client: '/auth/signin',
      developer: '/auth/developer/signin',
      broker: '/auth/broker/signin',
      agent: '/auth/agent/signin',
      admin: '/auth/admin/signin',
    };

    const endpoint = endpoints[role] || '/auth/signin';
    const response = await api.post<Token>(endpoint, credentials);
    
    // Store auth data
    if (response.access_token) {
      api.setAuthToken(response.access_token);
      if (response.user_id) localStorage.setItem('user_id', response.user_id);
      if (response.role) localStorage.setItem('user_role', response.role);
    }
    
    return response;
  }

  // Logout
  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_id');
    localStorage.removeItem('user_role');
    window.location.href = '/signin';
  }

  // Get current user
  async getCurrentUser(): Promise<User> {
    return api.get<User>('/users/me');
  }

  // Check if authenticated
  isAuthenticated(): boolean {
    return !!localStorage.getItem('access_token');
  }

  // Get user role
  getUserRole(): string | null {
    return localStorage.getItem('user_role');
  }
}

export const authAPI = new AuthAPI();
export default authAPI;
