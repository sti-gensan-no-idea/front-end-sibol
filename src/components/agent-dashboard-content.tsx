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
  Progress,
  Select,
  SelectItem,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Textarea,
  useDisclosure,
  Avatar,
  Divider
} from "@heroui/react";
import {
  IconBuildingCommunity,
  IconTrendingUp,
  IconTrendingDown,
  IconFilter,
  IconSearch,
  IconPlus,
  IconCalendar,
  IconMessage,
  IconMail,
  IconPhone,
  IconChartBar,
  IconUsers,
  IconHome,
  IconClipboard
  IconCoins,
  IconChartBar,
} from "@tabler/icons-react";
import { useAutomation } from "@/contexts/automation-context";

export const AgentDashboardContent = () => {
  const {
    analytics,
    filteredLeads,
    filteredProperties,
    filteredEvents,
    agents,
    messages,
    addLead,
    addEvent,
    addMessage,
    selectedLead,
    setSelectedLead,
    chatMessages,
    addChatMessage
  } = useAutomation();

  const [activeTab, setActiveTab] = useState('overview');
  const [newMessage, setNewMessage] = useState('');
  const { isOpen: isLeadModalOpen, onOpen: onLeadModalOpen, onClose: onLeadModalClose } = useDisclosure();
  const { isOpen: isEventModalOpen, onOpen: onEventModalOpen, onClose: onEventModalClose } = useDisclosure();
  const { isOpen: isChatModalOpen, onOpen: onChatModalOpen, onClose: onChatModalClose } = useDisclosure();

  // Form states
  const [leadForm, setLeadForm] = useState({
    name: '',
    email: '',
    phone: '',
    budget: '',
    timeline: '1-3 months',
    source: 'Website',
    preferences: {
      petFriendly: false,
      nonHaunted: true,
      floodSafe: true
    }
  });

  const [eventForm, setEventForm] = useState({
    title: '',
    type: 'Viewing',
    date: '',
    time: '09:00',
    client: '',
    propertyId: '',
    duration: 60,
    notes: ''
  });

  const handleAddLead = () => {
    if (leadForm.name && leadForm.email) {
      addLead({
        name: leadForm.name,
        email: leadForm.email,
        phone: leadForm.phone,
        budget: parseInt(leadForm.budget) || 0,
        timeline: leadForm.timeline as any,
        source: leadForm.source as any,
        seriousness: Math.floor(Math.random() * 40) + 60, // Start with high seriousness for new leads
        preferences: leadForm.preferences,
        status: 'New',
        lastContact: new Date().toISOString().split('T')[0]
      });
      
      // Reset form
      setLeadForm({
        name: '',
        email: '',
        phone: '',
        budget: '',
        timeline: '1-3 months',
        source: 'Website',
        preferences: {
          petFriendly: false,
          nonHaunted: true,
          floodSafe: true
        }
      });
      onLeadModalClose();
    }
  };

  const handleAddEvent = () => {
    if (eventForm.title && eventForm.date && eventForm.client) {
      addEvent({
        title: eventForm.title,
        type: eventForm.type as any,
        date: eventForm.date,
        time: eventForm.time,
        client: eventForm.client,
        agent: 'current-agent@atuna.com', // Would be from auth context
        propertyId: eventForm.propertyId || filteredProperties[0]?.id || '',
        status: 'Scheduled',
        duration: eventForm.duration,
        notes: eventForm.notes
      });
      
      // Reset form
      setEventForm({
        title: '',
        type: 'Viewing',
        date: '',
        time: '09:00',
        client: '',
        propertyId: '',
        duration: 60,
        notes: ''
      });
      onEventModalClose();
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedLead) {
      addChatMessage({
        content: newMessage,
        recipient: selectedLead.email,
        sender: 'current-agent@atuna.com',
        sentiment: 'Positive',
        automated: false,
        leadId: selectedLead.id,
        channel: "Social Media"
      });
      setNewMessage('');
      
      // Simulate bot response for demo
      setTimeout(() => {
        addChatMessage({
          content: "Thank you for your message! I'm very interested in viewing properties in General Santos City. When would be a good time?",
          recipient: 'current-agent@atuna.com',
          sender: selectedLead.email,
          sentiment: 'Positive',
          automated: false,
          leadId: selectedLead.id,
          channel: "Social Media"
        });
      }, 2000);
    }
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardBody className="flex flex-row items-center space-x-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <IconHome className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-foreground-600">Total Properties</p>
              <p className="text-2xl font-bold">{analytics.totalProperties}</p>
              <div className="flex items-center space-x-1">
                <IconTrendingUp className="h-4 w-4 text-success" />
                <span className="text-success text-xs">+12%</span>
              </div>
            </div>
          </CardBody>
        </Card>


        <Card>
          <CardBody className="flex flex-row items-center space-x-4">
            <div className="bg-green-100 p-3 rounded-full">
              <IconUsers className="h-6 w-6 text-green-600" />

        {/* Card */}
        <div className="p-8 rounded-large shadow-small bg-white">
          <div className="flex items-center gap-4">
            <div className="bg-gray-200 w-12 h-12 flex items-center justify-center rounded-full">
              <IconChartBar className="text-foreground-700" />

            </div>
            <div>
              <p className="text-sm text-foreground-600">Active Leads</p>
              <p className="text-2xl font-bold">{analytics.activeLeads}</p>
              <div className="flex items-center space-x-1">
                <IconTrendingUp className="h-4 w-4 text-success" />
                <span className="text-success text-xs">+8%</span>
              </div>
            </div>
          </CardBody>
        </Card>


        <Card>
          <CardBody className="flex flex-row items-center space-x-4">
            <div className="bg-yellow-100 p-3 rounded-full">
              <IconChartBar className="h-6 w-6 text-yellow-600" />

        {/* Card */}
        <div className="p-8 rounded-large shadow-small bg-white">
          <div className="flex items-center gap-4">
            <div className="bg-gray-200 w-12 h-12 flex items-center justify-center rounded-full">
              <IconCoins className="text-foreground-700" />

            </div>
            <div>
              <p className="text-sm text-foreground-600">Conversion Rate</p>
              <p className="text-2xl font-bold">{analytics.conversionRate.toFixed(1)}%</p>
              <div className="flex items-center space-x-1">
                <IconTrendingDown className="h-4 w-4 text-danger" />
                <span className="text-danger text-xs">-2%</span>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="flex flex-row items-center space-x-4">
            <div className="bg-purple-100 p-3 rounded-full">
              <IconMessage className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-foreground-600">Messages Sent</p>
              <p className="text-2xl font-bold">{analytics.totalMessages}</p>
              <div className="flex items-center space-x-1">
                <IconTrendingUp className="h-4 w-4 text-success" />
                <span className="text-success text-xs">+15%</span>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Lead Sources Chart */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Lead Sources Distribution</h3>
        </CardHeader>
        <CardBody>
          <div className="space-y-4">
            {Object.entries(analytics.leadSourceCounts).map(([source, count]) => {
              const percentage = ((count / analytics.activeLeads) * 100).toFixed(1);
              return (
                <div key={source} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">{source}</span>
                    <span className="text-sm text-foreground-600">{count} leads ({percentage}%)</span>
                  </div>
                  <Progress 
                    value={parseFloat(percentage)} 
                    className="max-w-full"
                    color={source === 'Website' ? 'primary' : source === 'Social Media' ? 'secondary' : 'success'}
                  />
                </div>
              );
            })}
          </div>
        </CardBody>
      </Card>
    </div>
  );

  const renderLeads = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Lead Management</h2>
        <Button 
          color="primary" 
          onPress={onLeadModalOpen}
          startContent={<IconPlus className="h-4 w-4" />}
        >
          Add Lead
        </Button>
      </div>

      <Card>
        <CardHeader className="flex justify-between">
          <h3 className="text-lg font-semibold">Active Leads</h3>
          <div className="flex space-x-2">
            <Input
              placeholder="Search leads..."
              startContent={<IconSearch className="h-4 w-4" />}
              className="max-w-xs"
            />
            <Button isIconOnly variant="light">
              <IconFilter className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardBody>
          <Table removeWrapper>
            <TableHeader>
              <TableColumn>LEAD</TableColumn>
              <TableColumn>SOURCE</TableColumn>
              <TableColumn>BUDGET</TableColumn>
              <TableColumn>SERIOUSNESS</TableColumn>
              <TableColumn>STATUS</TableColumn>
              <TableColumn>ACTIONS</TableColumn>
            </TableHeader>
            <TableBody>
              {filteredLeads.slice(0, 10).map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{lead.name}</p>
                      <p className="text-sm text-foreground-600">{lead.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Chip 
                      size="sm" 
                      variant="flat"
                      color={
                        lead.source === 'Website' ? 'primary' :
                        lead.source === 'Social Media' ? 'secondary' :
                        lead.source === 'Referral' ? 'success' :
                        lead.source === 'Email Campaign' ? 'warning' : 'default'
                      }
                    >
                      {lead.source}
                    </Chip>
                  </TableCell>
                  <TableCell>₱{(lead.budget / 1000000).toFixed(1)}M</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <Progress 
                        value={lead.seriousness} 
                        className="max-w-full"
                        color={lead.seriousness >= 80 ? 'success' : lead.seriousness >= 60 ? 'warning' : 'danger'}
                      />
                      <p className="text-xs text-center">{lead.seriousness}%</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Chip 
                      size="sm" 
                      variant="flat"
                      color={
                        lead.status === 'New' ? 'primary' :
                        lead.status === 'Contacted' ? 'warning' :
                        lead.status === 'Qualified' ? 'success' : 'default'
                      }
                    >
                      {lead.status}
                    </Chip>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-1">
                      <Button 
                        size="sm" 
                        variant="light" 
                        isIconOnly
                        onPress={() => {
                          setSelectedLead(lead);
                          onChatModalOpen();
                        }}
                      >
                        <IconMessage className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="light" isIconOnly>
                        <IconMail className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="light" isIconOnly>
                        <IconPhone className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );

  const renderEvents = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Event Scheduler</h2>
        <Button 
          color="primary" 
          onPress={onEventModalOpen}
          startContent={<IconCalendar className="h-4 w-4" />}
        >
          Schedule Event
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Upcoming Events</h3>
            </CardHeader>
            <CardBody>
              <div className="space-y-4">
                {filteredEvents.slice(0, 8).map((event) => (
                  <div key={event.id} className="p-4 border border-divider rounded-lg">
                    <div className="flex justify-between items-start">
                      <div className="space-y-2">
                        <h4 className="font-medium">{event.title}</h4>
                        <div className="flex items-center space-x-4 text-sm text-foreground-600">
                          <span>📅 {new Date(event.date).toLocaleDateString()}</span>
                          <span>⏰ {event.time}</span>
                          <span>👤 {event.client}</span>
                        </div>
                        <Chip 
                          size="sm" 
                          variant="flat"
                          color={
                            event.type === 'Viewing' ? 'primary' :
                            event.type === 'Inspection' ? 'warning' :
                            event.type === 'Lease Review' ? 'success' : 'secondary'
                          }
                        >
                          {event.type}
                        </Chip>
                      </div>
                      <Chip 
                        size="sm"
                        color={
                          event.status === 'Scheduled' ? 'success' :
                          event.status === 'Completed' ? 'primary' : 'danger'
                        }
                      >
                        {event.status}
                      </Chip>
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Event Statistics</h3>
            </CardHeader>
            <CardBody>
              <div className="space-y-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary">{analytics.scheduledEvents}</p>
                  <p className="text-sm text-foreground-600">Scheduled Events</p>
                </div>
                <Divider />
                <div className="space-y-3">
                  {['Viewing', 'Inspection', 'Lease Review', 'Document Signing'].map(type => {
                    const count = filteredEvents.filter(e => e.type === type).length;
                    return (
                      <div key={type} className="flex justify-between">
                        <span className="text-sm">{type}</span>
                        <span className="text-sm font-medium">{count}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Marketing Analytics</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Automation Performance</h3>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm">Automated Messages</span>
                  <span className="text-sm">{analytics.automatedMessages}/{analytics.totalMessages}</span>
                </div>
                <Progress 
                  value={(analytics.automatedMessages / analytics.totalMessages) * 100} 
                  color="primary"
                />
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm">Positive Sentiment</span>
                  <span className="text-sm">{analytics.positiveMessages}/{analytics.totalMessages}</span>
                </div>
                <Progress 
                  value={(analytics.positiveMessages / analytics.totalMessages) * 100} 
                  color="success"
                />
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm">Event Completion Rate</span>
                  <span className="text-sm">85%</span>
                </div>
                <Progress value={85} color="warning" />
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Neighborhood Performance</h3>
          </CardHeader>
          <CardBody>
            <div className="space-y-3">
              {Object.entries(analytics.neighborhoodData).slice(0, 5).map(([neighborhood, data]: [string, any]) => {
                const conversionRate = ((data.converted / data.total) * 100).toFixed(1);
                const avgPrice = (data.totalPrice / data.total / 1000000).toFixed(1);
                return (
                  <div key={neighborhood} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">{neighborhood}</span>
                      <span className="text-sm text-foreground-600">₱{avgPrice}M avg</span>
                    </div>
                    <Progress value={parseFloat(conversionRate)} color="secondary" />
                    <p className="text-xs text-foreground-600">{conversionRate}% conversion rate</p>
                  </div>
                );
              })}
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto pt-7 pr-8 pb-8 pl-20">
      {/* Navigation Tabs */}
      <div className="flex space-x-1 mb-6">
        {[
          { id: 'overview', label: 'Overview', icon: IconChartBar },
          { id: 'leads', label: 'Leads', icon: IconUsers },
          { id: 'events', label: 'Events', icon: IconCalendar },
          { id: 'analytics', label: 'Analytics', icon: IconClipboard }
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
      {activeTab === 'overview' && renderOverview()}
      {activeTab === 'leads' && renderLeads()}
      {activeTab === 'events' && renderEvents()}
      {activeTab === 'analytics' && renderAnalytics()}

      {/* Add Lead Modal */}
      <Modal isOpen={isLeadModalOpen} onClose={onLeadModalClose} size="2xl">
        <ModalContent>
          <ModalHeader>Add New Lead</ModalHeader>
          <ModalBody>
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Full Name"
                value={leadForm.name}
                onChange={(e) => setLeadForm({...leadForm, name: e.target.value})}
                isRequired
              />
              <Input
                label="Email"
                type="email"
                value={leadForm.email}
                onChange={(e) => setLeadForm({...leadForm, email: e.target.value})}
                isRequired
              />
              <Input
                label="Phone"
                value={leadForm.phone}
                onChange={(e) => setLeadForm({...leadForm, phone: e.target.value})}
                placeholder="+639123456789"
              />
              <Input
                label="Budget (PHP)"
                type="number"
                value={leadForm.budget}
                onChange={(e) => setLeadForm({...leadForm, budget: e.target.value})}
                placeholder="2500000"
              />
              <Select
                label="Timeline"
                selectedKeys={[leadForm.timeline]}
                onSelectionChange={(keys) => setLeadForm({...leadForm, timeline: Array.from(keys)[0] as string})}
              >
                <SelectItem key="1-3 months">1-3 months</SelectItem>
                <SelectItem key="3-6 months">3-6 months</SelectItem>
                <SelectItem key="6+ months">6+ months</SelectItem>
              </Select>
              <Select
                label="Source"
                selectedKeys={[leadForm.source]}
                onSelectionChange={(keys) => setLeadForm({...leadForm, source: Array.from(keys)[0] as string})}
              >
                <SelectItem key="Website">Website</SelectItem>
                <SelectItem key="Social Media">Social Media</SelectItem>
                <SelectItem key="Referral">Referral</SelectItem>
                <SelectItem key="Email Campaign">Email Campaign</SelectItem>
                <SelectItem key="Open House">Open House</SelectItem>
              </Select>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="light" onPress={onLeadModalClose}>
              Cancel
            </Button>
            <Button color="primary" onPress={handleAddLead}>
              Add Lead
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Schedule Event Modal */}
      <Modal isOpen={isEventModalOpen} onClose={onEventModalClose} size="2xl">
        <ModalContent>
          <ModalHeader>Schedule Event</ModalHeader>
          <ModalBody>
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Event Title"
                value={eventForm.title}
                onChange={(e) => setEventForm({...eventForm, title: e.target.value})}
                isRequired
              />
              <Select
                label="Event Type"
                selectedKeys={[eventForm.type]}
                onSelectionChange={(keys) => setEventForm({...eventForm, type: Array.from(keys)[0] as string})}
              >
                <SelectItem key="Viewing">Property Viewing</SelectItem>
                <SelectItem key="Inspection">Property Inspection</SelectItem>
                <SelectItem key="Lease Review">Lease Review</SelectItem>
                <SelectItem key="Document Signing">Document Signing</SelectItem>
                <SelectItem key="Open House">Open House</SelectItem>
              </Select>
              <Input
                label="Date"
                type="date"
                value={eventForm.date}
                onChange={(e) => setEventForm({...eventForm, date: e.target.value})}
                isRequired
              />
              <Input
                label="Time"
                type="time"
                value={eventForm.time}
                onChange={(e) => setEventForm({...eventForm, time: e.target.value})}
              />
              <Input
                label="Client Email"
                type="email"
                value={eventForm.client}
                onChange={(e) => setEventForm({...eventForm, client: e.target.value})}
                isRequired
              />
              <Input
                label="Duration (minutes)"
                type="number"
                value={eventForm.duration.toString()}
                onChange={(e) => setEventForm({...eventForm, duration: parseInt(e.target.value) || 60})}
              />
            </div>
            <Textarea
              label="Notes"
              value={eventForm.notes}
              onChange={(e) => setEventForm({...eventForm, notes: e.target.value})}
              placeholder="Additional notes for the event..."
            />
          </ModalBody>
          <ModalFooter>
            <Button variant="light" onPress={onEventModalClose}>
              Cancel
            </Button>
            <Button color="primary" onPress={handleAddEvent}>
              Schedule Event
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Chat Modal */}
      <Modal isOpen={isChatModalOpen} onClose={onChatModalClose} size="3xl">
        <ModalContent>
          <ModalHeader>
            Chat with {selectedLead?.name}
          </ModalHeader>
          <ModalBody>
            <div className="h-96 border border-divider rounded-lg">
              <div className="h-80 overflow-y-auto p-4 space-y-3">
                {chatMessages
                  .filter(msg => msg.leadId === selectedLead?.id)
                  .map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.sender?.includes('agent') ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs px-3 py-2 rounded-lg ${
                          msg.sender?.includes('agent')
                            ? 'bg-primary text-white'
                            : 'bg-gray-200 text-gray-900'
                        }`}
                      >
                        <p className="text-sm">{msg.content}</p>
                        <p
                          className={`text-xs mt-1 ${
                            msg.sender?.includes('agent') ? 'text-primary-100' : 'text-gray-500'
                          }`}
                        >
                          {new Date(msg.timestamp).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
              <div className="p-4 border-t border-divider">
                <div className="flex space-x-2">
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button color="primary" onPress={handleSendMessage}>
                    Send
                  </Button>
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="light" onPress={onChatModalClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};
