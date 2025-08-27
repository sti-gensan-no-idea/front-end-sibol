// API Types - Complete type definitions for all endpoints
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T = any> {
  items: T[];
  total: number;
  limit: number;
  offset: number;
  has_next: boolean;
  has_prev: boolean;
}

// User & Authentication Types
export interface UserLogin {
  email: string;
  password: string;
}

export interface Token {
  access_token: string;
  token_type: string;
  user_id?: string;
  role?: string;
}

export interface User {
  id: string;
  email: string;
  role: UserRole;
  is_active: boolean;
  is_verified: boolean;
  first_name?: string;
  last_name?: string;
  phone?: string;
  created_at: string;
  updated_at?: string;
}

export type UserRole = 'client' | 'developer' | 'broker' | 'agent' | 'admin';

export interface UserCreate {
  email: string;
  password: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  role: UserRole;
}

export interface UserUpdate {
  first_name?: string;
  last_name?: string;
  phone?: string;
  is_active?: boolean;
}

// Registration Types
export interface ClientRegister {
  email: string;
  password: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  role?: 'client';
}

export interface DeveloperRegister {
  email: string;
  password: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  role?: 'developer';
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
  role?: 'broker';
  license_number?: string;
  team_name?: string;
}

export interface AgentRegister {
  email: string;
  password: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  role?: 'agent';
  cpd_certificate?: string;
  cpd_expiry?: string;
  broker_id?: string;
}

// Property Types
export interface Property {
  id: string;
  title: string;
  description?: string;
  price: string;
  location: string;
  property_type?: string;
  expected_downpayment?: string;
  project_name?: string;
  owner_id: string;
  status: PropertyStatus;
  is_archived: boolean;
  created_at: string;
  updated_at?: string;
}

export type PropertyStatus = 'available' | 'reserved' | 'sold' | 'pending';

export interface PropertyCreate {
  title: string;
  description?: string;
  price: number | string;
  location: string;
  property_type?: string;
  expected_downpayment?: number | string;
  project_name?: string;
}

export interface PropertyUpdate {
  title?: string;
  description?: string;
  price?: number | string;
  location?: string;
  property_type?: string;
  status?: PropertyStatus;
  expected_downpayment?: number | string;
  project_name?: string;
}

// Team Types
export interface Team {
  id: string;
  broker_id: string;
  name: string;
  description?: string;
  is_active: boolean;
  member_count: number;
  created_at: string;
  updated_at?: string;
  members?: TeamMember[];
}

export interface TeamCreate {
  name: string;
  description?: string;
}

export interface TeamUpdate {
  name?: string;
  description?: string;
  is_active?: boolean;
}

export interface TeamMember {
  id: string;
  team_id: string;
  agent_id: string;
  role: string;
  joined_date: string;
  agent?: Agent;
}

export interface Agent {
  id: string;
  user_id: string;
  broker_id?: string;
  cpd_certificate?: string;
  cpd_expiry?: string;
  is_active_in_team: boolean;
  created_at: string;
}

// Event Types
export interface Event {
  id: string;
  title: string;
  description?: string;
  event_type: string;
  scheduled_date: string;
  status: string;
  creator_id: string;
  property_id?: string;
  created_at: string;
}

export interface EventCreate {
  title: string;
  description?: string;
  event_type: string;
  scheduled_date: string;
  property_id?: string;
}

// Site Viewing Types
export interface SiteViewing {
  id: string;
  property_id: string;
  client_id?: string;
  scheduled_date: string;
  status: string;
  guest_name?: string;
  guest_email?: string;
  guest_phone?: string;
  notes?: string;
  created_at: string;
  updated_at?: string;
}

export interface SiteViewingCreate {
  property_id: string;
  scheduled_date: string;
  guest_name?: string;
  guest_email?: string;
  guest_phone?: string;
}

// Lead Types
export interface Lead {
  id: string;
  property_id: string;
  client_name: string;
  client_email: string;
  client_phone?: string;
  agent_id?: string;
  status: LeadStatus;
  created_at: string;
  updated_at?: string;
}

export type LeadStatus = 'prospecting' | 'contacted' | 'site_viewed' | 'reserved' | 'closed';

export interface LeadCreate {
  property_id: string;
  client_name: string;
  client_email: string;
  client_phone?: string;
  agent_id?: string;
}

// Notification Types
export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export interface NotificationCreate {
  title: string;
  message: string;
}

// Analytics Types
export interface DashboardAnalytics {
  total_properties: number;
  active_properties: number;
  total_users: number;
  active_users: number;
  total_revenue: string;
  monthly_revenue: string;
  top_performing_agents: TopAgent[];
}

export interface TopAgent {
  agent_id: string;
  agent_name: string;
  total_sales: number;
  total_revenue: string;
  conversion_rate: number;
  rating: number;
}

// Maintenance Types
export interface MaintenanceRequest {
  id: string;
  property_id: string;
  title: string;
  description?: string;
  category?: string;
  priority?: string;
  status?: string;
  created_at: string;
}

export interface MaintenanceRequestCreate {
  property_id: string;
  title: string;
  description?: string;
  category?: string;
  priority?: string;
}

// Payment Types
export interface Payment {
  id: string;
  property_id: string;
  amount: string;
  payment_type: string;
  status: PaymentStatus;
  created_at: string;
}

export type PaymentStatus = 'pending' | 'completed' | 'failed';

export interface PaymentCreate {
  property_id: string;
  amount: number | string;
  payment_type: string;
  payment_method?: string;
}

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

// CSV Upload Response
export interface CSVUploadResponse {
  success_count: number;
  error_count: number;
  errors: string[];
}
