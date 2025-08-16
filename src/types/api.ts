// API Types for Atuna Backend Integration

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Auth Types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface TokenResponse {
  access_token: string;
  token_type: string;
  user_id: string;
  role: string;
}

export interface User {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  role: UserRole;
  created_at: string;
  updated_at: string;
  is_active: boolean;
  office_verified?: boolean;
}

export type UserRole = 'client' | 'developer' | 'agent' | 'broker' | 'admin';

// Registration Types
export interface ClientRegister {
  email: string;
  password: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  role: 'client';
}

export interface DeveloperRegister {
  email: string;
  password: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  role: 'developer';
  company_name: string;
  license_to_sell?: string;
  certificate_of_registration?: string;
}

export interface BrokerRegister {
  email: string;
  password: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  role: 'broker';
  license_number?: string;
  team_name?: string;
}

export interface AgentRegister {
  email: string;
  password: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  role: 'agent';
  cpd_certificate?: string;
  cpd_expiry?: string;
  broker_id?: string;
}

// Property Types
export interface Property {
  id: string;
  title: string;
  description?: string;
  price: number;
  location: string;
  property_type: string;
  status: PropertyStatus;
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
  developer_id?: string;
  agent_id?: string;
  created_at: string;
  updated_at: string;
  images?: string[];
}

export type PropertyStatus = 'available' | 'reserved' | 'sold' | 'pending';

export interface PropertyCreate {
  title: string;
  description?: string;
  price: number;
  location: string;
  property_type: string;
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
}

// Team Types
export interface Team {
  id: string;
  name: string;
  broker_id: string;
  created_at: string;
  members: TeamMember[];
}

export interface TeamMember {
  id: string;
  user_id: string;
  team_id: string;
  role: string;
  joined_at: string;
  user: User;
}

export interface TeamCreate {
  name: string;
  description?: string;
}

// Event Types
export interface Event {
  id: string;
  title: string;
  description?: string;
  start_time: string;
  end_time: string;
  event_type: string;
  user_id: string;
  property_id?: string;
  status: EventStatus;
  created_at: string;
}

export type EventStatus = 'scheduled' | 'completed' | 'cancelled';

export interface EventCreate {
  title: string;
  description?: string;
  start_time: string;
  end_time: string;
  event_type: string;
  property_id?: string;
}

// Site Viewing Types
export interface SiteViewing {
  id: string;
  property_id: string;
  client_name: string;
  client_email: string;
  client_phone: string;
  preferred_date: string;
  preferred_time: string;
  status: SiteViewingStatus;
  agent_id?: string;
  notes?: string;
  created_at: string;
}

export type SiteViewingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

export interface SiteViewingCreate {
  property_id: string;
  client_name: string;
  client_email: string;
  client_phone: string;
  preferred_date: string;
  preferred_time: string;
  notes?: string;
}

// Analytics Types
export interface AnalyticsDashboard {
  total_properties: number;
  total_sales: number;
  total_leads: number;
  revenue: number;
  monthly_sales: MonthlyData[];
  top_agents: TopAgent[];
  recent_activities: Activity[];
}

export interface MonthlyData {
  month: string;
  value: number;
}

export interface TopAgent {
  id: string;
  name: string;
  sales_count: number;
  revenue: number;
}

export interface Activity {
  id: string;
  type: string;
  description: string;
  timestamp: string;
  user_id: string;
}

// Notification Types
export interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  user_id: string;
  read: boolean;
  created_at: string;
}

export type NotificationType = 'info' | 'success' | 'warning' | 'error';

// Bookmark Types
export interface Bookmark {
  id: string;
  user_id: string;
  property_id: string;
  created_at: string;
  property: Property;
}

export interface BookmarkCreate {
  property_id: string;
}

// CRM Types
export interface Lead {
  id: string;
  client_name: string;
  client_email: string;
  client_phone: string;
  property_id: string;
  status: LeadStatus;
  agent_id: string;
  source: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'proposal' | 'negotiation' | 'reserved' | 'closed' | 'lost';

export interface LeadCreate {
  client_name: string;
  client_email: string;
  client_phone: string;
  property_id: string;
  source: string;
  notes?: string;
}

// Maintenance Types
export interface MaintenanceRequest {
  id: string;
  property_id: string;
  tenant_id: string;
  title: string;
  description: string;
  priority: MaintenancePriority;
  status: MaintenanceStatus;
  assigned_to?: string;
  created_at: string;
  updated_at: string;
}

export type MaintenancePriority = 'low' | 'medium' | 'high' | 'urgent';
export type MaintenanceStatus = 'open' | 'in_progress' | 'completed' | 'cancelled';

export interface MaintenanceRequestCreate {
  property_id: string;
  title: string;
  description: string;
  priority: MaintenancePriority;
}

// Payment Types
export interface Payment {
  id: string;
  user_id: string;
  property_id: string;
  amount: number;
  payment_type: PaymentType;
  status: PaymentStatus;
  transaction_id?: string;
  created_at: string;
  updated_at: string;
}

export type PaymentType = 'reservation' | 'downpayment' | 'monthly' | 'maintenance';
export type PaymentStatus = 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled';

export interface PaymentCreate {
  property_id: string;
  amount: number;
  payment_type: PaymentType;
}
