import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Spinner } from "@heroui/react";

interface AllowedRoleInterface {
  allowedRole: "client" | "developer" | "agent" | "broker" | "admin";
}

export const ProtectedRoute = ({ allowedRole }: AllowedRoleInterface) => {
  const [role, setRole] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  if (loading) {
    return <LoadingPage />;
  }

  if (!isAuthenticated) {
    return <Navigate replace to="/signin" />;
  }

  if (role !== allowedRole) {
    return <Navigate replace to="/unauthorized" />;
  }

  return <Outlet />;
};

// Loading Page
const LoadingPage = () => {
  return (
    <main className="h-screen container mx-auto flex items-center justify-center text-3xl">
      <Spinner color="primary" size="lg" />
      <span className="mt-4">Please wait...</span>
    </main>
  );
};
