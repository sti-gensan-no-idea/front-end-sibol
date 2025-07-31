// Types for the marketing automation system
export interface Property {
  id: string;
  address: string;
  price: number;
  type: "Residential" | "Commercial";
  bedrooms: number;
  bathrooms: number;
  petFriendly: boolean;
  haunted: boolean;
  floodRisk: "Low" | "Medium" | "High";
  status: "Available" | "Pending" | "Sold";
  qualityScore: number;
  image: string;
  sqm: number;
  title: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  budget: number;
  timeline: "1-3 months" | "3-6 months" | "6+ months";
  source:
    | "Website"
    | "Social Media"
    | "Referral"
    | "Email Campaign"
    | "Open House";
  seriousness: number;
  preferences: {
    petFriendly: boolean;
    nonHaunted: boolean;
    floodSafe: boolean;
  };
  status: "New" | "Contacted" | "Qualified" | "Converted";
  lastContact: string;
  assignedAgent?: string;
}

export interface Agent {
  id: string;
  name: string;
  license: string;
  email: string;
  rating: number;
  specialization: "Residential" | "Commercial" | "Luxury";
  activeLeads: number;
  closedDeals: number;
  avatar?: string;
}

export interface Message {
  id: string;
  content: string;
  channel: "SMS" | "Email" | "Social Media" | "Chat";
  recipient: string;
  sender?: string;
  sentiment: "Positive" | "Neutral" | "Negative";
  timestamp: string;
  automated: boolean;
  leadId?: string;
  propertyId?: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  type:
    | "Viewing"
    | "Inspection"
    | "Lease Review"
    | "Document Signing"
    | "Open House";
  client: string;
  agent: string;
  propertyId: string;
  status: "Scheduled" | "Completed" | "Cancelled";
  notes?: string;
  duration: number; // in minutes
}

export interface Lease {
  id: string;
  propertyId: string;
  clientEmail: string;
  monthlyRent: number;
  deposit: number;
  startDate: string;
  endDate: string;
  status: "Active" | "Pending" | "Expired";
  riskLevel: "Low" | "Medium" | "High";
  paymentHistory: "Good" | "Late" | "Default";
}

export interface Document {
  id: string;
  type: "Lease Agreement" | "Contract" | "Disclosure" | "Inspection Report";
  clientEmail: string;
  propertyId: string;
  status: "Pending" | "Signed" | "Rejected";
  createdDate: string;
  signedDate?: string;
}

// Sample Data Generation
const neighborhoods = [
  "Rizal St",
  "Quezon Ave",
  "Magsaysay Blvd",
  "Pioneer Ave",
  "Dacera St",
];
const streetNumbers = Array.from({ length: 50 }, (_, i) => 100 + i);

export const sampleProperties: Property[] = Array.from(
  { length: 50 },
  (_, i) => ({
    id: `prop-${i + 1}`,
    address: `${streetNumbers[i]} ${neighborhoods[i % 5]}, General Santos City`,
    price: 2500000 + i * 50000,
    type: i % 3 === 0 ? "Commercial" : "Residential",
    bedrooms: Math.floor(Math.random() * 4) + 1,
    bathrooms: Math.floor(Math.random() * 3) + 1,
    petFriendly: Math.random() > 0.5,
    haunted: Math.random() > 0.8,
    floodRisk: ["Low", "Medium", "High"][Math.floor(Math.random() * 3)] as
      | "Low"
      | "Medium"
      | "High",
    status: ["Available", "Pending", "Sold"][Math.floor(Math.random() * 3)] as
      | "Available"
      | "Pending"
      | "Sold",
    qualityScore: 50 + Math.floor(Math.random() * 40),
    image: `https://picsum.photos/400/300?random=${i}`,
    sqm: 50 + Math.floor(Math.random() * 100),
    title: `Modern ${i % 3 === 0 ? "Commercial" : "Residential"} Property`,
  })
);

