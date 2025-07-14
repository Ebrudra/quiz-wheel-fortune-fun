import { useState, useEffect } from 'react';

export interface Question {
  id: number;
  image: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface GameState {
  currentScreen: 'intro' | 'quiz' | 'wheel' | 'results';
  currentQuestion: number;
  score: number;
  answers: number[];
  hasSpunWheel: boolean;
  reward: string | null;
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    image: '/src/assets/question1.jpg',
    question: 'What is the primary function of the brain?',
    options: ['Pumping blood', 'Processing information', 'Digesting food', 'Breathing'],
    correctAnswer: 1
  },
  {
    id: 2,
    image: '/src/assets/question2.jpg',
    question: 'Which continent has the most countries?',
    options: ['Asia', 'Africa', 'Europe', 'South America'],
    correctAnswer: 1
  },
  {
    id: 3,
    image: '/src/assets/question3.jpg',
    question: 'In which sport would you perform a slam dunk?',
    options: ['Tennis', 'Football', 'Basketball', 'Golf'],
    correctAnswer: 2
  }
];

const REWARDS = [
  '🎁 Premium Gift Box',
  '🏆 Golden Trophy',
  '💎 Diamond Ring',
  '🎮 Gaming Console',
  '📱 Smartphone',
  '💰 Cash Prize',
  '🎪 VIP Experience',
  '🚗 Dream Car'
];

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>({
    currentScreen: 'intro',
    currentQuestion: 0,
    score: 0,
    answers: [],
    hasSpunWheel: false,
    reward: null
  });

  const startGame = () => {
    setGameState(prev => ({
      ...prev,
      currentScreen: 'quiz',
      currentQuestion: 0,
      score: 0,
      answers: [],
      hasSpunWheel: false,
      reward: null
    }));
  };

  const answerQuestion = (answerIndex: number) => {
    const currentQ = QUESTIONS[gameState.currentQuestion];
    const isCorrect = answerIndex === currentQ.correctAnswer;
    
    setGameState(prev => ({
      ...prev,
      answers: [...prev.answers, answerIndex],
      score: isCorrect ? prev.score + 1 : prev.score
    }));

    // Move to next question or wheel
    setTimeout(() => {
      if (gameState.currentQuestion < QUESTIONS.length - 1) {
        setGameState(prev => ({
          ...prev,
          currentQuestion: prev.currentQuestion + 1
        }));
      } else {
        // Quiz complete, show wheel if any correct answers
        if (gameState.score > 0 || isCorrect) {
          setGameState(prev => ({
            ...prev,
            currentScreen: 'wheel'
          }));
        } else {
          setGameState(prev => ({
            ...prev,
            currentScreen: 'results'
          }));
        }
      }
    }, 2000);
  };

  const spinWheel = () => {
    const randomReward = REWARDS[Math.floor(Math.random() * REWARDS.length)];
    setGameState(prev => ({
      ...prev,
      hasSpunWheel: true,
      reward: randomReward
    }));

    // Move to results after spin animation
    setTimeout(() => {
      setGameState(prev => ({
        ...prev,
        currentScreen: 'results'
      }));
    }, 4000);
  };

  const resetGame = () => {
    setGameState({
      currentScreen: 'intro',
      currentQuestion: 0,
      score: 0,
      answers: [],
      hasSpunWheel: false,
      reward: null
    });
  };

  const saveScore = () => {
    const scores = JSON.parse(localStorage.getItem('quizScores') || '[]');
    const newScore = {
      score: gameState.score,
      total: QUESTIONS.length,
      reward: gameState.reward,
      date: new Date().toISOString()
    };
    scores.push(newScore);
    localStorage.setItem('quizScores', JSON.stringify(scores));
  };

  const getHighScore = () => {
    const scores = JSON.parse(localStorage.getItem('quizScores') || '[]');
    return scores.reduce((max: number, score: any) => Math.max(max, score.score), 0);
  };

  return {
    gameState,
    questions: QUESTIONS,
    startGame,
    answerQuestion,
    spinWheel,
    resetGame,
    saveScore,
    getHighScore
  };
};