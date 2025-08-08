import { useEffect } from "react";

import { DeveloperSignUpCardForm } from "@/widget/developer-signup-form";
import { NavBar } from "@/widget/navbar";

export const DeveloperSignUpPage = () => {
  useEffect(() => {
    document.title = "Sign Up - Developer | Atuna";
  }, []);

  return (
    <main>
      <NavBar />
      <DeveloperSignUpCardForm />
    </main>
  );
};
