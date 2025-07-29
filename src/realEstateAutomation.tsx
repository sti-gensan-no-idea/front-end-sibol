// import React, { useState } from "react";
// import { Pie, Bar } from "react-chartjs-2";
// import { Chart as ChartJS, ArcElement, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from "chart.js";

// // Register Chart.js components
// ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

// // Interfaces for data structures
// interface Property {
//   id: string;
//   address: string;
//   price: number;
//   type: string;
//   neighborhood: string;
//   petFriendly: boolean;
//   haunted: boolean;
//   floodRisk: string;
// }

// interface Lease {
//   id: string;
//   propertyId: string;
//   rent: number;
//   status: string;
//   risk: string;
// }

// interface Event {
//   id: string;
//   leaseId: string;
//   title: string;
//   date: string;
//   userId: string;
// }

// interface Document {
//   id: string;
//   leaseId: string;
//   title: string;
//   status: string;
//   clientEmail: string;
// }

// interface Message {
//   id: string;
//   leaseId: string;
//   to: string;
//   message: string;
//   status: string;
//   sentiment: string;
//   channel: string;
//   timestamp: string;
// }

// interface Lead {
//   id: string;
//   clientEmail: string;
//   propertyId: string;
//   seriousness: number;
//   timeline: string;
//   budget: number;
//   preferences: Record<string, boolean>;
//   source: string;
// }

// interface Agent {
//   id: string;
//   name: string;
//   license: string;
//   rating: number;
// }

// // Sample data (50 entries each)
// const properties: Property[] = Array.from({ length: 50 }, (_, i) => ({
//   id: `prop${i + 1}`,
//   address: `${100 + i} ${["Rizal St", "Quezon Ave", "Magsaysay Blvd", "Pioneer Ave", "Dacera St"][i % 5]}`,
//   price: 2500000 + i * 50000,
//   type: ["Residential", "Commercial"][i % 2],
//   neighborhood: ["Rizal St", "Quezon Ave", "Magsaysay Blvd", "Pioneer Ave", "Dacera St"][i % 5],
//   petFriendly: i % 2 === 0,
//   haunted: i % 5 === 0,
//   floodRisk: ["Low", "Medium", "High"][i % 3],
// }));

// const leases: Lease[] = Array.from({ length: 50 }, (_, i) => ({
//   id: `lease${i + 1}`,
//   propertyId: `prop${(i % properties.length) + 1}`,
//   rent: 12000 + i * 1000,
//   status: ["Active", "Pending", "Expired"][i % 3],
//   risk: ["Low", "Medium", "High"][i % 3],
// }));

// const events: Event[] = Array.from({ length: 50 }, (_, i) => ({
//   id: `event${i + 1}`,
//   leaseId: `lease${(i % leases.length) + 1}`,
//   title: `Event for ${properties[i % properties.length].address}`,
//   date: new Date(Date.now() + (i + 1) * 24 * 60 * 60 * 1000).toISOString(),
//   userId: `agent${(i % 10) + 1}`,
// }));

// const documents: Document[] = Array.from({ length: 50 }, (_, i) => ({
//   id: `doc${i + 1}`,
//   leaseId: `lease${(i % leases.length) + 1}`,
//   title: `Document for ${properties[i % properties.length].address}`,
//   status: ["Pending", "Signed"][i % 2],
//   clientEmail: `client${i + 1}@atuna.com`,
// }));

// const messages: Message[] = Array.from({ length: 50 }, (_, i) => ({
//   id: `msg${i + 1}`,
//   leaseId: `lease${(i % leases.length) + 1}`,
//   to: `+639${String(123456789 + i).padStart(9, "0")}`,
//   message: `${["Reminder: Lease review", "Contract signed", "Follow-up inquiry", "Open house invite", "Survey request"][i % 5]} for ${properties[i % properties.length].address}`,
//   status: "Sent",
//   sentiment: ["Neutral", "Positive", "Negative"][i % 3],
//   channel: ["Email", "SMS", "Social Media"][i % 3],
//   timestamp: new Date().toISOString(),
// }));

