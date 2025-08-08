import { Avatar, AvatarGroup, Button } from "@heroui/react";
import {
  IconPlus,
  IconMapPin,
  IconBuildingCommunity,
} from "@tabler/icons-react";

import BgPattern from "../assets/images/pattern.png";

interface CardTeamInterface {
  name: string;
  location: string;
  totalProperties: number;
}

export const BrokerTeams = () => {
  return (
    <div className="flex flex-col p-8 rounded-large bg-white shadow-medium">
      <h2 className="text-2xl font-bold">My Teams</h2>
      <div className="grid grid-cols-3 mt-8 gap-4">
        <CardTeam
          location="General Santos City"
          name="Dame un Grr"
          totalProperties={10}
        />
        <CardTeam
          location="General Santos City"
          name="Hakdog"
          totalProperties={10}
        />
        <CardTeam
          location="General Santos City"
          name="Team 404 Not Found"
          totalProperties={10}
        />
        <CardTeam
          location="General Santos City"
          name="Hakdog"
          totalProperties={10}
        />
        <CardTeam
          location="General Santos City"
          name="Team 404 Not Found"
          totalProperties={10}
        />
        <CardTeam
          location="General Santos City"
          name="Hakdog"
          totalProperties={10}
        />
        <CardTeam
          location="General Santos City"
          name="Team 1"
          totalProperties={10}
        />
        <div className="rounded-medium flex flex-col items-center justify-center cursor-pointer bg-gray-100">
          <Button isIconOnly radius="full">
            <IconPlus />
          </Button>
          <span className="mt-2">Create Team</span>
        </div>
      </div>
    </div>
  );
};

// Adjust path as needed

const CardTeam = ({ name, location, totalProperties }: CardTeamInterface) => {
  return (
    <div className="bg-white shadow-small hover:shadow-medium cursor-pointer rounded-large overflow-hidden">
      <div
        className="h-30 w-full mb-4 relative"
        style={{
          backgroundImage: `url(${BgPattern})`,
        }}
      >
        <AvatarGroup isBordered className="absolute left-4 bottom-4">
          <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
          <Avatar src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
          <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
          <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
          <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
          <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026708c" />
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
          Properties {totalProperties}
        </p>
      </div>
    </div>
  );
};
