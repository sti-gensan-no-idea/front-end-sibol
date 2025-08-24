// Events and Notifications API Services
import { apiClient } from './apiClient';
import {
  Event,
  EventCreate,
  EventUpdate,
  EventResponse,
  EventDetailResponse,
  Notification,
  NotificationCreate,
  NotificationResponse,
  PaginatedResponse,
} from '../../types/apiTypes';

class EventService {
  // Get monthly events
  async getMonthlyEvents(params?: {
    skip?: number;
    limit?: number;
    month?: number;
    year?: number;
  }): Promise<EventResponse[]> {
    return apiClient.get<EventResponse[]>('/events/', { params });
  }

  // Create event
  async createEvent(data: EventCreate): Promise<EventResponse> {
    return apiClient.post<EventResponse>('/events/', data);
  }

  // Get event details
  async getEventDetails(eventId: string): Promise<EventDetailResponse> {
    return apiClient.get<EventDetailResponse>(`/events/${eventId}`);
  }

  // Update event
  async updateEvent(eventId: string, data: EventUpdate): Promise<EventResponse> {
    return apiClient.put<EventResponse>(`/events/${eventId}`, data);
  }

  // Cancel event
  async cancelEvent(eventId: string): Promise<void> {
    return apiClient.delete<void>(`/events/${eventId}`);
  }

  // Get upcoming events
  async getUpcomingEvents(limit: number = 10): Promise<EventResponse[]> {
    const now = new Date();
    return this.getMonthlyEvents({
      month: now.getMonth() + 1,
      year: now.getFullYear(),
      limit,
    });
  }

  // Get events by property
  async getEventsByProperty(propertyId: string): Promise<EventResponse[]> {
    return apiClient.get<EventResponse[]>(`/events/?property_id=${propertyId}`);
  }

  // Get events by date range
  async getEventsByDateRange(startDate: Date, endDate: Date): Promise<EventResponse[]> {
    return apiClient.get<EventResponse[]>('/events/', {
      params: {
        start_date: startDate.toISOString(),
        end_date: endDate.toISOString(),
      },
    });
  }
}

class NotificationService {
  // Get notifications
  async getNotifications(params?: {
    limit?: number;
    offset?: number;
  }): Promise<PaginatedResponse> {
    return apiClient.getPaginated<NotificationResponse>('/notifications/', params);
  }

  // Create notification (admin/developer/broker only)
  async createNotification(
    targetUserId: string,
    data: NotificationCreate
  ): Promise<NotificationResponse> {
    return apiClient.post<NotificationResponse>(
      `/notifications/?target_user_id=${targetUserId}`,
      data
    );
  }

  // Mark all notifications as read
  async markAllAsRead(): Promise<void> {
    return apiClient.put<void>('/notifications/');
  }

  // Delete notification
  async deleteNotification(notificationId: string): Promise<void> {
    return apiClient.delete<void>(`/notifications/${notificationId}`);
  }

  // Get unread count
  async getUnreadCount(): Promise<number> {
    const response = await this.getNotifications({ limit: 100 });
    const unreadNotifications = (response.items as NotificationResponse[]).filter(
      (n) => !n.is_read
    );
    return unreadNotifications.length;
  }

  // Mark single notification as read
  async markAsRead(notificationId: string): Promise<void> {
    return apiClient.put<void>(`/notifications/${notificationId}/read`);
  }

  // Subscribe to real-time notifications (WebSocket implementation)
  subscribeToNotifications(userId: string, onNotification: (notification: NotificationResponse) => void): () => void {
    // This would be implemented with WebSocket connection
    // For now, we'll use polling as a fallback
    const intervalId = setInterval(async () => {
      try {
        const response = await this.getNotifications({ limit: 1 });
        const latestNotification = response.items[0] as NotificationResponse;
        if (latestNotification && !latestNotification.is_read) {
          onNotification(latestNotification);
        }
      } catch (error) {
        console.error('Error polling notifications:', error);
      }
    }, 30000); // Poll every 30 seconds

    // Return cleanup function
    return () => clearInterval(intervalId);
  }
}

export const eventService = new EventService();
export const notificationService = new NotificationService();
