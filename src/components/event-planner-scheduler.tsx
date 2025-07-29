import { useState, useMemo } from "react";
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
  Textarea,
  useDisclosure,
  Avatar,
  Divider,
  Tabs,
  Tab
} from "@heroui/react";
import {
  IconCalendar,
  IconClock,
  IconPlus,
  IconEdit,
  IconTrash,
  IconUsers,
  IconMapPin,
  IconFilter,
  IconSearch,
  IconChevronLeft,
  IconChevronRight,
  IconEye,
  IconMail,
  IconPhone
} from "@tabler/icons-react";
import { useAutomation } from "@/contexts/automation-context";

export const EventPlannerScheduler = () => {
  const {
    filteredEvents,
    filteredProperties,
    leads,
    agents,
    addEvent,
    updateEvent,
    selectedEvent,
    setSelectedEvent,
    setEventFilters
  } = useAutomation();

  const [activeView, setActiveView] = useState<'calendar' | 'list' | 'timeline'>('calendar');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    type: 'All',
    status: 'All',
    agent: 'All'
  });

  const { isOpen: isEventModalOpen, onOpen: onEventModalOpen, onClose: onEventModalClose } = useDisclosure();
  const { isOpen: isEditModalOpen, onOpen: onEditModalOpen, onClose: onEditModalClose } = useDisclosure();

  const [eventForm, setEventForm] = useState({
    title: '',
    type: 'Viewing',
    date: '',
    time: '09:00',
    duration: 60,
    client: '',
    agent: '',
    propertyId: '',
    notes: '',
    reminderTime: 24 // hours before
  });

  // Filter events based on search and filters
  const filteredAndSearchedEvents = useMemo(() => {
    let events = filteredEvents;

    if (searchQuery) {
      events = events.filter(event =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.client.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filters.type !== 'All') {
      events = events.filter(event => event.type === filters.type);
    }

    if (filters.status !== 'All') {
      events = events.filter(event => event.status === filters.status);
    }

    if (filters.agent !== 'All') {
      events = events.filter(event => event.agent === filters.agent);
    }

    return events;
  }, [filteredEvents, searchQuery, filters]);

  // Get events for current month
  const currentMonthEvents = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    return filteredAndSearchedEvents.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.getFullYear() === year && eventDate.getMonth() === month;
    });
  }, [filteredAndSearchedEvents, currentDate]);

  // Generate calendar days
  const calendarDays = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    const current = new Date(startDate);
    
    for (let i = 0; i < 42; i++) {
      const dayEvents = currentMonthEvents.filter(event => {
        const eventDate = new Date(event.date);
        return eventDate.toDateString() === current.toDateString();
      });
      
      days.push({
        date: new Date(current),
        events: dayEvents,
        isCurrentMonth: current.getMonth() === month,
        isToday: current.toDateString() === new Date().toDateString()
      });
      
      current.setDate(current.getDate() + 1);
    }
    
    return days;
  }, [currentMonthEvents, currentDate]);

  const handleAddEvent = () => {
    if (eventForm.title && eventForm.date && eventForm.client) {
      addEvent({
        title: eventForm.title,
        type: eventForm.type as any,
        date: eventForm.date,
        time: eventForm.time,
        client: eventForm.client,
        agent: eventForm.agent || agents[0]?.email || 'agent@atuna.com',
        propertyId: eventForm.propertyId || filteredProperties[0]?.id || '',
        status: 'Scheduled',
        duration: eventForm.duration,
        notes: eventForm.notes
      });
      
      resetForm();
      onEventModalClose();
    }
  };

  const handleUpdateEvent = () => {
    if (selectedEvent && eventForm.title) {
      updateEvent(selectedEvent.id, {
        title: eventForm.title,
        type: eventForm.type as any,
        date: eventForm.date,
        time: eventForm.time,
        client: eventForm.client,
        agent: eventForm.agent,
        propertyId: eventForm.propertyId,
        duration: eventForm.duration,
        notes: eventForm.notes
      });
      
      resetForm();
      onEditModalClose();
    }
  };

  const resetForm = () => {
    setEventForm({
      title: '',
      type: 'Viewing',
      date: '',
      time: '09:00',
      duration: 60,
      client: '',
      agent: '',
      propertyId: '',
      notes: '',
      reminderTime: 24
    });
  };

  const openEditModal = (event: any) => {
    setSelectedEvent(event);
    setEventForm({
      title: event.title,
      type: event.type,
      date: event.date,
      time: event.time,
      duration: event.duration,
      client: event.client,
      agent: event.agent,
      propertyId: event.propertyId,
      notes: event.notes || '',
      reminderTime: 24
    });
    onEditModalOpen();
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(newDate.getMonth() - 1);
      } else {
        newDate.setMonth(newDate.getMonth() + 1);
      }
      return newDate;
    });
  };

  const renderCalendarView = () => (
    <div className="space-y-6">
      {/* Calendar Header */}
      <Card>
        <CardBody>
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Button
                isIconOnly
                variant="light"
                onPress={() => navigateMonth('prev')}
              >
                <IconChevronLeft className="h-4 w-4" />
              </Button>
              <h2 className="text-xl font-semibold">
                {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </h2>
              <Button
                isIconOnly
                variant="light"
                onPress={() => navigateMonth('next')}
              >
                <IconChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <Button
              color="primary"
              startContent={<IconPlus className="h-4 w-4" />}
              onPress={onEventModalOpen}
            >
              Schedule Event
            </Button>
          </div>
        </CardBody>
      </Card>

      {/* Calendar Grid */}
      <Card>
        <CardBody>
          <div className="grid grid-cols-7 gap-1">
            {/* Day headers */}
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="p-2 text-center font-medium text-foreground-600 border-b">
                {day}
              </div>
            ))}
            
            {/* Calendar days */}
            {calendarDays.map((day, index) => (
              <div
                key={index}
                className={`min-h-24 p-1 border border-divider ${
                  !day.isCurrentMonth ? 'bg-gray-50 text-foreground-400' : ''
                } ${day.isToday ? 'bg-primary-50 border-primary' : ''}`}
              >
                <div className="text-sm font-medium mb-1">{day.date.getDate()}</div>
                <div className="space-y-1">
                  {day.events.slice(0, 2).map(event => (
                    <div
                      key={event.id}
                      className={`text-xs p-1 rounded cursor-pointer hover:opacity-80 ${
                        event.type === 'Viewing' ? 'bg-blue-100 text-blue-800' :
                        event.type === 'Inspection' ? 'bg-yellow-100 text-yellow-800' :
                        event.type === 'Lease Review' ? 'bg-green-100 text-green-800' :
                        'bg-purple-100 text-purple-800'
                      }`}
                      onClick={() => openEditModal(event)}
                    >
                      {event.time} - {event.title.substring(0, 20)}
                    </div>
                  ))}
                  {day.events.length > 2 && (
                    <div className="text-xs text-foreground-500">
                      +{day.events.length - 2} more
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );

  const renderListView = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Event List</h2>
        <Button
          color="primary"
          startContent={<IconPlus className="h-4 w-4" />}
          onPress={onEventModalOpen}
        >
          Schedule Event
        </Button>
      </div>

      {/* Upcoming Events */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Upcoming Events</h3>
        </CardHeader>
        <CardBody>
          <div className="space-y-4">
            {filteredAndSearchedEvents
              .filter(event => new Date(event.date) >= new Date())
              .slice(0, 10)
              .map(event => (
                <div key={event.id} className="p-4 border border-divider rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-3">
                    <div className="space-y-1">
                      <h4 className="font-medium">{event.title}</h4>
                      <div className="flex items-center space-x-4 text-sm text-foreground-600">
                        <span className="flex items-center">
                          <IconCalendar className="h-4 w-4 mr-1" />
                          {new Date(event.date).toLocaleDateString()}
                        </span>
                        <span className="flex items-center">
                          <IconClock className="h-4 w-4 mr-1" />
                          {event.time}
                        </span>
                        <span className="flex items-center">
                          <IconUsers className="h-4 w-4 mr-1" />
                          {event.client}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
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

                  <div className="flex justify-between items-center">
                    <div className="text-sm text-foreground-600">
                      Duration: {event.duration} minutes
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="light"
                        isIconOnly
                        onPress={() => openEditModal(event)}
                      >
                        <IconEdit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="light"
                        isIconOnly
                        color="danger"
                      >
                        <IconTrash className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );

  const renderTimelineView = () => {
    const today = new Date();
    const next7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(today);
      date.setDate(date.getDate() + i);
      return date;
    });

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">7-Day Timeline</h2>
          <Button
            color="primary"
            startContent={<IconPlus className="h-4 w-4" />}
            onPress={onEventModalOpen}
          >
            Schedule Event
          </Button>
        </div>

        <div className="space-y-4">
          {next7Days.map(date => {
            const dayEvents = filteredAndSearchedEvents.filter(event => {
              const eventDate = new Date(event.date);
              return eventDate.toDateString() === date.toDateString();
            });

            return (
              <Card key={date.toISOString()}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">
                      {date.toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </h3>
                    <Chip size="sm" variant="flat">
                      {dayEvents.length} event{dayEvents.length !== 1 ? 's' : ''}
                    </Chip>
                  </div>
                </CardHeader>
                <CardBody>
                  {dayEvents.length === 0 ? (
                    <p className="text-foreground-500 italic">No events scheduled</p>
                  ) : (
                    <div className="space-y-3">
                      {dayEvents
                        .sort((a, b) => a.time.localeCompare(b.time))
                        .map(event => (
                          <div 
                            key={event.id} 
                            className="flex items-center justify-between p-3 border border-divider rounded-lg hover:bg-gray-50 cursor-pointer"
                            onClick={() => openEditModal(event)}
                          >
                            <div className="flex items-center space-x-3">
                              <div className="text-sm font-medium">{event.time}</div>
                              <Divider orientation="vertical" className="h-6" />
                              <div>
                                <p className="font-medium">{event.title}</p>
                                <p className="text-sm text-foreground-600">{event.client}</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Chip size="sm" variant="flat" color="primary">
                                {event.type}
                              </Chip>
                              <Chip
                                size="sm"
                                color={event.status === 'Scheduled' ? 'success' : 'default'}
                              >
                                {event.status}
                              </Chip>
                            </div>
                          </div>
                        ))}
                    </div>
                  )}
                </CardBody>
              </Card>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header with filters */}
      <Card>
        <CardBody>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex items-center space-x-4">
              <Input
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                startContent={<IconSearch className="h-4 w-4" />}
                className="max-w-xs"
              />
              <Select
                label="Type"
                selectedKeys={[filters.type]}
                onSelectionChange={(keys) => setFilters({...filters, type: Array.from(keys)[0] as string})}
                className="max-w-40"
              >
                <SelectItem key="All">All Types</SelectItem>
                <SelectItem key="Viewing">Viewing</SelectItem>
                <SelectItem key="Inspection">Inspection</SelectItem>
                <SelectItem key="Lease Review">Lease Review</SelectItem>
                <SelectItem key="Document Signing">Document Signing</SelectItem>
                <SelectItem key="Open House">Open House</SelectItem>
              </Select>
              <Select
                label="Status"
                selectedKeys={[filters.status]}
                onSelectionChange={(keys) => setFilters({...filters, status: Array.from(keys)[0] as string})}
                className="max-w-40"
              >
                <SelectItem key="All">All Status</SelectItem>
                <SelectItem key="Scheduled">Scheduled</SelectItem>
                <SelectItem key="Completed">Completed</SelectItem>
                <SelectItem key="Cancelled">Cancelled</SelectItem>
              </Select>
            </div>

            <Tabs
              selectedKey={activeView}
              onSelectionChange={(key) => setActiveView(key as any)}
              variant="bordered"
            >
              <Tab key="calendar" title="Calendar" />
              <Tab key="list" title="List" />
              <Tab key="timeline" title="Timeline" />
            </Tabs>
          </div>
        </CardBody>
      </Card>

      {/* View Content */}
      {activeView === 'calendar' && renderCalendarView()}
      {activeView === 'list' && renderListView()}
      {activeView === 'timeline' && renderTimelineView()}

      {/* Add Event Modal */}
      <Modal isOpen={isEventModalOpen} onClose={onEventModalClose} size="2xl">
        <ModalContent>
          <ModalHeader>Schedule New Event</ModalHeader>
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
              <Select
                label="Client"
                selectedKeys={[eventForm.client]}
                onSelectionChange={(keys) => setEventForm({...eventForm, client: Array.from(keys)[0] as string})}
              >
                {leads.slice(0, 10).map(lead => (
                  <SelectItem key={lead.email} value={lead.email}>
                    {lead.name} ({lead.email})
                  </SelectItem>
                ))}
              </Select>
              <Select
                label="Agent"
                selectedKeys={[eventForm.agent]}
                onSelectionChange={(keys) => setEventForm({...eventForm, agent: Array.from(keys)[0] as string})}
              >
                {agents.slice(0, 10).map(agent => (
                  <SelectItem key={agent.email} value={agent.email}>
                    {agent.name} ({agent.email})
                  </SelectItem>
                ))}
              </Select>
              <Select
                label="Property"
                selectedKeys={[eventForm.propertyId]}
                onSelectionChange={(keys) => setEventForm({...eventForm, propertyId: Array.from(keys)[0] as string})}
              >
                {filteredProperties.slice(0, 10).map(property => (
                  <SelectItem key={property.id} value={property.id}>
                    {property.address}
                  </SelectItem>
                ))}
              </Select>
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

      {/* Edit Event Modal */}
      <Modal isOpen={isEditModalOpen} onClose={onEditModalClose} size="2xl">
        <ModalContent>
          <ModalHeader>Edit Event</ModalHeader>
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
                value={eventForm.client}
                onChange={(e) => setEventForm({...eventForm, client: e.target.value})}
              />
              <Input
                label="Agent Email"
                value={eventForm.agent}
                onChange={(e) => setEventForm({...eventForm, agent: e.target.value})}
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
            <Button variant="light" onPress={onEditModalClose}>
              Cancel
            </Button>
            <Button color="primary" onPress={handleUpdateEvent}>
              Update Event
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};
