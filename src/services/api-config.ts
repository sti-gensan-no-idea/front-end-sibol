import axios from 'axios';

// API Configuration
const API_CONFIG = {
  openRealEstate: {
    baseURL: import.meta.env.VITE_OPEN_REAL_ESTATE_API_URL || 'https://demo-api.openrealestate.co',
    apiKey: import.meta.env.VITE_OPEN_REAL_ESTATE_API_KEY || 'demo_key_aTuna_2025'
  },
  podio: {
    clientId: import.meta.env.VITE_PODIO_CLIENT_ID || 'atuna-demo-client',
    clientSecret: import.meta.env.VITE_PODIO_CLIENT_SECRET || 'demo_secret_key',
    appId: import.meta.env.VITE_PODIO_APP_ID || 'general-santos-real-estate'
  },
  openMaint: {
    baseURL: import.meta.env.VITE_OPENMAINT_API_URL || 'https://demo-api.openmaint.org',
    apiKey: import.meta.env.VITE_OPENMAINT_API_KEY || 'demo_maint_key_atuna'
  },
  simplyRets: {
    baseURL: import.meta.env.VITE_SIMPLYRETS_API_URL || 'https://demo-api.simplyrets.com',
    apiKey: import.meta.env.VITE_SIMPLYRETS_API_KEY || 'demo_simply_rets_key'
  },
  mortgageApi: {
    baseURL: import.meta.env.VITE_MORTGAGE_API_URL || 'https://demo-api.mortgageapi.com',
    apiKey: import.meta.env.VITE_MORTGAGE_API_KEY || 'demo_mortgage_calculator_key'
  },
  smsGateway: {
    baseURL: import.meta.env.VITE_SMS_GATEWAY_URL || 'https://api.semaphore.co',
    apiKey: import.meta.env.VITE_SMS_API_KEY || 'demo_semaphore_key_philippines'
  }
};

// Create axios instances for each API
const createApiInstance = (config: { baseURL: string; apiKey: string }) => {
  const instance = axios.create({
    baseURL: config.baseURL,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${config.apiKey}`,
      'X-API-Key': config.apiKey
    }
  });

  // Add response interceptor for demo mode
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      console.log(`Demo API Call: ${error.config?.method?.toUpperCase()} ${error.config?.url}`);
      // Return mock success response for demo
      return Promise.resolve({
        data: { success: true, message: 'Demo API response', timestamp: new Date().toISOString() },
        status: 200,
        statusText: 'OK'
      });
    }
  );

  return instance;
};

export const apiClients = {
  openRealEstate: createApiInstance(API_CONFIG.openRealEstate),
  openMaint: createApiInstance(API_CONFIG.openMaint),
  simplyRets: createApiInstance(API_CONFIG.simplyRets),
  mortgageApi: createApiInstance(API_CONFIG.mortgageApi),
  smsGateway: createApiInstance(API_CONFIG.smsGateway)
};

// Type definitions for API responses
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message: string;
  timestamp: string;
}

export interface PropertyListing {
  id: string;
  title: string;
  description: string;
  price: number;
  address: string;
  images: string[];
  features: string[];
  coordinates?: { lat: number; lng: number };
}

export interface LeadCaptureData {
  name: string;
  email: string;
  phone: string;
  message: string;
  propertyId?: string;
  source: string;
  preferences?: {
    budget: number;
    bedrooms: number;
    petFriendly: boolean;
    nonHaunted: boolean;
    floodSafe: boolean;
  };
}

export interface EventScheduleData {
  title: string;
  description: string;
  date: string;
  time: string;
  duration: number;
  attendees: string[];
  location: string;
  type: 'Viewing' | 'Inspection' | 'Meeting' | 'Open House';
}

export interface MortgageCalculation {
  principal: number;
  interestRate: number;
  termYears: number;
  downPayment: number;
  monthlyPayment: number;
  totalInterest: number;
  amortizationSchedule?: Array<{
    month: number;
    payment: number;
    principal: number;
    interest: number;
    balance: number;
  }>;
}

export interface SmsMessage {
  to: string;
  message: string;
  sender?: string;
  scheduled?: string;
}

export const API_CONFIG_EXPORT = API_CONFIG;
