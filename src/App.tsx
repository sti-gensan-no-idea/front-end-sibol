import { Route, Routes } from "react-router-dom";

import { IndexPage } from "@/pages/public";
import { SignInPage } from "@/pages/public/signin";
import { SignUpPage } from "@/pages/public/signup";
import { AboutUsPage } from "@/pages/public/about-us";
import { AgentSignInPage } from "@/pages/public/agent-signin";
import { BrokerSignInPage } from "@/pages/public/broker-signin";
import { DeveloperSignInPage } from "@/pages/public/developer-signin";
import { DashboardClientPage } from "@/pages/client/dashboard-client";
import { DashboardDeveloperPage } from "@/pages/developer/dashboard-developer";
import { DashboardAgentPage } from "@/pages/agent/dashboard-agent";
import { DashboardBrokerPage } from "@/pages/broker/dashboard-broker";
import { DashboardAdminPage } from "@/pages/admin/dashboard-admin";
import { NotFoundPage } from "@/pages/public/not-found";
<<<<<<< HEAD
import { ProtectedRoute } from "@/hooks";
import { SessionManager } from "@/components/SessionManager";

function App() {
  return (
    <>
      {/* Global session management */}
      <SessionManager />
      
      <Routes>
        {/* Public Routes */}
        <Route element={<IndexPage />} path="/" />
        <Route element={<SignInPage />} path="/signin" />
        <Route element={<SignUpPage />} path="/signup" />
        <Route element={<AboutUsPage />} path="/about" />

        {/* Role-specific Sign In pages */}
        <Route element={<AgentSignInPage />} path="/signin/agent" />
        <Route element={<BrokerSignInPage />} path="/signin/broker" />
        <Route element={<DeveloperSignInPage />} path="/signin/developer" />

        {/* Protected Client Routes */}
        <Route element={<ProtectedRoute allowedRole="client" />}>
          <Route element={<DashboardClientPage />} path="/client/dashboard" />
          <Route element={<DashboardClientPage />} path="/client/profile" />
          <Route element={<DashboardClientPage />} path="/client/properties" />
          <Route element={<DashboardClientPage />} path="/client/bookmarks" />
          <Route element={<DashboardClientPage />} path="/client/payments" />
          <Route element={<DashboardClientPage />} path="/client/maintenance" />
          <Route element={<DashboardClientPage />} path="/client/site-viewings" />
        </Route>

        {/* Protected Developer Routes */}
        <Route element={<ProtectedRoute allowedRole="developer" />}>
          <Route element={<DashboardDeveloperPage />} path="/developer/dashboard" />
          <Route element={<DashboardDeveloperPage />} path="/developer/profile" />
          <Route element={<DashboardDeveloperPage />} path="/developer/properties" />
          <Route element={<DashboardDeveloperPage />} path="/developer/upload" />
          <Route element={<DashboardDeveloperPage />} path="/developer/analytics" />
          <Route element={<DashboardDeveloperPage />} path="/developer/maintenance" />
        </Route>

        {/* Protected Agent Routes */}
        <Route element={<ProtectedRoute allowedRole="agent" />}>
          <Route element={<DashboardAgentPage />} path="/agent/dashboard" />
          <Route element={<DashboardAgentPage />} path="/agent/profile" />
          <Route element={<DashboardAgentPage />} path="/agent/leads" />
          <Route element={<DashboardAgentPage />} path="/agent/crm" />
          <Route element={<DashboardAgentPage />} path="/agent/site-viewings" />
          <Route element={<DashboardAgentPage />} path="/agent/properties" />
        </Route>

        {/* Protected Broker Routes */}
        <Route element={<ProtectedRoute allowedRole="broker" />}>
          <Route element={<DashboardBrokerPage />} path="/broker/dashboard" />
          <Route element={<DashboardBrokerPage />} path="/broker/profile" />
          <Route element={<DashboardBrokerPage />} path="/broker/teams" />
          <Route element={<DashboardBrokerPage />} path="/broker/agents" />
          <Route element={<DashboardBrokerPage />} path="/broker/properties" />
          <Route element={<DashboardBrokerPage />} path="/broker/analytics" />
          <Route element={<DashboardBrokerPage />} path="/broker/commission" />
        </Route>

        {/* Protected Admin Routes */}
        <Route element={<ProtectedRoute allowedRole="admin" />}>
          <Route element={<DashboardAdminPage />} path="/admin/dashboard" />
          <Route element={<DashboardAdminPage />} path="/admin/users" />
          <Route element={<DashboardAdminPage />} path="/admin/accounts" />
          <Route element={<DashboardAdminPage />} path="/admin/analytics" />
          <Route element={<DashboardAdminPage />} path="/admin/reports" />
          <Route element={<DashboardAdminPage />} path="/admin/system" />
        </Route>

        {/* Legacy routes for backward compatibility */}
        <Route element={<DashboardClientPage />} path="/profile/client" />
        <Route element={<DashboardDeveloperPage />} path="/profile/developer" />
        <Route element={<DashboardAgentPage />} path="/profile/agent" />
        <Route element={<DashboardBrokerPage />} path="/profile/broker" />
        <Route element={<DashboardAdminPage />} path="/profile/admin" />

        {/* 404 Page */}
        <Route element={<NotFoundPage />} path="*" />
      </Routes>
    </>
=======
import { ProtectedRoute } from "@/hooks/protected-route";

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<IndexPage />} path="/" />
      <Route element={<SignInPage />} path="/signin" />
      <Route element={<SignUpPage />} path="/signup" />
      <Route element={<AboutUsPage />} path="/about" />

      {/* Role-specific Sign In pages */}
      <Route element={<AgentSignInPage />} path="/signin/agent" />
      <Route element={<BrokerSignInPage />} path="/signin/broker" />
      <Route element={<DeveloperSignInPage />} path="/signin/developer" />

      {/* Role-specific Sign Up pages */}
      <Route element={<AgentSignUpPage />} path="/signup/agent" />
      <Route element={<BrokerSignUpPage />} path="/signup/broker" />
      <Route element={<DeveloperSignUpPage />} path="/signup/developer" />

      {/* Protected Client Routes */}
      <Route element={<ProtectedRoute allowedRole="client" />}>
        <Route element={<DashboardClientPage />} path="/client/dashboard" />
        <Route element={<DashboardClientPage />} path="/profile/client" />
      </Route>

      {/* Protected Developer Routes */}
      <Route element={<ProtectedRoute allowedRole="developer" />}>
        <Route element={<DashboardDeveloperPage />} path="/developer/dashboard" />
        <Route element={<DashboardDeveloperPage />} path="/profile/developer" />
      </Route>

      {/* Protected Agent Routes */}
      <Route element={<ProtectedRoute allowedRole="agent" />}>
        <Route element={<DashboardAgentPage />} path="/agent/dashboard" />
        <Route element={<DashboardAgentPage />} path="/profile/agent" />
      </Route>

      {/* Protected Broker Routes */}
      <Route element={<ProtectedRoute allowedRole="broker" />}>
        <Route element={<DashboardBrokerPage />} path="/broker/dashboard" />
        <Route element={<DashboardBrokerPage />} path="/profile/broker" />
      </Route>

      {/* Protected Admin Routes */}
      <Route element={<ProtectedRoute allowedRole="admin" />}>
        <Route element={<DashboardAdminPage />} path="/admin/dashboard" />
        <Route element={<DashboardAdminPage />} path="/profile/admin" />
      </Route>

      {/* 404 Page */}
      <Route element={<NotFoundPage />} path="*" />
    </Routes>
>>>>>>> main
  );
}

export default App;