export const sampleLeads: Lead[] = Array.from({ length: 50 }, (_, i) => ({
  id: `lead-${i + 1}`,
  name: `Client ${i + 1}`,
  email: `client${i + 1}@atuna.com`,
  phone: `+639${String(Math.floor(Math.random() * 900000000) + 100000000)}`,
  budget: 2500000 + i * 100000,
  timeline: ["1-3 months", "3-6 months", "6+ months"][
    Math.floor(Math.random() * 3)
  ] as "1-3 months" | "3-6 months" | "6+ months",
  source: [
    "Website",
    "Social Media",
    "Referral",
    "Email Campaign",
    "Open House",
  ][i % 5] as
    | "Website"
    | "Social Media"
    | "Referral"
    | "Email Campaign"
    | "Open House",
  seriousness: 40 + Math.floor(Math.random() * 50),
  preferences: {
    petFriendly: Math.random() > 0.5,
    nonHaunted: Math.random() > 0.3,
    floodSafe: Math.random() > 0.4,
  },
  status: ["New", "Contacted", "Qualified", "Converted"][
    Math.floor(Math.random() * 4)
  ] as "New" | "Contacted" | "Qualified" | "Converted",
  lastContact: new Date(2025, 6, Math.floor(Math.random() * 30) + 1)
    .toISOString()
    .split("T")[0],
  assignedAgent: `agent-${(i % 10) + 1}`,
}));

export const sampleAgents: Agent[] = Array.from({ length: 50 }, (_, i) => ({
  id: `agent-${i + 1}`,
  name: `${["Juan", "Maria", "Jose", "Ana", "Carlos", "Rosa", "Pedro", "Carmen", "Luis", "Elena"][i % 10]} ${["Dela Cruz", "Santos", "Reyes", "Garcia", "Rodriguez"][Math.floor(i / 10)]}`,
  license: `PRC${10000 + i}`,
  email: `agent${i + 1}@atuna.com`,
  rating: 3.0 + Math.random() * 1.8,
  specialization: ["Residential", "Commercial", "Luxury"][
    Math.floor(Math.random() * 3)
  ] as "Residential" | "Commercial" | "Luxury",
  activeLeads: Math.floor(Math.random() * 20) + 5,
  closedDeals: Math.floor(Math.random() * 50) + 10,
  avatar: `https://i.pravatar.cc/150?u=${i}`,
}));

export const sampleMessages: Message[] = Array.from({ length: 50 }, (_, i) => ({
  id: `msg-${i + 1}`,
  content:
    i % 4 === 0
      ? `Open house at ${streetNumbers[i]} ${neighborhoods[i % 5]}`
      : i % 4 === 1
        ? `Thank you for inquiring about ${streetNumbers[i]} ${neighborhoods[i % 5]}!`
        : i % 4 === 2
          ? `Your lease review is scheduled for ${new Date(2025, 7, (i % 28) + 1).toLocaleDateString()}`
          : `Property viewing available for ${streetNumbers[i]} ${neighborhoods[i % 5]}`,
  channel: ["SMS", "Email", "Social Media", "Chat"][i % 4] as
    | "SMS"
    | "Email"
    | "Social Media"
    | "Chat",
  recipient: `client${(i % 50) + 1}@atuna.com`,
  sender: `agent${(i % 50) + 1}@atuna.com`,
  sentiment: ["Positive", "Neutral", "Negative"][
    Math.floor(Math.random() * 3)
  ] as "Positive" | "Neutral" | "Negative",
  timestamp: new Date(
    2025,
    6,
    Math.floor(Math.random() * 30) + 1
  ).toISOString(),
  automated: Math.random() > 0.3,
  leadId: `lead-${(i % 50) + 1}`,
  propertyId: `prop-${(i % 50) + 1}`,
}));

export const sampleEvents: Event[] = Array.from({ length: 50 }, (_, i) => ({
  id: `event-${i + 1}`,
  title: `${["Viewing", "Inspection", "Lease Review", "Document Signing", "Open House"][i % 5]} for ${streetNumbers[i]} ${neighborhoods[i % 5]}`,
  date: new Date(2025, 7, (i % 30) + 1).toISOString().split("T")[0],
  time: `${9 + (i % 8)}:00`,
  type: [
    "Viewing",
    "Inspection",
    "Lease Review",
    "Document Signing",
    "Open House",
  ][i % 5] as
    | "Viewing"
    | "Inspection"
    | "Lease Review"
    | "Document Signing"
    | "Open House",
  client: `client${(i % 50) + 1}@atuna.com`,
  agent: `agent${(i % 50) + 1}@atuna.com`,
  propertyId: `prop-${(i % 50) + 1}`,
  status: ["Scheduled", "Completed", "Cancelled"][
    Math.floor(Math.random() * 3)
  ] as "Scheduled" | "Completed" | "Cancelled",
  duration: [30, 60, 90, 120][Math.floor(Math.random() * 4)],
}));

