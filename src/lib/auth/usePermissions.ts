import { useAuth } from "./useAuth";

export type UserRole = "client" | "developer" | "agent" | "broker" | "admin";

export type Permission = 
  | "properties.create"
  | "properties.edit"
  | "properties.delete"
  | "properties.assign"
  | "users.create"
  | "users.edit"
  | "users.delete"
  | "users.approve"
  | "analytics.view"
  | "teams.manage"
  | "leads.manage"
  | "maintenance.manage"
  | "payments.manage";

// Role-based permissions mapping
const rolePermissions: Record<UserRole, Permission[]> = {
  admin: [
    "properties.create",
    "properties.edit", 
    "properties.delete",
    "properties.assign",
    "users.create",
    "users.edit",
    "users.delete", 
    "users.approve",
    "analytics.view",
    "teams.manage",
    "leads.manage",
    "maintenance.manage",
    "payments.manage"
  ],
  developer: [
    "properties.create",
    "properties.edit",
    "properties.delete", 
    "analytics.view",
    "maintenance.manage",
    "payments.manage"
  ],
  broker: [
    "properties.assign",
    "users.create", // agents only
    "analytics.view",
    "teams.manage",
    "leads.manage"
  ],
  agent: [
    "leads.manage",
    "analytics.view"
  ],
  client: []
};

// Route access by role
const routeAccess: Record<string, UserRole[]> = {
  "/admin": ["admin"],
  "/admin/*": ["admin"],
  "/developer": ["developer", "admin"],
  "/developer/*": ["developer", "admin"],
  "/broker": ["broker", "admin"],
  "/broker/*": ["broker", "admin"],
  "/agent": ["agent", "admin"],
  "/agent/*": ["agent", "admin"],
  "/client": ["client", "admin"],
  "/client/*": ["client", "admin"],
};

export const usePermissions = () => {
  const { user } = useAuth();

  const hasRole = (role: UserRole): boolean => {
    return user?.role === role;
  };

  const hasPermission = (permission: Permission): boolean => {
    if (!user?.role) return false;
    
    const userRole = user.role as UserRole;
    return rolePermissions[userRole]?.includes(permission) || false;
  };

  const canAccessRoute = (route: string): boolean => {
    if (!user?.role) return false;

    const userRole = user.role as UserRole;
    
    // Check exact route match first
    if (routeAccess[route]) {
      return routeAccess[route].includes(userRole);
    }

    // Check wildcard patterns
    for (const [pattern, roles] of Object.entries(routeAccess)) {
      if (pattern.endsWith("/*")) {
        const basePath = pattern.slice(0, -2);
        if (route.startsWith(basePath)) {
          return roles.includes(userRole);
        }
      }
    }

    return true; // Allow access if no specific restrictions
  };

  const getRoleDisplayName = (role?: string): string => {
    const roleNames: Record<string, string> = {
      client: "Client",
      developer: "Developer", 
      agent: "Agent",
      broker: "Broker",
      admin: "Administrator"
    };
    
    return roleNames[role || ""] || "Unknown";
  };

  return {
    hasRole,
    hasPermission,
    canAccessRoute,
    getRoleDisplayName,
    currentRole: user?.role as UserRole,
  };
};
