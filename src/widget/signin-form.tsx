import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Button,
  Divider,
  Input,
  Link,
  Select,
  SelectItem,
} from "@heroui/react";
import {
  IconLockFilled,
  IconMailFilled,
  IconUserFilled,
} from "@tabler/icons-react";

export const SignInCardForm = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const validRoles = ["client", "developer", "agent", "broker"];

  const roleFromUrl = searchParams.get("role");
  const defaultRole = validRoles.includes(roleFromUrl || "")
    ? roleFromUrl
    : "client";

  useEffect(() => {
    if (!roleFromUrl || !validRoles.includes(roleFromUrl)) {
      searchParams.set("role", "client");
      setSearchParams(searchParams);
    }
  }, [roleFromUrl, searchParams, setSearchParams]);

  const handleRoleChange = (keys: any) => {
    const value = Array.from(keys)[0] as string;

    searchParams.set("role", value.toString());
    setSearchParams(searchParams);
  };

  return (
    <div className="container mx-auto p-8 h-screen flex flex-col items-center justify-center relative">
      {/* Background blobs */}
      <div className="absolute top-46 -left-10 w-72 h-72 bg-green-300 rounded-full blur-3xl opacity-30" />
      <div className="absolute top-20 right-20 w-60 h-60 bg-primary-300 rounded-full blur-2xl opacity-20" />
      <div className="absolute bottom-20 left-1/3 w-96 h-96 bg-red-300 rounded-full blur-[100px] opacity-20" />

      <div className="w-lg mx-auto bg-white rounded-2xl shadow-large shadow-gray-300 p-8 flex flex-col items-center justify-center z-10">
        <span className="text-foreground-700 text-4xl mt-4 font-bold">
          Welcome Back,{" "}
          {defaultRole?.charAt(0).toUpperCase()! + defaultRole?.slice(1)}!
        </span>
        <span className="text-foreground-700 mt-3">
          Answers to your real estate questions and concerns
        </span>

        <form action="#" className="flex flex-col w-full" method="post">
          <div className="flex flex-col w-full mt-8">
            <Select
              className="w-full"
              defaultSelectedKeys={[defaultRole ?? "client"]}
              label="Role"
              placeholder="Choose a role"
              startContent={<IconUserFilled />}
              onSelectionChange={handleRoleChange}
            >
              <SelectItem key="client">Client</SelectItem>
              <SelectItem key="developer">Developer</SelectItem>
              <SelectItem key="agent">Agent</SelectItem>
              <SelectItem key="broker">Broker</SelectItem>
            </Select>

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
