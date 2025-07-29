import React, { useState } from 'react';
import { Card, CardBody, CardHeader, Button, Chip } from '@heroui/react';
import { DragDropContext, Droppable, Draggable, DropResult, DroppableProvided, DraggableProvided } from '@hello-pangea/dnd';
import { IconPlus, IconChartBar } from '@tabler/icons-react';

interface Lead {
  id: string;
  name: string;
  email: string;
  status: string;
  subStatus?: 'Closed Won' | 'Closed Lost' | 'Closed Abandoned';
}

const initialLeads: Lead[] = [
  { id: '1', name: 'Juan Dela Cruz', email: 'juan@example.com', status: 'Prospecting' },
  { id: '2', name: 'Maria Santos', email: 'maria@example.com', status: 'Contacted' },
  { id: '3', name: 'Pedro Reyes', email: 'pedro@example.com', status: 'Scheduled Viewing' },
  { id: '4', name: 'Ana Gomez', email: 'ana@example.com', status: 'Qualified' },
  { id: '5', name: 'Luis Torres', email: 'luis@example.com', status: 'Negotiation Started' },
  { id: '6', name: 'Carmen Lopez', email: 'carmen@example.com', status: 'Sent Contract' },
  { id: '7', name: 'Jose Garcia', email: 'jose@example.com', status: 'Closed' },
];

