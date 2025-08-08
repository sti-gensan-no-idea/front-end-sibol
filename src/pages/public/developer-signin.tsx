import { useEffect } from "react";

import { DeveloperSignInCardForm } from "@/widget/developer-signin-form";

export const DeveloperSignInPage = () => {
  useEffect(() => {
    document.title = "Sign In - Developer | Atuna";
  }, []);

  return (
    <main>
      <DeveloperSignInCardForm />
    </main>
  );
};
