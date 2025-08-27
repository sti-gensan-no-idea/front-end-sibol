// Teams API Service
import { apiClient } from './apiClient';
import {
  Team,
  TeamCreate,
  TeamUpdate,
  TeamResponse,
  TeamMember,
  TeamMemberCreate,
  TeamMemberResponse,
  AgentAccomplishmentsResponse,
} from '../../types/api';

class TeamService {
  // Get teams
  async getTeams(): Promise<Team[]> {
    return apiClient.get<Team[]>('/teams/');
  }

  // Create team
  async createTeam(data: TeamCreate): Promise<TeamResponse> {
    return apiClient.post<TeamResponse>('/teams/', data);
  }

  // Get team details
  async getTeamDetails(teamId: string): Promise<Team> {
    return apiClient.get<Team>(`/teams/${teamId}`);
  }

  // Update team
  async updateTeam(teamId: string, data: TeamUpdate): Promise<TeamResponse> {
    return apiClient.put<TeamResponse>(`/teams/${teamId}`, data);
  }

  // Archive team
  async archiveTeam(teamId: string): Promise<void> {
    return apiClient.delete<void>(`/teams/${teamId}`);
  }

  // Add team member
  async addTeamMember(teamId: string, data: TeamMemberCreate): Promise<TeamMemberResponse> {
    return apiClient.post<TeamMemberResponse>(`/teams/${teamId}/members`, data);
  }

  // Get team members
  async getTeamMembers(
    teamId: string,
    params?: { skip?: number; limit?: number }
  ): Promise<TeamMemberResponse[]> {
    return apiClient.get<TeamMemberResponse[]>(`/teams/${teamId}/members`, { params });
  }

  // Get team member accomplishments
  async getTeamMemberAccomplishments(
    teamId: string,
    userId: string
  ): Promise<AgentAccomplishmentsResponse> {
    return apiClient.get<AgentAccomplishmentsResponse>(
      `/teams/${teamId}/members/${userId}`
    );
  }

  // Remove team member
  async removeTeamMember(teamId: string, userId: string): Promise<void> {
    return apiClient.delete<void>(`/teams/${teamId}/members/${userId}`);
  }

  // Add agent to team
  async addAgentToTeam(teamId: string, agentId: string): Promise<any> {
    return apiClient.post<any>(`/teams/${teamId}/agents?agent_id=${agentId}`);
  }

  // Remove agent from team
  async removeAgentFromTeam(teamId: string, agentId: string): Promise<any> {
    return apiClient.delete<any>(`/teams/${teamId}/agents/${agentId}`);
  }

  // Update agent status in team
  async updateAgentStatus(
    teamId: string,
    agentId: string,
    isActive: boolean
  ): Promise<any> {
    return apiClient.put<any>(
      `/teams/${teamId}/agents/${agentId}/status?is_active=${isActive}`
    );
  }

  // Team Analytics
  async getTeamDashboardAnalytics(): Promise<any> {
    return apiClient.get<any>('/teams/analytics/dashboard');
  }

  async getTeamSalesAnalytics(startDate?: Date, endDate?: Date): Promise<any> {
    const params: any = {};
    if (startDate) params.start_date = startDate.toISOString();
    if (endDate) params.end_date = endDate.toISOString();
    
    return apiClient.get<any>('/teams/analytics/sales', { params });
  }

  async getTeamLeadsAnalytics(agentId?: string): Promise<any> {
    const params = agentId ? { agent_id: agentId } : undefined;
    return apiClient.get<any>('/teams/analytics/leads', { params });
  }

  async getTeamInventoryAnalytics(): Promise<any> {
    return apiClient.get<any>('/teams/analytics/inventory');
  }
}

export const teamService = new TeamService();
export default teamService;
