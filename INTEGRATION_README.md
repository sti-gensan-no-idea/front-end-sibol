<<<<<<< HEAD
# 🔧 Step-by-Step Integration Recovery Guide

## Issue Resolved: Import Conflicts

The blank white page was caused by import/export conflicts when adding all services and hooks at once. 

## ✅ Current Status: WORKING

### Core Integration Active:
- ✅ AuthService - Authentication functionality
- ✅ ApiService - Base HTTP client
- ✅ DataService - Legacy data service
- ✅ PropertyService - Property management
- ✅ useAuth hook - Authentication state management
- ✅ useProperties hook - Property operations
- ✅ ProtectedRoute component - Route protection

## 🚀 Quick Start (Working Version)

### 1. Start Backend
```bash
cd atuna-backend
python -m uvicorn app.main:app --reload --port 8000
```

### 2. Start Frontend
```bash
cd atuna-frontend
npm run dev
```

### 3. Test Integration
The frontend should now load without the blank page. You can test the core integration at any page.

## 📋 Gradual Service Integration Plan

To add the remaining services without breaking the app, follow this sequence:

### Phase 1: Add Team Management
```typescript
// In src/services/index.ts, add:
export { default as teamService, TeamService } from './teamService';

// In src/hooks/index.ts, add:
export { useTeams } from './useTeams';
```

### Phase 2: Add Event Management
```typescript
// Add to services/index.ts:
export { default as eventService, EventService } from './eventService';

// Add to hooks/index.ts:
export { useEvents } from './useEvents';
```

### Phase 3: Add Site Viewing Management
```typescript
// Add to services/index.ts:
export { default as siteViewingService, SiteViewingService } from './siteViewingService';

// Add to hooks/index.ts:
export { useSiteViewings } from './useSiteViewings';
```

### Phase 4: Add CRM Features
```typescript
// Add to services/index.ts:
export { default as crmService, CRMService } from './crmService';

// Add to hooks/index.ts:
export { useLeads, useBookmarks, useNotifications } from './useLeads';
```

### Phase 5: Add Maintenance & Payments
```typescript
// Add to services/index.ts:
export { default as maintenancePaymentService, MaintenancePaymentService } from './maintenancePaymentService';

// Add to hooks/index.ts:
export { useMaintenance } from './useMaintenance';
export { usePayments } from './usePayments';
```

### Phase 6: Add Analytics
```typescript
// Add to services/index.ts:
export { default as analyticsService, AnalyticsService } from './analyticsService';

// Add to hooks/index.ts:
export { useAnalytics, useAgentAnalytics, useBrokerAnalytics } from './useAnalytics';
```

### Phase 7: Add User Management
```typescript
// Add to services/index.ts:
export { default as userManagementService, UserManagementService } from './userManagementService';
```

## 🧪 Testing Each Phase

After adding each phase:

1. **Check for TypeScript errors:**
   ```bash
   npm run build
   ```

2. **Test in browser:**
   - Refresh the page
   - Check browser console for errors
   - Verify the page loads correctly

3. **If errors occur:**
   - Revert the last changes
   - Check the specific service/hook for syntax issues
   - Fix any import/export problems
   - Try again

## 🔍 Common Issues & Solutions

### Import/Export Mismatches
- **Problem:** `does not provide an export named 'default'`
- **Solution:** Check if the service exports a default or named export
- **Fix:** Use `export { serviceName }` instead of `export { default as serviceName }`

### Circular Dependencies
- **Problem:** Services importing from each other
- **Solution:** Remove cross-imports between services
- **Fix:** Use composition instead of inheritance

### Missing Dependencies
- **Problem:** Service tries to import non-existent types
- **Solution:** Ensure all types are properly exported
- **Fix:** Check `src/types/api.ts` exports

## 📊 Current File Status

### ✅ Working Files:
- `src/services/apiService.ts`
- `src/services/authService.ts`
- `src/services/dataService.ts`
- `src/services/propertyService.ts`
- `src/services/index.ts` (core only)
- `src/hooks/useAuth.ts`
- `src/hooks/useProperties.ts`
- `src/hooks/protected-route.tsx`
- `src/hooks/index.ts` (core only)

### 🔄 Ready to Integrate:
- `src/services/teamService.ts`
- `src/services/eventService.ts`
- `src/services/siteViewingService.ts`
- `src/services/crmService.ts`
- `src/services/maintenancePaymentService.ts`
- `src/services/analyticsService.ts`
- `src/services/userManagementService.ts`
- All corresponding hooks

