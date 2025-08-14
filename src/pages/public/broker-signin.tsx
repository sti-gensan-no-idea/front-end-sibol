import { useEffect } from "react";

import { BrokerSignInCardForm } from "@/widget/broker-signin-form";
import { NavBar } from "@/widget/navbar";

export const BrokerSignInPage = () => {
  useEffect(() => {
    document.title = "Sign In - Broker | Atuna";
  }, []);

  return (
    <main>
      <NavBar />
      <BrokerSignInCardForm />
    </main>
  );
};
