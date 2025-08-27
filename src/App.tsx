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

function App() {
  return (
    <>
      <ChatbaseBootstrap />
      <Routes>
        {/* Public Routes */}
        <Route element={<IndexPage />} path="/" />
        <Route element={<PropertiesPage />} path="/properties" />
        <Route element={<FindAgents />} path="/agents" />
        {/* <Route path="/about" element={<AboutUsPage />} /> */}
        <Route element={<SignInPage />} path="/signin" />
        <Route element={<SignUpPage />} path="/signup" />

        {/* Multi-Role Signup Routes */}
        <Route element={<SignUpRoutes />} path="/signup/:role/*" />

        {/* Dashboard Routes - no protection */}
        <Route element={<DashboardClientPage />} path="/profile/client/*" />
        <Route element={<DashboardDeveloperPage />} path="/profile/developer/*" />
        <Route element={<DashboardAgentPage />} path="/profile/agent/*" />
        <Route element={<DashboardBrokerPage />} path="/profile/broker/*" />
        <Route element={<DashboardAdminPage />} path="/profile/admin/*" />

        {/* Generic dashboard redirect */}
        <Route element={<DashboardRedirect />} path="/dashboard/*" />

        {/* 404 Page */}
        <Route element={<NotFoundPage />} path="*" />
      </Routes>
    </>
  );
}

// Simple redirect logic (kept, but no ProtectedRoute)
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

  return <Navigate replace to={redirectPath} />;
};

export default App;
