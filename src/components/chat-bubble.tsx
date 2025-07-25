interface ChatBubbleInterface {
  message: string;
  isReply?: boolean;
}

export const ChatBubble = ({
  message,
  isReply = false,
}: ChatBubbleInterface) => {
  return (
    <div className={`p-4 flex ${isReply ? "justify-end" : "justify-start"}`}>
      <p
        className={`${
          isReply ? "bg-primary" : "bg-gray-700"
        } rounded-large w-fit py-3 px-4 text-white max-w-lg`}
      >
        {message}
      </p>
    </div>
  );
};
