import {
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
  IconBuildingCommunity,
  IconSearch,
  IconAdjustmentsHorizontal,
  IconUsers,
} from "@tabler/icons-react";
import { useState } from "react";

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
    null,
  );

  const handleCardClick = (team: CardTeamInterface) => {
    setSelectedTeam(team);
    onOpen();
  };

  return (
    <div className="flex flex-col bg-white p-8 rounded-large shadow-medium">
      <div className="flex items-center gap-8">
        <SearchBar />
        <Button color="primary" startContent={<IconPlus />} variant="flat">
          Create Team
        </Button>
      </div>

      <div className="grid grid-cols-4 mt-8 gap-4">
        {teams.map((team, index) => (
          <CardTeam
            key={index}
            {...team}
            onClick={() => handleCardClick(team)}
          />
        ))}
      </div>

      {selectedTeam && (
        <TeamModal isOpen={isOpen} team={selectedTeam} onClose={onClose} />
      )}
    </div>
  );
};

const SearchBar = () => {
  return (
    <div className="flex items-center w-full">
      <form action="#" className="flex items-center w-full" method="get">
        <Input
          endContent={
            <Dropdown>
              <DropdownTrigger>
                <Button
                  isIconOnly
                  className="ml-4"
                  radius="full"
                  variant="light"
                >
                  <IconAdjustmentsHorizontal />
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Filter Options">
                <DropdownItem key="name">Name</DropdownItem>
                <DropdownItem key="location">Location</DropdownItem>
                <DropdownItem key="date">Date</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          }
          placeholder="Search team..."
          size="lg"
          startContent={<IconSearch />}
        />
        <Button isIconOnly className="hidden" type="submit">
          <IconSearch />
        </Button>
      </form>
    </div>
  );
};

const CardTeam = ({ name, totalProperties, onClick }: CardTeamInterface) => {
  return (
    <div className="text-left shadow-small rounded-large overflow-hidden transition w-full focus:outline-none focus:ring-2 focus:ring-primary">
      <div className="p-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">{name}</h3>
          <Dropdown>
            <DropdownTrigger>
              <Button
                isIconOnly
                className="ml-4"
                radius="full"
                size="sm"
                variant="light"
              >
                <IconAdjustmentsHorizontal />
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Filter Options">
              <DropdownItem key="delete">Delete</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
        <div className="block">
          <p className="text-sm text-gray-600 flex items-center mt-1">
            <IconBuildingCommunity className="mr-2" size={18} />
            {totalProperties} Properties
          </p>
          <p className="text-sm text-gray-600 flex items-center mt-1">
            <IconUsers className="mr-2" size={18} />8 Members
          </p>
        </div>
        <Button
          className="w-full mt-4"
          color="primary"
          size="sm"
          onPress={onClick}
        >
          View Team
        </Button>
      </div>
    </div>
  );
};
