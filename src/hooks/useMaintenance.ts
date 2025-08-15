import { useState, useEffect, useCallback } from 'react';
import { 
  maintenancePaymentService,
  type MaintenanceRequestResponse,
  type MaintenanceRequestCreate,
  type MaintenanceRequestUpdate
} from '../services';

interface UseMaintenanceReturn {
  maintenanceRequests: MaintenanceRequestResponse[];
  loading: boolean;
  error: string | null;
  fetchMaintenanceRequests: (params?: {
    status?: string;
    priority?: string;
    category?: string;
    property_id?: string;
  }) => Promise<void>;
  createMaintenanceRequest: (request: MaintenanceRequestCreate) => Promise<MaintenanceRequestResponse | null>;
  updateMaintenanceRequest: (id: string, updates: MaintenanceRequestUpdate) => Promise<MaintenanceRequestResponse | null>;
  deleteMaintenanceRequest: (id: string) => Promise<boolean>;
  assignMaintenanceRequest: (id: string, assignedTo: string) => Promise<boolean>;
  completeMaintenanceRequest: (id: string, actualCost?: number, notes?: string) => Promise<boolean>;
  refreshMaintenanceRequests: () => Promise<void>;
}

export const useMaintenance = (): UseMaintenanceReturn => {
  const [maintenanceRequests, setMaintenanceRequests] = useState<MaintenanceRequestResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMaintenanceRequests = useCallback(async (params?: {
    status?: string;
    priority?: string;
    category?: string;
    property_id?: string;
  }) => {
    setLoading(true);
    setError(null);
    try {
      const data = await maintenancePaymentService.getMaintenanceRequests(params);
      setMaintenanceRequests(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch maintenance requests');
      setMaintenanceRequests([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const createMaintenanceRequest = useCallback(async (request: MaintenanceRequestCreate): Promise<MaintenanceRequestResponse | null> => {
    setLoading(true);
    setError(null);
    try {
      const newRequest = await maintenancePaymentService.createMaintenanceRequest(request);
      setMaintenanceRequests(prev => [newRequest, ...prev]);
      return newRequest;
    } catch (err: any) {
      setError(err.message || 'Failed to create maintenance request');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateMaintenanceRequest = useCallback(async (id: string, updates: MaintenanceRequestUpdate): Promise<MaintenanceRequestResponse | null> => {
    setLoading(true);
    setError(null);
    try {
      const updatedRequest = await maintenancePaymentService.updateMaintenanceRequest(id, updates);
      setMaintenanceRequests(prev => prev.map(r => r.id === id ? updatedRequest : r));
      return updatedRequest;
    } catch (err: any) {
      setError(err.message || 'Failed to update maintenance request');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteMaintenanceRequest = useCallback(async (id: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await maintenancePaymentService.deleteMaintenanceRequest(id);
      setMaintenanceRequests(prev => prev.filter(r => r.id !== id));
      return true;
    } catch (err: any) {
      setError(err.message || 'Failed to delete maintenance request');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const assignMaintenanceRequest = useCallback(async (id: string, assignedTo: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      const updatedRequest = await maintenancePaymentService.assignMaintenanceRequest(id, assignedTo);
      setMaintenanceRequests(prev => prev.map(r => r.id === id ? updatedRequest : r));
      return true;
    } catch (err: any) {
      setError(err.message || 'Failed to assign maintenance request');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const completeMaintenanceRequest = useCallback(async (id: string, actualCost?: number, notes?: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      const updatedRequest = await maintenancePaymentService.completeMaintenanceRequest(id, actualCost, notes);
      setMaintenanceRequests(prev => prev.map(r => r.id === id ? updatedRequest : r));
      return true;
    } catch (err: any) {
      setError(err.message || 'Failed to complete maintenance request');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshMaintenanceRequests = useCallback(async () => {
    await fetchMaintenanceRequests();
  }, [fetchMaintenanceRequests]);

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
    deleteMaintenanceRequest,
    assignMaintenanceRequest,
    completeMaintenanceRequest,
    refreshMaintenanceRequests,
  };
};