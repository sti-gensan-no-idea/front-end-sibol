import { useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Avatar, Button, Pagination } from "@heroui/react";
import { IconBell, IconCheck, IconTrash } from "@tabler/icons-react";

import { notifications } from "@/data/notification";

const ITEMS_PER_PAGE = 15;

export const Notification = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const initialPage = parseInt(queryParams.get("page") || "1", 10);
  const [page, setPage] = useState<number>(
    isNaN(initialPage) ? 1 : initialPage
  );

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    queryParams.set("page", String(newPage));
    navigate(`${location.pathname}?${queryParams.toString()}`);
  };

  const paginatedNotifications = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;

    return notifications.slice(start, start + ITEMS_PER_PAGE);
  }, [page]);

  const totalPages = Math.ceil(notifications.length / ITEMS_PER_PAGE);

  return (
    <div className="p-8 rounded-large shadow-medium bg-white">
      <div className="flex items-start justify-between">
        <div className="flex items-center">
          <IconBell className="text-gray-500" size={26} />
          <span className="text-lg font-bold ml-2 text-foreground-700">
            Notifications
          </span>
        </div>
        <Button color="primary" startContent={<IconCheck />} variant="flat">
          Mark all as read
        </Button>
      </div>

      {/* Notification items */}
      <ul className="mt-4 space-y-2">
        {paginatedNotifications.map((n: any) => (
          <li
            key={n.id}
            className="flex hover:bg-gray-100 rounded-medium p-2 transition gap-8"
          >
            <a className="flex w-full" href="/">
              <Avatar src={n.avatar} />
              <div className="ml-4 flex flex-col">
                <span className="text-foreground-700 font-semibold">
                  {n.title}
                </span>
                <span className="text-foreground-500 text-sm">
                  {n.description}
                </span>
              </div>
            </a>
            <Button isIconOnly radius="full" variant="light">
              <IconTrash />
            </Button>
          </li>
        ))}
      </ul>

      {/* Pagination */}
      <div className="mt-6 flex justify-center">
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
