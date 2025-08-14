import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { ClientSideBar } from "@/widget/client-sidebar";
import { Chatbot } from "@/widget/chatbot";
import { Notification } from "@/widget/notification";
import { CalendarEvents } from "@/widget/calendar-events";

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
      case "calendar":
        return <CalendarTabContent />;
      case "notifications":
        return <NotificationTabContent />;
      default:
        return <PropertiesTabContent />;
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
  return <></>;
};

// Properties content
const PropertiesTabContent = () => {
  return <></>;
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
