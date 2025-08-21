import { NavBar } from "@/widget/navbar";
import { SearchProperties } from "@/widget/search-properties";

export const PropertiesPage = () => {
  return (
    <>
      <NavBar />
      <main className="flex bg-gradient-to-b from-white to-transparent mx-auto min-h-screen">
        <SearchProperties />
      </main>
    </>
  );
};
