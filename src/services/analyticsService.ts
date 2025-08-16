import apiService from './apiService';

export interface DashboardAnalytics {
  total_properties: number;
  active_properties: number;
  total_users: number;
  active_users: number;
  total_revenue: number;
  monthly_revenue: number;
  top_performing_agents: BestPerformingAgent[];
}

export interface BestPerformingAgent {
  agent_id: string;
  agent_name: string;
  total_sales: number;
  total_revenue: number;
  conversion_rate: number;
  rating: number;
}

export interface SalesAnalytics {
  total_sales: number;
  monthly_sales: number;
  revenue_growth: number;
  top_selling_properties: Array<{
    id: string;
    title: string;
    price: number;
    sales_count: number;
  }>;
  sales_by_month: Array<{
    month: string;
    sales: number;
    revenue: number;
  }>;
}

export interface LeadsAnalytics {
  total_leads: number;
  active_leads: number;
  conversion_rate: number;
  leads_by_status: {
    prospecting: number;
    contacted: number;
    site_viewed: number;
    reserved: number;
    closed: number;
  };
  leads_by_agent: Array<{
    agent_id: string;
    agent_name: string;
    leads_count: number;
    conversion_rate: number;
  }>;
}

export interface InventoryAnalytics {
  total_inventory: number;
  available_inventory: number;
  sold_inventory: number;
  reserved_inventory: number;
  inventory_by_project: Array<{
    project_name: string;
    total_units: number;
    available_units: number;
    sold_units: number;
    revenue: number;
  }>;
}

export interface RevenueAnalytics {
  total_revenue: number;
  monthly_revenue: number;
  yearly_revenue: number;
  revenue_growth: number;
  revenue_by_property_type: Array<{
    property_type: string;
    revenue: number;
    percentage: number;
  }>;
  revenue_trends: Array<{
    period: string;
    revenue: number;
    growth_rate: number;
  }>;
}

export interface AgentStatistics {
  total_properties: number;
  active_leads: number;
  revenue: number;
  automation_rate: number;
  conversion_rate: number;
  average_deal_size: number;
}

export interface BrokerStatistics {
  total_agents: number;
  active_agents: number;
  total_leads: number;
  converted_leads: number;
  total_revenue: number;
  commission_earned: number;
}

export interface TeamAnalytics {
  team_id: string;
  team_name: string;
  total_members: number;
  active_members: number;
  total_leads: number;
  conversion_rate: number;
  total_revenue: number;
  performance_metrics: {
    leads_per_agent: number;
    revenue_per_agent: number;
    average_deal_size: number;
  };
}

export class AnalyticsService {
  // Dashboard Analytics
  async getDashboardAnalytics(): Promise<DashboardAnalytics> {
    return apiService.get('/analytics/dashboard');
  }

  // Sales Analytics
  async getSalesAnalytics(params?: {
    start_date?: string;
    end_date?: string;
    property_type?: string;
  }): Promise<SalesAnalytics> {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, value.toString());
        }
      });
    }
    
    const endpoint = `/analytics/sales${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return apiService.get(endpoint);
  }

  // Leads Analytics
  async getLeadsAnalytics(params?: {
    start_date?: string;
    end_date?: string;
    agent_id?: string;
  }): Promise<LeadsAnalytics> {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, value.toString());
        }
      });
    }
    
    const endpoint = `/analytics/leads${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return apiService.get(endpoint);
  }

  // Inventory Analytics
  async getInventoryAnalytics(): Promise<InventoryAnalytics> {
    return apiService.get('/analytics/inventory');
  }

  // Revenue Analytics
  async getRevenueAnalytics(params?: {
    start_date?: string;
    end_date?: string;
    period?: 'monthly' | 'quarterly' | 'yearly';
  }): Promise<RevenueAnalytics> {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, value.toString());
        }
      });
    }
    
    const endpoint = `/analytics/revenue${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return apiService.get(endpoint);
  }

  // Agent Statistics
  async getAgentStatistics(agentId?: string): Promise<AgentStatistics> {
    const endpoint = agentId ? `/analytics/agent/${agentId}` : '/analytics/agent/me';
    return apiService.get(endpoint);
  }

  // Broker Statistics
  async getBrokerStatistics(brokerId?: string): Promise<BrokerStatistics> {
    const endpoint = brokerId ? `/analytics/broker/${brokerId}` : '/analytics/broker/me';
    return apiService.get(endpoint);
  }

  // Team Analytics
  async getTeamAnalytics(teamId?: string): Promise<TeamAnalytics[]> {
    const endpoint = teamId ? `/analytics/teams/${teamId}` : '/analytics/teams';
    return apiService.get(endpoint);
  }

  // Property Performance
  async getPropertyPerformance(propertyId: string): Promise<{
    property_id: string;
    views: number;
    leads_generated: number;
    site_viewings: number;
    conversion_rate: number;
    time_on_market: number;
    price_changes: Array<{
      date: string;
      old_price: number;
      new_price: number;
    }>;
  }> {
    return apiService.get(`/analytics/property/${propertyId}`);
  }

  // Market Trends
  async getMarketTrends(params?: {
    location?: string;
    property_type?: string;
    period?: string;
  }): Promise<{
    average_price: number;
    price_trend: number;
    inventory_levels: number;
    demand_score: number;
    market_activity: Array<{
      period: string;
      average_price: number;
      sales_volume: number;
      inventory_count: number;
    }>;
  }> {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, value.toString());
        }
      });
    }
    
    const endpoint = `/analytics/market-trends${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return apiService.get(endpoint);
  }

  // Export Analytics Data
  async exportAnalyticsData(type: 'sales' | 'leads' | 'inventory' | 'revenue', format: 'csv' | 'excel' = 'csv'): Promise<Blob> {
    const response = await fetch(`${apiService['baseURL']}/analytics/export/${type}?format=${format}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to export data');
    }
    
    return response.blob();
  }
}

export const analyticsService = new AnalyticsService();
export default analyticsService;