import { create } from 'zustand';
import type { Role } from './roleConfig';
import type { PersonalInfoFormData, FileFormData } from './validation';

interface SignupState {
  role: Role | null;
  currentStep: number;
  personalData: PersonalInfoFormData | null;
  otpData: { code: string } | null;
  filesData: Record<string, File> | null;
  emailVerified: boolean;
  
  // Actions
  setRole: (role: Role) => void;
  setCurrentStep: (step: number) => void;
  setPersonalData: (data: PersonalInfoFormData) => void;
  setOtpData: (data: { code: string }) => void;
  setFileData: (key: string, file: File) => void;
  removeFileData: (key: string) => void;
  setEmailVerified: (verified: boolean) => void;
  reset: () => void;
}

export const useSignupStore = create<SignupState>((set) => ({
  role: null,
  currentStep: 1,
  personalData: null,
  otpData: null,
  filesData: null,
  emailVerified: false,

  setRole: (role) => set({ role }),
  setCurrentStep: (step) => set({ currentStep: step }),
  setPersonalData: (data) => set({ personalData: data }),
  setOtpData: (data) => set({ otpData: data }),
  setFileData: (key, file) => 
    set((state) => ({ 
      filesData: { ...state.filesData, [key]: file }
    })),
  removeFileData: (key) =>
    set((state) => {
      const newFiles = { ...state.filesData };
      delete newFiles[key];
      return { filesData: newFiles };
    }),
  setEmailVerified: (verified) => set({ emailVerified: verified }),
  reset: () => set({
    role: null,
    currentStep: 1,
    personalData: null,
    otpData: null,
    filesData: null,
    emailVerified: false,
  }),
}));
