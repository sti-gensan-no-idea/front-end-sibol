// Account Management Redux Slice
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from '../../services/api/apiClient';
import { UserPendingResponse, UserResponse, AccountRejection, AccountBan } from '../../types/apiTypes';

interface AccountState {
  pendingAccounts: UserPendingResponse[];
  approvedAccounts: UserResponse[];
  rejectedAccounts: UserResponse[];
  bannedAccounts: UserResponse[];
  deletedAccounts: UserResponse[];
  loading: boolean;
  error: string | null;
}

const initialState: AccountState = {
  pendingAccounts: [],
  approvedAccounts: [],
  rejectedAccounts: [],
  bannedAccounts: [],
  deletedAccounts: [],
  loading: false,
  error: null,
};

export const fetchPendingAccounts = createAsyncThunk(
  'accounts/fetchPending',
  async (params?: { skip?: number; limit?: number }) => {
    return await apiClient.get<UserPendingResponse[]>('/accounts/pending', { params });
  }
);

export const fetchApprovedAccounts = createAsyncThunk(
  'accounts/fetchApproved',
  async (params?: { skip?: number; limit?: number }) => {
    return await apiClient.get<UserResponse[]>('/accounts/approved', { params });
  }
);

export const fetchRejectedAccounts = createAsyncThunk(
  'accounts/fetchRejected',
  async (params?: { skip?: number; limit?: number }) => {
    return await apiClient.get<UserResponse[]>('/accounts/rejected', { params });
  }
);

export const fetchBannedAccounts = createAsyncThunk(
  'accounts/fetchBanned',
  async (params?: { skip?: number; limit?: number }) => {
    return await apiClient.get<UserResponse[]>('/accounts/banned', { params });
  }
);

export const fetchDeletedAccounts = createAsyncThunk(
  'accounts/fetchDeleted',
  async (params?: { skip?: number; limit?: number }) => {
    return await apiClient.get<UserResponse[]>('/accounts/deleted', { params });
  }
);

export const approveAccount = createAsyncThunk(
  'accounts/approve',
  async (userId: string) => {
    await apiClient.put(`/accounts/approve/${userId}`);
    return userId;
  }
);

export const rejectAccount = createAsyncThunk(
  'accounts/reject',
  async ({ userId, reason }: { userId: string; reason: string }) => {
    const data: AccountRejection = { reason };
    await apiClient.put(`/accounts/reject/${userId}`, data);
    return userId;
  }
);

export const banAccount = createAsyncThunk(
  'accounts/ban',
  async ({ userId, reason }: { userId: string; reason: string }) => {
    const data: AccountBan = { reason };
    await apiClient.put(`/accounts/ban/${userId}`, data);
    return userId;
  }
);

export const unbanAccount = createAsyncThunk(
  'accounts/unban',
  async (userId: string) => {
    await apiClient.put(`/accounts/unban/${userId}`);
    return userId;
  }
);

const accountSlice = createSlice({
  name: 'accounts',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPendingAccounts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPendingAccounts.fulfilled, (state, action) => {
        state.loading = false;
        state.pendingAccounts = action.payload;
      })
      .addCase(fetchPendingAccounts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch pending accounts';
      })
      .addCase(fetchApprovedAccounts.fulfilled, (state, action) => {
        state.approvedAccounts = action.payload;
      })
      .addCase(fetchRejectedAccounts.fulfilled, (state, action) => {
        state.rejectedAccounts = action.payload;
      })
      .addCase(fetchBannedAccounts.fulfilled, (state, action) => {
        state.bannedAccounts = action.payload;
      })
      .addCase(fetchDeletedAccounts.fulfilled, (state, action) => {
        state.deletedAccounts = action.payload;
      })
      .addCase(approveAccount.fulfilled, (state, action) => {
        state.pendingAccounts = state.pendingAccounts.filter(a => a.id !== action.payload);
      })
      .addCase(rejectAccount.fulfilled, (state, action) => {
        state.pendingAccounts = state.pendingAccounts.filter(a => a.id !== action.payload);
      })
      .addCase(banAccount.fulfilled, (state, action) => {
        state.approvedAccounts = state.approvedAccounts.filter(a => a.id !== action.payload);
      })
      .addCase(unbanAccount.fulfilled, (state, action) => {
        state.bannedAccounts = state.bannedAccounts.filter(a => a.id !== action.payload);
      });
  },
});

export const { clearError } = accountSlice.actions;
export default accountSlice.reducer;
