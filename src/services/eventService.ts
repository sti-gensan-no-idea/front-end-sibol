import apiService from "./apiService";

export interface EventResponse {
  id: string;
  title: string;
  description?: string;
  event_type: string;
  scheduled_date: string;
  status: string;
  creator_id: string;
  property_id?: string;
  created_at: string;
}

export interface EventDetailResponse extends EventResponse {
  attendees: Array<{
    id: string;
    email: string;
    first_name?: string;
    last_name?: string;
    role: string;
  }>;
  notes?: string;
}

export interface EventCreate {
  title: string;
  description?: string;
  event_type: string;
  scheduled_date: string;
  property_id?: string;
}

export interface EventUpdate {
  title?: string;
  description?: string;
  scheduled_date?: string;
  status?: string;
}

export class EventService {
  // Get all events with optional filters
  async getEvents(params?: {
    event_type?: string;
    status?: string;
    start_date?: string;
    end_date?: string;
    property_id?: string;
  }): Promise<EventResponse[]> {
    const queryParams = new URLSearchParams();

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, value.toString());
        }
      });
    }

    const endpoint = `/events${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;

    return apiService.get(endpoint);
  }

  // Get event by ID
  async getEventById(id: string): Promise<EventDetailResponse> {
    return apiService.get(`/events/${id}`);
  }

  // Create event
  async createEvent(event: EventCreate): Promise<EventResponse> {
    return apiService.post("/events/", event);
  }

  // Update event
  async updateEvent(id: string, updates: EventUpdate): Promise<EventResponse> {
    return apiService.put(`/events/${id}`, updates);
  }

  // Delete event
  async deleteEvent(id: string): Promise<{ message: string }> {
    return apiService.delete(`/events/${id}`);
  }

  // Get upcoming events
  async getUpcomingEvents(limit: number = 10): Promise<EventResponse[]> {
    return apiService.get(`/events/upcoming?limit=${limit}`);
  }

  // Get events for calendar view
  async getCalendarEvents(
    startDate: string,
    endDate: string,
  ): Promise<EventResponse[]> {
    return apiService.get(
      `/events/calendar?start_date=${startDate}&end_date=${endDate}`,
    );
  }

  // Get user's events
  async getMyEvents(): Promise<EventResponse[]> {
    return apiService.get("/events/my-events");
  }

  // Get events by property
  async getPropertyEvents(propertyId: string): Promise<EventResponse[]> {
    return apiService.get(`/events/property/${propertyId}`);
  }

  // Add attendee to event
  async addAttendee(
    eventId: string,
    userId: string,
  ): Promise<{ message: string }> {
    return apiService.post(`/events/${eventId}/attendees`, { user_id: userId });
  }

  // Remove attendee from event
  async removeAttendee(
    eventId: string,
    userId: string,
  ): Promise<{ message: string }> {
    return apiService.delete(`/events/${eventId}/attendees/${userId}`);
  }

  // Mark event as completed
  async markEventCompleted(
    eventId: string,
    notes?: string,
  ): Promise<EventResponse> {
    return apiService.put(`/events/${eventId}/complete`, { notes });
  }

  // Cancel event
  async cancelEvent(eventId: string, reason?: string): Promise<EventResponse> {
    return apiService.put(`/events/${eventId}/cancel`, { reason });
  }
}

export const eventService = new EventService();
export default eventService;
