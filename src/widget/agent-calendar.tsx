import { Chip } from "@heroui/react";

import { agentEvents } from "@/data/agent-events";

const daysInMonth = 31;

const getDayOfWeek = (year: number, month: number, day: number) => {
  return new Date(year, month - 1, day).getDay();
};

export const AgentCalendarEvents = () => {
  const year = 2025;
  const month = 8;
  const firstDayOfWeek = getDayOfWeek(year, month, 1);

  const renderDayCell = (day: number | null, index: number) => {
    if (!day) return <div key={index} className="p-4 rounded-medium" />;
    const dateKey = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    const dayEvents = agentEvents.filter((e) => e.date === dateKey);
    const maxEventsToShow = 3;

    return (
      <div
        key={index}
        className="border border-gray-200 p-4 min-h-[110px] flex flex-col rounded-medium"
      >
        <span className="font-semibold mb-1 text-foreground-700 select-none">
          {day}
        </span>

        <div className="flex-1 overflow-hidden">
          {dayEvents.slice(0, maxEventsToShow).map((event) => (
            <Chip
              key={event.id}
              color="primary"
              size="sm"
              variant="flat"
            >{`${event.title} ${event.time}`}</Chip>
          ))}

          {dayEvents.length > maxEventsToShow && (
            <div className="text-xs text-gray-500 cursor-pointer">
              +{dayEvents.length - maxEventsToShow} more...
            </div>
          )}
        </div>
      </div>
    );
  };

  const cells = [];

  for (let i = 0; i < firstDayOfWeek; i++) {
    cells.push(renderDayCell(null, i));
  }

  for (let day = 1; day <= daysInMonth; day++) {
    cells.push(renderDayCell(day, firstDayOfWeek + day - 1));
  }

  return (
    <div className="px-4 bg-white p-8 rounded-large shadow-medium">
      <h2 className="text-xl font-semibold mb-4 text-center">August 2025</h2>
      <div className="grid grid-cols-7 gap-1 text-center font-semibold text-foreground-500 mb-2 bg-gray-100 mx-4 py-2 rounded-medium">
        <span>Sunday</span>
        <span>Monday</span>
        <span>Tuesday</span>
        <span>Wednesday</span>
        <span>Thursday</span>
        <span>Friday</span>
        <span>Saturday</span>
      </div>
      <div className="grid grid-cols-7 gap-1 px-4">{cells}</div>
    </div>
  );
};
