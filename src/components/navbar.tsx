import React from "react";
import {
  IconHome,
  IconBuildingCommunity,
  IconUserSquareRounded,
} from "@tabler/icons-react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
  Tab,
  Tabs,
} from "@heroui/react";

export const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];

  return (
    <Navbar
      className="border-t-4 border-solid border-t-primary"
      maxWidth="full"
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <h1 className="font-bold text-xl">SIBOL</h1>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <div className="flex flex-wrap gap-4">
          <Tabs aria-label="Tabs variants" color="primary" variant="underlined">
            <Tab
              key="home"
              title={
                <div className="flex items-center space-x-2">
                  <IconHome />
                  <span>Home</span>
                </div>
              }
            />
            <Tab
              key="properties"
              title={
                <div className="flex items-center space-x-2">
                  <IconBuildingCommunity />
                  <span>Properties</span>
                </div>
              }
            />
            <Tab
              key="account"
              title={
                <div className="flex items-center space-x-2">
                  <IconUserSquareRounded />
                  <span>Account</span>
                </div>
              }
            />
          </Tabs>
        </div>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Button
            as={Link}
            color="primary"
            href="#"
            radius="full"
            variant="solid"
          >
            Sign In
          </Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              color={
                index === 2
                  ? "primary"
                  : index === menuItems.length - 1
                    ? "danger"
                    : "foreground"
              }
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};
