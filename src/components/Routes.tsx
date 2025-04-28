import { useState } from 'react';
import { LandingPage } from '@/pages/LandingPage';
import { TweetEnhancer } from '@/pages/TweetEnhancer';
import { DebateGenerator } from '@/pages/DebateGenerator';

export type AppRoute = 'landing' | 'tweet-enhancer' | 'debate-generator';

export function Routes() {
  const [currentRoute, setCurrentRoute] = useState<AppRoute>('landing');

  // Navigation handler
  const navigateTo = (route: AppRoute) => {
    setCurrentRoute(route);
    window.scrollTo(0, 0);
  };

  // Render the appropriate component based on the current route
  return (
    <>
      {currentRoute === 'landing' && (
        <LandingPage onNavigate={navigateTo} />
      )}
      {currentRoute === 'tweet-enhancer' && (
        <TweetEnhancer onNavigate={navigateTo} />
      )}
      {currentRoute === 'debate-generator' && (
        <DebateGenerator onNavigate={navigateTo} />
      )}
    </>
  );
}