import { useEffect } from "react";

import { ClientSignUpCardForm } from "@/widget/client-signup-form";

export const SignUpPage = () => {
  useEffect(() => {
    document.title = "Sign Up | Atuna";
  }, []);

  return (
    <div>
      <ClientSignUpCardForm />
    </div>
  );
};
