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
