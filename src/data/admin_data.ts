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

export const users: User[] = [
  { id: 1, name: "Alice", email: "alice@mail.com", role: "client" },
  {
    id: 2,
    name: "Bob",
    email: "bob@mail.com",
    role: "agent",
    status: "unverified",
  },
  { id: 3, name: "Charlie", email: "charlie@mail.com", role: "developer" },
  {
    id: 4,
    name: "Dana",
    email: "dana@mail.com",
    role: "agent",
    status: "verified",
  },
  {
    id: 5,
    name: "Eve",
    email: "eve@mail.com",
    role: "agent",
    status: "rejected",
  },
  {
    id: 6,
    name: "Frank",
    email: "frank@mail.com",
    role: "agent",
    status: "banned",
  },
  {
    id: 7,
    name: "Grace",
    email: "grace@mail.com",
    role: "agent",
    status: "reported",
  },
  { id: 8, name: "Hank", email: "hank@mail.com", role: "client" },
  {
    id: 9,
    name: "Ivy",
    email: "ivy@mail.com",
    role: "agent",
    status: "unverified",
  },
  {
    id: 10,
    name: "Jake",
    email: "jake@mail.com",
    role: "agent",
    status: "verified",
  },
  { id: 11, name: "Luna", email: "luna@mail.com", role: "developer" },
  {
    id: 12,
    name: "Max",
    email: "max@mail.com",
    role: "agent",
    status: "reported",
  },
  { id: 13, name: "Nina", email: "nina@mail.com", role: "client" },
  {
    id: 14,
    name: "Oscar",
    email: "oscar@mail.com",
    role: "agent",
    status: "unverified",
  },
];
