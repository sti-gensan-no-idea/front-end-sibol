import { useState, useEffect, useCallback } from 'react';
<<<<<<< HEAD
import { 
  crmService, 
  type LeadResponse, 
  type LeadCreate, 
  type LeadUpdate,
  type BookmarkResponse,
  type BookmarkCreate,
  type NotificationResponse
} from '../services';

interface UseLeadsReturn {
  leads: LeadResponse[];
  loading: boolean;
  error: string | null;
  fetchLeads: (params?: {
    status?: string;
    agent_id?: string;
    property_id?: string;
  }) => Promise<void>;
  createLead: (lead: LeadCreate) => Promise<LeadResponse | null>;
  updateLeadStatus: (id: string, updates: LeadUpdate) => Promise<LeadResponse | null>;
  assignLeadToAgent: (id: string, agentId: string) => Promise<boolean>;
  getAgentLeads: (agentId?: string) => Promise<LeadResponse[]>;
  getLeadsByStatus: (status: string) => Promise<LeadResponse[]>;
  moveLeadToNextStage: (id: string) => Promise<boolean>;
  refreshLeads: () => Promise<void>;
}

interface UseBookmarksReturn {
  bookmarks: BookmarkResponse[];
  loading: boolean;
  error: string | null;
  fetchBookmarks: () => Promise<void>;
  createBookmark: (propertyId: string) => Promise<boolean>;
  deleteBookmark: (id: string) => Promise<boolean>;
  toggleBookmark: (propertyId: string) => Promise<boolean>;
  refreshBookmarks: () => Promise<void>;
}

interface UseNotificationsReturn {
  notifications: NotificationResponse[];
  unreadCount: number;
  loading: boolean;
  error: string | null;
  fetchNotifications: () => Promise<void>;
  markAllAsRead: () => Promise<boolean>;
  markAsRead: (id: string) => Promise<boolean>;
  deleteNotification: (id: string) => Promise<boolean>;
  getUnreadCount: () => Promise<void>;
  refreshNotifications: () => Promise<void>;
}

