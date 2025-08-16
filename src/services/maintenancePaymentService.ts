import apiService from './apiService';

export interface MaintenanceRequestResponse {
  id: string;
  property_id: string;
  client_id: string;
  title: string;
  description?: string;
  category?: string;
  priority?: string;
  status: string;
  assigned_to?: string;
  estimated_cost?: number;
  actual_cost?: number;
  created_at: string;
  updated_at?: string;
}

export interface MaintenanceRequestCreate {
  property_id: string;
  title: string;
  description?: string;
  category?: string;
  priority?: string;
}

export interface MaintenanceRequestUpdate {
  title?: string;
  description?: string;
  category?: string;
  priority?: string;
  status?: string;
  assigned_to?: string;
  estimated_cost?: number;
  actual_cost?: number;
}

export interface PaymentResponse {
  id: string;
  property_id: string;
  client_id: string;
  amount: number;
  payment_type: string;
  payment_method?: string;
  transaction_id?: string;
  status: 'pending' | 'completed' | 'failed';
  receipt_url?: string;
  created_at: string;
  updated_at?: string;
}

export interface PaymentCreate {
  property_id: string;
  amount: number;
  payment_type: string;
  payment_method?: string;
}

export interface PaymentUpdate {
  status?: 'pending' | 'completed' | 'failed';
  transaction_id?: string;
  receipt_url?: string;
  notes?: string;
}

export interface PaymentScheduleResponse {
  property_id: string;
  total_price: number;
  downpayment_amount: number;
  downpayment_percentage: number;
  remaining_balance: number;
  monthly_payment?: number;
  payment_terms: string;
}

export class MaintenancePaymentService {
  // Maintenance Requests
  async getMaintenanceRequests(params?: {
    status?: string;
    priority?: string;
    category?: string;
    property_id?: string;
  }): Promise<MaintenanceRequestResponse[]> {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, value.toString());
        }
      });
    }
    
    const endpoint = `/maintenance${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return apiService.get(endpoint);
  }

  async createMaintenanceRequest(request: MaintenanceRequestCreate): Promise<MaintenanceRequestResponse> {
    return apiService.post('/maintenance/', request);
  }

  async getMaintenanceRequestById(id: string): Promise<MaintenanceRequestResponse> {
    return apiService.get(`/maintenance/${id}`);
  }

  async updateMaintenanceRequest(id: string, updates: MaintenanceRequestUpdate): Promise<MaintenanceRequestResponse> {
    return apiService.put(`/maintenance/${id}`, updates);
  }

  async deleteMaintenanceRequest(id: string): Promise<{ message: string }> {
    return apiService.delete(`/maintenance/${id}`);
  }

  async assignMaintenanceRequest(id: string, assignedTo: string): Promise<MaintenanceRequestResponse> {
    return apiService.put(`/maintenance/${id}/assign`, { assigned_to: assignedTo });
  }

  async completeMaintenanceRequest(id: string, actualCost?: number, notes?: string): Promise<MaintenanceRequestResponse> {
    return apiService.put(`/maintenance/${id}/complete`, { actual_cost: actualCost, notes });
  }

  // Payments
  async getPayments(params?: {
    status?: string;
    payment_type?: string;
    property_id?: string;
  }): Promise<PaymentResponse[]> {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, value.toString());
        }
      });
    }
    
    const endpoint = `/payments${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return apiService.get(endpoint);
  }

  async createPayment(payment: PaymentCreate): Promise<PaymentResponse> {
    return apiService.post('/payments/', payment);
  }

  async getPaymentById(id: string): Promise<PaymentResponse> {
    return apiService.get(`/payments/${id}`);
  }

  async updatePaymentStatus(id: string, updates: PaymentUpdate): Promise<PaymentResponse> {
    return apiService.put(`/payments/${id}/status`, updates);
  }

  async getPaymentSchedule(propertyId: string): Promise<PaymentScheduleResponse> {
    return apiService.get(`/payments/schedule/${propertyId}`);
  }

  async processPayment(id: string, paymentMethod: string): Promise<PaymentResponse> {
    return apiService.post(`/payments/${id}/process`, { payment_method: paymentMethod });
  }

  async refundPayment(id: string, reason?: string): Promise<PaymentResponse> {
    return apiService.post(`/payments/${id}/refund`, { reason });
  }

  async getClientPayments(): Promise<PaymentResponse[]> {
    return apiService.get('/payments/client');
  }

  async getDeveloperPayments(): Promise<PaymentResponse[]> {
    return apiService.get('/payments/developer');
  }

  // Payment Analytics
  async getPaymentAnalytics(params?: {
    start_date?: string;
    end_date?: string;
    property_id?: string;
  }): Promise<{
    total_payments: number;
    total_amount: number;
    pending_payments: number;
    completed_payments: number;
    failed_payments: number;
    payment_trends: Array<{
      date: string;
      amount: number;
      count: number;
    }>;
  }> {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, value.toString());
        }
      });
    }
    
    const endpoint = `/payments/analytics${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return apiService.get(endpoint);
  }
}

export const maintenancePaymentService = new MaintenancePaymentService();
export default maintenancePaymentService;