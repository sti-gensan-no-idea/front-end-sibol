import apiService from './apiService';
import type { Property, PropertyCreate, PropertyUpdate } from '../types/api';

export interface PropertyResponse {
  id: string;
  title: string;
  description?: string;
  price: number;
  location: string;
  property_type?: string;
  status: string;
  is_archived: boolean;
  owner_id: string;
  expected_downpayment?: number;
  project_name?: string;
  created_at: string;
  updated_at?: string;
}

export interface PropertyAssignmentCreate {
  broker_id?: string;
  agent_id?: string;
}

export interface CSVUploadResponse {
  success_count: number;
  error_count: number;
  errors: string[];
}

export class PropertyService {
  // Get all properties with pagination
  async getProperties(params?: {
    limit?: number;
    offset?: number;
    property_type?: string;
    location?: string;
    min_price?: number;
    max_price?: number;
  }): Promise<{
    items: PropertyResponse[];
    total: number;
    limit: number;
    offset: number;
    has_next: boolean;
    has_prev: boolean;
  }> {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, value.toString());
        }
      });
    }
    
    const endpoint = `/properties${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return apiService.get(endpoint);
  }

  // Get property by ID
  async getPropertyById(id: string): Promise<PropertyResponse> {
    return apiService.get(`/properties/${id}`);
  }

  // Create property
  async createProperty(property: PropertyCreate): Promise<PropertyResponse> {
    return apiService.post('/properties/', property);
  }

  // Bulk create properties
  async bulkCreateProperties(properties: PropertyCreate[]): Promise<{
    created_count: number;
    properties: PropertyResponse[];
  }> {
    return apiService.post('/properties/bulk', { properties });
  }

  // Upload properties via CSV
  async uploadPropertiesCSV(file: File): Promise<CSVUploadResponse> {
    return apiService.uploadFile('/properties/upload-csv', file);
  }

  // Update property
  async updateProperty(id: string, updates: PropertyUpdate): Promise<PropertyResponse> {
    return apiService.put(`/properties/${id}`, updates);
  }

  // Delete property
  async deleteProperty(id: string): Promise<{ message: string }> {
    return apiService.delete(`/properties/${id}`);
  }

  // Assign property to broker/agent
  async assignProperty(id: string, assignment: PropertyAssignmentCreate): Promise<{
    property_id: string;
    assigned_to: string;
    assigned_to_role: string;
    assigned_by: string;
    assignment_date: string;
  }> {
    return apiService.post(`/properties/${id}/assign`, assignment);
  }

  // Get properties assigned to user
  async getMyProperties(): Promise<PropertyResponse[]> {
    return apiService.get('/properties/my-properties');
  }

  // Get developer's properties
  async getDeveloperProperties(): Promise<PropertyResponse[]> {
    return apiService.get('/properties/developer');
  }

  // Search properties
  async searchProperties(query: string): Promise<PropertyResponse[]> {
    return apiService.get(`/properties/search?q=${encodeURIComponent(query)}`);
  }

  // Get property analytics
  async getPropertyAnalytics(id: string): Promise<{
    views: number;
    leads: number;
    bookmarks: number;
    conversion_rate: number;
  }> {
    return apiService.get(`/properties/${id}/analytics`);
  }
}

export const propertyService = new PropertyService();
export default propertyService;