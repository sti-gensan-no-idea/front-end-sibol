// Properties API Endpoints
import api from '../core/apiService';
import { 
  Property, 
  PropertyCreate, 
  PropertyUpdate, 
  PaginatedResponse, 
  CSVUploadResponse 
} from '../types';

class PropertiesAPI {
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
  }): Promise<PaginatedResponse<Property>> {
    return api.get<PaginatedResponse<Property>>('/properties/', { params });
  }

  // Get single property
  async getProperty(propertyId: string): Promise<Property> {
    return api.get<Property>(`/properties/${propertyId}`);
  }

  // Create property
  async createProperty(data: PropertyCreate): Promise<Property> {
    return api.post<Property>('/properties/', data);
  }

  // Update property
  async updateProperty(propertyId: string, data: PropertyUpdate): Promise<Property> {
    return api.put<Property>(`/properties/${propertyId}`, data);
  }

  // Delete/Archive property
  async deleteProperty(propertyId: string): Promise<Property> {
    return api.delete<Property>(`/properties/${propertyId}`);
  }

  // Bulk create properties
  async bulkCreateProperties(properties: PropertyCreate[]): Promise<CSVUploadResponse> {
    return api.post<CSVUploadResponse>('/properties/bulk', { properties });
  }

  // Upload CSV
  async uploadCSV(
    file: File, 
    projectName?: string,
    onProgress?: (progress: number) => void
  ): Promise<CSVUploadResponse> {
    const additionalData = projectName ? { project_name: projectName } : undefined;
    return api.uploadFile<CSVUploadResponse>(
      '/properties/upload-csv',
      file,
      additionalData,
      onProgress
    );
  }

  // Get CSV template
  async getCSVTemplate(): Promise<Blob> {
    const response = await api.getAxiosInstance().get('/properties/csv-template', {
      responseType: 'blob'
    });
    return response.data;
  }

  // Assign property
  async assignProperty(propertyId: string, data: {
    broker_id?: string;
    agent_id?: string;
  }): Promise<any> {
    return api.post(`/properties/${propertyId}/assign`, data);
  }

  // Search properties
  async searchProperties(query: string): Promise<Property[]> {
    const response = await this.getProperties({
      location: query,
      limit: 50
    });
    return response.items;
  }

  // Get featured properties
  async getFeaturedProperties(limit: number = 6): Promise<Property[]> {
    const response = await this.getProperties({
      status_filter: 'available',
      limit
    });
    return response.items;
  }

  // Get properties by status
  async getPropertiesByStatus(status: string): Promise<Property[]> {
    const response = await this.getProperties({
      status_filter: status,
      limit: 100
    });
    return response.items;
  }

  // Get properties by developer
  async getPropertiesByDeveloper(developerId: string): Promise<Property[]> {
    const response = await this.getProperties({
      limit: 100
    });
    // Filter by developer_id if needed
    return response.items.filter(p => p.owner_id === developerId);
  }
}

export const propertiesAPI = new PropertiesAPI();
export default propertiesAPI;
