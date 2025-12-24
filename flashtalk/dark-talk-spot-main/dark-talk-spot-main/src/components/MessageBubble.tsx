import { Message } from '@/types/chat';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Reply } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MessageBubbleProps {
  message: Message;
  isOwn: boolean;
  onReply: (message: Message) => void;
}

export function MessageBubble({ message, isOwn, onReply }: MessageBubbleProps) {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getAvatarColor = (username: string) => {
    const colors = [
      'bg-purple-500',
      'bg-blue-500',
      'bg-green-500',
      'bg-yellow-500',
      'bg-red-500',
      'bg-pink-500',
    ];
    const index = username.charCodeAt(0) % colors.length;
    return colors[index];
  };

  return (
    <div className="flex items-start gap-3 px-3 py-1 group hover:bg-muted/10 transition-colors">
      <Avatar className={`w-8 h-8 shrink-0 mt-0.5 ${getAvatarColor(message.username)}`}>
        <AvatarFallback className="text-white font-semibold text-xs">
          {getInitials(message.username)}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <div className="flex items-start gap-2">
          <div className="flex-1">
            <span className="font-semibold text-muted-foreground mr-2 text-sm">
              {message.username}
            </span>
            {message.replyTo && (
              <span className="text-xs text-muted-foreground/70 mr-2">
                @{message.replyTo.username}
              </span>
            )}
            <span className="text-foreground text-sm break-words">
              {message.content}
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="opacity-0 group-hover:opacity-100 transition-opacity h-6 px-2 shrink-0"
            onClick={() => onReply(message)}
          >
            <Reply className="w-3 h-3" />
          </Button>
        </div>
      </div>
    </div>
  );
}
