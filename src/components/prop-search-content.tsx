import { useCallback, useState } from "react";
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
import { GoogleMap } from "@react-google-maps/api";

import ImgPanoramaDining from "../assets/images/panorama_1.jpg";
import ImgPanoramaBedRoom from "../assets/images/panorama_bed_room.jpg";
import ImgPanoramaKitchen from "../assets/images/panorama_kitchen.jpg";
import ImgPanoramaLiving from "../assets/images/panorama_living_room.jpg";

import { properties_data } from "@/data/properties_data";

export const PropSearchContent = () => {
  // States
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Pagination variables
  const itemsPerPage = 5;
  const filteredProperties = properties_data.filter((property) =>
    property.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);
  const paginatedProperties = filteredProperties.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSearch = () => {
    setSearchQuery(searchInput);
    setCurrentPage(1);
  };

  const onOpen = () => setIsOpen(true);
  const onOpenChange = (open: boolean) => setIsOpen(open);

  // Google Maps hooks (mock)
  const onLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);
  const onUnmount = useCallback(() => {
    setIsLoaded(false);
  }, []);

  return (
    <>
      <div className="px-4 sm:px-6 lg:px-12">
        {/* Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-8">
          <Input
            className="flex-grow max-w-full sm:max-w-4xl bg-white rounded-large"
            placeholder="Search by location, property type..."
            size="lg"
            type="text"
            value={searchInput}
            variant="bordered"
            onChange={(e: any) => setSearchInput(e.target.value)}
          />
          <Button
            className="sm:ml-3 flex-shrink-0"
            color="primary"
            size="lg"
            onClick={handleSearch}
          >
            Search
          </Button>

          <Select
            disabled
            className="max-w-full sm:max-w-36 sm:ml-3"
            label="Sort by"
            size="sm"
          >
            <SelectItem key="name">Name</SelectItem>
            <SelectItem key="price">Price</SelectItem>
            <SelectItem key="date">Date</SelectItem>
          </Select>

          <Select
            disabled
            className="max-w-full sm:max-w-36 sm:ml-3"
            label="Filter"
            size="sm"
          >
            <SelectItem key="apartment">Apartment</SelectItem>
            <SelectItem key="house">House</SelectItem>
          </Select>
        </div>

        {/* Results */}
        {searchQuery ? (
          <>
            <div className="mt-16 flex flex-col gap-4">
              {paginatedProperties.length === 0 ? (
                <p className="flex items-center justify-center text-center text-gray-700 h-96 text-xl bg-white rounded-lg">
                  No properties found.
                </p>
              ) : (
                paginatedProperties.map((property, index) => (
                  <Card
                    key={index}
                    isPressable
                    className="shadow-md shadow-gray-300"
                    shadow="sm"
                    onPress={onOpen}
                  >
                    <div className="flex flex-col sm:flex-row h-auto sm:h-60">
                      <div className="aspect-video w-full sm:w-1/3">
                        <img
                          alt={property.title}
                          className="h-full w-full object-center object-cover rounded-t-lg sm:rounded-none sm:rounded-l-lg"
                          src={property.img}
                        />
                      </div>
                      <div className="p-6 sm:p-8 w-full sm:w-2/3 flex flex-col justify-between">
                        <div className="flex justify-between w-full">
                          <div className="flex flex-col w-full">
                            <span className="text-3xl text-gray-700 font-bold">
                              {property.title}
                            </span>
                            <span className="font-normal mt-2 text-gray-700">
                              {property.address}
                            </span>
                          </div>
                          <Button
                            isIconOnly
                            className="ml-2 self-start"
                            radius="full"
                            variant="light"
                          >
                            <IconBookmark />
                          </Button>
                        </div>
                        <span className="font-medium text-4xl mt-4 sm:mt-8">
                          {property.price}
                        </span>
                        <div className="flex flex-wrap gap-3 mt-4 text-xl text-gray-500 font-normal">
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
                  onChange={(page: any) => setCurrentPage(page)}
                />
              </div>
            )}
          </>
        ) : (
          <p className="mt-4 flex items-center justify-center text-center text-gray-700 h-96 text-xl bg-white rounded-lg">
            Search to see results.
          </p>
        )}
      </div>

      {/* Modal Content */}
      <Modal
        backdrop="blur"
        isDismissable={false}
        isOpen={isOpen}
        scrollBehavior="inside"
        size="full"
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader />
              <ModalBody>
                <div className="flex flex-col overflow-x-hidden p-4 sm:p-8 space-y-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Info Section */}
                    <div>
                      <span className="text-3xl font-bold">
                        Luxe Living Properties
                      </span>
                      <div className="flex flex-wrap gap-3 mt-3">
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
                      <div className="mt-4 text-gray-500 italic flex items-center">
                        <IconMapPinFilled className="mr-3" size={18} />
                        <p>
                          Zone 5-B Provido Village City Heights, General Santos
                          City.
                        </p>
                      </div>
                      <div className="mt-2 text-gray-500 italic flex items-center">
                        <IconUserFilled className="mr-3" size={18} />
                        <p>Juanito Baldo Jr.</p>
                      </div>
                      <span className="text-5xl mt-8 font-bold flex">
                        ₱ 5,000,000
                      </span>
                      <div className="mt-8 flex flex-col sm:flex-row gap-4">
                        <Button
                          className="flex-grow"
                          color="primary"
                          variant="shadow"
                          onPress={() => alert("Schedule Viewing")}
                        >
                          Schedule Viewing
                        </Button>
                        <Button
                          className="flex-grow"
                          onPress={() => alert("Contact Agent")}
                        >
                          Contact Agent
                        </Button>
                      </div>
                      <span className="mt-8 text-2xl font-bold text-gray-700 block">
                        Description
                      </span>
                      <p className="text-gray-700 text-justify mt-3">
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
                    <div className="p-0 sm:p-8 bg-white rounded-2xl shadow-md shadow-gray-300 flex flex-col z-10">
                      <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-between text-lg font-bold text-gray-700">
                          <span>Down Payment</span>
                          <span>₱ 10,000</span>
                        </div>
                        <span className="text-sm text-gray-500">
                          Only 20% down payment.
                        </span>

                        <Divider />

                        <div className="flex items-center justify-between text-lg font-bold text-gray-700">
                          <span>Monthly Payment</span>
                          <span>₱ 5,000</span>
                        </div>
                        <div className="flex items-center justify-between text-sm text-gray-500">
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
                        <div className="flex flex-col mt-4 gap-2">
                          <div className="flex items-center">
                            <div className="h-3 w-3 min-w-3 rounded-full bg-blue-600" />
                            <span className="ml-2 text-sm text-gray-500">
                              Principal &amp; Interest
                            </span>
                            <span className="font-bold ml-auto text-gray-700 text-sm">
                              ₱ 500
                            </span>
                          </div>
                          <div className="flex items-center">
                            <div className="h-3 w-3 min-w-3 rounded-full bg-purple-500" />
                            <span className="ml-2 text-sm text-gray-500">
                              Property Tax
                            </span>
                            <span className="font-bold ml-auto text-gray-700 text-sm">
                              ₱ 1,230
                            </span>
                          </div>
                          <div className="flex items-center">
                            <div className="h-3 w-3 min-w-3 rounded-full bg-green-400" />
                            <span className="ml-2 text-sm text-gray-500">
                              Home Insurance
                            </span>
                            <span className="font-bold ml-auto text-gray-700 text-sm">
                              ₱ 700
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Map Preview */}
                      <div className="mt-8 bg-white rounded-2xl shadow-md shadow-gray-300 overflow-hidden">
                        <div className="aspect-video w-full">
                          {isLoaded ? (
                            <GoogleMap
                              center={{ lat: 3.745, lng: 38.523 }}
                              mapContainerStyle={{
                                width: "100%",
                                height: "200px",
                              }}
                              zoom={10}
                              onLoad={onLoad}
                              onUnmount={onUnmount}
                            >
                              <></>
                            </GoogleMap>
                          ) : (
                            <></>
                          )}
                        </div>
                        <div className="bg-white p-4">
                          <span className="text-sm text-gray-500">
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
