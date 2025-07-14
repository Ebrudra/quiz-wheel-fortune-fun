import { useState } from 'react';
import { Sparkles, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FortuneWheelProps {
  onSpin: () => void;
  hasSpun: boolean;
  reward: string | null;
}

const WHEEL_SEGMENTS = [
  { color: '#FF6B6B', label: '🎁 Gift' },
  { color: '#4ECDC4', label: '🏆 Trophy' },
  { color: '#45B7D1', label: '💎 Diamond' },
  { color: '#96CEB4', label: '🎮 Gaming' },
  { color: '#FECA57', label: '📱 Phone' },
  { color: '#FF9FF3', label: '💰 Cash' },
  { color: '#54A0FF', label: '🎪 VIP' },
  { color: '#5F27CD', label: '🚗 Car' }
];

export const FortuneWheel = ({ onSpin, hasSpun, reward }: FortuneWheelProps) => {
  const [isSpinning, setIsSpinning] = useState(false);

  const handleSpin = () => {
    setIsSpinning(true);
    
    // Play spin animation
    const wheel = document.getElementById('fortune-wheel');
    if (wheel) {
      const randomRotation = 1080 + Math.random() * 360;
      wheel.style.setProperty('--wheel-rotation', `${randomRotation}deg`);
      wheel.classList.add('wheel-spin');
    }

    setTimeout(() => {
      onSpin();
      setIsSpinning(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 tablet-content">
      <div className="text-center space-y-8 max-w-2xl w-full fade-in-scale">
        {/* Header */}
        <div className="space-y-4">
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-accent to-warning bg-clip-text text-transparent">
            Fortune Wheel
          </h2>
          <p className="text-xl text-muted-foreground">
            {hasSpun ? 'Congratulations! Here\'s your reward:' : 'Spin the wheel to claim your prize!'}
          </p>
        </div>

        {/* Wheel Container */}
        <div className="wheel-container relative mx-auto" style={{ width: '320px', height: '320px' }}>
          {/* Wheel Pointer */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1 z-10">
            <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-accent drop-shadow-lg" />
          </div>

          {/* Wheel */}
          <svg 
            id="fortune-wheel"
            className="w-full h-full"
            viewBox="0 0 320 320"
          >
            {WHEEL_SEGMENTS.map((segment, index) => {
              const angle = (360 / WHEEL_SEGMENTS.length) * index;
              const nextAngle = (360 / WHEEL_SEGMENTS.length) * (index + 1);
              
              const x1 = 160 + 150 * Math.cos((angle * Math.PI) / 180);
              const y1 = 160 + 150 * Math.sin((angle * Math.PI) / 180);
              const x2 = 160 + 150 * Math.cos((nextAngle * Math.PI) / 180);
              const y2 = 160 + 150 * Math.sin((nextAngle * Math.PI) / 180);
              
              const largeArcFlag = nextAngle - angle <= 180 ? "0" : "1";
              
              const pathData = [
                `M 160 160`,
                `L ${x1} ${y1}`,
                `A 150 150 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                `Z`
              ].join(' ');

              const textAngle = angle + (360 / WHEEL_SEGMENTS.length) / 2;
              const textX = 160 + 80 * Math.cos((textAngle * Math.PI) / 180);
              const textY = 160 + 80 * Math.sin((textAngle * Math.PI) / 180);

              return (
                <g key={index}>
                  <path
                    d={pathData}
                    fill={segment.color}
                    stroke="#fff"
                    strokeWidth="2"
                    className="drop-shadow-sm"
                  />
                  <text
                    x={textX}
                    y={textY}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="fill-white font-bold text-sm"
                    transform={`rotate(${textAngle} ${textX} ${textY})`}
                  >
                    {segment.label}
                  </text>
                </g>
              );
            })}
            
            {/* Center Circle */}
            <circle
              cx="160"
              cy="160"
              r="20"
              fill="url(#centerGradient)"
              stroke="#fff"
              strokeWidth="3"
            />
            
            {/* Gradient Definition */}
            <defs>
              <linearGradient id="centerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(var(--primary))" />
                <stop offset="100%" stopColor="hsl(var(--accent))" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Spin Button or Result */}
        {!hasSpun ? (
          <Button 
            onClick={handleSpin}
            disabled={isSpinning}
            size="lg"
            className="reward-button text-xl px-8 py-6 group"
          >
            {isSpinning ? (
              <>
                <Sparkles className="w-6 h-6 mr-2 animate-spin" />
                Spinning...
              </>
            ) : (
              <>
                <Gift className="w-6 h-6 mr-2 group-hover:scale-110 transition-transform" />
                Spin the Wheel!
              </>
            )}
          </Button>
        ) : (
          <div className="game-card p-6 celebration border-accent">
            <div className="text-center space-y-4">
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-2xl font-bold text-accent">You Won!</h3>
              <p className="text-xl">{reward}</p>
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <Sparkles className="w-4 h-4" />
                <span>Prize will be delivered soon!</span>
                <Sparkles className="w-4 h-4" />
              </div>
            </div>
          </div>
        )}

        {/* Decorative Elements */}
        <div className="flex justify-center gap-4 text-4xl">
          <span className="animate-bounce" style={{ animationDelay: '0s' }}>✨</span>
          <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>🎊</span>
          <span className="animate-bounce" style={{ animationDelay: '0.4s' }}>🎁</span>
          <span className="animate-bounce" style={{ animationDelay: '0.6s' }}>🏆</span>
          <span className="animate-bounce" style={{ animationDelay: '0.8s' }}>✨</span>
        </div>
      </div>
    </div>
  );
};