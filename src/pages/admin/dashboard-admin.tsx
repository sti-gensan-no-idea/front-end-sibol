import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { AdminSideBar } from "@/widget/admin-sidebar";
import { AdminWelcome } from "@/widget/admin-welcome";
import { AdminRequests } from "@/widget/admin-requests";
import { TopPerformingAgent } from "@/widget/top-performing-agent.s";

export const DashboardAdminPage = () => {
  const [searchParams] = useSearchParams();
  const tab = searchParams.get("tab") || "dashboard";

  useEffect(() => {
    document.title = "Admin | Atuna";
  }, []);

  const renderTab = () => {
    switch (tab) {
      case "dashboard":
        return <DashboardTabContent />;
      case "request":
        return <RequestTabContent />;
      default:
        return <DashboardTabContent />;
    }
  };

  return (
    <main className="flex container mx-auto min-h-screen">
      <aside className="w-30 pl-8 pt-8">
        <AdminSideBar />
      </aside>

      <section className="flex-1 pr-8 pt-8 pb-8">{renderTab()}</section>
    </main>
  );
};

// Dashboard content
const DashboardTabContent = () => {
  return (
    <div className="flex flex-col gap-4">
      <AdminWelcome />
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <AdminRequests />
        </div>
        <TopPerformingAgent />
      </div>
    </div>
  );
};

// Banned content
const RequestTabContent = () => {
  return (
    <>
      <AdminRequests />
    </>
  );
};
