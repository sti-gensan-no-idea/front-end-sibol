import { Button } from "@heroui/react";
import { IconMessageChatbot } from "@tabler/icons-react";
import { useEffect } from "react";

declare global {
  interface Window {
    chatbase?: any;
    chatbaseConfig?: { showFloatingInitialMessages?: boolean; floatingInitialMessagesDelay?: number; };
    __chatbaseLoaded?: boolean;
  }
}

export function Chatbot() {
  useEffect(() => {
    if (window.__chatbaseLoaded) return;
    window.__chatbaseLoaded = true;

    // optional: floating initial messages
    window.chatbaseConfig = { showFloatingInitialMessages: true, floatingInitialMessagesDelay: 2 };

    // your provided loader snippet
    (function () {
      if (!window.chatbase || window.chatbase("getState") !== "initialized") {
        const queued = (...args: any[]) => {
          if (!window.chatbase.q) window.chatbase.q = [];
          window.chatbase.q.push(args);
        };
        window.chatbase = new Proxy(queued as any, {
          get(target, prop) {
            if (prop === "q") return (target as any).q;
            return (...args: any[]) => (target as any)(prop, ...args);
          },
        });
      }
      const onLoad = function () {
        const script = document.createElement("script");
        script.src = "https://www.chatbase.co/embed.min.js";
        script.id = "TvbB6m5YtJVSQylnEdP9s";
        (script as any).domain = "www.chatbase.co";
        document.body.appendChild(script);
      };
      if (document.readyState === "complete") onLoad();
      else window.addEventListener("load", onLoad);
    })();
  }, []);

  const openChat = () => { try { window.chatbase?.("open"); } catch {} };

  return (
    <Button
      className="fixed right-8 bottom-8 z-50 bg-white"
      radius="full"
      size="lg"
      startContent={<IconMessageChatbot />}
      variant="shadow"
      onPress={openChat}
    >
      Chat with AI
    </Button>
  );
}

export default Chatbot;
