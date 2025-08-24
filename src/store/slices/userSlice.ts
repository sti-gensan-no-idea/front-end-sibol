// User Redux Slice
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { apiClient } from '../../services/api/apiClient';
import { User, UserUpdate, UserResponse } from '../../types/apiTypes';

interface UserState {
  currentUser: UserResponse | null;
  users: UserResponse[];
  loading: boolean;
  error: string | null;
  profileUpdateSuccess: boolean;
}

const initialState: UserState = {
  currentUser: null,
  users: [],
  loading: false,
  error: null,
  profileUpdateSuccess: false,
};

// Async thunks
export const fetchCurrentUser = createAsyncThunk(
  'user/fetchCurrent',
  async () => {
    return await apiClient.get<UserResponse>('/users/me');
  }
);

export const updateUserProfile = createAsyncThunk(
  'user/updateProfile',
  async ({ userId, data }: { userId: string; data: UserUpdate }) => {
    return await apiClient.put<UserResponse>(`/users/${userId}`, data);
  }
);

export const fetchUsers = createAsyncThunk(
  'user/fetchAll',
  async (params?: { role?: string; limit?: number; offset?: number }) => {
    return await apiClient.getPaginated<UserResponse>('/users', params);
  }
);

export const fetchUserById = createAsyncThunk(
  'user/fetchById',
  async (userId: string) => {
    return await apiClient.get<UserResponse>(`/users/${userId}`);
  }
);

export const deactivateUser = createAsyncThunk(
  'user/deactivate',
  async (userId: string) => {
    return await apiClient.put<UserResponse>(`/users/${userId}`, { is_active: false });
  }
);

export const activateUser = createAsyncThunk(
  'user/activate',
  async (userId: string) => {
    return await apiClient.put<UserResponse>(`/users/${userId}`, { is_active: true });
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<UserResponse | null>) => {
      state.currentUser = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    resetProfileUpdateSuccess: (state) => {
      state.profileUpdateSuccess = false;
    },
  },
  extraReducers: (builder) => {
    // Fetch current user
    builder
      .addCase(fetchCurrentUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch user profile';
      });

    // Update user profile
    builder
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.profileUpdateSuccess = false;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
        state.profileUpdateSuccess = true;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update profile';
        state.profileUpdateSuccess = false;
      });

    // Fetch all users
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload.items as UserResponse[];
      });

    // Deactivate/Activate user
    builder
      .addCase(deactivateUser.fulfilled, (state, action) => {
        const index = state.users.findIndex(u => u.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      .addCase(activateUser.fulfilled, (state, action) => {
        const index = state.users.findIndex(u => u.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      });
  },
});

export const { setCurrentUser, clearError, resetProfileUpdateSuccess } = userSlice.actions;
export default userSlice.reducer;
