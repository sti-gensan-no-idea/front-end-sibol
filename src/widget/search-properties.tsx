import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Button,
  Chip,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Pagination,
} from "@heroui/react";
import {
  Icon360View,
  IconAdjustmentsHorizontal,
  IconBookmark,
  IconCalendar,
  IconPhone,
  IconSearch,
} from "@tabler/icons-react";

import { properties } from "@/data/properties";

const ITEMS_PER_PAGE = 16;

interface Property {
  title: string;
  address: string;
  image: string;
  status: string;
  details: string;
  price: string;
  date?: string;
}

interface FilterState {
  searchTerm: string;
  filterType: "name" | "location" | "date";
}

export const SearchProperties = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const initialPage = parseInt(queryParams.get("page") || "1", 10);
  const initialSearch = queryParams.get("search") || "";
  const initialFilter = queryParams.get("filter") || "name";

  const [page, setPage] = useState<number>(
    isNaN(initialPage) ? 1 : initialPage
  );
  const [filterState, setFilterState] = useState<FilterState>({
    searchTerm: initialSearch,
    filterType: initialFilter as FilterState["filterType"],
  });
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    queryParams.set("page", String(page));
    queryParams.set("search", filterState.searchTerm);
    queryParams.set("filter", filterState.filterType);
    navigate(`${location.pathname}?${queryParams.toString()}`, {
      replace: true,
    });
  }, [page, filterState]);

  const filteredProperties = (properties as Property[]).filter((property) => {
    const searchTerm = filterState.searchTerm.toLowerCase();

    if (!searchTerm) return true;

    switch (filterState.filterType) {
      case "name":
        return property.title.toLowerCase().includes(searchTerm);
      case "location":
        return property.address.toLowerCase().includes(searchTerm);
      case "date":
        return property.date?.toLowerCase().includes(searchTerm) ?? false;
      default:
        return true;
    }
  });

  const totalPages = Math.ceil(filteredProperties.length / ITEMS_PER_PAGE);
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const currentItems = filteredProperties.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const openModal = (property: Property) => {
    setSelectedProperty(property);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProperty(null);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLButtonElement>,
    property: Property
  ) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault(); // Prevent default spacebar scroll
      openModal(property);
    }
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 container mx-auto w-full">
      <SearchBar
        filterState={filterState}
        setFilterState={setFilterState}
        setPage={setPage}
      />

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {currentItems.length > 0 ? (
          currentItems.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-small overflow-hidden flex flex-col"
            >
              <button
                aria-label={`View details for ${item.title}`}
                className="cursor-pointer relative h-48 w-full p-0 bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-primary"
                type="button"
                onClick={() => openModal(item)}
                onKeyDown={(e) => handleKeyDown(e, item)}
              >
                <img
                  alt={item.title}
                  className="w-full h-full object-cover bg-gray-300"
                  src={item.image}
                />
                <div className="absolute bottom-0 right-0 px-3 py-2 bg-black/70 text-white rounded-tl-xl">
                  <Icon360View size={20} />
                </div>
              </button>

              <div className="p-4 flex flex-col flex-1">
                <span className="text-lg font-semibold text-gray-800">
                  {item.title}
                </span>
                <span className="text-sm text-gray-500">{item.address}</span>

                <div className="flex items-center gap-2 text-sm mt-2">
                  <Chip
                    color={item.status === "Available" ? "success" : "danger"}
                    size="sm"
                    variant="flat"
                  >
                    {item.status}
                  </Chip>
                  <span className="text-gray-500">{item.details}</span>
                </div>

                <span className="text-xl font-bold text-primary mt-3">
                  {item.price}
                </span>

                <Divider className="mt-4" />
                <div className="flex items-center gap-2 mt-4">
                  <Button isIconOnly radius="full" variant="flat">
                    <IconBookmark />
                  </Button>
                  <div className="grid grid-cols-2 gap-2 w-full">
                    <Button startContent={<IconCalendar />} variant="flat">
                      Schedule
                    </Button>
                    <Button startContent={<IconPhone />} variant="flat">
                      Contact
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-8">
            <span className="text-gray-500">
              No properties found matching your criteria.
            </span>
          </div>
        )}
      </div>

      {totalPages > 0 && (
        <div className="mt-8 flex justify-center">
          <Pagination
            color="primary"
            page={page}
            size="lg"
            total={totalPages}
            onChange={handlePageChange}
          />
        </div>
      )}

      {selectedProperty && (
        <Modal
          className="max-w-2xl"
          isOpen={isModalOpen}
          size="lg"
          onClose={closeModal}
        >
          <ModalContent>
            <ModalHeader>{selectedProperty.title}</ModalHeader>
            <ModalBody>
              <img
                alt={selectedProperty.title}
                className="w-full h-64 object-cover rounded-lg"
                src={selectedProperty.image}
              />
              <div className="mt-4">
                <p className="text-gray-800 font-semibold">Address:</p>
                <p className="text-gray-600">{selectedProperty.address}</p>
              </div>
              <div className="mt-2">
                <p className="text-gray-800 font-semibold">Status:</p>
                <Chip
                  color={
                    selectedProperty.status === "Available"
                      ? "success"
                      : "danger"
                  }
                  size="sm"
                  variant="flat"
                >
                  {selectedProperty.status}
                </Chip>
              </div>
              <div className="mt-2">
                <p className="text-gray-800 font-semibold">Details:</p>
                <p className="text-gray-600">{selectedProperty.details}</p>
              </div>
              <div className="mt-2">
                <p className="text-gray-800 font-semibold">Price:</p>
                <p className="text-primary font-bold">
                  {selectedProperty.price}
                </p>
              </div>
              {selectedProperty.date && (
                <div className="mt-2">
                  <p className="text-gray-800 font-semibold">Date:</p>
                  <p className="text-gray-600">{selectedProperty.date}</p>
                </div>
              )}
              <div className="mt-4 flex gap-2">
                <Button
                  startContent={<IconCalendar />}
                  variant="flat"
                  onClick={closeModal}
                >
                  Schedule
                </Button>
                <Button
                  startContent={<IconPhone />}
                  variant="flat"
                  onClick={closeModal}
                >
                  Contact
                </Button>
              </div>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </div>
  );
};

