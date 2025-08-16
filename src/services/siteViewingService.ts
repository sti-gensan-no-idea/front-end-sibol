import apiService from "./apiService";

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

export interface SiteViewingCreate {
  property_id: string;
  scheduled_date: string;
  guest_name?: string;
  guest_email?: string;
  guest_phone?: string;
}

export interface SiteViewingUpdate {
  scheduled_date?: string;
  status?: string;
  notes?: string;
}

export class SiteViewingService {
  // Get all site viewings
  async getSiteViewings(params?: {
    status?: string;
    property_id?: string;
    start_date?: string;
    end_date?: string;
  }): Promise<SiteViewingResponse[]> {
    const queryParams = new URLSearchParams();

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, value.toString());
        }
      });
    }

    const endpoint = `/site-viewings${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;

    return apiService.get(endpoint);
  }

  // Create site viewing (for guests and clients)
  async createSiteViewing(
    viewing: SiteViewingCreate,
  ): Promise<SiteViewingResponse> {
    return apiService.post("/site-viewings/", viewing);
  }

  // Get site viewing by ID
  async getSiteViewingById(id: string): Promise<SiteViewingResponse> {
    return apiService.get(`/site-viewings/${id}`);
  }

  // Update site viewing
  async updateSiteViewing(
    id: string,
    updates: SiteViewingUpdate,
  ): Promise<SiteViewingResponse> {
    return apiService.put(`/site-viewings/${id}`, updates);
  }

  // Cancel site viewing
  async cancelSiteViewing(
    id: string,
    reason?: string,
  ): Promise<SiteViewingResponse> {
    return apiService.put(`/site-viewings/${id}/cancel`, { reason });
  }

  // Confirm site viewing
  async confirmSiteViewing(id: string): Promise<SiteViewingResponse> {
    return apiService.put(`/site-viewings/${id}/confirm`);
  }

  // Complete site viewing
  async completeSiteViewing(
    id: string,
    notes?: string,
  ): Promise<SiteViewingResponse> {
    return apiService.put(`/site-viewings/${id}/complete`, { notes });
  }

  // Get upcoming site viewings
  async getUpcomingSiteViewings(): Promise<SiteViewingResponse[]> {
    return apiService.get("/site-viewings/upcoming");
  }

  // Get agent's assigned site viewings
  async getAgentSiteViewings(): Promise<SiteViewingResponse[]> {
    return apiService.get("/site-viewings/agent");
  }

  // Get client's site viewings
  async getClientSiteViewings(): Promise<SiteViewingResponse[]> {
    return apiService.get("/site-viewings/client");
  }

  // Assign agent to site viewing
  async assignAgentToViewing(
    viewingId: string,
    agentId: string,
  ): Promise<SiteViewingResponse> {
    return apiService.put(`/site-viewings/${viewingId}/assign-agent`, {
      agent_id: agentId,
    });
  }

  // Get available time slots for property
  async getAvailableTimeSlots(
    propertyId: string,
    date: string,
  ): Promise<string[]> {
    return apiService.get(
      `/site-viewings/available-slots?property_id=${propertyId}&date=${date}`,
    );
  }

  // Reschedule site viewing
  async rescheduleSiteViewing(
    id: string,
    newDate: string,
  ): Promise<SiteViewingResponse> {
    return apiService.put(`/site-viewings/${id}/reschedule`, {
      scheduled_date: newDate,
    });
  }
}

export const siteViewingService = new SiteViewingService();
export default siteViewingService;