export const sampleLeases: Lease[] = Array.from({ length: 50 }, (_, i) => ({
  id: `lease-${i + 1}`,
  propertyId: `prop-${(i % 50) + 1}`,
  clientEmail: `client${(i % 50) + 1}@atuna.com`,
  monthlyRent: 12000 + i * 1000,
  deposit: (12000 + i * 1000) * 2,
  startDate: new Date(2025, 7, (i % 28) + 1).toISOString().split("T")[0],
  endDate: new Date(2026, 7, (i % 28) + 1).toISOString().split("T")[0],
  status: ["Active", "Pending", "Expired"][Math.floor(Math.random() * 3)] as
    | "Active"
    | "Pending"
    | "Expired",
  riskLevel: ["Low", "Medium", "High"][Math.floor(Math.random() * 3)] as
    | "Low"
    | "Medium"
    | "High",
  paymentHistory: ["Good", "Late", "Default"][Math.floor(Math.random() * 3)] as
    | "Good"
    | "Late"
    | "Default",
}));

export const sampleDocuments: Document[] = Array.from(
  { length: 50 },
  (_, i) => ({
    id: `doc-${i + 1}`,
    type: ["Lease Agreement", "Contract", "Disclosure", "Inspection Report"][
      Math.floor(Math.random() * 4)
    ] as "Lease Agreement" | "Contract" | "Disclosure" | "Inspection Report",
    clientEmail: `client${(i % 50) + 1}@atuna.com`,
    propertyId: `prop-${(i % 50) + 1}`,
    status: ["Pending", "Signed", "Rejected"][Math.floor(Math.random() * 3)] as
      | "Pending"
      | "Signed"
      | "Rejected",
    createdDate: new Date(2025, 6, Math.floor(Math.random() * 30) + 1)
      .toISOString()
      .split("T")[0],
    signedDate:
      Math.random() > 0.5
        ? new Date(2025, 7, Math.floor(Math.random() * 30) + 1)
            .toISOString()
            .split("T")[0]
        : undefined,
  })
);

// Analytics helper functions
export const calculateAnalytics = () => {
  const medianPrice = [...sampleProperties]
    .map((p) => p.price)
    .sort((a, b) => a - b)[Math.floor(sampleProperties.length / 2)];

  const highSeriousnessLeads = sampleLeads.filter((l) => l.seriousness > 80);
  const conversionRate =
    (highSeriousnessLeads.length / sampleLeads.length) * 100;

  const leadSourceCounts = sampleLeads.reduce(
    (acc, lead) => {
      acc[lead.source] = (acc[lead.source] || 0) + 1;

      return acc;
    },
    {} as Record<string, number>
  );

  const neighborhoodData = sampleProperties.reduce(
    (acc, property) => {
      const neighborhood =
        property.address.split(" ")[1] + " " + property.address.split(" ")[2];

      if (!acc[neighborhood]) {
        acc[neighborhood] = {
          total: 0,
          converted: 0,
          totalPrice: 0,
          haunted: 0,
          avgFloodRisk: 0,
          properties: [],
        };
      }
      acc[neighborhood].total++;
      acc[neighborhood].totalPrice += property.price;
      acc[neighborhood].properties.push(property);
      if (property.haunted) acc[neighborhood].haunted++;
      if (Math.random() > 0.75) acc[neighborhood].converted++; // Simulate conversions

      return acc;
    },
    {} as Record<string, any>
  );

  return {
    medianPrice,
    conversionRate,
    leadSourceCounts,
    neighborhoodData,
    totalProperties: sampleProperties.length,
    activeLeads: sampleLeads.filter((l) => l.status !== "Converted").length,
    totalMessages: sampleMessages.length,
    scheduledEvents: sampleEvents.filter((e) => e.status === "Scheduled")
      .length,
    activeLeases: sampleLeases.filter((l) => l.status === "Active").length,
    averageAgentRating:
      sampleAgents.reduce((sum, a) => sum + a.rating, 0) / sampleAgents.length,
    automatedMessages: sampleMessages.filter((m) => m.automated).length,
    positiveMessages: sampleMessages.filter((m) => m.sentiment === "Positive")
      .length,
  };
};
