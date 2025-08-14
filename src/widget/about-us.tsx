import { Avatar, Button } from "@heroui/react";
import {
  IconBrandFacebook,
  IconBrandLinkedin,
  IconBrandGithub,
} from "@tabler/icons-react";

import { teamMembers } from "@/data/about-us";

export const AboutUs = () => {
  return (
    <div className="min-h-screen p-6 sm:p-8 flex flex-col items-center justify-center">
      <h1 className="text-4xl sm:text-5xl md:text-6xl text-center font-bold text-foreground-700">
        About Us
      </h1>
      <div className="w-24 sm:w-30 h-2 mt-4 bg-gray-300 rounded-full" />
      <p className="text-lg sm:text-xl text-center mt-8 max-w-xl text-foreground-700">
        Meet the team behind Atuna
      </p>

      <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-7xl">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="p-6 sm:p-8 flex flex-col items-center justify-center bg-white rounded-2xl shadow-medium shadow-gray-300"
          >
            <Avatar
              className="w-28 h-28 sm:w-36 sm:h-36 text-large"
              size="lg"
              src={member.image}
            />
            <span className="mt-6 text-lg sm:text-xl font-bold text-foreground-700">
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
