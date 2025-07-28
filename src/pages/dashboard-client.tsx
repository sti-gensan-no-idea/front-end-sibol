import { useEffect } from "react";

import { NavBar } from "@/components/navbar";

export const DashboardClientPage = () => {
  useEffect(() => {
    document.title = "Client Dashboard | Sibol";
  }, []);

  return (
    <div>
      <NavBar />
    </div>
  );
};
