import { useEffect } from 'react';
import confetti from 'canvas-confetti';

interface ConfettiEffectProps {
  trigger: boolean;
  onComplete?: () => void;
}

export const ConfettiEffect = ({ trigger, onComplete }: ConfettiEffectProps) => {
  useEffect(() => {
    if (!trigger) return;

    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        clearInterval(interval);
        onComplete?.();
        return;
      }

      const particleCount = 50 * (timeLeft / duration);

      // Burst from center
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#A855F7', '#EC4899', '#F59E0B', '#10B981', '#3B82F6', '#EF4444']
      });
      
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#A855F7', '#EC4899', '#F59E0B', '#10B981', '#3B82F6', '#EF4444']
      });
    }, 250);

    // Immediate burst
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#A855F7', '#EC4899', '#F59E0B', '#10B981', '#3B82F6', '#EF4444']
    });

    return () => clearInterval(interval);
  }, [trigger, onComplete]);

  return null;
};