// SearchBar component remains unchanged
interface SearchBarProps {
  filterState: FilterState;
  setFilterState: React.Dispatch<React.SetStateAction<FilterState>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const SearchBar = ({
  filterState,
  setFilterState,
  setPage,
}: SearchBarProps) => {
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
  };

  const handleFilterChange = (key: string) => {
    setFilterState((prev) => ({
      ...prev,
      filterType: key as FilterState["filterType"],
    }));
    setPage(1);
  };

  return (
    <div className="w-full">
      <form className="flex items-center w-full" onSubmit={handleSearch}>
        <Input
          className="flex-1"
          endContent={
            <Dropdown>
              <DropdownTrigger>
                <Button
                  isIconOnly
                  className="ml-2"
                  radius="full"
                  variant="light"
                >
                  <IconAdjustmentsHorizontal />
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Filter Options"
                selectedKeys={[filterState.filterType]}
                onSelectionChange={(keys) =>
                  handleFilterChange(Array.from(keys)[0] as string)
                }
              >
                <DropdownItem key="name">Name</DropdownItem>
                <DropdownItem key="location">Location</DropdownItem>
                <DropdownItem key="date">Date</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          }
          placeholder={`Search properties by ${filterState.filterType}...`}
          size="lg"
          startContent={<IconSearch />}
          value={filterState.searchTerm}
          onChange={(e) =>
            setFilterState((prev) => ({
              ...prev,
              searchTerm: e.target.value,
            }))
          }
        />
      </form>
    </div>
  );
};
