import { useState, useEffect, useCallback } from 'react';
import { 
  siteViewingService,
  type SiteViewingResponse,
  type SiteViewingCreate,
  type SiteViewingUpdate
} from '../services';

interface UseSiteViewingsReturn {
  siteViewings: SiteViewingResponse[];
  upcomingSiteViewings: SiteViewingResponse[];
  loading: boolean;
  error: string | null;
  fetchSiteViewings: (params?: {
    status?: string;
    property_id?: string;
    start_date?: string;
    end_date?: string;
  }) => Promise<void>;
  createSiteViewing: (viewing: SiteViewingCreate) => Promise<SiteViewingResponse | null>;
  updateSiteViewing: (id: string, updates: SiteViewingUpdate) => Promise<SiteViewingResponse | null>;
  cancelSiteViewing: (id: string, reason?: string) => Promise<boolean>;
  confirmSiteViewing: (id: string) => Promise<boolean>;
  completeSiteViewing: (id: string, notes?: string) => Promise<boolean>;
  rescheduleSiteViewing: (id: string, newDate: string) => Promise<boolean>;
  getUpcomingSiteViewings: () => Promise<void>;
  getAgentSiteViewings: () => Promise<SiteViewingResponse[]>;
  getClientSiteViewings: () => Promise<SiteViewingResponse[]>;
  getAvailableTimeSlots: (propertyId: string, date: string) => Promise<string[]>;
  assignAgentToViewing: (viewingId: string, agentId: string) => Promise<boolean>;
  refreshSiteViewings: () => Promise<void>;
}

export const useSiteViewings = (): UseSiteViewingsReturn => {
  const [siteViewings, setSiteViewings] = useState<SiteViewingResponse[]>([]);
  const [upcomingSiteViewings, setUpcomingSiteViewings] = useState<SiteViewingResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSiteViewings = useCallback(async (params?: {
    status?: string;
    property_id?: string;
    start_date?: string;
    end_date?: string;
  }) => {
    setLoading(true);
    setError(null);
    try {
      const data = await siteViewingService.getSiteViewings(params);
      setSiteViewings(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch site viewings');
      setSiteViewings([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const createSiteViewing = useCallback(async (viewing: SiteViewingCreate): Promise<SiteViewingResponse | null> => {
    setLoading(true);
    setError(null);
    try {
      const newViewing = await siteViewingService.createSiteViewing(viewing);
      setSiteViewings(prev => [newViewing, ...prev]);
      return newViewing;
    } catch (err: any) {
      setError(err.message || 'Failed to create site viewing');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateSiteViewing = useCallback(async (id: string, updates: SiteViewingUpdate): Promise<SiteViewingResponse | null> => {
    setLoading(true);
    setError(null);
    try {
      const updatedViewing = await siteViewingService.updateSiteViewing(id, updates);
      setSiteViewings(prev => prev.map(v => v.id === id ? updatedViewing : v));
      return updatedViewing;
    } catch (err: any) {
      setError(err.message || 'Failed to update site viewing');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const cancelSiteViewing = useCallback(async (id: string, reason?: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      const updatedViewing = await siteViewingService.cancelSiteViewing(id, reason);
      setSiteViewings(prev => prev.map(v => v.id === id ? updatedViewing : v));
      return true;
    } catch (err: any) {
      setError(err.message || 'Failed to cancel site viewing');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const confirmSiteViewing = useCallback(async (id: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      const updatedViewing = await siteViewingService.confirmSiteViewing(id);
      setSiteViewings(prev => prev.map(v => v.id === id ? updatedViewing : v));
      return true;
    } catch (err: any) {
      setError(err.message || 'Failed to confirm site viewing');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const completeSiteViewing = useCallback(async (id: string, notes?: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      const updatedViewing = await siteViewingService.completeSiteViewing(id, notes);
      setSiteViewings(prev => prev.map(v => v.id === id ? updatedViewing : v));
      return true;
    } catch (err: any) {
      setError(err.message || 'Failed to complete site viewing');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const rescheduleSiteViewing = useCallback(async (id: string, newDate: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      const updatedViewing = await siteViewingService.rescheduleSiteViewing(id, newDate);
      setSiteViewings(prev => prev.map(v => v.id === id ? updatedViewing : v));
      return true;
    } catch (err: any) {
      setError(err.message || 'Failed to reschedule site viewing');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const getUpcomingSiteViewings = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await siteViewingService.getUpcomingSiteViewings();
      setUpcomingSiteViewings(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch upcoming site viewings');
      setUpcomingSiteViewings([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const getAgentSiteViewings = useCallback(async (): Promise<SiteViewingResponse[]> => {
    setLoading(true);
    setError(null);
    try {
      const data = await siteViewingService.getAgentSiteViewings();
      return data;
    } catch (err: any) {
      setError(err.message || 'Failed to fetch agent site viewings');
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const getClientSiteViewings = useCallback(async (): Promise<SiteViewingResponse[]> => {
    setLoading(true);
    setError(null);
    try {
      const data = await siteViewingService.getClientSiteViewings();
      return data;
    } catch (err: any) {
      setError(err.message || 'Failed to fetch client site viewings');
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const getAvailableTimeSlots = useCallback(async (propertyId: string, date: string): Promise<string[]> => {
    setLoading(true);
    setError(null);
    try {
      const slots = await siteViewingService.getAvailableTimeSlots(propertyId, date);
      return slots;
    } catch (err: any) {
      setError(err.message || 'Failed to fetch available time slots');
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const assignAgentToViewing = useCallback(async (viewingId: string, agentId: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      const updatedViewing = await siteViewingService.assignAgentToViewing(viewingId, agentId);
      setSiteViewings(prev => prev.map(v => v.id === viewingId ? updatedViewing : v));
      return true;
    } catch (err: any) {
      setError(err.message || 'Failed to assign agent to viewing');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshSiteViewings = useCallback(async () => {
    await Promise.all([
      fetchSiteViewings(),
      getUpcomingSiteViewings(),
    ]);
  }, [fetchSiteViewings, getUpcomingSiteViewings]);

  useEffect(() => {
    refreshSiteViewings();
  }, [refreshSiteViewings]);

  return {
    siteViewings,
    upcomingSiteViewings,
    loading,
    error,
    fetchSiteViewings,
    createSiteViewing,
    updateSiteViewing,
    cancelSiteViewing,
    confirmSiteViewing,
    completeSiteViewing,
    rescheduleSiteViewing,
    getUpcomingSiteViewings,
    getAgentSiteViewings,
    getClientSiteViewings,
    getAvailableTimeSlots,
    assignAgentToViewing,
    refreshSiteViewings,
  };
};