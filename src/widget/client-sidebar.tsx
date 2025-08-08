import { useSearchParams } from "react-router-dom";
import { Button, Divider, Tooltip } from "@heroui/react";
import {
  IconLayout,
  IconLogout,
  IconBuildingCommunity,
} from "@tabler/icons-react";

const navItems = [
  { key: "dashboard", icon: <IconLayout />, label: "Dashboard" },
  {
    key: "properties",
    icon: <IconBuildingCommunity />,
    label: "Properties",
  },
];

export const ClientSideBar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tab = searchParams.get("tab") || "dashboard";

  const goToTab = (tabName: string) => {
    searchParams.set("tab", tabName);
    setSearchParams(searchParams);
  };

  const isActive = (key: string) =>
    tab === key ? "text-white bg-primary" : "text-foreground-700";

  const isSolid = (key: string) => (tab === key ? "solid" : "light");

  return (
    <div className="w-16 fixed shadow-medium flex flex-col justify-center items-center py-4 rounded-large gap-2 bg-white">
      {navItems.map(({ key, icon, label }) => (
        <Tooltip key={key} color="primary" content={label} placement="right">
          <Button
            isIconOnly
            className={isActive(key)}
            variant={isSolid(key)}
            onPress={() => goToTab(key)}
          >
            {icon}
          </Button>
        </Tooltip>
      ))}

      <Divider className="w-5 mt-3 mb-3" />

      <Tooltip color="primary" content="Log out" placement="right">
        <Button isIconOnly className="text-foreground-700" variant="light">
          <IconLogout />
        </Button>
      </Tooltip>
    </div>
  );
};
