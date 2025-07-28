import { Button } from "@heroui/react";
import { IconArrowNarrowRight } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

import { NavBar } from "@/components/navbar";

export const UnauthorizePage = () => {
  const navigate = useNavigate();

  return (
    <>
      <NavBar />
      <div className="flex items-center justify-center flex-col h-screen w-full absolute top-0 -z-10">
        <h1 className="text-foreground-700 text-9xl font-bold text-center select-none">
          403
        </h1>
        <span className="text-3xl flex items-center justify-center select-none">
          Unauthorize
        </span>
        <p className="mt-4">
          You are unauthorized to access this resource. continue.
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
    </>
  );
};
