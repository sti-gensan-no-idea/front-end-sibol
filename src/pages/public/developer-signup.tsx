import { useEffect } from "react";

import { DeveloperSignUpCardForm } from "@/widget/developer-signup-form";

export const DeveloperSignUpPage = () => {
  useEffect(() => {
    document.title = "Sign Up - Developer | Atuna";
  }, []);

  return (
    <main>
      <DeveloperSignUpCardForm />
    </main>
  );
};
