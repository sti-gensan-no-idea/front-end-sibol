// API Integration Test Component
import React, { useEffect, useState } from 'react';
import API from '../api';
import { 
  Property, 
  User, 
  Team, 
  Lead, 
  LeadStatus,
  Notification,
  DashboardAnalytics 
} from '../api/types';

const APIIntegrationTest: React.FC = () => {
  const [testResults, setTestResults] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Test Authentication
  const testAuthentication = async () => {
    const testKey = 'auth';
    setLoading(prev => ({ ...prev, [testKey]: true }));
    setErrors(prev => ({ ...prev, [testKey]: '' }));

    try {
      // Test login
      const credentials = {
        email: 'test@example.com',
        password: 'password123'
      };
      
      const token = await API.auth.signinWithRole(credentials, 'client');
      setTestResults(prev => ({ ...prev, [testKey]: token }));
      setIsAuthenticated(true);

      // Get current user
      const user = await API.auth.getCurrentUser();
      setCurrentUser(user);
      
      console.log('✅ Authentication test passed', { token, user });
    } catch (error: any) {
      setErrors(prev => ({ ...prev, [testKey]: error.message }));
      console.error('❌ Authentication test failed:', error);
    } finally {
      setLoading(prev => ({ ...prev, [testKey]: false }));
    }
  };

  // Test Properties API
  const testProperties = async () => {
    const testKey = 'properties';
    setLoading(prev => ({ ...prev, [testKey]: true }));
    setErrors(prev => ({ ...prev, [testKey]: '' }));

    try {
      // Get properties
      const properties = await API.properties.getProperties({ limit: 5 });
      
      // Create a test property
      const newProperty = await API.properties.createProperty({
        title: 'Test Property',
        description: 'This is a test property',
        price: 1000000,
        location: 'Test Location',
        property_type: 'Condo'
      });

      setTestResults(prev => ({ 
        ...prev, 
        [testKey]: { 
          list: properties,
          created: newProperty 
        } 
      }));
      
      console.log('✅ Properties test passed', { properties, newProperty });
    } catch (error: any) {
      setErrors(prev => ({ ...prev, [testKey]: error.message }));
      console.error('❌ Properties test failed:', error);
    } finally {
      setLoading(prev => ({ ...prev, [testKey]: false }));
    }
  };

  // Test Teams API
  const testTeams = async () => {
    const testKey = 'teams';
    setLoading(prev => ({ ...prev, [testKey]: true }));
    setErrors(prev => ({ ...prev, [testKey]: '' }));

    try {
      const teams = await API.teams.getTeams();
      setTestResults(prev => ({ ...prev, [testKey]: teams }));
      console.log('✅ Teams test passed', teams);
    } catch (error: any) {
      setErrors(prev => ({ ...prev, [testKey]: error.message }));
      console.error('❌ Teams test failed:', error);
    } finally {
      setLoading(prev => ({ ...prev, [testKey]: false }));
    }
  };

  // Test Analytics API
  const testAnalytics = async () => {
    const testKey = 'analytics';
    setLoading(prev => ({ ...prev, [testKey]: true }));
    setErrors(prev => ({ ...prev, [testKey]: '' }));

    try {
      const analytics = await API.analytics.getDashboardAnalytics();
      setTestResults(prev => ({ ...prev, [testKey]: analytics }));
      console.log('✅ Analytics test passed', analytics);
    } catch (error: any) {
      setErrors(prev => ({ ...prev, [testKey]: error.message }));
      console.error('❌ Analytics test failed:', error);
    } finally {
      setLoading(prev => ({ ...prev, [testKey]: false }));
    }
  };

  // Test CRM API
  const testCRM = async () => {
    const testKey = 'crm';
    setLoading(prev => ({ ...prev, [testKey]: true }));
    setErrors(prev => ({ ...prev, [testKey]: '' }));

    try {
      const leads = await API.crm.getLeads();
      const pipelineSummary = await API.crm.getPipelineSummary();
      
      setTestResults(prev => ({ 
        ...prev, 
        [testKey]: { leads, pipelineSummary } 
      }));
      console.log('✅ CRM test passed', { leads, pipelineSummary });
    } catch (error: any) {
      setErrors(prev => ({ ...prev, [testKey]: error.message }));
      console.error('❌ CRM test failed:', error);
    } finally {
      setLoading(prev => ({ ...prev, [testKey]: false }));
    }
  };

  // Test Notifications API
  const testNotifications = async () => {
    const testKey = 'notifications';
    setLoading(prev => ({ ...prev, [testKey]: true }));
    setErrors(prev => ({ ...prev, [testKey]: '' }));

    try {
      const notifications = await API.notifications.getNotifications({ limit: 10 });
      const unreadCount = await API.notifications.getUnreadCount();
      
      setTestResults(prev => ({ 
        ...prev, 
        [testKey]: { notifications, unreadCount } 
      }));
      console.log('✅ Notifications test passed', { notifications, unreadCount });
    } catch (error: any) {
      setErrors(prev => ({ ...prev, [testKey]: error.message }));
      console.error('❌ Notifications test failed:', error);
    } finally {
      setLoading(prev => ({ ...prev, [testKey]: false }));
    }
  };

  // Test Site Viewings API
  const testSiteViewings = async () => {
    const testKey = 'siteViewings';
    setLoading(prev => ({ ...prev, [testKey]: true }));
    setErrors(prev => ({ ...prev, [testKey]: '' }));

    try {
      const viewings = await API.siteViewings.getSiteViewings();
      setTestResults(prev => ({ ...prev, [testKey]: viewings }));
      console.log('✅ Site Viewings test passed', viewings);
    } catch (error: any) {
      setErrors(prev => ({ ...prev, [testKey]: error.message }));
      console.error('❌ Site Viewings test failed:', error);
    } finally {
      setLoading(prev => ({ ...prev, [testKey]: false }));
    }
  };

  // Run all tests
  const runAllTests = async () => {
    console.log('🚀 Starting API integration tests...');
    
    // Run authentication first
    await testAuthentication();
    
    // Only run other tests if authenticated
    if (API.auth.isAuthenticated()) {
      await Promise.all([
        testProperties(),
        testTeams(),
        testAnalytics(),
        testCRM(),
        testNotifications(),
        testSiteViewings()
      ]);
    }
    
    console.log('✅ All tests completed');
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold mb-6">API Integration Test Dashboard</h1>
        
        {/* Test Controls */}
        <div className="mb-6 space-x-4">
          <button
            onClick={runAllTests}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Run All Tests
          </button>
          <button
            onClick={testAuthentication}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Test Auth Only
          </button>
        </div>

        {/* Authentication Status */}
        <div className="mb-6 p-4 bg-gray-50 rounded">
          <h2 className="text-lg font-semibold mb-2">Authentication Status</h2>
          <div className="space-y-1">
            <p>Status: <span className={isAuthenticated ? 'text-green-600' : 'text-red-600'}>
              {isAuthenticated ? 'Authenticated' : 'Not Authenticated'}
            </span></p>
            {currentUser && (
              <>
                <p>User: {currentUser.email}</p>
                <p>Role: {currentUser.role}</p>
              </>
            )}
          </div>
        </div>

        {/* Test Results */}
        <div className="space-y-4">
          {Object.entries({
            auth: 'Authentication',
            properties: 'Properties',
            teams: 'Teams',
            analytics: 'Analytics',
            crm: 'CRM',
            notifications: 'Notifications',
            siteViewings: 'Site Viewings'
          }).map(([key, label]) => (
            <div key={key} className="border rounded p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">{label}</h3>
                <div className="flex items-center space-x-2">
                  {loading[key] && (
                    <span className="text-blue-600">Loading...</span>
                  )}
                  {!loading[key] && !errors[key] && testResults[key] && (
                    <span className="text-green-600">✅ Passed</span>
                  )}
                  {!loading[key] && errors[key] && (
                    <span className="text-red-600">❌ Failed</span>
                  )}
                </div>
              </div>
              
              {errors[key] && (
                <div className="bg-red-50 p-2 rounded text-red-700 text-sm">
                  Error: {errors[key]}
                </div>
              )}
              
              {testResults[key] && (
                <div className="bg-green-50 p-2 rounded text-sm">
                  <pre className="overflow-auto max-h-40">
                    {JSON.stringify(testResults[key], null, 2)}
                  </pre>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Individual Test Buttons */}
        <div className="mt-6 pt-6 border-t">
          <h3 className="font-semibold mb-3">Individual Tests</h3>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={testProperties}
              className="px-3 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 text-sm"
              disabled={!isAuthenticated}
            >
              Test Properties
            </button>
            <button
              onClick={testTeams}
              className="px-3 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 text-sm"
              disabled={!isAuthenticated}
            >
              Test Teams
            </button>
            <button
              onClick={testAnalytics}
              className="px-3 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 text-sm"
              disabled={!isAuthenticated}
            >
              Test Analytics
            </button>
            <button
              onClick={testCRM}
              className="px-3 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 text-sm"
              disabled={!isAuthenticated}
            >
              Test CRM
            </button>
            <button
              onClick={testNotifications}
              className="px-3 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 text-sm"
              disabled={!isAuthenticated}
            >
              Test Notifications
            </button>
            <button
              onClick={testSiteViewings}
              className="px-3 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 text-sm"
              disabled={!isAuthenticated}
            >
              Test Site Viewings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default APIIntegrationTest;