// const leads: Lead[] = Array.from({ length: 50 }, (_, i) => ({
//   id: `lead${i + 1}`,
//   clientEmail: `client${i + 1}@atuna.com`,
//   propertyId: `prop${(i % properties.length) + 1}`,
//   seriousness: 40 + (i % 6) * 10,
//   timeline: ["1-3 months", "3-6 months", "6+ months"][i % 3],
//   budget: 2500000 + i * 50000,
//   preferences: { petFriendly: i % 2 === 0, nonHaunted: i % 3 === 0 },
//   source: ["Website", "Social Media", "Referral", "Email Campaign", "Open House"][i % 5],
// }));

// const agents: Agent[] = Array.from({ length: 50 }, (_, i) => ({
//   id: `agent${i + 1}`,
//   name: `Agent ${i + 1}`,
//   license: `PRC${10000 + i}`,
//   rating: 3 + (i % 5) * 0.4,
// }));

// // Simulated Twilio client for demo
// const twilioClient = {
//   sendMessage: async (to: string, message: string, channel: string) => {
//     return {
//       id: `msg${messages.length + 1}`,
//       to,
//       message,
//       status: "Sent",
//       sentiment: "Neutral",
//       channel,
//       timestamp: new Date().toISOString(),
//     };
//   },
// };

// // Properties Page Component
// const PropertiesPage: React.FC<{ onSelectProperty: (id: string) => void }> = ({ onSelectProperty }) => {
//   const [filters, setFilters] = useState({ petFriendly: false, nonHaunted: false, maxPrice: 5000000 });
//   const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
//   const [isChatModalOpen, setIsChatModalOpen] = useState(false);
//   const [leadForm, setLeadForm] = useState({ email: "", budget: "", timeline: "1-3 months" });
//   const [currentPropertyId, setCurrentPropertyId] = useState<string | null>(null);
//   const [chatMessages, setChatMessages] = useState<Message[]>([]);
//   const [newMessage, setNewMessage] = useState("");

//   const filteredProperties = properties.filter(
//     p =>
//       (!filters.petFriendly || p.petFriendly) &&
//       (!filters.nonHaunted || !p.haunted) &&
//       p.price <= filters.maxPrice
//   );

//   const openLeadModal = (propertyId: string) => {
//     setCurrentPropertyId(propertyId);
//     setIsLeadModalOpen(true);
//   };

//   const submitLead = async () => {
//     if (currentPropertyId) {
//       const lead: Lead = {
//         id: `lead${leads.length + 1}`,
//         clientEmail: leadForm.email,
//         propertyId: currentPropertyId,
//         seriousness: 50,
//         timeline: leadForm.timeline,
//         budget: Number(leadForm.budget) || 2500000,
//         preferences: filters,
//         source: "Website",
//       };
//       leads.push(lead);
//       const msg = await twilioClient.sendMessage(
//         leadForm.email,
//         `Thank you for inquiring about ${properties.find(p => p.id === currentPropertyId)?.address}! We'll follow up soon.`,
//         "Email"
//       );
//       messages.push(msg);
//       alert(`Lead captured and email sent for ${properties.find(p => p.id === currentPropertyId)?.address}`);
//       setIsLeadModalOpen(false);
//       setLeadForm({ email: "", budget: "", timeline: "1-3 months" });
//     }
//   };

