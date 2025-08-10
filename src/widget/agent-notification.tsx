import { Button } from "@heroui/react";
import { IconBell, IconCheck } from "@tabler/icons-react";

export const AgentNotification = () => {
  return (
    <div className="p-8 rounded-large shadow-medium bg-white">
      <div className="flex items-start justify-between">
        <div className="flex items-center">
          <IconBell className="text-gray-500" size={26} />
          <span className="text-lg font-bold ml-2 text-foreground-700">
            Notifications
          </span>
        </div>
        <Button color="primary" startContent={<IconCheck />} variant="flat">
          Mark all as read
        </Button>
      </div>
    </div>
  );
};
