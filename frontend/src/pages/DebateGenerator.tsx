import { useState } from 'react';
import { Send, Scale, History } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AppRoute } from '@/components/Routes';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';
import { generateDebate, getUserDebates } from '../services/apiService';
import { useAuth } from '@/lib/auth';

type DebateFormat = 'formal' | 'academic' | 'casual' | 'humorous';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface DebateGeneratorProps {
  onNavigate: (route: AppRoute) => void;
}

export function DebateGenerator({ onNavigate }: DebateGeneratorProps) {
  const { toast } = useToast();
  const { user } = useAuth();
  const [input, setInput] = useState('');
  const [selectedFormat, setSelectedFormat] = useState<DebateFormat>('formal');
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hello! I can help you generate balanced arguments for any debate topic. Just send me a topic you\'d like to explore, and I\'ll provide argument supporting your point.'
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to save your debate history",
        variant: "destructive",
      });
      return;
    }
    
    const userMessage = input.trim();
    setInput('');
    
    // Add user message to chat
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    
    setIsLoading(true);
    
    try {
      const result = await generateDebate(userMessage, selectedFormat);
      
      setMessages(prev => [
        ...prev,
        { 
          role: 'assistant', 
          content: `\n${result.pro}\n\n`
        }
      ]);
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to generate debate",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header onNavigate={onNavigate} title="Debate Generator" />
      <main className="flex-1 flex flex-col">
        <div className="container py-4">
          <h1 className="text-3xl font-bold text-center">Debate Generator</h1>
          <p className="text-muted-foreground text-center mt-2">
            Explore different perspectives on any debate topic
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
                          } whitespace-pre-line`}
                        >
                          {message.content.split('\n').map((line, i) => (
                            <p key={i}>{line}</p>
                          ))}
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
                      value={selectedFormat}
                      onChange={(e) => setSelectedFormat(e.target.value as DebateFormat)}
                      className="bg-background border rounded-md px-3 py-2 text-sm"
                      disabled={isLoading}
                    >
                      <option value="formal">Formal</option>
                      <option value="academic">Academic</option>
                      <option value="casual">Casual</option>
                      <option value="humorous">Humorous</option>
                    </select>
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Type your debate topic here..."
                      className="flex-1 bg-background rounded-md border border-input px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      disabled={isLoading}
                    />
                    <Button 
                      type="submit" 
                      disabled={isLoading || !input.trim()}
                    >
                      <Send className="h-4 w-4" />
                      <span className="sr-only">Send message</span>
                    </Button>
                  </form>
                </div>
              </Card>

              <div className="hidden md:flex flex-col gap-4">
                <Card className="p-4">
                  <h3 className="font-semibold flex items-center gap-2 mb-3">
                    <Scale className="h-4 w-4" />
                    Debate Formats
                  </h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li><span className="font-medium">Formal:</span> Structured arguments</li>
                    <li><span className="font-medium">Academic:</span> Research-based</li>
                    <li><span className="font-medium">Casual:</span> Conversational</li>
                    <li><span className="font-medium">Humorous:</span> Light-hearted</li>
                  </ul>
                </Card>

                <Card className="p-4">
                  <h3 className="font-semibold flex items-center gap-2 mb-3">
                    <History className="h-4 w-4" />
                    Tips
                  </h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Be specific with topics</li>
                    <li>• Consider both sides</li>
                    <li>• Focus on key points</li>
                    <li>• Stay objective</li>
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
