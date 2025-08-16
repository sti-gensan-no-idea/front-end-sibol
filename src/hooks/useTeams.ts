import { useState, useEffect, useCallback } from "react";

import { dataService, type Team, type TeamCreate } from "../services";

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTeams = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await dataService.getTeams();

      setTeams(data);
    } catch (err: any) {
      setError(err.message || "Failed to fetch teams");
    } finally {
      setLoading(false);
    }
  }, []);

  const createTeam = useCallback(
    async (teamData: TeamCreate): Promise<Team | null> => {
      setLoading(true);
      setError(null);
      try {
        const newTeam = await dataService.createTeam(teamData);

        setTeams((prev) => [...prev, newTeam]);

        return newTeam;
      } catch (err: any) {
        setError(err.message || "Failed to create team");

        return null;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const addMember = useCallback(
    async (teamId: string, userId: string): Promise<boolean> => {
      setLoading(true);
      setError(null);
      try {
        await dataService.addTeamMember(teamId, userId);
        await fetchTeams(); // Refresh the list

        return true;
      } catch (err: any) {
        setError(err.message || "Failed to add team member");

        return false;
      } finally {
        setLoading(false);
      }
    },
    [fetchTeams],
  );

  const removeMember = useCallback(
    async (teamId: string, userId: string): Promise<boolean> => {
      setLoading(true);
      setError(null);
      try {
        await dataService.removeTeamMember(teamId, userId);
        await fetchTeams(); // Refresh the list

        return true;
      } catch (err: any) {
        setError(err.message || "Failed to remove team member");

        return false;
      } finally {
        setLoading(false);
      }
    },
    [fetchTeams],
  );

  useEffect(() => {
    fetchTeams();
  }, [fetchTeams]);

  return {
    teams,
    loading,
    error,
    fetchTeams,
    createTeam,
    addMember,
    removeMember,
  };
};
