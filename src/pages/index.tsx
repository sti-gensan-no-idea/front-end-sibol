import { Hero } from "@/components/hero";
import { NavBar } from "@/components/navbar";
import { Features } from "@/components/features";
import { Footer } from "@/components/footer";
import { AboutUs } from "@/components/about-us";

export const IndexPage = () => {
  return (
    <div>
      <NavBar />
      <Hero />
      <Features />
      <AboutUs />
      <Footer />
    </div>
  );
};
