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
  Pagination,
  useDisclosure,
  Card,
  CardBody,
  CardHeader,
  Tooltip,
} from "@heroui/react";
import {
  Icon360View,
  IconAdjustmentsHorizontal,
  IconBookmark,
  IconCalendar,
  IconPhone,
  IconSearch,
  IconEye,
  IconHeart,
  IconMapPin,
} from "@tabler/icons-react";

import { properties } from "@/data/properties";
import { SiteViewingModal } from "@/components/SiteViewingModal";
import { PanoramaViewer } from "@/components/PanoramaViewer";

const ITEMS_PER_PAGE = 16;

export const SearchProperties = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const initialPage = parseInt(queryParams.get("page") || "1", 10);
  const [page, setPage] = useState<number>(
    isNaN(initialPage) ? 1 : initialPage
  );

  // Modal states
  const { isOpen: isScheduleOpen, onOpen: onScheduleOpen, onOpenChange: onScheduleOpenChange } = useDisclosure();
  const { isOpen: is360Open, onOpen: on360Open, onOpenChange: on360OpenChange } = useDisclosure();
  
  // Currently selected property
  const [selectedProperty, setSelectedProperty] = useState<any>(null);
  const [bookmarkedProperties, setBookmarkedProperties] = useState<Set<number>>(new Set());

  useEffect(() => {
    setPage(1);
    queryParams.set("page", String(1));
  }, []);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    queryParams.set("page", String(newPage));
    navigate(`${location.pathname}?${queryParams.toString()}`);
  };

  const handleScheduleViewing = (property: any) => {
    setSelectedProperty(property);
    onScheduleOpen();
  };

  const handle360View = (property: any) => {
    setSelectedProperty(property);
    on360Open();
  };

  const handleBookmark = (propertyIndex: number) => {
    const newBookmarked = new Set(bookmarkedProperties);
    if (newBookmarked.has(propertyIndex)) {
      newBookmarked.delete(propertyIndex);
    } else {
      newBookmarked.add(propertyIndex);
    }
    setBookmarkedProperties(newBookmarked);
  };

  const totalPages = Math.ceil(properties.length / ITEMS_PER_PAGE);
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const currentItems = properties.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <div className="p-4 sm:p-6 md:p-8 container mx-auto w-full">
      <SearchBar />

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {currentItems.map((item, index) => {
          const globalIndex = startIndex + index;
          const isBookmarked = bookmarkedProperties.has(globalIndex);
          
          return (
            <Card
              key={globalIndex}
              className="bg-white shadow-medium hover:shadow-large transition-all duration-300 group"
              isPressable
              onPress={() => console.log('View property details:', item.title)}
            >
              <CardHeader className="p-0 relative">
                <div className="relative h-48 w-full overflow-hidden">
                  <img
                    alt={item.title}
                    className="w-full h-full object-cover bg-gray-300 group-hover:scale-105 transition-transform duration-300"
                    src={item.image}
                  />
                  
                  {/* 360 View Badge */}
                  <div className="absolute top-3 left-3">
                    <Chip
                      variant="solid"
                      color="primary"
                      size="sm"
                      startContent={<Icon360View size={14} />}
                      className="bg-blue-600/90 text-white backdrop-blur-sm"
                    >
                      360° View
                    </Chip>
                  </div>

                  {/* Bookmark Button */}
                  <Tooltip content={isBookmarked ? "Remove from favorites" : "Add to favorites"}>
                    <Button
                      isIconOnly
                      variant="flat"
                      size="sm"
                      className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm"
                      onPress={(e) => {
                        e.stopPropagation();
                        handleBookmark(globalIndex);
                      }}
                    >
                      <IconHeart 
                        size={16} 
                        className={isBookmarked ? "text-red-500 fill-current" : "text-gray-600"} 
                      />
                    </Button>
                  </Tooltip>

                  {/* Status Badge */}
                  <div className="absolute bottom-3 left-3">
                    <Chip
                      color={item.status === "Available" ? "success" : "warning"}
                      size="sm"
                      variant="solid"
                      className="backdrop-blur-sm"
                    >
                      {item.status}
                    </Chip>
                  </div>
                </div>
              </CardHeader>

              <CardBody className="p-4 flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                  <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-1 text-gray-500">
                    <IconMapPin size={14} />
                    <span className="text-sm line-clamp-1">{item.address}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span>{item.details}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-primary">
                    {item.price}
                  </span>
                  <Chip variant="flat" size="sm" color="secondary">
                    {item.type || "House"}
                  </Chip>
                </div>

                <Divider />

                {/* Action buttons */}
                <div className="flex gap-2">
                  <Tooltip content="View 360° tour">
                    <Button
                      isIconOnly
                      variant="flat"
                      color="primary"
                      onPress={(e) => {
                        e.stopPropagation();
                        handle360View(item);
                      }}
                    >
                      <Icon360View size={18} />
                    </Button>
                  </Tooltip>
                  
                  <Button
                    startContent={<IconCalendar size={16} />}
                    variant="flat"
                    color="primary"
                    className="flex-1"
                    onPress={(e) => {
                      e.stopPropagation();
                      handleScheduleViewing(item);
                    }}
                  >
                    Schedule
                  </Button>
                  
                  <Tooltip content="Contact agent">
                    <Button
                      isIconOnly
                      variant="flat"
                      color="secondary"
                      onPress={(e) => {
                        e.stopPropagation();
                        window.open(`tel:+639123456789`, '_self');
                      }}
                    >
                      <IconPhone size={16} />
                    </Button>
                  </Tooltip>
                </div>
              </CardBody>
            </Card>
          );
        })}
      </div>

      {/* Pagination */}
      <div className="mt-8 flex justify-center">
        <Pagination
          color="primary"
          page={page}
          size="lg"
          total={totalPages}
          showControls
          onChange={handlePageChange}
        />
      </div>

      {/* Modals */}
      <SiteViewingModal
        isOpen={isScheduleOpen}
        onOpenChange={onScheduleOpenChange}
        propertyId={selectedProperty?.id}
        propertyTitle={selectedProperty?.title}
        isGuest={true}
      />

      <PanoramaViewer
        isOpen={is360Open}
        onOpenChange={on360OpenChange}
        propertyTitle={selectedProperty?.title}
      />
    </div>
  );
};

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("name");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement search functionality with API call
    console.log("Searching properties:", { searchTerm, filterBy });
  };

  const filterOptions = [
    { key: "name", label: "Name" },
    { key: "location", label: "Location" },
    { key: "price", label: "Price Range" },
    { key: "type", label: "Property Type" },
    { key: "status", label: "Status" },
  ];

  return (
    <div className="w-full space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <form 
          className="flex items-center flex-1" 
          onSubmit={handleSearch}
        >
          <Input
            className="flex-1"
            placeholder={`Search properties by ${filterBy}...`}
            size="lg"
            startContent={<IconSearch className="text-gray-400" />}
            value={searchTerm}
            variant="bordered"
            onChange={(e) => setSearchTerm(e.target.value)}
            endContent={
              <Button
                type="submit"
                color="primary"
                size="sm"
                className="mr-1"
              >
                Search
              </Button>
            }
          />
        </form>

        <Dropdown>
          <DropdownTrigger>
            <Button
              variant="bordered"
              startContent={<IconAdjustmentsHorizontal size={18} />}
              className="min-w-40"
            >
              Filter by {filterOptions.find(f => f.key === filterBy)?.label}
            </Button>
          </DropdownTrigger>
          <DropdownMenu 
            aria-label="Filter Options"
            selectedKeys={[filterBy]}
            onSelectionChange={(keys) => {
              const selected = Array.from(keys)[0] as string;
              if (selected) setFilterBy(selected);
            }}
          >
            {filterOptions.map((option) => (
              <DropdownItem key={option.key}>
                {option.label}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      </div>

      {/* Quick filters */}
      <div className="flex flex-wrap gap-2">
        <Chip variant="flat" color="primary" className="cursor-pointer">
          Available Now
        </Chip>
        <Chip variant="flat" color="secondary" className="cursor-pointer">
          Under ₱5M
        </Chip>
        <Chip variant="flat" color="success" className="cursor-pointer">
          3+ Bedrooms
        </Chip>
        <Chip variant="flat" color="warning" className="cursor-pointer">
          With 360° Tour
        </Chip>
      </div>
    </div>
  );
};
