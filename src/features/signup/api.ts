import type { Role } from './roleConfig';
import { apiUrl } from '../../config/api';

interface RequestOtpRequest {
  email: string;
  role: Role;
}

interface VerifyOtpRequest {
  email: string;
  code: string;
  role: Role;
}

interface UploadCredentialRequest {
  file: File;
  role: Role;
  key: string;
}

interface SubmitApplicationRequest {
  role: Role;
  personal: any;
  files: Record<string, File>;
}

interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Signup endpoints
const SIGNUP_ENDPOINTS = {
  REQUEST_OTP: 'signup/request-otp',
  VERIFY_OTP: 'signup/verify-otp',
  UPLOAD_CREDENTIAL: 'signup/upload-credential',
  SUBMIT: 'signup/submit',
} as const;

// Request OTP for email verification
export async function requestOtp(data: RequestOtpRequest): Promise<ApiResponse> {
  try {
    const response = await fetch(apiUrl(SIGNUP_ENDPOINTS.REQUEST_OTP), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    return await response.json();
  } catch (error) {
    return {
      success: false,
      error: 'Failed to request OTP',
    };
  }
}

// Verify OTP code
export async function verifyOtp(data: VerifyOtpRequest): Promise<ApiResponse> {
  try {
    const response = await fetch(apiUrl(SIGNUP_ENDPOINTS.VERIFY_OTP), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    return await response.json();
  } catch (error) {
    return {
      success: false,
      error: 'Failed to verify OTP',
    };
  }
}

// Upload credential file
export async function uploadCredential(data: UploadCredentialRequest): Promise<ApiResponse> {
  try {
    const formData = new FormData();
    formData.append('file', data.file);
    formData.append('role', data.role);
    formData.append('key', data.key);

    const response = await fetch(apiUrl(SIGNUP_ENDPOINTS.UPLOAD_CREDENTIAL), {
      method: 'POST',
      body: formData,
    });

    return await response.json();
  } catch (error) {
    return {
      success: false,
      error: 'Failed to upload file',
    };
  }
}

// Submit complete application
export async function submitApplication(data: SubmitApplicationRequest): Promise<ApiResponse> {
  try {
    const formData = new FormData();
    
    // Add personal data
    formData.append('personal', JSON.stringify(data.personal));
    formData.append('role', data.role);

    // Add files
    Object.entries(data.files).forEach(([key, file]) => {
      formData.append(key, file);
    });

    const response = await fetch(apiUrl(SIGNUP_ENDPOINTS.SUBMIT), {
      method: 'POST',
      body: formData,
    });

    return await response.json();
  } catch (error) {
    return {
      success: false,
      error: 'Failed to submit application',
    };
  }
}
