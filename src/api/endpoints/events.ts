// Events API Endpoints
import api from '../core/apiService';
import { Event, EventCreate } from '../types';

class EventsAPI {
  async getMonthlyEvents(params?: {
    skip?: number;
    limit?: number;
    month?: number;
    year?: number;
  }): Promise<Event[]> {
    return api.get<Event[]>('/events/', { params });
  }

  async createEvent(data: EventCreate): Promise<Event> {
    return api.post<Event>('/events/', data);
  }

  async getEventDetails(eventId: string): Promise<Event> {
    return api.get<Event>(`/events/${eventId}`);
  }

  async updateEvent(eventId: string, data: Partial<EventCreate>): Promise<Event> {
    return api.put<Event>(`/events/${eventId}`, data);
  }

  async cancelEvent(eventId: string): Promise<void> {
    return api.delete<void>(`/events/${eventId}`);
  }

  async getUpcomingEvents(limit: number = 10): Promise<Event[]> {
    const now = new Date();
    return this.getMonthlyEvents({
      month: now.getMonth() + 1,
      year: now.getFullYear(),
      limit
    });
  }

  async getEventsByProperty(propertyId: string): Promise<Event[]> {
    const allEvents = await this.getMonthlyEvents({ limit: 100 });
    return allEvents.filter(event => event.property_id === propertyId);
  }
}

export const eventsAPI = new EventsAPI();
export default eventsAPI;
