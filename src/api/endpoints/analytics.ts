// Analytics API Endpoints
import api from '../core/apiService';
import { DashboardAnalytics } from '../types';

class AnalyticsAPI {
  async getDashboardAnalytics(): Promise<DashboardAnalytics> {
    return api.get<DashboardAnalytics>('/analytics/dashboard');
  }

  async getSalesAnalytics(startDate?: Date, endDate?: Date): Promise<any> {
    const params: any = {};
    if (startDate) params.start_date = startDate.toISOString();
    if (endDate) params.end_date = endDate.toISOString();
    return api.get('/analytics/sales', { params });
  }

  async getLeadsAnalytics(startDate?: Date, endDate?: Date): Promise<any> {
    const params: any = {};
    if (startDate) params.start_date = startDate.toISOString();
    if (endDate) params.end_date = endDate.toISOString();
    return api.get('/analytics/leads', { params });
  }

  async getInventoryAnalytics(projectName?: string): Promise<any> {
    const params = projectName ? { project_name: projectName } : undefined;
    return api.get('/analytics/inventory', { params });
  }

  async getAgentPerformance(agentId?: string, teamId?: string): Promise<any> {
    const params: any = {};
    if (agentId) params.agent_id = agentId;
    if (teamId) params.team_id = teamId;
    return api.get('/analytics/agent-performance', { params });
  }

  async getRevenueAnalytics(
    period: 'daily' | 'weekly' | 'monthly' | 'yearly' = 'monthly',
    startDate?: Date,
    endDate?: Date
  ): Promise<any> {
    const params: any = { period };
    if (startDate) params.start_date = startDate.toISOString();
    if (endDate) params.end_date = endDate.toISOString();
    return api.get('/analytics/revenue', { params });
  }

  async getConversionFunnel(startDate?: Date, endDate?: Date): Promise<any> {
    const params: any = {};
    if (startDate) params.start_date = startDate.toISOString();
    if (endDate) params.end_date = endDate.toISOString();
    return api.get('/analytics/conversion-funnel', { params });
  }

  async getPropertyPerformance(propertyId?: string, projectName?: string): Promise<any> {
    const params: any = {};
    if (propertyId) params.property_id = propertyId;
    if (projectName) params.project_name = projectName;
    return api.get('/analytics/property-performance', { params });
  }
}

export const analyticsAPI = new AnalyticsAPI();
export default analyticsAPI;
