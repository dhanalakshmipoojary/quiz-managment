'use client';

import { Question } from '@/types/quiz';

interface QuizProgressProps {
  currentQuestion: number;
  totalQuestions: number;
  answeredQuestions: Set<string>;
  onQuestionSelect: (index: number) => void;
}

export function QuizProgress({
  currentQuestion,
  totalQuestions,
  answeredQuestions,
  onQuestionSelect,
}: QuizProgressProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
        Question Progress ({currentQuestion + 1} / {totalQuestions})
      </h3>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-6 overflow-hidden">
        <div
          className="bg-blue-600 h-full transition-all duration-300"
          style={{ width: `${((currentQuestion + 1) / totalQuestions) * 100}%` }}
        />
      </div>

      {/* Question Grid */}
      <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
        {Array.from({ length: totalQuestions }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => onQuestionSelect(idx)}
            className={`p-2 rounded-lg font-semibold text-sm transition-all ${
              idx === currentQuestion
                ? 'bg-blue-600 text-white ring-2 ring-blue-400'
                : answeredQuestions.has(idx.toString())
                ? 'bg-green-500 text-white hover:bg-green-600'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
            title={`Question ${idx + 1}`}
          >
            {idx + 1}
          </button>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-4 space-y-2 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-600 rounded"></div>
          <span className="text-gray-700 dark:text-gray-300">Current</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded"></div>
          <span className="text-gray-700 dark:text-gray-300">Answered</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <span className="text-gray-700 dark:text-gray-300">Unanswered</span>
        </div>
      </div>
    </div>
  );
}
