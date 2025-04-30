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

type TweetStyle = 'professional' | 'casual' | 'funny' | 'inspirational' | 'provocative';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface TweetEnhancerProps {
  onNavigate: (route: AppRoute) => void;
}

export function TweetEnhancer({ onNavigate }: TweetEnhancerProps) {
  const { toast } = useToast();
  const [input, setInput] = useState('');
  const [selectedStyle, setSelectedStyle] = useState<TweetStyle>('professional');
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hi! I can help enhance your tweets. Send me a tweet and choose a style like professional, casual, or funny!'
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
      const { enhancedText, error } = await enhanceTweet(userMessage, selectedStyle);
      
      if (error) throw new Error(error);
      
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: enhancedText 
      }]);
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to enhance tweet",
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
            Transform your tweets with AI magic
          </p>
        </div>

        <div className="flex-1 bg-muted/30">
          <div className="container h-full py-4">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-4 h-full max-w-6xl mx-auto">
              {/* Chat Area */}
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
                    <select
                      value={selectedStyle}
                      onChange={(e) => setSelectedStyle(e.target.value as TweetStyle)}
                      className="bg-background border rounded-md px-3 py-2 text-sm"
                    >
                      <option value="professional">Professional</option>
                      <option value="casual">Casual</option>
                      <option value="funny">Funny</option>
                      <option value="inspirational">Inspirational</option>
                      <option value="provocative">Provocative</option>
                    </select>
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Type your tweet here..."
                      className="flex-1 bg-background rounded-md border border-input px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    />
                    <Button type="submit" disabled={isLoading || !input.trim()}>
                      <Send className="h-4 w-4" />
                      <span className="sr-only">Send</span>
                    </Button>
                  </form>
                </div>
              </Card>

              {/* Sidebar */}
              <div className="hidden md:flex flex-col gap-4">
                <Card className="p-4">
                  <h3 className="font-semibold flex items-center gap-2 mb-3">
                    <Sparkles className="h-4 w-4" />
                    Style Guide
                  </h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li><span className="font-medium">Professional:</span> Business-appropriate</li>
                    <li><span className="font-medium">Casual:</span> Friendly tone</li>
                    <li><span className="font-medium">Funny:</span> Adds humor</li>
                    <li><span className="font-medium">Inspirational:</span> Motivational</li>
                    <li><span className="font-medium">Provocative:</span> Thought-provoking</li>
                  </ul>
                </Card>

                <Card className="p-4">
                  <h3 className="font-semibold flex items-center gap-2 mb-3">
                    <History className="h-4 w-4" />
                    Best Practices
                  </h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Keep tweets under 280 characters</li>
                    <li>• Use 1-2 relevant hashtags</li>
                    <li>• Include emojis for casual styles</li>
                    <li>• Ask questions to engage readers</li>
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
