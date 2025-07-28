import { useState } from "react";
import { Button, Divider, Input, Link } from "@heroui/react";
import {
  IconMailFilled,
  IconUserFilled,
  IconLockFilled,
  IconMapPinFilled,
} from "@tabler/icons-react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

import { auth, db } from "../firebase";

export const SignUpCardForm = () => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    address: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");

      return;
    }

    try {
      setLoading(true);

      // Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );
      const user = userCredential.user;

      // Store user info in Firestore with role: "client"
      await setDoc(doc(db, "clients", user.uid), {
        uid: user.uid,
        fullName: form.fullName,
        email: form.email,
        address: form.address,
        role: "client", // <-- added role here
        createdAt: new Date(),
      });

      alert("Account created successfully!");
    } catch (error: any) {
      alert("Sign up failed: " + error.message);
    } finally {
      setLoading(false);
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

        <div className="flex flex-col w-full mt-8">
          <Input
            label="Full name"
            name="fullName"
            placeholder="Full name"
            startContent={<IconUserFilled />}
            value={form.fullName}
            onChange={handleChange}
          />
          <Input
            className="mt-4"
            label="Email"
            name="email"
            placeholder="Email address"
            startContent={<IconMailFilled />}
            value={form.email}
            onChange={handleChange}
          />
          <Input
            className="mt-4"
            label="Home address"
            name="address"
            placeholder="Complete home address"
            startContent={<IconMapPinFilled />}
            value={form.address}
            onChange={handleChange}
          />
          <Input
            className="mt-4"
            label="Set password"
            name="password"
            placeholder="Set password"
            startContent={<IconLockFilled />}
            type="password"
            value={form.password}
            onChange={handleChange}
          />
          <Input
            className="mt-4"
            label="Confirm password"
            name="confirmPassword"
            placeholder="Confirm password"
            startContent={<IconLockFilled />}
            type="password"
            value={form.confirmPassword}
            onChange={handleChange}
          />
        </div>

        <Button
          className="mt-8 w-full"
          color="primary"
          isLoading={loading}
          onClick={handleSubmit}
        >
          Submit
        </Button>

        <Divider className="mt-4" />
        <div className="flex items-center justify-center w-full mt-10">
          <span className="text-foreground-700">Already have an account?</span>
          <Link
            className="ml-3 cursor-pointer"
            href="/sign-in"
            underline="hover"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};
