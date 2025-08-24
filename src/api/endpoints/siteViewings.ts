// Site Viewings API Endpoints
import api from '../core/apiService';
import { SiteViewing, SiteViewingCreate } from '../types';

class SiteViewingsAPI {
  async scheduleSiteViewing(data: SiteViewingCreate): Promise<SiteViewing> {
    return api.post<SiteViewing>('/site-viewings/', data);
  }

  async getSiteViewings(upcomingOnly: boolean = true): Promise<SiteViewing[]> {
    return api.get<SiteViewing[]>('/site-viewings/', {
      params: { upcoming_only: upcomingOnly }
    });
  }

  async updateSiteViewing(viewingId: string, data: Partial<SiteViewingCreate>): Promise<SiteViewing> {
    return api.put<SiteViewing>(`/site-viewings/${viewingId}`, data);
  }

  async cancelSiteViewing(viewingId: string): Promise<void> {
    return api.delete<void>(`/site-viewings/${viewingId}`);
  }

  async confirmSiteViewing(viewingId: string): Promise<SiteViewing> {
    return this.updateSiteViewing(viewingId, { status: 'confirmed' } as any);
  }

  async completeSiteViewing(viewingId: string, notes?: string): Promise<SiteViewing> {
    return this.updateSiteViewing(viewingId, { 
      status: 'completed',
      notes: notes || 'Site viewing completed successfully'
    } as any);
  }

  async getSiteViewingsByProperty(propertyId: string): Promise<SiteViewing[]> {
    const allViewings = await this.getSiteViewings(false);
    return allViewings.filter(v => v.property_id === propertyId);
  }
}

export const siteViewingsAPI = new SiteViewingsAPI();
export default siteViewingsAPI;
