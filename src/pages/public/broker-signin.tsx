import { useEffect } from "react";

import { BrokerSignInCardForm } from "@/widget/broker-signin-form";

export const BrokerSignInPage = () => {
  useEffect(() => {
    document.title = "Sign In - Broker | Atuna";
  }, []);

  return (
    <main>
      <BrokerSignInCardForm />
    </main>
  );
};
