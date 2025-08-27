// Maintenance Redux Slice
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from '../../services/api/apiClient';
import { MaintenanceRequestCreate, MaintenanceRequestUpdate } from '../../types/apiTypes';

interface MaintenanceState {
  requests: any[];
  selectedRequest: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: MaintenanceState = {
  requests: [],
  selectedRequest: null,
  loading: false,
  error: null,
};

export const createMaintenanceRequest = createAsyncThunk(
  'maintenance/create',
  async (data: MaintenanceRequestCreate) => {
    return await apiClient.post('/maintenance/', data);
  }
);

export const fetchMaintenanceRequests = createAsyncThunk(
  'maintenance/fetchAll',
  async (statusFilter?: string) => {
    const params = statusFilter ? { status_filter: statusFilter } : undefined;
    return await apiClient.get<any[]>('/maintenance/', { params });
  }
);

export const updateMaintenanceRequest = createAsyncThunk(
  'maintenance/update',
  async ({ requestId, data }: { requestId: string; data: MaintenanceRequestUpdate }) => {
    return await apiClient.put(`/maintenance/${requestId}`, data);
  }
);

export const fetchMaintenanceRequest = createAsyncThunk(
  'maintenance/fetchOne',
  async (requestId: string) => {
    return await apiClient.get(`/maintenance/${requestId}`);
  }
);

const maintenanceSlice = createSlice({
  name: 'maintenance',
  initialState,
  reducers: {
    setSelectedRequest: (state, action) => {
      state.selectedRequest = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createMaintenanceRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createMaintenanceRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.requests.unshift(action.payload);
      })
      .addCase(createMaintenanceRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create maintenance request';
      })
      .addCase(fetchMaintenanceRequests.fulfilled, (state, action) => {
        state.requests = action.payload;
      })
      .addCase(updateMaintenanceRequest.fulfilled, (state, action) => {
        const index = state.requests.findIndex(r => r.id === action.payload.id);
        if (index !== -1) {
          state.requests[index] = action.payload;
        }
        if (state.selectedRequest?.id === action.payload.id) {
          state.selectedRequest = action.payload;
        }
      })
      .addCase(fetchMaintenanceRequest.fulfilled, (state, action) => {
        state.selectedRequest = action.payload;
      });
  },
});

export const { setSelectedRequest, clearError } = maintenanceSlice.actions;
export default maintenanceSlice.reducer;
