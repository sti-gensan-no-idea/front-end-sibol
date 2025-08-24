// Authentication Slice
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { apiClient } from '../../services/api/apiClient';
import { TokenResponse, LoginCredentials, UserRole } from '../../types/api';
import { STORAGE_KEYS } from '../../config/api';

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  userId: string | null;
  role: UserRole | null;
  loading: boolean;
  error: string | null;
  isSessionExpired: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false,
  token: localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN),
  userId: localStorage.getItem(STORAGE_KEYS.USER_ID),
  role: localStorage.getItem(STORAGE_KEYS.USER_ROLE) as UserRole | null,
  loading: false,
  error: null,
  isSessionExpired: false,
};

// Async thunks for authentication
export const login = createAsyncThunk(
  'auth/login',
  async ({ credentials, role }: { credentials: LoginCredentials; role: UserRole }) => {
    const endpoint = role === 'client' ? '/auth/signin' : `/auth/${role}/signin`;
    const response = await apiClient.post<TokenResponse>(endpoint, credentials);
    
    // Store tokens in localStorage
    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, response.access_token);
    localStorage.setItem(STORAGE_KEYS.USER_ID, response.user_id);
    localStorage.setItem(STORAGE_KEYS.USER_ROLE, response.role);
    
    // Set token in API client
    apiClient.setToken(response.access_token);
    
    return response;
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async ({ data, role }: { data: any; role: UserRole }) => {
    const endpoint = `/register/${role}`;
    const response = await apiClient.post(endpoint, data);
    return response;
  }
);

export const logout = createAsyncThunk('auth/logout', async () => {
  // Clear localStorage
  localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
  localStorage.removeItem(STORAGE_KEYS.USER_ID);
  localStorage.removeItem(STORAGE_KEYS.USER_ROLE);
  localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
  
  // Clear token from API client
  apiClient.clearToken();
  
  return null;
});

export const refreshToken = createAsyncThunk(
  'auth/refreshToken',
  async () => {
    const refreshToken = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }
    
    const response = await apiClient.post<TokenResponse>('/auth/refresh', {
      refresh_token: refreshToken,
    });
    
    // Update tokens
    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, response.access_token);
    apiClient.setToken(response.access_token);
    
    return response;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, action.payload);
      apiClient.setToken(action.payload);
    },
    clearAuth: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.userId = null;
      state.role = null;
      state.error = null;
      state.isSessionExpired = false;
    },
    setSessionExpired: (state, action: PayloadAction<boolean>) => {
      state.isSessionExpired = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    checkAuthStatus: (state) => {
      const token = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
      const userId = localStorage.getItem(STORAGE_KEYS.USER_ID);
      const role = localStorage.getItem(STORAGE_KEYS.USER_ROLE) as UserRole;
      
      if (token && userId && role) {
        state.isAuthenticated = true;
        state.token = token;
        state.userId = userId;
        state.role = role;
        apiClient.setToken(token);
      }
    },
  },
  extraReducers: (builder) => {
    // Login
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.token = action.payload.access_token;
        state.userId = action.payload.user_id;
        state.role = action.payload.role as UserRole;
        state.error = null;
        state.isSessionExpired = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Login failed';
        state.isAuthenticated = false;
      });

    // Register
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Registration failed';
      });

    // Logout
    builder
      .addCase(logout.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.token = null;
        state.userId = null;
        state.role = null;
        state.error = null;
        state.isSessionExpired = false;
      });

    // Refresh Token
    builder
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.token = action.payload.access_token;
        state.isSessionExpired = false;
      })
      .addCase(refreshToken.rejected, (state) => {
        state.isSessionExpired = true;
        state.isAuthenticated = false;
      });
  },
});

export const { setToken, clearAuth, setSessionExpired, clearError, checkAuthStatus } = authSlice.actions;
export default authSlice.reducer;
