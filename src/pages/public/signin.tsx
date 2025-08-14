import { useEffect } from "react";

import { ClientSignInCardForm } from "@/widget/client-signin-form";
import { NavBar } from "@/widget/navbar";

export const SignInPage = () => {
  useEffect(() => {
    document.title = "Sign In | Atuna";
  }, []);

  return (
    <main>
      <NavBar />
      <ClientSignInCardForm />
    </main>
  );
};
