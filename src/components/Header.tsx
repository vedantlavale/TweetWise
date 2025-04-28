import { Moon, Sun, Home, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/components/theme-provider';
import { AppRoute } from '@/components/Routes';
import { AuthDialog } from '@/components/auth/AuthDialog';
import { useAuth } from '@/lib/auth';
import { useToast } from '@/hooks/use-toast';

interface HeaderProps {
  onNavigate: (route: AppRoute) => void;
  title?: string;
}

export function Header({ onNavigate, title }: HeaderProps) {
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();
  const { user, setUser } = useAuth();

  const handleSignOut = () => {
    setUser(null);
    toast({
      title: 'Success',
      description: 'Successfully signed out!',
    });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => onNavigate('landing')}
            aria-label="Home"
          >
            <Home className="h-5 w-5" />
          </Button>
          {title && <h1 className="text-lg font-semibold">{title}</h1>}
        </div>
        
        <div className="flex items-center gap-2">
          {user ? (
            <>
              <span className="text-sm text-muted-foreground">{user.email}</span>
              <Button variant="ghost" size="icon" onClick={handleSignOut}>
                <LogOut className="h-5 w-5" />
              </Button>
            </>
          ) : (
            <>
              <AuthDialog mode="sign-in" />
              <AuthDialog mode="sign-up" />
            </>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            aria-label="Toggle theme"
          >
            {theme === 'light' ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}