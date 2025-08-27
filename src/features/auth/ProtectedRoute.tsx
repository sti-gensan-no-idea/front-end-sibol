import React from 'react';
import { Navigate } from 'react-router-dom';
import { getRole, UserRole } from './auth.store';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allow: UserRole[];
}

export function ProtectedRoute({ children, allow }: ProtectedRouteProps) {
  const role = getRole();
  
  if (!role || !allow.includes(role)) {
    return <Navigate to="/signin" replace />;
  }
  
  return <>{children}</>;
}

// Convenience components for specific roles
export const ClientOnly = ({ children }: { children: React.ReactNode }) => (
  <ProtectedRoute allow={['client']}>{children}</ProtectedRoute>
);

export const AgentOnly = ({ children }: { children: React.ReactNode }) => (
  <ProtectedRoute allow={['agent']}>{children}</ProtectedRoute>
);

export const BrokerOnly = ({ children }: { children: React.ReactNode }) => (
  <ProtectedRoute allow={['broker']}>{children}</ProtectedRoute>
);

export const DeveloperOnly = ({ children }: { children: React.ReactNode }) => (
  <ProtectedRoute allow={['developer']}>{children}</ProtectedRoute>
);

export const AdminOnly = ({ children }: { children: React.ReactNode }) => (
  <ProtectedRoute allow={['admin']}>{children}</ProtectedRoute>
);

// Multi-role components
export const StaffOnly = ({ children }: { children: React.ReactNode }) => (
  <ProtectedRoute allow={['agent', 'broker', 'developer', 'admin']}>{children}</ProtectedRoute>
);

export const ManagementOnly = ({ children }: { children: React.ReactNode }) => (
  <ProtectedRoute allow={['broker', 'admin']}>{children}</ProtectedRoute>
);
