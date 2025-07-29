import { Route, Routes } from "react-router-dom";

import { UnauthorizePage } from "@/pages/unauthorize";
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
import { AdminDashboardPage } from "@/pages/dashboard-admin";
import { DemoShowcasePage } from "@/pages/demo-showcase";
import { ContactAgentPage } from "@/pages/contact-agent";
import ChatPage from "@/pages/ChatPage";


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
      
      {/* Admin Dashboard - for demo purposes, not protected */}
      <Route element={<AdminDashboardPage />} path="/admin/dashboard" />

      <Route element={<UnauthorizePage />} path="/not-authorized" />
      <Route element={<NotFoundPage />} path="*" />
    </Routes>

    
  );
}

export default App;
