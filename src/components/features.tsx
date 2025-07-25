import { Button } from "@heroui/react";
import {
  IconSearch,
  IconCalendar,
  IconFileCheck,
  IconArrowNarrowRight,
} from "@tabler/icons-react";

export const Features = () => {
  return (
    <div className="h-screen p-8 flex flex-col items-center justify-center">
      <h1 className="text-5xl text-center font-bold">How It Works</h1>
      <p className="text-xl text-center mt-8 max-w-1/2">
        Finding your perfect property is easy with our AI-powered three-step
        process
      </p>

      <div className="mt-20 container mx-auto p-8 grid grid-cols-3 gap-8 relative">
        <div className="w-full top-16 flex items-center justify-center absolute -z-10">
          <div className="w-full max-w-2/3 h-1 bg-primary" />
        </div>
        <div className="flex flex-col items-center relative">
          <div className="p-4 bg-white rounded-2xl shadow-medium shadow-gray-300">
            <IconSearch size={40} />
          </div>
          <span className="w-8 h-8 flex items-center justify-center rounded-full absolute -top-12 select-none shadow-small text-white bg-primary">
            1
          </span>
          <span className="mt-8 text-xl font-bold">Find Your Property</span>
          <p className="mt-4 text-center max-w-sm">
            Use our AI-powered search to discover properties matching your exact
            needs. Filter by location, price and more.
          </p>
        </div>
        <div className="flex flex-col items-center relative">
          <div className="p-4 bg-white rounded-2xl shadow-medium shadow-gray-300">
            <IconCalendar size={40} />
          </div>
          <span className="w-8 h-8 flex items-center justify-center rounded-full absolute -top-12 select-none shadow-small text-white bg-primary">
            2
          </span>
          <span className="mt-8 text-xl font-bold">Schedule a Visit</span>
          <p className="mt-4 text-center max-w-sm">
            Book an in-person viewing or take a virtual 3D tour of your selected
            properties at your convenience.
          </p>
        </div>
        <div className="flex flex-col items-center relative">
          <div className="p-4 bg-white rounded-2xl shadow-medium shadow-gray-300">
            <IconFileCheck size={40} />
          </div>
          <span className="w-8 h-8 flex items-center justify-center rounded-full absolute -top-12 select-none shadow-small text-white bg-primary">
            3
          </span>
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
