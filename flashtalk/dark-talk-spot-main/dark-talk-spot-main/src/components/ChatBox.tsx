import { useEffect, useRef, useState } from 'react';
import { Message } from '@/types/chat';
import { MessageBubble } from './MessageBubble';
import { MessageInput } from './MessageInput';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Users } from 'lucide-react';

interface ChatBoxProps {
  messages: Message[];
  currentUsername: string;
  onSendMessage: (content: string, replyTo?: Message) => void;
}

export function ChatBox({ messages, currentUsername, onSendMessage }: ChatBoxProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [replyTo, setReplyTo] = useState<Message | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = (content: string) => {
    onSendMessage(content, replyTo || undefined);
    setReplyTo(null);
  };

  const uniqueUsers = new Set(messages.map((m) => m.username)).size;

  return (
    <div className="flex flex-col h-[600px] w-full max-w-3xl mx-auto bg-card/80 backdrop-blur-xl border border-border rounded-2xl shadow-card overflow-hidden">
      <div className="bg-gradient-primary p-4 flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">ChatBox</h2>
        <div className="flex items-center gap-2 text-white/90">
          <Users className="w-4 h-4" />
          <span className="text-sm">{uniqueUsers} online</span>
        </div>
      </div>

      <ScrollArea className="flex-1 py-2" ref={scrollRef}>
        <div className="space-y-0.5">
          {messages.length === 0 ? (
            <div className="text-center text-muted-foreground py-12">
              <p className="text-lg">No messages yet</p>
              <p className="text-sm">Be the first to start the conversation!</p>
            </div>
          ) : (
            messages.map((message) => (
              <MessageBubble
                key={message.id}
                message={message}
                isOwn={message.username === currentUsername}
                onReply={setReplyTo}
              />
            ))
          )}
        </div>
      </ScrollArea>

      <MessageInput
        onSendMessage={handleSendMessage}
        replyTo={replyTo}
        onCancelReply={() => setReplyTo(null)}
      />
    </div>
  );
}
