import { useEffect } from "react";

import { BrokerSignUpCardForm } from "@/widget/broker-signup-form";
import { NavBar } from "@/widget/navbar";

export const BrokerSignUpPage = () => {
  useEffect(() => {
    document.title = "Sign Up - Broker | Atuna";
  }, []);

  return (
    <main>
      <NavBar />
      <BrokerSignUpCardForm />
    </main>
  );
};
