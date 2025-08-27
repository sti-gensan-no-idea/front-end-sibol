// CRM API Endpoints
import api from '../core/apiService';
import { Lead, LeadCreate, LeadStatus } from '../types';

class CRMAPI {
  async createLead(data: LeadCreate): Promise<Lead> {
    return api.post<Lead>('/site-viewings/crm/leads', data);
  }

  async getLeads(params?: {
    status?: LeadStatus;
    agent_id?: string;
  }): Promise<Lead[]> {
    return api.get<Lead[]>('/site-viewings/crm/leads', { params });
  }

  async getLeadDetails(leadId: string): Promise<Lead> {
    return api.get<Lead>(`/site-viewings/crm/leads/${leadId}`);
  }

  async updateLeadStatus(
    leadId: string,
    newStatus: LeadStatus,
    notes?: string
  ): Promise<Lead> {
    const params: any = { new_status: newStatus };
    if (notes) params.notes = notes;
    return api.put<Lead>(`/site-viewings/crm/leads/${leadId}/status`, null, { params });
  }

  async getPipelineSummary(agentId?: string): Promise<any> {
    const params = agentId ? { agent_id: agentId } : undefined;
    return api.get('/site-viewings/crm/pipeline-summary', { params });
  }

  async getLeadsByStatus(status: LeadStatus): Promise<Lead[]> {
    return this.getLeads({ status });
  }

  async getConversionMetrics(agentId?: string): Promise<{
    totalLeads: number;
    conversionRate: number;
    averageTimeToClose: number;
    stageMetrics: Record<LeadStatus, number>;
  }> {
    const leads = await this.getLeads({ agent_id: agentId });
    const closedLeads = leads.filter(l => l.status === 'closed');
    
    const stageMetrics = leads.reduce((acc, lead) => {
      acc[lead.status] = (acc[lead.status] || 0) + 1;
      return acc;
    }, {} as Record<LeadStatus, number>);

    return {
      totalLeads: leads.length,
      conversionRate: leads.length > 0 ? (closedLeads.length / leads.length) * 100 : 0,
      averageTimeToClose: 0, // Would need to calculate based on timestamps
      stageMetrics,
    };
  }
}

export const crmAPI = new CRMAPI();
export default crmAPI;
