// Chatbase Integration Component with Identity Verification
import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../store';
import crypto from 'crypto-js';

interface ChatbaseConfig {
  chatbotId?: string;
  domain?: string;
  theme?: 'light' | 'dark';
  position?: 'bottom-right' | 'bottom-left';
}

interface UserMetadata {
  name?: string;
  email?: string;
  company?: string;
  role?: string;
  property_interest?: string;
  agent_assigned?: string;
  [key: string]: any;
}

const CHATBASE_SECRET = import.meta.env.VITE_CHATBASE_SECRET || 'pfw7pnjbihkh2cidjhzghnijzz6kki4c';
const CHATBASE_CHATBOT_ID = import.meta.env.VITE_CHATBASE_CHATBOT_ID || 'your-chatbot-id';
const CHATBASE_DOMAIN = import.meta.env.VITE_CHATBASE_DOMAIN || 'chatbase.co';

declare global {
  interface Window {
    chatbaseUserConfig: {
      user_id: string;
      user_hash: string;
      user_metadata?: UserMetadata;
    };
    chatbase: (action: string, data?: any) => void;
    embeddedChatbotConfig?: any;
  }
}

export const ChatbaseWidget: React.FC<ChatbaseConfig> = ({
  chatbotId = CHATBASE_CHATBOT_ID,
  domain = CHATBASE_DOMAIN,
  theme = 'light',
  position = 'bottom-right',
}) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const { userId, role } = useAppSelector(state => state.auth);
  const user = useAppSelector(state => state.user.currentUser);

  // Generate user hash for identity verification
  const generateUserHash = (userId: string): string => {
    const hash = crypto.HmacSHA256(userId, CHATBASE_SECRET);
    return hash.toString(crypto.enc.Hex);
  };

  // Initialize Chatbase with user identity
  const initializeChatbase = () => {
    if (!userId || isInitialized) return;

    const userHash = generateUserHash(userId);
    
    // Prepare user metadata
    const userMetadata: UserMetadata = {
      name: user?.first_name && user?.last_name 
        ? `${user.first_name} ${user.last_name}` 
        : user?.email || 'Guest',
      email: user?.email,
      role: role || 'client',
      company: user?.company_name,
    };

    // Set user configuration before loading the script
    window.chatbaseUserConfig = {
      user_id: userId,
      user_hash: userHash,
      user_metadata: userMetadata,
    };

    // Load Chatbase script
    const script = document.createElement('script');
    script.src = `https://www.chatbase.co/embed.min.js`;
    script.setAttribute('chatbotId', chatbotId);
    script.setAttribute('domain', domain);
    script.defer = true;
    
    script.onload = () => {
      // Additional configuration after script loads
      if (window.chatbase) {
        window.chatbase('identify', {
          user_id: userId,
          user_hash: userHash,
          user_metadata: userMetadata,
        });
      }
      setIsInitialized(true);
    };

    document.body.appendChild(script);

    // Configure embedded chatbot
    window.embeddedChatbotConfig = {
      chatbotId: chatbotId,
      domain: domain,
      theme: theme,
      position: position,
    };

    return () => {
      // Cleanup script on unmount
      const existingScript = document.querySelector(`script[chatbotId="${chatbotId}"]`);
      if (existingScript) {
        existingScript.remove();
      }
    };
  };

  // Update user identity when user changes
  const updateUserIdentity = () => {
    if (!window.chatbase || !userId) return;

    const userHash = generateUserHash(userId);
    const updatedMetadata: UserMetadata = {
      name: user?.first_name && user?.last_name 
        ? `${user.first_name} ${user.last_name}` 
        : user?.email || 'Guest',
      email: user?.email,
      role: role || 'client',
      company: user?.company_name,
    };

    window.chatbase('identify', {
      user_id: userId,
      user_hash: userHash,
      user_metadata: updatedMetadata,
    });
  };

  useEffect(() => {
    if (userId && !isInitialized) {
      initializeChatbase();
    }
  }, [userId]);

  useEffect(() => {
    if (isInitialized && user) {
      updateUserIdentity();
    }
  }, [user, isInitialized]);

  // Custom styles for the chatbot
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .chatbase-iframe-container {
        z-index: 9999 !important;
      }
      
      .chatbase-bubble {
        background-color: ${theme === 'dark' ? '#1a1a1a' : '#ffffff'} !important;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
      }

      .chatbase-bubble:hover {
        transform: scale(1.05);
        transition: transform 0.2s ease;
      }

      /* Position adjustments */
      .chatbase-${position} {
        ${position === 'bottom-right' ? 'right: 20px; bottom: 20px;' : 'left: 20px; bottom: 20px;'}
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, [theme, position]);

  return null; // The widget is injected via script
};

// Chatbase Hook for programmatic control
export const useChatbase = () => {
  const { userId } = useAppSelector(state => state.auth);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const checkReady = setInterval(() => {
      if (window.chatbase) {
        setIsReady(true);
        clearInterval(checkReady);
      }
    }, 100);

    return () => clearInterval(checkReady);
  }, []);

  const openChat = () => {
    if (window.chatbase && isReady) {
      window.chatbase('open', {});
    }
  };

  const closeChat = () => {
    if (window.chatbase && isReady) {
      window.chatbase('close', {});
    }
  };

  const sendMessage = (message: string) => {
    if (window.chatbase && isReady) {
      window.chatbase('sendMessage', { message });
    }
  };

  const updateMetadata = (metadata: UserMetadata) => {
    if (window.chatbase && isReady && userId) {
      const userHash = crypto.HmacSHA256(userId, CHATBASE_SECRET).toString(crypto.enc.Hex);
      window.chatbase('identify', {
        user_id: userId,
        user_hash: userHash,
        user_metadata: metadata,
      });
    }
  };

  return {
    isReady,
    openChat,
    closeChat,
    sendMessage,
    updateMetadata,
  };
};

// Helpdesk UI Component
export const HelpdeskButton: React.FC = () => {
  const { openChat } = useChatbase();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={openChat}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="fixed bottom-24 right-6 bg-primary text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 z-50"
      style={{
        transform: isHovered ? 'scale(1.1)' : 'scale(1)',
      }}
    >
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
        />
      </svg>
      {isHovered && (
        <span className="absolute right-full mr-2 px-2 py-1 bg-gray-800 text-white text-sm rounded whitespace-nowrap">
          Need Help?
        </span>
      )}
    </button>
  );
};

export default ChatbaseWidget;