//   const sendChatMessage = async () => {
//     if (newMessage && currentPropertyId) {
//       const msg = await twilioClient.sendMessage("agent1", newMessage, "Chat");
//       setChatMessages([...chatMessages, msg]);
//       setTimeout(() => {
//         setChatMessages(prev => [
//           ...prev,
//           {
//             id: `chat${prev.length + 1}`,
//             leaseId: "",
//             to: "client1@atuna.com",
//             message: `Thanks for your interest in ${properties.find(p => p.id === currentPropertyId)?.address}! Can I schedule a viewing?`,
//             status: "Sent",
//             sentiment: "Positive",
//             channel: "Chat",
//             timestamp: new Date().toISOString(),
//           },
//         ]);
//       }, 1000);
//       setNewMessage("");
//     }
//   };

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">aTuna Properties</h1>
//       <div className="mb-4 flex space-x-4">
//         <label className="flex items-center">
//           <input
//             type="checkbox"
//             checked={filters.petFriendly}
//             onChange={e => setFilters({ ...filters, petFriendly: e.target.checked })}
//           />
//           <span className="ml-2">Pet-Friendly</span>
//         </label>
//         <label className="flex items-center">
//           <input
//             type="checkbox"
//             checked={filters.nonHaunted}
//             onChange={e => setFilters({ ...filters, nonHaunted: e.target.checked })}
//           />
//           <span className="ml-2">Non-Haunted</span>
//         </label>
//         <input
//           type="number"
//           placeholder="Max Price (PHP)"
//           value={filters.maxPrice}
//           onChange={e => setFilters({ ...filters, maxPrice: Number(e.target.value) || 5000000 })}
//           className="border p-2 rounded"
//         />
//       </div>
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         {filteredProperties.map(prop => (
//           <div key={prop.id} className="border p-4 rounded shadow">
//             <h2 className="text-lg font-semibold cursor-pointer" onClick={() => onSelectProperty(prop.id)}>
//               {prop.address}
//             </h2>
//             <p>Price: ₱{prop.price.toLocaleString()}</p>
//             <p>Type: {prop.type}</p>
//             <p>Flood Risk: {prop.floodRisk}</p>
//             <p>{prop.petFriendly ? "Pet-Friendly" : "No Pets"}</p>
//             <p>{prop.haunted ? "Haunted" : "Non-Haunted"}</p>
//             <button
//               className="bg-blue-500 text-white px-4 py-2 rounded mt-2 hover:bg-blue-600"
//               onClick={() => openLeadModal(prop.id)}
//             >
//               Inquire
//             </button>
//             <button
//               className="bg-green-500 text-white px-4 py-2 rounded mt-2 ml-2 hover:bg-green-600"
//               onClick={() => {
//                 setCurrentPropertyId(prop.id);
//                 setIsChatModalOpen(true);
//               }}
//             >
//               Chat
//             </button>
//           </div>
//         ))}
//       </div>
//       {isLeadModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//           <div className="bg-white p-6 rounded shadow-lg">
//             <h2 className="text-xl mb-4">Inquire About Property</h2>
//             <input
//               type="email"
//               placeholder="Email"
//               value={leadForm.email}
//               onChange={e => setLeadForm({ ...leadForm, email: e.target.value })}
//               className="border p-2 mb-2 w-full rounded"
//             />
//             <input
//               type="number"
//               placeholder="Budget (PHP)"
//               value={leadForm.budget}
//               onChange={e => setLeadForm({ ...leadForm, budget: e.target.value })}
//               className="border p-2 mb-2 w-full rounded"
//             />
//             <select
//               value={leadForm.timeline}
//               onChange={e => setLeadForm({ ...leadForm, timeline: e.target.value })}
//               className="border p-2 mb-2 w-full rounded"
//             >
//               <option>1-3 months</option>
//               <option>3-6 months</option>
//               <option>6+ months</option>
//             </select>
//             <div className="flex space-x-2">
//               <button
//                 className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//                 onClick={submitLead}
//               >
//                 Submit
//               </button>
//               <button
//                 className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
//                 onClick={() => setIsLeadModalOpen(false)}
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//       {isChatModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//           <div className="bg-white p-6 rounded shadow-lg w-96">
//             <h2 className="text-xl mb-4">Chat with Agent</h2>
//             <div className="h-64 overflow-y-auto mb-4 border p-2 rounded">
//               {chatMessages.map(msg => (
//                 <div key={msg.id} className={`mb-2 ${msg.to === "agent1" ? "text-right" : "text-left"}`}>
//                   <p>{msg.message}</p>
//                   <p className="text-xs text-gray-500">{new Date(msg.timestamp).toLocaleTimeString()}</p>
//                 </div>
//               ))}
//             </div>
//             <input
//               type="text"
//               placeholder="Type a message"
//               value={newMessage}
//               onChange={e => setNewMessage(e.target.value)}
//               className="border p-2 w-full mb-2 rounded"
//             />
//             <div className="flex space-x-2">
//               <button
//                 className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//                 onClick={sendChatMessage}
//               >
//                 Send
//               </button>
//               <button
//                 className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
//                 onClick={() => setIsChatModalOpen(false)}
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// // Property Preview Page Component
// const PropertyPreviewPage: React.FC<{ propertyId: string; onBack: () => void }> = ({ propertyId, onBack }) => {
//   const [isChatModalOpen, setIsChatModalOpen] = useState(false);
//   const [chatMessages, setChatMessages] = useState<Message[]>([]);
//   const [newMessage, setNewMessage] = useState("");
//   const property = properties.find(p => p.id === propertyId);
//   const mortgageEstimate = property ? (property.price * 0.005) / 12 : 0; // Simplified Mortgage Payments API

//   const sendChatMessage = async () => {
//     if (newMessage && propertyId) {
//       const msg = await twilioClient.sendMessage("agent1", newMessage, "Chat");
//       setChatMessages([...chatMessages, msg]);
//       setTimeout(() => {
//         setChatMessages(prev => [
//           ...prev,
//           {
//             id: `chat${prev.length + 1}`,
//             leaseId: "",
//             to: "client1@atuna.com",
//             message: `Thanks for your interest in ${property?.address}! Can I schedule a viewing?`,
//             status: "Sent",
//             sentiment: "Positive",
//             channel: "Chat",
//             timestamp: new Date().toISOString(),
//           },
//         ]);
//       }, 1000);
//       setNewMessage("");
//     }
//   };

//   if (!property) return <div className="p-4">Property not found</div>;

//   return (
//     <div className="p-4">
//       <button className="text-blue-500 mb-4" onClick={onBack}>Back to Properties</button>
//       <h1 className="text-2xl font-bold mb-4">{property.address}</h1>
//       <p>Price: ₱{property.price.toLocaleString()}</p>
//       <p>Type: {property.type}</p>
//       <p>Flood Risk: {property.floodRisk}</p>
//       <p>{property.petFriendly ? "Pet-Friendly" : "No Pets"}</p>
//       <p>{property.haunted ? "Haunted" : "Non-Haunted"}</p>
//       <p>Estimated Monthly Mortgage: ₱{mortgageEstimate.toLocaleString()}</p>
//       <button
//         className="bg-green-500 text-white px-4 py-2 rounded mt-4 hover:bg-green-600"
//         onClick={() => setIsChatModalOpen(true)}
//       >
//         Chat with Agent
//       </button>
//       {isChatModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//           <div className="bg-white p-6 rounded shadow-lg w-96">
//             <h2 className="text-xl mb-4">Chat with Agent</h2>
//             <div className="h-64 overflow-y-auto mb-4 border p-2 rounded">
//               {chatMessages.map(msg => (
//                 <div key={msg.id} className={`mb-2 ${msg.to === "agent1" ? "text-right" : "text-left"}`}>
//                   <p>{msg.message}</p>
//                   <p className="text-xs text-gray-500">{new Date(msg.timestamp).toLocaleTimeString()}</p>
//                 </div>
//               ))}
//             </div>
//             <input
//               type="text"
//               placeholder="Type a message"
//               value={newMessage}
//               onChange={e => setNewMessage(e.target.value)}
//               className="border p-2 w-full mb-2 rounded"
//             />
//             <div className="flex space-x-2">
//               <button
//                 className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//                 onClick={sendChatMessage}
//               >
//                 Send
//               </button>
//               <button
//                 className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
//                 onClick={() => setIsChatModalOpen(false)}
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// // Agent Dashboard Component
// const DashboardAgentPage: React.FC = () => {
//   const [leaseList, setLeaseList] = useState<Lease[]>(leases);
//   const [eventList, setEventList] = useState<Event[]>(events);
//   const [documentList, setDocumentList] = useState<Document[]>(documents);
//   const [messageList, setMessageList] = useState<Message[]>(messages);
//   const [leadList, setLeadList] = useState<Lead[]>(leads);
//   const [isLeaseModalOpen, setIsLeaseModalOpen] = useState(false);
//   const [isDocumentModalOpen, setIsDocumentModalOpen] = useState(false);
//   const [isSurveyModalOpen, setIsSurveyModalOpen] = useState(false);
//   const [isChatModalOpen, setIsChatModalOpen] = useState(false);
//   const [newLease, setNewLease] = useState({ propertyId: "", rent: "", status: "Pending", risk: "Low" });
//   const [newDocument, setNewDocument] = useState({ leaseId: "", clientEmail: "" });
//   const [surveyLeaseId, setSurveyLeaseId] = useState<string | null>(null);
//   const [currentLeadId, setCurrentLeadId] = useState<string | null>(null);
//   const [chatMessages, setChatMessages] = useState<Message[]>([]);
//   const [newMessage, setNewMessage] = useState("");

//   const createLease = async () => {
//     const lease: Lease = { id: `lease${leaseList.length + 1}`, ...newLease, rent: Number(newLease.rent) || 12000 };
//     setLeaseList([...leaseList, lease]);
//     const newEvent: Event = {
//       id: `event${eventList.length + 1}`,
//       leaseId: lease.id,
//       title: `Lease Review for ${properties.find(p => p.id === lease.propertyId)?.address || "Unknown"}`,
//       date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
//       userId: "agent1",
//     };
//     setEventList([...eventList, newEvent]);
//     const msg = await twilioClient.sendMessage(
//       "+639123456789",
//       `New lease created for ${properties.find(p => p.id === lease.propertyId)?.address || "Unknown"}`,
//       "SMS"
//     );
//     setMessageList([...messageList, msg]);
//     alert(`Lease created: ${newEvent.title}`);
//     setIsLeaseModalOpen(false);
//     setNewLease({ propertyId: "", rent: "", status: "Pending", risk: "Low" });
//   };

//   const createDocument = async () => {
//     const lease = leaseList.find(l => l.id === newDocument.leaseId);
//     const property = properties.find(p => p.id === lease?.propertyId);
//     const doc: Document = {
//       id: `doc${documentList.length + 1}`,
//       leaseId: newDocument.leaseId,
//       title: `Lease Agreement for ${property?.address || "Unknown"}`,
//       status: "Pending",
//       clientEmail: newDocument.clientEmail,
//     };
//     setDocumentList([...documentList, doc]);
//     const newEvent: Event = {
//       id: `event${eventList.length + 1}`,
//       leaseId: newDocument.leaseId,
//       title: `Sign Lease for ${property?.address || "Unknown"}`,
//       date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
//       userId: "agent1",
//     };
//     setEventList([...eventList, newEvent]);
//     const msg = await twilioClient.sendMessage(
//       newDocument.clientEmail,
//       `Please review the lease agreement for ${property?.address || "Unknown"}`,
//       "Email"
//     );
//     setMessageList([...messageList, msg]);
//     alert(`Document created: ${doc.title}`);
//     setIsDocumentModalOpen(false);
//     setNewDocument({ leaseId: "", clientEmail: "" });
//   };

//   const sendSurvey = async () => {
//     if (surveyLeaseId) {
//       const lease = leaseList.find(l => l.id === surveyLeaseId);
//       const msg = await twilioClient.sendMessage(
//         `client${surveyLeaseId.replace("lease", "")}@atuna.com`,
//         `Please provide feedback on your experience with ${properties.find(p => p.id === lease?.propertyId)?.address || "Unknown"}`,
//         "Email"
//       );
//       setMessageList([...messageList, msg]);
//       alert(`Feedback survey sent for ${surveyLeaseId}`);
//       setIsSurveyModalOpen(false);
//     }
//   };

//   const respondToLead = (leadId: string) => {
//     setCurrentLeadId(leadId);
//     setIsChatModalOpen(true);
//   };

//   const sendChatMessage = async () => {
//     if (newMessage && currentLeadId) {
//       const lead = leadList.find(l => l.id === currentLeadId);
//       const msg = await twilioClient.sendMessage(
//         lead?.clientEmail || "client1@atuna.com",
//         newMessage,
//         "Chat"
//       );
//       setChatMessages([...chatMessages, msg]);
//       setLeadList(leadList.map(l => (l.id === currentLeadId ? { ...l, seriousness: l.seriousness + 10 } : l)));
//       setTimeout(() => {
//         setChatMessages(prev => [
//           ...prev,
//           {
//             id: `chat${prev.length + 1}`,
//             leaseId: "",
//             to: "agent1",
//             message: `Thanks for the info! Can we discuss financing options?`,
//             status: "Sent",
//             sentiment: "Positive",
//             channel: "Chat",
//             timestamp: new Date().toISOString(),
//           },
//         ]);
//       }, 1000);
//       setNewMessage("");
//     }
//   };

//   const sortedLeads = leadList.sort((a, b) => b.seriousness - a.seriousness);

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">Agent Dashboard</h1>
//       <div className="flex space-x-4 mb-4">
//         <button
//           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//           onClick={() => setIsLeaseModalOpen(true)}
//         >
//           Add Lease
//         </button>
//         <button
//           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//           onClick={() => setIsDocumentModalOpen(true)}
//         >
//           Create Document
//         </button>
//       </div>
//       <h2 className="text-xl font-semibold mb-2">Leases</h2>
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
//         {leaseList.map(lease => (
//           <div key={lease.id} className="border p-4 rounded shadow">
//             <p>Property: {properties.find(p => p.id === lease.propertyId)?.address || "Unknown"}</p>
//             <p>Rent: ₱{lease.rent.toLocaleString()}</p>
//             <p>Status: {lease.status}</p>
//             <button
//               className="bg-green-500 text-white px-4 py-2 rounded mt-2 hover:bg-green-600"
//               onClick={() => {
//                 setSurveyLeaseId(lease.id);
//                 setIsSurveyModalOpen(true);
//               }}
//             >
//               Send Survey
//             </button>
//           </div>
//         ))}
//       </div>
//       <h2 className="text-xl font-semibold mb-2">Leads</h2>
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         {sortedLeads.map(lead => (
//           <div key={lead.id} className="border p-4 rounded shadow">
//             <p>Email: {lead.clientEmail}</p>
//             <p>Property: {properties.find(p => p.id === lead.propertyId)?.address || "Unknown"}</p>
//             <p>Seriousness: {lead.seriousness}</p>
//             <p>Source: {lead.source}</p>
//             <button
//               className="bg-blue-500 text-white px-4 py-2 rounded mt-2 hover:bg-blue-600"
//               onClick={() => respondToLead(lead.id)}
//             >
//               Chat with Lead
//             </button>
//           </div>
//         ))}
//       </div>
//       {isLeaseModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//           <div className="bg-white p-6 rounded shadow-lg">
//             <h2 className="text-xl mb-4">Create Lease</h2>
//             <select
//               value={newLease.propertyId}
//               onChange={e => setNewLease({ ...newLease, propertyId: e.target.value })}
//               className="border p-2 mb-2 w-full rounded"
//             >
//               <option value="">Select Property</option>
//               {properties.map(p => (
//                 <option key={p.id} value={p.id}>{p.address}</option>
//               ))}
//             </select>
//             <input
//               type="number"
//               placeholder="Rent (PHP)"
//               value={newLease.rent}
//               onChange={e => setNewLease({ ...newLease, rent: e.target.value })}
//               className="border p-2 mb-2 w-full rounded"
//             />
//             <select
//               value={newLease.status}
//               onChange={e => setNewLease({ ...newLease, status: e.target.value })}
//               className="border p-2 mb-2 w-full rounded"
//             >
//               <option>Pending</option>
//               <option>Active</option>
//               <option>Expired</option>
//             </select>
//             <select
//               value={newLease.risk}
//               onChange={e => setNewLease({ ...newLease, risk: e.target.value })}
//               className="border p-2 mb-2 w-full rounded"
//             >
//               <option>Low</option>
//               <option>Medium</option>
//               <option>High</option>
//             </select>
//             <div className="flex space-x-2">
//               <button
//                 className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//                 onClick={createLease}
//               >
//                 Create
//               </button>
//               <button
//                 className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
//                 onClick={() => setIsLeaseModalOpen(false)}
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//       {isDocumentModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//           <div className="bg-white p-6 rounded shadow-lg">
//             <h2 className="text-xl mb-4">Create Document</h2>
//             <select
//               value={newDocument.leaseId}
//               onChange={e => setNewDocument({ ...newDocument, leaseId: e.target.value })}
//               className="border p-2 mb-2 w-full rounded"
//             >
//               <option value="">Select Lease</option>
//               {leaseList.map(l => (
//                 <option key={l.id} value={l.id}>{properties.find(p => p.id === l.propertyId)?.address || "Unknown"}</option>
//               ))}
//             </select>
//             <input
//               type="email"
//               placeholder="Client Email"
//               value={newDocument.clientEmail}
//               onChange={e => setNewDocument({ ...newDocument, clientEmail: e.target.value })}
//               className="border p-2 mb-2 w-full rounded"
//             />
//             <div className="flex space-x-2">
//               <button
//                 className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//                 onClick={createDocument}
//               >
//                 Create
//               </button>
//               <button
//                 className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
//                 onClick={() => setIsDocumentModalOpen(false)}
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//       {isSurveyModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//           <div className="bg-white p-6 rounded shadow-lg">
//             <h2 className="text-xl mb-4">Send Feedback Survey</h2>
//             <p>Send survey for {properties.find(p => p.id === leaseList.find(l => l.id === surveyLeaseId)?.propertyId)?.address || "Unknown"}</p>
//             <div className="flex space-x-2">
//               <button
//                 className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//                 onClick={sendSurvey}
//               >
//                 Send
//               </button>
//               <button
//                 className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
//                 onClick={() => setIsSurveyModalOpen(false)}
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//       {isChatModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//           <div className="bg-white p-6 rounded shadow-lg w-96">
//             <h2 className="text-xl mb-4">Chat with Lead</h2>
//             <div className="h-64 overflow-y-auto mb-4 border p-2 rounded">
//               {chatMessages.map(msg => (
//                 <div key={msg.id} className={`mb-2 ${msg.to === "agent1" ? "text-left" : "text-right"}`}>
//                   <p>{msg.message}</p>
//                   <p className="text-xs text-gray-500">{new Date(msg.timestamp).toLocaleTimeString()}</p>
//                 </div>
//               ))}
//             </div>
//             <input
//               type="text"
//               placeholder="Type a message"
//               value={newMessage}
//               onChange={e => setNewMessage(e.target.value)}
//               className="border p-2 w-full mb-2 rounded"
//             />
//             <div className="flex space-x-2">
//               <button
//                 className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//                 onClick={sendChatMessage}
//               >
//                 Send
//               </button>
//               <button
//                 className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
//                 onClick={() => setIsChatModalOpen(false)}
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// // Admin Dashboard Component
// const DashboardAdminPage: React.FC = () => {
//   const medianPrice = properties.reduce((sum, p) => sum + p.price, 0) / properties.length;
//   const leadSources = leads.reduce((acc, lead) => {
//     acc[lead.source] = (acc[lead.source] || 0) + 1;
//     return acc;
//   }, {} as Record<string, number>);
//   const conversionRate = (leads.filter(l => l.seriousness > 80).length / leads.length) * 100;
//   const neighborhoodScores = properties.reduce((acc, prop) => {
//     const neighborhoodLeads = leads.filter(l => properties.find(p => p.id === l.propertyId)?.neighborhood === prop.neighborhood);
//     acc[prop.neighborhood] = {
//       conversionRate: neighborhoodLeads.length ? (neighborhoodLeads.filter(l => l.seriousness > 80).length / neighborhoodLeads.length) * 100 : 0,
//       medianPrice: properties.filter(p => p.neighborhood === prop.neighborhood).reduce((sum, p) => sum + p.price, 0) / properties.filter(p => p.neighborhood === prop.neighborhood).length,
//       hauntedIssues: properties.filter(p => p.neighborhood === prop.neighborhood && p.haunted).length,
//       floodRisk: properties.filter(p => p.neighborhood === prop.neighborhood).map(p => p.floodRisk).includes("High") ? "High" : "Medium",
//     };
//     return acc;
//   }, {} as Record<string, { conversionRate: number; medianPrice: number; hauntedIssues: number; floodRisk: string }>);

//   const pieChartData = {
//     labels: Object.keys(leadSources),
//     datasets: [{
//       label: "Lead Sources",
//       data: Object.values(leadSources),
//       backgroundColor: ["#4CAF50", "#FF5722", "#2196F3", "#FFC107", "#9C27B0"],
//       borderColor: ["#388E3C", "#E64A19", "#1976D2", "#FFA000", "#7B1FA2"],
//       borderWidth: 1,
//     }],
//   };

//   const barChartData = {
//     labels: Object.keys(neighborhoodScores),
//     datasets: [{
//       label: "Conversion Rate (%)",
//       data: Object.values(neighborhoodScores).map(score => score.conversionRate),
//       backgroundColor: "#4CAF50",
//       borderColor: "#388E3C",
//       borderWidth: 1,
//     }],
//   };

//   const scheduleSocialPost = async () => {
//     const msg = await twilioClient.sendMessage(
//       "facebook",
//       `New listing: ${properties[0].address}, ₱${properties[0].price.toLocaleString()}`,
//       "Social Media"
//     );
//     messages.push(msg);
//     alert("Social media post scheduled!");
//   };

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
//       <button
//         className="bg-blue-500 text-white px-4 py-2 rounded mb-4 hover:bg-blue-600"
//         onClick={scheduleSocialPost}
//       >
//         Schedule Social Media Post
//       </button>
//       <section className="mb-8">
//         <h2 className="text-xl font-semibold mb-2">Analytics</h2>
//         <p>Median Property Price: ₱{medianPrice.toLocaleString()}</p>
//         <p>Conversion Rate: {conversionRate.toFixed(2)}%</p>
//         <p>Lead Sources: {Object.entries(leadSources).map(([source, count]) => `${source}: ${count}`).join(", ")}</p>
//       </section>
//       <section className="mb-8">
//         <h2 className="text-xl font-semibold mb-2">Lead Sources</h2>
//         <Pie data={pieChartData} options={{ plugins: { legend: { position: "top" }, title: { display: true, text: "Lead Sources (2025)" } } }} />
//       </section>
//       <section className="mb-8">
//         <h2 className="text-xl font-semibold mb-2">Neighborhood Conversion Rates</h2>
//         <Bar data={barChartData} options={{ plugins: { legend: { display: false }, title: { display: true, text: "Conversion Rates by Neighborhood (2025)" } } }} />
//       </section>
//       <section>
//         <h2 className="text-xl font-semibold mb-2">Neighborhood Comparison</h2>
//         <table className="w-full border">
//           <thead>
//             <tr className="bg-gray-200">
//               <th className="border p-2">Neighborhood</th>
//               <th className="border p-2">Conversion Rate (%)</th>
//               <th className="border p-2">Median Price (PHP)</th>
//               <th className="border p-2">Haunted Issues</th>
//               <th className="border p-2">Flood Risk</th>
//             </tr>
//           </thead>
//           <tbody>
//             {Object.entries(neighborhoodScores).map(([neighborhood, score]) => (
//               <tr key={neighborhood}>
//                 <td className="border p-2">{neighborhood}</td>
//                 <td className="border p-2">{score.conversionRate.toFixed(2)}</td>
//                 <td className="border p-2">₱{score.medianPrice.toLocaleString()}</td>
//                 <td className="border p-2">{score.hauntedIssues}</td>
//                 <td className="border p-2">{score.floodRisk}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </section>
//     </div>
//   );
// };

// // Main App Component
// const RealEstateAutomation: React.FC = () => {
//   const [currentPage, setCurrentPage] = useState("properties");
//   const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <nav className="bg-blue-600 p-4 text-white flex space-x-4">
//         <button
//           className={`hover:underline ${currentPage === "properties" ? "font-bold" : ""}`}
//           onClick={() => {
//             setCurrentPage("properties");
//             setSelectedPropertyId(null);
//           }}
//         >
//           Properties
//         </button>
//         <button
//           className={`hover:underline ${currentPage === "agent" ? "font-bold" : ""}`}
//           onClick={() => {
//             setCurrentPage("agent");
//             setSelectedPropertyId(null);
//           }}
//         >
//           Agent Dashboard
//         </button>
//         <button
//           className={`hover:underline ${currentPage === "admin" ? "font-bold" : ""}`}
//           onClick={() => {
//             setCurrentPage("admin");
//             setSelectedPropertyId(null);
//           }}
//         >
//           Admin Dashboard
//         </button>
//       </nav>
//       {currentPage === "properties" && !selectedPropertyId && (
//         <PropertiesPage onSelectProperty={setSelectedPropertyId} />
//       )}
//       {currentPage === "properties" && selectedPropertyId && (
//         <PropertyPreviewPage propertyId={selectedPropertyId} onBack={() => setSelectedPropertyId(null)} />
//       )}
//       {currentPage === "agent" && <DashboardAgentPage />}
//       {currentPage === "admin" && <DashboardAdminPage />}
//     </div>
//   );
// };

// export default RealEstateAutomation;