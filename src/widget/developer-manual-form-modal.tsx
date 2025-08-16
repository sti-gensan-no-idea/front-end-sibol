import { useState } from "react";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from "@heroui/react";

export const ManualAddModal = ({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}) => (
  <Modal
    backdrop="blur"
    isDismissable={false}
    isOpen={isOpen}
    size="3xl"
    onOpenChange={onOpenChange}
  >
    <ModalContent>
      {() => (
        <>
          <ModalHeader>Add Property/Project</ModalHeader>
          <ModalBody>
            <Input
              label="Project name"
              placeholder="Enter project name"
              variant="flat"
            />
            <Input
              label="Address"
              placeholder="Enter full address"
              variant="flat"
            />
            <Input
              label="Total units"
              placeholder="Enter total project units"
              variant="flat"
            />
            <Input
              label="Price (PHP)"
              placeholder="Enter price"
              startContent={
                <div className="pointer-events-none flex items-center">
                  <span className="text-default-400 text-small">₱</span>
                </div>
              }
              type="number"
              variant="flat"
            />
            <Input
              label="Parking slots (optional)"
              placeholder="Enter parking slots"
              type="number"
              variant="flat"
            />
          </ModalBody>
        </>
      )}
    </ModalContent>
  </Modal>
);
