// Event Redux Slice
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { eventService } from '../../services/api/eventNotificationService';
import { EventCreate, EventUpdate, EventResponse } from '../../types/apiTypes';

interface EventState {
  events: EventResponse[];
  selectedEvent: EventResponse | null;
  upcomingEvents: EventResponse[];
  loading: boolean;
  error: string | null;
}

const initialState: EventState = {
  events: [],
  selectedEvent: null,
  upcomingEvents: [],
  loading: false,
  error: null,
};

export const fetchEvents = createAsyncThunk(
  'events/fetchAll',
  async (params?: any) => {
    return await eventService.getMonthlyEvents(params);
  }
);

export const createEvent = createAsyncThunk(
  'events/create',
  async (data: EventCreate) => {
    return await eventService.createEvent(data);
  }
);

export const updateEvent = createAsyncThunk(
  'events/update',
  async ({ eventId, data }: { eventId: string; data: EventUpdate }) => {
    return await eventService.updateEvent(eventId, data);
  }
);

export const cancelEvent = createAsyncThunk(
  'events/cancel',
  async (eventId: string) => {
    await eventService.cancelEvent(eventId);
    return eventId;
  }
);

export const fetchUpcomingEvents = createAsyncThunk(
  'events/fetchUpcoming',
  async (limit: number = 10) => {
    return await eventService.getUpcomingEvents(limit);
  }
);

const eventSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    setSelectedEvent: (state, action) => {
      state.selectedEvent = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch events';
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        state.events.unshift(action.payload);
      })
      .addCase(updateEvent.fulfilled, (state, action) => {
        const index = state.events.findIndex(e => e.id === action.payload.id);
        if (index !== -1) {
          state.events[index] = action.payload;
        }
      })
      .addCase(cancelEvent.fulfilled, (state, action) => {
        state.events = state.events.filter(e => e.id !== action.payload);
      })
      .addCase(fetchUpcomingEvents.fulfilled, (state, action) => {
        state.upcomingEvents = action.payload;
      });
  },
});

export const { setSelectedEvent, clearError } = eventSlice.actions;
export default eventSlice.reducer;
