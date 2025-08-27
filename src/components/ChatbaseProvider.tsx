import React, { useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { chatbaseService } from '../services/chatbaseService';

interface ChatbaseProviderProps {
  children: React.ReactNode;
}

export const ChatbaseProvider: React.FC<ChatbaseProviderProps> = ({ children }) => {
  const { isAuthenticated, userId, userEmail, userRole } = useAuth();

  useEffect(() => {
    // Pre-configure Chatbase when user is authenticated
    if (isAuthenticated && userId) {
      const userName = userEmail ? userEmail.split('@')[0] : `User ${userId}`;
      
      chatbaseService.preConfigureUser({
        userId: userId,
        name: userName,
        email: userEmail || undefined,
        role: userRole || 'client',
        company: 'Atuna Real Estate',
        plan: 'standard' // You can make this dynamic
      });
    }
  }, [isAuthenticated, userId, userEmail, userRole]);

  return <>{children}</>;
};
