import { useState, useEffect, useRef } from 'react';
import { io, type Socket } from 'socket.io-client';
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";

type Message = {
  id: string;
  username: string;
  text: string;
  timestamp: Date | string;
};

export default function ChatRoom() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState('');
  const [username, setUsername] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef<Socket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isUsernameSet, setIsUsernameSet] = useState(false);

  useEffect(() => {
    // Initialize socket connection with proper typing
    const socketUrl = 'http://localhost:3002';
    console.log('🔌 Connecting to WebSocket server at:', socketUrl);
    
    // Create a new socket connection
    const socket: Socket = io(socketUrl, {
      path: '/socket.io/',
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      timeout: 10000,
      transports: ['websocket', 'polling'],
      withCredentials: true
    });
    
    // Store the socket in the ref
    socketRef.current = socket;

    // Add connection error handling
    socketRef.current.on('connect_error', (error) => {
      console.error('WebSocket connection error:', error);
    });

    socketRef.current.on('connect_timeout', () => {
      console.error('WebSocket connection timeout');
    });
    
    // Set up event listeners with proper typing
    socketRef.current.on('connect', () => {
      console.log('Connected to server');
      setIsConnected(true);
    });

    socketRef.current.on('disconnect', () => {
      console.log('Disconnected from server');
      setIsConnected(false);
    });

    socketRef.current.on('connect_error', (error) => {
      console.error('Connection error:', error);
    });

    socketRef.current.on('initial_messages', (initialMessages: Message[]) => {
      // Ensure timestamps are Date objects
      const formattedMessages = initialMessages.map(msg => ({
        ...msg,
        timestamp: typeof msg.timestamp === 'string' ? new Date(msg.timestamp) : msg.timestamp
      }));
      setMessages(formattedMessages);
    });

    socketRef.current.on('new_message', (newMessage: Message) => {
      // Ensure timestamp is a Date object
      const formattedMessage = {
        ...newMessage,
        timestamp: typeof newMessage.timestamp === 'string' 
          ? new Date(newMessage.timestamp) 
          : newMessage.timestamp
      };
      setMessages(prev => [...prev, formattedMessage]);
    });

    // Clean up on unmount
    return () => {
      if (socketRef.current) {
        socketRef.current.off('connect');
        socketRef.current.off('disconnect');
        socketRef.current.off('connect_error');
        socketRef.current.off('initial_messages');
        socketRef.current.off('new_message');
        socketRef.current.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) return;
    
    // If username is not set, set it first
    if (!isUsernameSet && username.trim()) {
      setIsUsernameSet(true);
      if (socketRef.current) {
        socketRef.current.emit('new_user', username.trim());
      }
      setMessage('');
      return;
    }
    
    if (!username.trim() || !socketRef.current) return;
    
    const newMessage: Message = {
      id: Date.now().toString(),
      username: username.trim(),
      text: message.trim(),
      timestamp: new Date(),
    };

    socketRef.current.emit('send_message', newMessage);
    setMessage('');
  };

  const formatTime = (date: Date | string) => {
    const d = date instanceof Date ? date : new Date(date);
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!isConnected) {
    return (
      <div className="flex items-center justify-center h-[80vh] max-w-4xl mx-auto bg-card rounded-lg shadow-lg">
        <div className="text-center p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-lg font-medium">Connecting to chat server...</p>
          <p className="text-sm text-muted-foreground mt-2">Please ensure the server is running</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[80vh] max-w-4xl mx-auto bg-card rounded-lg shadow-lg overflow-hidden">
      <div className="bg-primary text-primary-foreground p-4 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold">Live Chat</h1>
          <div className="flex items-center text-sm opacity-80">
            <span className={`inline-block w-2 h-2 rounded-full mr-2 ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></span>
            {isConnected ? 'Connected' : 'Disconnected'}
          </div>
        </div>
        {isUsernameSet && (
          <div className="text-sm bg-primary-foreground/10 px-3 py-1 rounded-full">
            👤 {username}
          </div>
        )}
      </div>
      
      <ScrollArea className="flex-1 p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center text-muted-foreground">
            <p>No messages yet. Be the first to say hello! 👋</p>
          </div>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className="mb-4 group">
              <div className="flex items-baseline gap-2">
                <span className="font-bold text-sm">{msg.username}</span>
                <span className="text-xs text-muted-foreground">
                  {formatTime(msg.timestamp)}
                </span>
              </div>
              <p className="mt-1 text-sm">{msg.text}</p>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </ScrollArea>

      <form onSubmit={handleSubmit} className="p-4 border-t bg-muted/20">
        {!isUsernameSet ? (
          <div className="space-y-2">
            <p className="text-sm font-medium">Choose a username to start chatting</p>
            <div className="flex gap-2">
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                className="flex-1"
                maxLength={20}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && username.trim()) {
                    e.preventDefault();
                    setIsUsernameSet(true);
                    if (socketRef.current) {
                      socketRef.current.emit('new_user', username.trim());
                    }
                  }
                }}
              />
              <Button 
                type="button" 
                onClick={() => {
                  if (username.trim()) {
                    setIsUsernameSet(true);
                    if (socketRef.current) {
                      socketRef.current.emit('new_user', username.trim());
                    }
                  }
                }}
                disabled={!username.trim()}
              >
                Join
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex gap-2">
            <Input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  if (message.trim()) {
                    handleSubmit(e);
                  }
                }
              }}
            />
            <Button 
              type="submit" 
              disabled={!message.trim()}
            >
              Send
            </Button>
          </div>
        )}
      </form>
    </div>
  );
}
