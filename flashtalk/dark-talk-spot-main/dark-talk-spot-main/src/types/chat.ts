export interface Message {
  id: string;
  username: string;
  content: string;
  timestamp: number;
  replyTo?: {
    id: string;
    username: string;
    content: string;
  };
}

export interface User {
  username: string;
  color: string;
}
