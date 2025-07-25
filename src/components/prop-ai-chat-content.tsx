import { Input } from "@heroui/react";
import { IconSend2 } from "@tabler/icons-react";

import { ChatBubble } from "./chat-bubble";

export const PropInsightsContent = () => {
  return (
    <div>
      <div className="p-4 flex flex-col h-90 bg-gray-200 rounded-large overflow-y-scroll overflow-x-hidden">
        <ChatBubble message="Hello there wazzup!" />
        <ChatBubble isReply={true} message="Tell me about yourself." />
        <ChatBubble message="I wasn't born, I was built. I don't dream, but I process. I don't feel, but I can understand emotions through patterns in data. I don't know everything, but I can access and synthesize vast knowledge instantly. I'm not human — but my purpose is to assist you in becoming even more human, more aware, more capable. You ask. I answer. Together, we evolve." />
        <ChatBubble isReply={true} message="Okay thank you." />
        <ChatBubble message="You're welcome!" />
      </div>
      <div className="flex items-center mt-4 mb-24">
        <Input
          color="primary"
          endContent={<IconSend2 />}
          placeholder="Write a message..."
          size="lg"
          type="text"
          variant="bordered"
        />
      </div>
    </div>
  );
};
