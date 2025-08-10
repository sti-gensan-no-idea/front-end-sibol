import { useSearchParams } from "react-router-dom";
import {
  Avatar,
  Button,
  Divider,
  Tooltip,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/react";
import {
  IconLayout,
  IconLogout,
  IconCalendar,
  IconBookmark,
  IconBell,
} from "@tabler/icons-react";

import ImgLogo from "../assets/images/ic_logo.png";

import { LogoutConfirmationModal } from "./logout-modal";

const navItems = [
  { key: "dashboard", icon: <IconLayout />, label: "Dashboard" },
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

  const tab = searchParams.get("tab") || "dashboard";

  const goToTab = (tabName: string) => {
    searchParams.set("tab", tabName);
    setSearchParams(searchParams);
  };

  const isActive = (key: string) =>
    tab === key ? "text-white bg-primary" : "text-foreground-700";

  const isSolid = (key: string) => (tab === key ? "solid" : "light");

  const handleLogout = () => {};

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
                User Profile
              </ModalHeader>
              <ModalBody>
                <p>This is your profile modal. Add user details here.</p>
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

      <LogoutConfirmationModal
        isOpen={isLogoutOpen}
        onConfirm={handleLogout}
        onOpenChange={onLogoutOpenChange}
      />
    </>
  );
};
