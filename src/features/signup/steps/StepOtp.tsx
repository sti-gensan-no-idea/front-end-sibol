import { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { Button, Card, CardBody } from '@heroui/react';
import { IconMail, IconArrowLeft } from '@tabler/icons-react';
import { otpSchema, type OtpFormData } from '../validation';
import { useSignupStore } from '../state';
import { requestOtp, verifyOtp } from '../api';
import { OtpInput } from '../components/OtpInput';

export function StepOtp() {
  const navigate = useNavigate();
  const { role, personalData, setOtpData, setCurrentStep, setEmailVerified } = useSignupStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<OtpFormData>({
    resolver: zodResolver(otpSchema),
  });

  // Countdown for resend button
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  // Send initial OTP when component mounts
  useEffect(() => {
    if (personalData?.email && role) {
      handleResendOtp();
    }
  }, []);

  const handleResendOtp = async () => {
    if (!personalData?.email || !role) return;

    setIsResending(true);
    setError(null);

    try {
      const response = await requestOtp({
        email: personalData.email,
        role,
      });

      if (response.success) {
        setCountdown(60); // 60 second countdown
      } else {
        setError(response.error || 'Failed to send OTP');
      }
    } catch (error) {
      setError('Failed to send OTP');
    } finally {
      setIsResending(false);
    }
  };

  const onSubmit = async (data: OtpFormData) => {
    if (!personalData?.email || !role) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await verifyOtp({
        email: personalData.email,
        code: data.code,
        role,
      });

      if (response.success) {
        setOtpData(data);
        setEmailVerified(true);
        setCurrentStep(3);
        navigate(`/signup/${role}/credentials`);
      } else {
        setError(response.error || 'Invalid verification code');
      }
    } catch (error) {
      setError('Failed to verify code');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpChange = (value: string) => {
    setValue('code', value);
    if (value.length === 6) {
      handleSubmit(onSubmit)();
    }
  };

  if (!personalData?.email) {
    navigate(`/signup/${role}/personal`);
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <IconMail className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Verify Your Email
        </h2>
        <p className="text-gray-600 mb-2">
          We've sent a 6-digit code to
        </p>
        <p className="font-medium text-gray-900">
          {personalData.email}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex flex-col items-center">
          <OtpInput
            length={6}
            onChange={handleOtpChange}
            error={!!errors.code || !!error}
          />
          
          {(errors.code || error) && (
            <p className="text-danger text-sm mt-2">
              {errors.code?.message || error}
            </p>
          )}
        </div>

        <div className="text-center">
          <p className="text-gray-600 mb-4">
            Didn't receive the code?
          </p>
          
          <Button
            variant="light"
            color="primary"
            size="sm"
            onClick={handleResendOtp}
            isLoading={isResending}
            isDisabled={countdown > 0}
          >
            {countdown > 0 
              ? `Resend code in ${countdown}s`
              : 'Resend code'
            }
          </Button>
        </div>

        <div className="flex justify-between pt-6">
          <Button
            variant="flat"
            color="default"
            startContent={<IconArrowLeft className="w-4 h-4" />}
            onClick={() => navigate(`/signup/${role}/personal`)}
          >
            Back
          </Button>
          
          <Button
            type="submit"
            color="primary"
            isLoading={isLoading}
            className="px-8"
          >
            Verify Email
          </Button>
        </div>
      </form>
    </div>
  );
}
