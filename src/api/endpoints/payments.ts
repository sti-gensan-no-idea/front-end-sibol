// Payments API Endpoints
import api from '../core/apiService';
import { Payment, PaymentCreate, PaymentStatus } from '../types';

class PaymentsAPI {
  async createPayment(data: PaymentCreate): Promise<Payment> {
    return api.post<Payment>('/maintenance/payments/', data);
  }

  async getPayments(params?: {
    property_id?: string;
    status_filter?: PaymentStatus;
  }): Promise<Payment[]> {
    return api.get<Payment[]>('/maintenance/payments/', { params });
  }

  async updatePaymentStatus(
    paymentId: string,
    newStatus: PaymentStatus,
    transactionId?: string,
    receiptUrl?: string,
    notes?: string
  ): Promise<Payment> {
    const params: any = { new_status: newStatus };
    if (transactionId) params.transaction_id = transactionId;
    if (receiptUrl) params.receipt_url = receiptUrl;
    if (notes) params.notes = notes;
    
    return api.put<Payment>(`/maintenance/payments/${paymentId}/status`, null, { params });
  }

  async getPaymentReceipt(paymentId: string): Promise<any> {
    return api.get(`/maintenance/payments/${paymentId}/receipt`);
  }

  async getPaymentSchedule(propertyId: string): Promise<any> {
    return api.get(`/maintenance/payments/property/${propertyId}/schedule`);
  }
}

export const paymentsAPI = new PaymentsAPI();
export default paymentsAPI;
