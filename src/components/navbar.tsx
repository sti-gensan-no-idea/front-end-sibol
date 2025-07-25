import { Button, Navbar, Tab, Tabs } from "@heroui/react";
import { IconArrowNarrowRight } from "@tabler/icons-react";

export const NavBar = () => {
  return (
    <Navbar
      className="border-t-4 border-solid border-t-primary h-30"
      maxWidth="full"
    >
      <div className="flex flex-col justify-between">
        <div>
          <h1 className="text-3xl ml-4 font-bold">Sibol Homes</h1>
          <div className="flex flex-wrap gap-4">
            <Tabs
              aria-label="Tabs variants"
              color="primary"
              size="lg"
              variant="underlined"
            >
              <Tab key="home" title="Home" />
              <Tab key="properties" title="Properties" />
              <Tab key="contact" title="Contact" />
              <Tab key="about" title="About Us" />
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
