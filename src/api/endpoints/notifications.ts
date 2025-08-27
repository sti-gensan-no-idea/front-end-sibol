// Notifications API Endpoints
import api from '../core/apiService';
import { Notification, NotificationCreate, PaginatedResponse } from '../types';

class NotificationsAPI {
  async getNotifications(params?: {
    limit?: number;
    offset?: number;
  }): Promise<PaginatedResponse<Notification>> {
    return api.get<PaginatedResponse<Notification>>('/notifications/', { params });
  }

  async createNotification(targetUserId: string, data: NotificationCreate): Promise<Notification> {
    return api.post<Notification>(`/notifications/?target_user_id=${targetUserId}`, data);
  }

  async markAllAsRead(): Promise<void> {
    return api.put<void>('/notifications/');
  }

  async deleteNotification(notificationId: string): Promise<void> {
    return api.delete<void>(`/notifications/${notificationId}`);
  }

  async getUnreadCount(): Promise<number> {
    const response = await this.getNotifications({ limit: 100 });
    const unreadNotifications = response.items.filter(n => !n.is_read);
    return unreadNotifications.length;
  }

  async markAsRead(notificationId: string): Promise<void> {
    return api.put<void>(`/notifications/${notificationId}/read`);
  }
}

export const notificationsAPI = new NotificationsAPI();
export default notificationsAPI;
