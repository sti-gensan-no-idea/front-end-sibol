import { useEffect } from "react";

import { ClientSignUpCardForm } from "@/widget/client-signup-form";
import { NavBar } from "@/widget/navbar";

export const SignUpPage = () => {
  useEffect(() => {
    document.title = "Sign Up | Atuna";
  }, []);

  return (
    <main>
      <NavBar />
      <ClientSignUpCardForm />
    </main>
  );
};
