import { useState } from "react";
import { Button, Divider, Input, Link } from "@heroui/react";
import {
  IconMailFilled,
  IconUserFilled,
  IconLockFilled,
  IconPhoneFilled,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks";

export const ClientSignUpCardForm = () => {
  const navigate = useNavigate();
  const { signup, loading, error } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    first_name: "",
    last_name: "",
    phone: "",
  });

  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    const userData = {
      email: formData.email,
      password: formData.password,
      first_name: formData.first_name,
      last_name: formData.last_name,
      phone: formData.phone,
      role: 'client' as const,
    };

    const success = await signup(userData, 'client');
    
    if (success) {
      alert("Account created successfully! Please sign in to continue.");
      navigate("/signin");
    }
  };

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

        <form onSubmit={handleSubmit} className="flex flex-col w-full">
          <div className="flex flex-col w-full mt-8">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}

            <Input
              label="First name"
              name="first_name"
              placeholder="First name"
              startContent={<IconUserFilled />}
              value={formData.first_name}
              onChange={(e) => handleInputChange("first_name", e.target.value)}
              required
            />
            <Input
              className="mt-4"
              label="Last name"
              name="last_name"
              placeholder="Last name"
              startContent={<IconUserFilled />}
              value={formData.last_name}
              onChange={(e) => handleInputChange("last_name", e.target.value)}
              required
            />
            <Input
              className="mt-4"
              label="Email"
              name="email"
              placeholder="Email address"
              startContent={<IconMailFilled />}
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              required
            />
            <Input
              className="mt-4"
              label="Phone"
              name="phone"
              placeholder="Phone number"
              startContent={<IconPhoneFilled />}
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
            />
            <Input
              className="mt-4"
              label="Set password"
              name="password"
              placeholder="Set password"
              startContent={<IconLockFilled />}
              type="password"
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              required
            />
            <Input
              className="mt-4"
              label="Confirm password"
              name="confirmPassword"
              placeholder="Confirm password"
              startContent={<IconLockFilled />}
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
              required
            />
          </div>

          <Button 
            className="mt-8 w-full" 
            color="primary" 
            type="submit"
            isLoading={loading}
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Submit"}
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
