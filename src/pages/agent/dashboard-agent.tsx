import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { AgentSideBar } from "@/widget/agent-sidebar";
import { TopPerformingAgent } from "@/widget/top-performing-agent.s";
import { CalendarEvents } from "@/widget/calendar-events";
import { AgentPipeline } from "@/widget/agent-pipeline";
import { Notification } from "@/widget/notification";
import { AgentWelcome } from "@/widget/agent-welcome";
import { SiteViewingRequest } from "@/widget/agent-site-viewing-request";

export const DashboardAgentPage = () => {
  const [searchParams] = useSearchParams();
  const tab = searchParams.get("tab") || "dashboard";

  useEffect(() => {
    document.title = "Agent | Atuna";
  }, []);

  const renderTab = () => {
    switch (tab) {
      case "dashboard":
        return <DashboardTabContent />;
      case "calendar":
        return <CalendarTabContent />;
      case "agents":
        return <AgentsTabContent />;
      case "automation":
        return <AutomationTabContent />;
      case "notifications":
        return <NotificationTabContent />;
      default:
        return <DashboardTabContent />;
    }
  };

  return (
    <main className="flex container mx-auto min-h-screen">
      <aside className="w-30 pl-8 pt-8">
        <AgentSideBar />
      </aside>

      <section className="flex-1 pr-8 pt-8 pb-8">{renderTab()}</section>
    </main>
  );
};

// Dashboard content.
const DashboardTabContent = () => {
  return (
    <div className="flex flex-col gap-4">
      <AgentWelcome />
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <SiteViewingRequest />
        </div>
        <TopPerformingAgent />
      </div>
    </div>
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

// Agents content
const AgentsTabContent = () => {
  return (
    <>
      <TopPerformingAgent />
    </>
  );
};

// Automation content
const AutomationTabContent = () => {
  return (
    <>
      <AgentPipeline />
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
