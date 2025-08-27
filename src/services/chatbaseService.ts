// Chatbase Integration Service
export interface ChatbaseConfig {
  user_id: string;
  user_hash: string;
  user_metadata?: {
    name?: string;
    email?: string;
    company?: string;
    role?: string;
    plan?: string;
    [key: string]: any;
  };
}

export interface ChatbaseUserData {
  userId: string;
  name?: string;
  email?: string;
  role?: string;
  company?: string;
  plan?: string;
}

class ChatbaseService {
  private readonly CHATBASE_SECRET = 'pfw7pnjbihkh2cidjhzghnijzz6kki4c';
  private isInitialized = false;

  constructor() {
    this.loadChatbaseScript();
  }

  /**
   * Load the Chatbase embed script
   */
  private loadChatbaseScript(): void {
    if (typeof window === 'undefined') return;

    // Prevent multiple script loads
    if (document.getElementById('chatbase-script')) return;

    // Initialize Chatbase proxy
    if (!window.chatbase || window.chatbase("getState") !== "initialized") {
      window.chatbase = (...args: any[]) => {
        if (!window.chatbase.q) {
          window.chatbase.q = [];
        }
        window.chatbase.q.push(args);
      };

      window.chatbase = new Proxy(window.chatbase, {
        get(target: any, prop: string) {
          if (prop === "q") {
            return target.q;
          }
          return (...args: any[]) => target(prop, ...args);
        }
      });
    }

    const onLoad = () => {
      const script = document.createElement("script");
      script.src = "https://www.chatbase.co/embed.min.js";
      script.id = "TvbB6m5YtJVSQylnEdP9s";
      script.setAttribute('domain', 'www.chatbase.co');
      script.setAttribute('data-chatbase-id', 'TvbB6m5YtJVSQylnEdP9s');
      document.body.appendChild(script);
      
      script.onload = () => {
        this.isInitialized = true;
        console.log('Chatbase script loaded successfully');
      };

      script.onerror = () => {
        console.error('Failed to load Chatbase script');
      };
    };

    if (document.readyState === "complete") {
      onLoad();
    } else {
      window.addEventListener("load", onLoad);
    }
  }

  /**
   * Generate user hash for identity verification
   * In production, this should be done on your backend server
   */
  private async generateUserHash(userId: string): Promise<string> {
    try {
      // This is a client-side implementation for demo purposes
      // In production, make an API call to your backend to generate the hash
      
      // For now, we'll simulate the backend call
      // Replace this with actual API call: await fetch('/api/chatbase/user-hash', {...})
      
      const encoder = new TextEncoder();
      const key = await crypto.subtle.importKey(
        'raw',
        encoder.encode(this.CHATBASE_SECRET),
        { name: 'HMAC', hash: 'SHA-256' },
        false,
        ['sign']
      );
      
      const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(userId));
      const hashArray = Array.from(new Uint8Array(signature));
      return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    } catch (error) {
      console.error('Error generating user hash:', error);
      throw new Error('Failed to generate user hash');
    }
  }

  /**
   * Initialize Chatbase with user identity verification
   */
  async identifyUser(userData: ChatbaseUserData): Promise<boolean> {
    try {
      if (!userData.userId) {
        console.warn('No user ID provided for Chatbase identification');
        return false;
      }

      // Generate hash (in production, this should come from your backend)
      const userHash = await this.generateUserHash(userData.userId);

      // Prepare user metadata (limit to 1000 characters total)
      const metadata: Record<string, any> = {};
      if (userData.name) metadata.name = userData.name;
      if (userData.email) metadata.email = userData.email;
      if (userData.role) metadata.role = userData.role;
      if (userData.company) metadata.company = userData.company;
      if (userData.plan) metadata.plan = userData.plan;

      // Ensure metadata doesn't exceed 1000 characters
      const metadataString = JSON.stringify(metadata);
      if (metadataString.length > 1000) {
        console.warn('User metadata exceeds 1000 characters, truncating...');
        // Truncate metadata if too long
        Object.keys(metadata).forEach(key => {
          if (JSON.stringify(metadata).length > 950) {
            delete metadata[key];
          }
        });
      }

      const config: ChatbaseConfig = {
        user_id: userData.userId,
        user_hash: userHash,
        user_metadata: metadata
      };

      // Wait for Chatbase to be available
      let attempts = 0;
      const maxAttempts = 50; // 5 seconds max wait

      while (!window.chatbase && attempts < maxAttempts) {
        await new Promise(resolve => setTimeout(resolve, 100));
        attempts++;
      }

      if (!window.chatbase) {
        console.error('Chatbase is not available after waiting');
        return false;
      }

      // Identify user
      window.chatbase('identify', config);
      
      console.log('User identified in Chatbase:', { 
        user_id: config.user_id, 
        metadata: config.user_metadata 
      });
      
      return true;
    } catch (error) {
      console.error('Error identifying user in Chatbase:', error);
      return false;
    }
  }

  /**
   * Configure Chatbase before script loads (pre-configuration method)
   */
  preConfigureUser(userData: ChatbaseUserData): void {
    if (typeof window === 'undefined') return;

    this.generateUserHash(userData.userId).then(userHash => {
      const metadata: Record<string, any> = {};
      if (userData.name) metadata.name = userData.name;
      if (userData.email) metadata.email = userData.email;
      if (userData.role) metadata.role = userData.role;
      if (userData.company) metadata.company = userData.company;
      if (userData.plan) metadata.plan = userData.plan;

      window.chatbaseUserConfig = {
        user_id: userData.userId,
        user_hash: userHash,
        user_metadata: metadata
      };

      console.log('Chatbase pre-configured for user:', userData.userId);
    }).catch(error => {
      console.error('Error pre-configuring Chatbase:', error);
    });
  }

  /**
   * Check if Chatbase is loaded and ready
   */
  isReady(): boolean {
    return this.isInitialized && !!window.chatbase;
  }

  /**
   * Open Chatbase widget programmatically
   */
  openChat(): void {
    if (window.chatbase) {
      try {
        window.chatbase('open');
      } catch (error) {
        console.warn('Could not open Chatbase chat:', error);
      }
    }
  }

  /**
   * Close Chatbase widget programmatically
   */
  closeChat(): void {
    if (window.chatbase) {
      try {
        window.chatbase('close');
      } catch (error) {
        console.warn('Could not close Chatbase chat:', error);
      }
    }
  }

  /**
   * Send a message programmatically
   */
  sendMessage(message: string): void {
    if (window.chatbase) {
      try {
        window.chatbase('send', message);
      } catch (error) {
        console.warn('Could not send message to Chatbase:', error);
      }
    }
  }

  /**
   * Reset user identification (for logout)
   */
  resetUser(): void {
    if (window.chatbase) {
      try {
        window.chatbase('reset');
      } catch (error) {
        console.warn('Could not reset Chatbase user:', error);
      }
    }
  }
}

// Global interface for Chatbase
declare global {
  interface Window {
    chatbase: any;
    chatbaseUserConfig?: ChatbaseConfig;
  }
}

export const chatbaseService = new ChatbaseService();
export default chatbaseService;
