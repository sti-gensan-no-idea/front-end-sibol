import { useLocation } from "react-router-dom";
import { Button, Navbar, Tab, Tabs } from "@heroui/react";
import { IconArrowNarrowRight } from "@tabler/icons-react";

export const NavBar = () => {
  const { pathname } = useLocation();

  return (
    <Navbar
      className="border-t-4 border-solid border-t-primary h-30"
      maxWidth="full"
    >
      <div className="flex flex-col justify-between">
        <div>
          <h1 className="text-3xl ml-4 font-bold text-foreground-700">
            Sibol Homes
          </h1>
          <div className="flex flex-wrap gap-4">
            <Tabs
              aria-label="Tabs variants"
              color="primary"
              selectedKey={pathname}
              size="lg"
              variant="underlined"
            >
              <Tab key="/" href="/" title="Home" />
              <Tab key="/properties" href="/properties" title="Properties" />
              <Tab key="/contact" href="/contact" title="Contact" />
              <Tab key="/about-us" href="/about-us" title="About Us" />
            </Tabs>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <Button className="mr-3" color="primary" radius="full" variant="ghost">
          Sign In
        </Button>
        <Button color="primary" radius="full" variant="shadow">
          Get Started
          <IconArrowNarrowRight />
        </Button>
      </div>
    </Navbar>
  );
};
