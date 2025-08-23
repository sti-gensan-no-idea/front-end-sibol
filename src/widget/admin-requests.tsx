import { useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  addToast,
  Avatar,
  Button,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import {
  IconAdjustmentsHorizontal,
  IconSearch,
  IconThumbDown,
  IconThumbUp,
} from "@tabler/icons-react";

import { adminRequests } from "@/data/admin-requests";

const ITEMS_PER_PAGE = 15;

export const AdminRequests = () => {
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

  const paginatedRequests = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;

    return adminRequests.slice(start, start + ITEMS_PER_PAGE);
  }, [page]);

  const totalPages = Math.ceil(adminRequests.length / ITEMS_PER_PAGE);

  return (
    <div className="p-4 sm:p-6 md:p-8 rounded-large shadow-medium bg-white">
      {/* Header */}
      <div className="flex items-center md:items-start justify-between">
        <div className="flex items-center">
          <IconThumbUp className="text-gray-500" size={26} />
          <span className="text-lg font-bold ml-2 text-foreground-700">
            User Approvals
          </span>
        </div>
      </div>

      {/* Search bar */}
      <SearchBar />

      {/* Users Requests */}
      <Table
        removeWrapper
        aria-label="Example static collection table"
        className="mt-4"
      >
        <TableHeader>
          <TableColumn>NAME</TableColumn>
          <TableColumn>ROLE</TableColumn>
          <TableColumn>DATE</TableColumn>
          <TableColumn align="end">ACTION</TableColumn>
        </TableHeader>
        <TableBody>
          {paginatedRequests.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="flex items-center">
                <Avatar size="sm" src={item.avatar} />
                <div className="flex flex-col">
                  <span className="ml-4 text-foreground-700 font-semibold">
                    {item.name}
                  </span>
                  <span className="ml-4 text-foreground-500 text-small">
                    {item.email}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <Chip color="primary" size="sm" variant="flat">
                  {item.role}
                </Chip>
              </TableCell>
              <TableCell>{item.date}</TableCell>
              <TableCell className="flex gap-2 justify-end">
                <Button
                  color="danger"
                  size="sm"
                  variant="light"
                  onPress={() => {
                    addToast({
                      title: "Rejected",
                      description: `${item.name} request rejected.`,
                      variant: "solid",
                      color: "danger",
                    });
                  }}
                >
                  <IconThumbDown />
                  Reject
                </Button>
                <Button
                  color="primary"
                  size="sm"
                  startContent={<IconThumbUp />}
                  variant="flat"
                  onPress={() => {
                    addToast({
                      title: "Accepted",
                      description: `${item.name} request accepted.`,
                      variant: "solid",
                      color: "primary",
                    });
                  }}
                >
                  Accept
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

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

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="w-full mt-4">
      <form className="flex items-center w-full" onSubmit={handleSearch}>
        <Input
          className="flex-1"
          endContent={
            <Dropdown>
              <DropdownTrigger>
                <Button
                  isIconOnly
                  className="ml-2"
                  radius="full"
                  variant="light"
                >
                  <IconAdjustmentsHorizontal />
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Filter Options">
                <DropdownItem key="name">Name</DropdownItem>
                <DropdownItem key="location">Location</DropdownItem>
                <DropdownItem key="date">Date</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          }
          placeholder="Search properties..."
          size="lg"
          startContent={<IconSearch />}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>
    </div>
  );
};
