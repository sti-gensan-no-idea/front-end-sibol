import { Hero } from "@/components/hero";
import { NavBar } from "@/components/navbar";
import { Features } from "@/components/features";
import { Footer } from "@/components/footer";

export default function IndexPage() {
  return (
    <div>
      <NavBar />
      <Hero />
      <Features />
      <Footer />
    </div>
  );
}
