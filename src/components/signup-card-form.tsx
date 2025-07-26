import { Button, Input } from "@heroui/react";
import {
  IconMailFilled,
  IconUserFilled,
  IconLockFilled,
} from "@tabler/icons-react";

export const SignUpCardForm = () => {
  return (
    <div className="container mx-auto p-8 h-screen flex flex-col items-center justify-center">
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
        <Input
          className="mt-8"
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
        <Button className="mt-8 w-full" color="primary">
          Submit
        </Button>
      </div>
    </div>
  );
};
