// Temporary placeholder hook until full analytics integration
import { useState } from "react";

interface UseAnalyticsOptions {
  autoFetch?: boolean;
  refreshInterval?: number;
}

interface PlaceholderAnalytics {
  loading: boolean;
  error: string | null;
  dashboard: any;
  dashboardData: any;
}

export const useAnalytics = (options?: UseAnalyticsOptions): PlaceholderAnalytics => {
  const [loading] = useState(false);
  const [error] = useState<string | null>(null);

  const mockData = {
    total_properties: 0,
    active_properties: 0,
    total_users: 0,
    active_users: 0,
    total_revenue: 0,
    monthly_revenue: 0,
    total_sales: 0,
    total_leads: 0,
    revenue: 0,
    top_performing_agents: [],
    recent_activities: [],
  };

  return {
    loading,
    error,
    dashboard: mockData,
    dashboardData: mockData,
  };
};
