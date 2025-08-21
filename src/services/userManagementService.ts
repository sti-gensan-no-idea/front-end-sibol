import type { UserRole } from "../types/api";

import apiService from "./apiService";

export interface UserResponse {
  id: string;
  email: string;
  role: UserRole;
  is_active: boolean;
  is_verified: boolean;
  first_name?: string;
  last_name?: string;
  phone?: string;
  created_at: string;
  updated_at?: string;
}

export interface UserUpdate {
  first_name?: string;
  last_name?: string;
  phone?: string;
  is_active?: boolean;
}

export interface UserPendingResponse {
  id: string;
  email: string;
  role: UserRole;
  first_name?: string;
  last_name?: string;
  phone?: string;
  created_at: string;
  pending_reason?: string;
}

export interface AccountRejection {
  reason: string;
}

export interface AccountBan {
  reason: string;
}

export interface DeveloperResponse {
  id: string;
  user_id: string;
  company_name: string;
  license_to_sell?: string;
  certificate_of_registration?: string;
  is_verified: boolean;
  created_at: string;
}

export interface BrokerResponse {
  id: string;
  user_id: string;
  license_number?: string;
  is_verified: boolean;
  team_name?: string;
  created_at: string;
}

export interface AgentResponse {
  id: string;
  user_id: string;
  broker_id: string;
  cpd_certificate?: string;
  cpd_expiry?: string;
  is_active_in_team: boolean;
  created_at: string;
}

export class UserManagementService {
  // Client Management
  async getClients(params?: {
    is_active?: boolean;
    limit?: number;
    offset?: number;
  }): Promise<{
    items: UserResponse[];
    total: number;
    limit: number;
    offset: number;
    has_next: boolean;
    has_prev: boolean;
  }> {
    const queryParams = new URLSearchParams();

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, value.toString());
        }
      });
    }

    const endpoint = `/clients${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;

    return apiService.get(endpoint);
  }

  async getClientById(id: string): Promise<UserResponse> {
    return apiService.get(`/clients/${id}`);
  }

  async updateClient(id: string, updates: UserUpdate): Promise<UserResponse> {
    return apiService.put(`/clients/${id}`, updates);
  }

  async deleteClient(id: string): Promise<{ message: string }> {
    return apiService.delete(`/clients/${id}`);
  }

  // Developer Management
  async getDevelopers(params?: {
    is_verified?: boolean;
    limit?: number;
    offset?: number;
  }): Promise<{
    items: DeveloperResponse[];
    total: number;
    limit: number;
    offset: number;
    has_next: boolean;
    has_prev: boolean;
  }> {
    const queryParams = new URLSearchParams();

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, value.toString());
        }
      });
    }

    const endpoint = `/developers${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;

    return apiService.get(endpoint);
  }

  async getDeveloperById(id: string): Promise<DeveloperResponse> {
    return apiService.get(`/developers/${id}`);
  }

  async verifyDeveloper(id: string): Promise<DeveloperResponse> {
    return apiService.put(`/developers/${id}/verify`);
  }

  async updateDeveloper(
    id: string,
    updates: {
      company_name?: string;
      license_to_sell?: string;
      certificate_of_registration?: string;
    },
  ): Promise<DeveloperResponse> {
    return apiService.put(`/developers/${id}`, updates);
  }

  // Broker Management
  async getBrokers(params?: {
    is_verified?: boolean;
    limit?: number;
    offset?: number;
  }): Promise<{
    items: BrokerResponse[];
    total: number;
    limit: number;
    offset: number;
    has_next: boolean;
    has_prev: boolean;
  }> {
    const queryParams = new URLSearchParams();

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, value.toString());
        }
      });
    }

    const endpoint = `/brokers${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;

    return apiService.get(endpoint);
  }

  async getBrokerById(id: string): Promise<BrokerResponse> {
    return apiService.get(`/brokers/${id}`);
  }

  async verifyBroker(id: string): Promise<BrokerResponse> {
    return apiService.put(`/brokers/${id}/verify`);
  }

  async updateBroker(
    id: string,
    updates: {
      license_number?: string;
      team_name?: string;
    },
  ): Promise<BrokerResponse> {
    return apiService.put(`/brokers/${id}`, updates);
  }

  // Agent Management
  async getAgents(params?: {
    broker_id?: string;
    is_active?: boolean;
    limit?: number;
    offset?: number;
  }): Promise<{
    items: AgentResponse[];
    total: number;
    limit: number;
    offset: number;
    has_next: boolean;
    has_prev: boolean;
  }> {
    const queryParams = new URLSearchParams();

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, value.toString());
        }
      });
    }

    const endpoint = `/agents${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;

    return apiService.get(endpoint);
  }

  async getAgentById(id: string): Promise<AgentResponse> {
    return apiService.get(`/agents/${id}`);
  }

  async updateAgent(
    id: string,
    updates: {
      broker_id?: string;
      cpd_certificate?: string;
      cpd_expiry?: string;
      is_active_in_team?: boolean;
    },
  ): Promise<AgentResponse> {
    return apiService.put(`/agents/${id}`, updates);
  }

  async assignAgentToBroker(
    agentId: string,
    brokerId: string,
  ): Promise<AgentResponse> {
    return apiService.put(`/agents/${agentId}/assign-broker`, {
      broker_id: brokerId,
    });
  }

  // Account Management (Admin functions)
  async getPendingAccounts(): Promise<UserPendingResponse[]> {
    return apiService.get("/accounts/pending");
  }

  async approveAccount(userId: string): Promise<UserResponse> {
    return apiService.put(`/accounts/approve/${userId}`);
  }

  async rejectAccount(
    userId: string,
    rejection: AccountRejection,
  ): Promise<{ message: string }> {
    return apiService.put(`/accounts/reject/${userId}`, rejection);
  }

  async banAccount(
    userId: string,
    ban: AccountBan,
  ): Promise<{ message: string }> {
    return apiService.put(`/accounts/ban/${userId}`, ban);
  }

  async unbanAccount(userId: string): Promise<UserResponse> {
    return apiService.put(`/accounts/unban/${userId}`);
  }

  // User Profile Management
  async getCurrentUser(): Promise<UserResponse> {
    return apiService.get("/users/me");
  }

  async updateCurrentUser(updates: UserUpdate): Promise<UserResponse> {
    return apiService.put("/users/me", updates);
  }

  async changePassword(
    currentPassword: string,
    newPassword: string,
  ): Promise<{ message: string }> {
    return apiService.put("/users/change-password", {
      current_password: currentPassword,
      new_password: newPassword,
    });
  }

  async uploadProfilePicture(
    file: File,
  ): Promise<{ profile_picture_url: string }> {
    return apiService.uploadFile("/users/profile-picture", file);
  }

  // Search Users
  async searchUsers(query: string, role?: UserRole): Promise<UserResponse[]> {
    const params = new URLSearchParams({ q: query });

    if (role) {
      params.append("role", role);
    }

    return apiService.get(`/users/search?${params.toString()}`);
  }
}

export const userManagementService = new UserManagementService();
export default userManagementService;
