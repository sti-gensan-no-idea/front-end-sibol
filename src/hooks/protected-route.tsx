// ProtectedRoute.tsx
import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged, User } from "firebase/auth";
import { Spinner } from "@heroui/react";

import { auth, db } from "../firebase";

interface ProtectedRouteProps {
  allowedRole: "client" | "agent";
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRole }) => {
  const [role, setRole] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user: User | null) => {
      if (user) {
        try {
          const clientDocRef = doc(db, "clients", user.uid);
          const agentDocRef = doc(db, "agents", user.uid);

          const [clientDocSnap, agentDocSnap] = await Promise.all([
            getDoc(clientDocRef),
            getDoc(agentDocRef),
          ]);

          if (clientDocSnap.exists()) {
            setRole(clientDocSnap.data().role as string);
          } else if (agentDocSnap.exists()) {
            setRole(agentDocSnap.data().role as string);
          } else {
            setRole(null);
          }
          setIsAuthenticated(true);
        } catch (error: unknown) {
          console.error("Error checking role:", error);
          setRole(null);
          setIsAuthenticated(true);
        }
      } else {
        setIsAuthenticated(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="h-screen container mx-aut0 flex items-center justify-center text-3xl">
        <Spinner color="primary" size="lg" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate replace to="/sign-in" />;
  }

  if (role !== allowedRole) {
    return <Navigate replace to="/not-authorized" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
