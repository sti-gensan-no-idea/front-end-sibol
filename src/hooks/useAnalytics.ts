import { useState, useEffect, useCallback } from 'react';
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
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchSales = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await dataService.getSalesAnalytics();
      setSalesData(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch sales data');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await dataService.getLeadsAnalytics();
      setLeadsData(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch leads data');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchInventory = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await dataService.getInventoryAnalytics();
      setInventoryData(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch inventory data');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchRevenue = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await dataService.getRevenueAnalytics();
      setRevenueData(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch revenue data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

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
  };
};
