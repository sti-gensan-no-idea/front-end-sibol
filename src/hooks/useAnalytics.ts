import { useState, useEffect, useCallback } from "react";

import {
  analyticsService,
  type DashboardAnalytics,
  type SalesAnalytics,
  type LeadsAnalytics,
  type InventoryAnalytics,
  type RevenueAnalytics,
  type AgentStatistics,
  type BrokerStatistics,
  type TeamAnalytics,
} from "../services";

interface UseAnalyticsOptions {
  autoFetch?: boolean;
  refreshInterval?: number; // in milliseconds
}

interface UseAnalyticsReturn {
  dashboard: DashboardAnalytics | null;
  salesData: SalesAnalytics | null;
  leadsData: LeadsAnalytics | null;
  inventoryData: InventoryAnalytics | null;
  revenueData: RevenueAnalytics | null;
  loading: boolean;
  error: string | null;
  fetchDashboard: () => Promise<void>;
  fetchSales: (params?: {
    start_date?: string;
    end_date?: string;
    property_type?: string;
  }) => Promise<void>;
  fetchLeads: (params?: {
    start_date?: string;
    end_date?: string;
    agent_id?: string;
  }) => Promise<void>;
  fetchInventory: () => Promise<void>;
  fetchRevenue: (params?: {
    start_date?: string;
    end_date?: string;
    period?: "monthly" | "quarterly" | "yearly";
  }) => Promise<void>;
  refreshAll: () => Promise<void>;
  exportData: (
    type: "sales" | "leads" | "inventory" | "revenue",
    format?: "csv" | "excel"
  ) => Promise<Blob | null>;
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

export const useAnalytics = (
  options: UseAnalyticsOptions = {}
): UseAnalyticsReturn => {
  const { autoFetch = true, refreshInterval } = options;

  const [dashboard, setDashboard] = useState<DashboardAnalytics | null>(null);
  const [salesData, setSalesData] = useState<SalesAnalytics | null>(null);
  const [leadsData, setLeadsData] = useState<LeadsAnalytics | null>(null);
  const [inventoryData, setInventoryData] = useState<InventoryAnalytics | null>(
    null
  );
  const [revenueData, setRevenueData] = useState<RevenueAnalytics | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboard = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await analyticsService.getDashboardAnalytics();

      setDashboard(data);
    } catch (err: any) {
      setError(err.message || "Failed to fetch dashboard analytics");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchSales = useCallback(
    async (params?: {
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
        setError(err.message || "Failed to fetch sales analytics");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const fetchLeads = useCallback(
    async (params?: {
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
        setError(err.message || "Failed to fetch leads analytics");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const fetchInventory = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await analyticsService.getInventoryAnalytics();

      setInventoryData(data);
    } catch (err: any) {
      setError(err.message || "Failed to fetch inventory analytics");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchRevenue = useCallback(
    async (params?: {
      start_date?: string;
      end_date?: string;
      period?: "monthly" | "quarterly" | "yearly";
    }) => {
      setLoading(true);
      setError(null);
      try {
        const data = await analyticsService.getRevenueAnalytics(params);

        setRevenueData(data);
      } catch (err: any) {
        setError(err.message || "Failed to fetch revenue analytics");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const refreshAll = useCallback(async () => {
    await Promise.all([
      fetchDashboard(),
      fetchSales(),
      fetchLeads(),
      fetchInventory(),
      fetchRevenue(),
    ]);
  }, [fetchDashboard, fetchSales, fetchLeads, fetchInventory, fetchRevenue]);

  const exportData = useCallback(
    async (
      type: "sales" | "leads" | "inventory" | "revenue",
      format: "csv" | "excel" = "csv"
    ): Promise<Blob | null> => {
      setLoading(true);
      setError(null);
      try {
        const blob = await analyticsService.exportAnalyticsData(type, format);

        return blob;
      } catch (err: any) {
        setError(err.message || "Failed to export data");

        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Auto-refresh functionality
  useEffect(() => {
    if (autoFetch) {
      refreshAll();
    }
  }, [autoFetch, refreshAll]);

  useEffect(() => {
    if (refreshInterval && refreshInterval > 0) {
      const interval = setInterval(refreshAll, refreshInterval);

      return () => clearInterval(interval);
    }
  }, [refreshInterval, refreshAll]);

  return {
    dashboard,
    salesData,
    leadsData,
    inventoryData,
    revenueData,
    loading,
    error,
    fetchDashboard,
    fetchSales,
    fetchLeads,
    fetchInventory,
    fetchRevenue,
    refreshAll,
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
      setError(err.message || "Failed to fetch agent statistics");
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
      setError(err.message || "Failed to fetch broker statistics");
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
      setError(err.message || "Failed to fetch team analytics");
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshAll = useCallback(async () => {
    await Promise.all([fetchBrokerStatistics(), fetchTeamAnalytics()]);
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
