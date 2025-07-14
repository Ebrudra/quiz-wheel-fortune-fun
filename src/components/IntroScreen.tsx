import { Sparkles, Play, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface IntroScreenProps {
  onStart: () => void;
  highScore: number;
}

export const IntroScreen = ({ onStart, highScore }: IntroScreenProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 tablet-content">
      <div className="game-card text-center max-w-3xl w-full space-y-8 fade-in-scale">
        {/* Game Logo */}
        <div className="relative">
          <h1 className="text-7xl md:text-9xl font-black kahoot-title bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            KAHOOT!
          </h1>
          <div className="text-2xl md:text-3xl font-bold text-foreground mt-2">
            Quiz Challenge
          </div>
          <div className="absolute -top-4 -right-4 text-4xl animate-bounce">🎉</div>
          <div className="absolute -bottom-2 -left-2 text-3xl animate-bounce" style={{ animationDelay: '0.5s' }}>⚡</div>
        </div>

        {/* Game Description */}
        <div className="space-y-6">
          <p className="text-2xl md:text-3xl font-bold text-foreground">
            Join the ultimate quiz experience! 🚀
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-kahoot-red text-kahoot-red-foreground">
              <div className="text-2xl">❓</div>
              <span className="font-bold text-sm">3 Questions</span>
            </div>
            <div className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-kahoot-blue text-kahoot-blue-foreground">
              <div className="text-2xl">🎯</div>
              <span className="font-bold text-sm">Fast Paced</span>
            </div>
            <div className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-kahoot-yellow text-kahoot-yellow-foreground">
              <div className="text-2xl">🎡</div>
              <span className="font-bold text-sm">Spin Wheel</span>
            </div>
            <div className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-kahoot-green text-kahoot-green-foreground">
              <div className="text-2xl">🏆</div>
              <span className="font-bold text-sm">Win Prizes</span>
            </div>
          </div>
        </div>

        {/* High Score Display */}
        {highScore > 0 && (
          <div className="bg-gradient-to-r from-accent to-primary p-4 rounded-3xl text-white bounce-in">
            <div className="flex items-center justify-center gap-3">
              <Trophy className="w-6 h-6" />
              <span className="font-black text-xl">BEST SCORE: {highScore}/3</span>
              <div className="text-2xl">🎖️</div>
            </div>
          </div>
        )}

        {/* Start Button */}
        <div className="space-y-6">
          <Button 
            onClick={onStart}
            size="lg"
            className="game-button text-2xl font-black px-12 py-8 w-full md:w-auto group shadow-2xl"
          >
            <Play className="w-8 h-8 mr-3 group-hover:scale-110 transition-transform" />
            START!
          </Button>
          <div className="flex items-center justify-center gap-2 text-sm font-bold text-muted-foreground">
            <span>🎮</span>
            <span>Best on tablet landscape</span>
            <span>🎮</span>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="flex justify-center gap-4 text-4xl">
          <span className="animate-bounce" style={{ animationDelay: '0s' }}>🎊</span>
          <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>🎯</span>
          <span className="animate-bounce" style={{ animationDelay: '0.4s' }}>🚀</span>
          <span className="animate-bounce" style={{ animationDelay: '0.6s' }}>⭐</span>
          <span className="animate-bounce" style={{ animationDelay: '0.8s' }}>🎊</span>
        </div>
      </div>
    </div>
  );
};