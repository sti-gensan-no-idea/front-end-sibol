import { Avatar, Button } from "@heroui/react";
import {
  IconBrandFacebook,
  IconBrandLinkedin,
  IconBrandGithub,
} from "@tabler/icons-react";

import ImgBaldo from "../assets/images/img_baldo.jpg";
import ImgFerrer from "../assets/images/img_ferrer.jpg";
import ImgAlvarez from "../assets/images/img_alvarez.jpg";

export const AboutUs = () => {
  return (
    <div className="h-screen p-8 flex flex-col items-center justify-center">
      <h1 className="text-6xl text-center font-bold text-foreground-700">
        About Us
      </h1>
      <div className="w-30 h-2 mt-4 bg-gray-300 rounded-full" />
      <p className="text-xl text-center mt-8 max-w-1/2 text-foreground-700">
        Meet the team behind the Sibol Homes
      </p>

      <div className="mt-14 grid grid-cols-3 gap-8">
        <div className="p-8 w-sm flex flex-col items-center justify-center bg-white rounded-2xl shadow-medium shadow-gray-300">
          <Avatar className="w-36 h-36 text-large" size="lg" src={ImgFerrer} />
          <span className="mt-6 text-xl font-bold text-foreground-700">
            Rolando Ferrer.
          </span>
          <span className="text-primary">
            Web Security / Back-end Developer
          </span>
          <p className="text-center mt-4 text-foreground-700">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
            ornare rutrum sem, eget maximus mauris lobortis a.
          </p>
          <div className="mt-4">
            <Button isIconOnly radius="full" variant="light">
              <IconBrandLinkedin />
            </Button>
            <Button isIconOnly radius="full" variant="light">
              <IconBrandFacebook />
            </Button>
            <Button isIconOnly radius="full" variant="light">
              <IconBrandGithub />
            </Button>
          </div>
        </div>
        <div className="p-8 w-sm flex flex-col items-center justify-center bg-white rounded-2xl shadow-medium shadow-gray-300">
          <Avatar className="w-36 h-36 text-large" size="lg" src={ImgBaldo} />
          <span className="mt-6 text-xl font-bold text-foreground-700">
            Juanito Baldo Jr.
          </span>
          <span className="text-primary">Front-end Developer</span>
          <p className="text-center mt-4 text-foreground-700">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
            ornare rutrum sem, eget maximus mauris lobortis a.
          </p>
          <div className="mt-4">
            <Button isIconOnly radius="full" variant="light">
              <IconBrandLinkedin />
            </Button>
            <Button isIconOnly radius="full" variant="light">
              <IconBrandFacebook />
            </Button>
            <Button isIconOnly radius="full" variant="light">
              <IconBrandGithub />
            </Button>
          </div>
        </div>
        <div className="p-8 w-sm flex flex-col items-center justify-center bg-white rounded-2xl shadow-medium shadow-gray-300">
          <Avatar className="w-36 h-36 text-large" size="lg" src={ImgAlvarez} />
          <span className="mt-6 text-xl font-bold text-foreground-700">
            Joshua Alvarez
          </span>
          <span className="text-primary">UI/UX Designer</span>
          <p className="text-center mt-4 text-foreground-700">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
            ornare rutrum sem, eget maximus mauris lobortis a.
          </p>
          <div className="mt-4">
            <Button isIconOnly radius="full" variant="light">
              <IconBrandLinkedin />
            </Button>
            <Button isIconOnly radius="full" variant="light">
              <IconBrandFacebook />
            </Button>
            <Button isIconOnly radius="full" variant="light">
              <IconBrandGithub />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
