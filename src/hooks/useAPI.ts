// API Hooks - Dynamic hooks that use the OpenAPI client
import { useEffect, useState, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import openAPIClient from '../services/api/openAPIClient';
import { AxiosResponse } from 'axios';

// Generic hook for any API operation
export function useAPIOperation<T = any>(
  operationId: string,
  options?: {
    autoFetch?: boolean;
    params?: any;
    onSuccess?: (data: T) => void;
    onError?: (error: any) => void;
  }
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const dispatch = useAppDispatch();

  const execute = useCallback(
    async (params?: any, body?: any) => {
      setLoading(true);
      setError(null);

      try {
        // Dynamically call the operation
        const response: AxiosResponse<T> = await (openAPIClient as any)[operationId](
          params || options?.params,
          body
        );
        
        const result = response.data;
        setData(result);
        options?.onSuccess?.(result);
        return result;
      } catch (err) {
        setError(err);
        options?.onError?.(err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [operationId, options]
  );

  useEffect(() => {
    if (options?.autoFetch) {
      execute();
    }
  }, [options?.autoFetch]);

  return {
    data,
    loading,
    error,
    execute,
    refetch: execute,
  };
}

// Specialized hooks for common operations
export function useProperties() {
  const dispatch = useAppDispatch();
  const { properties, loading, error } = useAppSelector((state) => state.properties);

  const fetchProperties = useAPIOperation('get_properties_properties__get', {
    onSuccess: (data) => {
      // Dispatch to Redux store if needed
    },
  });

  const createProperty = useAPIOperation('create_property_properties__post');
  const updateProperty = useAPIOperation('update_property_properties__property_id__put');
  const deleteProperty = useAPIOperation('archive_property_properties__property_id__delete');
  const uploadCSV = useAPIOperation('upload_properties_csv_properties_upload_csv_post');

  return {
    properties,
    loading: loading || fetchProperties.loading,
    error: error || fetchProperties.error,
    fetchProperties: fetchProperties.execute,
    createProperty: createProperty.execute,
    updateProperty: updateProperty.execute,
    deleteProperty: deleteProperty.execute,
    uploadCSV: uploadCSV.execute,
  };
}

export function useAuth() {
  const dispatch = useAppDispatch();
  const authState = useAppSelector((state) => state.auth);

  const signin = useAPIOperation('signin_for_access_token_auth_signin_post', {
    onSuccess: (data) => {
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('user_id', data.user_id);
      localStorage.setItem('user_role', data.role);
    },
  });

  const developerSignin = useAPIOperation('developer_signin_auth_developer_signin_post');
  const brokerSignin = useAPIOperation('broker_signin_auth_broker_signin_post');
  const agentSignin = useAPIOperation('agent_signin_auth_agent_signin_post');
  const adminSignin = useAPIOperation('admin_signin_auth_admin_signin_post');

  const registerClient = useAPIOperation('register_client_register_client_post');
  const registerDeveloper = useAPIOperation('register_developer_register_developer_post');
  const registerBroker = useAPIOperation('register_broker_register_broker_post');
  const registerAgent = useAPIOperation('register_agent_register_agent_post');

  return {
    ...authState,
    signin: signin.execute,
    developerSignin: developerSignin.execute,
    brokerSignin: brokerSignin.execute,
    agentSignin: agentSignin.execute,
    adminSignin: adminSignin.execute,
    registerClient: registerClient.execute,
    registerDeveloper: registerDeveloper.execute,
    registerBroker: registerBroker.execute,
    registerAgent: registerAgent.execute,
  };
}

export function useTeams() {
  const getTeams = useAPIOperation('get_teams_teams__get', { autoFetch: true });
  const createTeam = useAPIOperation('create_team_teams__post');
  const updateTeam = useAPIOperation('update_team_teams__team_id__put');
  const deleteTeam = useAPIOperation('archive_team_teams__team_id__delete');
  const addTeamMember = useAPIOperation('add_team_member_teams__team_id__members_post');
  const removeTeamMember = useAPIOperation('remove_team_member_teams__team_id__members__user_id__delete');

  return {
    teams: getTeams.data || [],
    loading: getTeams.loading,
    error: getTeams.error,
    createTeam: createTeam.execute,
    updateTeam: updateTeam.execute,
    deleteTeam: deleteTeam.execute,
    addTeamMember: addTeamMember.execute,
    removeTeamMember: removeTeamMember.execute,
    refetch: getTeams.refetch,
  };
}

export function useEvents() {
  const getEvents = useAPIOperation('get_monthly_events_events__get');
  const createEvent = useAPIOperation('create_event_events__post');
  const updateEvent = useAPIOperation('update_event_events__event_id__put');
  const cancelEvent = useAPIOperation('cancel_event_events__event_id__delete');

  return {
    events: getEvents.data || [],
    loading: getEvents.loading,
    error: getEvents.error,
    fetchEvents: getEvents.execute,
    createEvent: createEvent.execute,
    updateEvent: updateEvent.execute,
    cancelEvent: cancelEvent.execute,
  };
}

export function useNotifications() {
  const getNotifications = useAPIOperation('get_notifications_notifications__get', {
    autoFetch: true,
  });
  const markAllRead = useAPIOperation('mark_all_notifications_as_read_notifications__put');
  const deleteNotification = useAPIOperation('delete_notification_notifications__notification_id__delete');

  return {
    notifications: getNotifications.data?.items || [],
    unreadCount: getNotifications.data?.items?.filter((n: any) => !n.is_read).length || 0,
    loading: getNotifications.loading,
    error: getNotifications.error,
    markAllRead: markAllRead.execute,
    deleteNotification: deleteNotification.execute,
    refetch: getNotifications.refetch,
  };
}

export function useAnalytics() {
  const getDashboard = useAPIOperation('get_dashboard_analytics_analytics_dashboard_get');
  const getSales = useAPIOperation('get_sales_analytics_analytics_sales_get');
  const getLeads = useAPIOperation('get_leads_analytics_analytics_leads_get');
  const getInventory = useAPIOperation('get_inventory_analytics_analytics_inventory_get');
  const getRevenue = useAPIOperation('get_revenue_analytics_analytics_revenue_get');

  return {
    fetchDashboard: getDashboard.execute,
    fetchSales: getSales.execute,
    fetchLeads: getLeads.execute,
    fetchInventory: getInventory.execute,
    fetchRevenue: getRevenue.execute,
    dashboardData: getDashboard.data,
    salesData: getSales.data,
    leadsData: getLeads.data,
    inventoryData: getInventory.data,
    revenueData: getRevenue.data,
    loading: getDashboard.loading || getSales.loading || getLeads.loading,
  };
}

export function useSiteViewings() {
  const getViewings = useAPIOperation('get_site_viewings_site_viewings__get');
  const scheduleViewing = useAPIOperation('schedule_site_viewing_site_viewings__post');
  const updateViewing = useAPIOperation('update_site_viewing_site_viewings__viewing_id__put');
  const cancelViewing = useAPIOperation('cancel_site_viewing_site_viewings__viewing_id__delete');

  return {
    viewings: getViewings.data || [],
    loading: getViewings.loading,
    error: getViewings.error,
    fetchViewings: getViewings.execute,
    scheduleViewing: scheduleViewing.execute,
    updateViewing: updateViewing.execute,
    cancelViewing: cancelViewing.execute,
  };
}

export function useCRM() {
  const getLeads = useAPIOperation('get_leads_site_viewings_crm_leads_get');
  const createLead = useAPIOperation('create_lead_site_viewings_crm_leads_post');
  const updateLeadStatus = useAPIOperation('update_lead_status_site_viewings_crm_leads__lead_id__status_put');
  const getPipelineSummary = useAPIOperation('get_pipeline_summary_site_viewings_crm_pipeline_summary_get');

  return {
    leads: getLeads.data || [],
    pipelineSummary: getPipelineSummary.data,
    loading: getLeads.loading,
    error: getLeads.error,
    fetchLeads: getLeads.execute,
    createLead: createLead.execute,
    updateLeadStatus: updateLeadStatus.execute,
    fetchPipelineSummary: getPipelineSummary.execute,
  };
}

export function useMaintenance() {
  const getRequests = useAPIOperation('get_maintenance_requests_maintenance__get');
  const createRequest = useAPIOperation('create_maintenance_request_maintenance__post');
  const updateRequest = useAPIOperation('update_maintenance_request_maintenance__request_id__put');

  return {
    requests: getRequests.data || [],
    loading: getRequests.loading,
    error: getRequests.error,
    fetchRequests: getRequests.execute,
    createRequest: createRequest.execute,
    updateRequest: updateRequest.execute,
  };
}

export function usePayments() {
  const getPayments = useAPIOperation('get_payments_maintenance_payments__get');
  const createPayment = useAPIOperation('create_payment_maintenance_payments__post');
  const updatePaymentStatus = useAPIOperation('update_payment_status_maintenance_payments__payment_id__status_put');
  const getPaymentSchedule = useAPIOperation('get_payment_schedule_maintenance_payments_property__property_id__schedule_get');

  return {
    payments: getPayments.data || [],
    loading: getPayments.loading,
    error: getPayments.error,
    fetchPayments: getPayments.execute,
    createPayment: createPayment.execute,
    updatePaymentStatus: updatePaymentStatus.execute,
    fetchPaymentSchedule: getPaymentSchedule.execute,
  };
}

export function useAccountManagement() {
  const getPendingAccounts = useAPIOperation('get_pending_accounts_accounts_pending_get');
  const approveAccount = useAPIOperation('approve_account_accounts_approve__user_id__put');
  const rejectAccount = useAPIOperation('reject_account_accounts_reject__user_id__put');
  const banAccount = useAPIOperation('ban_account_accounts_ban__user_id__put');
  const unbanAccount = useAPIOperation('unban_account_accounts_unban__user_id__put');

  return {
    pendingAccounts: getPendingAccounts.data || [],
    loading: getPendingAccounts.loading,
    error: getPendingAccounts.error,
    fetchPendingAccounts: getPendingAccounts.execute,
    approveAccount: approveAccount.execute,
    rejectAccount: rejectAccount.execute,
    banAccount: banAccount.execute,
    unbanAccount: unbanAccount.execute,
  };
}

// Hook for dynamically calling any API operation
export function useDynamicAPI(operationId: string) {
  return useAPIOperation(operationId);
}

// Hook to get available operations
export function useAPIOperations() {
  const [operations, setOperations] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOperations = async () => {
      try {
        // Wait for client to initialize
        await openAPIClient.initialize();
        const ops = openAPIClient.getOperationsByTag();
        setOperations(ops);
      } catch (error) {
        console.error('Failed to load API operations:', error);
      } finally {
        setLoading(false);
      }
    };

    loadOperations();
  }, []);

  return { operations, loading };
}

// Utility hook for file uploads
export function useFileUpload(operationId: string) {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const upload = useCallback(
    async (file: File, additionalParams?: any) => {
      setLoading(true);
      setError(null);
      setProgress(0);

      const formData = new FormData();
      formData.append('file', file);

      if (additionalParams) {
        Object.keys(additionalParams).forEach((key) => {
          if (additionalParams[key] !== undefined) {
            formData.append(key, additionalParams[key]);
          }
        });
      }

      try {
        const response = await (openAPIClient as any)[operationId](
          additionalParams,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            onUploadProgress: (progressEvent: any) => {
              const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              setProgress(percentCompleted);
            },
          }
        );

        return response.data;
      } catch (err) {
        setError(err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [operationId]
  );

  return {
    upload,
    progress,
    loading,
    error,
  };
}

// Export all hooks
export * from '../hooks';
