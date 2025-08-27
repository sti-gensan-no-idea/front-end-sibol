import { useState } from "react";
import {
  Card,
  CardBody,
  Button,
  useDisclosure,
  Chip,
  Tooltip,
  Avatar,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Select,
  SelectItem,
  Textarea,
} from "@heroui/react";
import {
  IconCalendar,
  IconPhone,
  IconMail,
  IconMapPin,
  IconStar,
  IconUser,
} from "@tabler/icons-react";

export interface Agent {
  name: string;
  number: string;
  img: string;
  email?: string;
  location?: string;
  rating?: number;
  specialties?: string[];
  id?: string;
}

export const AgentsTabAgentsCard = ({ 
  name, 
  number, 
  img, 
  email = `${name.toLowerCase().replace(' ', '.')}@atuna.com`,
  location = "Metro Manila",
  rating = 4.5 + Math.random() * 0.5,
  specialties = ["Residential", "Commercial"],
  id = name.toLowerCase().replace(' ', '-')
}: Agent) => {
  const { isOpen: isScheduleOpen, onOpen: onScheduleOpen, onOpenChange: onScheduleOpenChange } = useDisclosure();
  const [isHovered, setIsHovered] = useState(false);

  const handleScheduleMeeting = () => {
    onScheduleOpen();
  };

  const handleCall = () => {
    window.open(`tel:${number}`, '_self');
  };

  const handleEmail = () => {
    window.open(`mailto:${email}`, '_self');
  };

  return (
    <>
      <Card
        className={`bg-white shadow-medium hover:shadow-large transition-all duration-300 cursor-pointer ${
          isHovered ? 'scale-105' : 'scale-100'
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        isPressable
        onPress={() => console.log('View agent profile:', name)}
      >
        <CardBody className="p-6 text-center space-y-4">
          {/* Agent Avatar */}
          <div className="relative mx-auto w-24 h-24">
            <Avatar
              src={img}
              alt={`${name} - Real Estate Agent`}
              className="w-24 h-24 text-large"
              isBordered
            />
            <div className="absolute -bottom-1 -right-1 bg-green-500 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
          </div>

          {/* Agent Info */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
            
            <div className="flex items-center justify-center gap-1 text-yellow-500">
              <IconStar size={16} className="fill-current" />
              <span className="text-sm font-medium text-gray-700">
                {rating.toFixed(1)}
              </span>
              <span className="text-xs text-gray-500">(24 reviews)</span>
            </div>

            <div className="flex items-center justify-center gap-1 text-gray-500">
              <IconMapPin size={14} />
              <span className="text-sm">{location}</span>
            </div>

            <div className="flex items-center justify-center gap-1 text-gray-600">
              <IconPhone size={14} />
              <span className="text-sm">{number}</span>
            </div>
          </div>

          {/* Specialties */}
          <div className="flex flex-wrap gap-1 justify-center">
            {specialties.map((specialty, index) => (
              <Chip
                key={index}
                variant="flat"
                color="primary"
                size="sm"
              >
                {specialty}
              </Chip>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <Tooltip content="Schedule a meeting">
              <Button
                startContent={<IconCalendar size={16} />}
                color="primary"
                variant="solid"
                className="flex-1"
                onPress={(e) => {
                  e.stopPropagation();
                  handleScheduleMeeting();
                }}
              >
                Schedule
              </Button>
            </Tooltip>
            
            <Tooltip content="Call agent">
              <Button
                isIconOnly
                variant="flat"
                color="success"
                onPress={(e) => {
                  e.stopPropagation();
                  handleCall();
                }}
              >
                <IconPhone size={16} />
              </Button>
            </Tooltip>

            <Tooltip content="Send email">
              <Button
                isIconOnly
                variant="flat"
                color="secondary"
                onPress={(e) => {
                  e.stopPropagation();
                  handleEmail();
                }}
              >
                <IconMail size={16} />
              </Button>
            </Tooltip>
          </div>
        </CardBody>
      </Card>

      {/* Agent Meeting Scheduler Modal */}
      <AgentMeetingModal
        isOpen={isScheduleOpen}
        onOpenChange={onScheduleOpenChange}
        agentName={name}
        agentId={id}
        agentEmail={email}
      />
    </>
  );
};

// Agent Meeting Scheduler Component
interface AgentMeetingModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  agentName: string;
  agentId: string;
  agentEmail?: string;
}

const AgentMeetingModal = ({
  isOpen,
  onOpenChange,
  agentName,
  agentId,
  agentEmail,
}: AgentMeetingModalProps) => {
  const [formData, setFormData] = useState({
    client_name: "",
    client_email: "",
    client_phone: "",
    meeting_type: "consultation",
    preferred_date: "",
    preferred_time: "",
    meeting_location: "office",
    notes: "",
  });
  const [loading, setLoading] = useState(false);

  const meetingTypes = [
    { key: "consultation", label: "General Consultation" },
    { key: "property_viewing", label: "Property Viewing" },
    { key: "market_analysis", label: "Market Analysis" },
    { key: "contract_discussion", label: "Contract Discussion" },
    { key: "follow_up", label: "Follow-up Meeting" },
  ];

  const timeSlots = [
    { key: "09:00", label: "9:00 AM" },
    { key: "10:00", label: "10:00 AM" },
    { key: "11:00", label: "11:00 AM" },
    { key: "13:00", label: "1:00 PM" },
    { key: "14:00", label: "2:00 PM" },
    { key: "15:00", label: "3:00 PM" },
    { key: "16:00", label: "4:00 PM" },
  ];

  const locationOptions = [
    { key: "office", label: "Agent's Office" },
    { key: "client_location", label: "Your Location" },
    { key: "property_site", label: "Property Site" },
    { key: "video_call", label: "Video Call" },
    { key: "phone_call", label: "Phone Call" },
  ];

  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (
      !formData.client_name ||
      !formData.client_email ||
      !formData.preferred_date ||
      !formData.preferred_time ||
      !formData.meeting_type
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    setLoading(true);

    try {
      // TODO: Replace with actual API call
      const meetingData = {
        ...formData,
        agent_id: agentId,
        agent_name: agentName,
        agent_email: agentEmail,
        status: "pending",
        created_at: new Date().toISOString(),
      };

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log("Meeting scheduled:", meetingData);

      // Reset form
      setFormData({
        client_name: "",
        client_email: "",
        client_phone: "",
        meeting_type: "consultation",
        preferred_date: "",
        preferred_time: "",
        meeting_location: "office",
        notes: "",
      });

      onOpenChange(false);
      alert(
        `Meeting with ${agentName} scheduled successfully! You'll receive a confirmation email shortly.`
      );
    } catch (error) {
      console.error("Error scheduling meeting:", error);
      alert("Failed to schedule meeting. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="3xl"
      scrollBehavior="inside"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <div className="flex items-center gap-3">
                <IconCalendar className="w-6 h-6 text-primary" />
                <div>
                  <h2 className="text-xl font-semibold">Schedule Meeting</h2>
                  <p className="text-sm text-gray-600">
                    Book a meeting with {agentName}
                  </p>
                </div>
              </div>
            </ModalHeader>

            <ModalBody>
              <div className="space-y-6">
                {/* Client Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Your Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      required
                      label="Full Name"
                      placeholder="Enter your full name"
                      value={formData.client_name}
                      onChange={(e) =>
                        handleInputChange("client_name", e.target.value)
                      }
                    />
                    <Input
                      required
                      label="Email Address"
                      placeholder="Enter your email"
                      type="email"
                      value={formData.client_email}
                      onChange={(e) =>
                        handleInputChange("client_email", e.target.value)
                      }
                    />
                  </div>
                  <Input
                    label="Phone Number"
                    placeholder="Enter your phone number"
                    value={formData.client_phone}
                    onChange={(e) =>
                      handleInputChange("client_phone", e.target.value)
                    }
                  />
                </div>

                {/* Meeting Details */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Meeting Details
                  </h3>
                  
                  <Select
                    label="Meeting Type"
                    placeholder="Select meeting type"
                    selectedKeys={
                      formData.meeting_type ? [formData.meeting_type] : []
                    }
                    onSelectionChange={(keys) => {
                      const value = Array.from(keys)[0] as string;
                      handleInputChange("meeting_type", value || "");
                    }}
                  >
                    {meetingTypes.map((type) => (
                      <SelectItem key={type.key} value={type.key}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </Select>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      required
                      label="Preferred Date"
                      type="date"
                      value={formData.preferred_date}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={(e) =>
                        handleInputChange("preferred_date", e.target.value)
                      }
                    />

                    <Select
                      label="Preferred Time"
                      placeholder="Select time slot"
                      selectedKeys={
                        formData.preferred_time ? [formData.preferred_time] : []
                      }
                      onSelectionChange={(keys) => {
                        const value = Array.from(keys)[0] as string;
                        handleInputChange("preferred_time", value || "");
                      }}
                    >
                      {timeSlots.map((slot) => (
                        <SelectItem key={slot.key} value={slot.key}>
                          {slot.label}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>

                  <Select
                    label="Meeting Location"
                    placeholder="Select meeting location"
                    selectedKeys={
                      formData.meeting_location ? [formData.meeting_location] : []
                    }
                    onSelectionChange={(keys) => {
                      const value = Array.from(keys)[0] as string;
                      handleInputChange("meeting_location", value || "");
                    }}
                  >
                    {locationOptions.map((location) => (
                      <SelectItem key={location.key} value={location.key}>
                        {location.label}
                      </SelectItem>
                    ))}
                  </Select>

                  <Textarea
                    label="Additional Notes (Optional)"
                    minRows={3}
                    placeholder="Any specific topics you'd like to discuss or requirements?"
                    value={formData.notes}
                    onChange={(e) =>
                      handleInputChange("notes", e.target.value)
                    }
                  />
                </div>

                {/* Meeting Info */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-900 mb-2">
                    What to Expect:
                  </h4>
                  <ul className="text-blue-800 text-sm space-y-1">
                    <li>• Professional consultation with experienced agent</li>
                    <li>• Market insights and property recommendations</li>
                    <li>• Personalized service tailored to your needs</li>
                    <li>• Follow-up support throughout your journey</li>
                  </ul>
                </div>
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
                  !formData.client_name ||
                  !formData.client_email ||
                  !formData.preferred_date ||
                  !formData.preferred_time ||
                  !formData.meeting_type
                }
                isLoading={loading}
                onPress={handleSubmit}
              >
                {loading ? "Scheduling..." : "Schedule Meeting"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
