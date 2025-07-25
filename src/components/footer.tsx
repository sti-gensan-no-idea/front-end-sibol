import { Button } from "@heroui/react";
import {
  IconBrandInstagram,
  IconBrandFacebook,
  IconBrandYoutube,
} from "@tabler/icons-react";

export const Footer = () => {
  return (
    <footer className="bg-gray-500 text-white p-8 ">
      <div className="container mx-auto flex flex-col">
        <div className="flex items-center justify-between">
          <p>
            Copyright &copy; {new Date().getFullYear()} Sibol. All rights
            reserved.
          </p>
          <div className="flex items-center justify-center">
            <Button
              isIconOnly
              aria-label="Take a photo"
              className="text-white"
              radius="full"
              variant="light"
            >
              <IconBrandFacebook />
            </Button>
            <Button
              isIconOnly
              aria-label="Take a photo"
              className="ml-4 text-white"
              radius="full"
              variant="light"
            >
              <IconBrandInstagram />
            </Button>
            <Button
              isIconOnly
              aria-label="Take a photo"
              className="ml-4 text-white"
              radius="full"
              variant="light"
            >
              <IconBrandYoutube />
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};
