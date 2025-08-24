// Enhanced API Types with OpenAPI Schema Integration
export * from './api';

// Additional types from OpenAPI schema
export interface PaginatedResponse {
  items: any[];
  total: number;
  limit: number;
  offset: number;
  has_next: boolean;
  has_prev: boolean;
}

export interface TeamResponse {
  id: string;
  broker_id: string;
  name: string;
  description?: string;
  is_active: boolean;
  member_count: number;
  created_at: string;
  updated_at?: string;
}

export interface TeamUpdate {
  name?: string;
  description?: string;
  is_active?: boolean;
}

export interface TeamMemberCreate {
  agent_id: string;
  role?: string;
}

export interface TeamMemberResponse {
  id: string;
  team_id: string;
  agent_id: string;
  role: string;
  joined_date: string;
  agent: AgentResponse;
}

export interface AgentResponse {
  id: string;
  user_id: string;
  broker_id?: string;
  cpd_certificate?: string;
  cpd_expiry?: string;
  is_active_in_team: boolean;
  created_at: string;
}

export interface AgentAccomplishmentsResponse {
  agent_info: AgentResponse;
  statistics: AgentStatistics;
  recent_activities: string[];
  team_ranking: number;
}

export interface AgentStatistics {
  total_properties: number;
  active_leads: number;
  revenue: string;
  automation_rate: number;
  conversion_rate: number;
  average_deal_size: string;
}

export interface PropertyBulkCreate {
  properties: PropertyCreate[];
}

export interface CSVUploadResponse {
  success_count: number;
  error_count: number;
  errors: string[];
}

export interface PropertyAssignmentResponse {
  property_id: string;
  assigned_to: string;
  assigned_to_role: string;
  assigned_by: string;
  assignment_date: string;
}

export interface EventDetailResponse extends EventResponse {
  attendees: UserResponse[];
  notes?: string;
}

export interface EventResponse {
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

export interface EventUpdate {
  title?: string;
  description?: string;
  scheduled_date?: string;
  status?: string;
}

export interface LeadResponse {
  id: string;
  property_id: string;
  client_name: string;
  client_email: string;
  client_phone?: string;
  agent_id?: string;
  status: LeadStatusEnum;
  created_at: string;
  updated_at?: string;
}

export enum LeadStatusEnum {
  PROSPECTING = 'prospecting',
  CONTACTED = 'contacted',
  SITE_VIEWED = 'site_viewed',
  RESERVED = 'reserved',
  CLOSED = 'closed'
}

export interface SiteViewingResponse {
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

export interface SiteViewingUpdate {
  scheduled_date?: string;
  status?: string;
  notes?: string;
}

export interface MaintenanceRequestUpdate {
  title?: string;
  description?: string;
  category?: string;
  priority?: string;
  status?: string;
  assigned_to?: string;
  estimated_cost?: number | string;
  actual_cost?: number | string;
}

export enum PaymentStatusEnum {
  PENDING = 'pending',
  COMPLETED = 'completed',
  FAILED = 'failed'
}

export interface NotificationResponse {
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

export interface UserResponse {
  id: string;
  email: string;
  role: string;
  is_active: boolean;
  is_verified: boolean;
  first_name?: string;
  last_name?: string;
  phone?: string;
  created_at: string;
  updated_at?: string;
}

export interface UserPendingResponse extends UserResponse {
  pending_reason?: string;
}

export interface AccountRejection {
  reason: string;
}

export interface AccountBan {
  reason: string;
}

export interface DashboardAnalytics {
  total_properties: number;
  active_properties: number;
  total_users: number;
  active_users: number;
  total_revenue: string;
  monthly_revenue: string;
  top_performing_agents: BestPerformingAgent[];
}

export interface BestPerformingAgent {
  agent_id: string;
  agent_name: string;
  total_sales: number;
  total_revenue: string;
  conversion_rate: number;
  rating: number;
}

export interface SalesAnalytics {
  total_sales: number;
  monthly_sales: number;
  revenue_growth: number;
  top_selling_properties: PropertyResponse[];
  sales_by_month: any[];
}

export interface LeadsAnalytics {
  total_leads: number;
  active_leads: number;
  conversion_rate: number;
  leads_by_status: Record<string, number>;
  leads_by_agent: any[];
}

export interface InventoryAnalytics {
  total_inventory: number;
  available_inventory: number;
  sold_inventory: number;
  reserved_inventory: number;
  inventory_by_project: any[];
}

// User Registration Types
export interface DeveloperResponse {
  id: string;
  user_id: string;
  company_name: string;
  license_to_sell?: string;
  certificate_of_registration?: string;
  is_verified: boolean;
  created_at: string;
}

export interface BrokerResponse {
  id: string;
  user_id: string;
  license_number?: string;
  is_verified: boolean;
  team_name?: string;
  created_at: string;
}

export interface PropertyResponse {
  title: string;
  description?: string;
  price: string;
  location: string;
  property_type?: string;
  expected_downpayment?: string;
  project_name?: string;
  id: string;
  owner_id: string;
  status: string;
  is_archived: boolean;
  created_at: string;
  updated_at?: string;
}

export interface BookmarkResponse {
  id: string;
  user_id: string;
  property_id: string;
  created_at: string;
  property: PropertyResponse;
}
