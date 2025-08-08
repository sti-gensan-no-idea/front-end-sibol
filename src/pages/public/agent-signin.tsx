import { useEffect } from "react";

import { AgentSignInCardForm } from "@/widget/agent-signin-form";
import { NavBar } from "@/widget/navbar";

export const AgentSignInPage = () => {
  useEffect(() => {
    document.title = "Sign In - Agent | Atuna";
  }, []);

  return (
    <main>
      <NavBar />
      <AgentSignInCardForm />
    </main>
  );
};
