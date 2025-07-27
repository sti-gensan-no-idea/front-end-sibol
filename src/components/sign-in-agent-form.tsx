import { Button, Input, Link } from "@heroui/react";
import { IconMailFilled, IconLockFilled } from "@tabler/icons-react";

export const SignInAgentCardForm = () => {
  return (
    <div className="container mx-auto p-8 h-screen flex flex-col items-center justify-center relative">
      <div className="absolute top-46 -left-10 w-72 h-72 bg-green-300 rounded-full blur-3xl opacity-30 -z-10" />
      <div className="absolute top-20 right-20 w-60 h-60 bg-primary-300 rounded-full blur-2xl opacity-20 -z-10" />
      <div className="absolute bottom-20 left-1/3 w-96 h-96 bg-red-300 rounded-full blur-[100px] opacity-20 -z-10" />

      <div
        className="w-lg mx-auto bg-white rounded-2xl shadow-large shadow-gray-300 p-8
		  flex
		  flex-col
				items-center
				justify-center
		  z-10"
      >
        <span className="flex items-center justify-center text-foreground-700 text-4xl mt-4 font-bold">
          Welcome Agent!
        </span>
        <span className="flex items-center justify-center text-foreground-700 mt-3">
          Manage to your real estate clients
        </span>
        <div className="flex flex-col w-full mt-8">
          <Input
            className="mt-4"
            label="Email"
            placeholder="Email address"
            startContent={<IconMailFilled />}
            type="email"
          />
          <Input
            className="mt-4"
            label="Password"
            placeholder="Password"
            startContent={<IconLockFilled />}
            type="password"
          />
          <div className="flex justify-end mt-4">
            <Link color="foreground" href="/recover-account" underline="hover">
              Forgot password?
            </Link>
          </div>
        </div>
        <Button className="mt-8 w-full" color="primary">
          Sign In
        </Button>
      </div>
    </div>
  );
};
