import { Button } from "@heroui/button";
import { IconPlus, IconRobotFace } from "@tabler/icons-react";

export const AgentAutomation = () => {
  return (
    <div className="p-8 rounded-large shadow-medium bg-white">
      <div className="flex items-start justify-between">
        <div className="flex items-center">
          <IconRobotFace className="text-gray-500" size={26} />
          <span className="text-lg font-bold ml-2 text-foreground-700">
            Automation Workflow
          </span>
        </div>
        <Button color="primary" startContent={<IconPlus />} variant="flat">
          Add Lead
        </Button>
      </div>
    </div>
  );
};
