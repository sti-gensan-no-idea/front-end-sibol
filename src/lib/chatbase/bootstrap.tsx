import { useAuth } from "@/lib/auth/useAuth";
import { useEffect } from "react";

export const loadChatbase = async (
  userId: string, 
  userHash: string, 
  metadata?: Record<string, unknown>
): Promise<void> => {
  // Set user config before loading script
  window.chatbaseUserConfig = {
    user_id: userId,
    user_hash: userHash,
    user_metadata: metadata || {}
  };

  // Create and append script tag
  const script = document.createElement("script");
  script.defer = true;
  script.src = "https://www.chatbase.co/embed.min.js";
  script.id = "chatbase-script";
  
  // Remove existing script if present
  const existingScript = document.getElementById("chatbase-script");
  if (existingScript) {
    existingScript.remove();
  }
  
  document.head.appendChild(script);
};

export const useChatbase = () => {
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated || !user) return;

    let mounted = true;

    const initializeChatbase = async () => {
      try {
        // For now, fallback without backend endpoint
        // TODO: Implement /chatbase/identity endpoint on backend
        const userId = user.id;
        const userHash = ""; // Backend should provide HMAC hash
        
        if (mounted) {
          await loadChatbase(userId, userHash, {
            name: `${user.first_name || ""} ${user.last_name || ""}`.trim(),
            email: user.email,
            role: user.role
          });
        }
      } catch (error) {
        console.warn("Failed to initialize Chatbase:", error);
      }
    };

    initializeChatbase();

    return () => {
      mounted = false;
    };
  }, [isAuthenticated, user]);

  const updateIdentity = async (newUserData: typeof user) => {
    if (!isAuthenticated || !window.chatbase || !newUserData) return;

    try {
      window.chatbase("identify", {
        user_id: newUserData.id,
        user_hash: "", // Backend should provide this
        user_metadata: {
          name: `${newUserData.first_name || ""} ${newUserData.last_name || ""}`.trim(),
          email: newUserData.email,
          role: newUserData.role
        }
      });
    } catch (error) {
      console.warn("Failed to update Chatbase identity:", error);
    }
  };

  return {
    updateIdentity,
    isLoaded: typeof window !== "undefined" && typeof window.chatbase !== "undefined"
  };
};

// Bootstrap component to initialize Chatbase
export const ChatbaseBootstrap: React.FC = () => {
  useChatbase();
  return null; // This component doesn't render anything
};
