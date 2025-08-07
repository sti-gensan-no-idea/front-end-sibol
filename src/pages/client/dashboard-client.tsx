import { useEffect } from "react";

export const DashboardClientPage = () => {
  useEffect(() => {
    document.title = "Client | Atuna";
  }, []);

  return (
    <div>
      <h1>Developer&apos;s Page</h1>
    </div>
  );
};
