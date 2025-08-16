import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Spinner } from "@heroui/react";

import { useAuth, type UserRole } from "./useAuth";

interface ProtectedRouteProps {
  allowedRole: UserRole;
  requiresPermission?: string;
}

export const ProtectedRoute = ({
  allowedRole,
  requiresPermission,
}: ProtectedRouteProps) => {
  const {
    isAuthenticated,
    userRole,
    checkSession,
    hasPermission,
    canAccessRoute,
    logout,
  } = useAuth();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const validateSession = () => {
      if (!checkSession()) {
        logout();

        return;
      }

      const timer = setTimeout(() => {
        setLoading(false);
      }, 100);

      return () => clearTimeout(timer);
    };

    validateSession();
  }, [checkSession, logout]);

  if (loading) {
    return <LoadingPage />;
  }

  if (!isAuthenticated) {
    switch (allowedRole) {
      case "developer":
        return <Navigate replace to="/signin/developer" />;
      case "broker":
        return <Navigate replace to="/signin/broker" />;
      case "agent":
        return <Navigate replace to="/signin/agent" />;
      case "admin":
        return (
          <Navigate replace state={{ requiresAdmin: true }} to="/signin" />
        );
      default:
        return <Navigate replace to="/signin" />;
    }
  }

  if (userRole !== allowedRole) {
    return <Navigate replace to={getDashboardRoute(userRole)} />;
  }

  if (requiresPermission && !hasPermission(requiresPermission)) {
    return <UnauthorizedPage requiredPermission={requiresPermission} />;
  }

  const currentPath = window.location.pathname;

  if (!canAccessRoute(currentPath)) {
    return <Navigate replace to={getDashboardRoute(userRole)} />;
  }

  return <Outlet />;
};

const getDashboardRoute = (role: UserRole | null): string => {
  switch (role) {
    case "client":
      return "/client/dashboard";
    case "developer":
      return "/developer/dashboard";
    case "agent":
      return "/agent/dashboard";
    case "broker":
      return "/broker/dashboard";
    case "admin":
      return "/admin/dashboard";
    default:
      return "/signin";
  }
};

const LoadingPage = () => {
  return (
    <main className="h-screen container mx-auto flex flex-col items-center justify-center">
      <Spinner color="primary" size="lg" />
      <span className="mt-4 text-lg text-gray-600">Verifying session...</span>
    </main>
  );
};

const UnauthorizedPage = ({
  requiredPermission,
}: {
  requiredPermission: string;
}) => {
  const { userRole, logout } = useAuth();

  return (
    <main className="h-screen container mx-auto flex flex-col items-center justify-center">
      <div className="text-center max-w-md">
        <div className="mb-4">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.314 16.5c-.77.833.192 2.5 1.732 2.5z"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              />
            </svg>
          </div>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
        <p className="text-gray-600 mb-4">
          Your role ({userRole}) does not have the required permission:{" "}
          <code className="bg-gray-100 px-2 py-1 rounded">
            {requiredPermission}
          </code>
        </p>
        <div className="space-y-2">
          <button
            className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
            onClick={() => window.history.back()}
          >
            Go Back
          </button>
          <button
            className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            onClick={logout}
          >
            Sign Out
          </button>
        </div>
      </div>
    </main>
  );
};
