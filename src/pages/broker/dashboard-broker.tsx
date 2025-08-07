import { useEffect } from "react";

export const DashboardBrokerPage = () => {
  useEffect(() => {
    document.title = "Broker | Atuna";
  }, []);

  return (
    <div>
      <h1>Broker&apos;s Page</h1>
    </div>
  );
};
