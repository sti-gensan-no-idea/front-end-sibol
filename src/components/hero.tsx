import { useState } from "react";
import { Button, Input } from "@heroui/react";
import { useNavigate } from "react-router-dom";

import ImgHeroBackground from "../assets/images/img_hero_background1.jpg";

export const Hero = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!query.trim()) return;
    navigate(
      `/properties?page=1&tab=search_properties&query=${encodeURIComponent(query)}`
    );
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen relative">
      <img
        alt="Hero Background"
        className="absolute inset-0 w-full h-full object-fill z-0 object-center"
        src={ImgHeroBackground}
      />

      {/* Search input */}
      <div className="container mx-auto flex justify-center px-20 absolute bottom-44">
        <div className="w-full mt-26 bg-white rounded-full shadow-large shadow-gray-300 p-2 flex flex-col z-10">
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
                if (e.key === "Enter") {
                  handleSearch();
                }
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
