type UserRole = "client" | "agent" | "developer";
type AgentStatus =
  | "verified"
  | "unverified"
  | "rejected"
  | "banned"
  | "reported";

type User = {
  id: string; // UUIDv4
  name: string; // full name
  email: string;
  role: UserRole;
  status?: AgentStatus;
};

export const users: User[] = [
  {
    id: "b9a1d1dc-1e3c-4b45-9e1b-efb9fd084a9c",
    name: "Alice Anderson",
    email: "alice@mail.com",
    role: "client",
  },
  {
    id: "d230cc1b-e8a0-4f11-bf0a-09cc1bde8f6f",
    name: "Bob Brown",
    email: "bob@mail.com",
    role: "agent",
    status: "unverified",
  },
  {
    id: "ecedfd5c-0ff9-4fc5-bc34-1760ebf3a95d",
    name: "Charlie Campbell",
    email: "charlie@mail.com",
    role: "developer",
  },
  {
    id: "a31f3949-d7f2-4b64-86b4-8d9c2673e9dc",
    name: "Dana Dawson",
    email: "dana@mail.com",
    role: "agent",
    status: "verified",
  },
  {
    id: "54b6c4d7-f6f5-4472-93c7-4a697f7a24fd",
    name: "Eve Evans",
    email: "eve@mail.com",
    role: "agent",
    status: "rejected",
  },
  {
    id: "f2c6cf6f-e103-4fa7-8a1e-21f3ec3c6221",
    name: "Frank Foster",
    email: "frank@mail.com",
    role: "agent",
    status: "banned",
  },
  {
    id: "27c168a3-2cb2-41c9-a803-95e7e8b50233",
    name: "Grace Green",
    email: "grace@mail.com",
    role: "agent",
    status: "reported",
  },
  {
    id: "f6e95b8d-01ff-4cc2-81e0-801b72d935fd",
    name: "Hank Hughes",
    email: "hank@mail.com",
    role: "client",
  },
  {
    id: "81f10b52-d2e5-45df-bab1-e59c6fd7607b",
    name: "Ivy Irwin",
    email: "ivy@mail.com",
    role: "agent",
    status: "unverified",
  },
  {
    id: "c44b72d3-cb9e-4f8d-97fa-bfb4d818d776",
    name: "Jake Johnson",
    email: "jake@mail.com",
    role: "agent",
    status: "verified",
  },
  {
    id: "27cda929-9f61-4c76-a448-d0db438b0e63",
    name: "Luna Lewis",
    email: "luna@mail.com",
    role: "developer",
  },
  {
    id: "92a6e8a3-ecbd-464d-b508-4dcfe4995974",
    name: "Max Martin",
    email: "max@mail.com",
    role: "agent",
    status: "reported",
  },
  {
    id: "f94ae5b7-47a4-41a0-b2f4-0d0aa90fcbf0",
    name: "Nina Nelson",
    email: "nina@mail.com",
    role: "client",
  },
  {
    id: "e6f871e1-10cc-4694-95e3-1aa27f3a82dc",
    name: "Oscar Owens",
    email: "oscar@mail.com",
    role: "agent",
    status: "unverified",
  },
  {
    id: "6b0d3b82-9b23-462e-a7b4-8b0d2e7bb0cc",
    name: "Paul Peterson",
    email: "paul@mail.com",
    role: "agent",
    status: "verified",
  },
  {
    id: "e0656f0d-3c0f-4eae-aaf9-f4719e6fdf67",
    name: "Quinn Qualls",
    email: "quinn@mail.com",
    role: "client",
  },
  {
    id: "bb870657-8d21-4643-91fd-3120605f1b18",
    name: "Rachel Ray",
    email: "rachel@mail.com",
    role: "agent",
    status: "banned",
  },
  {
    id: "0a776acd-4a9f-49f5-b5f2-9f27a5c5e0a3",
    name: "Steve Smith",
    email: "steve@mail.com",
    role: "developer",
  },
  {
    id: "5db5a083-78f5-49a2-b1f3-e04a1e5f86c3",
    name: "Tina Thompson",
    email: "tina@mail.com",
    role: "client",
  },
  {
    id: "a2344dbb-2cd9-42bb-882f-cf4fd81a2b43",
    name: "Uma Underwood",
    email: "uma@mail.com",
    role: "agent",
    status: "rejected",
  },
  {
    id: "1c71a31a-2d3b-4f4e-a1b5-56a2e4ac1f86",
    name: "Victor Vaughn",
    email: "victor@mail.com",
    role: "agent",
    status: "verified",
  },
  {
    id: "1dc69340-92c8-4061-aed7-9e1b3afdf776",
    name: "Wendy West",
    email: "wendy@mail.com",
    role: "client",
  },
  {
    id: "8451f5ab-6a65-4696-a3d0-2ad34e449dc3",
    name: "Xander Xu",
    email: "xander@mail.com",
    role: "agent",
    status: "reported",
  },
  {
    id: "c33cd108-08ff-47a0-b4f1-3a027b3e09ce",
    name: "Yara Young",
    email: "yara@mail.com",
    role: "agent",
    status: "unverified",
  },
  {
    id: "f87ed91f-1e8d-4467-8cf4-f27d1684bd30",
    name: "Zane Zimmerman",
    email: "zane@mail.com",
    role: "developer",
  },
  {
    id: "4f57ef4e-94f0-40cb-9e4c-d45e94a2653b",
    name: "Amy Adams",
    email: "amy@mail.com",
    role: "client",
  },
  {
    id: "9d17204d-8b92-47f0-9a72-5c83219dbf78",
    name: "Brian Blake",
    email: "brian@mail.com",
    role: "agent",
    status: "verified",
  },
  {
    id: "1f8e89fd-0d9e-4877-b15e-38c470f9a7f7",
    name: "Cindy Clark",
    email: "cindy@mail.com",
    role: "agent",
    status: "rejected",
  },
  {
    id: "b41c3062-3f6f-4de8-a14f-6bc4e7de3925",
    name: "Derek Dunn",
    email: "derek@mail.com",
    role: "developer",
  },
  {
    id: "5e010c6d-dc33-4a01-91f2-30957924a26d",
    name: "Ella East",
    email: "ella@mail.com",
    role: "client",
  },
  {
    id: "164c5db3-8812-4484-b658-264c10d20b08",
    name: "Felix Flynn",
    email: "felix@mail.com",
    role: "agent",
    status: "banned",
  },
  {
    id: "e9e4cb8b-67a1-43e4-a1c0-0c8a3f27e972",
    name: "Georgia Gale",
    email: "georgia@mail.com",
    role: "agent",
    status: "reported",
  },
  {
    id: "6471dc77-2ae7-4bcf-8a13-163ff1b1f1b4",
    name: "Harry Holt",
    email: "harry@mail.com",
    role: "developer",
  },
  {
    id: "3d9371bc-e5cf-4e7e-950e-72699bb9c083",
    name: "Iris Ingram",
    email: "iris@mail.com",
    role: "agent",
    status: "unverified",
  },
  {
    id: "d2cecd03-7a6b-4c9b-bd3b-9e0eaad215b3",
    name: "Jackie Jones",
    email: "jackie@mail.com",
    role: "client",
  },
  {
    id: "3b5cb8b9-fd9d-4c2e-92a7-96f6638054ed",
    name: "Kyle King",
    email: "kyle@mail.com",
    role: "agent",
    status: "verified",
  },
  {
    id: "fdd0dc2e-0098-46e3-bf1e-99f5f02711e1",
    name: "Laura Lane",
    email: "laura@mail.com",
    role: "client",
  },
  {
    id: "778d4b30-d8d4-4f3e-95c0-b23b3045c8c5",
    name: "Miles Moore",
    email: "miles@mail.com",
    role: "agent",
    status: "rejected",
  },
  {
    id: "a917ff93-2ecf-4ee7-a7cc-82f3a8434d1f",
    name: "Nora Noble",
    email: "nora@mail.com",
    role: "agent",
    status: "reported",
  },
  {
    id: "0713a9d7-bf3b-4dc7-b7b3-6d4ed9d604d3",
    name: "Oliver Olsen",
    email: "oliver@mail.com",
    role: "developer",
  },
  {
    id: "aa8dd6df-5c39-40a5-942f-28e7e162fdf1",
    name: "Penny Parks",
    email: "penny@mail.com",
    role: "client",
  },
  {
    id: "623f7cdd-5f71-4085-9b67-5ec52883dd64",
    name: "Quentin Quick",
    email: "quentin@mail.com",
    role: "agent",
    status: "banned",
  },
  {
    id: "a9a9eac1-9b5a-4c7d-8490-31a52fcd5829",
    name: "Rita Rhodes",
    email: "rita@mail.com",
    role: "agent",
    status: "unverified",
  },
  {
    id: "b905fc15-8bd5-4209-8e60-bf7f3e501251",
    name: "Sam Simmons",
    email: "sam@mail.com",
    role: "client",
  },
  {
    id: "e8e8775d-06b6-438f-9424-2c43c2b9e52b",
    name: "Terry Tate",
    email: "terry@mail.com",
    role: "agent",
    status: "verified",
  },
  {
    id: "9c88c43d-b45c-4718-8185-1b9292a49c74",
    name: "Ursula Underhill",
    email: "ursula@mail.com",
    role: "developer",
  },
  {
    id: "dfdfb8d2-fca3-409f-9a1f-babbe597f631",
    name: "Violet Vance",
    email: "violet@mail.com",
    role: "agent",
    status: "reported",
  },
];
