import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { ClientSideBar } from "@/widget/client-sidebar";

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
      default:
        return <PropertiesTabContent />;
    }
  };

  return (
    <main className="flex container mx-auto min-h-screen">
      <aside className="w-30 pl-8 pt-8">
        <ClientSideBar />
      </aside>
      <h1>Client&apos;s Page</h1>
      <section className="flex-1 pr-8 pt-8 pb-8">{renderTab()}</section>
    </main>
  );
};

// Dashboard content.
const DashboardTabContent = () => {
  return <></>;
};

// Teams content
const PropertiesTabContent = () => {
  return <></>;
};
