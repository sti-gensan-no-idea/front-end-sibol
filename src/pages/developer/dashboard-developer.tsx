import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Card, CardBody, CardHeader } from "@heroui/react";
import { IconHome, IconTrendingUp, IconUsers, IconCurrencyPeso } from "@tabler/icons-react";

import { DeveloperSideBar } from "@/widget/developer-sidebar";
import { Notification } from "@/widget/notification";
import { useAnalytics, useProperties } from "@/hooks";

export const DashboardDeveloperPage = () => {
  const [searchParams] = useSearchParams();
  const tab = searchParams.get("tab") || "dashboard";

  useEffect(() => {
    document.title = "Developer | Atuna";
  }, []);

  const renderTab = () => {
    switch (tab) {
      case "dashboard":
        return <DashboardTabContent />;
      case "notifications":
        return <NotificationTabContent />;
      default:
        return <DashboardTabContent />;
    }
  };

  return (
    <main className="flex container mx-auto min-h-screen">
      <aside className="w-30 pl-8 pt-8">
        <DeveloperSideBar />
      </aside>

      <section className="flex-1 pr-8 pt-8 pb-8">{renderTab()}</section>
    </main>
  );
};

// Dashboard content.
const DashboardTabContent = () => {
  const { dashboard, loading, error } = useAnalytics();
  const { properties } = useProperties();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        Error loading dashboard: {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Developer Dashboard</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardBody>
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <IconHome className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Properties</p>
                <p className="text-2xl font-bold text-gray-900">
                  {dashboard?.total_properties || properties.length || 0}
                </p>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <IconTrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Sales</p>
                <p className="text-2xl font-bold text-gray-900">
                  {dashboard?.total_sales || 0}
                </p>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <IconUsers className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Leads</p>
                <p className="text-2xl font-bold text-gray-900">
                  {dashboard?.total_leads || 0}
                </p>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <IconCurrencyPeso className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Revenue</p>
                <p className="text-2xl font-bold text-gray-900">
                  ₱{dashboard?.revenue?.toLocaleString() || '0'}
                </p>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Recent Properties */}
      <Card>
        <CardHeader>
          <h3 className="text-xl font-semibold">Recent Properties</h3>
        </CardHeader>
        <CardBody>
          {properties.length > 0 ? (
            <div className="space-y-4">
              {properties.slice(0, 5).map((property) => (
                <div key={property.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-semibold">{property.title}</h4>
                    <p className="text-sm text-gray-600">{property.location}</p>
                    <p className="text-sm text-gray-500">{property.property_type}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">₱{property.price.toLocaleString()}</p>
                    <p className="text-sm text-gray-600 capitalize">{property.status}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No properties found. Upload your first property to get started.
            </div>
          )}
        </CardBody>
      </Card>

      {/* Recent Activities */}
      {dashboard?.recent_activities && dashboard.recent_activities.length > 0 && (
        <Card>
          <CardHeader>
            <h3 className="text-xl font-semibold">Recent Activities</h3>
          </CardHeader>
          <CardBody>
            <div className="space-y-3">
              {dashboard.recent_activities.slice(0, 5).map((activity) => (
                <div key={activity.id} className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm">{activity.description}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(activity.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      )}
    </div>
  );
};

// Notification content.
const NotificationTabContent = () => {
  return (
    <>
      <Notification />
    </>
  );
};
