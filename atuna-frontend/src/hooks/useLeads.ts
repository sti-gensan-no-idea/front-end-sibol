import { useState, useEffect, useCallback } from "react";

import {
  dataService,
  type Lead,
  type LeadCreate,
  type LeadStatus,
} from "../services";

interface UseLeadsReturn {
  leads: Lead[];
  loading: boolean;
  error: string | null;
  fetchLeads: () => Promise<void>;
  createLead: (leadData: LeadCreate) => Promise<Lead | null>;
  updateLeadStatus: (id: string, status: LeadStatus) => Promise<Lead | null>;
  moveLeadToNextStage: (id: string) => Promise<Lead | null>;
  getLeadsByStatus: (status: LeadStatus) => Lead[];
  getLeadStats: () => { total: number; byStatus: Record<LeadStatus, number> };
}

export const useLeads = (): UseLeadsReturn => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await dataService.getLeads();
      setLeads(data);
    } catch (err: any) {
      setError(err.message || "Failed to fetch leads");
    } finally {
      setLoading(false);
    }
  }, []);

  const createLead = useCallback(
    async (leadData: LeadCreate): Promise<Lead | null> => {
      setLoading(true);
      setError(null);
      try {
        const newLead = await dataService.createLead(leadData);
        setLeads((prev) => [...prev, newLead]);
        return newLead;
      } catch (err: any) {
        setError(err.message || "Failed to create lead");
        return null;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const updateLeadStatus = useCallback(
    async (id: string, status: LeadStatus): Promise<Lead | null> => {
      setLoading(true);
      setError(null);
      try {
        const updatedLead = await dataService.updateLeadStatus(id, status);
        setLeads((prev) => prev.map((l) => (l.id === id ? updatedLead : l)));
        return updatedLead;
      } catch (err: any) {
        setError(err.message || "Failed to update lead status");
        return null;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const moveLeadToNextStage = useCallback(
    async (id: string): Promise<Lead | null> => {
      const lead = leads.find(l => l.id === id);
      if (!lead) return null;

      // Define the lead progression flow
      const nextStageMap: Record<LeadStatus, LeadStatus | null> = {
        new: "contacted",
        contacted: "qualified", 
        qualified: "proposal",
        proposal: "negotiation",
        negotiation: "reserved",
        reserved: "closed",
        closed: null, // Already at final stage
        lost: null, // Cannot progress from lost
      };

      const nextStage = nextStageMap[lead.status];
      if (!nextStage) {
        setError("Lead cannot be moved to next stage");
        return null;
      }

      return updateLeadStatus(id, nextStage);
    },
    [leads, updateLeadStatus],
  );

  const getLeadsByStatus = useCallback(
    (status: LeadStatus): Lead[] => {
      return leads.filter((lead) => lead.status === status);
    },
    [leads],
  );

  const getLeadStats = useCallback(() => {
    const stats = {
      total: leads.length,
      byStatus: {
        new: 0,
        contacted: 0,
        qualified: 0,
        proposal: 0,
        negotiation: 0,
        reserved: 0,
        closed: 0,
        lost: 0,
      } as Record<LeadStatus, number>,
    };

    leads.forEach((lead) => {
      stats.byStatus[lead.status]++;
    });

    return stats;
  }, [leads]);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  return {
    leads,
    loading,
    error,
    fetchLeads,
    createLead,
    updateLeadStatus,
    moveLeadToNextStage,
    getLeadsByStatus,
    getLeadStats,
  };
};
