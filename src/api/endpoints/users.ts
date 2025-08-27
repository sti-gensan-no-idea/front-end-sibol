// Users API Endpoints
import api from '../core/apiService';
import { User, UserUpdate, PaginatedResponse } from '../types';

class UsersAPI {
  async getCurrentUser(): Promise<User> {
    return api.get<User>('/users/me');
  }

  async getUsers(params?: {
    role?: string;
    limit?: number;
    offset?: number;
  }): Promise<PaginatedResponse<User>> {
    return api.get<PaginatedResponse<User>>('/users', { params });
  }

  async getUser(userId: string): Promise<User> {
    return api.get<User>(`/users/${userId}`);
  }

  async updateUser(userId: string, data: UserUpdate): Promise<User> {
    return api.put<User>(`/users/${userId}`, data);
  }

  async deleteUser(userId: string): Promise<void> {
    return api.delete<void>(`/users/${userId}`);
  }

  // Client endpoints
  async getClients(params?: {
    limit?: number;
    offset?: number;
  }): Promise<PaginatedResponse<User>> {
    return api.get<PaginatedResponse<User>>('/clients/', { params });
  }

  async getClient(clientId: string): Promise<User> {
    return api.get<User>(`/clients/${clientId}`);
  }

  async updateClient(clientId: string, data: UserUpdate): Promise<User> {
    return api.put<User>(`/clients/${clientId}`, data);
  }

  async archiveClient(clientId: string): Promise<User> {
    return api.delete<User>(`/clients/${clientId}`);
  }

  // Developer endpoints
  async getDevelopers(params?: {
    limit?: number;
    offset?: number;
  }): Promise<PaginatedResponse<any>> {
    return api.get<PaginatedResponse<any>>('/developers/', { params });
  }

  async getDeveloper(developerId: string): Promise<any> {
    return api.get<any>(`/developers/${developerId}`);
  }

  // Agent endpoints
  async getAgents(params?: {
    limit?: number;
    offset?: number;
  }): Promise<PaginatedResponse<any>> {
    return api.get<PaginatedResponse<any>>('/agents/', { params });
  }

  async getAgent(agentId: string): Promise<any> {
    return api.get<any>(`/agents/${agentId}`);
  }

  // Broker endpoints
  async getBrokers(params?: {
    limit?: number;
    offset?: number;
  }): Promise<PaginatedResponse<any>> {
    return api.get<PaginatedResponse<any>>('/brokers/', { params });
  }

  async getBroker(brokerId: string): Promise<any> {
    return api.get<any>(`/brokers/${brokerId}`);
  }
}

export const usersAPI = new UsersAPI();
export default usersAPI;
