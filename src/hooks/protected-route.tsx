import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Spinner } from "@heroui/react";
<<<<<<< HEAD
import { useAuth, type UserRole } from "./useAuth";
=======
import { useAuth } from "./useAuth";
>>>>>>> main

interface ProtectedRouteProps {
  allowedRole: UserRole;
  requiresPermission?: string;
}

<<<<<<< HEAD
export const ProtectedRoute = ({ allowedRole, requiresPermission }: ProtectedRouteProps) => {
  const { 
    isAuthenticated, 
    userRole, 
    checkSession, 
    hasPermission,
    canAccessRoute,
    logout 
  } = useAuth();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check session validity on route access
    const validateSession = () => {
      if (!checkSession()) {
        logout();
        return;
      }
      
      // Add a small delay to prevent flash of content
      const timer = setTimeout(() => {
        setLoading(false);
      }, 100);

      return () => clearTimeout(timer);
    };

    validateSession();
  }, [checkSession, logout]);
=======
export const ProtectedRoute = ({ allowedRole }: AllowedRoleInterface) => {
  const { isAuthenticated, userRole } = useAuth();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Add a small delay to prevent flash of content
    const timer = setTimeout(() => {
      setLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);
>>>>>>> main

  if (loading) {
    return <LoadingPage />;
  }

  // Check if user is authenticated and session is valid
  if (!isAuthenticated) {
    // Redirect to appropriate sign-in page based on required role
    switch (allowedRole) {
      case 'developer':
        return <Navigate replace to="/signin/developer" />;
      case 'broker':
        return <Navigate replace to="/signin/broker" />;
      case 'agent':
        return <Navigate replace to="/signin/agent" />;
      case 'admin':
        return <Navigate replace to="/signin" state={{ requiresAdmin: true }} />;
      default:
        return <Navigate replace to="/signin" />;
    }
  }

<<<<<<< HEAD
  // Check if user has the required role
  if (userRole !== allowedRole) {
    // Redirect to appropriate dashboard if user has wrong role but is authenticated
    return <Navigate replace to={getDashboardRoute(userRole)} />;
  }

  // Check specific permission if required
  if (requiresPermission && !hasPermission(requiresPermission)) {
    return <UnauthorizedPage requiredPermission={requiresPermission} />;
  }

  // Check if user can access the current route
  const currentPath = window.location.pathname;
  if (!canAccessRoute(currentPath)) {
    return <Navigate replace to={getDashboardRoute(userRole)} />;
=======
  if (userRole !== allowedRole) {
    // Redirect to appropriate dashboard if user has wrong role but is authenticated
    switch (userRole) {
      case 'client':
        return <Navigate replace to="/client/dashboard" />;
      case 'developer':
        return <Navigate replace to="/developer/dashboard" />;
      case 'agent':
        return <Navigate replace to="/agent/dashboard" />;
      case 'broker':
        return <Navigate replace to="/broker/dashboard" />;
      case 'admin':
        return <Navigate replace to="/admin/dashboard" />;
      default:
        return <Navigate replace to="/signin" />;
    }
>>>>>>> main
  }

  return <Outlet />;
};

// Helper function to get dashboard route based on role
const getDashboardRoute = (role: UserRole | null): string => {
  switch (role) {
    case 'client':
      return '/client/dashboard';
    case 'developer':
      return '/developer/dashboard';
    case 'agent':
      return '/agent/dashboard';
    case 'broker':
      return '/broker/dashboard';
    case 'admin':
      return '/admin/dashboard';
    default:
      return '/signin';
  }
};

// Loading Page Component
const LoadingPage = () => {
  return (
    <main className="h-screen container mx-auto flex flex-col items-center justify-center">
      <Spinner color="primary" size="lg" />
<<<<<<< HEAD
      <span className="mt-4 text-lg text-gray-600">Verifying session...</span>
=======
      <span className="mt-4 text-lg text-gray-600">Loading...</span>
>>>>>>> main
    </main>
  );
};

// Unauthorized Page Component
const UnauthorizedPage = ({ requiredPermission }: { requiredPermission: string }) => {
  const { userRole, logout } = useAuth();
  
  return (
    <main className="h-screen container mx-auto flex flex-col items-center justify-center">
      <div className="text-center max-w-md">
        <div className="mb-4">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.314 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
        <p className="text-gray-600 mb-4">
          Your role ({userRole}) does not have the required permission: <code className="bg-gray-100 px-2 py-1 rounded">{requiredPermission}</code>
        </p>
        <div className="space-y-2">
          <button
            onClick={() => window.history.back()}
            className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
          >
            Go Back
          </button>
          <button
            onClick={logout}
            className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>
    </main>
  );
};