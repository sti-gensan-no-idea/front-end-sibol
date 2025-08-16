import { useState, useEffect, useCallback } from 'react';
<<<<<<< HEAD
import { 
  analyticsService,
  type DashboardAnalytics,
  type SalesAnalytics,
  type LeadsAnalytics,
  type InventoryAnalytics,
  type RevenueAnalytics,
  type AgentStatistics,
  type BrokerStatistics,
  type TeamAnalytics
} from '../services';

interface UseAnalyticsOptions {
  autoFetch?: boolean;
  refreshInterval?: number; // in milliseconds
}

interface UseAnalyticsReturn {
  dashboardData: DashboardAnalytics | null;
  salesData: SalesAnalytics | null;
  leadsData: LeadsAnalytics | null;
  inventoryData: InventoryAnalytics | null;
  revenueData: RevenueAnalytics | null;
  loading: boolean;
  error: string | null;
  fetchDashboardAnalytics: () => Promise<void>;
  fetchSalesAnalytics: (params?: {
    start_date?: string;
    end_date?: string;
    property_type?: string;
  }) => Promise<void>;
  fetchLeadsAnalytics: (params?: {
    start_date?: string;
    end_date?: string;
    agent_id?: string;
  }) => Promise<void>;
  fetchInventoryAnalytics: () => Promise<void>;
  fetchRevenueAnalytics: (params?: {
    start_date?: string;
    end_date?: string;
    period?: 'monthly' | 'quarterly' | 'yearly';
  }) => Promise<void>;
  refreshAllAnalytics: () => Promise<void>;
  exportData: (type: 'sales' | 'leads' | 'inventory' | 'revenue', format?: 'csv' | 'excel') => Promise<Blob | null>;
}

interface UseAgentAnalyticsReturn {
  statistics: AgentStatistics | null;
  loading: boolean;
  error: string | null;
  fetchAgentStatistics: (agentId?: string) => Promise<void>;
  refreshStatistics: () => Promise<void>;
}

interface UseBrokerAnalyticsReturn {
  statistics: BrokerStatistics | null;
  teamAnalytics: TeamAnalytics[];
  loading: boolean;
  error: string | null;
  fetchBrokerStatistics: (brokerId?: string) => Promise<void>;
  fetchTeamAnalytics: (teamId?: string) => Promise<void>;
  refreshAll: () => Promise<void>;
}

