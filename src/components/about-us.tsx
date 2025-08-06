import { Avatar, Button } from "@heroui/react";
import {
  IconBrandFacebook,
  IconBrandLinkedin,
  IconBrandGithub,
} from "@tabler/icons-react";

import { teamMembers } from "@/data/team-member";

interface SocialIconInterface {
  url?: string;
  Icon: React.ElementType;
}

const SocialIcon = ({ url, Icon }: SocialIconInterface) =>
  url ? (
    <Button
      isIconOnly
      radius="full"
      variant="light"
      onPress={() => window.open(url, "_blank")}
    >
      <Icon />
    </Button>
  ) : null;

const TeamMemberCard = ({ member }: { member: (typeof teamMembers)[0] }) => (
  <div className="p-8 flex flex-col items-center justify-center bg-white rounded-2xl shadow-medium shadow-gray-300">
    <Avatar className="w-36 h-36 text-large" size="lg" src={member.image} />
    <span className="mt-6 text-xl font-bold text-foreground-700">
      {member.name}
    </span>
    <span className="text-primary">{member.role}</span>
    <p className="text-center mt-4 text-foreground-700">{member.description}</p>
    <div className="mt-4 flex gap-2">
      <SocialIcon Icon={IconBrandLinkedin} url={member.linkedin ?? undefined} />
      <SocialIcon Icon={IconBrandFacebook} url={member.facebook ?? undefined} />
      <SocialIcon Icon={IconBrandGithub} url={member.github ?? undefined} />
    </div>
  </div>
);

// About us widget.
export const AboutUs = () => {
  return (
    <div className="min-h-screen container mx-auto p-8 flex flex-col items-center justify-center">
      <h1 className="text-6xl text-center font-bold text-foreground-700">
        About Us
      </h1>
      <div className="w-30 h-2 mt-4 bg-gray-300 rounded-full" />
      <p className="text-xl text-center mt-8 max-w-1/2 text-foreground-700">
        Meet the team behind the Atuna
      </p>

      <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {teamMembers.map((member, index) => (
          <TeamMemberCard key={index} member={member} />
        ))}
      </div>
    </div>
  );
};
