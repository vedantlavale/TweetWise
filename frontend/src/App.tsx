import { ThemeProvider } from '@/components/theme-provider';
import { Routes } from '@/components/Routes';
import { Toaster } from '@/components/ui/toaster';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    console.log('App mounted');
  }, []);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="ui-theme">
      <div className="min-h-screen bg-background">
        <Routes />
        <Toaster />
      </div>
    </ThemeProvider>
  );
}

export default App;