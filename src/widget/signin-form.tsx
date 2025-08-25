import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
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

import { useAuth } from "../lib/auth/useAuth";

export const SignInCardForm = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { signin, isLoading, error } = useAuth();

  const validRoles = ["client", "developer", "agent", "broker"];

  const roleFromUrl = searchParams.get("role");
  const redirectUrl = searchParams.get("redirect");
  const defaultRole = validRoles.includes(roleFromUrl || "")
    ? roleFromUrl
    : "client";

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: defaultRole || "client",
  });

  useEffect(() => {
    if (!roleFromUrl || !validRoles.includes(roleFromUrl)) {
      searchParams.set("role", "client");
      setSearchParams(searchParams);
    }
  }, [roleFromUrl, searchParams, setSearchParams]);

  const handleRoleChange = (keys: any) => {
    const value = Array.from(keys)[0] as string;
    
    setFormData((prev) => ({ ...prev, role: value }));
    searchParams.set("role", value.toString());
    setSearchParams(searchParams);
  };

  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await signin({
        credentials: { email: formData.email, password: formData.password },
        role: formData.role
      });

      // Handle redirect after successful login
      if (redirectUrl) {
        navigate(redirectUrl);
      } else {
        // Default dashboard routes based on role
        const dashboardRoutes = {
          client: "/profile/client",
          developer: "/profile/developer",
          agent: "/profile/agent",
          broker: "/profile/broker",
          admin: "/profile/admin",
        };
        
        navigate(dashboardRoutes[formData.role as keyof typeof dashboardRoutes] || "/profile/client");
      }
    } catch (err) {
      // Error is handled by the useAuth hook
    }
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
          {formData.role?.charAt(0).toUpperCase()! + formData.role?.slice(1)}!
        </span>
        <span className="text-foreground-700 mt-3">
          Answers to your real estate questions and concerns
        </span>

        <form className="flex flex-col w-full" onSubmit={handleSubmit}>
          <div className="flex flex-col w-full mt-8">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}

            <Select
              className="w-full"
              selectedKeys={[formData.role]}
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
              required
              className="mt-4"
              label="Email"
              name="email"
              placeholder="Email address"
              startContent={<IconMailFilled />}
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
            />
            <Input
              required
              className="mt-4"
              label="Password"
              name="password"
              placeholder="Password"
              startContent={<IconLockFilled />}
              type="password"
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
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

          <Button 
            className="mt-8 w-full" 
            color="primary" 
            type="submit"
            disabled={isLoading}
            isLoading={isLoading}
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </Button>
        </form>

        <Divider className="mt-4" />

        <div className="flex items-center justify-center w-full mt-8">
          <span className="text-foreground-700">
            Don&apos;t have an account?
          </span>
          <div className="ml-3 flex gap-2">
            <Link
              className="cursor-pointer"
              href="/signup/client"
              underline="hover"
            >
              Client
            </Link>
            <span className="text-default-400">|</span>
            <Link
              className="cursor-pointer"
              href="/signup/developer"
              underline="hover"
            >
              Developer
            </Link>
            <span className="text-default-400">|</span>
            <Link
              className="cursor-pointer"
              href="/signup/agent"
              underline="hover"
            >
              Agent
            </Link>
            <span className="text-default-400">|</span>
            <Link
              className="cursor-pointer"
              href="/signup/broker"
              underline="hover"
            >
              Broker
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
