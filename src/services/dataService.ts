import apiService from './apiService';
import type {
  Property,
  PropertyCreate,
  Team,
  TeamCreate,
  Event,
  EventCreate,
  SiteViewing,
  SiteViewingCreate,
  AnalyticsDashboard,
  Notification,
  Bookmark,
  BookmarkCreate,
  Lead,
  LeadCreate,
  MaintenanceRequest,
  MaintenanceRequestCreate,
  Payment,
  PaymentCreate,
  User,
} from '../types/api';

export class DataService {
  // Properties
  async getProperties(): Promise<Property[]> {
    return apiService.get<Property[]>('/properties/');
  }

  async getProperty(id: string): Promise<Property> {
    return apiService.get<Property>(`/properties/${id}`);
  }

  async createProperty(propertyData: PropertyCreate): Promise<Property> {
    return apiService.post<Property>('/properties/', propertyData);
  }

  async updateProperty(id: string, propertyData: Partial<PropertyCreate>): Promise<Property> {
    return apiService.put<Property>(`/properties/${id}`, propertyData);
  }

  async deleteProperty(id: string): Promise<void> {
    return apiService.delete<void>(`/properties/${id}`);
  }

  async uploadPropertiesCSV(file: File): Promise<any> {
    return apiService.uploadFile('/properties/upload-csv', file);
  }

  async assignPropertyToAgent(propertyId: string, agentId: string): Promise<any> {
    return apiService.post(`/properties/${propertyId}/assign`, { agent_id: agentId });
  }

  // Teams
  async getTeams(): Promise<Team[]> {
    return apiService.get<Team[]>('/teams/');
  }

  async getTeam(id: string): Promise<Team> {
    return apiService.get<Team>(`/teams/${id}`);
  }

  async createTeam(teamData: TeamCreate): Promise<Team> {
    return apiService.post<Team>('/teams/', teamData);
  }

  async addTeamMember(teamId: string, userId: string): Promise<any> {
    return apiService.post(`/teams/${teamId}/members`, { user_id: userId });
  }

  async removeTeamMember(teamId: string, userId: string): Promise<any> {
    return apiService.delete(`/teams/${teamId}/members/${userId}`);
  }

  // Events
  async getEvents(): Promise<Event[]> {
    return apiService.get<Event[]>('/events/');
  }

  async getEvent(id: string): Promise<Event> {
    return apiService.get<Event>(`/events/${id}`);
  }

  async createEvent(eventData: EventCreate): Promise<Event> {
    return apiService.post<Event>('/events/', eventData);
  }

  async updateEvent(id: string, eventData: Partial<EventCreate>): Promise<Event> {
    return apiService.put<Event>(`/events/${id}`, eventData);
  }

  async deleteEvent(id: string): Promise<void> {
    return apiService.delete<void>(`/events/${id}`);
  }

  // Site Viewings
  async getSiteViewings(): Promise<SiteViewing[]> {
    return apiService.get<SiteViewing[]>('/site-viewings/');
  }

  async getSiteViewing(id: string): Promise<SiteViewing> {
    return apiService.get<SiteViewing>(`/site-viewings/${id}`);
  }

  async createSiteViewing(viewingData: SiteViewingCreate): Promise<SiteViewing> {
    return apiService.post<SiteViewing>('/site-viewings/', viewingData);
  }

  async updateSiteViewing(id: string, viewingData: Partial<SiteViewingCreate>): Promise<SiteViewing> {
    return apiService.put<SiteViewing>(`/site-viewings/${id}`, viewingData);
  }

  // Guest site viewing (no auth required)
  async createGuestSiteViewing(viewingData: SiteViewingCreate): Promise<SiteViewing> {
    return apiService.post<SiteViewing>('/site-viewings/guest', viewingData);
  }

  // Analytics
  async getAnalyticsDashboard(): Promise<AnalyticsDashboard> {
    return apiService.get<AnalyticsDashboard>('/analytics/dashboard');
  }

  async getSalesAnalytics(): Promise<any> {
    return apiService.get('/analytics/sales');
  }

