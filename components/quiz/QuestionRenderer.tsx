'use client';

import { Question } from '@/types/quiz';

interface QuestionRendererProps {
  question: Question;
  userAnswer?: string;
  onAnswerChange: (answer: string) => void;
}

const QUESTION_TYPE_LABELS: Record<string, string> = {
  mcq: '📋 Multiple Choice',
  'true-false': '✓/✗ True/False',
  text: '📄 Text Input',
  'short-answer': '✍️ Short Answer',
  essay: '📝 Essay',
};

export function QuestionRenderer({
  question,
  userAnswer = '',
  onAnswerChange,
}: QuestionRendererProps) {
  return (
    <div className="space-y-6">
      {/* Question Header */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-lg p-6 border border-blue-200 dark:border-gray-600">
        <div className="flex items-start justify-between gap-4 mb-3">
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
              {QUESTION_TYPE_LABELS[question.type]}
            </p>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {question.title}
            </h2>
          </div>
          <div className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm font-semibold">
            {question.marks} marks
          </div>
        </div>
      </div>
      {/* Answer Options */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Your Answer:</h3>

        {question.type === 'mcq' && question.options ? (
          <div className="space-y-3">
            {question.options.map((option) => (
              <label
                key={option.id}
                className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  userAnswer === option.id
                    ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-500 dark:border-blue-400'
                    : 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                }`}
              >
                <input
                  type="radio"
                  name="mcq-answer"
                  value={option.id}
                  checked={userAnswer === option.id}
                  onChange={(e) => onAnswerChange(e.target.value)}
                  className="w-5 h-5 text-blue-600 cursor-pointer"
                />
                <span className="text-gray-900 dark:text-white font-medium">
                  {option.text}
                </span>
              </label>
            ))}
          </div>
        ) : question.type === 'true-false' ? (
          <div className="grid grid-cols-2 gap-3">
            {['True', 'False'].map((option) => (
              <button
                key={option}
                onClick={() => onAnswerChange(option)}
                className={`p-4 rounded-lg border-2 font-semibold transition-all ${
                  userAnswer === option
                    ? 'bg-blue-500 dark:bg-blue-600 text-white border-blue-600 dark:border-blue-700'
                    : 'bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        ) : question.type === 'essay' ? (
          <textarea
            value={userAnswer}
            onChange={(e) => onAnswerChange(e.target.value)}
            placeholder="Type your answer here..."
            rows={8}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        ) : (
          <input
            type="text"
            value={userAnswer}
            onChange={(e) => onAnswerChange(e.target.value)}
            placeholder="Type your answer here..."
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        )}
      </div>

      {/* Answer Status Indicator */}
      {userAnswer ? (
        <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
          <p className="text-sm text-green-800 dark:text-green-200">
            ✓ Your answer has been saved
          </p>
        </div>
      ) : (
        <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
          <p className="text-sm text-yellow-800 dark:text-yellow-200">
            ⚠️ Please provide an answer before proceeding
          </p>
        </div>
      )}
    </div>
  );
}
