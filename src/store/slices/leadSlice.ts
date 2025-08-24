// Lead/CRM Redux Slice
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { crmService } from '../../services/api/crmSiteViewingService';
import { LeadCreate, LeadResponse, LeadStatusEnum } from '../../types/apiTypes';

interface LeadState {
  leads: LeadResponse[];
  selectedLead: LeadResponse | null;
  pipelineSummary: any;
  conversionMetrics: any;
  loading: boolean;
  error: string | null;
}

const initialState: LeadState = {
  leads: [],
  selectedLead: null,
  pipelineSummary: null,
  conversionMetrics: null,
  loading: false,
  error: null,
};

export const createLead = createAsyncThunk(
  'leads/create',
  async (data: LeadCreate) => {
    return await crmService.createLead(data);
  }
);

export const fetchLeads = createAsyncThunk(
  'leads/fetchAll',
  async (params?: { status?: LeadStatusEnum; agent_id?: string }) => {
    return await crmService.getLeads(params);
  }
);

export const fetchLeadDetails = createAsyncThunk(
  'leads/fetchDetails',
  async (leadId: string) => {
    return await crmService.getLeadDetails(leadId);
  }
);

export const updateLeadStatus = createAsyncThunk(
  'leads/updateStatus',
  async ({ leadId, newStatus, notes }: {
    leadId: string;
    newStatus: LeadStatusEnum;
    notes?: string;
  }) => {
    return await crmService.updateLeadStatus(leadId, newStatus, notes);
  }
);

export const fetchPipelineSummary = createAsyncThunk(
  'leads/fetchPipelineSummary',
  async (agentId?: string) => {
    return await crmService.getPipelineSummary(agentId);
  }
);

export const moveLeadThroughPipeline = createAsyncThunk(
  'leads/moveThroughPipeline',
  async ({ leadId, fromStatus, toStatus }: {
    leadId: string;
    fromStatus: LeadStatusEnum;
    toStatus: LeadStatusEnum;
  }) => {
    return await crmService.moveLeadThroughPipeline(leadId, fromStatus, toStatus);
  }
);

export const fetchConversionMetrics = createAsyncThunk(
  'leads/fetchConversionMetrics',
  async (agentId?: string) => {
    return await crmService.getConversionMetrics(agentId);
  }
);

const leadSlice = createSlice({
  name: 'leads',
  initialState,
  reducers: {
    setSelectedLead: (state, action) => {
      state.selectedLead = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createLead.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createLead.fulfilled, (state, action) => {
        state.loading = false;
        state.leads.unshift(action.payload);
      })
      .addCase(createLead.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create lead';
      })
      .addCase(fetchLeads.fulfilled, (state, action) => {
        state.leads = action.payload;
      })
      .addCase(fetchLeadDetails.fulfilled, (state, action) => {
        state.selectedLead = action.payload;
      })
      .addCase(updateLeadStatus.fulfilled, (state, action) => {
        const index = state.leads.findIndex(l => l.id === action.payload.id);
        if (index !== -1) {
          state.leads[index] = action.payload;
        }
        if (state.selectedLead?.id === action.payload.id) {
          state.selectedLead = action.payload;
        }
      })
      .addCase(fetchPipelineSummary.fulfilled, (state, action) => {
        state.pipelineSummary = action.payload;
      })
      .addCase(moveLeadThroughPipeline.fulfilled, (state, action) => {
        const index = state.leads.findIndex(l => l.id === action.payload.id);
        if (index !== -1) {
          state.leads[index] = action.payload;
        }
      })
      .addCase(fetchConversionMetrics.fulfilled, (state, action) => {
        state.conversionMetrics = action.payload;
      });
  },
});

export const { setSelectedLead, clearError } = leadSlice.actions;
export default leadSlice.reducer;
