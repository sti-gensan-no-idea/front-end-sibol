import { Button, Input } from "@heroui/react";

import ImgHeroBackground from "../assets/images/img_hero_background1.jpg";

export const Hero = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen relative">
      <img
        alt="Hero Background"
        className="absolute inset-0 w-full h-full object-cover z-0 object-top"
        src={ImgHeroBackground}
      />
      {/* <div className="h-2/3 w-full absolute top-0 z-0 bg-gradient-to-b from-white to-transparent" /> */}

      {/* Search input */}
      {/* <div
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
      </div> */}
    </div>
  );
};
