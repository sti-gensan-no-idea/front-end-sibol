import React from "react";
import { Card, CardBody, CardHeader, Button, Chip } from "@heroui/react";

import { useAuth } from "../hooks/useAuth";

import {
  usePermissions,
  ClientOnly,
  AgentOnly,
  BrokerOnly,
  DeveloperOnly,
  AdminOnly,
  StaffOnly,
  ManagementOnly,
  CanUploadProperties,
  CanManageTeams,
  CanAccessCRM,
  CanViewAnalytics,
  CanManageUsers,
} from "./PermissionGuard";

/**
 * Demo component showcasing role-based permissions and authentication
 */
const RoleBasedDemo: React.FC = () => {
  const { userRole, isAuthenticated, sessionExpiry, logout, refreshSession } =
    useAuth();

  const {
    isClient,
    isAgent,
    isBroker,
    isDeveloper,
    isAdmin,
    canViewProperties,
    canManageProperties,
    canUploadProperties,
    canManageTeams,
    canManageLeads,
    canAccessCRM,
    canViewAnalytics,
    canManageUsers,
    canApproveAccounts,
    canExportData,
  } = usePermissions();

  if (!isAuthenticated) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-bold mb-4">
          Please sign in to view role-based features
        </h2>
        <p>
          This demo requires authentication to showcase permission-based
          rendering.
        </p>
      </div>
    );
  }

  const timeRemaining = sessionExpiry
    ? new Date(sessionExpiry - Date.now()).toISOString().substr(11, 8)
    : "Unknown";

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">
          Role-Based Authentication Demo
        </h1>
        <div className="flex items-center justify-center space-x-4">
          <Chip color="primary" variant="flat">
            Role: {userRole?.toUpperCase()}
          </Chip>
          <Chip color="success" variant="flat">
            Session: {timeRemaining}
          </Chip>
          <Button size="sm" variant="ghost" onClick={refreshSession}>
            Extend Session
          </Button>
          <Button color="danger" size="sm" variant="ghost" onClick={logout}>
            Logout
          </Button>
        </div>
      </div>

      {/* Current User Permissions */}
      <Card>
        <CardHeader>
          <h3 className="text-xl font-semibold">Your Permissions</h3>
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            <PermissionChip
              hasPermission={canViewProperties}
              label="View Properties"
            />
            <PermissionChip
              hasPermission={canManageProperties}
              label="Manage Properties"
            />
            <PermissionChip
              hasPermission={canUploadProperties}
              label="Upload Properties"
            />
            <PermissionChip
              hasPermission={canManageTeams}
              label="Manage Teams"
            />
            <PermissionChip
              hasPermission={canManageLeads}
              label="Manage Leads"
            />
            <PermissionChip hasPermission={canAccessCRM} label="Access CRM" />
            <PermissionChip
              hasPermission={canViewAnalytics}
              label="View Analytics"
            />
            <PermissionChip
              hasPermission={canManageUsers}
              label="Manage Users"
            />
            <PermissionChip
              hasPermission={canApproveAccounts}
              label="Approve Accounts"
            />
            <PermissionChip hasPermission={canExportData} label="Export Data" />
          </div>
        </CardBody>
      </Card>

      {/* Role Indicators */}
      <Card>
        <CardHeader>
          <h3 className="text-xl font-semibold">Role Detection</h3>
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-5 gap-4">
            <RoleIndicator isActive={isClient} label="Client" />
            <RoleIndicator isActive={isAgent} label="Agent" />
            <RoleIndicator isActive={isBroker} label="Broker" />
            <RoleIndicator isActive={isDeveloper} label="Developer" />
            <RoleIndicator isActive={isAdmin} label="Admin" />
          </div>
        </CardBody>
      </Card>

      {/* Role-Specific Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Client-Only Features */}
        <ClientOnly>
          <Card className="border-blue-200 bg-blue-50">
            <CardHeader>
              <h3 className="text-lg font-semibold text-blue-800">
                Client Features
              </h3>
            </CardHeader>
            <CardBody>
              <ul className="space-y-2 text-sm text-blue-700">
                <li>• Browse available properties</li>
                <li>• Schedule site viewings</li>
                <li>• Bookmark favorite properties</li>
                <li>• Make payments</li>
                <li>• Request maintenance</li>
              </ul>
            </CardBody>
          </Card>
        </ClientOnly>

        {/* Agent-Only Features */}
        <AgentOnly>
          <Card className="border-green-200 bg-green-50">
            <CardHeader>
              <h3 className="text-lg font-semibold text-green-800">
                Agent Features
              </h3>
            </CardHeader>
            <CardBody>
              <ul className="space-y-2 text-sm text-green-700">
                <li>• Manage leads pipeline</li>
                <li>• Access CRM system</li>
                <li>• Handle site viewings</li>
                <li>• Update lead status</li>
                <li>• View team analytics</li>
              </ul>
            </CardBody>
          </Card>
        </AgentOnly>

        {/* Broker-Only Features */}
        <BrokerOnly>
          <Card className="border-purple-200 bg-purple-50">
            <CardHeader>
              <h3 className="text-lg font-semibold text-purple-800">
                Broker Features
              </h3>
            </CardHeader>
            <CardBody>
              <ul className="space-y-2 text-sm text-purple-700">
                <li>• Manage agent teams</li>
                <li>• Assign properties to agents</li>
                <li>• Commission management</li>
                <li>• Team performance analytics</li>
                <li>• Property assignments</li>
              </ul>
            </CardBody>
          </Card>
        </BrokerOnly>

        {/* Developer-Only Features */}
        <DeveloperOnly>
          <Card className="border-orange-200 bg-orange-50">
            <CardHeader>
              <h3 className="text-lg font-semibold text-orange-800">
                Developer Features
              </h3>
            </CardHeader>
            <CardBody>
              <ul className="space-y-2 text-sm text-orange-700">
                <li>• Upload properties (CSV)</li>
                <li>• Manage property inventory</li>
                <li>• Property analytics</li>
                <li>• Maintenance management</li>
                <li>• Project management</li>
              </ul>
            </CardBody>
          </Card>
        </DeveloperOnly>

        {/* Admin-Only Features */}
        <AdminOnly>
          <Card className="border-red-200 bg-red-50">
            <CardHeader>
              <h3 className="text-lg font-semibold text-red-800">
                Admin Features
              </h3>
            </CardHeader>
            <CardBody>
              <ul className="space-y-2 text-sm text-red-700">
                <li>• Manage all users</li>
                <li>• Approve/reject accounts</li>
                <li>• System-wide analytics</li>
                <li>• Export all data</li>
                <li>• Full system access</li>
              </ul>
            </CardBody>
          </Card>
        </AdminOnly>
      </div>

      {/* Multi-Role Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StaffOnly>
          <Card className="border-gray-200 bg-gray-50">
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-800">
                Staff Features
              </h3>
            </CardHeader>
            <CardBody>
              <p className="text-sm text-gray-600">
                This content is visible to all staff members (Agent, Broker,
                Developer, Admin)
              </p>
            </CardBody>
          </Card>
        </StaffOnly>

        <ManagementOnly>
          <Card className="border-indigo-200 bg-indigo-50">
            <CardHeader>
              <h3 className="text-lg font-semibold text-indigo-800">
                Management Features
              </h3>
            </CardHeader>
            <CardBody>
              <p className="text-sm text-indigo-600">
                This content is visible to management roles (Broker, Developer,
                Admin)
              </p>
            </CardBody>
          </Card>
        </ManagementOnly>
      </div>

      {/* Permission-Based Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <CanUploadProperties>
          <Card className="border-yellow-200 bg-yellow-50">
            <CardBody className="text-center">
              <p className="text-sm text-yellow-800 font-medium">
                Can Upload Properties
              </p>
            </CardBody>
          </Card>
        </CanUploadProperties>

        <CanManageTeams>
          <Card className="border-cyan-200 bg-cyan-50">
            <CardBody className="text-center">
              <p className="text-sm text-cyan-800 font-medium">
                Can Manage Teams
              </p>
            </CardBody>
          </Card>
        </CanManageTeams>

        <CanAccessCRM>
          <Card className="border-pink-200 bg-pink-50">
            <CardBody className="text-center">
              <p className="text-sm text-pink-800 font-medium">
                Can Access CRM
              </p>
            </CardBody>
          </Card>
        </CanAccessCRM>

        <CanViewAnalytics>
          <Card className="border-teal-200 bg-teal-50">
            <CardBody className="text-center">
              <p className="text-sm text-teal-800 font-medium">
                Can View Analytics
              </p>
            </CardBody>
          </Card>
        </CanViewAnalytics>
      </div>

      {/* Admin Only - User Management */}
      <CanManageUsers>
        <Card className="border-red-300 bg-red-100">
          <CardHeader>
            <h3 className="text-lg font-semibold text-red-800">
              🔒 Admin Only - User Management
            </h3>
          </CardHeader>
          <CardBody>
            <p className="text-red-700 mb-4">
              This section is only visible to administrators with user
              management permissions.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              <Button color="danger" size="sm" variant="flat">
                Manage Users
              </Button>
              <Button color="danger" size="sm" variant="flat">
                Approve Accounts
              </Button>
              <Button color="danger" size="sm" variant="flat">
                System Settings
              </Button>
              <Button color="danger" size="sm" variant="flat">
                Export Data
              </Button>
            </div>
          </CardBody>
        </Card>
      </CanManageUsers>
    </div>
  );
};

// Helper Components
const PermissionChip: React.FC<{ label: string; hasPermission: boolean }> = ({
  label,
  hasPermission,
}) => (
  <Chip
    color={hasPermission ? "success" : "default"}
    size="sm"
    variant={hasPermission ? "flat" : "bordered"}
  >
    {hasPermission ? "✓" : "✗"} {label}
  </Chip>
);

const RoleIndicator: React.FC<{ label: string; isActive: boolean }> = ({
  label,
  isActive,
}) => (
  <div
    className={`p-3 rounded-lg text-center ${isActive ? "bg-blue-100 border-2 border-blue-300" : "bg-gray-100 border border-gray-300"}`}
  >
    <div
      className={`w-3 h-3 rounded-full mx-auto mb-2 ${isActive ? "bg-blue-500" : "bg-gray-400"}`}
    />
    <p
      className={`text-sm font-medium ${isActive ? "text-blue-800" : "text-gray-600"}`}
    >
      {label}
    </p>
    {isActive && <p className="text-xs text-blue-600">Active</p>}
  </div>
);

export default RoleBasedDemo;
