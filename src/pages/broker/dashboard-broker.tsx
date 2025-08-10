import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { BrokerSideBar } from "@/widget/broker-sidebar";
import { BrokerWelcome } from "@/widget/broker-welcome";
import { BrokerTeams } from "@/widget/broker-teams";
import { TopPerformingAgent } from "@/widget/top-performing-agent.s";

export const DashboardBrokerPage = () => {
  const [searchParams] = useSearchParams();
  const tab = searchParams.get("tab") || "dashboard";

  useEffect(() => {
    document.title = "Broker | Atuna";
  }, []);

  const renderTab = () => {
    switch (tab) {
      case "dashboard":
        return <DashboardTabContent />;
      case "teams":
        return <TeamsTabContent />;
      case "notifications":
        return <NotificationTabContent />;
      default:
        return <DashboardTabContent />;
    }
  };

  return (
    <main className="flex container mx-auto min-h-screen">
      <aside className="w-30 pl-8 pt-8">
        <BrokerSideBar />
      </aside>

      <section className="flex-1 pr-8 pt-8 pb-8">{renderTab()}</section>
    </main>
  );
};

// Dashboard content.
const DashboardTabContent = () => {
  return (
    <div className="flex flex-col gap-4">
      <BrokerWelcome />
      <TopPerformingAgent />
    </div>
  );
};

// Teams content
const TeamsTabContent = () => {
  return (
    <div className="flex flex-col gap-4">
      <BrokerTeams />
    </div>
  );
};

// Notification content
const NotificationTabContent = () => {
  return <></>;
};
