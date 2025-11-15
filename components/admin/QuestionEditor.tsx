'use client';

import { useState } from 'react';
import { Question, QuestionType, Option } from '@/types/quiz';

interface QuestionEditorProps {
  question?: Question;
  onSave: (question: Question) => void;
  onCancel: () => void;
}

const QUESTION_TYPES: { value: QuestionType; label: string }[] = [
  { value: 'mcq', label: 'Multiple Choice Question' },
  { value: 'true-false', label: 'True/False' },
  { value: 'text', label: 'Text Input' },
  { value: 'short-answer', label: 'Short Answer' },
  { value: 'essay', label: 'Essay' },
];

export function QuestionEditor({ question, onSave, onCancel }: QuestionEditorProps) {
  const [title, setTitle] = useState(question?.title || '');
  const [type, setType] = useState<QuestionType>(question?.type || 'mcq');
  const [text, setText] = useState(question?.text || '');
  const [options, setOptions] = useState<Option[]>(question?.options || []);
  const [correctAnswer, setCorrectAnswer] = useState(question?.correctAnswer || '');
  const [marks, setMarks] = useState(question?.marks || 1);
  const [explanation, setExplanation] = useState(question?.explanation || '');

  const handleAddOption = () => {
    const newOption: Option = {
      id: Date.now().toString(),
      text: '',
    };
    setOptions([...options, newOption]);
  };

  const handleUpdateOption = (id: string, text: string) => {
    setOptions(options.map(opt => (opt.id === id ? { ...opt, text } : opt)));
  };

  const handleRemoveOption = (id: string) => {
    setOptions(options.filter(opt => opt.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !text.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    if ((type === 'mcq' || type === 'true-false') && !correctAnswer) {
      alert('Please select a correct answer');
      return;
    }

    const newQuestion: Question = {
      id: question?.id || Date.now().toString(),
      title,
      type,
      text,
      options: type === 'mcq' || type === 'true-false' ? options : undefined,
      correctAnswer: type === 'mcq' || type === 'true-false' ? correctAnswer : undefined,
      marks,
      explanation,
      order: question?.order || 0,
    };

    onSave(newQuestion);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {question ? 'Edit Question' : 'Add Question'}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Question Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Question Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., What is React?"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Question Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Question Type
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as QuestionType)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {QUESTION_TYPES.map((qt) => (
                <option key={qt.value} value={qt.value}>
                  {qt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Options (for MCQ and True/False) */}
          {(type === 'mcq' || type === 'true-false') && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Answer Options
              </label>
              <div className="space-y-3">
                {type === 'true-false' ? (
                  <div className="space-y-2">
                    {['True', 'False'].map((opt) => (
                      <label key={opt} className="flex items-center gap-3 p-3 border border-gray-300 dark:border-gray-600 rounded-lg">
                        <input
                          type="radio"
                          name="correctAnswer"
                          value={opt}
                          checked={correctAnswer === opt}
                          onChange={(e) => setCorrectAnswer(e.target.value)}
                          className="w-4 h-4 text-blue-600"
                        />
                        <span className="text-gray-900 dark:text-white">{opt}</span>
                      </label>
                    ))}
                  </div>
                ) : (
                  <>
                    {options.map((option, idx) => (
                      <div key={option.id} className="flex gap-2 items-start">
                        <input
                          type="radio"
                          name="correctAnswer"
                          value={option.id}
                          checked={correctAnswer === option.id}
                          onChange={(e) => setCorrectAnswer(e.target.value)}
                          className="w-4 h-4 text-blue-600 mt-2"
                        />
                        <input
                          type="text"
                          value={option.text}
                          onChange={(e) => handleUpdateOption(option.id, e.target.value)}
                          placeholder={`Option ${idx + 1}`}
                          className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveOption(option.id)}
                          className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={handleAddOption}
                      className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                    >
                      + Add Option
                    </button>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Marks */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Marks
            </label>
            <input
              type="number"
              value={marks}
              onChange={(e) => setMarks(parseInt(e.target.value) || 1)}
              min="1"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 justify-end sticky bottom-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4 -mx-6 -mb-6">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Save Question
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
