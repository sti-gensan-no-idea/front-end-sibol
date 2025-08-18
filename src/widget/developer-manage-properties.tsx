import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  getKeyValue,
  Input,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure,
} from "@heroui/react";
import {
  IconAdjustmentsHorizontal,
  IconBuildingCommunity,
  IconEdit,
  IconPlus,
  IconSearch,
} from "@tabler/icons-react";

import { DeveloperUploadModal } from "./developer-upload-modal";

import { devPropTableColumns } from "@/data/developer-properties-table-cols";
import { devProperties } from "@/data/developers-properties";

export const DeveloperManageProperties = () => {
  const {
    isOpen: isAddOpen,
    onOpen: onAddOpen,
    onOpenChange: onAddOpenChange,
  } = useDisclosure();

  const handleAddProperty = () => {};

  return (
    <>
      <div className="p-4 sm:p-6 md:p-8 rounded-large shadow-medium bg-white flex flex-col gap-4">
        <div className="flex items-center md:items-start justify-between">
          <div className="flex items-center">
            <IconBuildingCommunity className="text-gray-500" size={26} />
            <span className="text-lg font-bold ml-2 text-foreground-700">
              Manage Properties
            </span>
          </div>
          <Button
            color="primary"
            startContent={<IconPlus />}
            variant="flat"
            onPress={onAddOpen}
          >
            Add Property
          </Button>
        </div>

        <SearchBar />

        {/* Properties */}
        <Table removeWrapper aria-label="Properties Table">
          <TableHeader columns={devPropTableColumns}>
            {(column) => (
              <TableColumn key={column.key}>{column.label}</TableColumn>
            )}
          </TableHeader>
          <TableBody items={devProperties}>
            {(item) => (
              <TableRow key={item.key} className="hover:bg-gray-50">
                {(columnKey) => (
                  <TableCell className="text-foreground-700 text-medium">
                    {columnKey === "actions" ? (
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          startContent={<IconEdit />}
                          variant="flat"
                        >
                          Edit
                        </Button>
                      </div>
                    ) : (
                      getKeyValue(item, columnKey)
                    )}
                  </TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Add Property Modal */}
      <DeveloperUploadModal
        isOpen={isAddOpen}
        onConfirm={handleAddProperty}
        onOpenChange={onAddOpenChange}
      />
    </>
  );
};

const SearchBar = () => {
  return (
    <div className="flex items-center w-full">
      <form action="#" className="flex items-center w-full" method="get">
        <Input
          endContent={
            <Dropdown>
              <DropdownTrigger>
                <Button
                  isIconOnly
                  className="ml-4"
                  radius="full"
                  variant="light"
                >
                  <IconAdjustmentsHorizontal />
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Filter Options">
                <DropdownItem key="name">Name</DropdownItem>
                <DropdownItem key="location">Location</DropdownItem>
                <DropdownItem key="date">Date</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          }
          placeholder="Search properties..."
          size="lg"
          startContent={<IconSearch />}
        />
        <Button isIconOnly className="hidden" type="submit">
          <IconSearch />
        </Button>
      </form>
    </div>
  );
};
