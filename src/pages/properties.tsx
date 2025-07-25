import { Footer } from "@/components/footer";
import { NavBar } from "@/components/navbar";
import { PropertiesIntro } from "@/components/properties-intro";
import { PropertiesTab } from "@/components/properties-tab";

export const PropertiesPage = () => {
  return (
    <div>
      <NavBar />
      <PropertiesIntro />
      <PropertiesTab />
      <Footer />
    </div>
  );
};
