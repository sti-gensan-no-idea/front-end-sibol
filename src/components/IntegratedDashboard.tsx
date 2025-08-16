import React, { useState } from "react";
import { Button } from "@heroui/react";

import {
  useProperties,
  useEvents,
  useLeads,
  useSiteViewings,
  useAnalytics,
} from "../hooks";

/**
 * Example Dashboard Component demonstrating the integration
 * of all backend services with React hooks
 */
const IntegratedDashboard: React.FC = () => {
  // Using the integrated hooks
  const {
    properties,
    loading: propertiesLoading,
    createProperty,
    uploadCSV,
  } = useProperties({ filters: { property_type: "condominium" } });

  const { events, createEvent, loading: eventsLoading } = useEvents();

  const { leads, createLead, moveLeadToNextStage } = useLeads();

  const { siteViewings, createSiteViewing } = useSiteViewings();

  const { dashboardData, loading: analyticsLoading } = useAnalytics({
    autoFetch: true,
    refreshInterval: 5 * 60 * 1000,
  });

  const [csvFile, setCsvFile] = useState<File | null>(null);

  // Example: Create a new property
  const handleCreateProperty = async () => {
    const newProperty = await createProperty({
      title: "Sample Luxury Condo",
      description: "Beautiful 2BR condo in BGC",
      price: 8500000,
      location: "BGC, Taguig City",
      property_type: "condominium",
    });

    if (newProperty) {
      console.log("Property created:", newProperty);
    }
  };

  // Example: Upload CSV properties
  const handleCSVUpload = async () => {
    if (csvFile) {
      const result = await uploadCSV(csvFile);

      if (result) {
        console.log(
          `Upload completed: ${result.success_count} properties created`,
        );
        if (result.error_count > 0) {
          console.log("Errors:", result.errors);
        }
      }
    }
  };

  // Example: Create an event
  const handleCreateEvent = async () => {
    const newEvent = await createEvent({
      title: "Property Tour",
      description: "Guided tour of luxury condominiums",
      event_type: "property_tour",
      scheduled_date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      property_id: properties[0]?.id,
    });

    if (newEvent) {
      console.log("Event created:", newEvent);
    }
  };

  // Example: Create a lead
  const handleCreateLead = async () => {
    if (properties.length > 0) {
      const newLead = await createLead({
        property_id: properties[0].id,
        client_name: "Juan Dela Cruz",
        client_email: "juan@example.com",
        client_phone: "+639123456789",
        source: "website",
      });

      if (newLead) {
        console.log("Lead created:", newLead);
      }
    }
  };

  // Example: Schedule site viewing
  const handleScheduleSiteViewing = async () => {
    if (properties.length > 0) {
      const viewing = await createSiteViewing({
        property_id: properties[0].id,
        scheduled_date: new Date(
          Date.now() + 48 * 60 * 60 * 1000,
        ).toISOString(),
        guest_name: "Maria Santos",
        guest_email: "maria@example.com",
        guest_phone: "+639987654321",
      });

      if (viewing) {
        console.log("Site viewing scheduled:", viewing);
      }
    }
  };

  // Example: Move lead to next stage
  const handleMoveLead = async () => {
    if (leads.length > 0) {
      const success = await moveLeadToNextStage(leads[0].id);

      if (success) {
        console.log("Lead moved to next stage");
      }
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">
        Atuna Backend Integration Dashboard
      </h1>

      {/* Analytics Overview */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Analytics Overview</h2>
        {analyticsLoading ? (
          <p>Loading analytics...</p>
        ) : dashboardData ? (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-medium">Total Properties</h3>
              <p className="text-3xl font-bold text-blue-600">
                {dashboardData.total_properties}
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-medium">Active Users</h3>
              <p className="text-3xl font-bold text-green-600">
                {dashboardData.active_users}
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-medium">Total Revenue</h3>
              <p className="text-3xl font-bold text-purple-600">
                ₱{dashboardData.total_revenue.toLocaleString()}
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-medium">Monthly Revenue</h3>
              <p className="text-3xl font-bold text-orange-600">
                ₱{dashboardData.monthly_revenue.toLocaleString()}
              </p>
            </div>
          </div>
        ) : (
          <p>No analytics data available</p>
        )}
      </section>

      {/* Properties Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          Properties ({properties.length})
        </h2>
        <div className="flex gap-4 mb-4">
          <Button color="primary" onClick={handleCreateProperty}>
            Create Sample Property
          </Button>
          <div className="flex gap-2">
            <input
              accept=".csv"
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              type="file"
              onChange={(e) => setCsvFile(e.target.files?.[0] || null)}
            />
            <Button
              color="secondary"
              disabled={!csvFile}
              onClick={handleCSVUpload}
            >
              Upload CSV
            </Button>
          </div>
        </div>

        {propertiesLoading ? (
          <p>Loading properties...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {properties.slice(0, 6).map((property) => (
              <div key={property.id} className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-semibold">{property.title}</h3>
                <p className="text-gray-600">{property.location}</p>
                <p className="text-lg font-bold text-green-600">
                  ₱{property.price.toLocaleString()}
                </p>
                <p className="text-sm text-gray-500">
                  Status: {property.status}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Action Buttons Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Button
            className="w-full"
            color="primary"
            onClick={handleCreateEvent}
          >
            Create Sample Event
          </Button>
          <Button
            className="w-full"
            color="secondary"
            onClick={handleCreateLead}
          >
            Create Sample Lead
          </Button>
          <Button
            className="w-full"
            color="success"
            onClick={handleScheduleSiteViewing}
          >
            Schedule Site Viewing
          </Button>
          <Button
            className="w-full"
            color="warning"
            disabled={leads.length === 0}
            onClick={handleMoveLead}
          >
            Move Lead Stage
          </Button>
        </div>
      </section>

      {/* Summary Cards */}
      <section className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium">Events</h3>
            <p className="text-2xl font-bold text-blue-600">{events.length}</p>
            <p className="text-sm text-gray-500">
              {eventsLoading ? "Loading..." : "Total events"}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium">Leads</h3>
            <p className="text-2xl font-bold text-green-600">{leads.length}</p>
            <p className="text-sm text-gray-500">Active leads</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium">Site Viewings</h3>
            <p className="text-2xl font-bold text-purple-600">
              {siteViewings.length}
            </p>
            <p className="text-sm text-gray-500">Scheduled viewings</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium">Properties</h3>
            <p className="text-2xl font-bold text-orange-600">
              {properties.length}
            </p>
            <p className="text-sm text-gray-500">Available properties</p>
          </div>
        </div>
      </section>

      <div className="text-center text-gray-600 mt-8 p-6 bg-green-50 rounded-lg">
        <h3 className="text-xl font-semibold text-green-800 mb-2">
          ✅ Integration Complete!
        </h3>
        <p className="mb-2">
          All Atuna backend API endpoints have been successfully integrated with
          the React frontend.
        </p>
        <p className="text-sm">
          <strong>Backend Services:</strong> Properties, Teams, Events, Site
          Viewings, CRM, Analytics, Maintenance, Payments
        </p>
        <p className="text-sm">
          <strong>React Hooks:</strong> Type-safe hooks for all API operations
          with error handling and loading states
        </p>
        <p className="mt-4 text-green-700">
          Check the browser console for API responses when you use the action
          buttons above.
        </p>
      </div>
    </div>
  );
};

export default IntegratedDashboard;
