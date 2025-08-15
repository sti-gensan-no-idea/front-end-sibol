import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Chip,
  Badge,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import { 
  IconBell, 
  IconCheck, 
  IconCheckbox,
  IconX,
  IconInfo,
  IconAlertTriangle,
  IconCheckCircle,
  IconExclamationCircle,
} from "@tabler/icons-react";
import { useNotifications } from "../hooks";

interface NotificationCenterProps {
  className?: string;
}

export const NotificationCenter = ({ className }: NotificationCenterProps) => {
  const { 
    notifications, 
    unreadCount, 
    markAsRead, 
    markAllAsRead,
    getUnreadNotifications,
    getNotificationsByType,
    loading, 
    error 
  } = useNotifications();

  const unreadNotifications = getUnreadNotifications();

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <IconCheckCircle className="w-5 h-5 text-green-600" />;
      case 'warning':
        return <IconAlertTriangle className="w-5 h-5 text-orange-600" />;
      case 'error':
        return <IconExclamationCircle className="w-5 h-5 text-red-600" />;
      default:
        return <IconInfo className="w-5 h-5 text-blue-600" />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'success': return 'success';
      case 'warning': return 'warning';
      case 'error': return 'danger';
      default: return 'primary';
    }
  };

  const formatTimeAgo = (dateStr: string) => {
    const now = new Date();
    const notificationDate = new Date(dateStr);
    const diffInMinutes = Math.floor((now.getTime() - notificationDate.getTime()) / (1000 * 60));

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  if (loading && notifications.length === 0) {
    return (
      <div className={`flex items-center justify-center h-64 ${className}`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading notifications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Header */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-3">
              <Badge content={unreadCount} color="danger" isInvisible={unreadCount === 0}>
                <IconBell className="w-6 h-6 text-primary" />
              </Badge>
              <div>
                <h3 className="text-lg font-semibold">Notifications</h3>
                <p className="text-sm text-gray-600">
                  {unreadCount > 0 ? `${unreadCount} unread notifications` : 'All caught up!'}
                </p>
              </div>
            </div>
            {unreadCount > 0 && (
              <Button
                size="sm"
                color="primary"
                variant="light"
                startContent={<IconCheckbox />}
                onPress={markAllAsRead}
              >
                Mark all as read
              </Button>
            )}
          </div>
        </CardHeader>
      </Card>

      {/* Unread Notifications */}
      {unreadNotifications.length > 0 && (
        <Card className="mb-6 border-blue-200 bg-blue-50">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2 text-blue-800">
              <IconBell className="w-5 h-5" />
              <h4 className="font-semibold">Unread Notifications</h4>
            </div>
          </CardHeader>
          <CardBody className="pt-0 space-y-3">
            {unreadNotifications.slice(0, 5).map((notification) => (
              <div key={notification.id} className="flex items-start gap-3 p-3 bg-white rounded-lg border">
                <div className="flex-shrink-0 mt-1">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-1">
                    <h5 className="font-medium text-sm">{notification.title}</h5>
                    <div className="flex items-center gap-2 ml-2">
                      <span className="text-xs text-gray-500 whitespace-nowrap">
                        {formatTimeAgo(notification.created_at)}
                      </span>
                      <Chip size="sm" color={getNotificationColor(notification.type)} variant="dot">
                        {notification.type}
                      </Chip>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                  <Button
                    size="sm"
                    color="primary"
                    variant="light"
                    startContent={<IconCheck />}
                    onPress={() => markAsRead(notification.id)}
                  >
                    Mark as read
                  </Button>
                </div>
              </div>
            ))}
            {unreadNotifications.length > 5 && (
              <div className="text-center text-sm text-gray-500">
                +{unreadNotifications.length - 5} more unread notifications
              </div>
            )}
          </CardBody>
        </Card>
      )}

      {/* All Notifications */}
      <Card>
        <CardHeader>
          <h4 className="font-semibold">All Notifications</h4>
        </CardHeader>
        <CardBody className="space-y-3">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <div 
                key={notification.id} 
                className={`flex items-start gap-3 p-3 rounded-lg border transition-colors ${
                  !notification.read 
                    ? 'bg-blue-50 border-blue-200' 
                    : 'bg-gray-50 border-gray-200 opacity-75'
                }`}
              >
                <div className="flex-shrink-0 mt-1">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-1">
                    <h5 className={`text-sm ${!notification.read ? 'font-medium' : 'font-normal'}`}>
                      {notification.title}
                      {!notification.read && (
                        <span className="inline-block w-2 h-2 bg-blue-600 rounded-full ml-2"></span>
                      )}
                    </h5>
                    <div className="flex items-center gap-2 ml-2">
                      <span className="text-xs text-gray-500 whitespace-nowrap">
                        {formatTimeAgo(notification.created_at)}
                      </span>
                      <Chip size="sm" color={getNotificationColor(notification.type)} variant="dot">
                        {notification.type}
                      </Chip>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                  <div className="flex items-center gap-2">
                    {!notification.read && (
                      <Button
                        size="sm"
                        color="primary"
                        variant="light"
                        startContent={<IconCheck />}
                        onPress={() => markAsRead(notification.id)}
                      >
                        Mark as read
                      </Button>
                    )}
                    <span className={`text-xs ${notification.read ? 'text-green-600' : 'text-gray-400'}`}>
                      {notification.read ? 'Read' : 'Unread'}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              <IconBell className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>No notifications</p>
              <p className="text-sm">You're all caught up!</p>
            </div>
          )}
        </CardBody>
      </Card>

      {/* Notification Stats */}
      {notifications.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <Card>
            <CardBody className="text-center">
              <div className="text-2xl font-bold text-blue-600">{notifications.length}</div>
              <div className="text-sm text-gray-600">Total</div>
            </CardBody>
          </Card>
          <Card>
            <CardBody className="text-center">
              <div className="text-2xl font-bold text-orange-600">{unreadCount}</div>
              <div className="text-sm text-gray-600">Unread</div>
            </CardBody>
          </Card>
          <Card>
            <CardBody className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {getNotificationsByType('success').length}
              </div>
              <div className="text-sm text-gray-600">Success</div>
            </CardBody>
          </Card>
          <Card>
            <CardBody className="text-center">
              <div className="text-2xl font-bold text-red-600">
                {getNotificationsByType('error').length}
              </div>
              <div className="text-sm text-gray-600">Alerts</div>
            </CardBody>
          </Card>
        </div>
      )}
    </div>
  );
};
