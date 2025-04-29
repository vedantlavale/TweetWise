import { FC } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AppRoute } from './Routes';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  route: AppRoute;
  onNavigate: (route: AppRoute) => void;
  className?: string;
}

export const FeatureCard: FC<FeatureCardProps> = ({
  title,
  description,
  icon,
  route,
  onNavigate,
  className,
}) => {
  return (
    <Card className={cn(
      "transition-all duration-300 hover:shadow-md border-2 border-muted hover:border-primary/20",
      className
    )}>
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-full bg-primary/10 text-primary">{icon}</div>
          <CardTitle>{title}</CardTitle>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="min-h-24">
          {/* Feature-specific content could go here */}
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full group" 
          onClick={() => onNavigate(route)}
        >
          Try {title}
          <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
        </Button>
      </CardFooter>
    </Card>
  );
};