  async getLeadsAnalytics(): Promise<any> {
    return apiService.get('/analytics/leads');
  }

  async getInventoryAnalytics(): Promise<any> {
    return apiService.get('/analytics/inventory');
  }

  async getRevenueAnalytics(): Promise<any> {
    return apiService.get('/analytics/revenue');
  }

  // Notifications
  async getNotifications(): Promise<Notification[]> {
    return apiService.get<Notification[]>('/notifications');
  }

  async markAllNotificationsAsRead(): Promise<any> {
    return apiService.put('/notifications');
  }

  async markNotificationAsRead(id: string): Promise<any> {
    return apiService.put(`/notifications/${id}/read`);
  }

  // Bookmarks
  async getBookmarks(): Promise<Bookmark[]> {
    return apiService.get<Bookmark[]>('/bookmarks');
  }

  async createBookmark(bookmarkData: BookmarkCreate): Promise<Bookmark> {
    return apiService.post<Bookmark>('/bookmarks', bookmarkData);
  }

  async deleteBookmark(id: string): Promise<void> {
    return apiService.delete<void>(`/bookmarks/${id}`);
  }

  // CRM / Leads
  async getLeads(): Promise<Lead[]> {
    return apiService.get<Lead[]>('/crm/leads');
  }

  async getLead(id: string): Promise<Lead> {
    return apiService.get<Lead>(`/crm/leads/${id}`);
  }

  async createLead(leadData: LeadCreate): Promise<Lead> {
    return apiService.post<Lead>('/crm/leads', leadData);
  }

  async updateLeadStatus(id: string, status: string): Promise<Lead> {
    return apiService.put<Lead>(`/crm/leads/${id}/status`, { status });
  }

  // Maintenance
  async getMaintenanceRequests(): Promise<MaintenanceRequest[]> {
    return apiService.get<MaintenanceRequest[]>('/maintenance/');
  }

  async getMaintenanceRequest(id: string): Promise<MaintenanceRequest> {
    return apiService.get<MaintenanceRequest>(`/maintenance/${id}`);
  }

  async createMaintenanceRequest(requestData: MaintenanceRequestCreate): Promise<MaintenanceRequest> {
    return apiService.post<MaintenanceRequest>('/maintenance/', requestData);
  }

  async updateMaintenanceRequest(id: string, requestData: Partial<MaintenanceRequestCreate>): Promise<MaintenanceRequest> {
    return apiService.put<MaintenanceRequest>(`/maintenance/${id}`, requestData);
  }

  // Payments
  async getPayments(): Promise<Payment[]> {
    return apiService.get<Payment[]>('/payments/');
  }

  async getPayment(id: string): Promise<Payment> {
    return apiService.get<Payment>(`/payments/${id}`);
  }

  async createPayment(paymentData: PaymentCreate): Promise<Payment> {
    return apiService.post<Payment>('/payments/', paymentData);
  }

  async updatePaymentStatus(id: string, status: string): Promise<Payment> {
    return apiService.put<Payment>(`/payments/${id}/status`, { status });
  }

  // Users
  async getUsers(): Promise<User[]> {
    return apiService.get<User[]>('/users/');
  }

  async getUser(id: string): Promise<User> {
    return apiService.get<User>(`/users/${id}`);
  }

  async getCurrentUser(): Promise<User> {
    return apiService.get<User>('/users/me');
  }

  async updateUser(id: string, userData: Partial<User>): Promise<User> {
    return apiService.put<User>(`/users/${id}`, userData);
  }

  // Account Management (Admin only)
  async getPendingAccounts(): Promise<User[]> {
    return apiService.get<User[]>('/accounts/pending');
  }

  async approveAccount(userId: string): Promise<any> {
    return apiService.put(`/accounts/approve/${userId}`);
  }

  async rejectAccount(userId: string): Promise<any> {
    return apiService.put(`/accounts/reject/${userId}`);
  }

  async banAccount(userId: string): Promise<any> {
    return apiService.put(`/accounts/ban/${userId}`);
  }
}

export const dataService = new DataService();
export default dataService;
