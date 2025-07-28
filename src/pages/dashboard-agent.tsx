import { AgentDashboardContent } from "@/components/agent-dashboard-content";
import { AgentSideBar } from "@/components/agent-side-bar";
import { NavBar } from "@/components/navbar";

export const DashboardAgentPage = () => {
  return (
    <div>
      <NavBar />
      <AgentSideBar />
      <AgentDashboardContent />
    </div>
  );
};
