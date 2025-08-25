import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/lib/auth/useAuth";
import { Card, CardBody } from "@heroui/react";
import { IconLock, IconUser, IconAlertTriangle } from "@tabler/icons-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string | string[];
  fallback?: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredRole,
  fallback 
}) => {
  const { isAuthenticated, user, isLoading } = useAuth();
  const location = useLocation();

  // Loading state
  if (isLoading) {
    return fallback || (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Not authenticated - redirect to signin
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <Card className="w-full max-w-md">
          <CardBody className="p-8 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <IconLock className="w-8 h-8 text-red-600" />
            </div>
            <h2 className="text-xl font-semibold mb-2 text-gray-900">
              Authentication Required
            </h2>
            <p className="text-gray-600 mb-6">
              You're not logged in. Please sign in to access this page.
            </p>
            <div className="space-y-3">
              <button
                onClick={() => window.location.href = `/signin?redirect=${encodeURIComponent(location.pathname + location.search)}`}
                className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors"
              >
                Sign In
              </button>
              <button
                onClick={() => window.location.href = '/'}
                className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Go Home
              </button>
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }

  // Check role-based access
  if (requiredRole) {
    const userRole = user?.role;
    const allowedRoles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
    
    if (!userRole || !allowedRoles.includes(userRole)) {
      const roleDisplayNames: Record<string, string> = {
        client: "Client",
        developer: "Developer",
        agent: "Agent",
        broker: "Broker",
        admin: "Administrator"
      };

      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
          <Card className="w-full max-w-md">
            <CardBody className="p-8 text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <IconAlertTriangle className="w-8 h-8 text-orange-600" />
              </div>
              <h2 className="text-xl font-semibold mb-2 text-gray-900">
                Access Denied
              </h2>
              <p className="text-gray-600 mb-4">
                You're not authorized to access this page.
              </p>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-2 text-sm">
                  <IconUser className="w-4 h-4 text-red-600" />
                  <span className="font-medium text-red-800">
                    Required: {allowedRoles.map(role => roleDisplayNames[role] || role).join(" or ")}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm mt-1">
                  <IconUser className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">
                    Your Role: {roleDisplayNames[userRole] || userRole}
                  </span>
                </div>
              </div>
              <div className="space-y-3">
                <button
                  onClick={() => {
                    const dashboardRoutes: Record<string, string> = {
                      client: "/profile/client",
                      developer: "/profile/developer", 
                      agent: "/profile/agent",
                      broker: "/profile/broker",
                      admin: "/profile/admin"
                    };
                    window.location.href = dashboardRoutes[userRole] || '/';
                  }}
                  className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Go to My Dashboard
                </button>
                <button
                  onClick={() => window.location.href = '/'}
                  className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Go Home
                </button>
              </div>
            </CardBody>
          </Card>
        </div>
      );
    }
  }

  return <>{children}</>;
};

// Higher-order component for easier usage
export const withAuth = (Component: React.ComponentType<any>, requiredRole?: string | string[]) => {
  return (props: any) => (
    <ProtectedRoute requiredRole={requiredRole}>
      <Component {...props} />
    </ProtectedRoute>
  );
};

// Specific role guards
export const RequireClient = ({ children }: { children: React.ReactNode }) => (
  <ProtectedRoute requiredRole="client">{children}</ProtectedRoute>
);

export const RequireDeveloper = ({ children }: { children: React.ReactNode }) => (
  <ProtectedRoute requiredRole="developer">{children}</ProtectedRoute>
);

export const RequireAgent = ({ children }: { children: React.ReactNode }) => (
  <ProtectedRoute requiredRole="agent">{children}</ProtectedRoute>
);

export const RequireBroker = ({ children }: { children: React.ReactNode }) => (
  <ProtectedRoute requiredRole="broker">{children}</ProtectedRoute>
);

export const RequireAdmin = ({ children }: { children: React.ReactNode }) => (
  <ProtectedRoute requiredRole="admin">{children}</ProtectedRoute>
);

export const RequireAdminOrBroker = ({ children }: { children: React.ReactNode }) => (
  <ProtectedRoute requiredRole={["admin", "broker"]}>{children}</ProtectedRoute>
);
