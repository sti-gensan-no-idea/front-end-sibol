import apiService from "./apiService";

export interface TeamResponse {
  id: string;
  broker_id: string;
  name: string;
  description?: string;
  is_active: boolean;
  member_count: number;
  created_at: string;
  updated_at?: string;
}

export interface TeamDetailResponse extends TeamResponse {
  members: AgentResponse[];
}

export interface AgentResponse {
  id: string;
  user_id: string;
  broker_id: string;
  cpd_certificate?: string;
  cpd_expiry?: string;
  is_active_in_team: boolean;
  created_at: string;
}

export interface TeamCreate {
  name: string;
  description?: string;
}

export interface TeamUpdate {
  name?: string;
  description?: string;
  is_active?: boolean;
}

export interface TeamMemberCreate {
  agent_id: string;
  role?: string;
}

export interface TeamMemberResponse {
  id: string;
  team_id: string;
  agent_id: string;
  role: string;
  joined_date: string;
  agent: AgentResponse;
}

export class TeamService {
  // Get all teams (broker's teams)
  async getTeams(): Promise<TeamResponse[]> {
    return apiService.get("/teams/");
  }

  // Get team by ID
  async getTeamById(id: string): Promise<TeamDetailResponse> {
    return apiService.get(`/teams/${id}`);
  }

  // Create team
  async createTeam(team: TeamCreate): Promise<TeamResponse> {
    return apiService.post("/teams/", team);
  }

  // Update team
  async updateTeam(id: string, updates: TeamUpdate): Promise<TeamResponse> {
    return apiService.put(`/teams/${id}`, updates);
  }

  // Delete team
  async deleteTeam(id: string): Promise<{ message: string }> {
    return apiService.delete(`/teams/${id}`);
  }

  // Add member to team
  async addTeamMember(
    teamId: string,
    member: TeamMemberCreate,
  ): Promise<TeamMemberResponse> {
    return apiService.post(`/teams/${teamId}/members`, member);
  }

  // Remove member from team
  async removeTeamMember(
    teamId: string,
    userId: string,
  ): Promise<{ message: string }> {
    return apiService.delete(`/teams/${teamId}/members/${userId}`);
  }

  // Get team statistics
  async getTeamStatistics(teamId: string): Promise<{
    total_members: number;
    active_members: number;
    total_leads: number;
    conversion_rate: number;
    total_revenue: number;
    top_performers: Array<{
      agent_id: string;
      agent_name: string;
      leads_count: number;
      conversion_rate: number;
      revenue: number;
    }>;
  }> {
    return apiService.get(`/teams/${teamId}/statistics`);
  }

  // Get available agents for team assignment
  async getAvailableAgents(): Promise<AgentResponse[]> {
    return apiService.get("/teams/available-agents");
  }

  // Assign property to team
  async assignPropertyToTeam(
    teamId: string,
    propertyId: string,
  ): Promise<{
    team_id: string;
    property_id: string;
    assigned_date: string;
  }> {
    return apiService.post(`/teams/${teamId}/assign-property`, {
      property_id: propertyId,
    });
  }

  // Get team performance metrics
  async getTeamPerformance(
    teamId: string,
    period?: string,
  ): Promise<{
    leads_generated: number;
    conversions: number;
    revenue: number;
    properties_sold: number;
    average_deal_size: number;
    period: string;
  }> {
    const params = period ? `?period=${period}` : "";

    return apiService.get(`/teams/${teamId}/performance${params}`);
  }
}

export const teamService = new TeamService();
export default teamService;
