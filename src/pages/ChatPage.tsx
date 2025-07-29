import React, { useState, useEffect, useRef } from 'react';
import { Button, Input, Card, CardHeader, CardBody, Avatar, Divider } from '@heroui/react';
import { IconMoodSmile, IconSend } from '@tabler/icons-react';
import EmojiPicker from 'emoji-picker-react';
import axios from 'axios';

interface Message {
  id: string;
  from: string;
  content: string;
  timestamp: string;
  isClient: boolean;
}

const initialMessages: Message[] = Array.from({ length: 50 }, (_, i) => ({
  id: `msg${i + 1}`,
  from: i % 2 === 0 ? 'client1@atuna.com' : 'Agent (A.I State)',
  content: i % 2 === 0 
    ? `Hi, is the property at ${['100 Rizal St', '101 Quezon Ave', '102 Magsaysay Blvd', '103 Pioneer Ave', '104 Dacera St'][i % 5]} haunted or flood-safe? Budget: ₱${2.5 + (i % 3)}M`
    : `Mabuhay! The property at ${['100 Rizal St', '101 Quezon Ave', '102 Magsaysay Blvd', '103 Pioneer Ave', '104 Dacera St'][i % 5]} is ${i % 2 === 0 ? 'non-haunted and flood-safe' : 'pet-friendly with low flood risk'}. Can I schedule a viewing?`,
  timestamp: new Date(Date.now() - (50 - i) * 60000).toISOString(),
  isClient: i % 2 === 0,
}));

const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // OpenAI API config
  const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY || '';
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

    if (!OPENAI_API_KEY) {
      console.error('OpenAI API key is missing. Please set VITE_OPENAI_API_KEY in your environment variables.');
      setMessages(prev => [
        ...prev,
        {
          id: `msg${messages.length + 2}`,
          from: 'Agent (A.I state)',
          content: 'Sorry, the API key is not configured. Please contact support.',
          timestamp: new Date().toISOString(),
          isClient: false,
        },
      ]);
      return;
    }

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
        from: 'Agent (aTuna Assistant)',
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
          from: 'Agent (A.I State)',
          content: 'Under Maintenance, please comeback later!',
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
    <Card className="w-full max-w-3xl mx-auto h-[700px] flex flex-col shadow-lg rounded-2xl bg-white">
      <CardHeader className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-t-2xl">
        <h2 className="text-lg font-bold text-white">aTuna Real Estate Chat</h2>
        <p className="text-sm text-blue-100">Mabuhay! Ask about properties in GenSan</p>
      </CardHeader>
      <Divider />
      <CardBody className="flex-1 overflow-hidden p-0">
        <div 
          ref={scrollAreaRef} 
          className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50"
          style={{ scrollBehavior: 'smooth' }}
        >
          {messages.map(message => (
            <div
              key={message.id}
              className={`flex ${message.isClient ? 'justify-end' : 'justify-start'} transition-all duration-300 ease-in-out`}
            >
              <div className={`max-w-[70%] ${message.isClient ? 'text-right' : 'text-left'}`}>
                <Card 
                  className={`p-4 shadow-sm rounded-lg ${
                    message.isClient 
                      ? 'bg-blue-100 text-blue-900 border border-blue-200' 
                      : 'bg-white text-gray-900 border border-gray-200'
                  }`}
                >
                  <div className="flex gap-3 items-start">
                    <Avatar
                      src={message.isClient ? '/client.png' : '/agent.png'}
                      alt={message.from}
                      size="sm"
                      className="flex-shrink-0"
                    />
                    <div>
                      <p className="text-sm font-semibold text-gray-700">{message.from}</p>
                      <p className="text-sm mt-1">{message.content}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          ))}
        </div>
        <div className="relative p-4 border-t border-gray-200 bg-white">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="sm"
              className="text-gray-600 hover:text-blue-600 transition-colors"
              onClick={() => setIsEmojiPickerOpen(!isEmojiPickerOpen)}
            >
              <IconMoodSmile className="h-5 w-5" />
            </Button>
            {isEmojiPickerOpen && (
              <div className="absolute bottom-16 left-4 z-50 shadow-xl rounded-lg">
                <EmojiPicker 
                  onEmojiClick={handleEmojiSelect}
                  className="border border-gray-200 rounded-lg"
                />
              </div>
            )}
            <Input
              value={newMessage}
              onChange={e => setNewMessage(e.target.value)}
              placeholder="Ask about a property..."
              className="flex-1 rounded-full border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              onKeyPress={e => {
                if (e.key === 'Enter') sendMessage();
              }}
            />
            <Button 
              onClick={sendMessage} 
              disabled={!newMessage.trim()}
              className={`rounded-full ${
                newMessage.trim() 
                  ? 'bg-blue-600 text-white hover:bg-blue-700' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              } transition-colors`}
            >
              <IconSend className="h-5 w-5 mr-2" />
              Send
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default ChatPage;