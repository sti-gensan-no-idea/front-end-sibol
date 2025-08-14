import { useEffect } from "react";

import { AgentSignUpCardForm } from "@/widget/agent-signup-form";
import { NavBar } from "@/widget/navbar";

export const AgentSignUpPage = () => {
  useEffect(() => {
    document.title = "Sign Up - Agent | Atuna";
  }, []);

  return (
    <main>
      <NavBar />
      <AgentSignUpCardForm />
    </main>
  );
};
