import { Route, Routes } from "react-router-dom";

import { IndexPage } from "@/pages/index";
import { PropertiesPage } from "@/pages/properties";
import { PropertyPreviewPage } from "@/pages/property-preview";

function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      <Route element={<PropertiesPage />} path="/properties" />
      <Route element={<PropertyPreviewPage />} path="/properties/preview" />
    </Routes>
  );
}

export default App;
