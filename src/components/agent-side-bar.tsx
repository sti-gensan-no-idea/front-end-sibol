import { Button, Divider } from "@heroui/react";
import {
  IconLayout,
  IconCalendar,
  IconMap,
  IconBuildingCommunity,
  IconLogout,
} from "@tabler/icons-react";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import { auth } from "@/firebase";

export const AgentSideBar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

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
      <Divider className="w-5 mt-3 mb-3" />
      <Button
        isIconOnly
        className="text-foreground-700"
        variant="light"
        onPress={handleLogout}
      >
        <IconLogout />
      </Button>
    </div>
  );
};
