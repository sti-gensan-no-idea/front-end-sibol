// Dynamic OpenAPI Client
// This client fetches the OpenAPI spec from the API and dynamically generates methods
import axios, { AxiosInstance } from 'axios';
import { API_BASE_URL } from '../../config/api';

interface OpenAPIOperation {
  operationId: string;
  method: string;
  path: string;
  parameters?: any[];
  requestBody?: any;
  responses?: any;
  tags?: string[];
  summary?: string;
  description?: string;
}

interface OpenAPISpec {
  openapi: string;
  info: any;
  paths: Record<string, Record<string, any>>;
  components?: {
    schemas?: Record<string, any>;
    securitySchemes?: Record<string, any>;
  };
}

class DynamicOpenAPIClient {
  private spec: OpenAPISpec | null = null;
  private axiosInstance: AxiosInstance;
  private operations: Map<string, OpenAPIOperation> = new Map();
  private baseURL: string;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
    this.axiosInstance = axios.create({
      baseURL: this.baseURL,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    // Add auth interceptor
    this.axiosInstance.interceptors.request.use((config) => {
      const token = localStorage.getItem('access_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }

  // Initialize the client by fetching the OpenAPI spec
  async initialize(): Promise<void> {
    try {
      const response = await axios.get(`${this.baseURL}/openapi.json`);
      this.spec = response.data;
      this.parseOperations();
      this.generateDynamicMethods();
    } catch (error) {
      console.error('Failed to fetch OpenAPI spec:', error);
      throw new Error('Failed to initialize API client');
    }
  }

  // Parse all operations from the OpenAPI spec
  private parseOperations(): void {
    if (!this.spec?.paths) return;

    Object.entries(this.spec.paths).forEach(([path, pathItem]) => {
      Object.entries(pathItem).forEach(([method, operation]) => {
        if (typeof operation === 'object' && operation.operationId) {
          this.operations.set(operation.operationId, {
            operationId: operation.operationId,
            method: method.toUpperCase(),
            path,
            parameters: operation.parameters,
            requestBody: operation.requestBody,
            responses: operation.responses,
            tags: operation.tags,
            summary: operation.summary,
            description: operation.description,
          });
        }
      });
    });
  }

  // Generate dynamic methods for all operations
  private generateDynamicMethods(): void {
    this.operations.forEach((operation, operationId) => {
      // Create a method for each operation
      (this as any)[operationId] = this.createMethod(operation);
    });
  }

  // Create a method for a specific operation
  private createMethod(operation: OpenAPIOperation) {
    return async (params?: any, data?: any, config?: any) => {
      let url = operation.path;
      const queryParams: any = {};
      const pathParams: any = {};

      // Process parameters
      if (operation.parameters && params) {
        operation.parameters.forEach((param: any) => {
          const value = params[param.name];
          if (value !== undefined) {
            if (param.in === 'path') {
              pathParams[param.name] = value;
            } else if (param.in === 'query') {
              queryParams[param.name] = value;
            }
          }
        });
      }

      // Replace path parameters
      Object.keys(pathParams).forEach((key) => {
        url = url.replace(`{${key}}`, pathParams[key]);
      });

      // Build request config
      const requestConfig: any = {
        ...config,
        params: queryParams,
      };

      // Execute request based on method
      switch (operation.method) {
        case 'GET':
          return this.axiosInstance.get(url, requestConfig);
        case 'POST':
          return this.axiosInstance.post(url, data, requestConfig);
        case 'PUT':
          return this.axiosInstance.put(url, data, requestConfig);
        case 'PATCH':
          return this.axiosInstance.patch(url, data, requestConfig);
        case 'DELETE':
          return this.axiosInstance.delete(url, requestConfig);
        default:
          throw new Error(`Unsupported method: ${operation.method}`);
      }
    };
  }

  // Get available operations grouped by tags
  getOperationsByTag(): Record<string, OpenAPIOperation[]> {
    const grouped: Record<string, OpenAPIOperation[]> = {};
    
    this.operations.forEach((operation) => {
      const tags = operation.tags || ['default'];
      tags.forEach((tag) => {
        if (!grouped[tag]) {
          grouped[tag] = [];
        }
        grouped[tag].push(operation);
      });
    });

    return grouped;
  }

  // Get operation by ID
  getOperation(operationId: string): OpenAPIOperation | undefined {
    return this.operations.get(operationId);
  }

  // Get all operations
  getAllOperations(): OpenAPIOperation[] {
    return Array.from(this.operations.values());
  }

  // Get schema definition
  getSchema(schemaName: string): any {
    return this.spec?.components?.schemas?.[schemaName];
  }

  // Validate request data against schema
  validateRequest(operationId: string, data: any): boolean {
    const operation = this.operations.get(operationId);
    if (!operation?.requestBody) return true;

    // This is a simplified validation - you might want to use a JSON Schema validator
    const schema = operation.requestBody?.content?.['application/json']?.schema;
    if (!schema) return true;

    // Add your validation logic here
    return true;
  }

  // Generate TypeScript types from schemas (utility method)
  generateTypes(): string {
    if (!this.spec?.components?.schemas) return '';

    let types = '// Auto-generated types from OpenAPI spec\n\n';

    Object.entries(this.spec.components.schemas).forEach(([name, schema]: [string, any]) => {
      types += `export interface ${name} {\n`;
      
      if (schema.properties) {
        Object.entries(schema.properties).forEach(([propName, propSchema]: [string, any]) => {
          const required = schema.required?.includes(propName) ? '' : '?';
          const type = this.mapSchemaTypeToTS(propSchema);
          types += `  ${propName}${required}: ${type};\n`;
        });
      }
      
      types += '}\n\n';
    });

    return types;
  }

  // Map OpenAPI schema types to TypeScript types
  private mapSchemaTypeToTS(schema: any): string {
    if (schema.$ref) {
      const refName = schema.$ref.split('/').pop();
      return refName;
    }

    if (schema.enum) {
      return schema.enum.map((v: any) => `'${v}'`).join(' | ');
    }

    switch (schema.type) {
      case 'string':
        return schema.format === 'date-time' ? 'Date | string' : 'string';
      case 'integer':
      case 'number':
        return 'number';
      case 'boolean':
        return 'boolean';
      case 'array':
        return `${this.mapSchemaTypeToTS(schema.items)}[]`;
      case 'object':
        return 'any';
      default:
        return 'any';
    }
  }

  // Helper method to call any endpoint dynamically
  async callEndpoint(
    method: string,
    path: string,
    params?: any,
    data?: any,
    config?: any
  ): Promise<any> {
    let url = path;
    const queryParams: any = {};

    // Extract path parameters
    const pathParamMatches = path.match(/{([^}]+)}/g);
    if (pathParamMatches && params) {
      pathParamMatches.forEach((match) => {
        const paramName = match.slice(1, -1);
        if (params[paramName] !== undefined) {
          url = url.replace(match, params[paramName]);
          delete params[paramName];
        }
      });
    }

    // Remaining params are query params
    Object.assign(queryParams, params);

    const requestConfig = {
      ...config,
      params: queryParams,
    };

    switch (method.toUpperCase()) {
      case 'GET':
        return this.axiosInstance.get(url, requestConfig);
      case 'POST':
        return this.axiosInstance.post(url, data, requestConfig);
      case 'PUT':
        return this.axiosInstance.put(url, data, requestConfig);
      case 'PATCH':
        return this.axiosInstance.patch(url, data, requestConfig);
      case 'DELETE':
        return this.axiosInstance.delete(url, requestConfig);
      default:
        throw new Error(`Unsupported method: ${method}`);
    }
  }
}

// Create and export singleton instance
export const openAPIClient = new DynamicOpenAPIClient();

// Initialize the client when the module is imported
openAPIClient.initialize().catch(console.error);

export default openAPIClient;
