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
import { 
  IconTool, 
  IconPlus, 
  IconAlertTriangle, 
  IconClock,
  IconUser,
  IconBuilding,
  IconCheck,
  IconX,
} from "@tabler/icons-react";
import { useMaintenance, type MaintenancePriority, type MaintenanceStatus } from "../hooks";

interface MaintenanceTrackerProps {
  className?: string;
}

export const MaintenanceTracker = ({ className }: MaintenanceTrackerProps) => {
  const { 
    maintenanceRequests, 
    createMaintenanceRequest, 
    updateStatus, 
    getRequestsByStatus, 
    getUrgentRequests,
    loading, 
    error 
  } = useMaintenance();
  
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    property_id: "",
    title: "",
    description: "",
    priority: "medium" as MaintenancePriority,
  });

  const priorities: { key: MaintenancePriority; label: string; color: any }[] = [
    { key: 'low', label: 'Low', color: 'default' },
    { key: 'medium', label: 'Medium', color: 'primary' },
    { key: 'high', label: 'High', color: 'warning' },
    { key: 'urgent', label: 'Urgent', color: 'danger' },
  ];

  const statuses: { key: MaintenanceStatus; label: string; color: any }[] = [
    { key: 'open', label: 'Open', color: 'warning' },
    { key: 'in_progress', label: 'In Progress', color: 'primary' },
    { key: 'completed', label: 'Completed', color: 'success' },
    { key: 'cancelled', label: 'Cancelled', color: 'danger' },
  ];

  const urgentRequests = getUrgentRequests();
  const openRequests = getRequestsByStatus('open');
  const inProgressRequests = getRequestsByStatus('in_progress');

  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreateRequest = async () => {
    if (!formData.property_id || !formData.title || !formData.description) {
      return;
    }

    const requestData = {
      property_id: formData.property_id,
      title: formData.title,
      description: formData.description,
      priority: formData.priority,
    };

    const success = await createMaintenanceRequest(requestData);
    
    if (success) {
      // Reset form
      setFormData({
        property_id: "",
        title: "",
        description: "",
        priority: "medium",
      });
      
      setIsCreateModalOpen(false);
    }
  };

  const getPriorityColor = (priority: MaintenancePriority) => {
    const priorityObj = priorities.find(p => p.key === priority);
    return priorityObj?.color || 'default';
  };

  const getStatusColor = (status: MaintenanceStatus) => {
    const statusObj = statuses.find(s => s.key === status);
    return statusObj?.color || 'default';
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  if (loading && maintenanceRequests.length === 0) {
    return (
      <div className={`flex items-center justify-center h-64 ${className}`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading maintenance requests...</p>
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
              <IconTool className="w-6 h-6 text-primary" />
              <div>
                <h3 className="text-lg font-semibold">Maintenance Tracker</h3>
                <p className="text-sm text-gray-600">Manage property maintenance requests</p>
              </div>
            </div>
            <Button
              color="primary"
              startContent={<IconPlus />}
              onPress={() => setIsCreateModalOpen(true)}
            >
              New Request
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardBody className="text-center">
            <div className="text-2xl font-bold text-orange-600">{openRequests.length}</div>
            <div className="text-sm text-gray-600">Open Requests</div>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="text-center">
            <div className="text-2xl font-bold text-blue-600">{inProgressRequests.length}</div>
            <div className="text-sm text-gray-600">In Progress</div>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="text-center">
            <div className="text-2xl font-bold text-red-600">{urgentRequests.length}</div>
            <div className="text-sm text-gray-600">Urgent</div>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="text-center">
            <div className="text-2xl font-bold text-gray-600">{maintenanceRequests.length}</div>
            <div className="text-sm text-gray-600">Total Requests</div>
          </CardBody>
        </Card>
      </div>

      {/* Urgent Requests Alert */}
      {urgentRequests.length > 0 && (
        <Card className="mb-6 border-red-200 bg-red-50">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2 text-red-800">
              <IconAlertTriangle className="w-5 h-5" />
              <h4 className="font-semibold">Urgent Requests Need Attention</h4>
            </div>
          </CardHeader>
          <CardBody className="pt-0 space-y-3">
            {urgentRequests.slice(0, 3).map((request) => (
              <div key={request.id} className="flex items-center justify-between p-3 bg-white rounded-lg border">
                <div>
                  <h5 className="font-medium">{request.title}</h5>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                    <IconBuilding className="w-4 h-4" />
                    <span>Property: {request.property_id}</span>
                    <span>•</span>
                    <span>{formatDate(request.created_at)}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Chip size="sm" color="danger" variant="flat">
                    {request.priority}
                  </Chip>
                  <Button
                    size="sm"
                    color="primary"
                    onPress={() => updateStatus(request.id, 'in_progress')}
                  >
                    Start Work
                  </Button>
                </div>
              </div>
            ))}
          </CardBody>
        </Card>
      )}

      {/* All Requests */}
      <Card>
        <CardHeader>
          <h4 className="font-semibold">All Maintenance Requests</h4>
        </CardHeader>
        <CardBody className="space-y-4">
          {maintenanceRequests.length > 0 ? (
            maintenanceRequests.map((request) => (
              <div key={request.id} className="flex items-start justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h5 className="font-medium">{request.title}</h5>
                      <p className="text-sm text-gray-600 mt-1">{request.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Chip size="sm" color={getPriorityColor(request.priority)} variant="flat">
                        {request.priority}
                      </Chip>
                      <Chip size="sm" color={getStatusColor(request.status)} variant="flat">
                        {request.status.replace('_', ' ')}
                      </Chip>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <IconBuilding className="w-4 h-4" />
                      <span>Property: {request.property_id}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <IconClock className="w-4 h-4" />
                      <span>Created: {formatDate(request.created_at)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 ml-4">
                  {request.status === 'open' && (
                    <Button
                      size="sm"
                      color="primary"
                      variant="light"
                      onPress={() => updateStatus(request.id, 'in_progress')}
                    >
                      Start
                    </Button>
                  )}
                  {request.status === 'in_progress' && (
                    <Button
                      size="sm"
                      color="success"
                      variant="light"
                      startContent={<IconCheck />}
                      onPress={() => updateStatus(request.id, 'completed')}
                    >
                      Complete
                    </Button>
                  )}
                  <Button
                    size="sm"
                    color="danger"
                    variant="light"
                    startContent={<IconX />}
                    onPress={() => updateStatus(request.id, 'cancelled')}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              <IconTool className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>No maintenance requests</p>
              <p className="text-sm">Create your first request to get started</p>
            </div>
          )}
        </CardBody>
      </Card>

      {/* Create Request Modal */}
      <Modal isOpen={isCreateModalOpen} onOpenChange={setIsCreateModalOpen} size="2xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Create Maintenance Request</ModalHeader>
              <ModalBody>
                <div className="space-y-4">
                  <Input
                    label="Property ID"
                    placeholder="Enter property ID"
                    value={formData.property_id}
                    onChange={(e) => handleInputChange("property_id", e.target.value)}
                    required
                  />

                  <Input
                    label="Request Title"
                    placeholder="Brief description of the issue"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    required
                  />

                  <Select
                    label="Priority"
                    placeholder="Select priority level"
                    selectedKeys={formData.priority ? [formData.priority] : []}
                    onSelectionChange={(keys) => {
                      const value = Array.from(keys)[0] as MaintenancePriority;
                      handleInputChange("priority", value || "medium");
                    }}
                  >
                    {priorities.map((priority) => (
                      <SelectItem key={priority.key} value={priority.key}>
                        {priority.label}
                      </SelectItem>
                    ))}
                  </Select>

                  <Textarea
                    label="Description"
                    placeholder="Detailed description of the maintenance issue..."
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    minRows={4}
                    required
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  color="primary"
                  onPress={handleCreateRequest}
                  isLoading={loading}
                  disabled={loading || !formData.property_id || !formData.title || !formData.description}
                >
                  {loading ? "Creating..." : "Create Request"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};
