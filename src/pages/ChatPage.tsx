// ChatPage.tsx
import React, { useState, useEffect, useRef } from 'react';
import { Button, Input, Card, Avatar } from '@heroui/react';
import EmojiPicker from 'emoji-picker-react';
import axios from 'axios';

// Define interfaces for type safety
interface Message {
  id: string;
  from: string;
  content: string;
  timestamp: string;
  isClient: boolean;
}

// Sample data: 50 chat messages for testing
const initialMessages: Message[] = Array.from({ length: 50 }, (_, i) => ({
  id: `msg${i + 1}`,
  from: i % 2 === 0 ? 'client1@atuna.com' : 'Agent (ChatGPT)',
  content: i % 2 === 0 
    ? `Hi, is the property at ${['100 Rizal St', '101 Quezon Ave', '102 Magsaysay Blvd', '103 Pioneer Ave', '104 Dacera St'][i % 5]} haunted or flood-safe? Budget: ₱${2.5 + (i % 3)}M`
    : `Thanks for your inquiry! The property at ${['100 Rizal St', '101 Quezon Ave', '102 Magsaysay Blvd', '103 Pioneer Ave', '104 Dacera St'][i % 5]} is ${i % 2 === 0 ? 'non-haunted and flood-safe' : 'pet-friendly with low flood risk'}. Can I schedule a viewing?`,
  timestamp: new Date(Date.now() - (50 - i) * 60000).toISOString(),
  isClient: i % 2 === 0,
}));

const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // OpenAI API config
  const OPENAI_API_KEY = 'your-sk-api-key-here';
  const openaiApi = axios.create({
    baseURL: 'https://api.openai.com/v1',
    headers: {
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
  });

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    const clientMessage: Message = {
      id: `msg${messages.length + 1}`,
      from: 'client1@atuna.com',
      content: newMessage,
      timestamp: new Date().toISOString(),
      isClient: true,
    };

    setMessages(prev => [...prev, clientMessage]);
    setNewMessage('');

    try {
      const response = await openaiApi.post('/chat/completions', {
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: `You are a real estate assistant for aTuna, a real estate website in General Santos City, Philippines. Provide accurate, friendly responses about properties (prices in PHP, e.g., ₱2.5M–₱5M), addressing local concerns like haunted status, flood risk, or pet-friendliness. Use Filipino-friendly language (e.g., "Mabuhay!"). Reference General Santos City neighborhoods (e.g., Rizal St, Quezon Ave).`,
          },
          { role: 'user', content: newMessage },
        ],
        max_tokens: 150,
      });

      const botMessage: Message = {
        id: `msg${messages.length + 2}`,
        from: 'Agent (ChatGPT)',
        content: response.data.choices[0].message.content,
        timestamp: new Date().toISOString(),
        isClient: false,
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('OpenAI API error:', error);
      setMessages(prev => [
        ...prev,
        {
          id: `msg${messages.length + 2}`,
          from: 'Agent (ChatGPT)',
          content: 'Sorry, I encountered an issue. Please try again!',
          timestamp: new Date().toISOString(),
          isClient: false,
        },
      ]);
    }
  };

  const handleEmojiSelect = (emojiObject: any) => {
    setNewMessage(prev => prev + emojiObject.emoji);
    setIsEmojiPickerOpen(false);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto h-[600px] flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-lg font-bold">aTuna Real Estate Chat</h2>
        <p className="text-sm text-gray-500">Mabuhay! Ask about properties in GenSan</p>
      </div>

      {/* Scrollable chat area */}
      <div ref={scrollAreaRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(message => (
          <div
            key={message.id}
            className={`flex ${message.isClient ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[70%] ${message.isClient ? 'text-right' : 'text-left'}`}>
              <Card className={`p-3 ${message.isClient ? 'bg-blue-100' : 'bg-gray-100'}`}>
                <div className="flex gap-2 items-start">
                  <Avatar
                    src={message.isClient ? '/client.png' : '/agent.png'}
                    alt={message.from}
                    size="sm"
                  />
                  <div>
                    <p className="text-sm font-medium">{message.from}</p>
                    <p className="text-sm">{message.content}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        ))}
      </div>

      {/* Input + emoji */}
      <div className="relative p-4 border-t flex items-center gap-2">
        <Button variant="ghost" onClick={() => setIsEmojiPickerOpen(!isEmojiPickerOpen)}>
          😊
        </Button>

        {isEmojiPickerOpen && (
          <div className="absolute bottom-20 z-10">
            <EmojiPicker onEmojiClick={handleEmojiSelect} />
          </div>
        )}

        <Input
          value={newMessage}
          onChange={e => setNewMessage(e.target.value)}
          placeholder="Ask about a property..."
          className="flex-1"
          onKeyPress={e => {
            if (e.key === 'Enter') sendMessage();
          }}
        />

        <Button onClick={sendMessage} disabled={!newMessage.trim()}>
          Send
        </Button>
      </div>
    </Card>
  );
};

export default ChatPage;
