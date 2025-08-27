import { useRef, useEffect, useState } from "react";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
  Chip,
  Tooltip,
} from "@heroui/react";
import { IconMessageChatbot, IconSend2, IconExternalLink, IconRefresh, IconCheck, IconX } from "@tabler/icons-react";
import { useChatbase } from "@/hooks/useChatbase";

export const Chatbot = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isReady, isIdentified, error, openChat, sendMessage, identifyUser } = useChatbase();
  const [showStatus, setShowStatus] = useState(false);

  const handleOpen = () => {
    onOpen();
    // Show status for a few seconds when opened
    setShowStatus(true);
    setTimeout(() => setShowStatus(false), 3000);
  };

  const handleQuickMessage = (message: string) => {
    sendMessage(message);
    onClose();
    // Small delay then open Chatbase widget
    setTimeout(() => openChat(), 100);
  };

  const handleOpenChatbase = () => {
    openChat();
    onClose();
  };

  const getStatusColor = () => {
    if (error) return "danger";
    if (!isReady) return "warning";
    if (!isIdentified) return "warning";
    return "success";
  };

  const getStatusText = () => {
    if (error) return `Error: ${error}`;
    if (!isReady) return "Loading AI Assistant...";
    if (!isIdentified) return "Authenticating...";
    return "AI Assistant Ready";
  };

  return (
    <>
      {/* Floating Chat Button */}
      <div className="fixed right-8 bottom-8 z-50 flex flex-col items-end gap-2">
        {/* Status indicator */}
        {showStatus && (
          <Chip
            className="mb-2"
            color={getStatusColor()}
            variant="flat"
            size="sm"
            startContent={
              error ? <IconX size={14} /> : 
              isReady && isIdentified ? <IconCheck size={14} /> : 
              <IconRefresh size={14} className="animate-spin" />
            }
          >
            {getStatusText()}
          </Chip>
        )}
        
        {/* Main chat button */}
        <Tooltip content="Chat with AI Assistant" placement="left">
          <Button
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            radius="full"
            size="lg"
            startContent={<IconMessageChatbot className="text-white" />}
            variant="shadow"
            onPress={handleOpen}
          >
            AI Chat
          </Button>
        </Tooltip>
      </div>

      {/* Modal */}
      <Modal
        backdrop="blur"
        isDismissable={true}
        isOpen={isOpen}
        size="xl"
        classNames={{
          base: "bg-gradient-to-br from-white to-gray-50",
          header: "border-b border-gray-200",
          footer: "border-t border-gray-200",
        }}
        onClose={onClose}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    <IconMessageChatbot className="text-blue-600" size={24} />
                    <span className="text-foreground-700 font-semibold">
                      AI Assistant
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Chip
                      color={getStatusColor()}
                      variant="flat"
                      size="sm"
                      startContent={
                        error ? <IconX size={12} /> : 
                        isReady && isIdentified ? <IconCheck size={12} /> : 
                        <IconRefresh size={12} className="animate-spin" />
                      }
                    >
                      {isReady && isIdentified ? "Ready" : "Loading"}
                    </Chip>
                  </div>
                </div>
              </ModalHeader>
              <ModalBody>
                <ChatGetStarted 
                  isReady={isReady}
                  isIdentified={isIdentified}
                  error={error}
                  onQuickMessage={handleQuickMessage}
                  onOpenChatbase={handleOpenChatbase}
                  onRetryAuth={identifyUser}
                />
              </ModalBody>
              <ModalFooter>
                <QuickMessageForm 
                  onQuickMessage={handleQuickMessage}
                  disabled={!isReady || !isIdentified}
                />
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

interface ChatGetStartedProps {
  isReady: boolean;
  isIdentified: boolean;
  error: string | null;
  onQuickMessage: (message: string) => void;
  onOpenChatbase: () => void;
  onRetryAuth: () => void;
}

const ChatGetStarted: React.FC<ChatGetStartedProps> = ({
  isReady,
  isIdentified,
  error,
  onQuickMessage,
  onOpenChatbase,
  onRetryAuth
}) => {
  const quickMessages = [
    "How can I find properties in my budget?",
    "Tell me about available properties",
    "How do I schedule a property viewing?",
    "What documents do I need to buy a property?",
    "Can you help me with property financing?",
  ];

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center bg-red-50 p-8 rounded-lg text-center">
        <IconX size={48} className="text-red-500 mb-4" />
        <h3 className="text-lg font-semibold text-red-700 mb-2">Connection Error</h3>
        <p className="text-red-600 text-sm mb-4">{error}</p>
        <Button
          color="danger"
          variant="light"
          onPress={onRetryAuth}
          startContent={<IconRefresh size={16} />}
        >
          Retry Connection
        </Button>
      </div>
    );
  }

  if (!isReady || !isIdentified) {
    return (
      <div className="flex flex-col items-center justify-center bg-blue-50 p-8 rounded-lg">
        <IconRefresh size={48} className="text-blue-500 mb-4 animate-spin" />
        <h3 className="text-lg font-semibold text-blue-700 mb-2">
          {!isReady ? "Loading AI Assistant..." : "Authenticating..."}
        </h3>
        <p className="text-blue-600 text-sm">Please wait while we set up your chat experience</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome message */}
      <div className="text-center bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
        <IconMessageChatbot size={48} className="text-blue-600 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Welcome to Atuna AI Assistant
        </h3>
        <p className="text-gray-600 text-sm mb-4">
          I'm here to help you with property searches, scheduling viewings, and answering your real estate questions.
        </p>
        <Button
          color="primary"
          variant="solid"
          onPress={onOpenChatbase}
          startContent={<IconExternalLink size={16} />}
          className="bg-gradient-to-r from-blue-500 to-purple-600"
        >
          Open Full Chat Window
        </Button>
      </div>

      {/* Quick message buttons */}
      <div>
        <h4 className="text-sm font-semibold text-gray-700 mb-3">Quick Questions:</h4>
        <div className="grid gap-2">
          {quickMessages.map((message, index) => (
            <Button
              key={index}
              variant="bordered"
              className="text-left justify-start h-auto p-3 text-sm"
              onPress={() => onQuickMessage(message)}
            >
              {message}
            </Button>
          ))}
        </div>
      </div>

      {/* Features info */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="text-sm font-semibold text-gray-700 mb-2">What I can help with:</h4>
        <ul className="text-xs text-gray-600 space-y-1">
          <li>• Property search and recommendations</li>
          <li>• Scheduling property viewings</li>
          <li>• Real estate market information</li>
          <li>• Financing and mortgage guidance</li>
          <li>• Documentation requirements</li>
        </ul>
      </div>
    </div>
  );
};

interface QuickMessageFormProps {
  onQuickMessage: (message: string) => void;
  disabled: boolean;
}

const QuickMessageForm: React.FC<QuickMessageFormProps> = ({ onQuickMessage, disabled }) => {
  const inputMessage = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const message = inputMessage.current?.value?.trim();

    if (!message || disabled) return;
    
    onQuickMessage(message);
    inputMessage.current!.value = "";
  };

  return (
    <form
      className="flex items-center w-full"
      onSubmit={handleSubmit}
    >
      <Input
        ref={inputMessage}
        className="mr-2"
        placeholder={disabled ? "AI Assistant is loading..." : "Type your question..."}
        disabled={disabled}
      />
      <Button
        isIconOnly
        color="primary"
        radius="full"
        type="submit"
        variant="light"
        isDisabled={disabled}
      >
        <IconSend2 />
      </Button>
    </form>
  );
};
