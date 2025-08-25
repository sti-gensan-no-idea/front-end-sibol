import { useState } from "react";
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
  Pagination,
  Spinner,
  Card,
  CardBody,
} from "@heroui/react";
import {
  Icon360View,
  IconAdjustmentsHorizontal,
  IconBookmark,
  IconCalendar,
  IconPhone,
  IconSearch,
  IconAlertCircle,
} from "@tabler/icons-react";

import { useGetPropertiesPropertiesGet } from "@/lib/api/generated/atuna-client";
import { mapPropertyToCard, type PropertyCard } from "@/lib/mappers/property";

const ITEMS_PER_PAGE = 16;

export const SearchProperties = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const initialPage = parseInt(queryParams.get("page") || "1", 10);
  const [page, setPage] = useState<number>(isNaN(initialPage) ? 1 : initialPage);
  const [searchTerm, setSearchTerm] = useState(queryParams.get("search") || "");

  // Calculate offset for pagination
  const offset = (page - 1) * ITEMS_PER_PAGE;

  // Fetch properties from API
  const {
    data: propertiesResponse,
    isLoading,
    error,
    refetch
  } = useGetPropertiesPropertiesGet({
    limit: ITEMS_PER_PAGE,
    offset: offset,
    // Add search parameters when backend supports them
    ...(searchTerm && { location: searchTerm }), // Using location field for search
  });

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    queryParams.set("page", String(newPage));
    navigate(`${location.pathname}?${queryParams.toString()}`);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    queryParams.set("page", "1");
    if (searchTerm) {
      queryParams.set("search", searchTerm);
    } else {
      queryParams.delete("search");
    }
    navigate(`${location.pathname}?${queryParams.toString()}`);
    refetch();
  };

  // Map API response to card format
  const properties: PropertyCard[] = propertiesResponse?.data?.items?.map((item: any) => mapPropertyToCard(item)) || [];
  const totalPages = propertiesResponse?.data?.total ? Math.ceil(propertiesResponse.data.total / ITEMS_PER_PAGE) : 1;

  if (isLoading) {
    return (
      <div className="p-4 sm:p-6 md:p-8 container mx-auto w-full">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} onSearch={handleSearch} />
        
        <div className="mt-8 flex justify-center items-center min-h-[400px]">
          <div className="text-center">
            <Spinner size="lg" className="mb-4" />
            <p className="text-gray-600">Loading properties...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 sm:p-6 md:p-8 container mx-auto w-full">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} onSearch={handleSearch} />
        
        <div className="mt-8 flex justify-center items-center min-h-[400px]">
          <Card className="w-full max-w-md">
            <CardBody className="p-8 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <IconAlertCircle className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900">
                Failed to Load Properties
              </h3>
              <p className="text-gray-600 mb-4">
                There was an error loading the properties. Please try again.
              </p>
              <Button color="primary" onPress={() => refetch()}>
                Try Again
              </Button>
            </CardBody>
          </Card>
        </div>
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <div className="p-4 sm:p-6 md:p-8 container mx-auto w-full">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} onSearch={handleSearch} />
        
        <div className="mt-8 flex justify-center items-center min-h-[400px]">
          <Card className="w-full max-w-md">
            <CardBody className="p-8 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <IconSearch className="w-8 h-8 text-gray-500" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900">
                No Properties Found
              </h3>
              <p className="text-gray-600 mb-4">
                {searchTerm 
                  ? `No properties match your search for "${searchTerm}".`
                  : "No properties are currently available."
                }
              </p>
              {searchTerm && (
                <Button 
                  color="primary" 
                  variant="flat"
                  onPress={() => {
                    setSearchTerm("");
                    queryParams.delete("search");
                    navigate(`${location.pathname}?${queryParams.toString()}`);
                    refetch();
                  }}
                >
                  Clear Search
                </Button>
              )}
            </CardBody>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 md:p-8 container mx-auto w-full">
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} onSearch={handleSearch} />

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {properties.map((item) => (
          <PropertyCard key={item.id} property={item} />
        ))}
      </div>

      {totalPages > 1 && (
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
    </div>
  );
};

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onSearch: (e: React.FormEvent) => void;
}

const SearchBar = ({ searchTerm, setSearchTerm, onSearch }: SearchBarProps) => {
  return (
    <div className="w-full">
      <form className="flex items-center w-full" onSubmit={onSearch}>
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
              <DropdownMenu aria-label="Filter Options">
                <DropdownItem key="name">Name</DropdownItem>
                <DropdownItem key="location">Location</DropdownItem>
                <DropdownItem key="price">Price Range</DropdownItem>
                <DropdownItem key="type">Property Type</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          }
          placeholder="Search properties..."
          size="lg"
          startContent={<IconSearch />}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>
    </div>
  );
};

interface PropertyCardProps {
  property: PropertyCard;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  const handleBookmark = () => {
    // TODO: Implement bookmark functionality with useAddBookmarkBookmarksPost
    console.log("Bookmark property:", property.id);
  };

  const handleScheduleViewing = () => {
    // TODO: Implement site viewing scheduling
    console.log("Schedule viewing for:", property.id);
  };

  const handleContact = () => {
    // TODO: Implement contact functionality
    console.log("Contact about property:", property.id);
  };

  return (
    <div className="bg-white rounded-2xl shadow-small overflow-hidden flex flex-col">
      <div className="relative h-48">
        <img
          alt={property.title}
          className="w-full h-full object-cover bg-gray-300"
          src={property.image}
          onError={(e) => {
            // Fallback to placeholder if image fails to load
            e.currentTarget.src = `https://via.placeholder.com/400x300/f0f0f0/666666?text=${encodeURIComponent(property.title)}`;
          }}
        />
        <div className="absolute bottom-0 right-0 px-3 py-2 bg-black/70 text-white rounded-tl-xl">
          <Icon360View size={20} />
        </div>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <span className="text-lg font-semibold text-gray-800">
          {property.title}
        </span>
        <span className="text-sm text-gray-500">{property.address}</span>

        <div className="flex items-center gap-2 text-sm mt-2">
          <Chip
            color={property.status === "Available" ? "success" : "danger"}
            size="sm"
            variant="flat"
          >
            {property.status}
          </Chip>
          <span className="text-gray-500">{property.details}</span>
        </div>

        <span className="text-xl font-bold text-primary mt-3">
          {property.price}
        </span>

        {/* Action buttons */}
        <Divider className="mt-4" />
        <div className="flex items-center gap-2 mt-4">
          <Button 
            isIconOnly 
            radius="full" 
            variant="flat"
            onPress={handleBookmark}
            title="Bookmark this property"
          >
            <IconBookmark />
          </Button>
          <div className="grid grid-cols-2 gap-2 w-full">
            <Button 
              startContent={<IconCalendar />} 
              variant="flat"
              onPress={handleScheduleViewing}
            >
              Schedule
            </Button>
            <Button 
              startContent={<IconPhone />} 
              variant="flat"
              onPress={handleContact}
            >
              Contact
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
