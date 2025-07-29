import { Button } from "@heroui/react";
import {
  IconSearch,
  IconCalendar,
  IconFileCheck,
  IconArrowNarrowRight,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

export const Features = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen p-8 flex flex-col items-center justify-center bg-white">
      <h1 className="text-6xl text-center font-bold text-foreground-700">
        How It Works
      </h1>
      <div className="w-30 h-2 mt-4 bg-gray-300 rounded-full" />
      <p className="text-xl text-center mt-8 max-w-1/2 text-foreground-700">
        Finding your perfect property is easy with our AI-powered three-step
        process
      </p>

      <div className="mt-20 container mx-auto p-8 grid grid-cols-3 gap-8 relative">
        <div className="w-full top-16 flex items-center justify-center absolute">
          <div className="w-full max-w-2/3 h-1 bg-primary" />
        </div>
        <div className="flex flex-col items-center relative">
          <div className="p-4 bg-white rounded-2xl shadow-medium shadow-gray-300">
            <IconSearch className="text-primary" size={40} />
          </div>
          <span className="w-8 h-8 flex items-center justify-center rounded-full absolute -top-12 select-none shadow-small text-white bg-primary">
            1
          </span>
          <span className="mt-8 text-xl font-bold text-foreground-700">
            Find Your Property
          </span>
          <p className="mt-4 text-center max-w-sm text-foreground-700">
            Use our AI-powered search to discover properties matching your exact
            needs. Filter by location, price and more.
          </p>
        </div>
        <div className="flex flex-col items-center relative">
          <div className="p-4 bg-white rounded-2xl shadow-medium shadow-gray-300">
            <IconCalendar className="text-primary" size={40} />
          </div>
          <span className="w-8 h-8 flex items-center justify-center rounded-full absolute -top-12 select-none shadow-small text-white bg-primary">
            2
          </span>
          <span className="mt-8 text-xl font-bold text-foreground-700">
            Schedule a Visit
          </span>
          <p className="mt-4 text-center max-w-sm text-foreground-700">
            Book an in-person viewing or take a virtual 3D tour of your selected
            properties at your convenience.
          </p>
        </div>
        <div className="flex flex-col items-center relative">
          <div className="p-4 bg-white rounded-2xl shadow-medium shadow-gray-300">
            <IconFileCheck className="text-primary" size={40} />
          </div>
          <span className="w-8 h-8 flex items-center justify-center rounded-full absolute -top-12 select-none shadow-small text-white bg-primary">
            3
          </span>
          <span className="mt-8 text-xl font-bold text-foreground-700">
            Close the Deal
          </span>
          <p className="mt-4 text-center max-w-sm text-foreground-700">
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
        onPress={() => {navigate("/sign-up")}}
      >
        Browse Properties
      </Button>
    </div>
  );
};
