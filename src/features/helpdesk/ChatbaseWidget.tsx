import { useEffect } from 'react';
import { getUserId } from '@/features/auth/auth.store';

declare global {
  interface Window {
    chatbase?: (...args: any[]) => void;
  }
}

interface ChatbaseWidgetProps {
  botId?: string;
}

export function ChatbaseWidget({ botId = 'your-chatbase-bot-id' }: ChatbaseWidgetProps) {
  useEffect(() => {
    // Only load if enabled in environment
    if (import.meta.env.VITE_ENABLE_CHATBOT !== 'true') {
      return;
    }

    // Load Chatbase script
    const script = document.createElement('script');
    script.src = 'https://www.chatbase.co/embed.min.js';
    script.async = true;
    script.defer = true;
    script.setAttribute('data-chatbot-id', botId);
    
    document.body.appendChild(script);

    // Get user identity for verification (when implemented)
    const userId = getUserId() || 'anonymous';
    
    // TODO: When backend signing endpoint is implemented, call it here
    // Example:
    // api.post('/chatbase/sign', { user_id: userId })
    //   .then(({ data }) => {
    //     window.chatbase?.('identify', {
    //       userId: data.user_id,
    //       signature: data.signature,
    //     });
    //   })
    //   .catch(() => {
    //     // Fallback to anonymous mode
    //     window.chatbase?.('identify', { userId: 'anonymous' });
    //   });

    // For now, use simple identification without verification
    script.onload = () => {
      window.chatbase?.('identify', { 
        userId,
        // Add user metadata if available
        email: localStorage.getItem('user_email') || undefined,
        role: localStorage.getItem('user_role') || undefined,
      });
    };

    return () => {
      // Cleanup script on unmount
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [botId]);

  return null; // This component doesn't render anything visible
}
