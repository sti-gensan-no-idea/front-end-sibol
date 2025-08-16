import { useState, useEffect, useCallback } from 'react';
<<<<<<< HEAD
import { 
  teamService, 
  type TeamResponse, 
  type TeamDetailResponse, 
  type TeamCreate, 
  type TeamUpdate,
  type TeamMemberCreate 
} from '../services';

interface UseTeamsReturn {
  teams: TeamResponse[];
  loading: boolean;
  error: string | null;
  selectedTeam: TeamDetailResponse | null;
  fetchTeams: () => Promise<void>;
  getTeamById: (id: string) => Promise<TeamDetailResponse | null>;
  createTeam: (team: TeamCreate) => Promise<TeamResponse | null>;
  updateTeam: (id: string, updates: TeamUpdate) => Promise<TeamResponse | null>;
  deleteTeam: (id: string) => Promise<boolean>;
  addTeamMember: (teamId: string, member: TeamMemberCreate) => Promise<boolean>;
  removeTeamMember: (teamId: string, userId: string) => Promise<boolean>;
  getTeamStatistics: (teamId: string) => Promise<any>;
  assignPropertyToTeam: (teamId: string, propertyId: string) => Promise<boolean>;
  refreshTeams: () => Promise<void>;
}

export const useTeams = (): UseTeamsReturn => {
  const [teams, setTeams] = useState<TeamResponse[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<TeamDetailResponse | null>(null);
=======
import { dataService, type Team, type TeamCreate } from '../services';

interface UseTeamsReturn {
  teams: Team[];
  loading: boolean;
  error: string | null;
  fetchTeams: () => Promise<void>;
  createTeam: (teamData: TeamCreate) => Promise<Team | null>;
  addMember: (teamId: string, userId: string) => Promise<boolean>;
  removeMember: (teamId: string, userId: string) => Promise<boolean>;
}

export const useTeams = (): UseTeamsReturn => {
  const [teams, setTeams] = useState<Team[]>([]);
>>>>>>> main
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTeams = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
<<<<<<< HEAD
      const data = await teamService.getTeams();
      setTeams(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch teams');
      setTeams([]);
=======
      const data = await dataService.getTeams();
      setTeams(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch teams');
>>>>>>> main
    } finally {
      setLoading(false);
    }
  }, []);

<<<<<<< HEAD
  const getTeamById = useCallback(async (id: string): Promise<TeamDetailResponse | null> => {
    setLoading(true);
    setError(null);
    try {
      const team = await teamService.getTeamById(id);
      setSelectedTeam(team);
      return team;
    } catch (err: any) {
      setError(err.message || 'Failed to fetch team details');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const createTeam = useCallback(async (team: TeamCreate): Promise<TeamResponse | null> => {
    setLoading(true);
    setError(null);
    try {
      const newTeam = await teamService.createTeam(team);
      setTeams(prev => [newTeam, ...prev]);
=======
  const createTeam = useCallback(async (teamData: TeamCreate): Promise<Team | null> => {
    setLoading(true);
    setError(null);
    try {
      const newTeam = await dataService.createTeam(teamData);
      setTeams(prev => [...prev, newTeam]);
>>>>>>> main
      return newTeam;
    } catch (err: any) {
      setError(err.message || 'Failed to create team');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

<<<<<<< HEAD
  const updateTeam = useCallback(async (id: string, updates: TeamUpdate): Promise<TeamResponse | null> => {
    setLoading(true);
    setError(null);
    try {
      const updatedTeam = await teamService.updateTeam(id, updates);
      setTeams(prev => prev.map(t => t.id === id ? updatedTeam : t));
      return updatedTeam;
    } catch (err: any) {
      setError(err.message || 'Failed to update team');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteTeam = useCallback(async (id: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await teamService.deleteTeam(id);
      setTeams(prev => prev.filter(t => t.id !== id));
      if (selectedTeam?.id === id) {
        setSelectedTeam(null);
      }
      return true;
    } catch (err: any) {
      setError(err.message || 'Failed to delete team');
      return false;
    } finally {
      setLoading(false);
    }
  }, [selectedTeam?.id]);

  const addTeamMember = useCallback(async (teamId: string, member: TeamMemberCreate): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await teamService.addTeamMember(teamId, member);
      // Refresh team details if it's the selected team
      if (selectedTeam?.id === teamId) {
        await getTeamById(teamId);
      }
      // Update teams list to reflect new member count
      await fetchTeams();
=======
  const addMember = useCallback(async (teamId: string, userId: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await dataService.addTeamMember(teamId, userId);
      await fetchTeams(); // Refresh the list
>>>>>>> main
      return true;
    } catch (err: any) {
      setError(err.message || 'Failed to add team member');
      return false;
    } finally {
      setLoading(false);
    }
<<<<<<< HEAD
  }, [selectedTeam?.id, getTeamById, fetchTeams]);

  const removeTeamMember = useCallback(async (teamId: string, userId: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await teamService.removeTeamMember(teamId, userId);
      // Refresh team details if it's the selected team
      if (selectedTeam?.id === teamId) {
        await getTeamById(teamId);
      }
      // Update teams list to reflect new member count
      await fetchTeams();
=======
  }, [fetchTeams]);

  const removeMember = useCallback(async (teamId: string, userId: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await dataService.removeTeamMember(teamId, userId);
      await fetchTeams(); // Refresh the list
>>>>>>> main
      return true;
    } catch (err: any) {
      setError(err.message || 'Failed to remove team member');
      return false;
    } finally {
      setLoading(false);
    }
<<<<<<< HEAD
  }, [selectedTeam?.id, getTeamById, fetchTeams]);

  const getTeamStatistics = useCallback(async (teamId: string) => {
    setLoading(true);
    setError(null);
    try {
      const stats = await teamService.getTeamStatistics(teamId);
      return stats;
    } catch (err: any) {
      setError(err.message || 'Failed to fetch team statistics');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const assignPropertyToTeam = useCallback(async (teamId: string, propertyId: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await teamService.assignPropertyToTeam(teamId, propertyId);
      return true;
    } catch (err: any) {
      setError(err.message || 'Failed to assign property to team');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshTeams = useCallback(async () => {
    await fetchTeams();
=======
>>>>>>> main
  }, [fetchTeams]);

  useEffect(() => {
    fetchTeams();
  }, [fetchTeams]);

  return {
    teams,
    loading,
    error,
<<<<<<< HEAD
    selectedTeam,
    fetchTeams,
    getTeamById,
    createTeam,
    updateTeam,
    deleteTeam,
    addTeamMember,
    removeTeamMember,
    getTeamStatistics,
    assignPropertyToTeam,
    refreshTeams,
  };
};
=======
    fetchTeams,
    createTeam,
    addMember,
    removeMember,
  };
};
>>>>>>> main
