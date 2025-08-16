import React from 'react';
import { useAuth, type UserRole } from '../hooks/useAuth';

interface PermissionGuardProps {
  permission?: string;
  role?: UserRole;
  roles?: UserRole[];
  fallback?: React.ReactNode;
  children: React.ReactNode;
}

/**
 * Component that conditionally renders children based on user permissions or roles
 */
export const PermissionGuard: React.FC<PermissionGuardProps> = ({
  permission,
  role,
  roles,
  fallback = null,
  children
}) => {
  const { userRole, hasPermission, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <>{fallback}</>;
  }

  // Check specific permission
  if (permission && !hasPermission(permission)) {
    return <>{fallback}</>;
  }

  // Check specific role
  if (role && userRole !== role) {
    return <>{fallback}</>;
  }

  // Check if user role is in allowed roles array
  if (roles && !roles.includes(userRole as UserRole)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};

/**
 * Hook to check permissions in components
 */
export const usePermissions = () => {
  const { userRole, hasPermission, isAuthenticated } = useAuth();

  const checkPermission = (permission: string): boolean => {
    if (!isAuthenticated) return false;
    return hasPermission(permission);
  };

  const checkRole = (role: UserRole): boolean => {
    if (!isAuthenticated) return false;
    return userRole === role;
  };

  const checkRoles = (roles: UserRole[]): boolean => {
    if (!isAuthenticated) return false;
    return roles.includes(userRole as UserRole);
  };

  const isClient = userRole === 'client';
  const isAgent = userRole === 'agent';
  const isBroker = userRole === 'broker';
  const isDeveloper = userRole === 'developer';
  const isAdmin = userRole === 'admin';

  return {
    userRole,
    isAuthenticated,
    checkPermission,
    checkRole,
    checkRoles,
    isClient,
    isAgent,
    isBroker,
    isDeveloper,
    isAdmin,
    // Common permission checks
    canViewProperties: checkPermission('view_properties'),
    canManageProperties: checkPermission('manage_properties'),
    canUploadProperties: checkPermission('upload_properties'),
    canManageTeams: checkPermission('manage_teams'),
    canManageLeads: checkPermission('manage_leads'),
    canAccessCRM: checkPermission('access_crm'),
    canViewAnalytics: checkPermission('view_analytics') || checkPermission('system_analytics'),
    canManageUsers: checkPermission('manage_users'),
    canApproveAccounts: checkPermission('approve_accounts'),
    canExportData: checkPermission('export_data'),
  };
};

/**
 * Role-specific components
 */
export const ClientOnly: React.FC<{ children: React.ReactNode; fallback?: React.ReactNode }> = 
  ({ children, fallback }) => (
    <PermissionGuard role="client" fallback={fallback}>
      {children}
    </PermissionGuard>
  );

export const AgentOnly: React.FC<{ children: React.ReactNode; fallback?: React.ReactNode }> = 
  ({ children, fallback }) => (
    <PermissionGuard role="agent" fallback={fallback}>
      {children}
    </PermissionGuard>
  );

export const BrokerOnly: React.FC<{ children: React.ReactNode; fallback?: React.ReactNode }> = 
  ({ children, fallback }) => (
    <PermissionGuard role="broker" fallback={fallback}>
      {children}
    </PermissionGuard>
  );

export const DeveloperOnly: React.FC<{ children: React.ReactNode; fallback?: React.ReactNode }> = 
  ({ children, fallback }) => (
    <PermissionGuard role="developer" fallback={fallback}>
      {children}
    </PermissionGuard>
  );

export const AdminOnly: React.FC<{ children: React.ReactNode; fallback?: React.ReactNode }> = 
  ({ children, fallback }) => (
    <PermissionGuard role="admin" fallback={fallback}>
      {children}
    </PermissionGuard>
  );

/**
 * Multi-role components
 */
export const StaffOnly: React.FC<{ children: React.ReactNode; fallback?: React.ReactNode }> = 
  ({ children, fallback }) => (
    <PermissionGuard roles={['agent', 'broker', 'developer', 'admin']} fallback={fallback}>
      {children}
    </PermissionGuard>
  );

export const ManagementOnly: React.FC<{ children: React.ReactNode; fallback?: React.ReactNode }> = 
  ({ children, fallback }) => (
    <PermissionGuard roles={['broker', 'developer', 'admin']} fallback={fallback}>
      {children}
    </PermissionGuard>
  );

/**
 * Permission-based components
 */
export const CanUploadProperties: React.FC<{ children: React.ReactNode; fallback?: React.ReactNode }> = 
  ({ children, fallback }) => (
    <PermissionGuard permission="upload_properties" fallback={fallback}>
      {children}
    </PermissionGuard>
  );

export const CanManageTeams: React.FC<{ children: React.ReactNode; fallback?: React.ReactNode }> = 
  ({ children, fallback }) => (
    <PermissionGuard permission="manage_teams" fallback={fallback}>
      {children}
    </PermissionGuard>
  );

export const CanAccessCRM: React.FC<{ children: React.ReactNode; fallback?: React.ReactNode }> = 
  ({ children, fallback }) => (
    <PermissionGuard permission="access_crm" fallback={fallback}>
      {children}
    </PermissionGuard>
  );

export const CanViewAnalytics: React.FC<{ children: React.ReactNode; fallback?: React.ReactNode }> = 
  ({ children, fallback }) => (
    <PermissionGuard permission="system_analytics" fallback={fallback}>
      {children}
    </PermissionGuard>
  );

export const CanManageUsers: React.FC<{ children: React.ReactNode; fallback?: React.ReactNode }> = 
  ({ children, fallback }) => (
    <PermissionGuard permission="manage_users" fallback={fallback}>
      {children}
    </PermissionGuard>
  );