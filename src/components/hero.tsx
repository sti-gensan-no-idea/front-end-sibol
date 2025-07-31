import { useState } from "react";
import { Button, Input } from "@heroui/react";
import { useNavigate } from "react-router-dom";

import ImgHeroBackground from "../assets/images/img_hero_background.jpg";

export const Hero = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    const trimmed = query.trim();

    if (!trimmed) return;
    navigate(
      `/properties?page=1&tab=search_properties&query=${encodeURIComponent(trimmed)}`
    );
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <img
        alt="Hero Background"
        className="absolute inset-0 w-full h-full object-cover z-0"
        src={ImgHeroBackground}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-white via-white/80 to-transparent z-10" />

      <div className="relative z-20 flex flex-col justify-center items-center h-full text-center px-8 sm:px-6">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-800 drop-shadow-md max-w-5xl">
          Simplifying Property Search&nbsp;
          <br className="hidden sm:block" />
          Through Intelligent Technology
        </h1>

        <p className="mt-6 text-base sm:text-lg text-gray-700 max-w-xl">
          Automate repetitive tasks, boost productivity, enhance
          decision-making, and streamline processes with powerful AI tools.
        </p>

        <div className="mt-12 w-full max-w-2xl px-4">
          <div className="flex items-center gap-2 bg-white rounded-full shadow-lg p-2">
            <Input
              className="w-full"
              placeholder="Find a property..."
              radius="full"
              size="lg"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <Button
              className="shrink-0"
              color="primary"
              radius="full"
              onPress={handleSearch}
            >
              Search
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
