import { useRef } from "react";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/react";
import { IconMessageChatbot, IconSend2 } from "@tabler/icons-react";

export const Chatbot = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const inputMessage = useRef<HTMLInputElement>(null);

  const handleOpen = () => {
    onOpen();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const message = inputMessage.current?.value?.trim();

    if (!message) return;
    inputMessage.current!.value = "";
  };

  return (
    <>
      <Button
        isIconOnly
        className="fixed right-8 bottom-8 z-50"
        color="primary"
        radius="full"
        size="lg"
        variant="shadow"
        onPress={handleOpen}
      >
        <IconMessageChatbot />
      </Button>

      {/* Modal */}
      <Modal
        backdrop="blur"
        isDismissable={false}
        isOpen={isOpen}
        size="xl"
        onClose={onClose}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-foreground-700">
                AI Assistant
              </ModalHeader>
              <ModalBody>
                <ChatGetStarted />
              </ModalBody>
              <ModalFooter>
                <form
                  className="flex items-center w-full"
                  method="post"
                  onSubmit={handleSubmit}
                >
                  <Input
                    ref={inputMessage}
                    className="mr-2"
                    placeholder="Enter message..."
                  />
                  <Button
                    isIconOnly
                    color="primary"
                    radius="full"
                    type="submit"
                    variant="light"
                  >
                    <IconSend2 />
                  </Button>
                </form>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

const ChatGetStarted = () => {
  return (
    <span className="flex flex-col items-center justify-center bg-gray-100 p-8 rounded-medium text-foreground-500 select-none">
      <IconMessageChatbot size={32} />
      Chat with our AI Assistant
    </span>
  );
};
