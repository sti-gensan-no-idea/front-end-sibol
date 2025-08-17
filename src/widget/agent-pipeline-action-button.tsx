import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DroppableProps,
} from "react-beautiful-dnd";



export const ActionButton = ({ action }: ActionButtonProps) => (
  <StrictModeDroppable droppableId={action}>
    {(provided, snapshot) => (
      <div
        ref={provided.innerRef}
        {...provided.droppableProps}
        className={`px-4 h-14 flex items-center justify-center rounded-small border-3 border-dotted border-gray-300 ${
          snapshot.isDraggingOver ? "bg-gray-200" : ""
        }`}
      >
        {action === "won" && <IconChecks className="text-green-500" />}
        {action === "lost" && <IconThumbDown className="text-orange-500" />}
        {action === "delete" && <IconTrash className="text-red-500" />}
        <span className="ml-2 text-foreground-700 font-semibold">
          {action.toUpperCase()}
        </span>
        {provided.placeholder}
      </div>
    )}
  </StrictModeDroppable>
);
