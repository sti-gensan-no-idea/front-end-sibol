import { useSearchParams } from "react-router-dom";
import {
  Avatar,
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Tooltip,
  useDisclosure,
} from "@heroui/react";
import {
  IconBell,
  IconBuildingCommunity,
  IconLayout,
  IconLogout,
  IconPlus,
} from "@tabler/icons-react";

import ImgLogo from "../assets/images/ic_logo.png";

import { LogoutConfirmationModal } from "./logout-modal";
import { DeveloperUploadModal } from "./developer-upload-modal";

const navItems = [
  { key: "dashboard", icon: <IconLayout />, label: "Dashboard" },
  { key: "properties", icon: <IconBuildingCommunity />, label: "Properties" },
  { key: "notifications", icon: <IconBell />, label: "Notifications" },
];

export const DeveloperSideBar = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const {
    isOpen: isProfileOpen,
    onOpen: onProfileOpen,
    onOpenChange: onProfileOpenChange,
  } = useDisclosure();

  const {
    isOpen: isLogoutOpen,
    onOpen: onLogoutOpen,
    onOpenChange: onLogoutOpenChange,
  } = useDisclosure();

  const {
    isOpen: isAddOpen,
    onOpen: onAddOpen,
    onOpenChange: onAddOpenChange,
  } = useDisclosure();

  const tab = searchParams.get("tab") || "dashboard";

  const goToTab = (tabName: string) => {
    searchParams.set("tab", tabName);
    setSearchParams(searchParams);
  };

  const isActive = (key: string) =>
    tab === key ? "text-white bg-primary" : "text-foreground-700";

  const isSolid = (key: string) => (tab === key ? "solid" : "light");

  const handleLogout = () => {};

  const handleAddProperty = () => {};

  return (
    <>
      <div className="w-16 fixed shadow-medium flex flex-col justify-center items-center py-4 rounded-large gap-2 bg-white">
        <img alt="Atuna logo" className="w-10 h-10" src={ImgLogo} />
        <Divider className="w-5 mt-3 mb-3" />

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

        <Tooltip color="primary" content="Add Properties" placement="right">
          <Button
            isIconOnly
            className="text-foreground-700"
            color="primary"
            radius="full"
            variant="flat"
            onPress={onAddOpen}
          >
            <IconPlus />
          </Button>
        </Tooltip>

        <Divider className="w-5 mt-3 mb-3" />

        <Tooltip color="primary" content="Log out" placement="right">
          <Button
            isIconOnly
            className="text-foreground-700"
            variant="light"
            onPress={onLogoutOpen}
          >
            <IconLogout />
          </Button>
        </Tooltip>

        <Avatar
          className="cursor-pointer mt-4"
          src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
          onClick={onProfileOpen}
        />
      </div>

      {/* Add Property Modal */}
      <DeveloperUploadModal
        isOpen={isAddOpen}
        onConfirm={handleAddProperty}
        onOpenChange={onAddOpenChange}
      />

      {/* Profile Modal */}
      <Modal
        backdrop="blur"
        isOpen={isProfileOpen}
        onOpenChange={onProfileOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Developer Profile
              </ModalHeader>
              <ModalBody>
                <p>
                  This is your developer profile modal. Add user details here.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* Logout Modal */}
      <LogoutConfirmationModal
        isOpen={isLogoutOpen}
        onConfirm={handleLogout}
        onOpenChange={onLogoutOpenChange}
      />
    </>
  );
};
