import { Chatbot } from "@/widget/chatbot";
import { Hero } from "@/components/hero";
import { NavBar } from "@/components/navbar";
import { Features } from "@/components/features";
import { Footer } from "@/components/footer";
import { AboutUs } from "@/components/about-us";

export const IndexPage = () => {
  return (
    <main>
      <NavBar />
      <Hero />
      <Features />
      <AboutUs />
      <Footer />
      <Chatbot />
    </main>
  );
};
