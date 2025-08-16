import { useEffect } from "react";

import { NavBar } from "@/widget/navbar";
import { SignInCardForm } from "@/widget/signin-form";

export const SignInPage = () => {
  useEffect(() => {
    document.title = "Sign In | Atuna";
  }, []);

  return (
    <main>
      <NavBar />
      <SignInCardForm />
    </main>
  );
};
