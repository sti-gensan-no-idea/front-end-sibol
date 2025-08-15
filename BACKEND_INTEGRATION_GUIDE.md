# Atuna Backend API Integration - Complete Guide

## Overview
This document provides a comprehensive guide on how the Atuna backend FastAPI has been integrated with the React frontend. All backend endpoints are now accessible through TypeScript services and React hooks.

## 🚀 Integration Summary

### Services Created
- **PropertyService** - Property management, CSV upload, assignments
- **TeamService** - Team management, member operations
- **EventService** - Event scheduling and calendar management
- **SiteViewingService** - Site viewing scheduling and management
- **MaintenancePaymentService** - Maintenance requests and payment processing
- **CRMService** - Lead management, bookmarks, notifications
- **AnalyticsService** - Comprehensive analytics and reporting
- **UserManagementService** - User and account management

### React Hooks Created
- **useProperties** - Property operations with pagination and filtering
- **useTeams** - Team management operations
- **useEvents** - Event scheduling operations
- **useSiteViewings** - Site viewing management
- **useMaintenance** - Maintenance request operations
- **usePayments** - Payment processing operations
- **useLeads, useBookmarks, useNotifications** - CRM operations
- **useAnalytics, useAgentAnalytics, useBrokerAnalytics** - Analytics operations

## 📋 Backend API Endpoints Coverage

### Authentication & Registration
```typescript
// Role-based authentication
await authService.clientSignin({ email, password });
await authService.developerSignin({ email, password });
await authService.brokerSignin({ email, password });
await authService.agentSignin({ email, password });
await authService.adminSignin({ email, password });

// Registration with role-specific data
await authService.registerClient(clientData);
await authService.registerDeveloper(developerData);
await authService.registerBroker(brokerData);
await authService.registerAgent(agentData);
```

### Property Management
```typescript
// Using the properties hook
const { 
  properties, 
  loading, 
  createProperty, 
  uploadCSV, 
  assignProperty 
} = useProperties();

// Create property
await createProperty({
  title: "Luxury Condo",
  price: 2500000,
  location: "BGC, Taguig",
  property_type: "condominium"
});

// Upload CSV for bulk properties
await uploadCSV(csvFile);

// Assign to agent/broker
await assignProperty(propertyId, { agent_id: agentId });
```

### Team Management
```typescript
// Using the teams hook
const { 
  teams, 
  createTeam, 
  addTeamMember, 
  getTeamStatistics 
} = useTeams();

// Create team
await createTeam({
  name: "Sales Team Alpha",
  description: "High-performing sales team"
});

// Add member
await addTeamMember(teamId, { agent_id: agentId });

// Get team stats
const stats = await getTeamStatistics(teamId);
```

### Event & Calendar Management
```typescript
// Using the events hook
const { 
  events, 
  createEvent, 
  getCalendarEvents, 
  markEventCompleted 
} = useEvents();

// Create event
await createEvent({
  title: "Property Showing",
  event_type: "site_viewing",
  scheduled_date: "2024-08-20T10:00:00Z",
  property_id: propertyId
});

// Get calendar events
const calendarEvents = await getCalendarEvents("2024-08-01", "2024-08-31");
```

### Site Viewing Management
```typescript
// Using site viewings hook
const { 
  siteViewings, 
  createSiteViewing, 
  confirmSiteViewing,
  getAvailableTimeSlots 
} = useSiteViewings();

// Create site viewing (guest or client)
await createSiteViewing({
  property_id: propertyId,
  scheduled_date: "2024-08-20T14:00:00Z",
  guest_name: "John Doe",
  guest_email: "john@example.com"
});

// Get available time slots
const slots = await getAvailableTimeSlots(propertyId, "2024-08-20");
```

### CRM & Lead Management
```typescript
// Using CRM hooks
const { leads, createLead, moveLeadToNextStage } = useLeads();
const { bookmarks, toggleBookmark } = useBookmarks();
const { notifications, markAllAsRead } = useNotifications();

// Create lead
await createLead({
  property_id: propertyId,
  client_name: "Jane Smith",
  client_email: "jane@example.com",
  client_phone: "+63912345678"
});

// Move lead through pipeline
await moveLeadToNextStage(leadId);

// Toggle bookmark
await toggleBookmark(propertyId);
```

