import { useEffect } from "react";

export const DashboardClientPage = () => {
  useEffect(() => {
    document.title = "Client | Atuna";
  }, []);

  return (
    <main>
      <h1>Developer&apos;s Page</h1>
    </main>
  );
};
