import { Route, Routes } from "react-router-dom";

import { IndexPage } from "@/pages/public";
import { SignInPage } from "@/pages/public/signin";
import { SignUpPage } from "@/pages/public/signup";
import { AboutUsPage } from "@/pages/public/about-us";
import { DashboardClientPage } from "@/pages/client/dashboard-client";
import { DashboardDeveloperPage } from "@/pages/developer/dashboard-developer";
import { DashboardAgentPage } from "@/pages/agent/dashboard-agent";
import { DashboardBrokerPage } from "@/pages/broker/dashboard-broker";
import { DashboardAdminPage } from "@/pages/admin/dashboard-admin";
import { NotFoundPage } from "@/pages/public/not-found";
import { FindAgents } from "@/pages/public/find-agents";
import { PropertiesPage } from "@/pages/public/properties";
import { SignUpRoutes } from "@/features/signup/SignUpRoutes";

function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      <Route element={<PropertiesPage />} path="/properties" />
      <Route element={<FindAgents />} path="/agents" />
      <Route element={<AboutUsPage />} path="/about" />
      <Route element={<SignInPage />} path="/signin" />
      <Route element={<SignUpPage />} path="/signup" />
      
      {/* New Multi-Role Signup Routes */}
      <Route path="/signup/:role/*" element={<SignUpRoutes />} />

      <Route element={<DashboardClientPage />} path="/profile/client" />
      <Route element={<DashboardDeveloperPage />} path="/profile/developer" />
      <Route element={<DashboardAgentPage />} path="/profile/agent" />
      <Route element={<DashboardBrokerPage />} path="/profile/broker" />
      <Route element={<DashboardAdminPage />} path="/profile/admin" />

      {/* 404 Page */}
      <Route element={<NotFoundPage />} path="*" />
    </Routes>
  );
}

export default App;
