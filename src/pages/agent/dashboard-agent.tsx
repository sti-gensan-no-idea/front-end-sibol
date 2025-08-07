import { useEffect } from "react";

export const DashboardAgentPage = () => {
  useEffect(() => {
    document.title = "Agent | Atuna";
  }, []);

  return (
    <div>
      <h1>Agent Page</h1>
    </div>
  );
};