## 🎯 Next Steps

1. **Verify core functionality works** - Test authentication and property management
2. **Add services one by one** - Follow the phased approach above
3. **Test each addition** - Ensure stability before moving to next phase
4. **Build comprehensive demo** - Once all services are integrated
5. **Production optimization** - Add error boundaries, loading states, etc.

## 💡 Pro Tips

- **Always test after each addition** - Don't add multiple services at once
- **Use TypeScript checking** - Run `npm run build` frequently
- **Check browser console** - Look for runtime errors
- **Keep backups** - Git commit after each successful phase
- **Use incremental approach** - It's better to have working core features than broken everything

The integration is now stable and ready for gradual expansion! 🚀
=======
# Atuna Frontend - Backend API Integration

This document explains the integrated API setup between the Atuna frontend and backend.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- Backend API running on `http://localhost:8000`

### Setup Instructions

1. **Install dependencies:**
```bash
cd atuna-frontend
npm install
# or
yarn install
```

2. **Configure environment variables:**
```bash
cp .env.example .env
```

3. **Start the development server:**
```bash
npm run dev
# or
yarn dev
```

4. **Ensure backend is running:**
```bash
cd ../atuna-backend
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

## 📁 Integration Structure

### Services Layer
- **`src/services/apiService.ts`** - Base API client with authentication
- **`src/services/authService.ts`** - Authentication methods
- **`src/services/dataService.ts`** - Data CRUD operations
- **`src/services/index.ts`** - Service exports

### Custom Hooks
- **`src/hooks/useAuth.ts`** - Authentication state management
- **`src/hooks/useProperties.ts`** - Property management
- **`src/hooks/useTeams.ts`** - Team management
- **`src/hooks/useAnalytics.ts`** - Analytics data
- **`src/hooks/protected-route.tsx`** - Route protection

### Types
- **`src/types/api.ts`** - TypeScript definitions for all API responses

### Configuration
- **`src/config/api.ts`** - API endpoints and configuration

## 🔐 Authentication Flow

### Sign In Process
```typescript
const { signin, loading, error } = useAuth();

const handleSignIn = async () => {
  const success = await signin({ email, password }, 'client');
  if (success) {
    // User is redirected to appropriate dashboard
  }
};
```

### Role-based Signin Methods
- `authService.clientSignin(credentials)` → `/auth/signin`
- `authService.developerSignin(credentials)` → `/auth/developer/signin`
- `authService.brokerSignin(credentials)` → `/auth/broker/signin`
- `authService.agentSignin(credentials)` → `/auth/agent/signin`
- `authService.adminSignin(credentials)` → `/auth/admin/signin`

### Registration Methods
- `authService.registerClient(userData)` → `/register/client`
- `authService.registerDeveloper(userData)` → `/register/developer`
- `authService.registerBroker(userData)` → `/register/broker`
- `authService.registerAgent(userData)` → `/register/agent`

## 🏠 Property Management

### Using the Properties Hook
```typescript
const { 
  properties, 
  loading, 
  error,
  createProperty,
  updateProperty,
  deleteProperty,
  uploadCSV,
  assignToAgent 
} = useProperties();

// Create a new property
const newProperty = await createProperty({
  title: "Beautiful House",
  price: 5000000,
  location: "Makati City",
  property_type: "house",
  bedrooms: 3,
  bathrooms: 2
});

// Upload CSV file
const csvFile = new File(["..."], "properties.csv");
await uploadCSV(csvFile);
```

### Developer Upload Modal
The `DeveloperUploadModal` component provides:
- Manual property entry form
- CSV/Excel bulk upload with template download
- Real-time validation and error handling
- Automatic data refresh after upload

## 👥 Team Management

```typescript
const { teams, createTeam, addMember, removeMember } = useTeams();

// Create a new team
const newTeam = await createTeam({
  name: "Sales Team Alpha",
  description: "Primary sales team"
});

// Add team member
await addMember(teamId, userId);
```

## 📊 Analytics Integration

```typescript
const { dashboard, loading, error, fetchDashboard } = useAnalytics();

// Dashboard data includes:
// - Total properties, sales, leads, revenue
// - Monthly sales data
// - Top performing agents
// - Recent activities
```

## 🛡️ Protected Routes

Routes are automatically protected based on user roles:

```typescript
// Only developers can access these routes
<Route element={<ProtectedRoute allowedRole="developer" />}>
  <Route path="/developer/dashboard" element={<DeveloperDashboard />} />
