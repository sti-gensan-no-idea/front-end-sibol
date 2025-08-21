import { useState } from "react";
import { Button, Tooltip } from "@heroui/react";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

import { agentEvents } from "@/data/agent-events";
import { monthNames } from "@/data/months";
import { daysInWeek } from "@/data/days-in-week";

const getDaysInMonth = (year: number, month: number) => {
  return new Date(year, month, 0).getDate();
};

const getDayOfWeek = (year: number, month: number, day: number) => {
  return new Date(year, month - 1, day).getDay();
};

export const CalendarEvents = () => {
  const [year, setYear] = useState(2025);
  const [month, setMonth] = useState(8);

  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1;
  const currentDay = today.getDate();

  const daysInMonth = getDaysInMonth(year, month);
  const firstDayOfWeek = getDayOfWeek(year, month, 1);

  const goToPrevMonth = () => {
    if (month === 1) {
      setMonth(12);
      setYear((y) => y - 1);
    } else {
      setMonth((m) => m - 1);
    }
  };

  const goToNextMonth = () => {
    if (month === 12) {
      setMonth(1);
      setYear((y) => y + 1);
    } else {
      setMonth((m) => m + 1);
    }
  };

  const renderDayCell = (day: number | null, index: number) => {
    if (!day) return <li key={index} className="p-4 rounded-medium" />;

    const dateKey = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    const dayEvents = agentEvents.filter((e) => e.date === dateKey);
    const maxEventsToShow = 3;

    const isToday =
      day === currentDay && month === currentMonth && year === currentYear;

    return (
      <li
        key={index}
        className="border border-gray-400 p-4 min-h-[110px] flex flex-col rounded-medium"
      >
        <span
          className={`font-semibold mb-1 select-none w-8 h-8 flex items-center justify-center rounded-full ${
            isToday ? "bg-primary text-white" : "text-foreground-700"
          }`}
        >
          {day}
        </span>

        <div className="flex-1 overflow-hidden">
          {dayEvents.slice(0, maxEventsToShow).map((event) => (
            <Button
              key={event.id}
              className="mb-1"
              color="primary"
              radius="full"
              size="sm"
              variant="flat"
            >
              {`${event.title} ${event.time}`}
            </Button>
          ))}

          {dayEvents.length > maxEventsToShow && (
            <div className="text-xs text-gray-500 cursor-pointer">
              +{dayEvents.length - maxEventsToShow} more...
            </div>
          )}
        </div>
      </li>
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
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-4 mb-4 gap-2">
        <h2 className="text-lg sm:text-xl font-semibold text-center text-foreground-700">
          {monthNames[month - 1]} {year}
        </h2>
        <div className="flex items-center justify-center gap-2 sm:gap-4">
          <Tooltip color="primary" content="Previous Month" placement="top">
            <Button
              isIconOnly
              radius="full"
              variant="light"
              onPress={goToPrevMonth}
            >
              <IconChevronLeft />
            </Button>
          </Tooltip>
          <Tooltip color="primary" content="Next Month" placement="top">
            <Button
              isIconOnly
              radius="full"
              variant="light"
              onPress={goToNextMonth}
            >
              <IconChevronRight />
            </Button>
          </Tooltip>
        </div>
      </div>

      {/* Weekday headers */}
      <ul className="grid grid-cols-3 xs:grid-cols-4 sm:grid-cols-7 gap-1 text-center text-xs sm:text-sm font-semibold text-foreground-500 mb-2 bg-gray-100 mx-2 sm:mx-4 py-2 rounded-medium">
        {daysInWeek.map((day) => (
          <li key={day}>{day}</li>
        ))}
      </ul>

      {/* Days */}
      <ul className="grid grid-cols-3 xs:grid-cols-4 sm:grid-cols-7 gap-1 px-2 sm:px-4 text-xs sm:text-sm">
        {cells}
      </ul>
    </div>
  );
};
