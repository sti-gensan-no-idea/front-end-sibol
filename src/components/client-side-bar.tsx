import { Button, Divider, Tooltip } from "@heroui/react";
import {
  IconLayout,
  IconCalendar,
  IconBuildingCommunity,
  IconLogout,
  IconMessage2,
  IconPlus,
  IconUsers,
  IconActivityHeartbeat,
  IconHeart,
} from "@tabler/icons-react";
import { signOut } from "firebase/auth";
import { useNavigate, useSearchParams } from "react-router-dom";

import { auth } from "@/firebase";

export const ClientSideBar = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const tab = searchParams.get("tab") || "dashboard";

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const goToTab = (tabName: string) => {
    searchParams.set("tab", tabName);
    setSearchParams(searchParams);
  };

  const isActive = (key: string) =>
    tab === key ? "text-white bg-primary" : "text-foreground-700";

  const isSolid = (key: string) => (tab === key ? "solid" : "light");

  return (
    <div className="w-16 fixed left-8 top-24 shadow-medium flex flex-col justify-center items-center py-4 rounded-large gap-2 bg-white">
      <Tooltip color="primary" content="Dashboard" placement="right">
        <Button
          isIconOnly
          className={isActive("browse_properties")}
          variant={isSolid("browse_properties")}
          onPress={() => goToTab("browse_properties")}
        >
          <IconBuildingCommunity />
        </Button>
      </Tooltip>

      <Tooltip color="primary" content="Calendar" placement="right">
        <Button
          isIconOnly
          className={isActive("inquiries")}
          variant={isSolid("inquiries")}
          onPress={() => goToTab("inquiries")}
        >
          <IconMessage2 />
        </Button>
      </Tooltip>

      <Tooltip color="primary" content="Agents Performance" placement="right">
        <Button
          isIconOnly
          className={isActive("favorites")}
          variant={isSolid("favorites")}
          onPress={() => goToTab("favorites")}
        >
          <IconHeart />
        </Button>
      </Tooltip>

      <Divider className="w-5 mt-3 mb-3" />

      <Tooltip color="primary" content="Log out" placement="right">
        <Button
          isIconOnly
          className="text-foreground-700"
          variant="light"
          onPress={handleLogout}
        >
          <IconLogout />
        </Button>
      </Tooltip>
    </div>
  );
};
