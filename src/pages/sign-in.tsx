import { useEffect } from "react";

import { Footer } from "@/components/footer";
import { NavBar } from "@/components/navbar";
import { SignInCardForm } from "@/components/sign-in-form";

export const SignInPage = () => {
  useEffect(() => {
    document.title = "Sign In | Sibol";
  }, []);

  return (
    <div>
      <NavBar />
      <SignInCardForm />
      <Footer />
    </div>
  );
};
