import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import {
  Avatar,
  Button,
  Input,
  Navbar,
  Tab,
  Tabs,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import {
  IconArrowNarrowRight,
  IconBell,
  IconMessage2,
  IconSearch,
  IconMenu2,
} from "@tabler/icons-react";

import ImgLogo from "../assets/images/ic_logo.png";

import { auth, db } from "@/firebase";

type UserInfo = {
  isAuthenticated: boolean;
  fullName: string | null;
  role: string | null;
  photoURL: string | null;
};

const useAuthStatus = () => {
  const [user, setUser] = useState<UserInfo>({
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

        const data = docSnap.exists() ? docSnap.data() : {};

        setUser({
          isAuthenticated: true,
          fullName: data.fullName || "User",
          role: data.role || "client",
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

  return user;
};

export const NavBar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const user = useAuthStatus();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleAvatarClick = () => {
    if (user.role === "agent") {
      navigate("/profile/agent");
    } else {
      navigate("/profile/client");
    }
  };

  const renderTabs = () => (
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
      <Tab key="/about-us" href="/about-us" title="About Us" />
    </Tabs>
  );

  const renderSearchBar = () => (
    <div className="hidden md:block">
      <Input
        className="w-64 shadow-small rounded-full bg-white"
        placeholder="Search anything..."
        radius="full"
        size="lg"
        startContent={<IconSearch className="text-primary" />}
        type="text"
        variant="bordered"
      />
    </div>
  );

  const renderUserIcons = () => (
    <div className="hidden md:flex items-center gap-3">
      <Button
        isIconOnly
        className="bg-white shadow"
        radius="full"
        variant="bordered"
      >
        <IconMessage2 className="text-foreground-700" />
      </Button>
      <Button
        isIconOnly
        className="bg-white shadow"
        radius="full"
        variant="bordered"
      >
        <IconBell className="text-foreground-700" />
      </Button>
    </div>
  );

  const renderAuthButtons = () => (
    <div className="hidden md:flex items-center gap-2">
      <Button
        color="primary"
        radius="full"
        variant="ghost"
        onPress={() => navigate("/sign-in")}
      >
        Sign In
      </Button>
      <Button
        color="primary"
        endContent={<IconArrowNarrowRight />}
        radius="full"
        variant="shadow"
        onPress={() => navigate("/sign-up")}
      >
        Get Started
      </Button>
    </div>
  );

  const renderAvatar = () => (
    <div
      className="flex items-center gap-2 cursor-pointer"
      role="button"
      tabIndex={0}
      onClick={handleAvatarClick}
      onKeyDown={(e) => {
        if (["Enter", " "].includes(e.key)) {
          e.preventDefault();
          handleAvatarClick();
        }
      }}
    >
      <span className="hidden md:block text-sm font-medium text-foreground-700">
        {user.fullName?.split(" ")[0]}
      </span>
      <Avatar
        isBordered
        name={user.fullName ?? "User"}
        size="md"
        src={user.photoURL ?? undefined}
      />
    </div>
  );

  const renderMobileDropdown = () => (
    <Dropdown>
      <DropdownTrigger>
        <Button
          isIconOnly
          className="md:hidden"
          radius="full"
          variant="light"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <IconMenu2 />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Mobile Navigation">
        <DropdownItem key="home" onClick={() => navigate("/")}>
          Home
        </DropdownItem>
        <DropdownItem
          key="properties"
          onClick={() => navigate("/properties?tab=search_properties")}
        >
          Properties
        </DropdownItem>
        <DropdownItem key="about-us" onClick={() => navigate("/about-us")}>
          About Us
        </DropdownItem>

        {user.isAuthenticated ? (
          <DropdownItem key="profile" onClick={handleAvatarClick}>
            Profile
          </DropdownItem>
        ) : (
          <>
            <DropdownItem key="sign-in" onClick={() => navigate("/sign-in")}>
              Sign In
            </DropdownItem>
            <DropdownItem key="sign-up" onClick={() => navigate("/sign-up")}>
              Sign Up
            </DropdownItem>
          </>
        )}
      </DropdownMenu>
    </Dropdown>
  );

  return (
    <Navbar
      className="border-t-4 border-solid border-t-primary"
      maxWidth="full"
    >
      <div className="flex items-center justify-between w-full px-4">
        {/* Left: Logo + Tabs */}
        <div className="flex items-center gap-4">
          <a className="flex items-center" href="/">
            <img alt="Atuna Logo" className="h-10 w-10" src={ImgLogo} />
            <h1 className="text-3xl font-bold text-foreground-700 tracking-tight ml-2">
              Atuna
            </h1>
          </a>
          {user.role !== "agent" && renderTabs()}
        </div>

        {/* Right: Search, Icons, Auth Buttons or Avatar */}
        <div className="flex items-center gap-4">
          {renderSearchBar()}
          {user.isAuthenticated ? (
            <>
              {renderUserIcons()}
              {renderAvatar()}
            </>
          ) : (
            renderAuthButtons()
          )}
          {renderMobileDropdown()}
        </div>
      </div>
    </Navbar>
  );
};
