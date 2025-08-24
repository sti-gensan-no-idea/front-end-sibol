// Maintenance API Endpoints
import api from '../core/apiService';
import { MaintenanceRequest, MaintenanceRequestCreate } from '../types';

class MaintenanceAPI {
  async createMaintenanceRequest(data: MaintenanceRequestCreate): Promise<MaintenanceRequest> {
    return api.post<MaintenanceRequest>('/maintenance/', data);
  }

  async getMaintenanceRequests(statusFilter?: string): Promise<MaintenanceRequest[]> {
    const params = statusFilter ? { status_filter: statusFilter } : undefined;
    return api.get<MaintenanceRequest[]>('/maintenance/', { params });
  }

  async updateMaintenanceRequest(
    requestId: string,
    data: Partial<MaintenanceRequestCreate>
  ): Promise<MaintenanceRequest> {
    return api.put<MaintenanceRequest>(`/maintenance/${requestId}`, data);
  }

  async getMaintenanceRequest(requestId: string): Promise<MaintenanceRequest> {
    return api.get<MaintenanceRequest>(`/maintenance/${requestId}`);
  }
}

export const maintenanceAPI = new MaintenanceAPI();
export default maintenanceAPI;
