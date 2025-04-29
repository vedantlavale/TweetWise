import { MessageSquare, Zap } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { FeatureCard } from '@/components/FeatureCard';
import { AppRoute } from '@/components/Routes';

interface LandingPageProps {
  onNavigate: (route: AppRoute) => void;
}

export function LandingPage({ onNavigate }: LandingPageProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header onNavigate={onNavigate} />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted/30">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center gap-4 text-center">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter">
                Enhance Your <span className="text-primary">Social Media</span> Content
              </h1>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Elevate your tweets and create compelling debate content with our AI-powered tools.
              </p>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 md:py-24 container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <FeatureCard
              title="Tweet Enhancer"
              description="Transform your tweets with AI to make them more engaging, persuasive, or emotional."
              icon={<Zap className="h-5 w-5" />}
              route="tweet-enhancer"
              onNavigate={onNavigate}
              className="animate-fade-up"
              />
            <FeatureCard
              title="Debate Generator"
              description="Create compelling arguments for any topic to strengthen your debating skills."
              icon={<MessageSquare className="h-5 w-5" />}
              route="debate-generator"
              onNavigate={onNavigate}
              className="animate-fade-up delay-100"
            />
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-12 md:py-24 bg-muted/30">
          <div className="container px-4 md:px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                  <span className="text-lg font-semibold">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Choose Tool</h3>
                <p className="text-muted-foreground">Select either Tweet Enhancer or Debate Generator based on your needs.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                  <span className="text-lg font-semibold">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Input Content</h3>
                <p className="text-muted-foreground">Enter your tweet or debate topic along with any customization options.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                  <span className="text-lg font-semibold">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Generate Result</h3>
                <p className="text-muted-foreground">Get AI-powered suggestions that you can use or further customize.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}