</Route>
```

## 🔧 API Error Handling

All services include comprehensive error handling:

```typescript
try {
  const result = await dataService.getProperties();
} catch (error) {
  if (error instanceof ApiError) {
    console.error('API Error:', error.message, error.statusCode);
  }
}
```

## 📋 Available API Endpoints

### Authentication
- `POST /auth/signin` - Client login
- `POST /auth/developer/signin` - Developer login
- `POST /auth/broker/signin` - Broker login
- `POST /auth/agent/signin` - Agent login
- `POST /auth/admin/signin` - Admin login

### Registration
- `POST /register/client` - Client registration
- `POST /register/developer` - Developer registration (requires office verification)
- `POST /register/broker` - Broker registration (requires office verification)
- `POST /register/agent` - Agent registration (needs team assignment)

### Properties
- `GET /properties/` - List all properties
- `POST /properties/` - Create property
- `PUT /properties/{id}` - Update property
- `DELETE /properties/{id}` - Delete property
- `POST /properties/upload-csv` - Bulk upload via CSV
- `POST /properties/{id}/assign` - Assign to agent

### Teams
- `GET /teams/` - List teams
- `POST /teams/` - Create team
- `GET /teams/{id}` - Get team details
- `POST /teams/{id}/members` - Add team member
- `DELETE /teams/{id}/members/{userId}` - Remove member

### Site Viewings
- `GET /site-viewings/` - List viewings
- `POST /site-viewings/` - Schedule viewing
- `POST /site-viewings/guest` - Guest scheduling (no auth required)
- `PUT /site-viewings/{id}` - Update viewing

### Analytics
- `GET /analytics/dashboard` - Dashboard overview
- `GET /analytics/sales` - Sales analytics
- `GET /analytics/leads` - Leads analytics
- `GET /analytics/inventory` - Inventory analytics
- `GET /analytics/revenue` - Revenue analytics

## 🎨 Updated Components

### Sign-in Forms
- **Client Sign-in**: Integrated with backend authentication
- **Developer Sign-in**: Role-specific authentication
- **Broker/Agent Sign-in**: Available via navigation

### Sign-up Forms  
- **Client Sign-up**: Direct registration
- **Developer Sign-up**: Requires company details and office verification
- **Broker Sign-up**: Requires license information
- **Agent Sign-up**: Requires CPD certificate and broker assignment

### Developer Dashboard
- Real-time analytics integration
- Property management with API data
- Upload functionality with progress tracking

### Upload Modals
- **Manual Add Modal**: Form-based property creation
- **Bulk Upload Modal**: CSV/Excel upload with template download
- Error handling and success feedback

## 🔄 Data Flow

1. **User Authentication**: Login → Token stored → API requests authenticated
2. **Data Fetching**: Hooks fetch data → Components render → Real-time updates
3. **Form Submissions**: Form data → Validation → API call → Success/Error handling
4. **File Uploads**: File selection → Validation → Upload → Progress tracking

## 🚨 Error Handling

- Network errors automatically handled
- API errors displayed to users
- Form validation prevents invalid submissions
- Loading states for better UX

## 📝 Environment Variables

```bash
VITE_API_BASE_URL=http://localhost:8000  # Backend API URL
VITE_APP_NAME=Atuna Real Estate Platform
VITE_APP_VERSION=1.0.0
```

## 🧪 Testing the Integration

1. **Start both servers:**
   ```bash
   # Terminal 1 - Backend
   cd atuna-backend
   python -m uvicorn app.main:app --reload

   # Terminal 2 - Frontend  
   cd atuna-frontend
   npm run dev
   ```

2. **Test the flow:**
   - Visit `http://localhost:5173`
   - Create a developer account
   - Sign in and upload properties
   - Test different user roles
   - Check analytics dashboard

3. **Verify API calls:**
   - Open browser DevTools → Network tab
   - Perform actions and verify API calls
   - Check backend logs for request handling

## 🔧 Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure backend CORS is configured for `http://localhost:5173`
2. **Authentication Issues**: Check token storage in localStorage
3. **API Connection**: Verify backend is running on port 8000
4. **File Upload Issues**: Check file size limits and formats

### Debug Mode
Enable API request logging by setting:
```typescript
// In apiService.ts
const DEBUG = true; // Add logging for all requests
```

This integration provides a complete, type-safe, and user-friendly connection between the Atuna frontend and backend systems.
>>>>>>> main
