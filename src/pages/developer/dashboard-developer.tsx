import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { DeveloperSideBar } from "@/widget/developer-sidebar";
import { Notification } from "@/widget/notification";

export const DashboardDeveloperPage = () => {
  const [searchParams] = useSearchParams();
  const tab = searchParams.get("tab") || "dashboard";

  useEffect(() => {
    document.title = "Developer | Atuna";
  }, []);

  const renderTab = () => {
    switch (tab) {
      case "dashboard":
        return <DashboardTabContent />;
      case "notifications":
        return <NotificationTabContent />;
      default:
        return <DashboardTabContent />;
    }
  };

  return (
    <main className="flex container mx-auto min-h-screen">
      <aside className="w-30 pl-8 pt-8">
        <DeveloperSideBar />
      </aside>

      <section className="flex-1 pr-8 pt-8 pb-8">{renderTab()}</section>
    </main>
  );
};

// Dashboard content.
const DashboardTabContent = () => {
  return <></>;
};

// Notification content.
const NotificationTabContent = () => {
  return (
    <>
      <Notification />
    </>
  );
};
