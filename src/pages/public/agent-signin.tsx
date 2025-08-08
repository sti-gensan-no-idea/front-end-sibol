import { useEffect } from "react";

import { AgentSignInCardForm } from "@/widget/agent-signin-form";

export const AgentSignInPage = () => {
  useEffect(() => {
    document.title = "Sign In - Agent | Atuna";
  }, []);

  return (
    <main>
      <AgentSignInCardForm />
    </main>
  );
};
