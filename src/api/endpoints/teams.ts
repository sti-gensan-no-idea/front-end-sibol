// Teams API Endpoints
import api from '../core/apiService';
import { Team, TeamCreate, TeamUpdate, TeamMember } from '../types';

class TeamsAPI {
  // Get all teams
  async getTeams(): Promise<Team[]> {
    return api.get<Team[]>('/teams/');
  }

  // Create team
  async createTeam(data: TeamCreate): Promise<Team> {
    return api.post<Team>('/teams/', data);
  }

  // Get team details
  async getTeamDetails(teamId: string): Promise<Team> {
    return api.get<Team>(`/teams/${teamId}`);
  }

  // Update team
  async updateTeam(teamId: string, data: TeamUpdate): Promise<Team> {
    return api.put<Team>(`/teams/${teamId}`, data);
  }

  // Delete/Archive team
  async deleteTeam(teamId: string): Promise<void> {
    return api.delete<void>(`/teams/${teamId}`);
  }

  // Add team member
  async addTeamMember(teamId: string, data: { agent_id: string; role?: string }): Promise<TeamMember> {
    return api.post<TeamMember>(`/teams/${teamId}/members`, data);
  }

  // Get team members
  async getTeamMembers(teamId: string, params?: { skip?: number; limit?: number }): Promise<TeamMember[]> {
    return api.get<TeamMember[]>(`/teams/${teamId}/members`, { params });
  }

  // Remove team member
  async removeTeamMember(teamId: string, userId: string): Promise<void> {
    return api.delete<void>(`/teams/${teamId}/members/${userId}`);
  }

  // Get team member accomplishments
  async getTeamMemberAccomplishments(teamId: string, userId: string): Promise<any> {
    return api.get(`/teams/${teamId}/members/${userId}`);
  }

  // Add agent to team
  async addAgentToTeam(teamId: string, agentId: string): Promise<any> {
    return api.post(`/teams/${teamId}/agents`, null, {
      params: { agent_id: agentId }
    });
  }

  // Remove agent from team
  async removeAgentFromTeam(teamId: string, agentId: string): Promise<any> {
    return api.delete(`/teams/${teamId}/agents/${agentId}`);
  }

  // Update agent status
  async updateAgentStatus(teamId: string, agentId: string, isActive: boolean): Promise<any> {
    return api.put(`/teams/${teamId}/agents/${agentId}/status`, null, {
      params: { is_active: isActive }
    });
  }

  // Analytics
  async getTeamDashboardAnalytics(): Promise<any> {
    return api.get('/teams/analytics/dashboard');
  }

  async getTeamSalesAnalytics(startDate?: Date, endDate?: Date): Promise<any> {
    const params: any = {};
    if (startDate) params.start_date = startDate.toISOString();
    if (endDate) params.end_date = endDate.toISOString();
    return api.get('/teams/analytics/sales', { params });
  }

  async getTeamLeadsAnalytics(agentId?: string): Promise<any> {
    const params = agentId ? { agent_id: agentId } : undefined;
    return api.get('/teams/analytics/leads', { params });
  }

  async getTeamInventoryAnalytics(): Promise<any> {
    return api.get('/teams/analytics/inventory');
  }
}

export const teamsAPI = new TeamsAPI();
export default teamsAPI;
