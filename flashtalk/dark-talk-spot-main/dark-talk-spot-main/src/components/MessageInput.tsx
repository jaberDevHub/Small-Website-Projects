import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send, Smile, X } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Message } from '@/types/chat';

interface MessageInputProps {
  onSendMessage: (content: string) => void;
  replyTo?: Message | null;
  onCancelReply: () => void;
}

const emojis = ['😀', '😂', '😍', '🥳', '😎', '🤔', '👍', '❤️', '🎉', '🔥', '💯', '✨'];

export function MessageInput({ onSendMessage, replyTo, onCancelReply }: MessageInputProps) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const addEmoji = (emoji: string) => {
    setMessage((prev) => prev + emoji);
  };

  return (
    <div className="border-t border-border bg-card/50 backdrop-blur-sm p-4">
      {replyTo && (
        <div className="mb-2 flex items-center gap-2 text-sm bg-muted/50 p-2 rounded-lg">
          <div className="flex-1">
            <span className="font-semibold text-foreground">Replying to {replyTo.username}</span>
            <p className="text-muted-foreground truncate">{replyTo.content}</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onCancelReply}
            className="h-6 w-6 p-0"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      )}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="shrink-0 hover:bg-muted"
            >
              <Smile className="w-5 h-5" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64 p-2 bg-card border-border">
            <div className="grid grid-cols-6 gap-2">
              {emojis.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  className="text-2xl hover:bg-muted rounded p-1 transition-colors"
                  onClick={() => addEmoji(emoji)}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </PopoverContent>
        </Popover>
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 bg-input border-border text-foreground"
          maxLength={500}
        />
        <Button
          type="submit"
          size="icon"
          disabled={!message.trim()}
          className="shrink-0 bg-gradient-primary hover:opacity-90 transition-opacity"
        >
          <Send className="w-5 h-5" />
        </Button>
      </form>
    </div>
  );
}
