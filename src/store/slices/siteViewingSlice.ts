// Site Viewing Redux Slice
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { siteViewingService } from '../../services/api/crmSiteViewingService';
import { SiteViewingCreate, SiteViewingUpdate, SiteViewingResponse } from '../../types/apiTypes';

interface SiteViewingState {
  viewings: SiteViewingResponse[];
  upcomingViewings: SiteViewingResponse[];
  selectedViewing: SiteViewingResponse | null;
  loading: boolean;
  error: string | null;
}

const initialState: SiteViewingState = {
  viewings: [],
  upcomingViewings: [],
  selectedViewing: null,
  loading: false,
  error: null,
};

export const scheduleSiteViewing = createAsyncThunk(
  'siteViewings/schedule',
  async (data: SiteViewingCreate) => {
    return await siteViewingService.scheduleSiteViewing(data);
  }
);

export const fetchSiteViewings = createAsyncThunk(
  'siteViewings/fetchAll',
  async (upcomingOnly: boolean = true) => {
    return await siteViewingService.getSiteViewings(upcomingOnly);
  }
);

export const updateSiteViewing = createAsyncThunk(
  'siteViewings/update',
  async ({ viewingId, data }: { viewingId: string; data: SiteViewingUpdate }) => {
    return await siteViewingService.updateSiteViewing(viewingId, data);
  }
);

export const cancelSiteViewing = createAsyncThunk(
  'siteViewings/cancel',
  async (viewingId: string) => {
    await siteViewingService.cancelSiteViewing(viewingId);
    return viewingId;
  }
);

export const confirmSiteViewing = createAsyncThunk(
  'siteViewings/confirm',
  async (viewingId: string) => {
    return await siteViewingService.confirmSiteViewing(viewingId);
  }
);

export const completeSiteViewing = createAsyncThunk(
  'siteViewings/complete',
  async ({ viewingId, notes }: { viewingId: string; notes?: string }) => {
    return await siteViewingService.completeSiteViewing(viewingId, notes);
  }
);

export const convertViewingToLead = createAsyncThunk(
  'siteViewings/convertToLead',
  async (viewingId: string) => {
    return await siteViewingService.convertToLead(viewingId);
  }
);

const siteViewingSlice = createSlice({
  name: 'siteViewings',
  initialState,
  reducers: {
    setSelectedViewing: (state, action) => {
      state.selectedViewing = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(scheduleSiteViewing.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(scheduleSiteViewing.fulfilled, (state, action) => {
        state.loading = false;
        state.viewings.unshift(action.payload);
      })
      .addCase(scheduleSiteViewing.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to schedule site viewing';
      })
      .addCase(fetchSiteViewings.fulfilled, (state, action) => {
        state.viewings = action.payload;
        state.upcomingViewings = action.payload.filter(v => 
          new Date(v.scheduled_date) > new Date()
        );
      })
      .addCase(updateSiteViewing.fulfilled, (state, action) => {
        const index = state.viewings.findIndex(v => v.id === action.payload.id);
        if (index !== -1) {
          state.viewings[index] = action.payload;
        }
      })
      .addCase(cancelSiteViewing.fulfilled, (state, action) => {
        state.viewings = state.viewings.filter(v => v.id !== action.payload);
      })
      .addCase(confirmSiteViewing.fulfilled, (state, action) => {
        const index = state.viewings.findIndex(v => v.id === action.payload.id);
        if (index !== -1) {
          state.viewings[index] = action.payload;
        }
      })
      .addCase(completeSiteViewing.fulfilled, (state, action) => {
        const index = state.viewings.findIndex(v => v.id === action.payload.id);
        if (index !== -1) {
          state.viewings[index] = action.payload;
        }
      });
  },
});

export const { setSelectedViewing, clearError } = siteViewingSlice.actions;
export default siteViewingSlice.reducer;
