import { useState, useEffect, useCallback } from "react";

import {
  dataService,
  type MaintenanceRequest,
  type MaintenanceRequestCreate,
  type MaintenancePriority,
  type MaintenanceStatus,
} from "../services";

interface UseMaintenanceReturn {
  maintenanceRequests: MaintenanceRequest[];
  loading: boolean;
  error: string | null;
  fetchMaintenanceRequests: () => Promise<void>;
  createMaintenanceRequest: (
    requestData: MaintenanceRequestCreate,
  ) => Promise<MaintenanceRequest | null>;
  updateMaintenanceRequest: (
    id: string,
    requestData: Partial<MaintenanceRequestCreate>,
  ) => Promise<MaintenanceRequest | null>;
  updateStatus: (id: string, status: MaintenanceStatus) => Promise<boolean>;
  getRequestsByStatus: (status: MaintenanceStatus) => MaintenanceRequest[];
  getRequestsByPriority: (
    priority: MaintenancePriority,
  ) => MaintenanceRequest[];
  getUrgentRequests: () => MaintenanceRequest[];
}

export const useMaintenance = (): UseMaintenanceReturn => {
  const [maintenanceRequests, setMaintenanceRequests] = useState<
    MaintenanceRequest[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMaintenanceRequests = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await dataService.getMaintenanceRequests();

      setMaintenanceRequests(data);
    } catch (err: any) {
      setError(err.message || "Failed to fetch maintenance requests");
    } finally {
      setLoading(false);
    }
  }, []);

  const createMaintenanceRequest = useCallback(
    async (
      requestData: MaintenanceRequestCreate,
    ): Promise<MaintenanceRequest | null> => {
      setLoading(true);
      setError(null);
      try {
        const newRequest =
          await dataService.createMaintenanceRequest(requestData);

        setMaintenanceRequests((prev) => [...prev, newRequest]);

        return newRequest;
      } catch (err: any) {
        setError(err.message || "Failed to create maintenance request");

        return null;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const updateMaintenanceRequest = useCallback(
    async (
      id: string,
      requestData: Partial<MaintenanceRequestCreate>,
    ): Promise<MaintenanceRequest | null> => {
      setLoading(true);
      setError(null);
      try {
        const updatedRequest = await dataService.updateMaintenanceRequest(
          id,
          requestData,
        );

        setMaintenanceRequests((prev) =>
          prev.map((r) => (r.id === id ? updatedRequest : r)),
        );

        return updatedRequest;
      } catch (err: any) {
        setError(err.message || "Failed to update maintenance request");

        return null;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const updateStatus = useCallback(
    async (id: string, status: MaintenanceStatus): Promise<boolean> => {
      const updated = await updateMaintenanceRequest(id, { status } as any);

      return updated !== null;
    },
    [updateMaintenanceRequest],
  );

  const getRequestsByStatus = useCallback(
    (status: MaintenanceStatus): MaintenanceRequest[] => {
      return maintenanceRequests.filter((request) => request.status === status);
    },
    [maintenanceRequests],
  );

  const getRequestsByPriority = useCallback(
    (priority: MaintenancePriority): MaintenanceRequest[] => {
      return maintenanceRequests.filter(
        (request) => request.priority === priority,
      );
    },
    [maintenanceRequests],
  );

  const getUrgentRequests = useCallback((): MaintenanceRequest[] => {
    return maintenanceRequests
      .filter(
        (request) =>
          request.priority === "urgent" || request.priority === "high",
      )
      .sort((a, b) => {
        const priorityOrder = { urgent: 0, high: 1, medium: 2, low: 3 };

        return priorityOrder[a.priority] - priorityOrder[b.priority];
      });
  }, [maintenanceRequests]);

  useEffect(() => {
    fetchMaintenanceRequests();
  }, [fetchMaintenanceRequests]);

  return {
    maintenanceRequests,
    loading,
    error,
    fetchMaintenanceRequests,
    createMaintenanceRequest,
    updateMaintenanceRequest,
    updateStatus,
    getRequestsByStatus,
    getRequestsByPriority,
    getUrgentRequests,
  };
};
