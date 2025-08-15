import { useState, useEffect, useCallback } from 'react';
import { propertyService, type PropertyResponse, type PropertyCreate, type PropertyUpdate, type CSVUploadResponse } from '../services';

interface UsePropertiesOptions {
  autoFetch?: boolean;
  filters?: {
    property_type?: string;
    location?: string;
    min_price?: number;
    max_price?: number;
  };
}

interface UsePropertiesReturn {
  properties: PropertyResponse[];
  loading: boolean;
  error: string | null;
  totalCount: number;
  hasNext: boolean;
  hasPrev: boolean;
  fetchProperties: (params?: {
    limit?: number;
    offset?: number;
    property_type?: string;
    location?: string;
    min_price?: number;
    max_price?: number;
  }) => Promise<void>;
  getPropertyById: (id: string) => Promise<PropertyResponse | null>;
  createProperty: (propertyData: PropertyCreate) => Promise<PropertyResponse | null>;
  updateProperty: (id: string, propertyData: PropertyUpdate) => Promise<PropertyResponse | null>;
  deleteProperty: (id: string) => Promise<boolean>;
  uploadCSV: (file: File) => Promise<CSVUploadResponse | null>;
  assignProperty: (id: string, assignment: { broker_id?: string; agent_id?: string }) => Promise<boolean>;
  searchProperties: (query: string) => Promise<PropertyResponse[]>;
  refreshProperties: () => Promise<void>;
}

export const useProperties = (options: UsePropertiesOptions = {}): UsePropertiesReturn => {
  const { autoFetch = true, filters } = options;
  
  const [properties, setProperties] = useState<PropertyResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrev, setHasPrev] = useState(false);

  const fetchProperties = useCallback(async (params?: {
    limit?: number;
    offset?: number;
    property_type?: string;
    location?: string;
    min_price?: number;
    max_price?: number;
  }) => {
    setLoading(true);
    setError(null);
    try {
      const queryParams = { ...filters, ...params };
      const response = await propertyService.getProperties(queryParams);
      setProperties(response.items);
      setTotalCount(response.total);
      setHasNext(response.has_next);
      setHasPrev(response.has_prev);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch properties');
      setProperties([]);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  const getPropertyById = useCallback(async (id: string): Promise<PropertyResponse | null> => {
    setLoading(true);
    setError(null);
    try {
      const property = await propertyService.getPropertyById(id);
      return property;
    } catch (err: any) {
      setError(err.message || 'Failed to fetch property');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const createProperty = useCallback(async (propertyData: PropertyCreate): Promise<PropertyResponse | null> => {
    setLoading(true);
    setError(null);
    try {
      const newProperty = await propertyService.createProperty(propertyData);
      setProperties(prev => [newProperty, ...prev]);
      setTotalCount(prev => prev + 1);
      return newProperty;
    } catch (err: any) {
      setError(err.message || 'Failed to create property');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateProperty = useCallback(async (id: string, propertyData: PropertyUpdate): Promise<PropertyResponse | null> => {
    setLoading(true);
    setError(null);
    try {
      const updatedProperty = await propertyService.updateProperty(id, propertyData);
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
      await propertyService.deleteProperty(id);
      setProperties(prev => prev.filter(p => p.id !== id));
      setTotalCount(prev => prev - 1);
      return true;
    } catch (err: any) {
      setError(err.message || 'Failed to delete property');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const uploadCSV = useCallback(async (file: File): Promise<CSVUploadResponse | null> => {
    setLoading(true);
    setError(null);
    try {
      const result = await propertyService.uploadPropertiesCSV(file);
      await fetchProperties(); // Refresh the list after upload
      return result;
    } catch (err: any) {
      setError(err.message || 'Failed to upload CSV');
      return null;
    } finally {
      setLoading(false);
    }
  }, [fetchProperties]);

  const assignProperty = useCallback(async (id: string, assignment: { broker_id?: string; agent_id?: string }): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await propertyService.assignProperty(id, assignment);
      await fetchProperties(); // Refresh to get updated assignment info
      return true;
    } catch (err: any) {
      setError(err.message || 'Failed to assign property');
      return false;
    } finally {
      setLoading(false);
    }
  }, [fetchProperties]);

  const searchProperties = useCallback(async (query: string): Promise<PropertyResponse[]> => {
    setLoading(true);
    setError(null);
    try {
      const results = await propertyService.searchProperties(query);
      return results;
    } catch (err: any) {
      setError(err.message || 'Failed to search properties');
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshProperties = useCallback(async () => {
    await fetchProperties();
  }, [fetchProperties]);

  useEffect(() => {
    if (autoFetch) {
      fetchProperties();
    }
  }, [autoFetch, fetchProperties]);

  return {
    properties,
    loading,
    error,
    totalCount,
    hasNext,
    hasPrev,
    fetchProperties,
    getPropertyById,
    createProperty,
    updateProperty,
    deleteProperty,
    uploadCSV,
    assignProperty,
    searchProperties,
    refreshProperties,
  };
};