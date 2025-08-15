import { useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Badge,
  Chip,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Input,
  Select,
  SelectItem,
} from "@heroui/react";
import { 
  IconUser, 
  IconPhone, 
  IconMail, 
  IconArrowRight, 
  IconCheck, 
  IconX, 
  IconCalendar,
  IconBuilding,
} from "@tabler/icons-react";
import { useLeads, type LeadStatus } from "../hooks";

interface LeadsPipelineProps {
  className?: string;
}

export const LeadsPipeline = ({ className }: LeadsPipelineProps) => {
  const { leads, updateLeadStatus, getLeadsByStatus, getLeadStats, loading, error } = useLeads();
  const [selectedLead, setSelectedLead] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const stages: { status: LeadStatus; label: string; color: any }[] = [
    { status: 'new', label: 'New Leads', color: 'default' },
    { status: 'contacted', label: 'Contacted', color: 'primary' },
    { status: 'qualified', label: 'Qualified', color: 'secondary' },
    { status: 'proposal', label: 'Proposal', color: 'warning' },
    { status: 'negotiation', label: 'Negotiation', color: 'danger' },
    { status: 'reserved', label: 'Reserved', color: 'success' },
    { status: 'closed', label: 'Closed', color: 'success' },
    { status: 'lost', label: 'Lost', color: 'danger' },
  ];

  const stats = getLeadStats();

  const handleStatusChange = async (leadId: string, newStatus: LeadStatus) => {
    const success = await updateLeadStatus(leadId, newStatus);
    if (success) {
      setIsModalOpen(false);
    }
  };

  const openLeadModal = (lead: any) => {
    setSelectedLead(lead);
    setIsModalOpen(true);
  };

  if (loading && leads.length === 0) {
    return (
      <div className={`flex items-center justify-center h-64 ${className}`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading leads...</p>
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

      {/* Stats Overview */}
      <Card className="mb-6">
        <CardHeader>
          <h3 className="text-lg font-semibold">Pipeline Overview</h3>
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
              <div className="text-sm text-gray-600">Total Leads</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{stats.byStatus.qualified}</div>
              <div className="text-sm text-gray-600">Qualified</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{stats.byStatus.negotiation}</div>
              <div className="text-sm text-gray-600">In Negotiation</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{stats.byStatus.closed}</div>
              <div className="text-sm text-gray-600">Closed Deals</div>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Pipeline Stages */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stages.slice(0, 4).map((stage) => {
          const stageLeads = getLeadsByStatus(stage.status);
          
          return (
            <Card key={stage.status} className="h-fit">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between w-full">
                  <h4 className="font-semibold">{stage.label}</h4>
                  <Badge content={stageLeads.length} color={stage.color}>
                    <div className="w-6 h-6" />
                  </Badge>
                </div>
              </CardHeader>
              <CardBody className="pt-0 space-y-3">
                {stageLeads.slice(0, 3).map((lead) => (
                  <Card 
                    key={lead.id} 
                    isPressable
                    className="border border-gray-200 hover:border-gray-300 cursor-pointer"
                    onPress={() => openLeadModal(lead)}
                  >
                    <CardBody className="p-3">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <IconUser className="w-4 h-4 text-gray-500" />
                          <span className="font-medium text-sm">{lead.client_name}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-600">
                          <IconBuilding className="w-3 h-3" />
                          <span className="truncate">Property #{lead.property_id}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <IconCalendar className="w-3 h-3" />
                          <span>{new Date(lead.created_at).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                ))}
                {stageLeads.length > 3 && (
                  <div className="text-center text-sm text-gray-500">
                    +{stageLeads.length - 3} more
                  </div>
                )}
                {stageLeads.length === 0 && (
                  <div className="text-center text-sm text-gray-400 py-4">
                    No leads in this stage
                  </div>
                )}
              </CardBody>
            </Card>
          );
        })}
      </div>

      {/* Advanced Stages */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        {stages.slice(4).map((stage) => {
          const stageLeads = getLeadsByStatus(stage.status);
          
          return (
            <Card key={stage.status} className="h-fit">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between w-full">
                  <h4 className="font-semibold">{stage.label}</h4>
                  <Badge content={stageLeads.length} color={stage.color}>
                    <div className="w-6 h-6" />
                  </Badge>
                </div>
              </CardHeader>
              <CardBody className="pt-0">
                {stageLeads.slice(0, 2).map((lead) => (
                  <Card 
                    key={lead.id} 
                    isPressable
                    className="border border-gray-200 hover:border-gray-300 cursor-pointer mb-2"
                    onPress={() => openLeadModal(lead)}
                  >
                    <CardBody className="p-3">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-sm">{lead.client_name}</span>
                        <Chip size="sm" color={stage.color} variant="flat">
                          {stage.status}
                        </Chip>
                      </div>
                    </CardBody>
                  </Card>
                ))}
                {stageLeads.length === 0 && (
                  <div className="text-center text-sm text-gray-400 py-4">
                    No leads
                  </div>
                )}
              </CardBody>
            </Card>
          );
        })}
      </div>

      {/* Lead Detail Modal */}
      <Modal isOpen={isModalOpen} onOpenChange={setIsModalOpen} size="2xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Lead Details</ModalHeader>
              <ModalBody>
                {selectedLead && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700">Client Name</label>
                        <div className="flex items-center gap-2 mt-1">
                          <IconUser className="w-4 h-4 text-gray-500" />
                          <span>{selectedLead.client_name}</span>
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">Current Status</label>
                        <div className="mt-1">
                          <Chip color="primary" variant="flat">
                            {selectedLead.status}
                          </Chip>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700">Email</label>
                        <div className="flex items-center gap-2 mt-1">
                          <IconMail className="w-4 h-4 text-gray-500" />
                          <span>{selectedLead.client_email}</span>
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">Phone</label>
                        <div className="flex items-center gap-2 mt-1">
                          <IconPhone className="w-4 h-4 text-gray-500" />
                          <span>{selectedLead.client_phone}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700">Update Status</label>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {stages.map((stage) => (
                          <Button
                            key={stage.status}
                            size="sm"
                            color={selectedLead.status === stage.status ? stage.color : 'default'}
                            variant={selectedLead.status === stage.status ? 'solid' : 'bordered'}
                            onPress={() => handleStatusChange(selectedLead.id, stage.status)}
                            disabled={loading}
                          >
                            {stage.label}
                          </Button>
                        ))}
                      </div>
                    </div>

                    {selectedLead.notes && (
                      <div>
                        <label className="text-sm font-medium text-gray-700">Notes</label>
                        <div className="mt-1 p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm">{selectedLead.notes}</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};
