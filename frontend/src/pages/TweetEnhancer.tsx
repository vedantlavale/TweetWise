import { useState } from 'react';
import { Send, Sparkles, History } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AppRoute } from '@/components/Routes';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';
import { enhanceTweet } from '@/services/apiService';

interface TweetEnhancerProps {
  onNavigate: (route: AppRoute) => void;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export function TweetEnhancer({ onNavigate }: TweetEnhancerProps) {
  const { toast } = useToast();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hi! I can help you enhance your tweets. Just send me a tweet and I\'ll help make it more engaging. You can also specify a style like "professional", "casual", "funny", "inspirational", or "provocative".'
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    const userMessage = input.trim();
    setInput('');
    
    // Add user message to chat
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    
    setIsLoading(true);
    
    try {
      // For now, using a mock service
      const result = await enhanceTweet(userMessage, 'professional');
      setMessages(prev => [...prev, { role: 'assistant', content: result }]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to enhance tweet. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header onNavigate={onNavigate} title="Tweet Enhancer" />
      <main className="flex-1 flex flex-col">
        <div className="container py-4">
          <h1 className="text-3xl font-bold text-center">Tweet Enhancer</h1>
          <p className="text-muted-foreground text-center mt-2">
            Chat with our AI to enhance your tweets and make them more engaging.
          </p>
        </div>

        <div className="flex-1 bg-muted/30">
          <div className="container h-full py-4">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-4 h-full max-w-6xl mx-auto">
              <Card className="h-[calc(100vh-16rem)] flex flex-col">
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {messages.map((message, index) => (
                      <div
                        key={index}
                        className={`flex ${
                          message.role === 'assistant' ? 'justify-start' : 'justify-end'
                        }`}
                      >
                        <div
                          className={`rounded-lg px-4 py-2 max-w-[80%] ${
                            message.role === 'assistant'
                              ? 'bg-card border shadow-sm text-card-foreground'
                              : 'bg-primary text-primary-foreground'
                          }`}
                        >
                          {message.content}
                        </div>
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="bg-card border shadow-sm rounded-lg px-4 py-2">
                          <div className="flex space-x-2">
                            <div className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" />
                            <div className="w-2 h-2 bg-primary/50 rounded-full animate-bounce [animation-delay:0.2s]" />
                            <div className="w-2 h-2 bg-primary/50 rounded-full animate-bounce [animation-delay:0.4s]" />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollArea>

                <div className="p-4 border-t bg-background">
                  <form onSubmit={handleSubmit} className="flex gap-2">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Type your tweet here..."
                      className="flex-1 bg-background rounded-md border border-input px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    />
                    <Button type="submit" disabled={isLoading || !input.trim()}>
                      <Send className="h-4 w-4" />
                      <span className="sr-only">Send message</span>
                    </Button>
                  </form>
                </div>
              </Card>

              <div className="hidden md:flex flex-col gap-4">
                <Card className="p-4">
                  <h3 className="font-semibold flex items-center gap-2 mb-3">
                    <Sparkles className="h-4 w-4" />
                    Available Styles
                  </h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Professional - For business tweets</li>
                    <li>• Casual - Friendly and relaxed</li>
                    <li>• Funny - Add humor and wit</li>
                    <li>• Inspirational - Motivate others</li>
                    <li>• Provocative - Start discussions</li>
                  </ul>
                </Card>

                <Card className="p-4">
                  <h3 className="font-semibold flex items-center gap-2 mb-3">
                    <History className="h-4 w-4" />
                    Tips
                  </h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Keep tweets concise</li>
                    <li>• Use relevant hashtags</li>
                    <li>• Include a call to action</li>
                    <li>• Engage with your audience</li>
                  </ul>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}