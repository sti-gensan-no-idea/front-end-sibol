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
    linkedin: "https://www.linkedin.com/in/arjayferrer02",
    facebook: "https://www.facebook.com/lucifero.3301",
    github: "https://github.com/H4D3ZS",
  },
  {
    name: "Juanito Baldo Jr.",
    role: "Full-stack Developer",
    image: ImgBaldo,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ornare rutrum sem, eget maximus mauris lobortis a.",
    linkedin: "https://www.linkedin.com/in/juanito-baldo-534632261",
    facebook: "https://facebook.com/its.me.variant",
    github: "https://github.com/variantxx",
  },
  {
    name: "Joshua Alvarez",
    role: "UI/UX Designer",
    image: ImgAlvarez,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ornare rutrum sem, eget maximus mauris lobortis a.",
    linkedin: null,
    facebook: "https://www.facebook.com/joshua.alvarez.946256",
    github: "https://github.com/boosquack",
  },
  {
    name: "Joyce Armada",
    role: "Coach",
    image: ImgArmada,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ornare rutrum sem, eget maximus mauris lobortis a.",
    linkedin: "https://www.linkedin.com/in/joyce-armada-13491b278",
    facebook: "https://www.facebook.com/theonly.joice",
    github: null,
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
        Meet the team behind the Atuna
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
            <div className="mt-4 flex gap-2">
              {member.linkedin && (
                <Button
                  isIconOnly
                  radius="full"
                  variant="light"
                  onPress={() => window.open(member.linkedin, "_blank")}
                >
                  <IconBrandLinkedin />
                </Button>
              )}
              {member.facebook && (
                <Button
                  isIconOnly
                  radius="full"
                  variant="light"
                  onPress={() => window.open(member.facebook, "_blank")}
                >
                  <IconBrandFacebook />
                </Button>
              )}
              {member.github && (
                <Button
                  isIconOnly
                  radius="full"
                  variant="light"
                  onPress={() => window.open(member.github, "_blank")}
                >
                  <IconBrandGithub />
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
