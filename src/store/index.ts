// Redux Store Configuration
import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

// Import all slices
import authReducer from './slices/authSlice';
import userReducer from './slices/userSlice';
import propertyReducer from './slices/propertySlice';
import teamReducer from './slices/teamSlice';
import eventReducer from './slices/eventSlice';
import notificationReducer from './slices/notificationSlice';
import bookmarkReducer from './slices/bookmarkSlice';
import analyticsReducer from './slices/analyticsSlice';
import siteViewingReducer from './slices/siteViewingSlice';
import leadReducer from './slices/leadSlice';
import maintenanceReducer from './slices/maintenanceSlice';
import paymentReducer from './slices/paymentSlice';
import accountReducer from './slices/accountSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    properties: propertyReducer,
    teams: teamReducer,
    events: eventReducer,
    notifications: notificationReducer,
    bookmarks: bookmarkReducer,
    analytics: analyticsReducer,
    siteViewings: siteViewingReducer,
    leads: leadReducer,
    maintenance: maintenanceReducer,
    payments: paymentReducer,
    accounts: accountReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['auth/setToken'],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
        // Ignore these paths in the state
        ignoredPaths: ['auth.token'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Typed hooks for use throughout the app
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
