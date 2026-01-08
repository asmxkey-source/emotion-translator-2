
import React, { useState, useEffect, useRef } from 'react';

interface TimerProps {
  durationSeconds: number;
  onComplete?: () => void;
  label: string;
}

const Timer: React.FC<TimerProps> = ({ durationSeconds, onComplete, label }) => {
  const [timeLeft, setTimeLeft] = useState(durationSeconds);
  const [isActive, setIsActive] = useState(false);
  // Fix: Use number type for browser-based timer reference instead of NodeJS.Timeout
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      // Fix: Use window.setInterval and cast to number to avoid NodeJS.Timeout mismatch in TypeScript browser environment
      timerRef.current = window.setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000) as unknown as number;
    } else if (timeLeft === 0) {
      setIsActive(false);
      if (timerRef.current) window.clearInterval(timerRef.current);
      if (onComplete) onComplete();
    }

    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [isActive, timeLeft, onComplete]);

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(durationSeconds);
  };

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((durationSeconds - timeLeft) / durationSeconds) * 100;

  return (
    <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{label}</span>
        <span className="text-lg font-mono font-bold text-indigo-600">{formatTime(timeLeft)}</span>
      </div>
      <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden mb-4">
        <div 
          className="bg-indigo-500 h-full transition-all duration-1000 ease-linear" 
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="flex space-x-2">
        <button
          onClick={toggleTimer}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
            isActive ? 'bg-amber-100 text-amber-700' : 'bg-indigo-600 text-white'
          }`}
        >
          {isActive ? '일시정지' : timeLeft === 0 ? '완료' : '시작'}
        </button>
        <button
          onClick={resetTimer}
          className="px-4 py-2 bg-slate-200 text-slate-500 rounded-xl text-xs font-bold"
        >
          초기화
        </button>
      </div>
    </div>
  );
};

export default Timer;
