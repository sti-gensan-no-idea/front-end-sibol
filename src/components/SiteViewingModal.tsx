import { useState } from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Button,
  Input,
  Textarea,
  Select,
  SelectItem,
} from "@heroui/react";
import { IconCalendar } from "@tabler/icons-react";

import { useSiteViewings } from "../hooks";

interface SiteViewingModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  propertyId?: string;
  propertyTitle?: string;
  isGuest?: boolean;
}

export const SiteViewingModal = ({
  isOpen,
  onOpenChange,
  propertyId,
  propertyTitle,
  isGuest = false,
}: SiteViewingModalProps) => {
  const { createSiteViewing, createGuestSiteViewing, loading, error } =
    useSiteViewings();
  const [formData, setFormData] = useState({
    property_id: propertyId || "",
    client_name: "",
    client_email: "",
    client_phone: "",
    preferred_date: "",
    preferred_time: "",
    notes: "",
  });

  const timeSlots = [
    { key: "09:00", label: "9:00 AM" },
    { key: "10:00", label: "10:00 AM" },
    { key: "11:00", label: "11:00 AM" },
    { key: "14:00", label: "2:00 PM" },
    { key: "15:00", label: "3:00 PM" },
    { key: "16:00", label: "4:00 PM" },
  ];

  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (
      !formData.property_id ||
      !formData.client_name ||
      !formData.client_email ||
      !formData.preferred_date ||
      !formData.preferred_time
    ) {
      return;
    }

    const viewingData = {
      property_id: formData.property_id,
      client_name: formData.client_name,
      client_email: formData.client_email,
      client_phone: formData.client_phone,
      preferred_date: formData.preferred_date,
      preferred_time: formData.preferred_time,
      notes: formData.notes,
    };

    const success = isGuest
      ? await createGuestSiteViewing(viewingData)
      : await createSiteViewing(viewingData);

    if (success) {
      // Reset form
      setFormData({
        property_id: propertyId || "",
        client_name: "",
        client_email: "",
        client_phone: "",
        preferred_date: "",
        preferred_time: "",
        notes: "",
      });

      onOpenChange(false);
      alert(
        "Site viewing scheduled successfully! We'll contact you soon to confirm.",
      );
    }
  };

  return (
    <Modal
      backdrop="blur"
      isOpen={isOpen}
      size="2xl"
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <IconCalendar className="w-5 h-5 text-primary" />
                Schedule Site Viewing
              </div>
              {propertyTitle && (
                <p className="text-sm text-gray-600">
                  Property: {propertyTitle}
                </p>
              )}
            </ModalHeader>
            <ModalBody>
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                  {error}
                </div>
              )}

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
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

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    required
                    required
                    label="Preferred Date"
                    type="date"
                    value={formData.preferred_date}
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

                <Textarea
                  label="Additional Notes (Optional)"
                  minRows={3}
                  placeholder="Any specific requirements or questions?"
                  value={formData.notes}
                  onChange={(e) => handleInputChange("notes", e.target.value)}
                />

                {isGuest && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-blue-800 text-sm">
                      <strong>Note:</strong> As a guest visitor, we'll contact
                      you via email or phone to confirm your viewing
                      appointment.
                    </p>
                  </div>
                )}
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
                  !formData.preferred_time
                }
                isLoading={loading}
                onPress={handleSubmit}
              >
                {loading ? "Scheduling..." : "Schedule Viewing"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
