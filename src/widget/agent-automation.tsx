import { Button } from "@heroui/button";
import { IconPlus, IconRobotFace } from "@tabler/icons-react";

export const AgentAutomation = () => {
  return (
    <div className="p-4 sm:p-6 md:p-8 rounded-large shadow-medium bg-white">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        {/* Title Section */}
        <div className="flex items-center">
          <IconRobotFace className="text-gray-500 shrink-0" size={26} />
          <span className="text-base sm:text-lg font-bold ml-2 text-foreground-700">
            Automation Workflow
          </span>
        </div>

        {/* Button */}
        <Button
          color="primary"
          startContent={<IconPlus />}
          variant="flat"
          className="w-full md:w-auto"
        >
          Add Lead
        </Button>
      </div>
    </div>
  );
};
