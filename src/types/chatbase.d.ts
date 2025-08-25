interface ChatbaseConfig {
  user_id: string;
  user_hash: string;
  user_metadata?: {
    name?: string;
    email?: string;
    [key: string]: any;
  };
}

declare global {
  interface Window {
    chatbaseUserConfig: ChatbaseConfig | undefined;
    chatbase: any;
  }
}

export {};
