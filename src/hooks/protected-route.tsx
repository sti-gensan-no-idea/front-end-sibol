import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Spinner } from "@heroui/react";
import { useAuth } from "./useAuth";

interface AllowedRoleInterface {
  allowedRole: "client" | "developer" | "agent" | "broker" | "admin";
}

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

  if (loading) {
    return <LoadingPage />;
  }

  if (!isAuthenticated) {
    return <Navigate replace to="/signin" />;
  }

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
  }

  return <Outlet />;
};

// Loading Page
const LoadingPage = () => {
  return (
    <main className="h-screen container mx-auto flex flex-col items-center justify-center">
      <Spinner color="primary" size="lg" />
      <span className="mt-4 text-lg text-gray-600">Loading...</span>
    </main>
  );
};
