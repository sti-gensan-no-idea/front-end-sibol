import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Select,
  SelectItem,
} from "@heroui/react";
import { IconFolder } from "@tabler/icons-react";

interface OpenModalInterface {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ManualAddModal = ({
  isOpen,
  onOpenChange,
}: OpenModalInterface) => (
  <Modal
    backdrop="blur"
    isDismissable={false}
    isOpen={isOpen}
    scrollBehavior="inside"
    size="3xl"
    onOpenChange={onOpenChange}
  >
    <ModalContent>
      {() => (
        <>
          <ModalHeader className="text-foreground-700">
            Add Property/Project
          </ModalHeader>
          <ModalBody>
            {/* Project Details */}
            <form action="/" className="flex flex-col gap-4 mb-4" method="post">
              <span className="font-semibold text-foreground-700">
                Project Details
              </span>
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
              <div className="grid grid-cols-2 gap-4">
                <Select
                  className="w-full"
                  label="Project type"
                  placeholder="Select project type"
                >
                  <SelectItem>Subdivision</SelectItem>
                  <SelectItem>Condominium</SelectItem>
                  <SelectItem>Townhouse</SelectItem>
                  <SelectItem>Residential</SelectItem>
                  <SelectItem>Commercial</SelectItem>
                  <SelectItem>Office</SelectItem>
                </Select>

                <Input
                  label="Total units"
                  placeholder="Enter total project units"
                  variant="flat"
                />
              </div>

              {/* Property Details */}
              <span className="font-semibold mt-4 text-foreground-700">
                Property Details
              </span>
              <div className="grid grid-cols-2 gap-4">
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
              </div>

              {/* Status & Availability */}
              <span className="font-semibold mt-4 text-foreground-700">
                Status & Availability
              </span>
              <Select
                className="w-full"
                label="Project status"
                placeholder="Select project status"
              >
                <SelectItem>Completed</SelectItem>
                <SelectItem>Under construction</SelectItem>
              </Select>

              {/* Supporting Documents */}
              <span className="font-semibold mt-4 text-foreground-700">
                Supporting Documents
              </span>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-large flex flex-col items-center justify-center p-8 border-3 border-gray-300 border-dashed">
                  <span className="text-lg font-semibold text-foreground-700">
                    Upload License to Sell
                  </span>
                  <p className="text-foreground-500 text-sm text-center">
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
                <div className="rounded-large flex flex-col items-center justify-center p-8 border-3 border-gray-300 border-dashed">
                  <span className="text-lg font-semibold text-foreground-700">
                    Upload Certificate of Registration
                  </span>
                  <p className="text-foreground-500 text-sm text-center">
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
              </div>

              {/* Supporting Documents */}
              <span className="font-semibold mt-4 text-foreground-700">
                360 Preview
              </span>
              <div className="rounded-large flex flex-col items-center justify-center p-8 border-3 border-gray-300 border-dashed">
                <span className="text-lg font-semibold text-foreground-700">
                  360 Panorama View
                </span>
                <p className="text-foreground-500 text-sm text-center">
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
