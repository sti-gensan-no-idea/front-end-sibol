import { useState } from "react";
import { Button, Input } from "@heroui/react";
import { useNavigate } from "react-router-dom";

import ImgHeroBackground from "../assets/images/img_hero_background.jpg";

export const Hero = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!query.trim()) return;
    navigate(
      `/properties?page=1&tab=search_properties&query=${encodeURIComponent(query)}`,
    );
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <img
        alt="Hero Background"
        className="absolute inset-0 w-full h-full object-cover z-0"
        src={ImgHeroBackground}
      />

      {/* Top Gradient Overlay */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white to-transparent z-10" />

      {/* Headline at Top */}
      <div className="relative z-20 pt-24 px-4 text-center gap-8">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-800 drop-shadow-md">
          Simplifying Property Search
          <br />
          Through Intelligent Technology
        </h1>
        <div className="h-8" />
        <span>
          Automate repetitive tasks, boost productivity, enhance
          decision-making, and streamline proccesses with powerful AI tools
        </span>
      </div>

      {/* Search Input at Bottom */}
      <div className="absolute bottom-44 w-full px-6 z-30">
        <div className="max-w-3xl mx-auto bg-white rounded-full shadow-lg p-2">
          <div className="flex items-center gap-3">
            <Input
              className="w-full"
              placeholder="Find a property..."
              radius="full"
              size="lg"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
            />
            <Button color="primary" radius="full" onPress={handleSearch}>
              Search
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
