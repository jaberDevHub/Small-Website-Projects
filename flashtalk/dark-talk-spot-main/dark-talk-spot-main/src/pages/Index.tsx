import ChatRoom from '@/components/ChatRoom';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold">Live Chat</h1>
          </div>
        </div>
      </header>
      <main className="container py-8">
        <ChatRoom />
      </main>
    </div>
  );
};

export default Index;
