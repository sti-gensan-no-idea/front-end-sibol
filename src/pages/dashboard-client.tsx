import { useEffect } from "react";

import { NavBar } from "@/components/navbar";
import { ClientSideBar } from "@/components/client-side-bar";
import { ClientDashboardContent } from "@/components/client-dashboard-content";

export const DashboardClientPage = () => {
  useEffect(() => {
    document.title = "Client Dashboard | Atuna";
  }, []);

  return (
    <div>
      <NavBar />
      <ClientSideBar />
      <ClientDashboardContent />
    </div>
  );
};
