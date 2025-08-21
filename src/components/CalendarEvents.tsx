import { useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Chip,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Input,
  Textarea,
  Select,
  SelectItem,
} from "@heroui/react";
import { IconCalendar, IconPlus, IconCheck, IconX } from "@tabler/icons-react";

import { useEvents } from "../hooks";

interface CalendarEventsProps {
  className?: string;
}

export const CalendarEvents = ({ className }: CalendarEventsProps) => {
  const {
    events,
    createEvent,
    updateEvent,
    deleteEvent,
    getUpcomingEvents,
    loading,
    error,
  } = useEvents();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split("T")[0],
  );
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    start_time: "",
    end_time: "",
    event_type: "meeting",
    property_id: "",
  });

  const eventTypes = [
    { key: "meeting", label: "Meeting" },
    { key: "site_viewing", label: "Site Viewing" },
    { key: "presentation", label: "Presentation" },
    { key: "follow_up", label: "Follow Up" },
    { key: "other", label: "Other" },
  ];

  const upcomingEvents = getUpcomingEvents(7);

  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreateEvent = async () => {
    if (!formData.title || !formData.start_time || !formData.end_time) {
      return;
    }

    const eventData = {
      title: formData.title,
      description: formData.description,
      start_time: formData.start_time,
      end_time: formData.end_time,
      event_type: formData.event_type,
      property_id: formData.property_id || undefined,
    };

    const success = await createEvent(eventData);

    if (success) {
      // Reset form
      setFormData({
        title: "",
        description: "",
        start_time: "",
        end_time: "",
        event_type: "meeting",
        property_id: "",
      });

      setIsCreateModalOpen(false);
    }
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "site_viewing":
        return "success";
      case "meeting":
        return "primary";
      case "presentation":
        return "warning";
      case "follow_up":
        return "secondary";
      default:
        return "default";
    }
  };

  const formatTime = (dateTime: string) => {
    return new Date(dateTime).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDate = (dateTime: string) => {
    return new Date(dateTime).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  if (loading && events.length === 0) {
    return (
      <div className={`flex items-center justify-center h-64 ${className}`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto" />
          <p className="mt-2 text-gray-600">Loading events...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Header */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-3">
              <IconCalendar className="w-6 h-6 text-primary" />
              <div>
                <h3 className="text-lg font-semibold">Calendar Events</h3>
                <p className="text-sm text-gray-600">
                  Manage your appointments and meetings
                </p>
              </div>
            </div>
            <Button
              color="primary"
              startContent={<IconPlus />}
              onPress={() => setIsCreateModalOpen(true)}
            >
              New Event
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Upcoming Events */}
      <Card>
        <CardHeader>
          <h4 className="font-semibold">Upcoming Events</h4>
        </CardHeader>
        <CardBody className="space-y-4">
          {upcomingEvents.length > 0 ? (
            upcomingEvents.map((event) => (
              <div
                key={event.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <div className="text-center min-w-[60px]">
                    <div className="text-sm font-medium text-gray-900">
                      {formatDate(event.start_time)}
                    </div>
                    <div className="text-xs text-gray-500">
                      {formatTime(event.start_time)}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h5 className="font-medium">{event.title}</h5>
                      <Chip
                        color={getEventTypeColor(event.event_type)}
                        size="sm"
                        variant="flat"
                      >
                        {event.event_type.replace("_", " ")}
                      </Chip>
                    </div>
                    {event.description && (
                      <p className="text-sm text-gray-600">
                        {event.description}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    color="success"
                    size="sm"
                    startContent={<IconCheck />}
                    variant="light"
                    onPress={() =>
                      updateEvent(event.id, { status: "completed" })
                    }
                  >
                    Complete
                  </Button>
                  <Button
                    color="danger"
                    size="sm"
                    startContent={<IconX />}
                    variant="light"
                    onPress={() => deleteEvent(event.id)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              <IconCalendar className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>No upcoming events</p>
              <p className="text-sm">Create your first event to get started</p>
            </div>
          )}
        </CardBody>
      </Card>

      {/* Create Event Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        size="2xl"
        onOpenChange={setIsCreateModalOpen}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Create New Event</ModalHeader>
              <ModalBody>
                <div className="space-y-4">
                  <Input
                    required
                    label="Event Title"
                    placeholder="Enter event title"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                  />

                  <Select
                    label="Event Type"
                    placeholder="Select event type"
                    selectedKeys={
                      formData.event_type ? [formData.event_type] : []
                    }
                    onSelectionChange={(keys) => {
                      const value = Array.from(keys)[0] as string;

                      handleInputChange("event_type", value || "");
                    }}
                  >
                    {eventTypes.map((type) => (
                      <SelectItem key={type.key} value={type.key}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </Select>

                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      required
                      label="Start Date & Time"
                      type="datetime-local"
                      value={formData.start_time}
                      onChange={(e) =>
                        handleInputChange("start_time", e.target.value)
                      }
                    />
                    <Input
                      required
                      label="End Date & Time"
                      type="datetime-local"
                      value={formData.end_time}
                      onChange={(e) =>
                        handleInputChange("end_time", e.target.value)
                      }
                    />
                  </div>

                  <Input
                    label="Property ID (Optional)"
                    placeholder="Link to a specific property"
                    value={formData.property_id}
                    onChange={(e) =>
                      handleInputChange("property_id", e.target.value)
                    }
                  />

                  <Textarea
                    label="Description (Optional)"
                    minRows={3}
                    placeholder="Add event details..."
                    value={formData.description}
                    onChange={(e) =>
                      handleInputChange("description", e.target.value)
                    }
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  color="primary"
                  disabled={
                    loading ||
                    !formData.title ||
                    !formData.start_time ||
                    !formData.end_time
                  }
                  isLoading={loading}
                  onPress={handleCreateEvent}
                >
                  {loading ? "Creating..." : "Create Event"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};
