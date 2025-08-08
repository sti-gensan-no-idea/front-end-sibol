import { useNavigate } from "react-router-dom";
import { Button, Divider, Input, Link } from "@heroui/react";
import { IconLockFilled, IconMailFilled } from "@tabler/icons-react";

export const ClientSignInCardForm = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto p-8 h-screen flex flex-col items-center justify-center relative">
      {/* Background blobs */}
      <div className="absolute top-46 -left-10 w-72 h-72 bg-green-300 rounded-full blur-3xl opacity-30" />
      <div className="absolute top-20 right-20 w-60 h-60 bg-primary-300 rounded-full blur-2xl opacity-20" />
      <div className="absolute bottom-20 left-1/3 w-96 h-96 bg-red-300 rounded-full blur-[100px] opacity-20" />

      <div className="w-lg mx-auto bg-white rounded-2xl shadow-large shadow-gray-300 p-8 flex flex-col items-center justify-center z-10">
        <span className="text-foreground-700 text-4xl mt-4 font-bold">
          Welcome Back!
        </span>
        <span className="text-foreground-700 mt-3">
          Answers to your real estate questions and concerns
        </span>

        <form action="#" className="flex flex-col w-full" method="post">
          <div className="flex flex-col w-full mt-8">
            <Input
              className="mt-4"
              label="Email"
              name="email"
              placeholder="Email address"
              startContent={<IconMailFilled />}
              type="email"
            />
            <Input
              className="mt-4"
              label="Password"
              name="password"
              placeholder="Password"
              startContent={<IconLockFilled />}
              type="password"
            />
            <div className="flex justify-end mt-4">
              <Link
                color="foreground"
                href="/recover-account"
                underline="hover"
              >
                Forgot password?
              </Link>
            </div>
          </div>

          <Button className="mt-8 w-full" color="primary" type="submit">
            Sign In
          </Button>
        </form>

        <Divider className="mt-4" />

        <span className="mt-8">Sign In As:</span>

        <div className="grid grid-cols-3 gap-4 mt-4">
          <Button variant="flat" onPress={() => navigate("/signin/agent")}>
            Agent
          </Button>
          <Button variant="flat" onPress={() => navigate("/signin/broker")}>
            Broker
          </Button>
          <Button variant="flat" onPress={() => navigate("/signin/developer")}>
            Developer
          </Button>
        </div>

        <div className="flex items-center justify-center w-full mt-8">
          <span className="text-foreground-700">
            Don&apos;t have an account?
          </span>
          <Link
            className="ml-3 cursor-pointer"
            href="/signup"
            underline="hover"
          >
            Create an Account
          </Link>
        </div>
      </div>
    </div>
  );
};
