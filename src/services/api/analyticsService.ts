// Analytics API Service
import { apiClient } from './apiClient';
import {
  DashboardAnalytics,
  SalesAnalytics,
  LeadsAnalytics,
  InventoryAnalytics,
} from '../../types/apiTypes';

class AnalyticsService {
  // Get dashboard analytics
  async getDashboardAnalytics(): Promise<DashboardAnalytics> {
    return apiClient.get<DashboardAnalytics>('/analytics/dashboard');
  }

  // Get sales analytics
  async getSalesAnalytics(startDate?: Date, endDate?: Date): Promise<SalesAnalytics> {
    const params: any = {};
    if (startDate) params.start_date = startDate.toISOString();
    if (endDate) params.end_date = endDate.toISOString();
    
    return apiClient.get<SalesAnalytics>('/analytics/sales', { params });
  }

  // Get leads analytics
  async getLeadsAnalytics(startDate?: Date, endDate?: Date): Promise<LeadsAnalytics> {
    const params: any = {};
    if (startDate) params.start_date = startDate.toISOString();
    if (endDate) params.end_date = endDate.toISOString();
    
    return apiClient.get<LeadsAnalytics>('/analytics/leads', { params });
  }

  // Get inventory analytics
  async getInventoryAnalytics(projectName?: string): Promise<InventoryAnalytics> {
    const params = projectName ? { project_name: projectName } : undefined;
    return apiClient.get<InventoryAnalytics>('/analytics/inventory', { params });
  }

  // Get agent performance
  async getAgentPerformance(agentId?: string, teamId?: string): Promise<any> {
    const params: any = {};
    if (agentId) params.agent_id = agentId;
    if (teamId) params.team_id = teamId;
    
    return apiClient.get<any>('/analytics/agent-performance', { params });
  }

  // Get revenue analytics
  async getRevenueAnalytics(
    period: 'daily' | 'weekly' | 'monthly' | 'yearly' = 'monthly',
    startDate?: Date,
    endDate?: Date
  ): Promise<any> {
    const params: any = { period };
    if (startDate) params.start_date = startDate.toISOString();
    if (endDate) params.end_date = endDate.toISOString();
    
    return apiClient.get<any>('/analytics/revenue', { params });
  }

  // Get conversion funnel
  async getConversionFunnel(startDate?: Date, endDate?: Date): Promise<any> {
    const params: any = {};
    if (startDate) params.start_date = startDate.toISOString();
    if (endDate) params.end_date = endDate.toISOString();
    
    return apiClient.get<any>('/analytics/conversion-funnel', { params });
  }

  // Get property performance
  async getPropertyPerformance(propertyId?: string, projectName?: string): Promise<any> {
    const params: any = {};
    if (propertyId) params.property_id = propertyId;
    if (projectName) params.project_name = projectName;
    
    return apiClient.get<any>('/analytics/property-performance', { params });
  }

  // Calculate metrics
  calculateGrowthRate(current: number, previous: number): number {
    if (previous === 0) return 100;
    return ((current - previous) / previous) * 100;
  }

  calculateConversionRate(converted: number, total: number): number {
    if (total === 0) return 0;
    return (converted / total) * 100;
  }

  // Format currency
  formatCurrency(amount: number | string): string {
    const num = typeof amount === 'string' ? parseFloat(amount) : amount;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num);
  }

  // Format percentage
  formatPercentage(value: number): string {
    return `${value.toFixed(1)}%`;
  }

  // Get trend direction
  getTrendDirection(current: number, previous: number): 'up' | 'down' | 'stable' {
    if (current > previous) return 'up';
    if (current < previous) return 'down';
    return 'stable';
  }

  // Export analytics data
  async exportAnalytics(type: 'dashboard' | 'sales' | 'leads' | 'inventory', format: 'csv' | 'pdf' = 'csv'): Promise<Blob> {
    const response = await apiClient.get<any>(`/analytics/export/${type}?format=${format}`, {
      responseType: 'blob',
    });
    
    const contentType = format === 'csv' ? 'text/csv' : 'application/pdf';
    return new Blob([response], { type: contentType });
  }
}

export const analyticsService = new AnalyticsService();
export default analyticsService;
