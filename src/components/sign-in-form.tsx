import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Divider, Input, Link } from "@heroui/react";
import { IconMailFilled, IconLockFilled } from "@tabler/icons-react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

import { auth, db } from "../firebase";

export const SignInCardForm = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignIn = async () => {
    try {
      setLoading(true);

      // Firebase Authentication sign-in
      const userCredential = await signInWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );
      const user = userCredential.user;

      // Fetch user document from 'clients' collection
      const userDocRef = doc(db, "clients", user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();

        if (userData.role === "client") {
          navigate("/profile/client");
        } else {
          alert("Access denied: User is not a client.");
        }
      } else {
        alert("Access denied: User role data not found.");
      }
    } catch (error: any) {
      console.error("Sign in failed:", error.message);
      alert("Failed to sign in: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-8 h-screen flex flex-col items-center justify-center relative">
      {/* Background blobs */}
      <div className="absolute top-46 -left-10 w-72 h-72 bg-green-300 rounded-full blur-3xl opacity-30 -z-10" />
      <div className="absolute top-20 right-20 w-60 h-60 bg-primary-300 rounded-full blur-2xl opacity-20 -z-10" />
      <div className="absolute bottom-20 left-1/3 w-96 h-96 bg-red-300 rounded-full blur-[100px] opacity-20 -z-10" />

      <div className="w-lg mx-auto bg-white rounded-2xl shadow-large shadow-gray-300 p-8 flex flex-col items-center justify-center z-10">
        <span className="text-foreground-700 text-4xl mt-4 font-bold">
          Welcome Back!
        </span>
        <span className="text-foreground-700 mt-3">
          Answers to your real estate questions and concerns
        </span>

        <div className="flex flex-col w-full mt-8">
          <Input
            className="mt-4"
            label="Email"
            name="email"
            placeholder="Email address"
            startContent={<IconMailFilled />}
            type="email"
            value={form.email}
            onChange={handleChange}
          />
          <Input
            className="mt-4"
            label="Password"
            name="password"
            placeholder="Password"
            startContent={<IconLockFilled />}
            type="password"
            value={form.password}
            onChange={handleChange}
          />
          <div className="flex justify-end mt-4">
            <Link color="foreground" href="/recover-account" underline="hover">
              Forgot password?
            </Link>
          </div>
        </div>

        <Button
          className="mt-8 w-full"
          color="primary"
          isLoading={loading}
          onClick={handleSignIn}
        >
          Sign In
        </Button>

        <Divider className="mt-4" />

        <Button
          className="mt-10"
          variant="flat"
          onPress={() => navigate("/sign-in-agent")}
        >
          Sign In as Agent
        </Button>

        <div className="flex items-center justify-center w-full mt-4">
          <span className="text-foreground-700">
            Don&apos;t have an account?
          </span>
          <Link
            className="ml-3 cursor-pointer"
            href="/sign-up"
            underline="hover"
          >
            Create an Account
          </Link>
        </div>
      </div>
    </div>
  );
};
