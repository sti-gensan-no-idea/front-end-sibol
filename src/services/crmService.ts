import apiService from './apiService';

export interface LeadResponse {
  id: string;
  property_id: string;
  client_name: string;
  client_email: string;
  client_phone?: string;
  agent_id?: string;
  status: 'prospecting' | 'contacted' | 'site_viewed' | 'reserved' | 'closed';
  created_at: string;
  updated_at?: string;
}

export interface LeadCreate {
  property_id: string;
  client_name: string;
  client_email: string;
  client_phone?: string;
  agent_id?: string;
}

export interface LeadUpdate {
  status?: 'prospecting' | 'contacted' | 'site_viewed' | 'reserved' | 'closed';
  notes?: string;
  next_followup?: string;
}

export interface BookmarkResponse {
  id: string;
  user_id: string;
  property_id: string;
  created_at: string;
  property: {
    id: string;
    title: string;
    price: number;
    location: string;
    property_type?: string;
  };
}

export interface BookmarkCreate {
  property_id: string;
}

export interface NotificationResponse {
  id: string;
  user_id: string;
  title: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export class CRMService {
  // CRM Lead Management
  async getLeads(params?: {
    status?: string;
    agent_id?: string;
    property_id?: string;
  }): Promise<LeadResponse[]> {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, value.toString());
        }
      });
    }
    
    const endpoint = `/crm/leads${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return apiService.get(endpoint);
  }

  async createLead(lead: LeadCreate): Promise<LeadResponse> {
    return apiService.post('/crm/leads', lead);
  }

  async getLeadById(id: string): Promise<LeadResponse> {
    return apiService.get(`/crm/leads/${id}`);
  }

  async updateLeadStatus(id: string, updates: LeadUpdate): Promise<LeadResponse> {
    return apiService.put(`/crm/leads/${id}/status`, updates);
  }

  async assignLeadToAgent(id: string, agentId: string): Promise<LeadResponse> {
    return apiService.put(`/crm/leads/${id}/assign`, { agent_id: agentId });
  }

  async getAgentLeads(agentId?: string): Promise<LeadResponse[]> {
    const endpoint = agentId ? `/crm/leads/agent/${agentId}` : '/crm/leads/my-leads';
    return apiService.get(endpoint);
  }

  async getLeadsByStatus(status: string): Promise<LeadResponse[]> {
    return apiService.get(`/crm/leads/status/${status}`);
  }

  async moveLeadToNextStage(id: string): Promise<LeadResponse> {
    return apiService.put(`/crm/leads/${id}/next-stage`);
  }

  // Bookmarks
  async getBookmarks(): Promise<BookmarkResponse[]> {
    return apiService.get('/bookmarks');
  }

  async createBookmark(bookmark: BookmarkCreate): Promise<BookmarkResponse> {
    return apiService.post('/bookmarks', bookmark);
  }

  async deleteBookmark(id: string): Promise<{ message: string }> {
    return apiService.delete(`/bookmarks/${id}`);
  }

  async toggleBookmark(propertyId: string): Promise<{ bookmarked: boolean; bookmark?: BookmarkResponse }> {
    return apiService.post('/bookmarks/toggle', { property_id: propertyId });
  }

  // Notifications
  async getNotifications(): Promise<NotificationResponse[]> {
    return apiService.get('/notifications');
  }

  async markAllNotificationsAsRead(): Promise<{ message: string }> {
    return apiService.put('/notifications');
  }

  async markNotificationAsRead(id: string): Promise<NotificationResponse> {
    return apiService.put(`/notifications/${id}/read`);
  }

  async deleteNotification(id: string): Promise<{ message: string }> {
    return apiService.delete(`/notifications/${id}`);
  }

  async getUnreadNotificationCount(): Promise<{ count: number }> {
    return apiService.get('/notifications/unread-count');
  }
}

export const crmService = new CRMService();
export default crmService;