import { useState, useEffect, useCallback } from "react";

import { dataService, type Property, type PropertyCreate } from "../services";

interface UsePropertiesOptions {
  filters?: {
    property_type?: string;
    status?: string;
    location?: string;
    price_min?: number;
    price_max?: number;
  };
  autoFetch?: boolean;
}

interface UsePropertiesReturn {
  properties: Property[];
  loading: boolean;
  error: string | null;
  fetchProperties: () => Promise<void>;
  createProperty: (propertyData: PropertyCreate) => Promise<Property | null>;
  updateProperty: (
    id: string,
    propertyData: Partial<PropertyCreate>,
  ) => Promise<Property | null>;
  deleteProperty: (id: string) => Promise<boolean>;
  uploadCSV: (file: File) => Promise<{
    success_count: number;
    error_count: number;
    errors: string[];
  }>;
  assignToAgent: (propertyId: string, agentId: string) => Promise<boolean>;
}

export const useProperties = (options: UsePropertiesOptions = {}): UsePropertiesReturn => {
  const { filters, autoFetch = true } = options;
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProperties = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await dataService.getProperties();
      
      // Apply client-side filters if provided
      let filteredData = data;
      if (filters) {
        filteredData = data.filter(property => {
          if (filters.property_type && property.property_type !== filters.property_type) {
            return false;
          }
          if (filters.status && property.status !== filters.status) {
            return false;
          }
          if (filters.location && !property.location.toLowerCase().includes(filters.location.toLowerCase())) {
            return false;
          }
          if (filters.price_min && property.price < filters.price_min) {
            return false;
          }
          if (filters.price_max && property.price > filters.price_max) {
            return false;
          }
          return true;
        });
      }
      
      setProperties(filteredData);
    } catch (err: any) {
      setError(err.message || "Failed to fetch properties");
    } finally {
      setLoading(false);
    }
  }, [filters]);

  const createProperty = useCallback(
    async (propertyData: PropertyCreate): Promise<Property | null> => {
      setLoading(true);
      setError(null);
      try {
        const newProperty = await dataService.createProperty(propertyData);
        setProperties((prev) => [newProperty, ...prev]);
        return newProperty;
      } catch (err: any) {
        setError(err.message || "Failed to create property");
        return null;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const updateProperty = useCallback(
    async (
      id: string,
      propertyData: Partial<PropertyCreate>,
    ): Promise<Property | null> => {
      setLoading(true);
      setError(null);
      try {
        const updatedProperty = await dataService.updateProperty(id, propertyData);
        setProperties((prev) =>
          prev.map((property) =>
            property.id === id ? updatedProperty : property,
          ),
        );
        return updatedProperty;
      } catch (err: any) {
        setError(err.message || "Failed to update property");
        return null;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const deleteProperty = useCallback(async (id: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await dataService.deleteProperty(id);
      setProperties((prev) => prev.filter((property) => property.id !== id));
      return true;
    } catch (err: any) {
      setError(err.message || "Failed to delete property");
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const uploadCSV = useCallback(async (file: File): Promise<{
    success_count: number;
    error_count: number;
    errors: string[];
  }> => {
    setLoading(true);
    setError(null);
    try {
      const result = await dataService.uploadPropertiesCSV(file);
      // Refresh properties after upload
      await fetchProperties();
      return result;
    } catch (err: any) {
      setError(err.message || "Failed to upload CSV");
      return {
        success_count: 0,
        error_count: 1,
        errors: [err.message || "Upload failed"]
      };
    } finally {
      setLoading(false);
    }
  }, [fetchProperties]);

  const assignToAgent = useCallback(
    async (propertyId: string, agentId: string): Promise<boolean> => {
      setLoading(true);
      setError(null);
      try {
        const updatedProperty = await dataService.updateProperty(propertyId, {
          agent_id: agentId,
        });
        setProperties((prev) =>
          prev.map((property) =>
            property.id === propertyId ? updatedProperty : property,
          ),
        );
        return true;
      } catch (err: any) {
        setError(err.message || "Failed to assign property to agent");
        return false;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  useEffect(() => {
    if (autoFetch) {
      fetchProperties();
    }
  }, [autoFetch, fetchProperties]);

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
