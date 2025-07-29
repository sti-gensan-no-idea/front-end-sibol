import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  Property, 
  Lead, 
  Agent, 
  Message, 
  Event, 
  Lease, 
  Document,
  sampleProperties,
  sampleLeads,
  sampleAgents,
  sampleMessages,
  sampleEvents,
  sampleLeases,
  sampleDocuments,
  calculateAnalytics
} from '@/data/automation_data';

interface AutomationContextType {
  // Data
  properties: Property[];
  leads: Lead[];
  agents: Agent[];
  messages: Message[];
  events: Event[];
  leases: Lease[];
  documents: Document[];
  analytics: ReturnType<typeof calculateAnalytics>;
  
  // Actions
  addProperty: (property: Omit<Property, 'id'>) => void;
  updateProperty: (id: string, updates: Partial<Property>) => void;
  addLead: (lead: Omit<Lead, 'id'>) => void;
  updateLead: (id: string, updates: Partial<Lead>) => void;
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void;
  addEvent: (event: Omit<Event, 'id'>) => void;
  updateEvent: (id: string, updates: Partial<Event>) => void;
  addLease: (lease: Omit<Lease, 'id'>) => void;
  
  // Filters and search
  filteredProperties: Property[];
  filteredLeads: Lead[];
  filteredEvents: Event[];
  setPropertyFilters: (filters: PropertyFilters) => void;
  setLeadFilters: (filters: LeadFilters) => void;
  setEventFilters: (filters: EventFilters) => void;
  
  // Current selections
  selectedProperty: Property | null;
  selectedLead: Lead | null;
  selectedEvent: Event | null;
  setSelectedProperty: (property: Property | null) => void;
  setSelectedLead: (lead: Lead | null) => void;
  setSelectedEvent: (event: Event | null) => void;
  
  // Chat state
  chatMessages: Message[];
  addChatMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void;
}

interface PropertyFilters {
  type?: 'Residential' | 'Commercial' | 'All';
  priceRange?: [number, number];
  floodRisk?: 'Low' | 'Medium' | 'High' | 'All';
  petFriendly?: boolean;
  haunted?: boolean;
  status?: 'Available' | 'Pending' | 'Sold' | 'All';
}

interface LeadFilters {
  source?: 'Website' | 'Social Media' | 'Referral' | 'Email Campaign' | 'Open House' | 'All';
  status?: 'New' | 'Contacted' | 'Qualified' | 'Converted' | 'All';
  seriousness?: [number, number];
  timeline?: '1-3 months' | '3-6 months' | '6+ months' | 'All';
}

interface EventFilters {
  type?: 'Viewing' | 'Inspection' | 'Lease Review' | 'Document Signing' | 'Open House' | 'All';
  status?: 'Scheduled' | 'Completed' | 'Cancelled' | 'All';
  date?: [string, string];
}

const AutomationContext = createContext<AutomationContextType | undefined>(undefined);

export const useAutomation = () => {
  const context = useContext(AutomationContext);
  if (!context) {
    throw new Error('useAutomation must be used within an AutomationProvider');
  }
  return context;
};

interface AutomationProviderProps {
  children: ReactNode;
}

