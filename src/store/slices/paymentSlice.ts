// Payment Redux Slice
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from '../../services/api/apiClient';
import { PaymentCreate, PaymentStatusEnum } from '../../types/apiTypes';

interface PaymentState {
  payments: any[];
  selectedPayment: any | null;
  paymentSchedule: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: PaymentState = {
  payments: [],
  selectedPayment: null,
  paymentSchedule: null,
  loading: false,
  error: null,
};

export const createPayment = createAsyncThunk(
  'payments/create',
  async (data: PaymentCreate) => {
    return await apiClient.post('/maintenance/payments/', data);
  }
);

export const fetchPayments = createAsyncThunk(
  'payments/fetchAll',
  async (params?: { property_id?: string; status_filter?: PaymentStatusEnum }) => {
    return await apiClient.get<any[]>('/maintenance/payments/', { params });
  }
);

export const updatePaymentStatus = createAsyncThunk(
  'payments/updateStatus',
  async ({ 
    paymentId, 
    newStatus, 
    transactionId, 
    receiptUrl, 
    notes 
  }: {
    paymentId: string;
    newStatus: PaymentStatusEnum;
    transactionId?: string;
    receiptUrl?: string;
    notes?: string;
  }) => {
    const params: any = { new_status: newStatus };
    if (transactionId) params.transaction_id = transactionId;
    if (receiptUrl) params.receipt_url = receiptUrl;
    if (notes) params.notes = notes;
    
    return await apiClient.put(`/maintenance/payments/${paymentId}/status`, null, { params });
  }
);

export const fetchPaymentReceipt = createAsyncThunk(
  'payments/fetchReceipt',
  async (paymentId: string) => {
    return await apiClient.get(`/maintenance/payments/${paymentId}/receipt`);
  }
);

export const fetchPaymentSchedule = createAsyncThunk(
  'payments/fetchSchedule',
  async (propertyId: string) => {
    return await apiClient.get(`/maintenance/payments/property/${propertyId}/schedule`);
  }
);

const paymentSlice = createSlice({
  name: 'payments',
  initialState,
  reducers: {
    setSelectedPayment: (state, action) => {
      state.selectedPayment = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPayment.fulfilled, (state, action) => {
        state.loading = false;
        state.payments.unshift(action.payload);
      })
      .addCase(createPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create payment';
      })
      .addCase(fetchPayments.fulfilled, (state, action) => {
        state.payments = action.payload;
      })
      .addCase(updatePaymentStatus.fulfilled, (state, action) => {
        const index = state.payments.findIndex(p => p.id === action.payload.id);
        if (index !== -1) {
          state.payments[index] = action.payload;
        }
      })
      .addCase(fetchPaymentSchedule.fulfilled, (state, action) => {
        state.paymentSchedule = action.payload;
      });
  },
});

export const { setSelectedPayment, clearError } = paymentSlice.actions;
export default paymentSlice.reducer;
