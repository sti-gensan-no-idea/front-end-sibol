import { Button } from "@heroui/react";
import { useNavigate } from "react-router-dom";
import { IconArrowNarrowRight } from "@tabler/icons-react";

import { featureSteps } from "@/data/feature-steps";

interface StepCardInterface {
  step: number;
  title: string;
  description: string;
  Icon: React.ElementType;
}

const StepCard = ({ step, title, description, Icon }: StepCardInterface) => (
  <div className="flex flex-col items-center relative">
    <div className="p-4 bg-white rounded-2xl shadow-medium shadow-gray-300">
      <Icon className="text-primary" size={40} />
    </div>
    <span className="w-8 h-8 flex items-center justify-center rounded-full absolute -top-12 select-none shadow-small text-white bg-primary">
      {step}
    </span>
    <span className="mt-8 text-lg sm:text-xl font-bold text-foreground-700">
      {title}
    </span>
    <p className="mt-4 text-center max-w-sm text-sm sm:text-base text-foreground-700">
      {description}
    </p>
  </div>
);

export const Features = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen p-8 sm:p-8 flex flex-col items-center justify-center bg-white">
      <h1 className="text-4xl sm:text-6xl text-center font-bold text-foreground-700">
        How It Works
      </h1>
      <div className="w-20 sm:w-30 h-2 mt-4 bg-gray-300 rounded-full" />
      <p className="text-base sm:text-xl text-center mt-8 max-w-xl text-foreground-700">
        Finding your perfect property is easy with our AI-powered three-step
        process
      </p>

      <div className="mt-16 w-full container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 relative">
        <div className="hidden lg:flex w-full top-8 items-center justify-center absolute">
          <div className="w-full max-w-2/3 h-1 bg-primary" />
        </div>

        {featureSteps.map(({ step, title, description, Icon }) => (
          <StepCard
            key={step}
            Icon={Icon}
            description={description}
            step={step}
            title={title}
          />
        ))}
      </div>

      <Button
        className="mt-16"
        color="primary"
        endContent={<IconArrowNarrowRight />}
        size="lg"
        variant="shadow"
        onPress={() => navigate("/sign-up")}
      >
        Browse Properties
      </Button>
    </div>
  );
};
