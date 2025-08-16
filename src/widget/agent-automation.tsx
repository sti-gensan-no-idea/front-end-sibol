import { useState, useEffect } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DroppableProps,
} from "react-beautiful-dnd";
import { Button, Chip } from "@heroui/react";
import { IconGripVertical, IconPlus, IconRobotFace } from "@tabler/icons-react";

import { initialLeads } from "@/data/crm-leads";
import { initialColumns } from "@/data/crm-columns";

const StrictModeDroppable = ({ children, ...props }: DroppableProps) => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));

    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);

  if (!enabled) {
    return null;
  }

  return <Droppable {...props}>{children}</Droppable>;
};

export const AgentAutomation = () => {
  const [leads, setLeads] = useState(initialLeads);
  const [columns, setColumns] = useState(initialColumns);

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!leads[draggableId]) {
      return;
    }

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const startColumn = columns[source.droppableId];
    const finishColumn = columns[destination.droppableId];

    if (!startColumn || !finishColumn) {
      return;
    }

    if (startColumn === finishColumn) {
      const newLeadIds = Array.from(startColumn.leadIds);

      newLeadIds.splice(source.index, 1);
      newLeadIds.splice(destination.index, 0, draggableId);

      const newColumn = { ...startColumn, leadIds: newLeadIds };

      setColumns((prev) => {
        const newColumns = { ...prev, [newColumn.id]: newColumn };

        return newColumns;
      });

      return;
    }

    // Moving to different column
    const startLeadIds = Array.from(startColumn.leadIds);

    startLeadIds.splice(source.index, 1);
    const newStart = { ...startColumn, leadIds: startLeadIds };

    const finishLeadIds = Array.from(finishColumn.leadIds);

    finishLeadIds.splice(destination.index, 0, draggableId);
    const newFinish = { ...finishColumn, leadIds: finishLeadIds };

    setColumns((prev) => {
      const newColumns = {
        ...prev,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      };

      return newColumns;
    });
  };

  const getTagColor = (tag: string) => {
    switch (tag) {
      case "hot":
        return "danger";
      case "warm":
        return "warning";
      case "cold":
        return "primary";
      default:
        return "primary";
    }
  };

  return (
    <div className="flex flex-col p-4 sm:p-6 md:p-8 rounded-large shadow-medium bg-white over">
      <div className="mb-4 flex items-center md:items-start justify-between">
        <div className="flex items-center">
          <IconRobotFace className="text-gray-500" size={26} />
          <span className="text-lg font-bold ml-2 text-foreground-700">
            Automation
          </span>
        </div>
        <Button color="primary" startContent={<IconPlus />} variant="flat">
          Add Lead
        </Button>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-5 gap-4">
          {Object.values(columns).map((column) => (
            <StrictModeDroppable key={column.id} droppableId={column.id}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`bg-gray-100 rounded-lg p-4 min-h-[300px] flex-shrink-0 ${
                    snapshot.isDraggingOver ? "bg-gray-200" : ""
                  }`}
                  style={{ position: "relative" }}
                >
                  <h2 className="font-semibold mb-4 text-foreground-700">
                    {column.title}
                  </h2>
                  {column.leadIds
                    .filter((leadId) => leads[leadId])
                    .map((leadId, index) => {
                      const lead = leads[leadId];

                      return (
                        <Draggable
                          key={lead.id}
                          draggableId={lead.id}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`bg-white p-3 flex items-center select-none rounded-small shadow-small mb-2 cursor-grab relative ${
                                snapshot.isDragging
                                  ? "bg-green-50 shadow-lg"
                                  : ""
                              }`}
                              style={{
                                position: "relative",
                                ...provided.draggableProps.style,
                              }}
                            >
                              <IconGripVertical
                                className="mr-2 text-gray-400 w-fit"
                                size={18}
                              />
                              <div className="flex flex-col w-full">
                                <span className="flex mr-10 font-medium bg text-ellipsis whitespace-nowrap overflow-x-hidden">
                                  {lead.name}
                                </span>
                                <span className="flex w-full text-sm text-gray-500 overflow-x-hidden">
                                  {lead.email}
                                </span>
                              </div>
                              <div className="mt-1">
                                <Chip
                                  className="absolute top-2 right-2"
                                  color={getTagColor(lead.tag)}
                                  size="sm"
                                  variant="flat"
                                >
                                  {lead.tag}
                                </Chip>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      );
                    })}
                  {provided.placeholder}
                </div>
              )}
            </StrictModeDroppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};
