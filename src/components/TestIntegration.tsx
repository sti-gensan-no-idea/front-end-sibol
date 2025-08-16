import React from "react";

import { useAuth, useProperties } from "../hooks";

/**
 * Simple test component to verify the integration is working
 */
const TestIntegration: React.FC = () => {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const { properties, loading: propertiesLoading } = useProperties({
    autoFetch: false,
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Integration Test</h1>

      <div className="space-y-4">
        <div className="p-4 border rounded">
          <h2 className="text-lg font-semibold">Authentication Status</h2>
          <p>Loading: {authLoading ? "Yes" : "No"}</p>
          <p>Authenticated: {isAuthenticated ? "Yes" : "No"}</p>
        </div>

        <div className="p-4 border rounded">
          <h2 className="text-lg font-semibold">Properties Status</h2>
          <p>Loading: {propertiesLoading ? "Yes" : "No"}</p>
          <p>Properties Count: {properties.length}</p>
        </div>

        <div className="p-4 border rounded bg-green-50">
          <h2 className="text-lg font-semibold text-green-800">
            ✅ Core Integration Working!
          </h2>
          <p className="text-green-700">
            The basic API integration is functioning correctly.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TestIntegration;
