import { Trophy, RotateCcw, Share2, Star, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ConfettiEffect } from './ConfettiEffect';

interface ResultsScreenProps {
  score: number;
  totalQuestions: number;
  reward: string | null;
  onRestart: () => void;
  onSaveScore: () => void;
}

export const ResultsScreen = ({ score, totalQuestions, reward, onRestart, onSaveScore }: ResultsScreenProps) => {
  const percentage = Math.round((score / totalQuestions) * 100);
  
  const getScoreMessage = () => {
    if (percentage === 100) return "Perfect! You're a Quiz Master! 🎯";
    if (percentage >= 67) return "Excellent work! 🌟";
    if (percentage >= 33) return "Good job! Keep practicing! 👍";
    return "Better luck next time! 💪";
  };

  const getScoreColor = () => {
    if (percentage === 100) return "text-accent";
    if (percentage >= 67) return "text-success";
    if (percentage >= 33) return "text-warning";
    return "text-muted-foreground";
  };

  const handleSaveAndShare = () => {
    onSaveScore();
    
    if (navigator.share) {
      navigator.share({
        title: 'Quiz Master Results',
        text: `I scored ${score}/${totalQuestions} on Quiz Master! ${reward ? `And won: ${reward}` : ''}`,
        url: window.location.href
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 tablet-content">
      <div className="text-center space-y-8 max-w-3xl w-full fade-in-scale">
        <ConfettiEffect trigger={percentage >= 67} />
        
        {/* Header */}
        <div className="space-y-4">
          <h2 className="text-5xl md:text-7xl font-black kahoot-title bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            RESULTS!
          </h2>
          <p className="text-2xl font-bold text-foreground">
            Let's see how you did! 📊
          </p>
        </div>

        {/* Score Display */}
        <div className="game-card p-8 space-y-6">
          <div className="flex items-center justify-center">
            <div className="relative">
              {/* Circular Progress */}
              <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="hsl(var(--muted))"
                  strokeWidth="8"
                  fill="none"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="hsl(var(--accent))"
                  strokeWidth="8"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 40}`}
                  strokeDashoffset={`${2 * Math.PI * 40 * (1 - percentage / 100)}`}
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              
              {/* Score Text */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent">
                    {score}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    of {totalQuestions}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className={`text-2xl font-bold ${getScoreColor()}`}>
              {percentage}% Correct
            </div>
            <p className="text-lg text-muted-foreground">
              {getScoreMessage()}
            </p>
          </div>

          {/* Star Rating */}
          <div className="flex justify-center gap-1">
            {[1, 2, 3].map((star) => (
              <Star
                key={star}
                className={`w-8 h-8 ${
                  star <= Math.ceil((score / totalQuestions) * 3)
                    ? 'text-accent fill-accent'
                    : 'text-muted'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Reward Display */}
        {reward && (
          <div className="bg-gradient-to-r from-accent to-primary p-8 rounded-3xl celebration text-white border-4 border-white/20">
            <div className="text-center space-y-4">
              <Gift className="w-16 h-16 mx-auto" />
              <h3 className="text-3xl font-black">BONUS PRIZE!</h3>
              <p className="text-2xl font-bold">{reward}</p>
              <div className="flex items-center justify-center gap-3 text-xl font-bold">
                <span>🎊</span>
                <span>AMAZING!</span>
                <span>🎊</span>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Button 
              onClick={onRestart}
              size="lg"
              className="game-button text-2xl font-black px-12 py-8 group shadow-2xl"
            >
              <RotateCcw className="w-8 h-8 mr-3 group-hover:rotate-180 transition-transform duration-300" />
              PLAY AGAIN!
            </Button>
            
            <Button 
              onClick={handleSaveAndShare}
              size="lg"
              className="bg-gradient-to-r from-kahoot-green to-kahoot-blue text-white font-black text-xl px-12 py-8 rounded-full border-4 border-white/20 hover:scale-105 transition-all duration-300 group shadow-2xl"
            >
              <Share2 className="w-8 h-8 mr-3 group-hover:scale-110 transition-transform" />
              SHARE SCORE!
            </Button>
          </div>

          <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Trophy className="w-4 h-4" />
              <span>Score saved locally</span>
            </div>
            {score === totalQuestions && (
              <div className="flex items-center gap-1 text-accent">
                <Star className="w-4 h-4" />
                <span>Perfect score!</span>
              </div>
            )}
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="flex justify-center gap-4 text-3xl">
          <span className="animate-pulse">🎯</span>
          <span className="animate-pulse" style={{ animationDelay: '0.5s' }}>🏆</span>
          <span className="animate-pulse" style={{ animationDelay: '1s' }}>⭐</span>
        </div>
      </div>
    </div>
  );
};