import { Route, Routes } from "react-router-dom";

import { IndexPage } from "@/pages/index";
import { PropertiesPage } from "@/pages/properties";

function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      <Route element={<PropertiesPage />} path="/properties" />
    </Routes>
  );
}

export default App;
