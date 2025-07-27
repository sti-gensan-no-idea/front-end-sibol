import { useEffect } from "react";

import { Footer } from "@/components/footer";
import { NavBar } from "@/components/navbar";
import { SignInAgentCardForm } from "@/components/sign-in-agent-form";

export const SignInAgentPage = () => {
  useEffect(() => {
    document.title = "Sign In Agent | Sibol";
  }, []);

  return (
    <div>
      <NavBar />
      <SignInAgentCardForm />
      <Footer />
    </div>
  );
};
