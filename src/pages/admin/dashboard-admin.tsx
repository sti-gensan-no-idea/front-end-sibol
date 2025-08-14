import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { AdminSideBar } from "@/widget/admin-sidebar";

export const DashboardAdminPage = () => {
  const [searchParams] = useSearchParams();
  const tab = searchParams.get("tab") || "dashboard";

  useEffect(() => {
    document.title = "Admin | Atuna";
  }, []);

  const renderTab = () => {
    switch (tab) {
      case "dashboard":
        return <BannedTabContent />;
      case "calendar":
        return <BannedTabContent />;
      default:
        return <BannedTabContent />;
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

// Banned content
const BannedTabContent = () => {
  return <></>;
};
