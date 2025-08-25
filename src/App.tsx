import { Route, Routes, Navigate } from "react-router-dom";

import { IndexPage } from "@/pages/public";
import { SignInPage } from "@/pages/public/signin";
import { SignUpPage } from "@/pages/public/signup";
// import { AboutUsPage } from "@/pages/public/about-us";
import { DashboardClientPage } from "@/pages/client/dashboard-client";
import { DashboardDeveloperPage } from "@/pages/developer/dashboard-developer";
import { DashboardAgentPage } from "@/pages/agent/dashboard-agent";
import { DashboardBrokerPage } from "@/pages/broker/dashboard-broker";
import { DashboardAdminPage } from "@/pages/admin/dashboard-admin";
import { NotFoundPage } from "@/pages/public/not-found";
import { FindAgents } from "@/pages/public/find-agents";
import { PropertiesPage } from "@/pages/public/properties";
import { SignUpRoutes } from "@/features/signup/SignUpRoutes";
import { ChatbaseBootstrap } from "@/lib/chatbase/bootstrap";
import { useAuth } from "@/lib/auth/useAuth";
import {
  RequireClient,
  RequireDeveloper,
  RequireAgent,
  RequireBroker,
  RequireAdmin,
  ProtectedRoute,
} from "@/lib/auth/ProtectedRoute";

function App() {
  return (
    <>
      <ChatbaseBootstrap />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<IndexPage />} />
        <Route path="/properties" element={<PropertiesPage />} />
        <Route path="/agents" element={<FindAgents />} />
        {/* <Route path="/about" element={<AboutUsPage />} /> */}
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />

        {/* Multi-Role Signup Routes */}
        <Route path="/signup/:role/*" element={<SignUpRoutes />} />

        {/* Protected Dashboard Routes */}
        <Route
          path="/profile/client/*"
          element={
            <RequireClient>
              <DashboardClientPage />
            </RequireClient>
          }
        />

        <Route
          path="/profile/developer/*"
          element={
            <RequireDeveloper>
              <DashboardDeveloperPage />
            </RequireDeveloper>
          }
        />

        <Route
          path="/profile/agent/*"
          element={
            <RequireAgent>
              <DashboardAgentPage />
            </RequireAgent>
          }
        />

        <Route
          path="/profile/broker/*"
          element={
            <RequireBroker>
              <DashboardBrokerPage />
            </RequireBroker>
          }
        />

        <Route
          path="/profile/admin/*"
          element={
            <RequireAdmin>
              <DashboardAdminPage />
            </RequireAdmin>
          }
        />

        {/* Catch-all protected routes */}
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute>
              <DashboardRedirect />
            </ProtectedRoute>
          }
        />

        {/* 404 Page */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

// Component to redirect users to their appropriate dashboard
const DashboardRedirect = () => {
  const { user } = useAuth();

  const dashboardRoutes: Record<string, string> = {
    client: "/profile/client",
    developer: "/profile/developer",
    agent: "/profile/agent",
    broker: "/profile/broker",
    admin: "/profile/admin",
  };

  const userRole = user?.role;
  const redirectPath = userRole ? dashboardRoutes[userRole] : "/";

  return <Navigate to={redirectPath} replace />;
};

export default App;
