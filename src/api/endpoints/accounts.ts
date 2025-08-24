// Accounts Management API Endpoints
import api from '../core/apiService';
import { User } from '../types';

class AccountsAPI {
  async getPendingAccounts(params?: {
    skip?: number;
    limit?: number;
  }): Promise<User[]> {
    return api.get<User[]>('/accounts/pending', { params });
  }

  async getApprovedAccounts(params?: {
    skip?: number;
    limit?: number;
  }): Promise<User[]> {
    return api.get<User[]>('/accounts/approved', { params });
  }

  async getRejectedAccounts(params?: {
    skip?: number;
    limit?: number;
  }): Promise<User[]> {
    return api.get<User[]>('/accounts/rejected', { params });
  }

  async getBannedAccounts(params?: {
    skip?: number;
    limit?: number;
  }): Promise<User[]> {
    return api.get<User[]>('/accounts/banned', { params });
  }

  async getDeletedAccounts(params?: {
    skip?: number;
    limit?: number;
  }): Promise<User[]> {
    return api.get<User[]>('/accounts/deleted', { params });
  }

  async approveAccount(userId: string): Promise<void> {
    return api.put<void>(`/accounts/approve/${userId}`);
  }

  async rejectAccount(userId: string, reason: string): Promise<void> {
    return api.put<void>(`/accounts/reject/${userId}`, { reason });
  }

  async banAccount(userId: string, reason: string): Promise<void> {
    return api.put<void>(`/accounts/ban/${userId}`, { reason });
  }

  async unbanAccount(userId: string): Promise<void> {
    return api.put<void>(`/accounts/unban/${userId}`);
  }
}

export const accountsAPI = new AccountsAPI();
export default accountsAPI;