export const useLeads = (): UseLeadsReturn => {
  const [leads, setLeads] = useState<LeadResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLeads = useCallback(async (params?: {
    status?: string;
    agent_id?: string;
    property_id?: string;
  }) => {
    setLoading(true);
    setError(null);
    try {
      const data = await crmService.getLeads(params);
      setLeads(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch leads');
      setLeads([]);
=======
import { dataService, type Lead, type LeadCreate, type LeadStatus } from '../services';

interface UseLeadsReturn {
  leads: Lead[];
  loading: boolean;
  error: string | null;
  fetchLeads: () => Promise<void>;
  createLead: (leadData: LeadCreate) => Promise<Lead | null>;
  updateLeadStatus: (id: string, status: LeadStatus) => Promise<Lead | null>;
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
      setError(err.message || 'Failed to fetch leads');
>>>>>>> main
    } finally {
      setLoading(false);
    }
  }, []);

<<<<<<< HEAD
  const createLead = useCallback(async (lead: LeadCreate): Promise<LeadResponse | null> => {
    setLoading(true);
    setError(null);
    try {
      const newLead = await crmService.createLead(lead);
      setLeads(prev => [newLead, ...prev]);
=======
  const createLead = useCallback(async (leadData: LeadCreate): Promise<Lead | null> => {
    setLoading(true);
    setError(null);
    try {
      const newLead = await dataService.createLead(leadData);
      setLeads(prev => [...prev, newLead]);
>>>>>>> main
      return newLead;
    } catch (err: any) {
      setError(err.message || 'Failed to create lead');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

<<<<<<< HEAD
  const updateLeadStatus = useCallback(async (id: string, updates: LeadUpdate): Promise<LeadResponse | null> => {
    setLoading(true);
    setError(null);
    try {
      const updatedLead = await crmService.updateLeadStatus(id, updates);
      setLeads(prev => prev.map(l => l.id === id ? updatedLead : l));
      return updatedLead;
    } catch (err: any) {
      setError(err.message || 'Failed to update lead');
=======
  const updateLeadStatus = useCallback(async (id: string, status: LeadStatus): Promise<Lead | null> => {
    setLoading(true);
    setError(null);
    try {
      const updatedLead = await dataService.updateLeadStatus(id, status);
      setLeads(prev => prev.map(l => l.id === id ? updatedLead : l));
      return updatedLead;
    } catch (err: any) {
      setError(err.message || 'Failed to update lead status');
>>>>>>> main
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

<<<<<<< HEAD
  const assignLeadToAgent = useCallback(async (id: string, agentId: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      const updatedLead = await crmService.assignLeadToAgent(id, agentId);
      setLeads(prev => prev.map(l => l.id === id ? updatedLead : l));
      return true;
    } catch (err: any) {
      setError(err.message || 'Failed to assign lead');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const getAgentLeads = useCallback(async (agentId?: string): Promise<LeadResponse[]> => {
    setLoading(true);
    setError(null);
    try {
      const data = await crmService.getAgentLeads(agentId);
      return data;
    } catch (err: any) {
      setError(err.message || 'Failed to fetch agent leads');
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const getLeadsByStatus = useCallback(async (status: string): Promise<LeadResponse[]> => {
    setLoading(true);
    setError(null);
    try {
      const data = await crmService.getLeadsByStatus(status);
      return data;
    } catch (err: any) {
      setError(err.message || 'Failed to fetch leads by status');
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const moveLeadToNextStage = useCallback(async (id: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      const updatedLead = await crmService.moveLeadToNextStage(id);
      setLeads(prev => prev.map(l => l.id === id ? updatedLead : l));
      return true;
    } catch (err: any) {
      setError(err.message || 'Failed to move lead to next stage');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshLeads = useCallback(async () => {
    await fetchLeads();
  }, [fetchLeads]);
=======
  const getLeadsByStatus = useCallback((status: LeadStatus): Lead[] => {
    return leads.filter(lead => lead.status === status);
  }, [leads]);

  const getLeadStats = useCallback(() => {
    const stats = {
      total: leads.length,
      byStatus: {
        'new': 0,
        'contacted': 0,
        'qualified': 0,
        'proposal': 0,
        'negotiation': 0,
        'reserved': 0,
        'closed': 0,
        'lost': 0,
      } as Record<LeadStatus, number>
    };

    leads.forEach(lead => {
      stats.byStatus[lead.status]++;
    });

    return stats;
  }, [leads]);
>>>>>>> main

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
<<<<<<< HEAD
    assignLeadToAgent,
    getAgentLeads,
    getLeadsByStatus,
    moveLeadToNextStage,
    refreshLeads,
  };
};

export const useBookmarks = (): UseBookmarksReturn => {
  const [bookmarks, setBookmarks] = useState<BookmarkResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBookmarks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await crmService.getBookmarks();
      setBookmarks(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch bookmarks');
      setBookmarks([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const createBookmark = useCallback(async (propertyId: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      const newBookmark = await crmService.createBookmark({ property_id: propertyId });
      setBookmarks(prev => [newBookmark, ...prev]);
      return true;
    } catch (err: any) {
      setError(err.message || 'Failed to create bookmark');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteBookmark = useCallback(async (id: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await crmService.deleteBookmark(id);
      setBookmarks(prev => prev.filter(b => b.id !== id));
      return true;
    } catch (err: any) {
      setError(err.message || 'Failed to delete bookmark');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const toggleBookmark = useCallback(async (propertyId: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      const result = await crmService.toggleBookmark(propertyId);
      if (result.bookmarked && result.bookmark) {
        setBookmarks(prev => [result.bookmark!, ...prev]);
      } else {
        setBookmarks(prev => prev.filter(b => b.property_id !== propertyId));
      }
      return true;
    } catch (err: any) {
      setError(err.message || 'Failed to toggle bookmark');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshBookmarks = useCallback(async () => {
    await fetchBookmarks();
  }, [fetchBookmarks]);

  useEffect(() => {
    fetchBookmarks();
  }, [fetchBookmarks]);

  return {
    bookmarks,
    loading,
    error,
    fetchBookmarks,
    createBookmark,
    deleteBookmark,
    toggleBookmark,
    refreshBookmarks,
  };
};

export const useNotifications = (): UseNotificationsReturn => {
  const [notifications, setNotifications] = useState<NotificationResponse[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNotifications = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await crmService.getNotifications();
      setNotifications(data);
      setUnreadCount(data.filter(n => !n.is_read).length);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch notifications');
      setNotifications([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const markAllAsRead = useCallback(async (): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await crmService.markAllNotificationsAsRead();
      setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
      setUnreadCount(0);
      return true;
    } catch (err: any) {
      setError(err.message || 'Failed to mark all notifications as read');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const markAsRead = useCallback(async (id: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      const updatedNotification = await crmService.markNotificationAsRead(id);
      setNotifications(prev => prev.map(n => n.id === id ? updatedNotification : n));
      setUnreadCount(prev => Math.max(0, prev - 1));
      return true;
    } catch (err: any) {
      setError(err.message || 'Failed to mark notification as read');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteNotification = useCallback(async (id: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await crmService.deleteNotification(id);
      const deletedNotification = notifications.find(n => n.id === id);
      setNotifications(prev => prev.filter(n => n.id !== id));
      if (deletedNotification && !deletedNotification.is_read) {
        setUnreadCount(prev => Math.max(0, prev - 1));
      }
      return true;
    } catch (err: any) {
      setError(err.message || 'Failed to delete notification');
      return false;
    } finally {
      setLoading(false);
    }
  }, [notifications]);

  const getUnreadCount = useCallback(async () => {
    try {
      const result = await crmService.getUnreadNotificationCount();
      setUnreadCount(result.count);
    } catch (err: any) {
      console.error('Failed to fetch unread count:', err);
    }
  }, []);

  const refreshNotifications = useCallback(async () => {
    await fetchNotifications();
  }, [fetchNotifications]);

  useEffect(() => {
    fetchNotifications();
    getUnreadCount();
  }, [fetchNotifications, getUnreadCount]);

  return {
    notifications,
    unreadCount,
    loading,
    error,
    fetchNotifications,
    markAllAsRead,
    markAsRead,
    deleteNotification,
    getUnreadCount,
    refreshNotifications,
  };
};
=======
    getLeadsByStatus,
    getLeadStats,
  };
};
>>>>>>> main
