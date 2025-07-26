import { Route, Routes } from "react-router-dom";

import { IndexPage } from "@/pages/index";
import { PropertiesPage } from "@/pages/properties";
import { PropertyPreviewPage } from "@/pages/property-preview";
import { NotFoundPage } from "@/pages/page-not-found";
import { SignUpPage } from "@/pages/sign-up";

function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      <Route element={<SignUpPage />} path="/sign-up" />
      <Route element={<PropertiesPage />} path="/properties" />
      <Route element={<PropertyPreviewPage />} path="/properties/preview" />
      <Route element={<NotFoundPage />} path="*" />
    </Routes>
  );
}

export default App;
