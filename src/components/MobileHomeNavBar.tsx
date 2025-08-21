import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
} from "@heroui/react";

import ImgLogo from "../assets/images/ic_logo.png";

export default function MobileHomeNavBar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = ["Home", "Properties", "About Us"];

  return (
    <Navbar className="bg-auto" onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="md:hidden"
        />
        <NavbarBrand>
          <img
            alt="Atuna Homes Logo"
            className="h-10 w-10 ml-4"
            src={ImgLogo}
          />
          <h1 className="text-3xl ml-4 font-bold text-foreground-700 tracking-tighter">
            Atuna
          </h1>
        </NavbarBrand>
      </NavbarContent>

      <NavbarMenu>
        <div className="">
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
        </div>
      </NavbarMenu>
    </Navbar>
  );
}
