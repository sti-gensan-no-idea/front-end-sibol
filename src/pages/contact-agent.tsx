import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Button } from "@heroui/react";
import {
  IconMailFilled,
  IconUserFilled,
  IconMessage2Filled,
} from "@tabler/icons-react";
import { doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

import { db } from "../firebase"; // adjust path to your Firebase config
import { NavBar } from "@/components/navbar";

export const ContactAgentPage = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchClientData = async () => {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) return;

      const docRef = doc(db, "clients", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();

        setFullName(data.fullName || "");
        setEmail(data.email || "");
      }
    };

    fetchClientData();
  }, []);

  return (
    <div>
      <NavBar />
      <div className="container mx-auto p-8 h-screen flex flex-col items-center justify-center relative">
        {/* Background blobs */}
        <div className="absolute top-46 -left-10 w-72 h-72 bg-green-300 rounded-full blur-3xl opacity-30" />
        <div className="absolute top-20 right-20 w-60 h-60 bg-primary-300 rounded-full blur-2xl opacity-20" />
        <div className="absolute bottom-20 left-1/3 w-96 h-96 bg-red-300 rounded-full blur-[100px] opacity-20" />

        <div className="w-lg mx-auto bg-white rounded-2xl shadow-large shadow-gray-300 p-8 flex flex-col items-center justify-center z-10">
          <span className="text-foreground-700 text-4xl mt-4 font-bold">
            Contact Agent
          </span>
          <span className="text-foreground-700 mt-3">
            Answers to your real estate questions and concerns
          </span>

          <div className="flex flex-col w-full mt-8">
            <Input
              className="mt-4"
              label="Full name"
              name="name"
              placeholder="Full name"
              startContent={<IconUserFilled />}
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            <Input
              className="mt-4"
              label="Email"
              name="email"
              placeholder="Email address"
              startContent={<IconMailFilled />}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              className="mt-4"
              label="How can our agent help?"
              name="agenthelp"
              placeholder="Write your message..."
              startContent={<IconMessage2Filled />}
              type="text"
            />
          </div>

          <Button
            className="mt-8 w-full"
            color="primary"
            onPress={() => {
              alert("Done send!");
              navigate("/properties");
            }}
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};
