import { useEffect } from "react";

export const DashboardAgentPage = () => {
  useEffect(() => {
    document.title = "Agent | Atuna";
  }, []);

  return <main></main>;
};
