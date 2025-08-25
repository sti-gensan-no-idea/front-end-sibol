import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Avatar, Button, Pagination, Tooltip, Spinner, Card, CardBody } from "@heroui/react";
import { IconBell, IconCheck, IconTrash, IconAlertCircle, IconBellOff } from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";

import { 
  useGetNotificationsNotificationsGet,
  useMarkAllNotificationsAsReadNotificationsPut,
  useDeleteNotificationNotificationsNotificationIdDelete
} from "@/lib/api/generated/atuna-client";

const ITEMS_PER_PAGE = 15;

export const Notification = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const queryParams = new URLSearchParams(location.search);
  const initialPage = parseInt(queryParams.get("page") || "1", 10);
  const [page, setPage] = useState<number>(isNaN(initialPage) ? 1 : initialPage);

  // Fetch notifications from API
  const {
    data: notificationsResponse,
    isLoading,
    error,
    refetch
  } = useGetNotificationsNotificationsGet({
    limit: ITEMS_PER_PAGE,
    offset: (page - 1) * ITEMS_PER_PAGE,
  });

  const markAllAsReadMutation = useMarkAllNotificationsAsReadNotificationsPut();
  const deleteNotificationMutation = useDeleteNotificationNotificationsNotificationIdDelete();

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    queryParams.set("page", String(newPage));
    navigate(`${location.pathname}?${queryParams.toString()}`);
  };

  const handleMarkAllAsRead = async () => {
    try {
      await markAllAsReadMutation.mutateAsync();
      queryClient.invalidateQueries({ queryKey: ["getNotificationsNotificationsGet"] });
    } catch (error) {
      console.error("Failed to mark all notifications as read:", error);
    }
  };

  const handleDeleteNotification = async (notificationId: string) => {
    try {
      await deleteNotificationMutation.mutateAsync({ notificationId });
      queryClient.invalidateQueries({ queryKey: ["getNotificationsNotificationsGet"] });
    } catch (error) {
      console.error("Failed to delete notification:", error);
    }
  };

  const notifications = notificationsResponse?.data?.items || [];
  const totalPages = notificationsResponse?.data?.total ? Math.ceil(notificationsResponse.data.total / ITEMS_PER_PAGE) : 1;

  if (isLoading) {
    return (
      <div className="p-4 sm:p-6 md:p-8 rounded-large shadow-medium bg-white">
        <div className="flex items-center md:items-start justify-between mb-6">
          <div className="flex items-center">
            <IconBell className="text-gray-500" size={26} />
            <span className="text-lg font-bold ml-2 text-foreground-700">
              Notifications
            </span>
          </div>
        </div>
        
        <div className="flex justify-center items-center min-h-[300px]">
          <div className="text-center">
            <Spinner size="lg" className="mb-4" />
            <p className="text-gray-600">Loading notifications...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 sm:p-6 md:p-8 rounded-large shadow-medium bg-white">
        <div className="flex items-center md:items-start justify-between mb-6">
          <div className="flex items-center">
            <IconBell className="text-gray-500" size={26} />
            <span className="text-lg font-bold ml-2 text-foreground-700">
              Notifications
            </span>
          </div>
        </div>
        
        <div className="flex justify-center items-center min-h-[300px]">
          <Card className="w-full max-w-md">
            <CardBody className="p-8 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <IconAlertCircle className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900">
                Failed to Load Notifications
              </h3>
              <p className="text-gray-600 mb-4">
                There was an error loading your notifications. Please try again.
              </p>
              <Button color="primary" onPress={() => refetch()}>
                Try Again
              </Button>
            </CardBody>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 md:p-8 rounded-large shadow-medium bg-white">
      {/* Header */}
      <div className="flex items-center md:items-start justify-between">
        <div className="flex items-center">
          <IconBell className="text-gray-500" size={26} />
          <span className="text-lg font-bold ml-2 text-foreground-700">
            Notifications
          </span>
          {notifications.length > 0 && (
            <span className="ml-2 text-sm text-gray-500">
              ({notifications.length} {notifications.length === 1 ? 'item' : 'items'})
            </span>
          )}
        </div>
        {notifications.length > 0 && (
          <Button 
            color="primary" 
            startContent={<IconCheck />} 
            variant="flat"
            isLoading={markAllAsReadMutation.isPending}
            onPress={handleMarkAllAsRead}
          >
            Mark all as read
          </Button>
        )}
      </div>

      {/* Empty state */}
      {notifications.length === 0 && (
        <div className="flex justify-center items-center min-h-[300px]">
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <IconBellOff className="w-8 h-8 text-gray-500" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-gray-900">
              No Notifications
            </h3>
            <p className="text-gray-600">
              You're all caught up! No new notifications at the moment.
            </p>
          </div>
        </div>
      )}

      {/* Notification items */}
      {notifications.length > 0 && (
        <>
          <ul className="mt-4 space-y-2">
            {notifications.map((notification: any) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onDelete={handleDeleteNotification}
                isDeleting={deleteNotificationMutation.isPending}
              />
            ))}
          </ul>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-6 flex justify-center">
              <Pagination
                color="primary"
                page={page}
                size="lg"
                total={totalPages}
                onChange={handlePageChange}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

interface NotificationItemProps {
  notification: any; // TODO: Replace with proper NotificationResponse type when available
  onDelete: (notificationId: string) => void;
  isDeleting: boolean;
}

const NotificationItem = ({ notification, onDelete, isDeleting }: NotificationItemProps) => {
  // Format notification data
  const title = notification.title || "Notification";
  const message = notification.message || notification.description || "No message";
  const avatar = notification.user_avatar || "/api/placeholder/32/32"; // Placeholder avatar
  const isRead = notification.is_read || false;
  const createdAt = notification.created_at ? new Date(notification.created_at) : new Date();
  
  // Format relative time
  const formatRelativeTime = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <li
      className={`flex hover:bg-gray-100 rounded-medium p-2 transition gap-8 ${
        !isRead ? 'bg-blue-50 border-l-4 border-blue-400' : ''
      }`}
    >
      <div className="flex w-full">
        <Avatar 
          src={avatar} 
          size="sm"
          fallback={
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <IconBell size={16} className="text-gray-600" />
            </div>
          }
        />
        <div className="ml-4 flex flex-col flex-1">
          <div className="flex items-start justify-between">
            <span className={`font-semibold ${!isRead ? 'text-gray-900' : 'text-gray-700'}`}>
              {title}
            </span>
            <span className="text-xs text-gray-400 ml-2 flex-shrink-0">
              {formatRelativeTime(createdAt)}
            </span>
          </div>
          <span className="text-gray-600 text-sm mt-1">
            {message}
          </span>
          {!isRead && (
            <div className="flex items-center mt-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
              <span className="text-xs text-blue-600 font-medium">New</span>
            </div>
          )}
        </div>
      </div>
      <Tooltip color="danger" content="Delete" placement="left">
        <Button 
          isIconOnly 
          radius="full" 
          variant="light"
          color="danger"
          size="sm"
          isLoading={isDeleting}
          onPress={() => onDelete(notification.id)}
        >
          <IconTrash className="text-gray-400" size={16} />
        </Button>
      </Tooltip>
    </li>
  );
};