export const AutomationProvider: React.FC<AutomationProviderProps> = ({ children }) => {
  // Core data state
  const [properties, setProperties] = useState<Property[]>(sampleProperties);
  const [leads, setLeads] = useState<Lead[]>(sampleLeads);
  const [agents] = useState<Agent[]>(sampleAgents);
  const [messages, setMessages] = useState<Message[]>(sampleMessages);
  const [events, setEvents] = useState<Event[]>(sampleEvents);
  const [leases, setLeases] = useState<Lease[]>(sampleLeases);
  const [documents] = useState<Document[]>(sampleDocuments);
  const [analytics, setAnalytics] = useState(calculateAnalytics());
  
  // Filter states
  const [propertyFilters, setPropertyFilters] = useState<PropertyFilters>({});
  const [leadFilters, setLeadFilters] = useState<LeadFilters>({});
  const [eventFilters, setEventFilters] = useState<EventFilters>({});
  
  // Selection states
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  
  // Chat state
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  
  // Update analytics when data changes
  useEffect(() => {
    setAnalytics(calculateAnalytics());
  }, [properties, leads, messages, events, leases]);
  
  // Actions
  const addProperty = (property: Omit<Property, 'id'>) => {
    const newProperty = {
      ...property,
      id: `prop-${Date.now()}`
    };
    setProperties(prev => [...prev, newProperty]);
  };
  
  const updateProperty = (id: string, updates: Partial<Property>) => {
    setProperties(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  };
  
  const addLead = (lead: Omit<Lead, 'id'>) => {
    const newLead = {
      ...lead,
      id: `lead-${Date.now()}`
    };
    setLeads(prev => [...prev, newLead]);
    
    // Auto-send welcome message
    addMessage({
      content: `Welcome to aTuna! Thank you for your interest. We'll be in touch shortly about your property search.`,
      channel: 'Email',
      recipient: lead.email,
      sender: 'system@atuna.com',
      sentiment: 'Positive',
      automated: true,
      leadId: newLead.id
    });
  };
  
  const updateLead = (id: string, updates: Partial<Lead>) => {
    setLeads(prev => prev.map(l => l.id === id ? { ...l, ...updates } : l));
  };
  
  const addMessage = (message: Omit<Message, 'id' | 'timestamp'>) => {
    const newMessage = {
      ...message,
      id: `msg-${Date.now()}`,
      timestamp: new Date().toISOString()
    };
    setMessages(prev => [...prev, newMessage]);
  };
  
  const addEvent = (event: Omit<Event, 'id'>) => {
    const newEvent = {
      ...event,
      id: `event-${Date.now()}`
    };
    setEvents(prev => [...prev, newEvent]);
    
    // Auto-send confirmation message
    addMessage({
      content: `Your ${event.type.toLowerCase()} has been scheduled for ${event.date} at ${event.time}. We'll send you a reminder 24 hours before.`,
      channel: 'SMS',
      recipient: event.client,
      sender: event.agent,
      sentiment: 'Positive',
      automated: true
    });
  };
  
  const updateEvent = (id: string, updates: Partial<Event>) => {
    setEvents(prev => prev.map(e => e.id === id ? { ...e, ...updates } : e));
  };
  
  const addLease = (lease: Omit<Lease, 'id'>) => {
    const newLease = {
      ...lease,
      id: `lease-${Date.now()}`
    };
    setLeases(prev => [...prev, newLease]);
  };
  
  const addChatMessage = (message: Omit<Message, 'id' | 'timestamp'>) => {
    const newMessage = {
      ...message,
      id: `chat-${Date.now()}`,
      timestamp: new Date().toISOString(),
      channel: 'Chat' as const
    };
    setChatMessages(prev => [...prev, newMessage]);
  };
  
  // Filtered data
  const filteredProperties = properties.filter(property => {
    if (propertyFilters.type && propertyFilters.type !== 'All' && property.type !== propertyFilters.type) return false;
    if (propertyFilters.priceRange && (property.price < propertyFilters.priceRange[0] || property.price > propertyFilters.priceRange[1])) return false;
    if (propertyFilters.floodRisk && propertyFilters.floodRisk !== 'All' && property.floodRisk !== propertyFilters.floodRisk) return false;
    if (propertyFilters.petFriendly !== undefined && property.petFriendly !== propertyFilters.petFriendly) return false;
    if (propertyFilters.haunted !== undefined && property.haunted !== propertyFilters.haunted) return false;
    if (propertyFilters.status && propertyFilters.status !== 'All' && property.status !== propertyFilters.status) return false;
    return true;
  });
  
  const filteredLeads = leads.filter(lead => {
    if (leadFilters.source && leadFilters.source !== 'All' && lead.source !== leadFilters.source) return false;
    if (leadFilters.status && leadFilters.status !== 'All' && lead.status !== leadFilters.status) return false;
    if (leadFilters.seriousness && (lead.seriousness < leadFilters.seriousness[0] || lead.seriousness > leadFilters.seriousness[1])) return false;
    if (leadFilters.timeline && leadFilters.timeline !== 'All' && lead.timeline !== leadFilters.timeline) return false;
    return true;
  }).sort((a, b) => b.seriousness - a.seriousness); // Sort by seriousness
  
  const filteredEvents = events.filter(event => {
    if (eventFilters.type && eventFilters.type !== 'All' && event.type !== eventFilters.type) return false;
    if (eventFilters.status && eventFilters.status !== 'All' && event.status !== eventFilters.status) return false;
    if (eventFilters.date) {
      const eventDate = new Date(event.date).getTime();
      const startDate = new Date(eventFilters.date[0]).getTime();
      const endDate = new Date(eventFilters.date[1]).getTime();
      if (eventDate < startDate || eventDate > endDate) return false;
    }
    return true;
  }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()); // Sort by date
  
  const value: AutomationContextType = {
    properties,
    leads,
    agents,
    messages,
    events,
    leases,
    documents,
    analytics,
    addProperty,
    updateProperty,
    addLead,
    updateLead,
    addMessage,
    addEvent,
    updateEvent,
    addLease,
    filteredProperties,
    filteredLeads,
    filteredEvents,
    setPropertyFilters,
    setLeadFilters,
    setEventFilters,
    selectedProperty,
    selectedLead,
    selectedEvent,
    setSelectedProperty,
    setSelectedLead,
    setSelectedEvent,
    chatMessages,
    addChatMessage
  };
  
  return (
    <AutomationContext.Provider value={value}>
      {children}
    </AutomationContext.Provider>
  );
};
