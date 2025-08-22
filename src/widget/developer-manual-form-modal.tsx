import { useState } from "react";
import {
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Button,
  Textarea,
  Select,
  SelectItem,
  Alert,
} from "@heroui/react";
import {
  IconBuilding,
  IconMapPin,
  IconCurrencyPeso,
} from "@tabler/icons-react";

import { useProperties } from "../hooks";

export const ManualAddModal = ({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const { createProperty, loading, error } = useProperties();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    address: "",
    city: "",
    province: "",
    price: "",
    property_type: "house",
    bedrooms: "",
    bathrooms: "",
    area: "",
    parking_slots: "",
    amenities: "",
  });

  const propertyTypes = [
    { key: "house", label: "House" },
    { key: "condo", label: "Condominium" },
    { key: "townhouse", label: "Townhouse" },
    { key: "lot", label: "Lot" },
    { key: "commercial", label: "Commercial" },
  ];

  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const propertyData = {
      name: formData.name,
      description: formData.description,
      address: formData.address,
      city: formData.city,
      province: formData.province,
      price: parseFloat(formData.price),
      property_type: formData.property_type,
      bedrooms: formData.bedrooms ? parseInt(formData.bedrooms) : 0,
      bathrooms: formData.bathrooms ? parseInt(formData.bathrooms) : 0,
      area: formData.area ? parseFloat(formData.area) : 0,
      parking_slots: formData.parking_slots
        ? parseInt(formData.parking_slots)
        : 0,
      amenities: formData.amenities
        ? formData.amenities.split(",").map((a) => a.trim())
        : [],
    };

    const success = await createProperty(propertyData);

    if (success) {
      // Reset form
      setFormData({
        name: "",
        description: "",
        address: "",
        city: "",
        province: "",
        price: "",
        property_type: "house",
        bedrooms: "",
        bathrooms: "",
        area: "",
        parking_slots: "",
        amenities: "",
      });
      onOpenChange(false);
    }
  };

  return (
    <Modal
      backdrop="blur"
      isDismissable={false}
      isOpen={isOpen}
      scrollBehavior="inside"
      size="4xl"
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>Add Property/Project</ModalHeader>
            <form onSubmit={handleSubmit}>
              <ModalBody>
                {error && (
                  <Alert color="danger" title={error} variant="solid" />
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    isRequired
                    label="Project/Property Name"
                    placeholder="Enter project name"
                    startContent={<IconBuilding />}
                    value={formData.name}
                    variant="flat"
                    onChange={(e) => handleInputChange("name", e.target.value)}
                  />

                  <Select
                    isRequired
                    label="Property Type"
                    placeholder="Select property type"
                    selectedKeys={[formData.property_type]}
                    variant="flat"
                    onSelectionChange={(keys) =>
                      handleInputChange(
                        "property_type",
                        Array.from(keys)[0] as string
                      )
                    }
                  >
                    {propertyTypes.map((type) => (
                      <SelectItem key={type.key}>{type.label}</SelectItem>
                    ))}
                  </Select>

                  <Input
                    isRequired
                    label="Address"
                    placeholder="Enter full address"
                    startContent={<IconMapPin />}
                    value={formData.address}
                    variant="flat"
                    onChange={(e) =>
                      handleInputChange("address", e.target.value)
                    }
                  />

                  <Input
                    isRequired
                    label="City"
                    placeholder="Enter city"
                    value={formData.city}
                    variant="flat"
                    onChange={(e) => handleInputChange("city", e.target.value)}
                  />

                  <Input
                    isRequired
                    label="Province"
                    placeholder="Enter province"
                    value={formData.province}
                    variant="flat"
                    onChange={(e) =>
                      handleInputChange("province", e.target.value)
                    }
                  />

                  <Input
                    isRequired
                    label="Price (PHP)"
                    placeholder="Enter price"
                    startContent={<IconCurrencyPeso />}
                    type="number"
                    value={formData.price}
                    variant="flat"
                    onChange={(e) => handleInputChange("price", e.target.value)}
                  />

                  <Input
                    label="Bedrooms"
                    placeholder="Number of bedrooms"
                    type="number"
                    value={formData.bedrooms}
                    variant="flat"
                    onChange={(e) =>
                      handleInputChange("bedrooms", e.target.value)
                    }
                  />

                  <Input
                    label="Bathrooms"
                    placeholder="Number of bathrooms"
                    type="number"
                    value={formData.bathrooms}
                    variant="flat"
                    onChange={(e) =>
                      handleInputChange("bathrooms", e.target.value)
                    }
                  />

                  <Input
                    label="Area (sqm)"
                    placeholder="Total area in square meters"
                    type="number"
                    value={formData.area}
                    variant="flat"
                    onChange={(e) => handleInputChange("area", e.target.value)}
                  />

                  <Input
                    label="Parking Slots (optional)"
                    placeholder="Number of parking slots"
                    type="number"
                    value={formData.parking_slots}
                    variant="flat"
                    onChange={(e) =>
                      handleInputChange("parking_slots", e.target.value)
                    }
                  />
                </div>

                <Textarea
                  label="Description"
                  placeholder="Enter property description"
                  value={formData.description}
                  variant="flat"
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                />

                <Textarea
                  label="Amenities (optional)"
                  placeholder="Enter amenities separated by commas (e.g., Swimming pool, Gym, Garden)"
                  value={formData.amenities}
                  variant="flat"
                  onChange={(e) =>
                    handleInputChange("amenities", e.target.value)
                  }
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  color="primary"
                  disabled={loading}
                  isLoading={loading}
                  type="submit"
                >
                  {loading ? "Adding..." : "Add Property"}
                </Button>
              </ModalFooter>
            </form>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
