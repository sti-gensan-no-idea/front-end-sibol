import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import { 
  fetchProperties, 
  createProperty, 
  uploadPropertiesCSV 
} from '../store/slices/propertySlice';
import { 
  fetchDashboardAnalytics
} from '../store/slices/analyticsSlice';
import { 
  fetchNotifications,
  markAllAsRead 
} from '../store/slices/notificationSlice';
import { 
  useAPIOperation,
  useProperties,
  useAnalytics,
  useCRM,
  useSiteViewings,
  useTeams
} from '../hooks/useAPI';
import { useChatbase } from './ChatbaseWidget';
import { PropertyResponse, LeadStatusEnum, LeadResponse, SiteViewingCreate, EventCreate, PropertyCreate } from '../types/apiTypes';

interface DashboardProps {}

const IntegratedDashboardExample: React.FC<DashboardProps> = () => {
  const dispatch = useAppDispatch();
  
  // Redux State
  const { isAuthenticated, role } = useAppSelector(state => state.auth);
  const { currentUser } = useAppSelector(state => state.user);
  const { properties, loading: propertiesLoading } = useAppSelector(state => state.properties);
  const { dashboard: analyticsData } = useAppSelector(state => state.analytics);
  const { notifications, unreadCount } = useAppSelector(state => state.notifications);
  
  // API Hooks
  const { fetchProperties: fetchPropertiesHook, createProperty: createPropertyHook } = useProperties();
  const { fetchDashboard, dashboardData } = useAnalytics();
  const { leads, fetchLeads, createLead, updateLeadStatus } = useCRM();
  const { viewings, scheduleViewing } = useSiteViewings();
  const { teams, createTeam, addTeamMember } = useTeams();
  
  // Dynamic API Operation
  const customOperation = useAPIOperation('get_pending_accounts_accounts_pending_get');
  
  // Chatbase Hook
  const { openChat, sendMessage, updateMetadata } = useChatbase();
  
  // Local State
  const [selectedProperty, setSelectedProperty] = useState<PropertyResponse | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  
  // Initialize data on mount
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchProperties());
      dispatch(fetchDashboardAnalytics());
      dispatch(fetchNotifications({ limit: 10, offset: 0 }));
      
      fetchDashboard().catch(console.error);
      fetchLeads().catch(console.error);
      
      if (currentUser) {
        const userName = currentUser?.first_name && currentUser?.last_name 
          ? `${currentUser.first_name} ${currentUser.last_name}`
          : currentUser?.email || 'User';
          
        updateMetadata({
          name: userName,
          email: currentUser?.email || undefined,
          role: role || undefined,
        });
      }
    }
  }, [isAuthenticated, dispatch, currentUser, role]);
  
  // Handle property creation (numbers, not strings)
  const handleCreateProperty = async () => {
    const newProperty: PropertyCreate = {
      title: 'Modern Condo Unit',
      description: 'Beautiful 2BR condo in downtown',
      price: 5_000_000,                 // number ✅
      location: 'Makati City',
      property_type: 'condominium',     // keep consistent with backend
      expected_downpayment: 500_000,    // number ✅
      project_name: 'Downtown Heights',
    };
    
    try {
      const result = await dispatch(createProperty(newProperty as any)).unwrap();
      console.log('Property created:', result);
      setShowCreateModal(false);
      dispatch(fetchProperties());
    } catch (error) {
      console.error('Failed to create property:', error);
    }
  };
  
  // Handle CSV upload
  const handleCSVUpload = async (file: File) => {
    try {
      setUploadProgress(0);
      const result = await dispatch(uploadPropertiesCSV({ 
        file, 
        projectName: 'Downtown Project',
        onProgress: (progress: number) => {
          setUploadProgress(progress);
          console.log(`Upload progress: ${progress}%`);
        }
      })).unwrap();
      
      console.log('CSV upload result:', result);
      dispatch(fetchProperties());
      setUploadProgress(0);
    } catch (error) {
      console.error('Failed to upload CSV:', error);
      setUploadProgress(0);
    }
  };
  
  // Handle lead status update
  const handleLeadStatusUpdate = async (leadId: string, newStatus: LeadStatusEnum) => {
    try {
      const result = await updateLeadStatus(
        { lead_id: leadId, new_status: newStatus },
        null
      );
      console.log('Lead status updated:', result);
      fetchLeads().catch(console.error);
    } catch (error) {
      console.error('Failed to update lead status:', error);
    }
  };
  
  // Handle site viewing scheduling (use SiteViewingCreate keys)
  const handleScheduleViewing = async (propertyId: string) => {
    const viewingData: SiteViewingCreate = {
      property_id: propertyId,
      scheduled_date: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
      visitor_name: 'John Doe',
      visitor_email: 'john@example.com',
      visitor_phone: '+639123456789',
    };
    
    try {
      const result = await scheduleViewing(null as any, viewingData);
      console.log('Viewing scheduled:', result);
    } catch (error) {
      console.error('Failed to schedule viewing:', error);
    }
  };
  
  // Format currency
  const formatCurrency = (amount: string | number): string => {
    const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(numAmount);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Integrated Dashboard Example
          </h1>
          <p className="text-gray-600 mt-2">
            Showing all integrated features from the Atuna API
          </p>
        </div>
        
        {/* User Info */}
        {currentUser && (
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">User Information</h2>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="font-medium">
                  {currentUser.first_name || ''} {currentUser.last_name || ''}
                  {!currentUser.first_name && !currentUser.last_name && 'N/A'}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Role</p>
                <p className="font-medium capitalize">{role || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{currentUser.email || 'N/A'}</p>
              </div>
            </div>
          </div>
        )}
        
        {/* Analytics Dashboard */}
        {analyticsData && (
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Analytics Overview</h2>
            <div className="grid grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-3xl font-bold text-blue-600">
                  {analyticsData.total_properties}
                </p>
                <p className="text-sm text-gray-500">Total Properties</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-green-600">
                  {analyticsData.active_properties}
                </p>
                <p className="text-sm text-gray-500">Active Properties</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-purple-600">
                  {formatCurrency(analyticsData.total_revenue)}
                </p>
                <p className="text-sm text-gray-500">Total Revenue</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-orange-600">
                  {analyticsData.total_users}
                </p>
                <p className="text-sm text-gray-500">Total Users</p>
              </div>
            </div>
          </div>
        )}
        
        {/* Properties Section */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Properties</h2>
            <div className="space-x-2">
              <button
                onClick={() => setShowCreateModal(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Add Property
              </button>
              <label className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 cursor-pointer">
                Upload CSV
                <input
                  type="file"
                  accept=".csv"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleCSVUpload(file);
                  }}
                />
              </label>
            </div>
          </div>
          
          {uploadProgress > 0 && (
            <div className="mb-4">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
              <p className="text-sm text-gray-600 mt-1">Uploading... {uploadProgress}%</p>
            </div>
          )}
          
          {propertiesLoading ? (
            <p>Loading properties...</p>
          ) : (
            <div className="grid grid-cols-3 gap-4">
              {properties.slice(0, 6).map((property) => (
                <div key={property.id} className="border rounded p-4">
                  <h3 className="font-semibold">{property.title}</h3>
                  <p className="text-sm text-gray-600">{property.location}</p>
                  <p className="text-lg font-bold text-green-600">
                    {formatCurrency(property.price)}
                  </p>
                  <div className="mt-2 space-x-2">
                    <button
                      onClick={() => handleScheduleViewing(property.id)}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      Schedule Viewing
                    </button>
                    <button
                      onClick={() => setSelectedProperty(property)}
                      className="text-sm text-gray-600 hover:underline"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* CRM Pipeline */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">CRM Pipeline</h2>
          <div className="flex space-x-4 overflow-x-auto">
            {Object.values(LeadStatusEnum).map((status) => (
              <div key={status} className="flex-1 min-w-[150px]">
                <h3 className="text-sm font-medium text-gray-700 mb-2 capitalize">
                  {status.replace('_', ' ')}
                </h3>
                <div className="bg-gray-100 rounded p-2 min-h-[100px]">
                  {leads
                    .filter((lead: LeadResponse) => lead.status === status)
                    .slice(0, 3)
                    .map((lead: LeadResponse) => (
                      <div
                        key={lead.id}
                        className="bg-white rounded p-2 mb-2 text-sm cursor-pointer hover:shadow"
                        onClick={() => {
                          const statuses = Object.values(LeadStatusEnum);
                          const currentIndex = statuses.indexOf(status);
                          if (currentIndex < statuses.length - 1) {
                            handleLeadStatusUpdate(lead.id, statuses[currentIndex + 1]);
                          }
                        }}
                      >
                        <p className="font-medium">{lead.client_name}</p>
                        <p className="text-xs text-gray-500">{lead.client_email}</p>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Notifications */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">
              Notifications
              {unreadCount > 0 && (
                <span className="ml-2 px-2 py-1 bg-red-500 text-white text-sm rounded-full">
                  {unreadCount}
                </span>
              )}
            </h2>
            {unreadCount > 0 && (
              <button
                onClick={() => dispatch(markAllAsRead())}
                className="text-sm text-blue-600 hover:underline"
              >
                Mark all as read
              </button>
            )}
          </div>
          <div className="space-y-2">
            {notifications.length === 0 ? (
              <p className="text-gray-500 text-sm">No notifications</p>
            ) : (
              notifications.slice(0, 5).map((notification) => (
                <div
                  key={notification.id}
                  className={`p-3 rounded ${
                    (notification as any).is_read ? 'bg-gray-50' : 'bg-blue-50'
                  }`}
                >
                  <p className="font-medium">{(notification as any).title}</p>
                  <p className="text-sm text-gray-600">{(notification as any).message}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date((notification as any).created_at).toLocaleString()}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
        
        {/* Create Property Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <h3 className="text-xl font-semibold mb-4">Create New Property</h3>
              <p className="text-gray-600 mb-4">
                This will create a sample property. In production, you would have a form here.
              </p>
              <div className="flex space-x-2">
                <button
                  onClick={handleCreateProperty}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Create
                </button>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Selected Property Details */}
        {selectedProperty && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
              <h3 className="text-xl font-semibold mb-4">{selectedProperty.title}</h3>
              <div className="space-y-2">
                <p><strong>Location:</strong> {selectedProperty.location}</p>
                <p><strong>Price:</strong> {formatCurrency(selectedProperty.price)}</p>
                <p><strong>Type:</strong> {selectedProperty.property_type || 'N/A'}</p>
                <p><strong>Status:</strong> {selectedProperty.status}</p>
                {selectedProperty.description && (
                  <p><strong>Description:</strong> {selectedProperty.description}</p>
                )}
              </div>
              <button
                onClick={() => setSelectedProperty(null)}
                className="mt-4 px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              >
                Close
              </button>
            </div>
          </div>
        )}
        
        {/* Chatbot Help Button */}
        <button
          onClick={openChat}
          className="fixed bottom-6 right-6 px-6 py-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 flex items-center space-x-2 z-40"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
          <span>Need Help?</span>
        </button>
      </div>
    </div>
  );
};

export default IntegratedDashboardExample;
