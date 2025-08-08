import { useEffect } from "react";

import { DeveloperSignInCardForm } from "@/widget/developer-signin-form";
import { NavBar } from "@/widget/navbar";

export const DeveloperSignInPage = () => {
  useEffect(() => {
    document.title = "Sign In - Developer | Atuna";
  }, []);

  return (
    <main>
      <NavBar />
      <DeveloperSignInCardForm />
    </main>
  );
};