export const useAnalytics = (options: UseAnalyticsOptions = {}): UseAnalyticsReturn => {
  const { autoFetch = true, refreshInterval } = options;
  
  const [dashboardData, setDashboardData] = useState<DashboardAnalytics | null>(null);
  const [salesData, setSalesData] = useState<SalesAnalytics | null>(null);
  const [leadsData, setLeadsData] = useState<LeadsAnalytics | null>(null);
  const [inventoryData, setInventoryData] = useState<InventoryAnalytics | null>(null);
  const [revenueData, setRevenueData] = useState<RevenueAnalytics | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardAnalytics = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await analyticsService.getDashboardAnalytics();
      setDashboardData(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch dashboard analytics');
=======
import { dataService, type AnalyticsDashboard } from '../services';

interface UseAnalyticsReturn {
  dashboard: AnalyticsDashboard | null;
  salesData: any;
  leadsData: any;
  inventoryData: any;
  revenueData: any;
  loading: boolean;
  error: string | null;
  fetchDashboard: () => Promise<void>;
  fetchSales: () => Promise<void>;
  fetchLeads: () => Promise<void>;
  fetchInventory: () => Promise<void>;
  fetchRevenue: () => Promise<void>;
}

export const useAnalytics = (): UseAnalyticsReturn => {
  const [dashboard, setDashboard] = useState<AnalyticsDashboard | null>(null);
  const [salesData, setSalesData] = useState<any>(null);
  const [leadsData, setLeadsData] = useState<any>(null);
  const [inventoryData, setInventoryData] = useState<any>(null);
  const [revenueData, setRevenueData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboard = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await dataService.getAnalyticsDashboard();
      setDashboard(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch dashboard data');
>>>>>>> main
    } finally {
      setLoading(false);
    }
  }, []);

<<<<<<< HEAD
  const fetchSalesAnalytics = useCallback(async (params?: {
    start_date?: string;
    end_date?: string;
    property_type?: string;
  }) => {
    setLoading(true);
    setError(null);
    try {
      const data = await analyticsService.getSalesAnalytics(params);
      setSalesData(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch sales analytics');
=======
  const fetchSales = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await dataService.getSalesAnalytics();
      setSalesData(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch sales data');
>>>>>>> main
    } finally {
      setLoading(false);
    }
  }, []);

<<<<<<< HEAD
  const fetchLeadsAnalytics = useCallback(async (params?: {
    start_date?: string;
    end_date?: string;
    agent_id?: string;
  }) => {
    setLoading(true);
    setError(null);
    try {
      const data = await analyticsService.getLeadsAnalytics(params);
      setLeadsData(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch leads analytics');
=======
  const fetchLeads = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await dataService.getLeadsAnalytics();
      setLeadsData(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch leads data');
>>>>>>> main
    } finally {
      setLoading(false);
    }
  }, []);

<<<<<<< HEAD
  const fetchInventoryAnalytics = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await analyticsService.getInventoryAnalytics();
      setInventoryData(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch inventory analytics');
=======
  const fetchInventory = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await dataService.getInventoryAnalytics();
      setInventoryData(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch inventory data');
>>>>>>> main
    } finally {
      setLoading(false);
    }
  }, []);

<<<<<<< HEAD
  const fetchRevenueAnalytics = useCallback(async (params?: {
    start_date?: string;
    end_date?: string;
    period?: 'monthly' | 'quarterly' | 'yearly';
  }) => {
    setLoading(true);
    setError(null);
    try {
      const data = await analyticsService.getRevenueAnalytics(params);
      setRevenueData(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch revenue analytics');
=======
  const fetchRevenue = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await dataService.getRevenueAnalytics();
      setRevenueData(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch revenue data');
>>>>>>> main
    } finally {
      setLoading(false);
    }
  }, []);

<<<<<<< HEAD
  const refreshAllAnalytics = useCallback(async () => {
    await Promise.all([
      fetchDashboardAnalytics(),
      fetchSalesAnalytics(),
      fetchLeadsAnalytics(),
      fetchInventoryAnalytics(),
      fetchRevenueAnalytics(),
    ]);
  }, [fetchDashboardAnalytics, fetchSalesAnalytics, fetchLeadsAnalytics, fetchInventoryAnalytics, fetchRevenueAnalytics]);

  const exportData = useCallback(async (type: 'sales' | 'leads' | 'inventory' | 'revenue', format: 'csv' | 'excel' = 'csv'): Promise<Blob | null> => {
    setLoading(true);
    setError(null);
    try {
      const blob = await analyticsService.exportAnalyticsData(type, format);
      return blob;
    } catch (err: any) {
      setError(err.message || 'Failed to export data');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Auto-refresh functionality
  useEffect(() => {
    if (autoFetch) {
      refreshAllAnalytics();
    }
  }, [autoFetch, refreshAllAnalytics]);

  useEffect(() => {
    if (refreshInterval && refreshInterval > 0) {
      const interval = setInterval(refreshAllAnalytics, refreshInterval);
      return () => clearInterval(interval);
    }
  }, [refreshInterval, refreshAllAnalytics]);

  return {
    dashboardData,
=======
  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  return {
    dashboard,
>>>>>>> main
    salesData,
    leadsData,
    inventoryData,
    revenueData,
    loading,
    error,
<<<<<<< HEAD
    fetchDashboardAnalytics,
    fetchSalesAnalytics,
    fetchLeadsAnalytics,
    fetchInventoryAnalytics,
    fetchRevenueAnalytics,
    refreshAllAnalytics,
    exportData,
  };
};

export const useAgentAnalytics = (): UseAgentAnalyticsReturn => {
  const [statistics, setStatistics] = useState<AgentStatistics | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAgentStatistics = useCallback(async (agentId?: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await analyticsService.getAgentStatistics(agentId);
      setStatistics(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch agent statistics');
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshStatistics = useCallback(async () => {
    await fetchAgentStatistics();
  }, [fetchAgentStatistics]);

  useEffect(() => {
    fetchAgentStatistics();
  }, [fetchAgentStatistics]);

  return {
    statistics,
    loading,
    error,
    fetchAgentStatistics,
    refreshStatistics,
  };
};

export const useBrokerAnalytics = (): UseBrokerAnalyticsReturn => {
  const [statistics, setStatistics] = useState<BrokerStatistics | null>(null);
  const [teamAnalytics, setTeamAnalytics] = useState<TeamAnalytics[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBrokerStatistics = useCallback(async (brokerId?: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await analyticsService.getBrokerStatistics(brokerId);
      setStatistics(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch broker statistics');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchTeamAnalytics = useCallback(async (teamId?: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await analyticsService.getTeamAnalytics(teamId);
      setTeamAnalytics(Array.isArray(data) ? data : [data]);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch team analytics');
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshAll = useCallback(async () => {
    await Promise.all([
      fetchBrokerStatistics(),
      fetchTeamAnalytics(),
    ]);
  }, [fetchBrokerStatistics, fetchTeamAnalytics]);

  useEffect(() => {
    refreshAll();
  }, [refreshAll]);

  return {
    statistics,
    teamAnalytics,
    loading,
    error,
    fetchBrokerStatistics,
    fetchTeamAnalytics,
    refreshAll,
  };
};
=======
    fetchDashboard,
    fetchSales,
    fetchLeads,
    fetchInventory,
    fetchRevenue,
  };
};
>>>>>>> main
