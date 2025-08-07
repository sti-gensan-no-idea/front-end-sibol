import { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Input,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Select,
  SelectItem,
  useDisclosure,
  Image,
  Slider,
  Checkbox,
} from "@heroui/react";
import {
  IconSearch,
  IconFilter,
  IconHeart,
  IconMapPin,
  IconBed,
  IconBath,
  IconRuler,
  IconCalendar,
  IconMessage,
  IconHome,
  IconUser,
  IconEye,
} from "@tabler/icons-react";

import { useAutomation } from "@/contexts/automation-context";
import { NavBar } from "@/components/navbar";
import { ClientSideBar } from "@/components/client-side-bar";

interface PropertyFilters {
  type: "All" | "Residential" | "Commercial";
  priceRange: [number, number];
  floodRisk: "All" | "Low" | "Medium" | "High";
  petFriendly: boolean;
  haunted: boolean;
}

interface InquiryForm {
  name: string;
  email: string;
  phone: string;
  budget: string;
  timeline: "1-3 months" | "3-6 months" | "6+ months";
  message: string;
  preferences: {
    petFriendly: boolean;
    nonHaunted: boolean;
    floodSafe: boolean;
  };
}

interface ViewingForm {
  date: string;
  time: string;
  type:
    | "Viewing"
    | "Inspection"
    | "Open House"
    | "Lease Review"
    | "Document Signing";
  notes: string;
}

