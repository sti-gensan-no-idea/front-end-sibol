import { Button, Input } from "@heroui/react";
import { IconSearch } from "@tabler/icons-react";

export const Hero = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h1 className="text-6xl text-center font-bold">
        Find Your Perfect
        <br />
        Dream Home
      </h1>
      <p className="text-2xl text-center mt-8 max-w-1/2">
        Discover exceptional properties in prime locations with our AI powered
        search and expert guidance
      </p>

      {/* Search input */}
      <div
        className="max-w-lg mx-auto mt-20 bg-white rounded-2xl shadow-large shadow-gray-300 p-6
        flex
        flex-col"
      >
        <div className="flex items-center gap-4">
          <Input
            className="w-full"
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
