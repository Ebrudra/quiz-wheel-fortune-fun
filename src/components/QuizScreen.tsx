import { useState, useEffect } from 'react';
import { Check, X, Clock, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Question } from '@/hooks/useGameState';
import { ConfettiEffect } from './ConfettiEffect';
import question1 from '@/assets/question1.jpg';
import question2 from '@/assets/question2.jpg';
import question3 from '@/assets/question3.jpg';

interface QuizScreenProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (answerIndex: number) => void;
}

const questionImages = [question1, question2, question3];

export const QuizScreen = ({ question, questionNumber, totalQuestions, onAnswer }: QuizScreenProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    setSelectedAnswer(null);
    setShowResult(false);
    setTimeLeft(30);
  }, [question.id]);

  useEffect(() => {
    if (timeLeft > 0 && !showResult) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showResult) {
      handleAnswer(-1); // Time's up
    }
  }, [timeLeft, showResult]);

  const handleAnswer = (answerIndex: number) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    
    setTimeout(() => {
      onAnswer(answerIndex);
    }, 2000);
  };

  const getOptionStyle = (index: number) => {
    if (!showResult) {
      return selectedAnswer === index ? 'question-card selected' : 'question-card';
    }
    
    if (index === question.correctAnswer) {
      return 'question-card correct';
    }
    
    if (selectedAnswer === index && index !== question.correctAnswer) {
      return 'question-card incorrect';
    }
    
    return 'question-card opacity-50';
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 tablet-content">
      <div className="w-full max-w-4xl space-y-6 slide-up">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="game-card px-4 py-2">
              <span className="text-sm font-medium text-muted-foreground">Question</span>
              <div className="text-2xl font-bold text-accent">
                {questionNumber}/{totalQuestions}
              </div>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Award className="w-5 h-5" />
              <span>Test your knowledge!</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 game-card px-4 py-2">
            <Clock className="w-5 h-5 text-warning" />
            <span className={`font-bold ${timeLeft < 10 ? 'text-destructive' : 'text-warning'}`}>
              {timeLeft}s
            </span>
          </div>
        </div>

        {/* Question Content */}
        <div className="tablet-landscape gap-8">
          {/* Question Image */}
          <div className="space-y-4">
            <div className="game-card overflow-hidden aspect-square">
              <img 
                src={questionImages[question.id - 1]} 
                alt="Question visual"
                className="w-full h-full object-cover rounded-lg transition-transform duration-300 hover:scale-105"
              />
            </div>
          </div>

          {/* Question and Options */}
          <div className="space-y-6">
            <div className="game-card p-6">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 leading-tight">
                {question.question}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {question.options.map((option, index) => {
                const buttonClasses = [
                  'answer-button-a',
                  'answer-button-b', 
                  'answer-button-c',
                  'answer-button-d'
                ];
                const shapes = ['⬥', '◆', '●', '▲'];
                
                return (
                  <Button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    disabled={selectedAnswer !== null}
                    className={`${getOptionStyle(index)} ${buttonClasses[index]} p-6 h-auto text-left justify-start text-wrap min-h-[80px] rounded-3xl font-bold text-lg border-4 border-white/20`}
                    variant="ghost"
                  >
                    <div className="flex items-center gap-4 w-full">
                      <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center font-black text-2xl">
                        {shapes[index]}
                      </div>
                      <span className="flex-1 leading-tight">{option}</span>
                      {showResult && index === question.correctAnswer && (
                        <Check className="w-8 h-8 flex-shrink-0 animate-bounce" />
                      )}
                      {showResult && selectedAnswer === index && index !== question.correctAnswer && (
                        <X className="w-8 h-8 flex-shrink-0 animate-pulse" />
                      )}
                    </div>
                  </Button>
                );
              })}
            </div>

            {showResult && (
              <>
                <ConfettiEffect 
                  trigger={selectedAnswer === question.correctAnswer} 
                />
                <div className="bg-gradient-to-r from-primary to-accent p-6 rounded-3xl celebration text-white">
                  {selectedAnswer === question.correctAnswer ? (
                    <div className="text-center">
                      <div className="text-6xl mb-2">🎉</div>
                      <p className="font-black text-2xl">CORRECT!</p>
                      <p className="font-bold text-lg opacity-90">Amazing work!</p>
                    </div>
                  ) : selectedAnswer === -1 ? (
                    <div className="text-center">
                      <div className="text-6xl mb-2">⏰</div>
                      <p className="font-black text-2xl">TIME'S UP!</p>
                      <p className="font-bold text-lg opacity-90">Be faster next time!</p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <div className="text-6xl mb-2">😅</div>
                      <p className="font-black text-2xl">OOPS!</p>
                      <p className="font-bold text-lg opacity-90">Better luck next time!</p>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};