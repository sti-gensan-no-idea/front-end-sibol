import { useEffect } from "react";

import { AboutUs } from "@/widget/about-us";
import { Footer } from "@/widget/footer";
import { NavBar } from "@/widget/navbar";
import { Chatbot } from "@/widget/chatbot";

export const AboutUsPage = () => {
  useEffect(() => {
    document.title = "About Us | Atuna";
  }, []);

  return (
    <div>
      <NavBar />
      <AboutUs />
      <Footer />
      <Chatbot />
    </div>
  );
};
