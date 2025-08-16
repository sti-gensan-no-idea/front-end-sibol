import { useState, useEffect, useCallback } from "react";

import { dataService, type Notification } from "../services";

interface UseNotificationsReturn {
  notifications: Notification[];
  loading: boolean;
  error: string | null;
  unreadCount: number;
  fetchNotifications: () => Promise<void>;
  markAsRead: (id: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  getUnreadNotifications: () => Notification[];
  getNotificationsByType: (type: string) => Notification[];
}

export const useNotifications = (): UseNotificationsReturn => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNotifications = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await dataService.getNotifications();

      setNotifications(data);
    } catch (err: any) {
      setError(err.message || "Failed to fetch notifications");
    } finally {
      setLoading(false);
    }
  }, []);

  const markAsRead = useCallback(async (id: string) => {
    try {
      await dataService.markNotificationAsRead(id);
      setNotifications((prev) =>
        prev.map((notification) =>
          notification.id === id
            ? { ...notification, read: true }
            : notification,
        ),
      );
    } catch (err: any) {
      setError(err.message || "Failed to mark notification as read");
    }
  }, []);

  const markAllAsRead = useCallback(async () => {
    try {
      await dataService.markAllNotificationsAsRead();
      setNotifications((prev) =>
        prev.map((notification) => ({ ...notification, read: true })),
      );
    } catch (err: any) {
      setError(err.message || "Failed to mark all notifications as read");
    }
  }, []);

  const getUnreadNotifications = useCallback((): Notification[] => {
    return notifications.filter((notification) => !notification.read);
  }, [notifications]);

  const getNotificationsByType = useCallback(
    (type: string): Notification[] => {
      return notifications.filter((notification) => notification.type === type);
    },
    [notifications],
  );

  const unreadCount = getUnreadNotifications().length;

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  return {
    notifications,
    loading,
    error,
    unreadCount,
    fetchNotifications,
    markAsRead,
    markAllAsRead,
    getUnreadNotifications,
    getNotificationsByType,
  };
};
