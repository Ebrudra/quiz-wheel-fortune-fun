import { Trophy, RotateCcw, Share2, Star, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
      <div className="text-center space-y-8 max-w-2xl w-full fade-in-scale">
        {/* Header */}
        <div className="space-y-4">
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Quiz Complete!
          </h2>
          <p className="text-xl text-muted-foreground">
            Here are your results
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
          <div className="game-card p-6 border-accent celebration">
            <div className="text-center space-y-4">
              <Gift className="w-12 h-12 mx-auto text-accent" />
              <h3 className="text-2xl font-bold text-accent">Prize Won!</h3>
              <p className="text-xl">{reward}</p>
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <span>🎉 Congratulations! 🎉</span>
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
              className="game-button px-8 py-6 group"
            >
              <RotateCcw className="w-6 h-6 mr-2 group-hover:rotate-180 transition-transform duration-300" />
              Play Again
            </Button>
            
            <Button 
              onClick={handleSaveAndShare}
              size="lg"
              variant="outline"
              className="border-accent text-accent hover:bg-accent hover:text-accent-foreground px-8 py-6 group"
            >
              <Share2 className="w-6 h-6 mr-2 group-hover:scale-110 transition-transform" />
              Save & Share
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