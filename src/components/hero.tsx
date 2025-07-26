import { Button, Input } from "@heroui/react";

import ImgHeroBackground from "../assets/images/img_hero_background.jpg";

export const Hero = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center relative">
      <img
        alt="Hero Background"
        className="absolute inset-0 w-full h-full object-cover z-0"
        src={ImgHeroBackground}
      />
      <div className="h-2/3 w-full absolute top-0 z-0 bg-gradient-to-b from-white to-transparent" />

      <div className="z-10 flex flex-col absolute top-20 left-20">
        <h1 className="text-6xl font-bold text-foreground-700">Dream Home</h1>
        <p className="text-2xl mt-8 max-w-1/2 text-foreground-700">
          Discover exceptional properties in prime locations with our AI powered
          search and expert guidance
        </p>
      </div>

      {/* Search input */}
      <div
        className="w-lg mx-auto mt-26 bg-white rounded-2xl shadow-large shadow-gray-300 p-6
        flex
        flex-col
        z-10"
      >
        <div className="flex items-center gap-4">
          <Input
            className="w-full"
            color="primary"
            placeholder="Find a property..."
            size="lg"
            type="text"
            variant="bordered"
          />
          <Button color="primary">Search</Button>
        </div>
      </div>
    </div>
  );
};
