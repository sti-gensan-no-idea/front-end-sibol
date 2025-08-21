import { Button, Chip, Divider, Pagination } from "@heroui/react";
import {
  Icon360View,
  IconBookmark,
  IconCalendar,
  IconPhone,
} from "@tabler/icons-react";

import { properties } from "@/data/properties";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const ITEMS_PER_PAGE = 16;

export const ClientBookmark = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const initialPage = parseInt(queryParams.get("page") || "1", 10);
  const [page, setPage] = useState<number>(
    isNaN(initialPage) ? 1 : initialPage
  );

  useEffect(() => {
    setPage(1);
    queryParams.set("page", String(1));
  }, []);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    queryParams.set("page", String(newPage));
    navigate(`${location.pathname}?${queryParams.toString()}`);
  };

  const totalPages = Math.ceil(properties.length / ITEMS_PER_PAGE);
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const currentItems = properties.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <div className="container mx-auto w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {currentItems.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-small overflow-hidden flex flex-col"
          >
            <div className="relative h-48">
              <img
                alt={item.title}
                className="w-full h-full object-cover bg-gray-300"
                src={item.image}
              />
              <div className="absolute bottom-0 right-0 px-3 py-2 bg-black/70 text-white rounded-tl-xl">
                <Icon360View size={20} />
              </div>
            </div>

            <div className="p-4 flex flex-col flex-1">
              <span className="text-lg font-semibold text-gray-800">
                {item.title}
              </span>
              <span className="text-sm text-gray-500">{item.address}</span>

              <div className="flex items-center gap-2 text-sm mt-2">
                <Chip
                  color={item.status === "Available" ? "success" : "danger"}
                  size="sm"
                  variant="flat"
                >
                  {item.status}
                </Chip>
                <span className="text-gray-500">{item.details}</span>
              </div>

              <span className="text-xl font-bold text-primary mt-3">
                {item.price}
              </span>

              {/* Action buttons */}
              <Divider className="mt-4" />
              <div className="flex items-center gap-2 mt-4">
                <Button isIconOnly radius="full" variant="flat">
                  <IconBookmark />
                </Button>
                <div className="grid grid-cols-2 gap-2 w-full">
                  <Button startContent={<IconCalendar />} variant="flat">
                    Schedule
                  </Button>
                  <Button startContent={<IconPhone />} variant="flat">
                    Contact
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <Pagination
          color="primary"
          page={page}
          size="lg"
          total={totalPages}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
};
