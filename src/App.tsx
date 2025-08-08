import { Route, Routes } from "react-router-dom";

import { IndexPage } from "@/pages/public";
import { SignInPage } from "@/pages/public/signin";
import { SignUpPage } from "@/pages/public/signup";
import { AgentSignInPage } from "@/pages/public/agent-signin";
import { BrokerSignInPage } from "@/pages/public/broker-signin";
import { AgentSignUpPage } from "@/pages/public/agent-signup";
import { BrokerSignUpPage } from "@/pages/public/broker-signup";
import { DeveloperSignUpPage } from "@/pages/public/developer-signup";
import { DashboardClientPage } from "@/pages/client/dashboard-client";
import { DashboardDeveloperPage } from "@/pages/developer/dashboard-developer";
import { DashboardAgentPage } from "@/pages/agent/dashboard-agent";
import { DashboardBrokerPage } from "@/pages/broker/dashboard-broker";
import { DashboardAdminPage } from "@/pages/admin/dashboard-admin";
import { NotFoundPage } from "@/pages/public/not-found";

function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      <Route element={<SignInPage />} path="/signin" />
      <Route element={<SignUpPage />} path="/signup" />

      {/* Sign In of the 3 roles. */}
      <Route element={<AgentSignInPage />} path="/signin/agent" />
      <Route element={<BrokerSignInPage />} path="/signin/broker" />

      {/* Sign Up of the 3 roles. */}
      <Route element={<AgentSignUpPage />} path="/signup/agent" />
      <Route element={<BrokerSignUpPage />} path="/signup/broker" />
      <Route element={<DeveloperSignUpPage />} path="/signup/developer" />

      <Route element={<DashboardClientPage />} path="/profile/client" />
      <Route element={<DashboardDeveloperPage />} path="/profile/developer" />
      <Route element={<DashboardAgentPage />} path="/profile/agent" />
      <Route element={<DashboardBrokerPage />} path="/profile/broker" />
      <Route element={<DashboardAdminPage />} path="/profile/admin" />

      <Route element={<NotFoundPage />} path="*" />
    </Routes>
  );
}

export default App;
