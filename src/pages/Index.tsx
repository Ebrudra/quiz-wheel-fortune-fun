import { useGameState } from '@/hooks/useGameState';
import { IntroScreen } from '@/components/IntroScreen';
import { QuizScreen } from '@/components/QuizScreen';
import { FortuneWheel } from '@/components/FortuneWheel';
import { ResultsScreen } from '@/components/ResultsScreen';
import { useToast } from '@/hooks/use-toast';
import { useEffect } from 'react';

const Index = () => {
  const {
    gameState,
    questions,
    startGame,
    answerQuestion,
    spinWheel,
    resetGame,
    saveScore,
    getHighScore
  } = useGameState();
  
  const { toast } = useToast();

  useEffect(() => {
    // Show welcome toast on first load
    if (gameState.currentScreen === 'intro') {
      toast({
        title: "Welcome to Quiz Master! 🎮",
        description: "Test your knowledge and win amazing prizes!",
      });
    }
  }, []);

  const handleSaveScore = () => {
    saveScore();
    toast({
      title: "Score Saved! 🏆",
      description: `Your score of ${gameState.score}/${questions.length} has been saved.`,
    });
  };

  const renderCurrentScreen = () => {
    switch (gameState.currentScreen) {
      case 'intro':
        return (
          <IntroScreen 
            onStart={startGame} 
            highScore={getHighScore()}
          />
        );
      
      case 'quiz':
        return (
          <QuizScreen
            question={questions[gameState.currentQuestion]}
            questionNumber={gameState.currentQuestion + 1}
            totalQuestions={questions.length}
            onAnswer={answerQuestion}
          />
        );
      
      case 'wheel':
        return (
          <FortuneWheel
            onSpin={spinWheel}
            hasSpun={gameState.hasSpunWheel}
            reward={gameState.reward}
          />
        );
      
      case 'results':
        return (
          <ResultsScreen
            score={gameState.score}
            totalQuestions={questions.length}
            reward={gameState.reward}
            onRestart={resetGame}
            onSaveScore={handleSaveScore}
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen">
      {renderCurrentScreen()}
    </div>
  );
};

export default Index;
