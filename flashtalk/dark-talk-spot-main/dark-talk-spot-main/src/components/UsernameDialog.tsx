import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface UsernameDialogProps {
  open: boolean;
  onSubmit: (username: string) => void;
}

export function UsernameDialog({ open, onSubmit }: UsernameDialogProps) {
  const [username, setUsername] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim().length >= 3) {
      onSubmit(username.trim());
    }
  };

  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Welcome to ChatBox
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Choose a username to start chatting with others
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <Input
            placeholder="Enter your username..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="bg-input border-border text-foreground"
            maxLength={20}
            autoFocus
          />
          <Button
            type="submit"
            className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
            disabled={username.trim().length < 3}
          >
            Start Chatting
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
