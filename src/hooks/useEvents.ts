import { useState, useEffect, useCallback } from 'react';
import { 
  eventService, 
  type EventResponse, 
  type EventDetailResponse, 
  type EventCreate, 
  type EventUpdate 
} from '../services';

interface UseEventsOptions {
  autoFetch?: boolean;
  filters?: {
    event_type?: string;
    status?: string;
    start_date?: string;
    end_date?: string;
    property_id?: string;
  };
}

interface UseEventsReturn {
  events: EventResponse[];
  loading: boolean;
  error: string | null;
  selectedEvent: EventDetailResponse | null;
  upcomingEvents: EventResponse[];
  fetchEvents: (params?: {
    event_type?: string;
    status?: string;
    start_date?: string;
    end_date?: string;
    property_id?: string;
  }) => Promise<void>;
  getEventById: (id: string) => Promise<EventDetailResponse | null>;
  createEvent: (event: EventCreate) => Promise<EventResponse | null>;
  updateEvent: (id: string, updates: EventUpdate) => Promise<EventResponse | null>;
  deleteEvent: (id: string) => Promise<boolean>;
  getUpcomingEvents: (limit?: number) => Promise<void>;
  getCalendarEvents: (startDate: string, endDate: string) => Promise<EventResponse[]>;
  getMyEvents: () => Promise<EventResponse[]>;
  markEventCompleted: (id: string, notes?: string) => Promise<boolean>;
  cancelEvent: (id: string, reason?: string) => Promise<boolean>;
  refreshEvents: () => Promise<void>;
}

export const useEvents = (options: UseEventsOptions = {}): UseEventsReturn => {
  const { autoFetch = true, filters } = options;
  
  const [events, setEvents] = useState<EventResponse[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<EventDetailResponse | null>(null);
  const [upcomingEvents, setUpcomingEvents] = useState<EventResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = useCallback(async (params?: {
    event_type?: string;
    status?: string;
    start_date?: string;
    end_date?: string;
    property_id?: string;
  }) => {
    setLoading(true);
    setError(null);
    try {
      const queryParams = { ...filters, ...params };
      const data = await eventService.getEvents(queryParams);
      setEvents(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch events');
      setEvents([]);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  const getEventById = useCallback(async (id: string): Promise<EventDetailResponse | null> => {
    setLoading(true);
    setError(null);
    try {
      const event = await eventService.getEventById(id);
      setSelectedEvent(event);
      return event;
    } catch (err: any) {
      setError(err.message || 'Failed to fetch event details');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const createEvent = useCallback(async (event: EventCreate): Promise<EventResponse | null> => {
    setLoading(true);
    setError(null);
    try {
      const newEvent = await eventService.createEvent(event);
      setEvents(prev => [newEvent, ...prev]);
      return newEvent;
    } catch (err: any) {
      setError(err.message || 'Failed to create event');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateEvent = useCallback(async (id: string, updates: EventUpdate): Promise<EventResponse | null> => {
    setLoading(true);
    setError(null);
    try {
      const updatedEvent = await eventService.updateEvent(id, updates);
      setEvents(prev => prev.map(e => e.id === id ? updatedEvent : e));
      return updatedEvent;
    } catch (err: any) {
      setError(err.message || 'Failed to update event');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteEvent = useCallback(async (id: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await eventService.deleteEvent(id);
      setEvents(prev => prev.filter(e => e.id !== id));
      if (selectedEvent?.id === id) {
        setSelectedEvent(null);
      }
      return true;
    } catch (err: any) {
      setError(err.message || 'Failed to delete event');
      return false;
    } finally {
      setLoading(false);
    }
  }, [selectedEvent?.id]);

  const getUpcomingEvents = useCallback(async (limit: number = 10) => {
    setLoading(true);
    setError(null);
    try {
      const data = await eventService.getUpcomingEvents(limit);
      setUpcomingEvents(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch upcoming events');
      setUpcomingEvents([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const getCalendarEvents = useCallback(async (startDate: string, endDate: string): Promise<EventResponse[]> => {
    setLoading(true);
    setError(null);
    try {
      const data = await eventService.getCalendarEvents(startDate, endDate);
      return data;
    } catch (err: any) {
      setError(err.message || 'Failed to fetch calendar events');
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const getMyEvents = useCallback(async (): Promise<EventResponse[]> => {
    setLoading(true);
    setError(null);
    try {
      const data = await eventService.getMyEvents();
      return data;
    } catch (err: any) {
      setError(err.message || 'Failed to fetch my events');
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const markEventCompleted = useCallback(async (id: string, notes?: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      const updatedEvent = await eventService.markEventCompleted(id, notes);
      setEvents(prev => prev.map(e => e.id === id ? updatedEvent : e));
      return true;
    } catch (err: any) {
      setError(err.message || 'Failed to mark event as completed');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const cancelEvent = useCallback(async (id: string, reason?: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      const updatedEvent = await eventService.cancelEvent(id, reason);
      setEvents(prev => prev.map(e => e.id === id ? updatedEvent : e));
      return true;
    } catch (err: any) {
      setError(err.message || 'Failed to cancel event');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshEvents = useCallback(async () => {
    await fetchEvents();
    await getUpcomingEvents();
  }, [fetchEvents, getUpcomingEvents]);

  useEffect(() => {
    if (autoFetch) {
      fetchEvents();
      getUpcomingEvents();
    }
  }, [autoFetch, fetchEvents, getUpcomingEvents]);

  return {
    events,
    loading,
    error,
    selectedEvent,
    upcomingEvents,
    fetchEvents,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent,
    getUpcomingEvents,
    getCalendarEvents,
    getMyEvents,
    markEventCompleted,
    cancelEvent,
    refreshEvents,
  };
};