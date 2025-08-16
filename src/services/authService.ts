import type {
  LoginCredentials,
  TokenResponse,
  ClientRegister,
  DeveloperRegister,
  BrokerRegister,
  AgentRegister,
} from "../types/api";

import apiService from "./apiService";

export class AuthService {
  // Client authentication
  async clientSignin(credentials: LoginCredentials): Promise<TokenResponse> {
    const response = await apiService.post<TokenResponse>(
      "/auth/signin",
      credentials,
    );

    if (response.role !== "client") {
      throw new Error("Invalid credentials for client role");
    }

    return response;
  }

  // Developer authentication
  async developerSignin(credentials: LoginCredentials): Promise<TokenResponse> {
    const response = await apiService.post<TokenResponse>(
      "/auth/developer/signin",
      credentials,
    );

    if (response.role !== "developer") {
      throw new Error("Invalid credentials for developer role");
    }

    return response;
  }

  // Broker authentication
  async brokerSignin(credentials: LoginCredentials): Promise<TokenResponse> {
    const response = await apiService.post<TokenResponse>(
      "/auth/broker/signin",
      credentials,
    );

    if (response.role !== "broker") {
      throw new Error("Invalid credentials for broker role");
    }

    return response;
  }

  // Agent authentication
  async agentSignin(credentials: LoginCredentials): Promise<TokenResponse> {
    const response = await apiService.post<TokenResponse>(
      "/auth/agent/signin",
      credentials,
    );

    if (response.role !== "agent") {
      throw new Error("Invalid credentials for agent role");
    }

    return response;
  }

  // Admin authentication
  async adminSignin(credentials: LoginCredentials): Promise<TokenResponse> {
    const response = await apiService.post<TokenResponse>(
      "/auth/admin/signin",
      credentials,
    );

    if (response.role !== "admin") {
      throw new Error("Invalid credentials for admin role");
    }

    return response;
  }

  // Client registration
  async registerClient(userData: ClientRegister): Promise<any> {
    return apiService.post("/register/client", userData);
  }

  // Developer registration
  async registerDeveloper(userData: DeveloperRegister): Promise<any> {
    return apiService.post("/register/developer", userData);
  }

  // Broker registration
  async registerBroker(userData: BrokerRegister): Promise<any> {
    return apiService.post("/register/broker", userData);
  }

  // Agent registration
  async registerAgent(userData: AgentRegister): Promise<any> {
    return apiService.post("/register/agent", userData);
  }

  // Store authentication data with enhanced security
  storeAuthData(tokenData: TokenResponse): void {
    const { access_token, user_id, role } = tokenData;

    // Store in localStorage (consider using httpOnly cookies in production)
    apiService.setToken(access_token);
    localStorage.setItem("user_id", user_id);
    localStorage.setItem("user_role", role);

    // Set default expiration if not provided (8 hours)
    const defaultExpiry = Date.now() + 8 * 60 * 60 * 1000;

    if (!localStorage.getItem("token_expiry")) {
      localStorage.setItem("token_expiry", defaultExpiry.toString());
    }

    console.log(`User authenticated as ${role} with ID: ${user_id}`);
  }

  // Enhanced logout with complete cleanup
  logout(): void {
    // Clear API service token
    apiService.clearToken();

    // Clear all stored user data
    localStorage.removeItem("user_id");
    localStorage.removeItem("user_role");
    localStorage.removeItem("user_email");
    localStorage.removeItem("token_expiry");

    // Clear any cached data
    sessionStorage.clear();

    console.log("User logged out and session cleared");
  }

  // Check if user is authenticated with session validation
  isAuthenticated(): boolean {
    const token = localStorage.getItem("access_token");
    const expiry = localStorage.getItem("token_expiry");

    if (!token || !expiry) {
      return false;
    }

    // Check if token has expired
    const expiryTime = parseInt(expiry);

    if (Date.now() > expiryTime) {
      this.logout(); // Auto-logout if expired

      return false;
    }

    return true;
  }

  // Get current user role with validation
  getUserRole(): string | null {
    if (!this.isAuthenticated()) {
      return null;
    }

    return localStorage.getItem("user_role");
  }

  // Get current user ID with validation
  getUserId(): string | null {
    if (!this.isAuthenticated()) {
      return null;
    }

    return localStorage.getItem("user_id");
  }

  // Get session expiry time
  getSessionExpiry(): number | null {
    const expiry = localStorage.getItem("token_expiry");

    return expiry ? parseInt(expiry) : null;
  }

  // Check if session will expire soon (within 15 minutes)
  isSessionExpiringSoon(): boolean {
    const expiry = this.getSessionExpiry();

    if (!expiry) return false;

    const fifteenMinutes = 15 * 60 * 1000;

    return expiry - Date.now() <= fifteenMinutes;
  }

  // Extend session by 8 hours
  extendSession(): boolean {
    if (!this.isAuthenticated()) {
      return false;
    }

    const newExpiry = Date.now() + 8 * 60 * 60 * 1000;

    localStorage.setItem("token_expiry", newExpiry.toString());

    return true;
  }

  // Validate token format (basic validation)
  private isValidTokenFormat(token: string): boolean {
    // Basic JWT format check (header.payload.signature)
    const parts = token.split(".");

    return parts.length === 3;
  }

  // Get user info from token (decode JWT payload)
  getUserInfo(): any {
    const token = localStorage.getItem("access_token");

    if (!token || !this.isValidTokenFormat(token)) {
      return null;
    }

    try {
      // Decode JWT payload (base64)
      const payload = token.split(".")[1];
      const decoded = atob(payload);

      return JSON.parse(decoded);
    } catch (error) {
      console.error("Failed to decode token:", error);

      return null;
    }
  }

  // Force logout with redirect
  forceLogout(reason?: string): void {
    console.log("Force logout:", reason || "Session terminated");
    this.logout();

    // Redirect to sign-in with message
    const currentPath = window.location.pathname;
    let redirectPath = "/signin";

    if (currentPath.includes("/developer")) {
      redirectPath = "/signin/developer";
    } else if (currentPath.includes("/broker")) {
      redirectPath = "/signin/broker";
    } else if (currentPath.includes("/agent")) {
      redirectPath = "/signin/agent";
    }

    if (reason) {
      redirectPath += `?message=${encodeURIComponent(reason)}`;
    }

    window.location.href = redirectPath;
  }
}

export const authService = new AuthService();
export default authService;
