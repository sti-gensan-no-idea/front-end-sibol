import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from "@heroui/react";
import { IconDownload, IconFolder } from "@tabler/icons-react";

interface OpenModalInterface {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const BulkUploadModal = ({
  isOpen,
  onOpenChange,
}: OpenModalInterface) => (
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
          <ModalHeader className="text-foreground-700">
            Bulk Upload Inventory
          </ModalHeader>
          <ModalBody className="flex flex-col gap-4">
            <span className="font-semibold text-foreground-700">
              Download Template
            </span>
            <Button
              className="w-fit"
              color="primary"
              startContent={<IconDownload />}
              variant="flat"
            >
              Download CSV Template
            </Button>

            {/* Project Details */}
            <form action="/" className="flex flex-col gap-4 mb-4" method="post">
              <span className="font-semibold mt-4 text-foreground-700">
                Upload CSV File
              </span>
              <div className="rounded-large flex flex-col items-center justify-center p-8 border-3 border-gray-300 border-dashed">
                <span className="text-lg font-semibold text-foreground-700">
                  Drag & Drop CSV file here
                </span>
                <p className="text-foreground-500 text-sm">
                  Drag and drop or browse to upload (PDF/JPEG)
                </p>
                <Button
                  className="mt-4"
                  startContent={<IconFolder />}
                  variant="flat"
                >
                  Browse
                </Button>
              </div>

              {/* Supporting Docs */}
              <span className="font-semibold mt-4 text-foreground-700">
                Upload CSV File
              </span>
              <div className="rounded-large flex flex-col items-center justify-center p-8 border-3 border-gray-300 border-dashed">
                <span className="text-lg font-semibold text-foreground-700">
                  360 Panorama View
                </span>
                <p className="text-foreground-500 text-sm">
                  Drag and drop image
                </p>
                <Button
                  className="mt-4"
                  startContent={<IconFolder />}
                  variant="flat"
                >
                  Browse
                </Button>
              </div>
              <Button
                className="mt-4 w-fit ml-auto"
                color="primary"
                type="submit"
              >
                Submit
              </Button>
            </form>
          </ModalBody>
        </>
      )}
    </ModalContent>
  </Modal>
);
