import { Hero } from "@/widget/hero";
import { NavBar } from "@/widget/navbar";
import { Features } from "@/widget/features";
import { Footer } from "@/widget/footer";
// import { AboutUs } from "@/widget/about-us";

export const IndexPage = () => {
  return (
    <main>
      <NavBar />
      <Hero />
      <Features />
      {/* <AboutUs /> */}
      <Footer />
    </main>
  );
};
