import { Avatar, Button } from "@heroui/react";
import {
  IconBrandFacebook,
  IconBrandLinkedin,
  IconBrandGithub,
} from "@tabler/icons-react";

import ImgBaldo from "../assets/images/img_baldo.jpg";
import ImgFerrer from "../assets/images/img_ferrer.jpg";
import ImgAlvarez from "../assets/images/img_alvarez.jpg";
import ImgArmada from "../assets/images/img_armada.jpg";

const teamMembers = [
  {
    name: "Rolando Ferrer",
    role: "Web Security / Back-end Developer",
    image: ImgFerrer,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ornare rutrum sem, eget maximus mauris lobortis a.",
  },
  {
    name: "Juanito Baldo Jr.",
    role: "Full-stack Developer",
    image: ImgBaldo,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ornare rutrum sem, eget maximus mauris lobortis a.",
  },
  {
    name: "Joshua Alvarez",
    role: "UI/UX Designer",
    image: ImgAlvarez,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ornare rutrum sem, eget maximus mauris lobortis a.",
  },
  {
    name: "Joyce Armada",
    role: "Coach",
    image: ImgArmada,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ornare rutrum sem, eget maximus mauris lobortis a.",
  },
];

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

      <div className="mt-14 grid grid-cols-4 gap-8">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="p-8 flex flex-col items-center justify-center bg-white rounded-2xl shadow-medium shadow-gray-300"
          >
            <Avatar
              className="w-36 h-36 text-large"
              size="lg"
              src={member.image}
            />
            <span className="mt-6 text-xl font-bold text-foreground-700">
              {member.name}
            </span>
            <span className="text-primary">{member.role}</span>
            <p className="text-center mt-4 text-foreground-700">
              {member.description}
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
        ))}
      </div>
    </div>
  );
};
