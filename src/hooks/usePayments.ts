import { useState, useEffect, useCallback } from 'react';
<<<<<<< HEAD
import { 
  maintenancePaymentService,
  type PaymentResponse,
  type PaymentCreate,
  type PaymentUpdate,
  type PaymentScheduleResponse
} from '../services';

interface UsePaymentsReturn {
  payments: PaymentResponse[];
  loading: boolean;
  error: string | null;
  fetchPayments: (params?: {
    status?: string;
    payment_type?: string;
    property_id?: string;
  }) => Promise<void>;
  createPayment: (payment: PaymentCreate) => Promise<PaymentResponse | null>;
  updatePaymentStatus: (id: string, updates: PaymentUpdate) => Promise<PaymentResponse | null>;
  getPaymentSchedule: (propertyId: string) => Promise<PaymentScheduleResponse | null>;
  processPayment: (id: string, paymentMethod: string) => Promise<boolean>;
  refundPayment: (id: string, reason?: string) => Promise<boolean>;
  getClientPayments: () => Promise<PaymentResponse[]>;
  getDeveloperPayments: () => Promise<PaymentResponse[]>;
  getPaymentAnalytics: (params?: {
    start_date?: string;
    end_date?: string;
    property_id?: string;
  }) => Promise<any>;
  refreshPayments: () => Promise<void>;
}

export const usePayments = (): UsePaymentsReturn => {
  const [payments, setPayments] = useState<PaymentResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPayments = useCallback(async (params?: {
    status?: string;
    payment_type?: string;
    property_id?: string;
  }) => {
    setLoading(true);
    setError(null);
    try {
      const data = await maintenancePaymentService.getPayments(params);
      setPayments(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch payments');
      setPayments([]);
=======
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
>>>>>>> main
    } finally {
      setLoading(false);
    }
  }, []);

<<<<<<< HEAD
  const createPayment = useCallback(async (payment: PaymentCreate): Promise<PaymentResponse | null> => {
    setLoading(true);
    setError(null);
    try {
      const newPayment = await maintenancePaymentService.createPayment(payment);
      setPayments(prev => [newPayment, ...prev]);
=======
  const createPayment = useCallback(async (paymentData: PaymentCreate): Promise<Payment | null> => {
    setLoading(true);
    setError(null);
    try {
      const newPayment = await dataService.createPayment(paymentData);
      setPayments(prev => [...prev, newPayment]);
>>>>>>> main
      return newPayment;
    } catch (err: any) {
      setError(err.message || 'Failed to create payment');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

<<<<<<< HEAD
  const updatePaymentStatus = useCallback(async (id: string, updates: PaymentUpdate): Promise<PaymentResponse | null> => {
    setLoading(true);
    setError(null);
    try {
      const updatedPayment = await maintenancePaymentService.updatePaymentStatus(id, updates);
=======
  const updatePaymentStatus = useCallback(async (id: string, status: PaymentStatus): Promise<Payment | null> => {
    setLoading(true);
    setError(null);
    try {
      const updatedPayment = await dataService.updatePaymentStatus(id, status);
>>>>>>> main
      setPayments(prev => prev.map(p => p.id === id ? updatedPayment : p));
      return updatedPayment;
    } catch (err: any) {
      setError(err.message || 'Failed to update payment status');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

<<<<<<< HEAD
  const getPaymentSchedule = useCallback(async (propertyId: string): Promise<PaymentScheduleResponse | null> => {
    setLoading(true);
    setError(null);
    try {
      const schedule = await maintenancePaymentService.getPaymentSchedule(propertyId);
      return schedule;
    } catch (err: any) {
      setError(err.message || 'Failed to get payment schedule');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const processPayment = useCallback(async (id: string, paymentMethod: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      const updatedPayment = await maintenancePaymentService.processPayment(id, paymentMethod);
      setPayments(prev => prev.map(p => p.id === id ? updatedPayment : p));
      return true;
    } catch (err: any) {
      setError(err.message || 'Failed to process payment');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const refundPayment = useCallback(async (id: string, reason?: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      const updatedPayment = await maintenancePaymentService.refundPayment(id, reason);
      setPayments(prev => prev.map(p => p.id === id ? updatedPayment : p));
      return true;
    } catch (err: any) {
      setError(err.message || 'Failed to refund payment');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const getClientPayments = useCallback(async (): Promise<PaymentResponse[]> => {
    setLoading(true);
    setError(null);
    try {
      const data = await maintenancePaymentService.getClientPayments();
      return data;
    } catch (err: any) {
      setError(err.message || 'Failed to fetch client payments');
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const getDeveloperPayments = useCallback(async (): Promise<PaymentResponse[]> => {
    setLoading(true);
    setError(null);
    try {
      const data = await maintenancePaymentService.getDeveloperPayments();
      return data;
    } catch (err: any) {
      setError(err.message || 'Failed to fetch developer payments');
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const getPaymentAnalytics = useCallback(async (params?: {
    start_date?: string;
    end_date?: string;
    property_id?: string;
  }) => {
    setLoading(true);
    setError(null);
    try {
      const analytics = await maintenancePaymentService.getPaymentAnalytics(params);
      return analytics;
    } catch (err: any) {
      setError(err.message || 'Failed to fetch payment analytics');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshPayments = useCallback(async () => {
    await fetchPayments();
  }, [fetchPayments]);
=======
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
>>>>>>> main

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
<<<<<<< HEAD
    getPaymentSchedule,
    processPayment,
    refundPayment,
    getClientPayments,
    getDeveloperPayments,
    getPaymentAnalytics,
    refreshPayments,
  };
};
=======
    getPaymentsByStatus,
    getPaymentsByType,
    getTotalRevenue,
    getPendingPayments,
  };
};
>>>>>>> main
