import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Card, CardBody, CardHeader, Button, Chip } from "@heroui/react";
import { IconHome, IconMessageChatbot, IconUser, IconCheck, IconX, IconRefresh } from "@tabler/icons-react";

import { ClientSideBar } from "@/widget/client-sidebar";
import { Chatbot } from "@/widget/chatbot";
import { Notification } from "@/widget/notification";
import { CalendarEvents } from "@/widget/calendar-events";
import { ClientBookmark } from "@/widget/client-bookmark";
import { useChatbase } from "@/hooks/useChatbase";
import { useAuth } from "@/hooks/useAuth";

export const DashboardClientPage = () => {
  const [searchParams] = useSearchParams();
  const tab = searchParams.get("tab") || "dashboard";

  useEffect(() => {
    document.title = "Client | Atuna";
  }, []);

  const renderTab = () => {
    switch (tab) {
      case "dashboard":
        return <DashboardTabContent />;
      case "bookmark":
        return <BookmarkTabContent />;
      case "calendar":
        return <CalendarTabContent />;
      case "notifications":
        return <NotificationTabContent />;
      default:
        return <DashboardTabContent />;
    }
  };

  return (
    <main className="flex container mx-auto min-h-screen">
      <aside className="w-30 pl-8 pt-8">
        <ClientSideBar />
      </aside>

      <section className="flex-1 pr-8 pt-8 pb-8">{renderTab()}</section>

      {/* Chatbot UI */}
      <Chatbot />
    </main>
  );
};

// Dashboard content.
const DashboardTabContent = () => {
  const { isReady, isIdentified, error, openChat } = useChatbase();
  const { userEmail, userRole } = useAuth();
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome to Atuna</h1>
          <p className="text-gray-600 mt-1">Your real estate dashboard</p>
        </div>
        <Chip 
          color={userRole === 'client' ? 'primary' : 'secondary'} 
          variant="flat"
          startContent={<IconUser size={14} />}
        >
          {userRole || 'Client'}
        </Chip>
      </div>

      {/* Chatbase Integration Status */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
        <CardHeader className="flex gap-3">
          <IconMessageChatbot className="text-blue-600" size={24} />
          <div className="flex flex-col">
            <p className="text-md font-semibold">AI Assistant Integration</p>
            <p className="text-small text-default-500">
              Powered by Chatbase with identity verification
            </p>
          </div>
        </CardHeader>
        <CardBody>
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Chip
                  color={error ? "danger" : isReady ? "success" : "warning"}
                  variant="flat"
                  size="sm"
                  startContent={
                    error ? <IconX size={12} /> : 
                    isReady ? <IconCheck size={12} /> : 
                    <IconRefresh size={12} className="animate-spin" />
                  }
                >
                  {error ? "Error" : isReady ? "Loaded" : "Loading"}
                </Chip>
                
                <Chip
                  color={isIdentified ? "success" : "warning"}
                  variant="flat"
                  size="sm"
                  startContent={
                    isIdentified ? <IconCheck size={12} /> : 
                    <IconRefresh size={12} className="animate-spin" />
                  }
                >
                  {isIdentified ? "Authenticated" : "Authenticating"}
                </Chip>
              </div>
              
              <p className="text-sm text-gray-600">
                Status: {error ? `Error - ${error}` : isReady && isIdentified ? "Ready to chat!" : "Setting up your personalized chat experience..."}
              </p>
              
              {userEmail && (
                <p className="text-xs text-gray-500">
                  User: {userEmail}
                </p>
              )}
            </div>
            
            <Button
              color="primary"
              variant="flat"
              onPress={openChat}
              isDisabled={!isReady || !isIdentified}
              startContent={<IconMessageChatbot size={16} />}
            >
              Open Chat
            </Button>
          </div>
        </CardBody>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <IconHome className="text-gray-600" size={24} />
          <div className="flex flex-col">
            <p className="text-md font-semibold">Quick Actions</p>
            <p className="text-small text-default-500">
              Common tasks for property clients
            </p>
          </div>
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="bordered" className="h-auto p-4">
              <div className="text-center">
                <p className="font-semibold">Browse Properties</p>
                <p className="text-xs text-gray-500">Find your dream home</p>
              </div>
            </Button>
            
            <Button variant="bordered" className="h-auto p-4">
              <div className="text-center">
                <p className="font-semibold">Schedule Viewing</p>
                <p className="text-xs text-gray-500">Book property tours</p>
              </div>
            </Button>
            
            <Button variant="bordered" className="h-auto p-4" onPress={openChat}>
              <div className="text-center">
                <p className="font-semibold">Ask AI Assistant</p>
                <p className="text-xs text-gray-500">Get instant help</p>
              </div>
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

// Bookmark content
const BookmarkTabContent = () => {
  return (
    <>
      <ClientBookmark />
    </>
  );
};

// Calendar content
const CalendarTabContent = () => {
  return (
    <>
      <CalendarEvents />
    </>
  );
};

// Notification content
const NotificationTabContent = () => {
  return (
    <>
      <Notification />
    </>
  );
};
