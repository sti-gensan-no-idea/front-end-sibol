import { useEffect } from "react";

import { AgentSignUpCardForm } from "@/widget/agent-signup-form";

export const AgentSignUpPage = () => {
  useEffect(() => {
    document.title = "Sign Up - Agent | Atuna";
  }, []);

  return (
    <main>
      <AgentSignUpCardForm />
    </main>
  );
};
