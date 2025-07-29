import { useEffect } from "react";

import { AgentDashboardContent } from "@/components/agent-dashboard-content";
import { AgentSideBar } from "@/components/agent-side-bar";
import { NavBar } from "@/components/navbar";
import { AdminDashboardPage } from "./dashboard-admin";

export const DashboardAgentPage = () => {
  useEffect(() => {
    document.title = "Agent Dashboard | Atuna";
  }, []);

  return (
    <div>
      <NavBar />
      <AgentSideBar />
      <AdminDashboardPage/>

    </div>
  );
};
