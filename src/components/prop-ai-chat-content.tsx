import { Button } from "@heroui/button";
import { IconMessageChatbot } from "@tabler/icons-react";

export const PropInsightsContent = () => {
  return (
    <div className="h-96 bg-gray-200 rounded-large flex flex-col items-center justify-center">
      <IconMessageChatbot className="text-foreground-400" size={64} />
      <span className="text-3xl text-foreground-700 font-bold mt-4">
        Chat with AI
      </span>
      <p className="max-w-lg text-center mt-2 text-foreground-700">
        Assists in real estate decisions, providing intelligent chat support for
        inquireies and guidance.
      </p>
      <Button className="mt-8">Open Chat</Button>
    </div>
  );
};
