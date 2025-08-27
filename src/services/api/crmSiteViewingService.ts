// CRM and Site Viewing API Services
import { apiClient } from './apiClient';
import {
  Lead,
  LeadCreate,
  LeadResponse,
  LeadStatusEnum,
  SiteViewing,
  SiteViewingCreate,
  SiteViewingUpdate,
  SiteViewingResponse,
} from '../../types/apiTypes';

class CRMService {
  // Create lead
  async createLead(data: LeadCreate): Promise<LeadResponse> {
    return apiClient.post<LeadResponse>('/site-viewings/crm/leads', data);
  }

  // Get leads
  async getLeads(params?: {
    status?: LeadStatusEnum;
    agent_id?: string;
  }): Promise<LeadResponse[]> {
    return apiClient.get<LeadResponse[]>('/site-viewings/crm/leads', { params });
  }

  // Get lead details
  async getLeadDetails(leadId: string): Promise<LeadResponse> {
    return apiClient.get<LeadResponse>(`/site-viewings/crm/leads/${leadId}`);
  }

  // Update lead status
  async updateLeadStatus(
    leadId: string,
    newStatus: LeadStatusEnum,
    notes?: string
  ): Promise<LeadResponse> {
    const params: any = { new_status: newStatus };
    if (notes) params.notes = notes;
    
    return apiClient.put<LeadResponse>(
      `/site-viewings/crm/leads/${leadId}/status`,
      null,
      { params }
    );
  }

  // Get pipeline summary
  async getPipelineSummary(agentId?: string): Promise<any> {
    const params = agentId ? { agent_id: agentId } : undefined;
    return apiClient.get<any>('/site-viewings/crm/pipeline-summary', { params });
  }

  // Move lead through pipeline
  async moveLeadThroughPipeline(
    leadId: string,
    fromStatus: LeadStatusEnum,
    toStatus: LeadStatusEnum
  ): Promise<LeadResponse> {
    // Validate pipeline progression
    const validTransitions: Record<LeadStatusEnum, LeadStatusEnum[]> = {
      [LeadStatusEnum.PROSPECTING]: [LeadStatusEnum.CONTACTED],
      [LeadStatusEnum.CONTACTED]: [LeadStatusEnum.SITE_VIEWED, LeadStatusEnum.PROSPECTING],
      [LeadStatusEnum.SITE_VIEWED]: [LeadStatusEnum.RESERVED, LeadStatusEnum.CONTACTED],
      [LeadStatusEnum.RESERVED]: [LeadStatusEnum.CLOSED, LeadStatusEnum.SITE_VIEWED],
      [LeadStatusEnum.CLOSED]: [],
    };

    if (!validTransitions[fromStatus]?.includes(toStatus)) {
      throw new Error(`Invalid transition from ${fromStatus} to ${toStatus}`);
    }

    return this.updateLeadStatus(leadId, toStatus);
  }

  // Get leads by stage
  async getLeadsByStage(status: LeadStatusEnum): Promise<LeadResponse[]> {
    return this.getLeads({ status });
  }

  // Calculate conversion metrics
  async getConversionMetrics(agentId?: string): Promise<{
    totalLeads: number;
    conversionRate: number;
    averageTimeToClose: number;
    stageMetrics: Record<LeadStatusEnum, number>;
  }> {
    const leads = await this.getLeads({ agent_id: agentId });
    const closedLeads = leads.filter(l => l.status === LeadStatusEnum.CLOSED);
    
    const stageMetrics = leads.reduce((acc, lead) => {
      acc[lead.status] = (acc[lead.status] || 0) + 1;
      return acc;
    }, {} as Record<LeadStatusEnum, number>);

    return {
      totalLeads: leads.length,
      conversionRate: leads.length > 0 ? (closedLeads.length / leads.length) * 100 : 0,
      averageTimeToClose: 0, // Would need to calculate based on timestamps
      stageMetrics,
    };
  }
}

class SiteViewingService {
  // Schedule site viewing
  async scheduleSiteViewing(data: SiteViewingCreate): Promise<SiteViewingResponse> {
    return apiClient.post<SiteViewingResponse>('/site-viewings/', data);
  }

  // Get site viewings
  async getSiteViewings(upcomingOnly: boolean = true): Promise<SiteViewingResponse[]> {
    return apiClient.get<SiteViewingResponse[]>('/site-viewings/', {
      params: { upcoming_only: upcomingOnly },
    });
  }

  // Update site viewing
  async updateSiteViewing(
    viewingId: string,
    data: SiteViewingUpdate
  ): Promise<SiteViewingResponse> {
    return apiClient.put<SiteViewingResponse>(`/site-viewings/${viewingId}`, data);
  }

  // Cancel site viewing
  async cancelSiteViewing(viewingId: string): Promise<void> {
    return apiClient.delete<void>(`/site-viewings/${viewingId}`);
  }

  // Get site viewings by property
  async getSiteViewingsByProperty(propertyId: string): Promise<SiteViewingResponse[]> {
    const allViewings = await this.getSiteViewings(false);
    return allViewings.filter(v => v.property_id === propertyId);
  }

  // Get site viewings by date range
  async getSiteViewingsByDateRange(
    startDate: Date,
    endDate: Date
  ): Promise<SiteViewingResponse[]> {
    const allViewings = await this.getSiteViewings(false);
    return allViewings.filter(v => {
      const viewingDate = new Date(v.scheduled_date);
      return viewingDate >= startDate && viewingDate <= endDate;
    });
  }

  // Confirm site viewing
  async confirmSiteViewing(viewingId: string): Promise<SiteViewingResponse> {
    return this.updateSiteViewing(viewingId, { status: 'confirmed' });
  }

  // Complete site viewing
  async completeSiteViewing(viewingId: string, notes?: string): Promise<SiteViewingResponse> {
    return this.updateSiteViewing(viewingId, { 
      status: 'completed',
      notes: notes || 'Site viewing completed successfully',
    });
  }

  // Convert site viewing to lead
  async convertToLead(viewingId: string): Promise<LeadResponse> {
    const viewing = await apiClient.get<SiteViewingResponse>(`/site-viewings/${viewingId}`);
    
    const leadData: LeadCreate = {
      property_id: viewing.property_id,
      client_name: viewing.guest_name || 'Unknown',
      client_email: viewing.guest_email || 'unknown@example.com',
      client_phone: viewing.guest_phone,
    };

    const lead = await crmService.createLead(leadData);
    
    // Update site viewing status
    await this.completeSiteViewing(viewingId, `Converted to lead: ${lead.id}`);
    
    return lead;
  }
}

export const crmService = new CRMService();
export const siteViewingService = new SiteViewingService();
