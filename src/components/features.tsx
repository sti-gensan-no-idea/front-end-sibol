import { Button } from "@heroui/react";
import {
  IconSearch,
  IconCalendar,
  IconFileCheck,
  IconArrowNarrowRight,
} from "@tabler/icons-react";

export const Features = () => {
  return (
    <div className="h-screen flex flex-col items-center">
      <h1 className="mt-20 text-6xl text-center font-bold">How It Works</h1>
      <p className="text-2xl text-center mt-8 max-w-1/2">
        Finding your perfect property is easy with our AI-powered three-step
        process
      </p>

      <div className="mt-20 container mx-auto p-8 grid grid-cols-3 gap-4">
        <div className="flex flex-col items-center">
          <div className="p-4 bg-white rounded-2xl shadow-medium shadow-gray-300">
            <IconSearch size={32} />
          </div>
          <span className="mt-8 text-xl font-bold">Find Your Property</span>
          <p className="mt-4 text-center max-w-sm">
            Use our AI-powered search to discover properties matching your exact
            needs. Filter by location, price and more.
          </p>
        </div>
        <div className="flex flex-col items-center">
          <div className="p-4 bg-white rounded-2xl shadow-medium shadow-gray-300">
            <IconCalendar size={32} />
          </div>
          <span className="mt-8 text-xl font-bold">Schedule a Visit</span>
          <p className="mt-4 text-center max-w-sm">
            Book an in-person viewing or take a virtual 3D tour of your selected
            properties at your convenience.
          </p>
        </div>
        <div className="flex flex-col items-center">
          <div className="p-4 bg-white rounded-2xl shadow-medium shadow-gray-300">
            <IconFileCheck size={32} />
          </div>
          <span className="mt-8 text-xl font-bold">Close the Deal</span>
          <p className="mt-4 text-center max-w-sm">
            Complete paperwork digitally, get expert guidance from our agents,
            and secure your dream property with ease.
          </p>
        </div>
      </div>

      <Button
        className="mt-20"
        color="primary"
        endContent={<IconArrowNarrowRight />}
        size="lg"
        variant="shadow"
      >
        Browse Properties
      </Button>
    </div>
  );
};
