import { useState, useEffect, useCallback } from 'react';
import { dataService, type Event, type EventCreate } from '../services';

interface UseEventsReturn {
  events: Event[];
  loading: boolean;
  error: string | null;
  fetchEvents: () => Promise<void>;
  createEvent: (eventData: EventCreate) => Promise<Event | null>;
  updateEvent: (id: string, eventData: Partial<EventCreate>) => Promise<Event | null>;
  deleteEvent: (id: string) => Promise<boolean>;
  getEventsForDate: (date: string) => Event[];
  getUpcomingEvents: (days?: number) => Event[];
}

export const useEvents = (): UseEventsReturn => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await dataService.getEvents();
      setEvents(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch events');
    } finally {
      setLoading(false);
    }
  }, []);

  const createEvent = useCallback(async (eventData: EventCreate): Promise<Event | null> => {
    setLoading(true);
    setError(null);
    try {
      const newEvent = await dataService.createEvent(eventData);
      setEvents(prev => [...prev, newEvent]);
      return newEvent;
    } catch (err: any) {
      setError(err.message || 'Failed to create event');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateEvent = useCallback(async (id: string, eventData: Partial<EventCreate>): Promise<Event | null> => {
    setLoading(true);
    setError(null);
    try {
      const updatedEvent = await dataService.updateEvent(id, eventData);
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
      await dataService.deleteEvent(id);
      setEvents(prev => prev.filter(e => e.id !== id));
      return true;
    } catch (err: any) {
      setError(err.message || 'Failed to delete event');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const getEventsForDate = useCallback((date: string): Event[] => {
    return events.filter(event => {
      const eventDate = new Date(event.start_time).toDateString();
      const targetDate = new Date(date).toDateString();
      return eventDate === targetDate;
    });
  }, [events]);

  const getUpcomingEvents = useCallback((days: number = 7): Event[] => {
    const now = new Date();
    const futureDate = new Date();
    futureDate.setDate(now.getDate() + days);

    return events
      .filter(event => {
        const eventDate = new Date(event.start_time);
        return eventDate >= now && eventDate <= futureDate;
      })
      .sort((a, b) => new Date(a.start_time).getTime() - new Date(b.start_time).getTime());
  }, [events]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  return {
    events,
    loading,
    error,
    fetchEvents,
    createEvent,
    updateEvent,
    deleteEvent,
    getEventsForDate,
    getUpcomingEvents,
  };
};
