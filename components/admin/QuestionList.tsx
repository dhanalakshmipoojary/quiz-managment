'use client';

import { Question } from '@/types/quiz';

interface QuestionListProps {
  questions: Question[];
  onEdit: (question: Question) => void;
  onDelete: (questionId: string) => void;
  onReorder: (questions: Question[]) => void;
}

const QUESTION_TYPE_LABELS: Record<string, string> = {
  mcq: '📋 MCQ',
  'true-false': '✓/✗ True/False',
  text: '📄 Text Input',
  'short-answer': '✍️ Short Answer',
  essay: '📝 Essay',
};

export function QuestionList({
  questions,
  onEdit,
  onDelete,
  onReorder,
}: QuestionListProps) {
  const handleMoveUp = (index: number) => {
    if (index > 0) {
      const newQuestions = [...questions];
      [newQuestions[index], newQuestions[index - 1]] = [
        newQuestions[index - 1],
        newQuestions[index],
      ];
      onReorder(newQuestions);
    }
  };

  const handleMoveDown = (index: number) => {
    if (index < questions.length - 1) {
      const newQuestions = [...questions];
      [newQuestions[index], newQuestions[index + 1]] = [
        newQuestions[index + 1],
        newQuestions[index],
      ];
      onReorder(newQuestions);
    }
  };

  if (questions.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          No questions added yet. Create your first question to get started!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {questions.map((question, index) => (
        <div
          key={question.id}
          className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
        >
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">Q{index + 1}</span>
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium">
                  {QUESTION_TYPE_LABELS[question.type]}
                </span>
                <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 rounded-full text-sm">
                  {question.marks} marks
                </span>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                {question.title}
              </h3>
              {question.options && question.options.length > 0 && (
                <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                  {question.options.length} option(s)
                </div>
              )}
            </div>

            <div className="flex gap-2 flex-shrink-0">
              {index > 0 && (
                <button
                  onClick={() => handleMoveUp(index)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  title="Move Up"
                >
                  ⬆️
                </button>
              )}
              {index < questions.length - 1 && (
                <button
                  onClick={() => handleMoveDown(index)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  title="Move Down"
                >
                  ⬇️
                </button>
              )}
              <button
                onClick={() => onEdit(question)}
                className="px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(question.id)}
                className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
