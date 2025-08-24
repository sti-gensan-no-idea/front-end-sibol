// Property API Service
import { apiClient } from './apiClient';
import {
  Property,
  PropertyCreate,
  PropertyUpdate,
  PropertyResponse,
  PropertyAssignmentCreate,
  PropertyAssignmentResponse,
  CSVUploadResponse,
  PaginatedResponse,
} from '../../types/api';

class PropertyService {
  // Create property
  async createProperty(data: PropertyCreate): Promise<PropertyResponse> {
    return apiClient.post<PropertyResponse>('/properties/', data);
  }

  // Get properties with filters
  async getProperties(params?: {
    status_filter?: string;
    property_type?: string;
    project_name?: string;
    location?: string;
    min_price?: number;
    max_price?: number;
    limit?: number;
    offset?: number;
  }): Promise<PaginatedResponse> {
    return apiClient.getPaginated<PropertyResponse>('/properties/', params);
  }

  // Get single property
  async getProperty(propertyId: string): Promise<PropertyResponse> {
    return apiClient.get<PropertyResponse>(`/properties/${propertyId}`);
  }

  // Update property
  async updateProperty(propertyId: string, data: PropertyUpdate): Promise<PropertyResponse> {
    return apiClient.put<PropertyResponse>(`/properties/${propertyId}`, data);
  }

  // Archive property (soft delete)
  async archiveProperty(propertyId: string): Promise<PropertyResponse> {
    return apiClient.delete<PropertyResponse>(`/properties/${propertyId}`);
  }

  // Assign property to broker or agent
  async assignProperty(
    propertyId: string,
    data: PropertyAssignmentCreate
  ): Promise<PropertyAssignmentResponse> {
    return apiClient.post<PropertyAssignmentResponse>(
      `/properties/${propertyId}/assign`,
      data
    );
  }

  // Bulk create properties
  async createPropertiesBulk(properties: PropertyCreate[]): Promise<CSVUploadResponse> {
    return apiClient.post<CSVUploadResponse>('/properties/bulk', { properties });
  }

  // Upload CSV
  async uploadPropertiesCSV(
    file: File,
    projectName?: string,
    onProgress?: (progress: number) => void
  ): Promise<CSVUploadResponse> {
    const url = projectName
      ? `/properties/upload-csv?project_name=${encodeURIComponent(projectName)}`
      : '/properties/upload-csv';
    
    return apiClient.uploadFile<CSVUploadResponse>(url, file, undefined, onProgress);
  }

  // Get CSV template
  async getCSVTemplate(): Promise<Blob> {
    const response = await apiClient.get<any>('/properties/csv-template', {
      responseType: 'blob',
    });
    return new Blob([response], { type: 'text/csv' });
  }

  // Search properties
  async searchProperties(query: string): Promise<PropertyResponse[]> {
    const response = await this.getProperties({
      location: query,
      limit: 50,
    });
    return response.items as PropertyResponse[];
  }

  // Get properties by developer
  async getPropertiesByDeveloper(developerId: string): Promise<PropertyResponse[]> {
    const response = await apiClient.get<PropertyResponse[]>(
      `/properties/?developer_id=${developerId}`
    );
    return response;
  }

  // Get properties by status
  async getPropertiesByStatus(status: string): Promise<PropertyResponse[]> {
    const response = await this.getProperties({
      status_filter: status,
      limit: 100,
    });
    return response.items as PropertyResponse[];
  }

  // Get featured properties
  async getFeaturedProperties(limit: number = 6): Promise<PropertyResponse[]> {
    const response = await this.getProperties({
      status_filter: 'available',
      limit,
    });
    return response.items as PropertyResponse[];
  }

  // Get property statistics
  async getPropertyStatistics(propertyId: string): Promise<any> {
    return apiClient.get<any>(`/analytics/property-performance?property_id=${propertyId}`);
  }
}

export const propertyService = new PropertyService();
export default propertyService;
