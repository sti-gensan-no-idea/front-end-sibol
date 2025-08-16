type Column = {
  id: string;
  title: string;
  leadIds: string[];
};

export const initialColumns: Record<string, Column> = {
  prospecting: {
    id: "prospecting",
    title: "PROSPECTING",
    leadIds: ["1", "2", "4", "5", "7"],
  },
  contacted: {
    id: "contacted",
    title: "CONTACTED",
    leadIds: ["8", "11"],
  },
  scheduled_viewing: {
    id: "scheduled_viewing",
    title: "SCHEDULED VIEWING",
    leadIds: ["3", "6", "9"],
  },
  reserved: {
    id: "reserved",
    title: "RESERVED",
    leadIds: [],
  },
  qualified: {
    id: "qualified",
    title: "QUALIFIED",
    leadIds: ["10", "12", "13"],
  },
};
