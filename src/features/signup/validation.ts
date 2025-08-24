import { z } from "zod";

// Personal Info Schema
export const personalInfoSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  companyName: z.string().optional(),
  prcNumber: z.string().optional(),
});

// OTP Schema
export const otpSchema = z.object({
  code: z.string().length(6, "Enter 6-digit code"),
});

// File Schema
export const fileSchema = z.object({
  prc_license: z.instanceof(File).optional(),
  government_id: z.instanceof(File).optional(),
  dhsud_cpd: z.instanceof(File).optional(),
  lts: z.instanceof(File).optional(),
});

// Complete Signup Schema
export const signupSchema = z.object({
  personal: personalInfoSchema,
  otp: otpSchema,
  files: fileSchema,
});

export type PersonalInfoFormData = z.infer<typeof personalInfoSchema>;
export type OtpFormData = z.infer<typeof otpSchema>;
export type FileFormData = z.infer<typeof fileSchema>;
export type SignupFormData = z.infer<typeof signupSchema>;
