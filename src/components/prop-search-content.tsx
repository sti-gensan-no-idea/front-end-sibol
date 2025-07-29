import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
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
  Divider,
} from "@heroui/react";
import {
  IconMapPinFilled,
  IconUserFilled,
  IconBookmark,
} from "@tabler/icons-react";
import { ReactPhotoSphereViewer } from "react-photo-sphere-viewer";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

import ImgPanoramaDining from "../assets/images/panorama_1.jpg";
import ImgPanoramaBedRoom from "../assets/images/panorama_bed_room.jpg";
import ImgPanoramaKitchen from "../assets/images/panorama_kitchen.jpg";
import ImgPanoramaLiving from "../assets/images/panorama_living_room.jpg";

import { properties_data } from "@/data/properties_data";

export const PropSearchContent = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // Extract query params
  const initialSearch = searchParams.get("query") || "";
  const initialPage = parseInt(searchParams.get("page") || "1", 10);

  // Local state for form input and page
  const [searchInput, setSearchInput] = useState(initialSearch);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [currentPage, setCurrentPage] = useState(initialPage);

  const [_, setMap] = useState(null);

  const itemsPerPage = 6;

  // Update URL when searchQuery or page changes
  useEffect(() => {
    const params: any = {
      page: currentPage.toString(),
      tab: "search_properties",
    };

    if (searchQuery.trim()) {
      params.query = searchQuery.trim();
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

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_API_URL,
  });

  const onLoad = useCallback(function callback(map: any) {
    const bounds = new window.google.maps.LatLngBounds({
      lat: 3.745,
      lng: 38.523,
    });

    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback() {
    setMap(null);
  }, []);

  return (
    <>
      <div>
        {/* Search Bar */}
        <div className="flex items-center">
          <Input
            className="max-w-4xl bg-white rounded-large"
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
                <p className="flex items-center justify-center text-center text-foreground-700 h-96 text-xl bg-white rounded-large">
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
                      <div className="p-8 w-full">
                        <div className="flex justify-between w-full">
                          <div className="flex flex-col w-full">
                            <span className="flex text-3xl text-foreground-700 font-bold">
                              {property.title}
                            </span>
                            <span className="flex font-normal mt-2 text-foreground-700">
                              {property.address}
                            </span>
                          </div>
                          <Button
                            isIconOnly
                            className=""
                            radius="full"
                            variant="light"
                          >
                            <IconBookmark />
                          </Button>
                        </div>
                        <span className="flex font-medium text-4xl mt-8">
                          {property.price}
                        </span>
                        <div className="flex items-center mt-4 text-xl text-foreground-500 font-normal gap-3">
                          <Chip>{property.bed} beds</Chip>
                          <Chip>{property.bathroom} bathrooms</Chip>
                          <Chip>
                            {property.size[0]}x{property.size[1]} meters
                          </Chip>
                        </div>
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
          <p className="mt-4 flex items-center justify-center text-center text-foreground-700 h-96 text-xl bg-white rounded-large">
            Search to see results.
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
          {() => (
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
                        <Chip size="sm" variant="flat">
                          Modern
                        </Chip>
                        <Chip size="sm" variant="flat">
                          2 Bathrooms
                        </Chip>
                        <Chip size="sm" variant="flat">
                          120 sq. ft.
                        </Chip>
                      </div>
                      <div className="mt-4 text-foreground-500 italic flex items-center">
                        <IconMapPinFilled className="mr-3" size={18} />
                        <p>
                          Zone 5-B Provido Village City Heights, General Santos
                          City.
                        </p>
                      </div>
                      <div className="mt-2 text-foreground-500 italic flex items-center">
                        <IconUserFilled className="mr-3" size={18} />
                        <p>Juanito Baldo Jr.</p>
                      </div>
                      <span className="text-5xl mt-8 flex font-bold">
                        ₱ 5,000,000
                      </span>
                      <div className="mt-8 flex">
                        {/* Popup a modal when clicked */}
                        <Button
                          className="w-full"
                          color="primary"
                          variant="shadow"
                          onPress={() => navigate("/schedule-viewing")}
                        >
                          Schedule Viewing
                        </Button>
                        <Button
                          className="ml-4 w-full"
                          onPress={() => navigate("/contact-agent")}
                        >
                          Contact Agent
                        </Button>
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
                        <br />
                        <br />
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat.
                      </p>
                    </div>

                    {/* More Info Section */}
                    <div className="p-8">
                      <div className="bg-white rounded-2xl shadow-medium shadow-gray-300 p-6 flex flex-col z-10">
                        {/* Total Info */}

                        <div className="flex items-center justify-between text-lg font-bold text-foreground-700">
                          <span>Down Payment</span>
                          <span>₱ 10,000</span>
                        </div>
                        <span className="text-sm text-foreground-500 mt-4">
                          Only 20% down payment.
                        </span>

                        <Divider className="mt-3" />
                        <div className="mt-4 flex items-center justify-between text-lg font-bold text-foreground-700">
                          <span>Monthly Payment</span>
                          <span>₱ 5,000</span>
                        </div>
                        <div className="mt-4 flex items-center justify-between text-sm text-foreground-500">
                          <span>Loan</span>
                          <span>30-year fixed loan at 6.316%</span>
                        </div>
                        {/* Bar Chart */}
                        <div className="mt-4 w-full h-3 flex rounded overflow-hidden gap-1">
                          <div className="rounded-sm bg-blue-600 w-[80%]" />
                          <div className="rounded-sm bg-purple-500 w-[9%]" />
                          <div className="rounded-sm bg-green-400 w-[11%]" />
                        </div>
                        {/* Legend */}
                        <div className="flex flex-col mt-4">
                          <div className="flex items-center mb-2">
                            <div className="h-3 w-3 min-w-3 rounded-full bg-blue-600" />
                            <span className="ml-2 text-sm text-foreground-500">
                              Principal &amp; Interest
                            </span>
                            <span className="font-bold ml-auto text-foreground-700 text-sm">
                              ₱ 500
                            </span>
                          </div>
                          <div className="flex items-center mb-2">
                            <div className="h-3 w-3 min-w-3 rounded-full bg-purple-500" />
                            <span className="ml-2 text-sm text-foreground-500">
                              Property Tax
                            </span>
                            <span className="font-bold ml-auto text-foreground-700 text-sm">
                              ₱ 1,230
                            </span>
                          </div>
                          <div className="flex items-center mb-2">
                            <div className="h-3 w-3 min-w-3 rounded-full bg-green-400" />
                            <span className="ml-2 text-sm text-foreground-500">
                              Home Insurance
                            </span>
                            <span className="font-bold ml-auto text-foreground-700 text-sm">
                              ₱ 700
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Map Preview */}
                      <div className="mt-8 bg-white rounded-2xl shadow-medium shadow-gray-300 flex flex-col z-10 overflow-hidden">
                        <div className="aspect-video w-full">
                          {isLoaded ? (
                            <GoogleMap
                              center={{
                                lat: 3.745,
                                lng: 38.523,
                              }}
                              mapContainerStyle={{
                                width: "100%",
                                height: "200px",
                              }}
                              zoom={10}
                              onLoad={onLoad}
                              onUnmount={onUnmount}
                            >
                              {/* Child components, such as markers, info windows, etc. */}
                              <></>
                            </GoogleMap>
                          ) : (
                            <></>
                          )}
                        </div>
                        <div className="bg-white pl-4 pr-4 pb-4">
                          <span className="text-sm text-foreground-500">
                            Zone 5-B Provido Village City Heights, General
                            Santos City.
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 360 Preview */}
                  <Tabs
                    aria-label="Options"
                    className="mt-10"
                    color="primary"
                    radius="full"
                    size="lg"
                    variant="underlined"
                  >
                    <Tab key="living-room" title="Living Room">
                      <ReactPhotoSphereViewer
                        height={"36vh"}
                        src={ImgPanoramaLiving}
                        width={"100%"}
                      />
                    </Tab>
                    <Tab key="family-room" title="Family Room">
                      <ReactPhotoSphereViewer
                        height={"36vh"}
                        src={ImgPanoramaDining}
                        width={"100%"}
                      />
                    </Tab>
                    <Tab key="bedroom" title="Bedroom">
                      <ReactPhotoSphereViewer
                        height={"36vh"}
                        src={ImgPanoramaBedRoom}
                        width={"100%"}
                      />
                    </Tab>
                    <Tab key="kitchen" title="Kitchen">
                      <ReactPhotoSphereViewer
                        height={"36vh"}
                        src={ImgPanoramaKitchen}
                        width={"100%"}
                      />
                    </Tab>
                    <Tab key="dining-room" title="Dining Room">
                      <ReactPhotoSphereViewer
                        height={"36vh"}
                        src={ImgPanoramaDining}
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
