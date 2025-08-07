import { useEffect } from "react";

export const DashboardAdminPage = () => {
  useEffect(() => {
    document.title = "Admin | Atuna";
  }, []);

  return (
    <div>
      <h1>Admin Page</h1>
    </div>
  );
};
