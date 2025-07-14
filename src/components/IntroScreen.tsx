import { Sparkles, Play, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface IntroScreenProps {
  onStart: () => void;
  highScore: number;
}

export const IntroScreen = ({ onStart, highScore }: IntroScreenProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 tablet-content">
      <div className="game-card text-center max-w-2xl w-full space-y-8 fade-in-scale">
        {/* Game Logo */}
        <div className="relative">
          <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent pulse-glow">
            Quiz
            <span className="inline-block ml-2">
              <Sparkles className="w-16 h-16 md:w-20 md:h-20 text-accent inline animate-spin" style={{ animationDuration: '3s' }} />
            </span>
            Master
          </h1>
          <div className="absolute -top-4 -right-4 w-8 h-8 bg-accent rounded-full animate-pulse" />
          <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
        </div>

        {/* Game Description */}
        <div className="space-y-4">
          <p className="text-xl md:text-2xl text-muted-foreground">
            Test your knowledge and spin the wheel of fortune!
          </p>
          <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full" />
              <span>3 Questions</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-accent rounded-full" />
              <span>Fortune Wheel</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-success rounded-full" />
              <span>Amazing Prizes</span>
            </div>
          </div>
        </div>

        {/* High Score Display */}
        {highScore > 0 && (
          <div className="game-card bg-accent/10 border-accent/20 p-4">
            <div className="flex items-center justify-center gap-2 text-accent">
              <Trophy className="w-5 h-5" />
              <span className="font-semibold">Best Score: {highScore}/3</span>
            </div>
          </div>
        )}

        {/* Start Button */}
        <div className="space-y-4">
          <Button 
            onClick={onStart}
            size="lg"
            className="game-button text-lg px-8 py-6 w-full md:w-auto group"
          >
            <Play className="w-6 h-6 mr-2 group-hover:scale-110 transition-transform" />
            Start Quiz
          </Button>
          <p className="text-xs text-muted-foreground">
            Optimized for tablet landscape mode
          </p>
        </div>

        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary rounded-full animate-ping" style={{ animationDelay: '1s' }} />
          <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-accent rounded-full animate-ping" style={{ animationDelay: '2s' }} />
          <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-success rounded-full animate-ping" style={{ animationDelay: '3s' }} />
        </div>
      </div>
    </div>
  );
};