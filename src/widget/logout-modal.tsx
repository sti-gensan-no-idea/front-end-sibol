import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";

interface LogoutModalInterface {
  isOpen: boolean;
  onOpenChange: () => void;
  onConfirm: () => void;
}

export const LogoutConfirmationModal = ({
  isOpen,
  onOpenChange,
  onConfirm,
}: LogoutModalInterface) => (
  <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
    <ModalContent>
      {(onClose) => (
        <>
          <ModalHeader className="flex flex-col gap-1">Logout</ModalHeader>
          <ModalBody>
            <p>Are you sure you want to log out?</p>
          </ModalBody>
          <ModalFooter>
            <Button color="default" onPress={onClose} variant="flat">
              Cancel
            </Button>
            <Button
              color="primary"
              onPress={() => {
                onConfirm();
                onClose();
              }}
            >
              Log Out
            </Button>
          </ModalFooter>
        </>
      )}
    </ModalContent>
  </Modal>
);
