import { useNavigate } from "react-router-dom";
import { Button } from "@heroui/react";
import { IconArrowNarrowRight } from "@tabler/icons-react";

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center flex-col h-screen w-full absolute top-0 -z-10">
      <h1 className="text-foreground-700 text-9xl font-black text-center select-none">
        404
      </h1>
      <span className="text-3xl flex items-center justify-center select-none text-foreground-700 font-bold">
        Page Not Found
      </span>
      <p className="mt-4 text-foreground-700">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Button
        className="mt-16"
        color="primary"
        size="lg"
        variant="shadow"
        onPress={() => navigate("/")}
      >
        Go to Homepage
        <IconArrowNarrowRight />
      </Button>
    </div>
  );
};
