// Notification Redux Slice
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { notificationService } from '../../services/api/eventNotificationService';
import { NotificationCreate, NotificationResponse } from '../../types/apiTypes';

interface NotificationState {
  notifications: NotificationResponse[];
  unreadCount: number;
  loading: boolean;
  error: string | null;
  hasMore: boolean;
}

const initialState: NotificationState = {
  notifications: [],
  unreadCount: 0,
  loading: false,
  error: null,
  hasMore: false,
};

export const fetchNotifications = createAsyncThunk(
  'notifications/fetchAll',
  async (params?: { limit?: number; offset?: number }) => {
    return await notificationService.getNotifications(params);
  }
);

export const markAllAsRead = createAsyncThunk(
  'notifications/markAllRead',
  async () => {
    await notificationService.markAllAsRead();
  }
);

export const markAsRead = createAsyncThunk(
  'notifications/markRead',
  async (notificationId: string) => {
    await notificationService.markAsRead(notificationId);
    return notificationId;
  }
);

export const deleteNotification = createAsyncThunk(
  'notifications/delete',
  async (notificationId: string) => {
    await notificationService.deleteNotification(notificationId);
    return notificationId;
  }
);

export const createNotification = createAsyncThunk(
  'notifications/create',
  async ({ targetUserId, data }: { targetUserId: string; data: NotificationCreate }) => {
    return await notificationService.createNotification(targetUserId, data);
  }
);

export const fetchUnreadCount = createAsyncThunk(
  'notifications/fetchUnreadCount',
  async () => {
    return await notificationService.getUnreadCount();
  }
);

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification: (state, action) => {
      state.notifications.unshift(action.payload);
      if (!action.payload.is_read) {
        state.unreadCount++;
      }
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = action.payload.items as NotificationResponse[];
        state.hasMore = action.payload.hasNext;
        state.unreadCount = state.notifications.filter(n => !n.is_read).length;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch notifications';
      })
      .addCase(markAllAsRead.fulfilled, (state) => {
        state.notifications = state.notifications.map(n => ({ ...n, is_read: true }));
        state.unreadCount = 0;
      })
      .addCase(markAsRead.fulfilled, (state, action) => {
        const index = state.notifications.findIndex(n => n.id === action.payload);
        if (index !== -1) {
          state.notifications[index].is_read = true;
          state.unreadCount = Math.max(0, state.unreadCount - 1);
        }
      })
      .addCase(deleteNotification.fulfilled, (state, action) => {
        const notification = state.notifications.find(n => n.id === action.payload);
        if (notification && !notification.is_read) {
          state.unreadCount = Math.max(0, state.unreadCount - 1);
        }
        state.notifications = state.notifications.filter(n => n.id !== action.payload);
      })
      .addCase(createNotification.fulfilled, (state, action) => {
        state.notifications.unshift(action.payload);
      })
      .addCase(fetchUnreadCount.fulfilled, (state, action) => {
        state.unreadCount = action.payload;
      });
  },
});

export const { addNotification, clearError } = notificationSlice.actions;
export default notificationSlice.reducer;
