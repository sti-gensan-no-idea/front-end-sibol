import { IconCalendar, IconChecks, IconEye } from "@tabler/icons-react";
import { Button, Pagination } from "@heroui/react";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { siteViewingReq } from "@/data/site-viewing";

const ITEMS_PER_PAGE = 10;

export const SiteViewingRequest = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialPage = Number(searchParams.get("page")) || 1;
  const [page, setPage] = useState(initialPage);

  const totalPages = Math.ceil(siteViewingReq.length / ITEMS_PER_PAGE);

  useEffect(() => {
    setSearchParams({ page: String(page) });
  }, [page, setSearchParams]);

  const paginatedData = siteViewingReq.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  return (
    <div className="rounded-large p-8 bg-white shadow-medium">
      <div className="flex items-start">
        <div className="flex items-center">
          <IconEye className="text-gray-500" size={26} />
          <span className="text-lg font-bold ml-2 text-foreground-700">
            Site Viewing Requests
          </span>
        </div>
        <Button
          className="ml-auto"
          color="primary"
          startContent={<IconCalendar />}
          variant="flat"
        >
          Set Schedule
        </Button>
        <Button
          className="ml-4"
          color="primary"
          startContent={<IconChecks />}
          variant="flat"
        >
          Check Inquiries
        </Button>
      </div>
      <ul className="mt-4">
        {paginatedData.map((req, i) => (
          <li
            key={i}
            className="flex gap-4 hover:bg-gray-100 rounded-large p-2 cursor-pointer"
          >
            <img
              alt={`${req.name} house preview`}
              className="w-20 h-20 object-cover rounded-large"
              src={req.img}
            />
            <div className="flex flex-col">
              <span className="font-semibold text-foreground-700">
                {req.message}
              </span>
              <span className="text-sm text-foreground-500 mt-2">
                {req.date}
              </span>
              <span className="text-sm text-foreground-500">{req.message}</span>
            </div>
          </li>
        ))}
      </ul>

      {/* Pagination controls */}
      <div className="flex justify-center mt-6">
        <Pagination
          color="primary"
          page={page}
          size="sm"
          total={totalPages}
          onChange={setPage}
        />
      </div>
    </div>
  );
};
