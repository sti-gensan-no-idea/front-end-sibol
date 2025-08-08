import { useEffect } from "react";

import { ClientSignInCardForm } from "@/widget/client-signin-form";

export const SignInPage = () => {
  useEffect(() => {
    document.title = "Sign In | Atuna";
  }, []);

  return (
    <main>
      <ClientSignInCardForm />
    </main>
  );
};
