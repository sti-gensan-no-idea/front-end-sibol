import { useState, useEffect, useCallback } from 'react';
import { dataService, type Payment, type PaymentCreate, type PaymentStatus, type PaymentType } from '../services';

interface UsePaymentsReturn {
  payments: Payment[];
  loading: boolean;
  error: string | null;
  fetchPayments: () => Promise<void>;
  createPayment: (paymentData: PaymentCreate) => Promise<Payment | null>;
  updatePaymentStatus: (id: string, status: PaymentStatus) => Promise<Payment | null>;
  getPaymentsByStatus: (status: PaymentStatus) => Payment[];
  getPaymentsByType: (type: PaymentType) => Payment[];
  getTotalRevenue: () => number;
  getPendingPayments: () => Payment[];
}

export const usePayments = (): UsePaymentsReturn => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPayments = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await dataService.getPayments();
      setPayments(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch payments');
    } finally {
      setLoading(false);
    }
  }, []);

  const createPayment = useCallback(async (paymentData: PaymentCreate): Promise<Payment | null> => {
    setLoading(true);
    setError(null);
    try {
      const newPayment = await dataService.createPayment(paymentData);
      setPayments(prev => [...prev, newPayment]);
      return newPayment;
    } catch (err: any) {
      setError(err.message || 'Failed to create payment');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const updatePaymentStatus = useCallback(async (id: string, status: PaymentStatus): Promise<Payment | null> => {
    setLoading(true);
    setError(null);
    try {
      const updatedPayment = await dataService.updatePaymentStatus(id, status);
      setPayments(prev => prev.map(p => p.id === id ? updatedPayment : p));
      return updatedPayment;
    } catch (err: any) {
      setError(err.message || 'Failed to update payment status');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const getPaymentsByStatus = useCallback((status: PaymentStatus): Payment[] => {
    return payments.filter(payment => payment.status === status);
  }, [payments]);

  const getPaymentsByType = useCallback((type: PaymentType): Payment[] => {
    return payments.filter(payment => payment.payment_type === type);
  }, [payments]);

  const getTotalRevenue = useCallback((): number => {
    return payments
      .filter(payment => payment.status === 'completed')
      .reduce((total, payment) => total + payment.amount, 0);
  }, [payments]);

  const getPendingPayments = useCallback((): Payment[] => {
    return payments.filter(payment => 
      payment.status === 'pending' || payment.status === 'processing'
    );
  }, [payments]);

  useEffect(() => {
    fetchPayments();
  }, [fetchPayments]);

  return {
    payments,
    loading,
    error,
    fetchPayments,
    createPayment,
    updatePaymentStatus,
    getPaymentsByStatus,
    getPaymentsByType,
    getTotalRevenue,
    getPendingPayments,
  };
};
