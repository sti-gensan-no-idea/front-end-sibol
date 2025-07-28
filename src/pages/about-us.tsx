import { useEffect } from "react";

import { AboutUs } from "@/components/about-us";
import { Footer } from "@/components/footer";
import { NavBar } from "@/components/navbar";

export const AboutUsPage = () => {
  useEffect(() => {
    document.title = "About Us | Sibol";
  }, []);

  return (
    <div>
      <NavBar />
      <AboutUs />
      <Footer />
    </div>
  );
};