const AutomationWorkflow: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [closedLeads, setClosedLeads] = useState<Lead[]>([]);

  const stages = [
    'Prospecting',
    'Contacted',
    'Scheduled Viewing',
    'Qualified',
    'Negotiation Started',
    'Sent Contract',
    'Closed',
  ];
  const closedSubStatuses =  ['Closed Won', 'Closed Lost', 'Closed Abandoned'] as const;

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    const sourceIndex = source.index;
    const destIndex = destination.index;
    const sourceDroppableId = source.droppableId;
    const destDroppableId = destination.droppableId;

    if (sourceDroppableId === destDroppableId) {
      if (sourceDroppableId === 'closedOutcomes') {
        const newClosedLeads = Array.from(closedLeads);
        const [movedLead] = newClosedLeads.splice(sourceIndex, 1);
        newClosedLeads.splice(destIndex, 0, movedLead);
        setClosedLeads(newClosedLeads);
      } else {
        const stageLeads = leads.filter(l => l.status === sourceDroppableId);
        const [movedLead] = stageLeads.splice(sourceIndex, 1);
        stageLeads.splice(destIndex, 0, movedLead);
        const updatedLeads = leads.map(l => 
          stageLeads.some(sl => sl.id === l.id) ? { ...l, status: sourceDroppableId } : l
        );
        setLeads(updatedLeads);
      }
    } else {
      if (sourceDroppableId === 'Closed' && destDroppableId === 'closedOutcomes') {
        const [movedLead] = leads
          .filter(l => l.status === 'Closed')
          .splice(sourceIndex, 1);
        movedLead.subStatus = closedSubStatuses[destIndex];
        setClosedLeads(prev => [...prev, movedLead]);
        setLeads(prev => prev.filter(l => l.id !== movedLead.id));
      } else if (destDroppableId === 'Closed') {
        const sourceLeads = sourceDroppableId === 'closedOutcomes' ? closedLeads : leads.filter(l => l.status === sourceDroppableId);
        const [movedLead] = sourceLeads.splice(sourceIndex, 1);
        movedLead.subStatus = undefined;
        setLeads(prev => [...prev, { ...movedLead, status: 'Closed' }]);
        if (sourceDroppableId === 'closedOutcomes') {
          setClosedLeads(prev => prev.filter(l => l.id !== movedLead.id));
        }
      } else {
        const sourceLeads = sourceDroppableId === 'closedOutcomes' ? closedLeads : leads.filter(l => l.status === sourceDroppableId);
        const [movedLead] = sourceLeads.splice(sourceIndex, 1);
        movedLead.status = destDroppableId;
        movedLead.subStatus = undefined;
        setLeads(prev => [...prev.filter(l => l.id !== movedLead.id), movedLead]);
        if (sourceDroppableId === 'closedOutcomes') {
          setClosedLeads(prev => prev.filter(l => l.id !== movedLead.id));
        }
      }
    }
  };

  const addLead = () => {
    const newLead: Lead = {
      id: `lead${Date.now()}`,
      name: 'New Lead',
      email: `lead${Date.now()}@example.com`,
      status: 'Prospecting',
    };
    setLeads(prev => [...prev, newLead]);
  };

  const getStageLeads = (stage: string) => leads.filter(lead => lead.status === stage);

  const closedCounts = closedLeads.reduce((acc, lead) => {
    acc[lead.subStatus || ''] = (acc[lead.subStatus || ''] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const totalClosed = closedLeads.length;
  const closedPercentages = {
    'Closed Won': totalClosed ? (closedCounts['Closed Won'] / totalClosed * 100).toFixed(1) : '0',
    'Closed Lost': totalClosed ? (closedCounts['Closed Lost'] / totalClosed * 100).toFixed(1) : '0',
    'Closed Abandoned': totalClosed ? (closedCounts['Closed Abandoned'] / totalClosed * 100).toFixed(1) : '0',
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <Card className="w-full bg-white shadow-lg rounded-2xl">
        <CardHeader className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-t-2xl">
          <h2 className="text-lg font-bold text-white">Automation Workflow</h2>
          <Button
            color="primary"
            onClick={addLead}
            startContent={<IconPlus className="h-5 w-5" />}
          >
            Add Lead
          </Button>
        </CardHeader>
        <CardBody className="p-0">
          <DragDropContext onDragEnd={onDragEnd}>
            <div className="flex overflow-x-auto space-x-4 p-4">
              {stages.map((stage, index) => (
                <div key={stage} className="w-72 flex-shrink-0">
                  <Droppable droppableId={stage}>
                    {(provided: DroppableProvided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className="bg-white p-4 rounded-lg shadow-md min-h-[200px]"
                      >
                        <h3 className="text-md font-semibold text-gray-700 mb-2">{stage}</h3>
                        {getStageLeads(stage).map((lead, idx) => (
                          <Draggable key={lead.id} draggableId={lead.id} index={idx}>
                            {(provided: DraggableProvided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="bg-gray-100 p-3 mb-2 rounded-md cursor-move hover:bg-gray-200 transition-colors"
                              >
                                <p className="text-sm font-medium">{lead.name}</p>
                                <p className="text-xs text-gray-500">{lead.email}</p>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </div>
              ))}
            </div>
            <div className="p-4">
              <h3 className="text-md font-semibold text-gray-700 mb-2">Closed Outcomes</h3>
              <div className="flex space-x-4">
                <Droppable droppableId="closedOutcomes">
                  {(provided: DroppableProvided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="w-full flex space-x-4"
                    >
                      {closedSubStatuses.map((subStatus, idx) => (
                        <div key={subStatus} className="w-1/3">
                          <h4 className="text-sm font-medium text-gray-600 mb-2">{subStatus}</h4>
                          {closedLeads
                            .filter(lead => lead.subStatus === subStatus)
                            .map((lead, index) => (
                              <Draggable key={lead.id} draggableId={lead.id} index={index}>
                                {(provided: DraggableProvided) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className="bg-gray-100 p-3 mb-2 rounded-md cursor-move hover:bg-gray-200 transition-colors"
                                  >
                                    <p className="text-sm font-medium">{lead.name}</p>
                                    <p className="text-xs text-gray-500">{lead.email}</p>
                                  </div>
                                )}
                              </Draggable>
                            ))}
                        </div>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            </div>
          </DragDropContext>
        </CardBody>
      </Card>
      <Card className="mt-6 bg-white shadow-lg rounded-2xl">
        <CardHeader className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-t-2xl">
          <h2 className="text-lg font-bold text-white">Analytics</h2>
          <IconChartBar className="h-6 w-6 text-white" />
        </CardHeader>
        <CardBody className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-md font-semibold text-gray-700">Closed Won</h3>
            <p className="text-2xl font-bold text-green-600">{closedCounts['Closed Won'] || 0}</p>
            <p className="text-sm text-gray-500">{closedPercentages['Closed Won']}%</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-md font-semibold text-gray-700">Closed Lost</h3>
            <p className="text-2xl font-bold text-red-600">{closedCounts['Closed Lost'] || 0}</p>
            <p className="text-sm text-gray-500">{closedPercentages['Closed Lost']}%</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-md font-semibold text-gray-700">Closed Abandoned</h3>
            <p className="text-2xl font-bold text-yellow-600">{closedCounts['Closed Abandoned'] || 0}</p>
            <p className="text-sm text-gray-500">{closedPercentages['Closed Abandoned']}%</p>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default AutomationWorkflow;