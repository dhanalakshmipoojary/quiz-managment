'use client';

import { useEffect, useState } from 'react';

interface QuizTimerProps {
  durationInMinutes: number;
  onTimeUp: () => void;
}

export function QuizTimer({ durationInMinutes, onTimeUp }: QuizTimerProps) {
  const [timeRemaining, setTimeRemaining] = useState(durationInMinutes * 60);
  const [isWarning, setIsWarning] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onTimeUp]);

  useEffect(() => {
    // Show warning when 5 minutes or less remain
    setIsWarning(timeRemaining <= 300);
  }, [timeRemaining]);

  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds
    .toString()
    .padStart(2, '0')}`;

  return (
    <div
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold ${
        isWarning
          ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-200'
          : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-200'
      }`}
    >
      <span className="text-lg">⏱️</span>
      <span>{formattedTime}</span>
    </div>
  );
}
