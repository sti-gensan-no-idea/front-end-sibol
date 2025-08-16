import { Modal, ModalBody, ModalContent, ModalHeader } from "@heroui/react";

export const BulkUploadModal = ({
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
          <ModalHeader>Bulk Upload Inventory</ModalHeader>
          <ModalBody>
            {/* Your file upload UI here */}
            <p>Upload CSV or Excel file here.</p>
          </ModalBody>
        </>
      )}
    </ModalContent>
  </Modal>
);
