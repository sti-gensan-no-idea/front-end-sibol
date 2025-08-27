import { Routes, Route, useParams, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { SignUpLayout } from './SignUpLayout';
import { StepPersonalInfo } from './steps/StepPersonalInfo';
import { StepOtp } from './steps/StepOtp';
import { StepCredentials } from './steps/StepCredentials';
import { StepReview } from './steps/StepReview';
import { RolePicker } from './RolePicker';
import { isValidRole } from './roleConfig';
import { useSignupStore } from './state';

function SignUpContent() {
  const { role } = useParams<{ role: string }>();
  const { setRole, reset } = useSignupStore();

  useEffect(() => {
    if (role && isValidRole(role)) {
      setRole(role);
    } else {
      // Reset state for invalid roles
      reset();
    }
  }, [role, setRole, reset]);

  // Invalid role - redirect to role picker
  if (!role || !isValidRole(role)) {
    return <RolePicker />;
  }

  return (
    <SignUpLayout role={role}>
      <Routes>
        <Route path="personal" element={<StepPersonalInfo />} />
        <Route path="verify-email" element={<StepOtp />} />
        <Route path="credentials" element={<StepCredentials />} />
        <Route path="review" element={<StepReview />} />
        <Route path="" element={<Navigate to="personal" replace />} />
        <Route path="*" element={<Navigate to="personal" replace />} />
      </Routes>
    </SignUpLayout>
  );
}

export function SignUpRoutes() {
  return <SignUpContent />;
}
