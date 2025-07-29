import { useState } from "react";
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
  Switch,
  useDisclosure,
  Avatar,
  Divider,
  Image,
  Slider,
  Checkbox
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
  IconStar,
  IconHome,
  IconUser,
  IconMail,
  IconPhone,
  IconClock,
  IconEye,
  IconChartBar
} from "@tabler/icons-react";
import { useAutomation } from "@/contexts/automation-context";
import { NavBar } from "@/components/navbar";

export const ClientDashboardPage = () => {
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
    addChatMessage
  } = useAutomation();

  const [activeTab, setActiveTab] = useState('browse');
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    type: 'All',
    priceRange: [2000000, 10000000] as [number, number],
    floodRisk: 'All',
    petFriendly: false,
    haunted: false
  });
  const [favorites, setFavorites] = useState<string[]>([]);
  const [newMessage, setNewMessage] = useState('');

  const { isOpen: isInquiryModalOpen, onOpen: onInquiryModalOpen, onClose: onInquiryModalClose } = useDisclosure();
  const { isOpen: isViewingModalOpen, onOpen: onViewingModalOpen, onClose: onViewingModalClose } = useDisclosure();
  const { isOpen: isChatModalOpen, onOpen: onChatModalOpen, onClose: onChatModalClose } = useDisclosure();

  const [inquiryForm, setInquiryForm] = useState({
    name: '',
    email: '',
    phone: '',
    budget: '',
    timeline: '1-3 months',
    message: '',
    preferences: {
      petFriendly: false,
      nonHaunted: true,
      floodSafe: true
    }
  });

  const [viewingForm, setViewingForm] = useState({
    date: '',
    time: '09:00',
    type: 'Viewing',
    notes: ''
  });

  // Apply filters to properties
  const applyFilters = () => {
    setPropertyFilters({
      type: filters.type === 'All' ? undefined : filters.type as any,
      priceRange: filters.priceRange,
      floodRisk: filters.floodRisk === 'All' ? undefined : filters.floodRisk as any,
      petFriendly: filters.petFriendly || undefined,
      haunted: filters.haunted || undefined
    });
  };

  // Filter properties by search query
  const searchFilteredProperties = filteredProperties.filter(property => 
    property.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
    property.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleFavorite = (propertyId: string) => {
    setFavorites(prev => 
      prev.includes(propertyId) 
        ? prev.filter(id => id !== propertyId)
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
        timeline: inquiryForm.timeline as any,
        source: 'Website',
        seriousness: 75, // High seriousness for direct inquiries
        preferences: inquiryForm.preferences,
        status: 'New',
        lastContact: new Date().toISOString().split('T')[0]
      });

      // Reset form
      setInquiryForm({
        name: '',
        email: '',
        phone: '',
        budget: '',
        timeline: '1-3 months',
        message: '',
        preferences: {
          petFriendly: false,
          nonHaunted: true,
          floodSafe: true
        }
      });
      onInquiryModalClose();
    }
  };

  const handleScheduleViewing = () => {
    if (viewingForm.date && selectedProperty) {
      addEvent({
        title: `Property Viewing - ${selectedProperty.address}`,
        type: viewingForm.type as any,
        date: viewingForm.date,
        time: viewingForm.time,
        client: inquiryForm.email || 'client@example.com',
        agent: 'agent1@atuna.com',
        propertyId: selectedProperty.id,
        status: 'Scheduled',
        duration: 60,
        notes: viewingForm.notes
      });

      // Reset form
      setViewingForm({
        date: '',
        time: '09:00',
        type: 'Viewing',
        notes: ''
      });
      onViewingModalClose();
    }
  };

  const renderBrowseProperties = () => (
    <div className="space-y-6">
      {/* Search and Filters */}
      <Card>
        <CardBody>
          <div className="space-y-4">
            <div className="flex space-x-4">
              <Input
                placeholder="Search by location or property name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                startContent={<IconSearch className="h-4 w-4" />}
                className="flex-1"
              />
              <Button
                variant="outline"
                startContent={<IconFilter className="h-4 w-4" />}
                onPress={applyFilters}
              >
                Apply Filters
              </Button>
            </div>

            {/* Filter Controls */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <Select
                label="Property Type"
                selectedKeys={[filters.type]}
                onSelectionChange={(keys) => setFilters({...filters, type: Array.from(keys)[0] as string})}
              >
                <SelectItem key="All">All Types</SelectItem>
                <SelectItem key="Residential">Residential</SelectItem>
                <SelectItem key="Commercial">Commercial</SelectItem>
              </Select>

              <div className="space-y-2">
                <label className="text-sm font-medium">Price Range (PHP)</label>
                <Slider
                  step={100000}
                  minValue={1000000}
                  maxValue={15000000}
                  value={filters.priceRange}
                  onChange={(value) => setFilters({...filters, priceRange: value as [number, number]})}
                  formatOptions={{style: "currency", currency: "PHP"}}
                />
              </div>

              <Select
                label="Flood Risk"
                selectedKeys={[filters.floodRisk]}
                onSelectionChange={(keys) => setFilters({...filters, floodRisk: Array.from(keys)[0] as string})}
              >
                <SelectItem key="All">All Levels</SelectItem>
                <SelectItem key="Low">Low Risk</SelectItem>
                <SelectItem key="Medium">Medium Risk</SelectItem>
                <SelectItem key="High">High Risk</SelectItem>
              </Select>

              <div className="space-y-2">
                <Checkbox
                  isSelected={filters.petFriendly}
                  onValueChange={(checked) => setFilters({...filters, petFriendly: checked})}
                >
                  Pet Friendly
                </Checkbox>
                <Checkbox
                  isSelected={!filters.haunted}
                  onValueChange={(checked) => setFilters({...filters, haunted: !checked})}
                >
                  Non-Haunted Only
                </Checkbox>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Properties Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {searchFilteredProperties.slice(0, 12).map((property) => (
          <Card key={property.id} className="hover:shadow-lg transition-shadow">
            <CardBody className="p-0">
              <div className="relative">
                <Image
                  src={property.image}
                  alt={property.title}
                  className="w-full h-48 object-cover"
                />
                <Button
                  isIconOnly
                  variant="light"
                  className="absolute top-2 right-2 bg-white/80"
                  onPress={() => toggleFavorite(property.id)}
                >
                  <IconHeart 
                    className={`h-4 w-4 ${favorites.includes(property.id) ? 'text-red-500 fill-current' : 'text-gray-600'}`} 
                  />
                </Button>
                <div className="absolute bottom-2 left-2">
                  <Chip 
                    size="sm" 
                    variant="solid" 
                    color={property.status === 'Available' ? 'success' : property.status === 'Pending' ? 'warning' : 'danger'}
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
                    <Chip size="sm" variant="flat" color="success">Pet Friendly</Chip>
                  )}
                  {property.haunted && (
                    <Chip size="sm" variant="flat" color="warning">Haunted</Chip>
                  )}
                  <Chip size="sm" variant="flat" 
                    color={property.floodRisk === 'Low' ? 'success' : property.floodRisk === 'Medium' ? 'warning' : 'danger'}>
                    {property.floodRisk} Flood Risk
                  </Chip>
                </div>

                <div className="flex space-x-2">
                  <Button
                    color="primary"
                    variant="solid"
                    size="sm"
                    className="flex-1"
                    onPress={() => {
                      setSelectedProperty(property);
                      onInquiryModalOpen();
                    }}
                  >
                    Inquire Now
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
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
    const clientMessages = messages.filter(msg => msg.recipient.includes('client') || msg.sender?.includes('client'));
    
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
                  <div key={message.id} className="p-3 border border-divider rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Chip size="sm" variant="flat" 
                          color={message.channel === 'Email' ? 'primary' : message.channel === 'SMS' ? 'success' : 'secondary'}>
                          {message.channel}
                        </Chip>
                        <Chip size="sm" variant="flat"
                          color={message.sentiment === 'Positive' ? 'success' : message.sentiment === 'Neutral' ? 'default' : 'danger'}>
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
                {filteredEvents.filter(event => event.client.includes('client')).slice(0, 5).map((event) => (
                  <div key={event.id} className="p-3 border border-divider rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium">{event.title}</h4>
                      <Chip size="sm" color={event.status === 'Scheduled' ? 'success' : 'default'}>
                        {event.status}
                      </Chip>
                    </div>
                    <div className="space-y-1 text-sm text-foreground-600">
                      <p className="flex items-center">
                        <IconCalendar className="h-4 w-4 mr-2" />
                        {new Date(event.date).toLocaleDateString()} at {event.time}
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
    const favoriteProperties = filteredProperties.filter(property => favorites.includes(property.id));

    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">My Favorite Properties</h2>
        
        {favoriteProperties.length === 0 ? (
          <Card>
            <CardBody className="text-center py-12">
              <IconHeart className="h-12 w-12 mx-auto text-foreground-300 mb-4" />
              <h3 className="text-lg font-medium mb-2">No favorites yet</h3>
              <p className="text-foreground-600 mb-4">Start browsing properties and add them to your favorites!</p>
              <Button color="primary" onPress={() => setActiveTab('browse')}>
                Browse Properties
              </Button>
            </CardBody>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteProperties.map((property) => (
              <Card key={property.id} className="hover:shadow-lg transition-shadow">
                <CardBody className="p-0">
                  <div className="relative">
                    <Image
                      src={property.image}
                      alt={property.title}
                      className="w-full h-48 object-cover"
                    />
                    <Button
                      isIconOnly
                      variant="light"
                      className="absolute top-2 right-2 bg-white/80"
                      onPress={() => toggleFavorite(property.id)}
                    >
                      <IconHeart className="h-4 w-4 text-red-500 fill-current" />
                    </Button>
                  </div>

                  <div className="p-4 space-y-3">
                    <div>
                      <h3 className="font-semibold text-lg">{property.title}</h3>
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
                        color="primary"
                        variant="solid"
                        size="sm"
                        className="flex-1"
                        onPress={() => {
                          setSelectedProperty(property);
                          onInquiryModalOpen();
                        }}
                      >
                        Inquire Now
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
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
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-8">
          {[
            { id: 'browse', label: 'Browse Properties', icon: IconHome },
            { id: 'inquiries', label: 'My Inquiries', icon: IconMessage },
            { id: 'favorites', label: 'Favorites', icon: IconHeart }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? 'solid' : 'light'}
                color={activeTab === tab.id ? 'primary' : 'default'}
                onPress={() => setActiveTab(tab.id)}
                startContent={<Icon className="h-4 w-4" />}
              >
                {tab.label}
              </Button>
            );
          })}
        </div>

        {/* Tab Content */}
        {activeTab === 'browse' && renderBrowseProperties()}
        {activeTab === 'inquiries' && renderMyInquiries()}
        {activeTab === 'favorites' && renderFavorites()}

        {/* Property Inquiry Modal */}
        <Modal isOpen={isInquiryModalOpen} onClose={onInquiryModalClose} size="2xl">
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
                  label="Full Name"
                  value={inquiryForm.name}
                  onChange={(e) => setInquiryForm({...inquiryForm, name: e.target.value})}
                  isRequired
                />
                <Input
                  label="Email"
                  type="email"
                  value={inquiryForm.email}
                  onChange={(e) => setInquiryForm({...inquiryForm, email: e.target.value})}
                  isRequired
                />
                <Input
                  label="Phone"
                  value={inquiryForm.phone}
                  onChange={(e) => setInquiryForm({...inquiryForm, phone: e.target.value})}
                  placeholder="+639123456789"
                />
                <Input
                  label="Budget (PHP)"
                  type="number"
                  value={inquiryForm.budget}
                  onChange={(e) => setInquiryForm({...inquiryForm, budget: e.target.value})}
                  placeholder={selectedProperty ? selectedProperty.price.toString() : "2500000"}
                />
                <Select
                  label="Timeline"
                  selectedKeys={[inquiryForm.timeline]}
                  onSelectionChange={(keys) => setInquiryForm({...inquiryForm, timeline: Array.from(keys)[0] as string})}
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
                    onValueChange={(checked) => setInquiryForm({
                      ...inquiryForm, 
                      preferences: {...inquiryForm.preferences, petFriendly: checked}
                    })}
                  >
                    Pet Friendly
                  </Checkbox>
                  <Checkbox
                    isSelected={inquiryForm.preferences.nonHaunted}
                    onValueChange={(checked) => setInquiryForm({
                      ...inquiryForm, 
                      preferences: {...inquiryForm.preferences, nonHaunted: checked}
                    })}
                  >
                    Non-Haunted
                  </Checkbox>
                  <Checkbox
                    isSelected={inquiryForm.preferences.floodSafe}
                    onValueChange={(checked) => setInquiryForm({
                      ...inquiryForm, 
                      preferences: {...inquiryForm.preferences, floodSafe: checked}
                    })}
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

        {/* Schedule Viewing Modal */}
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
                    label="Preferred Date"
                    type="date"
                    value={viewingForm.date}
                    onChange={(e) => setViewingForm({...viewingForm, date: e.target.value})}
                    isRequired
                  />
                  <Input
                    label="Preferred Time"
                    type="time"
                    value={viewingForm.time}
                    onChange={(e) => setViewingForm({...viewingForm, time: e.target.value})}
                  />
                </div>
                <Select
                  label="Viewing Type"
                  selectedKeys={[viewingForm.type]}
                  onSelectionChange={(keys) => setViewingForm({...viewingForm, type: Array.from(keys)[0] as string})}
                >
                  <SelectItem key="Viewing">Standard Viewing</SelectItem>
                  <SelectItem key="Inspection">Detailed Inspection</SelectItem>
                  <SelectItem key="Open House">Open House Visit</SelectItem>
                </Select>
                <Input
                  label="Special Notes"
                  value={viewingForm.notes}
                  onChange={(e) => setViewingForm({...viewingForm, notes: e.target.value})}
                  placeholder="Any special requirements or questions..."
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

export { ClientDashboardPage as DashboardClientPage };
