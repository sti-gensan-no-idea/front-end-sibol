import { useEffect } from "react";

import { Footer } from "@/components/footer";
import { NavBar } from "@/components/navbar";
import { SignUpCardForm } from "@/components/signup-card-form";

export const SignUpPage = () => {
  useEffect(() => {
    document.title = "Sign Up | Atuna";
  }, []);

  return (
    <div>
      <NavBar />
      <SignUpCardForm />
      <Footer />
    </div>
  );
};
