import {
  Avatar,
  AvatarGroup,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  useDisclosure,
} from "@heroui/react";
import {
  IconPlus,
  IconMapPin,
  IconBuildingCommunity,
  IconSearch,
  IconAdjustmentsHorizontal,
} from "@tabler/icons-react";
import { useState } from "react";

import BgPattern from "../assets/images/pattern.png";

import { TeamModal } from "./broker-team-modal";

import { teams } from "@/data/teams";

interface CardTeamInterface {
  name: string;
  location: string;
  totalProperties: number;
  agents: string[];
  onClick?: () => void;
}

export const BrokerTeams = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedTeam, setSelectedTeam] = useState<CardTeamInterface | null>(
    null
  );

  const handleCardClick = (team: CardTeamInterface) => {
    setSelectedTeam(team);
    onOpen();
  };

  return (
    <div className="flex flex-col">
      <h2 className="text-2xl font-bold">My Teams</h2>
      <SearchBar />

      <div className="grid grid-cols-4 mt-8 gap-4">
        {teams.map((team, index) => (
          <CardTeam
            key={index}
            {...team}
            onClick={() => handleCardClick(team)}
          />
        ))}

        <div className="rounded-medium flex flex-col items-center justify-center cursor-pointer bg-white shadow-medium">
          <Button isIconOnly radius="full">
            <IconPlus />
          </Button>
          <span className="mt-2">Create Team</span>
        </div>
      </div>

      {selectedTeam && (
        <TeamModal isOpen={isOpen} team={selectedTeam} onClose={onClose} />
      )}
    </div>
  );
};

const SearchBar = () => {
  return (
    <div className="rounded-large bg-white shadow-small p-4 mt-8 flex items-center">
      <form action="#" className="flex items-center w-full" method="get">
        <Input
          placeholder="Search team..."
          size="lg"
          startContent={<IconSearch />}
        />
        <Button isIconOnly className="hidden" type="submit">
          <IconSearch />
        </Button>
      </form>
      <Dropdown>
        <DropdownTrigger>
          <Button isIconOnly className="ml-4" radius="full" variant="light">
            <IconAdjustmentsHorizontal />
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Filter Options">
          <DropdownItem key="name">Name</DropdownItem>
          <DropdownItem key="location">Location</DropdownItem>
          <DropdownItem key="date">Date</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

const CardTeam = ({
  name,
  location,
  totalProperties,
  agents,
  onClick,
}: CardTeamInterface) => {
  return (
    <button
      className="text-left bg-white shadow-small hover:shadow-medium cursor-pointer rounded-large overflow-hidden transition w-full focus:outline-none focus:ring-2 focus:ring-primary"
      onClick={onClick}
    >
      <div
        className="h-24 w-full mb-4 relative bg-repeat"
        style={{
          backgroundImage: `url(${BgPattern})`,
        }}
      >
        <AvatarGroup isBordered className="absolute left-4 bottom-4">
          {agents.map((src, i) => (
            <Avatar key={i} src={src} />
          ))}
        </AvatarGroup>
      </div>

      <div className="pl-6 pr-6 pb-6">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-sm text-gray-600 flex items-center mt-4">
          <IconMapPin className="mr-2" size={18} />
          {location}
        </p>
        <p className="text-sm text-gray-600 flex items-center mt-1">
          <IconBuildingCommunity className="mr-2" size={18} />
          {totalProperties} Properties
        </p>
      </div>
    </button>
  );
};
