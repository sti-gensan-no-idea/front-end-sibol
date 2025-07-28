import { Route, Routes } from "react-router-dom";

import ProtectedRoute from "@/hooks/protected-route";
import { IndexPage } from "@/pages/index";
import { PropertiesPage } from "@/pages/properties";
import { PropertyPreviewPage } from "@/pages/property-preview";
import { NotFoundPage } from "@/pages/page-not-found";
import { SignUpPage } from "@/pages/sign-up";
import { SignInPage } from "@/pages/sign-in";
import { SignInAgentPage } from "@/pages/sign-in-agent";
import { DashboardAgentPage } from "@/pages/dashboard-agent";
import { DashboardClientPage } from "@/pages/dashboard-client";

function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      <Route element={<SignInPage />} path="/sign-in" />
      <Route element={<SignInAgentPage />} path="/sign-in-agent" />
      <Route element={<SignUpPage />} path="/sign-up" />
      <Route element={<PropertiesPage />} path="/properties" />
      <Route element={<PropertyPreviewPage />} path="/properties/preview" />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute allowedRole="client" />}>
        <Route element={<DashboardClientPage />} path="/profile/client" />
      </Route>
      <Route element={<ProtectedRoute allowedRole="agent" />}>
        <Route element={<DashboardAgentPage />} path="/profile/agent" />
      </Route>

      <Route element={<NotFoundPage />} path="/not-authorized" />
      <Route element={<NotFoundPage />} path="*" />
    </Routes>
  );
}

export default App;
