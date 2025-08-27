// Analytics Redux Slice
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { analyticsService } from '../../services/api/analyticsService';
import { DashboardAnalytics, SalesAnalytics, LeadsAnalytics, InventoryAnalytics } from '../../types/apiTypes';

interface AnalyticsState {
  dashboard: DashboardAnalytics | null;
  sales: SalesAnalytics | null;
  leads: LeadsAnalytics | null;
  inventory: InventoryAnalytics | null;
  revenue: any;
  agentPerformance: any;
  conversionFunnel: any;
  propertyPerformance: any;
  loading: boolean;
  error: string | null;
}

const initialState: AnalyticsState = {
  dashboard: null,
  sales: null,
  leads: null,
  inventory: null,
  revenue: null,
  agentPerformance: null,
  conversionFunnel: null,
  propertyPerformance: null,
  loading: false,
  error: null,
};

export const fetchDashboardAnalytics = createAsyncThunk(
  'analytics/fetchDashboard',
  async () => {
    return await analyticsService.getDashboardAnalytics();
  }
);

export const fetchSalesAnalytics = createAsyncThunk(
  'analytics/fetchSales',
  async ({ startDate, endDate }: { startDate?: Date; endDate?: Date }) => {
    return await analyticsService.getSalesAnalytics(startDate, endDate);
  }
);

export const fetchLeadsAnalytics = createAsyncThunk(
  'analytics/fetchLeads',
  async ({ startDate, endDate }: { startDate?: Date; endDate?: Date }) => {
    return await analyticsService.getLeadsAnalytics(startDate, endDate);
  }
);

export const fetchInventoryAnalytics = createAsyncThunk(
  'analytics/fetchInventory',
  async (projectName?: string) => {
    return await analyticsService.getInventoryAnalytics(projectName);
  }
);

export const fetchRevenueAnalytics = createAsyncThunk(
  'analytics/fetchRevenue',
  async ({ period, startDate, endDate }: {
    period?: 'daily' | 'weekly' | 'monthly' | 'yearly';
    startDate?: Date;
    endDate?: Date;
  }) => {
    return await analyticsService.getRevenueAnalytics(period || 'monthly', startDate, endDate);
  }
);

export const fetchAgentPerformance = createAsyncThunk(
  'analytics/fetchAgentPerformance',
  async ({ agentId, teamId }: { agentId?: string; teamId?: string }) => {
    return await analyticsService.getAgentPerformance(agentId, teamId);
  }
);

export const fetchConversionFunnel = createAsyncThunk(
  'analytics/fetchConversionFunnel',
  async ({ startDate, endDate }: { startDate?: Date; endDate?: Date }) => {
    return await analyticsService.getConversionFunnel(startDate, endDate);
  }
);

export const fetchPropertyPerformance = createAsyncThunk(
  'analytics/fetchPropertyPerformance',
  async ({ propertyId, projectName }: { propertyId?: string; projectName?: string }) => {
    return await analyticsService.getPropertyPerformance(propertyId, projectName);
  }
);

const analyticsSlice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Dashboard Analytics
    builder
      .addCase(fetchDashboardAnalytics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardAnalytics.fulfilled, (state, action) => {
        state.loading = false;
        state.dashboard = action.payload;
      })
      .addCase(fetchDashboardAnalytics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch dashboard analytics';
      });

    // Sales Analytics
    builder
      .addCase(fetchSalesAnalytics.fulfilled, (state, action) => {
        state.sales = action.payload;
      });

    // Leads Analytics
    builder
      .addCase(fetchLeadsAnalytics.fulfilled, (state, action) => {
        state.leads = action.payload;
      });

    // Inventory Analytics
    builder
      .addCase(fetchInventoryAnalytics.fulfilled, (state, action) => {
        state.inventory = action.payload;
      });

    // Revenue Analytics
    builder
      .addCase(fetchRevenueAnalytics.fulfilled, (state, action) => {
        state.revenue = action.payload;
      });

    // Agent Performance
    builder
      .addCase(fetchAgentPerformance.fulfilled, (state, action) => {
        state.agentPerformance = action.payload;
      });

    // Conversion Funnel
    builder
      .addCase(fetchConversionFunnel.fulfilled, (state, action) => {
        state.conversionFunnel = action.payload;
      });

    // Property Performance
    builder
      .addCase(fetchPropertyPerformance.fulfilled, (state, action) => {
        state.propertyPerformance = action.payload;
      });
  },
});

export const { clearError } = analyticsSlice.actions;
export default analyticsSlice.reducer;
