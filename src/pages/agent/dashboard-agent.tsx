import { useEffect } from "react";

import { AgentWelcome } from "@/widget/agent-welcome";

export const DashboardAgentPage = () => {
  useEffect(() => {
    document.title = "Agent | Atuna";
  }, []);

  return (
    <div className="flex container mx-auto">
      <div className="w-30"></div>
      <div className="flex-1 p-8">
        <AgentWelcome />
      </div>
    </div>
  );
};
