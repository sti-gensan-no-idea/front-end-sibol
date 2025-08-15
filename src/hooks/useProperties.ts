import { useState, useEffect, useCallback } from 'react';
import { dataService, type Property, type PropertyCreate } from '../services';

interface UsePropertiesReturn {
  properties: Property[];
  loading: boolean;
  error: string | null;
  fetchProperties: () => Promise<void>;
  createProperty: (propertyData: PropertyCreate) => Promise<Property | null>;
  updateProperty: (id: string, propertyData: Partial<PropertyCreate>) => Promise<Property | null>;
  deleteProperty: (id: string) => Promise<boolean>;
  uploadCSV: (file: File) => Promise<boolean>;
  assignToAgent: (propertyId: string, agentId: string) => Promise<boolean>;
}

export const useProperties = (): UsePropertiesReturn => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProperties = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await dataService.getProperties();
      setProperties(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch properties');
    } finally {
      setLoading(false);
    }
  }, []);

  const createProperty = useCallback(async (propertyData: PropertyCreate): Promise<Property | null> => {
    setLoading(true);
    setError(null);
    try {
      const newProperty = await dataService.createProperty(propertyData);
      setProperties(prev => [...prev, newProperty]);
      return newProperty;
    } catch (err: any) {
      setError(err.message || 'Failed to create property');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateProperty = useCallback(async (id: string, propertyData: Partial<PropertyCreate>): Promise<Property | null> => {
    setLoading(true);
    setError(null);
    try {
      const updatedProperty = await dataService.updateProperty(id, propertyData);
      setProperties(prev => prev.map(p => p.id === id ? updatedProperty : p));
      return updatedProperty;
    } catch (err: any) {
      setError(err.message || 'Failed to update property');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteProperty = useCallback(async (id: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await dataService.deleteProperty(id);
      setProperties(prev => prev.filter(p => p.id !== id));
      return true;
    } catch (err: any) {
      setError(err.message || 'Failed to delete property');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const uploadCSV = useCallback(async (file: File): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await dataService.uploadPropertiesCSV(file);
      await fetchProperties(); // Refresh the list
      return true;
    } catch (err: any) {
      setError(err.message || 'Failed to upload CSV');
      return false;
    } finally {
      setLoading(false);
    }
  }, [fetchProperties]);

  const assignToAgent = useCallback(async (propertyId: string, agentId: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await dataService.assignPropertyToAgent(propertyId, agentId);
      await fetchProperties(); // Refresh the list
      return true;
    } catch (err: any) {
      setError(err.message || 'Failed to assign property');
      return false;
    } finally {
      setLoading(false);
    }
  }, [fetchProperties]);

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  return {
    properties,
    loading,
    error,
    fetchProperties,
    createProperty,
    updateProperty,
    deleteProperty,
    uploadCSV,
    assignToAgent,
  };
};
