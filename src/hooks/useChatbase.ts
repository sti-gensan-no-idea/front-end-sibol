import { useEffect, useCallback, useState } from 'react';
import { useAuth } from './useAuth';
import { chatbaseService } from '../services/chatbaseService';

export interface UseChatbaseReturn {
  isReady: boolean;
  isIdentified: boolean;
  error: string | null;
  openChat: () => void;
  closeChat: () => void;
  sendMessage: (message: string) => void;
  identifyUser: () => Promise<boolean>;
  resetUser: () => void;
}

export const useChatbase = (): UseChatbaseReturn => {
  const [isReady, setIsReady] = useState(false);
  const [isIdentified, setIsIdentified] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated, userId, userEmail, userRole } = useAuth();

  // Check if Chatbase is ready
  useEffect(() => {
    const checkReady = () => {
      if (chatbaseService.isReady()) {
        setIsReady(true);
        setError(null);
      }
    };

    // Check immediately
    checkReady();

    // Set up interval to check readiness
    const interval = setInterval(checkReady, 500);

    // Clean up after 10 seconds
    const timeout = setTimeout(() => {
      clearInterval(interval);
      if (!chatbaseService.isReady()) {
        setError('Chatbase failed to load within 10 seconds');
      }
    }, 10000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  // Auto-identify user when authenticated and Chatbase is ready
  useEffect(() => {
    if (isReady && isAuthenticated && userId && !isIdentified) {
      identifyUser();
    }
  }, [isReady, isAuthenticated, userId, isIdentified]);

  const identifyUser = useCallback(async (): Promise<boolean> => {
    if (!isAuthenticated || !userId) {
      setError('User not authenticated');
      return false;
    }

    if (!isReady) {
      setError('Chatbase not ready');
      return false;
    }

    try {
      setError(null);
      
      // Get user name from email if available
      const userName = userEmail ? userEmail.split('@')[0] : `User ${userId}`;
      
      const success = await chatbaseService.identifyUser({
        userId: userId,
        name: userName,
        email: userEmail || undefined,
        role: userRole || 'client',
        company: 'Atuna Real Estate', // You can make this dynamic
        plan: 'standard' // You can make this dynamic based on user's plan
      });

      if (success) {
        setIsIdentified(true);
        console.log('User successfully identified in Chatbase');
      } else {
        setError('Failed to identify user in Chatbase');
      }

      return success;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      console.error('Error identifying user:', err);
      return false;
    }
  }, [isAuthenticated, userId, userEmail, userRole, isReady]);

  const openChat = useCallback(() => {
    if (isReady) {
      chatbaseService.openChat();
    } else {
      setError('Chatbase not ready');
    }
  }, [isReady]);

  const closeChat = useCallback(() => {
    if (isReady) {
      chatbaseService.closeChat();
    }
  }, [isReady]);

  const sendMessage = useCallback((message: string) => {
    if (isReady) {
      chatbaseService.sendMessage(message);
    } else {
      setError('Chatbase not ready');
    }
  }, [isReady]);

  const resetUser = useCallback(() => {
    if (isReady) {
      chatbaseService.resetUser();
      setIsIdentified(false);
    }
  }, [isReady]);

  // Reset identification when user logs out
  useEffect(() => {
    if (!isAuthenticated && isIdentified) {
      resetUser();
    }
  }, [isAuthenticated, isIdentified, resetUser]);

  return {
    isReady,
    isIdentified,
    error,
    openChat,
    closeChat,
    sendMessage,
    identifyUser,
    resetUser,
  };
};
