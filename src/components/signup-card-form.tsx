import { Button, Input } from "@heroui/react";
import {
  IconMailFilled,
  IconUserFilled,
  IconLockFilled,
  IconMapPinFilled,
} from "@tabler/icons-react";

export const SignUpCardForm = () => {
  return (
    <div className="container mx-auto p-8 h-screen flex flex-col items-center justify-center relative">
      <div className="absolute top-46 -left-10 w-72 h-72 bg-green-300 rounded-full blur-3xl opacity-30" />
      <div className="absolute top-20 right-20 w-60 h-60 bg-primary-300 rounded-full blur-2xl opacity-20" />
      <div className="absolute bottom-20 left-1/3 w-96 h-96 bg-red-300 rounded-full blur-[100px] opacity-20" />

      <div
        className="w-lg mx-auto bg-white rounded-2xl shadow-large shadow-gray-300 p-8
        flex
        flex-col
				items-center
				justify-center
        z-10"
      >
        <span className="flex items-center justify-center text-foreground-700 text-4xl mt-4 font-bold">
          Create your Account
        </span>
        <span className="flex items-center justify-center text-foreground-700 mt-3">
          Join thousands of properties enthusiasts
        </span>
        <div className="flex flex-col w-full mt-8">
          <Input
            label="Full name"
            placeholder="Full name"
            startContent={<IconUserFilled />}
            type="text"
          />
          <Input
            className="mt-4"
            label="Email"
            placeholder="Email address"
            startContent={<IconMailFilled />}
            type="email"
          />
          <Input
            className="mt-4"
            label="Home address"
            placeholder="Complete home address"
            startContent={<IconMapPinFilled />}
            type="text"
          />
          <Input
            className="mt-4"
            label="Set password"
            placeholder="Set password"
            startContent={<IconLockFilled />}
            type="password"
          />
          <Input
            className="mt-4"
            label="Confirm password"
            placeholder="Confirm password"
            startContent={<IconLockFilled />}
            type="password"
          />
        </div>
        <Button className="mt-8 w-full" color="primary">
          Submit
        </Button>
      </div>
    </div>
  );
};
