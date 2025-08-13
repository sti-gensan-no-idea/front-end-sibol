import { useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Chip,
} from "@heroui/react";
import { IconFileUpload, IconPlus } from "@tabler/icons-react";

import { ManualAddModal } from "./developer-manual-form-modal";
import { BulkUploadModal } from "./developer-upload-bulk-modal";

export interface UploadModalInterface {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export const DeveloperUploadModal = ({
  isOpen,
  onOpenChange,
}: UploadModalInterface) => {
  const [isManualModalOpen, setIsManualModalOpen] = useState(false);
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);

  const openManualModal = () => {
    onOpenChange(false);
    setTimeout(() => setIsManualModalOpen(true), 200);
  };

  const openBulkModal = () => {
    onOpenChange(false);
    setTimeout(() => setIsBulkModalOpen(true), 200);
  };

  return (
    <>
      {/* Main Option Picker Modal */}
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
              <ModalHeader className="flex flex-col gap-1">
                Choose an Option
              </ModalHeader>
              <ModalBody>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  {/* Option 1: Manual Add */}
                  <div className="p-6 rounded-large shadow-small bg-white">
                    <div className="flex justify-between">
                      <div className="bg-blue-100 w-10 h-10 flex items-center justify-center rounded-large">
                        <IconPlus className="text-blue-700" />
                      </div>
                      <Chip color="primary" size="sm" variant="flat">
                        Recommended
                      </Chip>
                    </div>
                    <span className="text-foreground-700 font-semibold mt-6 flex">
                      Add Property/Project Manually
                    </span>
                    <p className="text-foreground-500 text-sm mt-2">
                      Fill out property and project details manually. Best for
                      adding a few items at a time.
                    </p>
                    <Button
                      className="w-full mt-4"
                      color="primary"
                      startContent={<IconPlus />}
                      onPress={openManualModal}
                    >
                      Add Property/Project
                    </Button>
                  </div>

                  {/* Option 2: Bulk Upload */}
                  <div className="p-6 rounded-large shadow-small bg-white">
                    <div className="flex justify-between">
                      <div className="bg-green-100 w-10 h-10 flex items-center justify-center rounded-large">
                        <IconFileUpload className="text-green-700" />
                      </div>
                      <Chip color="success" size="sm" variant="flat">
                        Efficient
                      </Chip>
                    </div>
                    <span className="text-foreground-700 font-semibold mt-6 flex">
                      Bulk Upload Properties
                    </span>
                    <p className="text-foreground-500 text-sm mt-2">
                      Upload multiple properties at once using CSV or Excel
                      file. Best for large inventory imports.
                    </p>
                    <Button
                      className="w-full mt-4 text-white"
                      color="success"
                      startContent={<IconFileUpload />}
                      onPress={openBulkModal}
                    >
                      Upload Inventory File
                    </Button>
                  </div>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* Sub Modals */}
      <ManualAddModal
        isOpen={isManualModalOpen}
        onOpenChange={setIsManualModalOpen}
      />
      <BulkUploadModal
        isOpen={isBulkModalOpen}
        onOpenChange={setIsBulkModalOpen}
      />
    </>
  );
};
