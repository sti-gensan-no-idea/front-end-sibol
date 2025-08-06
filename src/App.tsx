import { Route, Routes } from "react-router-dom";

import { AboutUsPage } from "./pages/about-us";
import { ScheduleViewingPage } from "./pages/schedule-viewing";

import { UnauthorizePage } from "@/pages/public/unauthorize";
import ProtectedRoute from "@/hooks/protected-route";
import { IndexPage } from "@/pages/index";
import { PropertiesPage } from "@/pages/properties";
import { PropertyPreviewPage } from "@/pages/property-preview";
import { NotFoundPage } from "@/pages/public/not-found";
import { SignUpPage } from "@/pages/public/sign-up";
import { SignInPage } from "@/pages/public/sign-in";
import { SignInAgentPage } from "@/pages/public/sign-in-agent";
import { DashboardAgentPage } from "@/pages/dashboard-agent";
import { DashboardClientPage } from "@/pages/dashboard-client";
import { DemoShowcasePage } from "@/pages/demo-showcase";
import { ContactAgentPage } from "@/pages/contact-agent";
import ChatPage from "@/pages/ChatPage";
import Pipeline from "@/pages/pipeline";
import { AdminDashboardPage } from "./pages/admin/dashboard";

function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      <Route element={<SignInPage />} path="/sign-in" />
      <Route element={<SignInAgentPage />} path="/sign-in-agent" />
      <Route element={<SignUpPage />} path="/sign-up" />
      <Route element={<PropertiesPage />} path="/properties" />
      <Route element={<PropertyPreviewPage />} path="/properties/preview" />

      <Route element={<ChatPage />} path="/chat" />

      {/* Demo Showcase */}
      <Route element={<DemoShowcasePage />} path="/demo" />
      <Route element={<Pipeline />} path="/pipeline" />

      <Route element={<AboutUsPage />} path="/about-us" />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute allowedRole="client" />}>
        <Route element={<DashboardClientPage />} path="/profile/client" />
      </Route>
      <Route element={<ProtectedRoute allowedRole="agent" />}>
        <Route element={<DashboardAgentPage />} path="/profile/agent" />
      </Route>
      <Route element={<ProtectedRoute allowedRole="client" />}>
        <Route element={<ContactAgentPage />} path="/contact-agent" />
      </Route>

      <Route element={<ProtectedRoute allowedRole="client" />}>
        <Route element={<ScheduleViewingPage />} path="/schedule-viewing" />
      </Route>
      <Route element={<UnauthorizePage />} path="/not-authorized" />

      {/* Admin */}
      <Route element={<AdminDashboardPage />} path="/profile/admin" />

      {/* Not Found Page */}
      <Route element={<NotFoundPage />} path="*" />
    </Routes>
  );
}

export default App;
