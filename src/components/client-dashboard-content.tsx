import { useMemo, useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card, CardBody, CardFooter, Divider } from "@heroui/react";
import { IconView360Number } from "@tabler/icons-react";

import { properties_data } from "@/data/properties_data";

const IMAGE_HEIGHT = "h-[232px]";
const ITEMS_PER_PAGE = 6;

type Event = {
  id: number;
  title: string;
  start: Date;
  end: Date;
};

const hardcodedEvents: Event[] = [
  {
    id: 1,
    title: "Team Meeting",
    start: new Date(2025, 6, 29, 10, 0), // July 29, 2025, 10:00 AM
    end: new Date(2025, 6, 29, 11, 0),
  },
  {
    id: 2,
    title: "Project Deadline",
    start: new Date(2025, 6, 31, 0, 0), // July 31, all day
    end: new Date(2025, 6, 31, 23, 59),
  },
  {
    id: 3,
    title: "Client Presentation",
    start: new Date(2025, 7, 3, 14, 30), // August 3, 2:30 PM
    end: new Date(2025, 7, 3, 15, 30),
  },
];

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const hoursInDay = Array.from({ length: 12 }, (_, i) => i + 8); // 8AM - 8PM

function formatHour(hour: number) {
  const ampm = hour >= 12 ? "PM" : "AM";
  const h = hour > 12 ? hour - 12 : hour;
  return `${h} ${ampm}`;
}

function areDatesEqualDay(d1: Date, d2: Date) {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}

export const ClientDashboardContent = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const tab = searchParams.get("tab") || "dashboard";
  const pageParam = parseInt(searchParams.get("page") || "1", 10);
  const [currentPage, setCurrentPage] = useState(pageParam);

  useEffect(() => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set("page", currentPage.toString());
      return params;
    });
  }, [currentPage, setSearchParams]);

  useEffect(() => {
    setCurrentPage(pageParam);
  }, [pageParam]);

  const totalPages = Math.ceil(properties_data.length / ITEMS_PER_PAGE);

  const paginatedProperties = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return properties_data.slice(start, start + ITEMS_PER_PAGE);
  }, [currentPage]);

  // Calculate start of week (Monday) for the calendar display
  const referenceDate = new Date(2025, 6, 28); // Monday, July 28, 2025
  // (Or you could use today as dynamic date and find Monday of the week)

  // Events filtered by this week
  const eventsThisWeek = hardcodedEvents.filter((event) => {
    return (
      event.start >= referenceDate &&
      event.start < new Date(referenceDate.getTime() + 7 * 24 * 60 * 60 * 1000)
    );
  });

  return (
    <div className="container mx-auto pt-7 pr-8 pb-8 pl-20">
      {tab === "dashboard" && (
        <>
          <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {paginatedProperties.length === 0 ? (
              <p className="text-center text-gray-500 col-span-full">
                No properties found.
              </p>
            ) : (
              paginatedProperties.map((property) => (
                <Card
                  key={property.id}
                  isPressable
                  className="shadow-medium shadow-gray-300"
                  shadow="sm"
                  onPress={() =>
                    navigate(`/properties/preview?id=${property.id}`)
                  }
                >
                  <CardBody className="overflow-visible p-0 relative">
                    <img
                      alt={property.title}
                      className={`w-full object-cover ${IMAGE_HEIGHT}`}
                      src={property.img}
                      width="100%"
                    />
                    <div className="absolute bg-black/50 right-4 bottom-4 p-2 rounded-full">
                      <IconView360Number color="white" size={26} />
                    </div>
                  </CardBody>
                  <CardFooter className="p-6">
                    <div className="flex flex-col w-full">
                      <div className="flex items-center">
                        <span className="flex text-2xl text-primary">
                          {property.price}
                        </span>
                        <span className="text-foreground-500 ml-2">
                          / month
                        </span>
                      </div>
                      <span className="flex text-3xl mt-3 text-foreground-700 font-bold">
                        {property.title}
                      </span>
                      <span className="text-foreground-500 mt-3 flex">
                        {property.address}
                      </span>
                      <Divider className="my-4 w-full" />
                      <span className="flex items-center justify-center text-foreground-500">
                        {property.bed} {property.bed === 1 ? "bed" : "beds"} •{" "}
                        {property.bathroom}{" "}
                        {property.bathroom === 1 ? "bathroom" : "bathrooms"} •{" "}
                        {property.size[0]}x{property.size[1]} meters
                      </span>
                    </div>
                  </CardFooter>
                </Card>
              ))
            )}
          </div>

          <div className="flex justify-center mt-10">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                className={`mx-1 px-3 py-1 rounded transition-colors duration-150 ${
                  currentPage === i + 1
                    ? "bg-primary text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </>
      )}

      {tab === "calendar" && (
        <div className="max-w-full overflow-auto rounded-large shadow-lg bg-white">
          {/* Header row: Days of week */}
          <div className="grid grid-cols-8">
            <div className="p-2 font-semibold bg-gray-50 text-center rounded-tl-lg select-none">
              Time
            </div>
            {daysOfWeek.map((day, idx) => (
              <div
                key={day}
                className="p-2 font-semibold text-center bg-gray-50 select-none"
              >
                {day}
                <br />
                <span className="text-xs text-gray-500">
                  {new Date(
                    referenceDate.getFullYear(),
                    referenceDate.getMonth(),
                    referenceDate.getDate() + idx
                  ).getDate()}
                </span>
              </div>
            ))}
          </div>

          {/* Hours rows */}
          <div>
            {hoursInDay.map((hour) => (
              <div
                key={hour}
                className="grid grid-cols-8 relative"
                style={{ minHeight: 60 }}
              >
                {/* Hour label */}
                <div className="p-1 text-right pr-3 text-xs text-gray-500 select-none">
                  {formatHour(hour)}
                </div>

                {/* Days cells */}
                {daysOfWeek.map((day, dayIdx) => {
                  const cellDate = new Date(
                    referenceDate.getFullYear(),
                    referenceDate.getMonth(),
                    referenceDate.getDate() + dayIdx,
                    hour,
                    0
                  );

                  const eventsHere = eventsThisWeek.filter((event) => {
                    return event.start <= cellDate && event.end > cellDate;
                  });

                  return (
                    <div
                      key={day}
                      className="relative p-1"
                      style={{ minHeight: 60 }}
                    >
                      {eventsHere.length > 0 && (
                        <div
                          className="bg-primary text-white rounded-lg px-2 py-1 text-xs truncate shadow-md hover:shadow-lg transition-shadow cursor-pointer select-none"
                          title={eventsHere[0].title}
                        >
                          {eventsHere[0].title}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
