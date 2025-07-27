import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Button,
  Card,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Pagination,
  Select,
  SelectItem,
  useDisclosure,
  Chip,
  Tab,
  Tabs,
} from "@heroui/react";
import { ReactPhotoSphereViewer } from "react-photo-sphere-viewer";

import ImgPanorama1 from "../assets/images/panorama_1.jpg";

import { properties_data } from "@/data/properties_data";

export const PropSearchContent = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // Extract query params
  const initialSearch = searchParams.get("search") || "";
  const initialPage = parseInt(searchParams.get("page") || "1", 10);

  // Local state for form input and page
  const [searchInput, setSearchInput] = useState(initialSearch);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [currentPage, setCurrentPage] = useState(initialPage);

  const itemsPerPage = 6;

  // Update URL when searchQuery or page changes
  useEffect(() => {
    const params: any = {
      page: currentPage.toString(),
      tab: "search_properties",
    };

    if (searchQuery.trim()) {
      params.search = searchQuery.trim();
    }

    setSearchParams(params);
  }, [searchQuery, currentPage]);

  // Filter properties based on search query
  const filteredData = useMemo(() => {
    const search = searchQuery.trim().toLowerCase();

    if (!search) return [];

    return properties_data.filter((property) =>
      property.title.toLowerCase().includes(search)
    );
  }, [searchQuery]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const paginatedProperties = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;

    return filteredData.slice(start, start + itemsPerPage);
  }, [currentPage, filteredData]);

  // Trigger search manually
  const handleSearch = () => {
    setSearchQuery(searchInput.trim());
    setCurrentPage(1);
  };

  return (
    <>
      <div>
        {/* Search Bar */}
        <div className="flex items-center">
          <Input
            className="max-w-4xl"
            color="primary"
            placeholder="Search by location, property type..."
            size="lg"
            type="text"
            value={searchInput}
            variant="bordered"
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <Button
            className="ml-3 mr-auto"
            color="primary"
            size="lg"
            onClick={handleSearch}
          >
            Search
          </Button>

          <Select disabled className="max-w-36 ml-3" label="Sort by" size="sm">
            <SelectItem key="name">Name</SelectItem>
            <SelectItem key="price">Price</SelectItem>
            <SelectItem key="date">Date</SelectItem>
          </Select>

          <Select disabled className="ml-3 max-w-36" label="Filter" size="sm">
            <SelectItem key="apartment">Apartment</SelectItem>
            <SelectItem key="house">House</SelectItem>
          </Select>
        </div>

        {/* Results */}
        {searchQuery ? (
          <>
            <div className="mt-16 flex flex-col gap-4">
              {paginatedProperties.length === 0 ? (
                <p className="flex items-center justify-center text-center text-gray-400 h-96 text-xl bg-gray-100 rounded-large">
                  No properties found.
                </p>
              ) : (
                paginatedProperties.map((property, index) => (
                  <Card
                    key={index}
                    isPressable
                    className="shadow-medium shadow-gray-300"
                    shadow="sm"
                    onPress={onOpen}
                  >
                    <div className="flex h-60">
                      <div className="aspect-video">
                        <img
                          alt={property.title}
                          className="h-full w-full object-center"
                          src={property.img!}
                        />
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-center mt-16">
                <Pagination
                  showControls
                  page={currentPage}
                  total={totalPages}
                  onChange={(page) => setCurrentPage(page)}
                />
              </div>
            )}
          </>
        ) : (
          <p className="mt-4 flex items-center justify-center text-center text-gray-400 h-96 text-xl bg-gray-100 rounded-large">
            Enter a search term and click &quot;Search&quot; to see results.
          </p>
        )}
      </div>

      {/* Properties Info Modal */}
      <Modal
        backdrop="blur"
        isDismissable={false}
        isOpen={isOpen}
        scrollBehavior="inside"
        size="5xl"
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader />
              <ModalBody>
                <div className="flex flex-col overflow-x-hidden p-4">
                  <div className="grid grid-cols-2 gap-8">
                    {/* Info section */}
                    <div>
                      <span className="text-3xl font-bold">
                        Luxe Living Properties
                      </span>
                      <div className="flex gap-3 mt-3">
                        <Chip>Modern</Chip>
                        <Chip>2 Bathrooms</Chip>
                        <Chip>120 sq. ft.</Chip>
                      </div>
                      <p className="mt-4 text-foreground-500">
                        Superville Subdivision, General Santos City
                      </p>
                      <span className="text-3xl mt-8 flex">₱ 5,00,000,000</span>
                      <div className="mt-8">
                        <Button color="primary" variant="shadow">
                          Schedule Viewing
                        </Button>
                        <Button className="ml-4">Contact Agent</Button>
                      </div>
                      <span className="mt-8 flex text-2xl font-bold text-foreground-700">
                        Description
                      </span>
                      <p className="text-foreground-700 text-justify mt-3">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat.
                        <br /> <br />
                        Duis aute irure dolor in reprehenderit in voluptate
                        velit esse cillum dolore eu fugiat nulla pariatur.
                        Excepteur sint occaecat cupidatat non proident.
                      </p>
                    </div>

                    {/* More Info Section */}
                    <div className="p-8">
                      <div className="bg-white rounded-2xl h-full shadow-medium shadow-gray-300 p-6 flex flex-col z-10" />
                    </div>
                  </div>

                  {/* 360 Preview */}
                  <Tabs
                    aria-label="Options"
                    className="mt-8"
                    color="primary"
                    radius="full"
                    size="sm"
                    variant="bordered"
                  >
                    <Tab key="living-room" title="Living Room">
                      <ReactPhotoSphereViewer
                        height={"36vh"}
                        src={ImgPanorama1}
                        width={"100%"}
                      />
                    </Tab>
                    <Tab key="family-room" title="Family Room">
                      <ReactPhotoSphereViewer
                        height={"36vh"}
                        src={ImgPanorama1}
                        width={"100%"}
                      />
                    </Tab>
                    <Tab key="bedroom" title="Bedroom">
                      <ReactPhotoSphereViewer
                        height={"36vh"}
                        src={ImgPanorama1}
                        width={"100%"}
                      />
                    </Tab>
                    <Tab key="kitchen" title="Kitchen">
                      <ReactPhotoSphereViewer
                        height={"36vh"}
                        src={ImgPanorama1}
                        width={"100%"}
                      />
                    </Tab>
                    <Tab key="dining-room" title="Dining Room">
                      <ReactPhotoSphereViewer
                        height={"36vh"}
                        src={ImgPanorama1}
                        width={"100%"}
                      />
                    </Tab>
                  </Tabs>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
