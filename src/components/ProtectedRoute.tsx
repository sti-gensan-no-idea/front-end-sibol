// Protected Route Component
import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { authAPI } from '../api/endpoints/auth';
import { UserRole } from '../api/types';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
  redirectTo?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles = [],
  redirectTo = '/signin',
}) => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const isAuthenticated = authAPI.isAuthenticated();
      const role = authAPI.getUserRole();
      
      if (!isAuthenticated) {
        setIsAuthorized(false);
      } else if (allowedRoles.length === 0) {
        setIsAuthorized(true);
      } else if (role && allowedRoles.includes(role as UserRole)) {
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
      }
      
      setUserRole(role);
      setIsLoading(false);
    };

    checkAuth();
  }, [allowedRoles]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Not authenticated
  if (!authAPI.isAuthenticated()) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // Wrong role - redirect to appropriate dashboard
  if (!isAuthorized && userRole) {
    const roleRoutes: Record<string, string> = {
      client: '/profile/client',
      developer: '/profile/developer',
      agent: '/profile/agent',
      broker: '/profile/broker',
      admin: '/profile/admin',
    };

    return <Navigate to={roleRoutes[userRole] || '/'} replace />;
  }

  // Not authorized and no role
  if (!isAuthorized) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