export const DashboardClientPage = () => {
  const {
    filteredProperties,
    filteredEvents,
    messages,
    addLead,
    addEvent,
    setPropertyFilters,
    selectedProperty,
    setSelectedProperty,
    chatMessages,
    addChatMessage,
  } = useAutomation();

  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<PropertyFilters>({
    type: "All",
    priceRange: [2000000, 10000000],
    floodRisk: "All",
    petFriendly: false,
    haunted: false,
  });
  const [favorites, setFavorites] = useState<string[]>([]);

  const {
    isOpen: isInquiryModalOpen,
    onOpen: onInquiryModalOpen,
    onClose: onInquiryModalClose,
  } = useDisclosure();
  const {
    isOpen: isViewingModalOpen,
    onOpen: onViewingModalOpen,
    onClose: onViewingModalClose,
  } = useDisclosure();

  const [inquiryForm, setInquiryForm] = useState<InquiryForm>({
    name: "",
    email: "",
    phone: "",
    budget: "",
    timeline: "1-3 months",
    message: "",
    preferences: {
      petFriendly: false,
      nonHaunted: true,
      floodSafe: true,
    },
  });

  const [viewingForm, setViewingForm] = useState<ViewingForm>({
    date: "",
    time: "09:00",
    type: "Viewing",
    notes: "",
  });

  // Get tab from URL parameter
  const urlParams = new URLSearchParams(window.location.search);
  const activeTab = urlParams.get("tab") || "browse_properties";

  useEffect(() => {
    document.title = "Client Dashboard | Atuna";
  }, []);

  const applyFilters = () => {
    setPropertyFilters({
      type: filters.type === "All" ? undefined : filters.type,
      priceRange: filters.priceRange,
      floodRisk: filters.floodRisk === "All" ? undefined : filters.floodRisk,
      petFriendly: filters.petFriendly || undefined,
      haunted: filters.haunted || undefined,
    });
  };

  const searchFilteredProperties = filteredProperties.filter(
    (property) =>
      property.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleFavorite = (propertyId: string) => {
    setFavorites((prev) =>
      prev.includes(propertyId)
        ? prev.filter((id) => id !== propertyId)
        : [...prev, propertyId]
    );
  };

  const handleInquiry = () => {
    if (inquiryForm.name && inquiryForm.email && selectedProperty) {
      addLead({
        name: inquiryForm.name,
        email: inquiryForm.email,
        phone: inquiryForm.phone,
        budget: parseInt(inquiryForm.budget) || selectedProperty.price,
        timeline: inquiryForm.timeline,
        source: "Website",
        seriousness: 75,
        preferences: inquiryForm.preferences,
        status: "New",
        lastContact: new Date().toISOString().split("T")[0],
      });

      setInquiryForm({
        name: "",
        email: "",
        phone: "",
        budget: "",
        timeline: "1-3 months",
        message: "",
        preferences: {
          petFriendly: false,
          nonHaunted: true,
          floodSafe: true,
        },
      });
      onInquiryModalClose();
    }
  };

  const handleScheduleViewing = () => {
    if (viewingForm.date && selectedProperty) {
      addEvent({
        title: `Property Viewing - ${selectedProperty.address}`,
        type: viewingForm.type,
        date: viewingForm.date,
        time: viewingForm.time,
        client: inquiryForm.email || "client@example.com",
        agent: "agent1@atuna.com",
        propertyId: selectedProperty.id,
        status: "Scheduled",
        duration: 60,
        notes: viewingForm.notes,
      });

      setViewingForm({
        date: "",
        time: "09:00",
        type: "Viewing",
        notes: "",
      });
      onViewingModalClose();
    }
  };

  const renderBrowseProperties = () => (
    <div className="space-y-6">
      <Card>
        <CardBody>
          <div className="space-y-4">
            <div className="flex space-x-4">
              <Input
                className="flex-1"
                placeholder="Search by location or property name..."
                startContent={<IconSearch className="h-4 w-4" />}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button
                startContent={<IconFilter className="h-4 w-4" />}
                variant="bordered"
                onPress={applyFilters}
              >
                Apply Filters
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <Select
                label="Property Type"
                selectedKeys={[filters.type]}
                onSelectionChange={(keys) => {
                  const key = Array.from(keys)[0] as
                    | "All"
                    | "Residential"
                    | "Commercial";

                  setFilters({ ...filters, type: key || "All" });
                }}
              >
                <SelectItem key="All">All Types</SelectItem>
                <SelectItem key="Residential">Residential</SelectItem>
                <SelectItem key="Commercial">Commercial</SelectItem>
              </Select>
              <div className="space-y-2">
                <label className="text-sm font-medium">Price Range (PHP)</label>
                <Slider
                  formatOptions={{ style: "currency", currency: "PHP" }}
                  maxValue={15000000}
                  minValue={1000000}
                  step={100000}
                  value={filters.priceRange}
                  onChange={(value) =>
                    setFilters({
                      ...filters,
                      priceRange: value as [number, number],
                    })
                  }
                />
              </div>
              <Select
                label="Flood Risk"
                selectedKeys={[filters.floodRisk]}
                onSelectionChange={(keys) => {
                  const key = Array.from(keys)[0] as
                    | "All"
                    | "Low"
                    | "Medium"
                    | "High";

                  setFilters({ ...filters, floodRisk: key || "All" });
                }}
              >
                <SelectItem key="All">All Levels</SelectItem>
                <SelectItem key="Low">Low Risk</SelectItem>
                <SelectItem key="Medium">Medium Risk</SelectItem>
                <SelectItem key="High">High Risk</SelectItem>
              </Select>
              <div className="space-y-2">
                <Checkbox
                  isSelected={filters.petFriendly}
                  onValueChange={(checked) =>
                    setFilters({ ...filters, petFriendly: checked })
                  }
                >
                  Pet Friendly
                </Checkbox>
                <Checkbox
                  isSelected={!filters.haunted}
                  onValueChange={(checked) =>
                    setFilters({ ...filters, haunted: !checked })
                  }
                >
                  Non-Haunted Only
                </Checkbox>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {searchFilteredProperties.slice(0, 12).map((property) => (
          <Card key={property.id} className="hover:shadow-lg transition-shadow">
            <CardBody className="p-0">
              <div className="relative w-full">
                <Image
                  alt={property.title}
                  className="w-full h-48 object-cover"
                  src={property.image}
                />
                <Button
                  isIconOnly
                  className="absolute top-2 right-2 bg-white/80"
                  variant="light"
                  onPress={() => toggleFavorite(property.id)}
                >
                  <IconHeart
                    className={`h-4 w-4 ${favorites.includes(property.id) ? "text-red-500 fill-current" : "text-gray-600"}`}
                  />
                </Button>
                <div className="absolute bottom-2 left-2">
                  <Chip
                    color={
                      property.status === "Available"
                        ? "success"
                        : property.status === "Pending"
                          ? "warning"
                          : "danger"
                    }
                    size="sm"
                    variant="solid"
                  >
                    {property.status}
                  </Chip>
                </div>
              </div>
              <div className="p-4 space-y-3">
                <div>
                  <h3 className="font-semibold text-lg">{property.title}</h3>
                  <p className="text-sm text-foreground-600 flex items-center">
                    <IconMapPin className="h-4 w-4 mr-1" />
                    {property.address}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-2xl font-bold text-primary">
                    ₱{(property.price / 1000000).toFixed(1)}M
                  </p>
                  <div className="flex space-x-3 text-sm text-foreground-600">
                    <span className="flex items-center">
                      <IconBed className="h-4 w-4 mr-1" />
                      {property.bedrooms}
                    </span>
                    <span className="flex items-center">
                      <IconBath className="h-4 w-4 mr-1" />
                      {property.bathrooms}
                    </span>
                    <span className="flex items-center">
                      <IconRuler className="h-4 w-4 mr-1" />
                      {property.sqm}m²
                    </span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1">
                  {property.petFriendly && (
                    <Chip color="success" size="sm" variant="flat">
                      Pet Friendly
                    </Chip>
                  )}
                  {property.haunted && (
                    <Chip color="warning" size="sm" variant="flat">
                      Haunted
                    </Chip>
                  )}
                  <Chip
                    color={
                      property.floodRisk === "Low"
                        ? "success"
                        : property.floodRisk === "Medium"
                          ? "warning"
                          : "danger"
                    }
                    size="sm"
                    variant="flat"
                  >
                    {property.floodRisk} Flood Risk
                  </Chip>
                </div>
                <div className="flex space-x-2">
                  <Button
                    className="flex-1"
                    color="primary"
                    variant="solid"
                    onPress={() => {
                      setSelectedProperty(property);
                      onInquiryModalOpen();
                    }}
                  >
                    Inquire Now
                  </Button>
                  <Button
                    className="flex-1"
                    variant="bordered"
                    onPress={() => {
                      setSelectedProperty(property);
                      onViewingModalOpen();
                    }}
                  >
                    Schedule Viewing
                  </Button>
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderMyInquiries = () => {
    const clientMessages = messages.filter(
      (msg) =>
        msg.recipient.includes("client") || msg.sender?.includes("client")
    );

    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">My Inquiries & Messages</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Recent Messages</h3>
            </CardHeader>
            <CardBody>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {clientMessages.slice(0, 10).map((message) => (
                  <div
                    key={message.id}
                    className="p-3 border border-divider rounded-lg"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Chip
                          color={
                            message.channel === "Email"
                              ? "primary"
                              : message.channel === "SMS"
                                ? "success"
                                : "secondary"
                          }
                          size="sm"
                          variant="flat"
                        >
                          {message.channel}
                        </Chip>
                        <Chip
                          color={
                            message.sentiment === "Positive"
                              ? "success"
                              : message.sentiment === "Neutral"
                                ? "default"
                                : "danger"
                          }
                          size="sm"
                          variant="flat"
                        >
                          {message.sentiment}
                        </Chip>
                      </div>
                      <span className="text-xs text-foreground-500">
                        {new Date(message.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm">{message.content}</p>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Upcoming Viewings</h3>
            </CardHeader>
            <CardBody>
              <div className="space-y-4">
                {filteredEvents
                  .filter((event) => event.client.includes("client"))
                  .slice(0, 5)
                  .map((event) => (
                    <div
                      key={event.id}
                      className="p-3 border border-divider rounded-lg"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium">{event.title}</h4>
                        <Chip
                          color={
                            event.status === "Scheduled" ? "success" : "default"
                          }
                          size="sm"
                        >
                          {event.status}
                        </Chip>
                      </div>
                      <div className="space-y-1 text-sm text-foreground-600">
                        <p className="flex items-center">
                          <IconCalendar className="h-4 w-4 mr-2" />
                          {new Date(event.date).toLocaleDateString()} at{" "}
                          {event.time}
                        </p>
                        <p className="flex items-center">
                          <IconUser className="h-4 w-4 mr-2" />
                          Agent: {event.agent}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    );
  };

  const renderFavorites = () => {
    const favoriteProperties = filteredProperties.filter((property) =>
      favorites.includes(property.id)
    );

    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">My Favorite Properties</h2>
        {favoriteProperties.length === 0 ? (
          <Card>
            <CardBody className="text-center py-12">
              <IconHeart className="h-12 w-12 mx-auto text-foreground-300 mb-4" />
              <h3 className="text-lg font-medium mb-2">No favorites yet</h3>
              <p className="text-foreground-600 mb-4">
                Start browsing properties and add them to your favorites!
              </p>
              <Button
                color="primary"
                onPress={() => {
                  window.location.search = "tab=browse_properties";
                }}
              >
                Browse Properties
              </Button>
            </CardBody>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteProperties.map((property) => (
              <Card
                key={property.id}
                className="hover:shadow-lg transition-shadow"
              >
                <CardBody className="p-0">
                  <div className="relative">
                    <Image
                      alt={property.title}
                      className="w-full h-48 object-cover"
                      src={property.image}
                    />
                    <Button
                      isIconOnly
                      className="absolute top-2 right-2 bg-white/80"
                      variant="light"
                      onPress={() => toggleFavorite(property.id)}
                    >
                      <IconHeart className="h-4 w-4 text-red-500 fill-current" />
                    </Button>
                  </div>
                  <div className="p-4 space-y-3">
                    <div>
                      <h3 className="font-semibold text-lg">
                        {property.title}
                      </h3>
                      <p className="text-sm text-foreground-600 flex items-center">
                        <IconMapPin className="h-4 w-4 mr-1" />
                        {property.address}
                      </p>
                    </div>
                    <p className="text-2xl font-bold text-primary">
                      ₱{(property.price / 1000000).toFixed(1)}M
                    </p>
                    <div className="flex space-x-2">
                      <Button
                        className="flex-1"
                        color="primary"
                        size="sm"
                        variant="solid"
                        onPress={() => {
                          setSelectedProperty(property);
                          onInquiryModalOpen();
                        }}
                      >
                        Inquire Now
                      </Button>
                      <Button
                        size="sm"
                        variant="bordered"
                        onPress={() => {
                          setSelectedProperty(property);
                          onViewingModalOpen();
                        }}
                      >
                        <IconEye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
      <NavBar />
      <ClientSideBar />
      <div className="flex-1 container mx-auto px-4 py-8 ml-30">
        {activeTab === "browse_properties" && renderBrowseProperties()}
        {activeTab === "inquiries" && renderMyInquiries()}
        {activeTab === "favorites" && renderFavorites()}
        <Modal
          isOpen={isInquiryModalOpen}
          size="2xl"
          onClose={onInquiryModalClose}
        >
          <ModalContent>
            <ModalHeader>
              Inquire About Property
              {selectedProperty && (
                <p className="text-sm font-normal text-foreground-600 mt-1">
                  {selectedProperty.address}
                </p>
              )}
            </ModalHeader>
            <ModalBody>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  isRequired
                  label="Full Name"
                  value={inquiryForm.name}
                  onChange={(e) =>
                    setInquiryForm({ ...inquiryForm, name: e.target.value })
                  }
                />
                <Input
                  isRequired
                  label="Email"
                  type="email"
                  value={inquiryForm.email}
                  onChange={(e) =>
                    setInquiryForm({ ...inquiryForm, email: e.target.value })
                  }
                />
                <Input
                  label="Phone"
                  placeholder="+639123456789"
                  value={inquiryForm.phone}
                  onChange={(e) =>
                    setInquiryForm({ ...inquiryForm, phone: e.target.value })
                  }
                />
                <Input
                  label="Budget (PHP)"
                  placeholder={
                    selectedProperty
                      ? selectedProperty.price.toString()
                      : "2500000"
                  }
                  type="number"
                  value={inquiryForm.budget}
                  onChange={(e) =>
                    setInquiryForm({ ...inquiryForm, budget: e.target.value })
                  }
                />
                <Select
                  label="Timeline"
                  selectedKeys={[inquiryForm.timeline]}
                  onSelectionChange={(keys) =>
                    setInquiryForm({
                      ...inquiryForm,
                      timeline: Array.from(keys)[0] as
                        | "1-3 months"
                        | "3-6 months"
                        | "6+ months",
                    })
                  }
                >
                  <SelectItem key="1-3 months">1-3 months</SelectItem>
                  <SelectItem key="3-6 months">3-6 months</SelectItem>
                  <SelectItem key="6+ months">6+ months</SelectItem>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Preferences</label>
                <div className="flex space-x-4">
                  <Checkbox
                    isSelected={inquiryForm.preferences.petFriendly}
                    onValueChange={(checked) =>
                      setInquiryForm({
                        ...inquiryForm,
                        preferences: {
                          ...inquiryForm.preferences,
                          petFriendly: checked,
                        },
                      })
                    }
                  >
                    Pet Friendly
                  </Checkbox>
                  <Checkbox
                    isSelected={inquiryForm.preferences.nonHaunted}
                    onValueChange={(checked) =>
                      setInquiryForm({
                        ...inquiryForm,
                        preferences: {
                          ...inquiryForm.preferences,
                          nonHaunted: checked,
                        },
                      })
                    }
                  >
                    Non-Haunted
                  </Checkbox>
                  <Checkbox
                    isSelected={inquiryForm.preferences.floodSafe}
                    onValueChange={(checked) =>
                      setInquiryForm({
                        ...inquiryForm,
                        preferences: {
                          ...inquiryForm.preferences,
                          floodSafe: checked,
                        },
                      })
                    }
                  >
                    Flood Safe
                  </Checkbox>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button variant="light" onPress={onInquiryModalClose}>
                Cancel
              </Button>
              <Button color="primary" onPress={handleInquiry}>
                Submit Inquiry
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        <Modal isOpen={isViewingModalOpen} onClose={onViewingModalClose}>
          <ModalContent>
            <ModalHeader>
              Schedule Property Viewing
              {selectedProperty && (
                <p className="text-sm font-normal text-foreground-600 mt-1">
                  {selectedProperty.address}
                </p>
              )}
            </ModalHeader>
            <ModalBody>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    isRequired
                    label="Preferred Date"
                    type="date"
                    value={viewingForm.date}
                    onChange={(e) =>
                      setViewingForm({ ...viewingForm, date: e.target.value })
                    }
                  />
                  <Input
                    label="Preferred Time"
                    type="time"
                    value={viewingForm.time}
                    onChange={(e) =>
                      setViewingForm({ ...viewingForm, time: e.target.value })
                    }
                  />
                </div>
                <Select
                  label="Viewing Type"
                  selectedKeys={[viewingForm.type]}
                  onSelectionChange={(keys) =>
                    setViewingForm({
                      ...viewingForm,
                      type: Array.from(keys)[0] as
                        | "Viewing"
                        | "Inspection"
                        | "Open House"
                        | "Lease Review"
                        | "Document Signing",
                    })
                  }
                >
                  <SelectItem key="Viewing">Standard Viewing</SelectItem>
                  <SelectItem key="Inspection">Detailed Inspection</SelectItem>
                  <SelectItem key="Open House">Open House Visit</SelectItem>
                  <SelectItem key="Lease Review">Lease Review</SelectItem>
                  <SelectItem key="Document Signing">
                    Document Signing
                  </SelectItem>
                </Select>
                <Input
                  label="Special Notes"
                  placeholder="Any special requirements or questions..."
                  value={viewingForm.notes}
                  onChange={(e) =>
                    setViewingForm({ ...viewingForm, notes: e.target.value })
                  }
                />
              </div>
            </ModalBody>
            <ModalFooter>
              <Button variant="light" onPress={onViewingModalClose}>
                Cancel
              </Button>
              <Button color="primary" onPress={handleScheduleViewing}>
                Schedule Viewing
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
};
