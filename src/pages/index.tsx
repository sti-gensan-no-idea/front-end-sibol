import { Hero } from "@/components/hero";
import { NavBar } from "@/components/navbar";
import { Features } from "@/components/features";

export default function IndexPage() {
  return (
    <div>
      <NavBar />
      <Hero />
      <Features />
    </div>
  );
}
