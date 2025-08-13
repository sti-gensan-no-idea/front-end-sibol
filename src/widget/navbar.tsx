import { useLocation, useNavigate } from "react-router-dom";
<<<<<<< HEAD
import { Avatar, Button, Input, Navbar, Tab, Tabs } from "@heroui/react";
import {
  IconArrowNarrowRight,
  IconBell,
  IconMessage2,
  IconSearch,
} from "@tabler/icons-react";
=======
import { Button, Navbar, Tab, Tabs } from "@heroui/react";
import { IconArrowNarrowRight } from "@tabler/icons-react";
>>>>>>> 07ae9a50f2e682c4f396f1ce13b6d267ea034847

import ImgLogo from "../assets/images/ic_logo.png";

export const NavBar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

<<<<<<< HEAD
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

  const handleAvatarClick = () => {
    if (user.role === "agent") {
      navigate("/profile/agent");
    } else {
      navigate("/profile/client");
    }
  };

=======
>>>>>>> 07ae9a50f2e682c4f396f1ce13b6d267ea034847
  return (
    <Navbar
      className="border-t-4 border-solid border-t-primary h-30"
      maxWidth="full"
    >
      <div className="flex flex-col justify-between">
        <div>
          {/* <MobileHomeNavBar /> */}
          <div className="flex items-center">
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
          </div>
          <div className="hidden md:flex flex-wrap gap-4">
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
                href="/properties?tab=properties"
                title="Properties"
              />
              <Tab key="/about" href="/about" title="About Us" />
            </Tabs>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center">
        <Button
          className="mr-3 hidden md:flex"
          color="primary"
          radius="full"
          variant="ghost"
          onPress={() => navigate("/signin")}
        >
          Sign In
        </Button>
        <Button
          color="primary"
          radius="full"
          variant="shadow"
          onPress={() => navigate("/signup")}
        >
          Get Started
          <IconArrowNarrowRight />
        </Button>
      </div>
    </Navbar>
  );
};
