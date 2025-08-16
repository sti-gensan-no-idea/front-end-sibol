import { useState, useEffect, useCallback } from 'react';
<<<<<<< HEAD
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
=======
import { dataService, type MaintenanceRequest, type MaintenanceRequestCreate, type MaintenancePriority, type MaintenanceStatus } from '../services';

interface UseMaintenanceReturn {
  maintenanceRequests: MaintenanceRequest[];
  loading: boolean;
  error: string | null;
  fetchMaintenanceRequests: () => Promise<void>;
  createMaintenanceRequest: (requestData: MaintenanceRequestCreate) => Promise<MaintenanceRequest | null>;
  updateMaintenanceRequest: (id: string, requestData: Partial<MaintenanceRequestCreate>) => Promise<MaintenanceRequest | null>;
  updateStatus: (id: string, status: MaintenanceStatus) => Promise<boolean>;
  getRequestsByStatus: (status: MaintenanceStatus) => MaintenanceRequest[];
  getRequestsByPriority: (priority: MaintenancePriority) => MaintenanceRequest[];
  getUrgentRequests: () => MaintenanceRequest[];
}

export const useMaintenance = (): UseMaintenanceReturn => {
  const [maintenanceRequests, setMaintenanceRequests] = useState<MaintenanceRequest[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMaintenanceRequests = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await dataService.getMaintenanceRequests();
      setMaintenanceRequests(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch maintenance requests');
>>>>>>> main
    } finally {
      setLoading(false);
    }
  }, []);

<<<<<<< HEAD
  const createMaintenanceRequest = useCallback(async (request: MaintenanceRequestCreate): Promise<MaintenanceRequestResponse | null> => {
    setLoading(true);
    setError(null);
    try {
      const newRequest = await maintenancePaymentService.createMaintenanceRequest(request);
      setMaintenanceRequests(prev => [newRequest, ...prev]);
=======
  const createMaintenanceRequest = useCallback(async (requestData: MaintenanceRequestCreate): Promise<MaintenanceRequest | null> => {
    setLoading(true);
    setError(null);
    try {
      const newRequest = await dataService.createMaintenanceRequest(requestData);
      setMaintenanceRequests(prev => [...prev, newRequest]);
>>>>>>> main
      return newRequest;
    } catch (err: any) {
      setError(err.message || 'Failed to create maintenance request');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

<<<<<<< HEAD
  const updateMaintenanceRequest = useCallback(async (id: string, updates: MaintenanceRequestUpdate): Promise<MaintenanceRequestResponse | null> => {
    setLoading(true);
    setError(null);
    try {
      const updatedRequest = await maintenancePaymentService.updateMaintenanceRequest(id, updates);
=======
  const updateMaintenanceRequest = useCallback(async (id: string, requestData: Partial<MaintenanceRequestCreate>): Promise<MaintenanceRequest | null> => {
    setLoading(true);
    setError(null);
    try {
      const updatedRequest = await dataService.updateMaintenanceRequest(id, requestData);
>>>>>>> main
      setMaintenanceRequests(prev => prev.map(r => r.id === id ? updatedRequest : r));
      return updatedRequest;
    } catch (err: any) {
      setError(err.message || 'Failed to update maintenance request');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

<<<<<<< HEAD
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
=======
  const updateStatus = useCallback(async (id: string, status: MaintenanceStatus): Promise<boolean> => {
    const updated = await updateMaintenanceRequest(id, { status } as any);
    return updated !== null;
  }, [updateMaintenanceRequest]);

  const getRequestsByStatus = useCallback((status: MaintenanceStatus): MaintenanceRequest[] => {
    return maintenanceRequests.filter(request => request.status === status);
  }, [maintenanceRequests]);

  const getRequestsByPriority = useCallback((priority: MaintenancePriority): MaintenanceRequest[] => {
    return maintenanceRequests.filter(request => request.priority === priority);
  }, [maintenanceRequests]);

  const getUrgentRequests = useCallback((): MaintenanceRequest[] => {
    return maintenanceRequests.filter(request => 
      request.priority === 'urgent' || request.priority === 'high'
    ).sort((a, b) => {
      const priorityOrder = { 'urgent': 0, 'high': 1, 'medium': 2, 'low': 3 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
  }, [maintenanceRequests]);
>>>>>>> main

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
<<<<<<< HEAD
    deleteMaintenanceRequest,
    assignMaintenanceRequest,
    completeMaintenanceRequest,
    refreshMaintenanceRequests,
  };
};
=======
    updateStatus,
    getRequestsByStatus,
    getRequestsByPriority,
    getUrgentRequests,
  };
};
>>>>>>> main
