import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { Avatar, Button, Input, Navbar, Tab, Tabs } from "@heroui/react";
import {
  IconArrowNarrowRight,
  IconBell,
  IconMessage2,
  IconSearch,
} from "@tabler/icons-react";

import ImgLogo from "../assets/images/ic_logo.png";

import { auth, db } from "@/firebase";

export const NavBar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [user, setUser] = useState<{
    isAuthenticated: boolean;
    fullName: string | null;
    role: string | null;
    photoURL: string | null;
  }>({
    isAuthenticated: false,
    fullName: null,
    role: null,
    photoURL: null,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const docRef = doc(db, "clients", firebaseUser.uid);
        const docSnap = await getDoc(docRef);

        const role = docSnap.exists() ? docSnap.data().role : "client";
        const fullName = docSnap.exists() ? docSnap.data().fullName : "User";

        setUser({
          isAuthenticated: true,
          fullName,
          role,
          photoURL: firebaseUser.photoURL,
        });
      } else {
        setUser({
          isAuthenticated: false,
          fullName: null,
          role: null,
          photoURL: null,
        });
      }
    });

    return () => unsubscribe();
  }, []);

  const handleAvatarClick = () => {
    if (user.role === "agent") {
      navigate("/profile/agent");
    } else {
      navigate("/profile/client");
    }
  };

  return (
    <Navbar
      className={`border-t-4 border-solid border-t-primary ${
        user.role === "agent" ? "" : "h-30"
      }`}
      maxWidth="full"
    >
      <div className="flex flex-col justify-between">
        <div>
          <a className="flex items-center" href="/">
            <img
              alt="Atuna Homes Logo"
              className="h-10 w-10 ml-4"
              src={ImgLogo}
            />
            <h1 className="text-3xl ml-4 font-bold text-foreground-700 tracking-tighter">
              Atuna
            </h1>
          </a>
          {user.role !== "agent" && (
            <div className="flex flex-wrap gap-4">
              <Tabs
                aria-label="Tabs variants"
                color="primary"
                selectedKey={pathname}
                size="lg"
                variant="underlined"
              >
                <Tab key="/" href="/" title="Home" />
                <Tab
                  key="/properties"
                  href="/properties?tab=search_properties"
                  title="Properties"
                />

                <Tab key="/demo" href="/demo" title="Demo" />

              </Tabs>


              
              
            </div>
          )}
        </div>
      </div>

      {user.isAuthenticated ? (
        <div className="flex items-center justify-center gap-4">
          <Input
            className="mr-3 w-sm shadow-small rounded-full bg-white"
            placeholder="Search anything..."
            radius="full"
            size="lg"
            startContent={<IconSearch className="text-primary" />}
            type="text"
            variant="bordered"
          />
          <Button
            isIconOnly
            className="bg-white shadow-medium"
            radius="full"
            variant="bordered"
          >
            <IconMessage2 className="text-foreground-700" />
          </Button>
          <Button
            isIconOnly
            className="bg-white shadow-medium mr-8"
            radius="full"
            variant="bordered"
          >
            <IconBell className="text-foreground-700" />
          </Button>
          <div
            className="flex items-center gap-3 cursor-pointer"
            role="button"
            tabIndex={0}
            onClick={handleAvatarClick}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleAvatarClick();
              }
            }}
          >
            <span className="text-sm font-medium text-foreground-700">
              {user.fullName?.split(" ")[0]}
            </span>
            <Avatar
              isBordered
              name={user.fullName ?? "User"}
              size="md"
              src={user.photoURL ?? undefined}
            />
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <Button
            className="mr-3"
            color="primary"
            radius="full"
            variant="ghost"
            onPress={() => navigate("/sign-in")}
          >
            Sign In
          </Button>
          <Button
            color="primary"
            radius="full"
            variant="shadow"
            onPress={() => navigate("/sign-up")}
          >
            Get Started
            <IconArrowNarrowRight />
          </Button>
        </div>
      )}
    </Navbar>
  );
};
