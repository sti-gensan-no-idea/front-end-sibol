// Teams Redux Slice
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { teamService } from '../../services/api/teamService';
import { Team, TeamCreate, TeamUpdate, TeamResponse, TeamMemberResponse } from '../../types/apiTypes';

interface TeamState {
  teams: Team[];
  selectedTeam: Team | null;
  teamMembers: TeamMemberResponse[];
  loading: boolean;
  error: string | null;
  analytics: {
    dashboard: any;
    sales: any;
    leads: any;
    inventory: any;
  };
}

const initialState: TeamState = {
  teams: [],
  selectedTeam: null,
  teamMembers: [],
  loading: false,
  error: null,
  analytics: {
    dashboard: null,
    sales: null,
    leads: null,
    inventory: null,
  },
};

// Async thunks
export const fetchTeams = createAsyncThunk(
  'teams/fetchAll',
  async () => {
    return await teamService.getTeams();
  }
);

export const fetchTeamDetails = createAsyncThunk(
  'teams/fetchDetails',
  async (teamId: string) => {
    return await teamService.getTeamDetails(teamId);
  }
);

export const createTeam = createAsyncThunk(
  'teams/create',
  async (data: TeamCreate) => {
    return await teamService.createTeam(data);
  }
);

export const updateTeam = createAsyncThunk(
  'teams/update',
  async ({ teamId, data }: { teamId: string; data: TeamUpdate }) => {
    return await teamService.updateTeam(teamId, data);
  }
);

export const deleteTeam = createAsyncThunk(
  'teams/delete',
  async (teamId: string) => {
    await teamService.archiveTeam(teamId);
    return teamId;
  }
);

export const fetchTeamMembers = createAsyncThunk(
  'teams/fetchMembers',
  async ({ teamId, params }: { teamId: string; params?: any }) => {
    return await teamService.getTeamMembers(teamId, params);
  }
);

export const addTeamMember = createAsyncThunk(
  'teams/addMember',
  async ({ teamId, data }: { teamId: string; data: any }) => {
    return await teamService.addTeamMember(teamId, data);
  }
);

export const removeTeamMember = createAsyncThunk(
  'teams/removeMember',
  async ({ teamId, userId }: { teamId: string; userId: string }) => {
    await teamService.removeTeamMember(teamId, userId);
    return userId;
  }
);

export const fetchTeamAnalytics = createAsyncThunk(
  'teams/fetchAnalytics',
  async (type: 'dashboard' | 'sales' | 'leads' | 'inventory') => {
    switch (type) {
      case 'dashboard':
        return { type, data: await teamService.getTeamDashboardAnalytics() };
      case 'sales':
        return { type, data: await teamService.getTeamSalesAnalytics() };
      case 'leads':
        return { type, data: await teamService.getTeamLeadsAnalytics() };
      case 'inventory':
        return { type, data: await teamService.getTeamInventoryAnalytics() };
    }
  }
);

const teamSlice = createSlice({
  name: 'teams',
  initialState,
  reducers: {
    setSelectedTeam: (state, action: PayloadAction<Team | null>) => {
      state.selectedTeam = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch teams
    builder
      .addCase(fetchTeams.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTeams.fulfilled, (state, action) => {
        state.loading = false;
        state.teams = action.payload;
      })
      .addCase(fetchTeams.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch teams';
      });

    // Fetch team details
    builder
      .addCase(fetchTeamDetails.fulfilled, (state, action) => {
        state.selectedTeam = action.payload;
      });

    // Create team
    builder
      .addCase(createTeam.fulfilled, (state, action) => {
        state.teams.push(action.payload as any);
      });

    // Update team
    builder
      .addCase(updateTeam.fulfilled, (state, action) => {
        const index = state.teams.findIndex(t => t.id === action.payload.id);
        if (index !== -1) {
          state.teams[index] = action.payload as any;
        }
        if (state.selectedTeam?.id === action.payload.id) {
          state.selectedTeam = action.payload as any;
        }
      });

    // Delete team
    builder
      .addCase(deleteTeam.fulfilled, (state, action) => {
        state.teams = state.teams.filter(t => t.id !== action.payload);
      });

    // Team members
    builder
      .addCase(fetchTeamMembers.fulfilled, (state, action) => {
        state.teamMembers = action.payload;
      })
      .addCase(addTeamMember.fulfilled, (state, action) => {
        state.teamMembers.push(action.payload);
      })
      .addCase(removeTeamMember.fulfilled, (state, action) => {
        state.teamMembers = state.teamMembers.filter(m => m.agent_id !== action.payload);
      });

    // Analytics
    builder
      .addCase(fetchTeamAnalytics.fulfilled, (state, action) => {
        state.analytics[action.payload.type] = action.payload.data;
      });
  },
});

export const { setSelectedTeam, clearError } = teamSlice.actions;
export default teamSlice.reducer;
