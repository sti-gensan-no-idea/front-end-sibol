import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { ClientSideBar } from "@/widget/client-sidebar";
import { Chatbot } from "@/widget/chatbot";
import { Notification } from "@/widget/notification";
import { CalendarEvents } from "@/widget/calendar-events";
import { ClientBookmark } from "@/widget/client-bookmark";
import { SearchProperties } from "@/widget/search-properties";
import { IconBuildingCommunity } from "@tabler/icons-react";

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
  return (
    <>
      <div className="col-span-2 bg-white rounded-large shadow-medium">
        <div className="flex items-center md:items-start justify-between px-8 pt-8">
          <div className="flex items-center">
            <IconBuildingCommunity className="text-gray-500" size={26} />
            <span className="text-lg font-bold ml-2 text-foreground-700">
              Browse Properties
            </span>
          </div>
        </div>
        <SearchProperties />
      </div>
    </>
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
