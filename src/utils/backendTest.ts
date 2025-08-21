// src/utils/backendTest.ts
// -----------------------------------------------------------------------------
// Simple helpers to test backend connectivity and a registration endpoint.
// Uses API_BASE_URL from src/config/api.ts (no hard-coded localhost).
// -----------------------------------------------------------------------------

import { API_BASE_URL } from "../config/api";

export const testBackendConnection = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/docs`, {
      method: "GET",
      mode: "cors",
    });

    console.log(
      "🔗 Backend connection test:",
      response.ok ? "SUCCESS" : "FAILED",
    );

    return response.ok;
  } catch (error) {
    console.error("🚫 Backend connection failed:", error);
    return false;
  }
};

export const testRegistrationEndpoint = async (
  role: string,
): Promise<boolean> => {
  try {
    const testData = {
      email: "test@example.com",
      password: "testpass123",
      first_name: "Test",
      last_name: "User",
      phone: "09123456789",
      role,
    };

    const response = await fetch(`${API_BASE_URL}/register/${role}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(testData),
    });

    console.log(`🧪 Test registration for ${role}:`, {
      status: response.status,
      ok: response.ok,
      statusText: response.statusText,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.log("❌ Registration test error:", errorData);
    }

    return response.ok;
  } catch (error) {
    console.error(`💥 Registration test failed for ${role}:`, error);
    return false;
  }
};
