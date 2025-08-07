import { useEffect } from "react";

export const DashboardDeveloperPage = () => {
  useEffect(() => {
    document.title = "Developer | Atuna";
  }, []);

  return (
    <div>
      <h1>Developer&apos;s Dashboard</h1>
    </div>
  );
};
