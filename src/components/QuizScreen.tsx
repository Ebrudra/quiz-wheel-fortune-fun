import { useState, useEffect } from 'react';
import { Check, X, Clock, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Question } from '@/hooks/useGameState';
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {question.options.map((option, index) => (
                <Button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  disabled={selectedAnswer !== null}
                  className={`${getOptionStyle(index)} p-6 h-auto text-left justify-start text-wrap`}
                  variant="ghost"
                >
                  <div className="flex items-center gap-3 w-full">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span className="text-lg font-medium flex-1">{option}</span>
                    {showResult && index === question.correctAnswer && (
                      <Check className="w-6 h-6 text-success flex-shrink-0" />
                    )}
                    {showResult && selectedAnswer === index && index !== question.correctAnswer && (
                      <X className="w-6 h-6 text-destructive flex-shrink-0" />
                    )}
                  </div>
                </Button>
              ))}
            </div>

            {showResult && (
              <div className="game-card p-4 celebration">
                {selectedAnswer === question.correctAnswer ? (
                  <div className="text-center text-success">
                    <Check className="w-8 h-8 mx-auto mb-2" />
                    <p className="font-semibold">Correct! Well done!</p>
                  </div>
                ) : selectedAnswer === -1 ? (
                  <div className="text-center text-warning">
                    <Clock className="w-8 h-8 mx-auto mb-2" />
                    <p className="font-semibold">Time's up!</p>
                  </div>
                ) : (
                  <div className="text-center text-destructive">
                    <X className="w-8 h-8 mx-auto mb-2" />
                    <p className="font-semibold">Not quite right!</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};