import { Button, Divider, Input, Link } from "@heroui/react";
import {
  IconMailFilled,
  IconUserFilled,
  IconLockFilled,
  IconMapPinFilled,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

export const ClientSignUpCardForm = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto p-8 h-screen flex flex-col items-center justify-center relative">
      {/* background blur blobs */}
      <div className="absolute top-46 -left-10 w-72 h-72 bg-green-300 rounded-full blur-3xl opacity-30" />
      <div className="absolute top-20 right-20 w-60 h-60 bg-primary-300 rounded-full blur-2xl opacity-20" />
      <div className="absolute bottom-20 left-1/3 w-96 h-96 bg-red-300 rounded-full blur-[100px] opacity-20" />

      <div className="w-lg mx-auto bg-white rounded-2xl shadow-large shadow-gray-300 p-8 flex flex-col items-center justify-center z-10">
        <span className="text-foreground-700 text-4xl mt-4 font-bold">
          Create your Account
        </span>
        <span className="text-foreground-700 mt-3">
          Join thousands of property enthusiasts
        </span>

        <form action="#" className="flex flex-col w-full" method="post">
          <div className="flex flex-col w-full mt-8">
            <Input
              label="Full name"
              name="fullName"
              placeholder="Full name"
              startContent={<IconUserFilled />}
            />
            <Input
              className="mt-4"
              label="Email"
              name="email"
              placeholder="Email address"
              startContent={<IconMailFilled />}
            />
            <Input
              className="mt-4"
              label="Home address"
              name="address"
              placeholder="Complete home address"
              startContent={<IconMapPinFilled />}
            />
            <Input
              className="mt-4"
              label="Set password"
              name="password"
              placeholder="Set password"
              startContent={<IconLockFilled />}
              type="password"
            />
            <Input
              className="mt-4"
              label="Confirm password"
              name="confirmPassword"
              placeholder="Confirm password"
              startContent={<IconLockFilled />}
              type="password"
            />
          </div>

          <Button className="mt-8 w-full" color="primary" type="submit">
            Submit
          </Button>
        </form>

        <Divider className="mt-4" />

        <span className="mt-8">Sign Up As:</span>

        <div className="grid grid-cols-3 gap-4 mt-4">
          <Button variant="flat" onPress={() => navigate("/signup/agent")}>
            Agent
          </Button>
          <Button variant="flat" onPress={() => navigate("/signup/broker")}>
            Broker
          </Button>
          <Button variant="flat" onPress={() => navigate("/signup/developer")}>
            Developer
          </Button>
        </div>

        <div className="flex items-center justify-center w-full mt-10">
          <span className="text-foreground-700">Already have an account?</span>
          <Link
            className="ml-3 cursor-pointer"
            href="/signin"
            underline="hover"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};
