import { Button } from "@heroui/react";
import {
  IconLayout,
  IconCalendar,
  IconMap,
  IconBuildingCommunity,
} from "@tabler/icons-react";

export const AgentSideBar = () => {
  return (
    <div className="w-16 fixed left-8 top-36 bo shadow-medium flex flex-col justify-center items-center py-4 rounded-large gap-2 bg-white">
      <Button isIconOnly className="text-white" color="primary" variant="solid">
        <IconLayout />
      </Button>
      <Button isIconOnly className="text-foreground-700" variant="light">
        <IconBuildingCommunity />
      </Button>
      <Button isIconOnly className="text-foreground-700" variant="light">
        <IconMap />
      </Button>
      <Button isIconOnly className="text-foreground-700" variant="light">
        <IconCalendar />
      </Button>
    </div>
  );
};
