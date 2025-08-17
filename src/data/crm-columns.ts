type Column = {
  id: string;
  title: string;
  leadIds: string[];
};

export const initialColumns: Record<string, Column> = {
  prospecting: {
    id: "prospecting",
    title: "PROSPECTING",
    leadIds: [
      "1",
      "2",
      "4",
      "5",
      "7",
      "14",
      "16",
      "19",
      "22",
      "25",
      "28",
      "31",
      "34",
      "37",
      "40",
      "43",
      "46",
      "49",
    ],
  },
  contacted: {
    id: "contacted",
    title: "CONTACTED",
    leadIds: [
      "8",
      "11",
      "17",
      "20",
      "23",
      "26",
      "29",
      "32",
      "35",
      "38",
      "41",
      "44",
      "47",
      "50",
    ],
  },
  scheduled_viewing: {
    id: "scheduled_viewing",
    title: "SCHEDULED VIEWING",
    leadIds: ["3", "6", "15", "18", "21", "24", "27", "30", "33", "36"],
  },
  reserved: {
    id: "reserved",
    title: "RESERVED",
    leadIds: ["9", "39", "42", "45", "48"],
  },
  qualified: {
    id: "qualified",
    title: "QUALIFIED",
    leadIds: ["10", "12", "13"],
  },
};
