import { useState } from "react";
import {
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Button,
  Select,
  SelectItem,
  Textarea,
} from "@heroui/react";
import { useProperties } from "../hooks";

interface ManualAddModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export const ManualAddModal = ({
  isOpen,
  onOpenChange,
  onSuccess,
}: ManualAddModalProps) => {
  const { createProperty, loading, error } = useProperties();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    property_type: "",
    bedrooms: "",
    bathrooms: "",
    area: "",
  });

  const propertyTypes = [
    { key: "house", label: "House" },
    { key: "condominium", label: "Condominium" },
    { key: "townhouse", label: "Townhouse" },
    { key: "lot", label: "Lot" },
    { key: "commercial", label: "Commercial" },
  ];

  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const propertyData = {
      title: formData.title,
      description: formData.description || undefined,
      price: parseFloat(formData.price),
      location: formData.location,
      property_type: formData.property_type,
      bedrooms: formData.bedrooms ? parseInt(formData.bedrooms) : undefined,
      bathrooms: formData.bathrooms ? parseInt(formData.bathrooms) : undefined,
      area: formData.area ? parseFloat(formData.area) : undefined,
    };

    const success = await createProperty(propertyData);
    
    if (success) {
      // Reset form
      setFormData({
        title: "",
        description: "",
        price: "",
        location: "",
        property_type: "",
        bedrooms: "",
        bathrooms: "",
        area: "",
      });
      
      onOpenChange(false);
      
      if (onSuccess) {
        onSuccess();
      }
    }
  };

  return (
    <Modal
      backdrop="blur"
      isDismissable={false}
      isOpen={isOpen}
      size="3xl"
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>Add Property/Project</ModalHeader>
            <ModalBody>
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Property Title"
                  placeholder="Enter property title"
                  variant="flat"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  required
                />
                <Input
                  label="Location/Address"
                  placeholder="Enter full address"
                  variant="flat"
                  value={formData.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Select
                  label="Property Type"
                  placeholder="Select property type"
                  variant="flat"
                  selectedKeys={formData.property_type ? [formData.property_type] : []}
                  onSelectionChange={(keys) => {
                    const value = Array.from(keys)[0] as string;
                    handleInputChange("property_type", value || "");
                  }}
                >
                  {propertyTypes.map((type) => (
                    <SelectItem key={type.key} value={type.key}>
                      {type.label}
                    </SelectItem>
                  ))}
                </Select>
                <Input
                  label="Price (PHP)"
                  placeholder="Enter price"
                  startContent={
                    <div className="pointer-events-none flex items-center">
                      <span className="text-default-400 text-small">₱</span>
                    </div>
                  }
                  type="number"
                  variant="flat"
                  value={formData.price}
                  onChange={(e) => handleInputChange("price", e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <Input
                  label="Bedrooms"
                  placeholder="Number of bedrooms"
                  type="number"
                  variant="flat"
                  value={formData.bedrooms}
                  onChange={(e) => handleInputChange("bedrooms", e.target.value)}
                />
                <Input
                  label="Bathrooms"
                  placeholder="Number of bathrooms"
                  type="number"
                  variant="flat"
                  value={formData.bathrooms}
                  onChange={(e) => handleInputChange("bathrooms", e.target.value)}
                />
                <Input
                  label="Floor Area (sqm)"
                  placeholder="Area in square meters"
                  type="number"
                  variant="flat"
                  value={formData.area}
                  onChange={(e) => handleInputChange("area", e.target.value)}
                />
              </div>

              <Textarea
                label="Description (Optional)"
                placeholder="Enter property description"
                variant="flat"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                minRows={3}
              />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Cancel
              </Button>
              <Button 
                color="primary" 
                onPress={handleSubmit}
                isLoading={loading}
                disabled={loading || !formData.title || !formData.location || !formData.property_type || !formData.price}
              >
                {loading ? "Adding Property..." : "Add Property"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
