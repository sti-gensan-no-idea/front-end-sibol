import { useSearchParams } from "react-router-dom";
import { useMemo, useEffect, useState } from "react";
import {
  Tabs,
  Tab,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Card,
  CardBody,
  CardHeader,
  Input,
} from "@heroui/react";
import { IconSearch } from "@tabler/icons-react";
import { addToast } from "@heroui/react";

import { users } from "@/data/admin_data";

type UserRole = "client" | "agent" | "developer";
type AgentStatus =
  | "verified"
  | "unverified"
  | "rejected"
  | "banned"
  | "reported";

type User = {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  status?: AgentStatus;
};

const PAGE_SIZE = 5;

const TABS = [
  { key: "all_users", label: "All" },
  { key: "all_agents", label: "Agents" },
  { key: "unverified", label: "Unverified" },
  { key: "rejected", label: "Rejected" },
  { key: "reported", label: "Reported" },
  { key: "banned", label: "Banned" },
];

export const AdminDashboardPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const tab = searchParams.get("tab") || "all_users";
  const page = parseInt(searchParams.get("page") || "1", 10);
  const query = searchParams.get("query") || "";

  const [searchInput, setSearchInput] = useState(query);

  // Sync input box with query param
  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearchParams({ tab, page: "1", query: searchInput });
    }, 300);

    return () => clearTimeout(timeout);
  }, [searchInput]);

  // Reset search on tab change
  const handleTabChange = (key: string) => {
    setSearchParams({ tab: key, page: "1", query: "" });
    setSearchInput("");
  };

  const handlePageChange = (newPage: number) => {
    setSearchParams({ tab, page: String(newPage), query: searchInput });
  };

  const filteredByTab = useMemo(() => {
    switch (tab) {
      case "all_agents":
        return users.filter((u) => u.role === "agent");
      case "unverified":
        return users.filter(
          (u) => u.role === "agent" && u.status === "unverified"
        );
      case "rejected":
        return users.filter(
          (u) => u.role === "agent" && u.status === "rejected"
        );
      case "banned":
        return users.filter((u) => u.role === "agent" && u.status === "banned");
      case "reported":
        return users.filter(
          (u) => u.role === "agent" && u.status === "reported"
        );
      case "all_users":
      default:
        return users;
    }
  }, [tab]);

  const searchedUsers = useMemo(() => {
    return filteredByTab.filter((u) =>
      `${u.name} ${u.email}`.toLowerCase().includes(query.toLowerCase())
    );
  }, [filteredByTab, query]);

  const totalPages = Math.ceil(searchedUsers.length / PAGE_SIZE);
  const paginatedUsers = searchedUsers.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  return (
    <div className="p-6 container min-h-screen mx-auto">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <SummaryCard color="primary" count={users.length} label="Total Users" />
        <SummaryCard
          color="warning"
          count={users.filter((u) => u.role === "agent").length}
          label="Agents"
        />
        <SummaryCard
          color="success"
          count={users.filter((u) => u.role === "client").length}
          label="Clients"
        />
        <SummaryCard
          color="secondary"
          count={users.filter((u) => u.role === "developer").length}
          label="Developers"
        />
      </div>

      <Tabs
        classNames={{ tabList: "mb-4" }}
        color="primary"
        selectedKey={tab}
        size="lg"
        variant="underlined"
        onSelectionChange={(key: any) => handleTabChange(key.toString())}
      >
        {TABS.map((t) => (
          <Tab key={t.key} title={t.label}>
            <Card shadow="sm">
              <CardBody>
                <div className="mb-4">
                  <Input
                    isClearable
                    placeholder="Search by name or email"
                    size="lg"
                    startContent={<IconSearch />}
                    type="text"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    onClear={() => setSearchInput("")}
                  />
                </div>

                <UserTable users={paginatedUsers} />

                {totalPages > 1 && (
                  <div className="flex justify-center mt-4">
                    <Pagination
                      showControls
                      page={page}
                      total={totalPages}
                      onChange={handlePageChange}
                    />
                  </div>
                )}
              </CardBody>
            </Card>
          </Tab>
        ))}
      </Tabs>
    </div>
  );
};

const UserTable = ({ users }: { users: User[] }) => (
  <Table
    isStriped
    removeWrapper
    aria-label="Users Table"
    className="text-sm cursor-pointer"
  >
    <TableHeader>
      <TableColumn>ID</TableColumn>
      <TableColumn>Name</TableColumn>
      <TableColumn>Email</TableColumn>
      <TableColumn>Role</TableColumn>
      <TableColumn>Status</TableColumn>
    </TableHeader>
    <TableBody emptyContent="No users found.">
      {users.map((user) => (
        <TableRow
          key={user.id}
          className="hover:bg-default-100 transition-colors"
          onClick={() =>
            addToast({
              title: `Viewing ${user.name}`,
              description: `Email: ${user.email} | Role: ${user.role}`,
              color: "primary",
            })
          }
        >
          <TableCell>{user.id}</TableCell>
          <TableCell>{user.name}</TableCell>
          <TableCell>{user.email}</TableCell>
          <TableCell className="capitalize">{user.role}</TableCell>
          <TableCell className="capitalize">{user.status ?? "-"}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

const SummaryCard = ({
  label,
  count,
  color = "primary",
}: {
  label: string;
  count: number;
  color?:
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger"
    | "default";
}) => (
  <Card className="w-full" shadow="sm">
    <CardHeader className="flex flex-col items-start pb-0">
      <p className="text-sm font-medium text-default-500">{label}</p>
    </CardHeader>
    <CardBody className="pt-1">
      <p className={`text-3xl font-bold text-${color}`}>{count}</p>
    </CardBody>
  </Card>
);
