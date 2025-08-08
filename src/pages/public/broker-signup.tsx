import { useEffect } from "react";

import { BrokerSignUpCardForm } from "@/widget/broker-signup-form";

export const BrokerSignUpPage = () => {
  useEffect(() => {
    document.title = "Sign Up - Broker | Atuna";
  }, []);

  return (
    <main>
      <BrokerSignUpCardForm />
    </main>
  );
};