### Maintenance & Payments
```typescript
// Using maintenance hook
const { 
  maintenanceRequests, 
  createMaintenanceRequest, 
  assignMaintenanceRequest 
} = useMaintenance();

// Create maintenance request
await createMaintenanceRequest({
  property_id: propertyId,
  title: "AC Repair",
  category: "HVAC",
  priority: "high"
});

// Using payments hook
const { 
  payments, 
  createPayment, 
  processPayment,
  getPaymentSchedule 
} = usePayments();

// Create payment
await createPayment({
  property_id: propertyId,
  amount: 50000,
  payment_type: "downpayment"
});

// Get payment schedule
const schedule = await getPaymentSchedule(propertyId);
```

### Analytics & Reporting
```typescript
// Using analytics hooks
const { 
  dashboardData, 
  salesData, 
  fetchSalesAnalytics,
  exportData 
} = useAnalytics();

// Fetch specific analytics
await fetchSalesAnalytics({
  start_date: "2024-01-01",
  end_date: "2024-12-31",
  property_type: "condominium"
});

// Export data
const csvBlob = await exportData('sales', 'csv');

// Agent analytics
const { statistics } = useAgentAnalytics();
// Broker analytics
const { statistics: brokerStats, teamAnalytics } = useBrokerAnalytics();
```

## 🔧 Configuration

### API Base URL
The API base URL is configured in `src/services/apiService.ts`:
```typescript
const API_BASE_URL = 'http://localhost:8000';
```

### Authentication Token Management
Tokens are automatically managed by the ApiService:
- Stored in localStorage
- Automatically included in request headers
- Cleared on logout

## 🎯 Usage Examples by Role

### For Developers
```typescript
// Upload properties via CSV
const { uploadCSV } = useProperties();
await uploadCSV(csvFile);

// Get developer properties
const developerProperties = await propertyService.getDeveloperProperties();

// Get developer payments
const { getDeveloperPayments } = usePayments();
const payments = await getDeveloperPayments();
```

### For Brokers
```typescript
// Manage teams
const { teams, createTeam, addTeamMember } = useTeams();

// Get broker analytics
const { statistics, teamAnalytics } = useBrokerAnalytics();

// Assign properties to agents
const { assignProperty } = useProperties();
await assignProperty(propertyId, { agent_id: agentId });
```

### For Agents
```typescript
// Manage leads
const { leads, updateLeadStatus } = useLeads();

// Get agent statistics
const { statistics } = useAgentAnalytics();

// Handle site viewings
const { siteViewings, confirmSiteViewing } = useSiteViewings();
```

### For Clients
```typescript
// Browse and bookmark properties
const { properties } = useProperties({ filters: { property_type: "house" } });
const { toggleBookmark } = useBookmarks();

// Schedule site viewings
const { createSiteViewing } = useSiteViewings();

// Make payments
const { createPayment } = usePayments();

// Request maintenance
const { createMaintenanceRequest } = useMaintenance();
```

### For Admins
```typescript
// Manage user accounts
const pendingAccounts = await userManagementService.getPendingAccounts();
await userManagementService.approveAccount(userId);

// Get system analytics
const { dashboardData } = useAnalytics();

// Export system data
const { exportData } = useAnalytics();
const reportBlob = await exportData('inventory', 'excel');
```

## 🔄 Real-time Features

### Auto-refresh Analytics
```typescript
// Analytics with auto-refresh every 5 minutes
const analytics = useAnalytics({
  autoFetch: true,
  refreshInterval: 5 * 60 * 1000 // 5 minutes
});
```

### Notification Management
```typescript
const { notifications, unreadCount, markAsRead } = useNotifications();
// Automatically fetches notifications and unread count
```

## 📱 Error Handling

All hooks include built-in error handling:
```typescript
const { properties, loading, error } = useProperties();

if (loading) return <LoadingSpinner />;
if (error) return <ErrorMessage message={error} />;
```

## 🚀 Getting Started

1. **Start the Backend:**
```bash
cd atuna-backend
python -m uvicorn app.main:app --reload
```

2. **Start the Frontend:**
```bash
cd atuna-frontend
npm run dev
```

3. **Access the API Documentation:**
Visit http://localhost:8000/docs for FastAPI Swagger documentation

## 🔐 Authentication Flow

1. User signs in with role-specific endpoint
2. Token is stored in localStorage
3. All subsequent API calls include the Bearer token
4. Token is cleared on logout

## 📊 Data Flow

1. React components use hooks
2. Hooks call service methods
3. Services make HTTP requests to FastAPI backend
4. Responses are processed and state is updated
5. Components re-render with new data

This integration provides a complete, type-safe connection between the Atuna frontend and backend, supporting all the features mentioned in your backend implementation.