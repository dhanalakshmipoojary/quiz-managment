'use client';

import { useState, useCallback } from 'react';
import { Quiz } from '@/types/quiz';
import { QuestionRenderer } from '@/components/quiz/QuestionRenderer';
import { QuizProgress } from '@/components/quiz/QuizProgress';
import { QuizTimer } from '@/components/quiz/QuizTimer';

// Sample quiz data for demonstration
const SAMPLE_QUIZ: Quiz = {
  id: '1',
  title: 'React Fundamentals Quiz',
  totalMarks: 50,
  isPublished: true,
  createdAt: new Date(),
  updatedAt: new Date(),
  questions: [
    {
      id: '1',
      title: 'What is React?',
      type: 'mcq',
      options: [
        { id: 'opt1', text: 'A JavaScript library for building user interfaces' },
        { id: 'opt2', text: 'A programming language' },
        { id: 'opt3', text: 'A database management system' },
        { id: 'opt4', text: 'A server-side framework' },
      ],
      correctAnswer: 'opt1',
      marks: 5,
      order: 0,
    },
    {
      id: '2',
      title: 'JSX Syntax',
      type: 'true-false',
      correctAnswer: 'True',
      marks: 5,
      order: 1,
    },
    {
      id: '3',
      title: 'Component Types',
      type: 'mcq',
      options: [
        { id: 'opt1', text: 'One' },
        { id: 'opt2', text: 'Two' },
        { id: 'opt3', text: 'Three' },
        { id: 'opt4', text: 'Four' },
      ],
      correctAnswer: 'opt2',
      marks: 5,
      order: 2,
    },
    {
      id: '4',
      title: 'State Management',
      type: 'short-answer',
      marks: 10,
      order: 3,
    },
    {
      id: '5',
      title: 'Explain React Hooks',
      type: 'essay',
      marks: 20,
      order: 4,
    },
  ],
};

export default function QuizPage() {
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<string>>(
    new Set()
  );
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeUp, setTimeUp] = useState(false);

  const currentQuestion = SAMPLE_QUIZ.questions[currentQuestionIdx];

  const handleAnswerChange = useCallback((answer: string) => {
    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: answer,
    }));
    setAnsweredQuestions((prev) => new Set(prev).add(currentQuestion.id));
  }, [currentQuestion.id]);

  const handleNext = () => {
    if (currentQuestionIdx < SAMPLE_QUIZ.questions.length - 1) {
      setCurrentQuestionIdx(currentQuestionIdx + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIdx > 0) {
      setCurrentQuestionIdx(currentQuestionIdx - 1);
    }
  };

  const handleQuestionSelect = (index: number) => {
    setCurrentQuestionIdx(index);
  };

  const handleTimeUp = () => {
    setTimeUp(true);
    handleSubmitQuiz();
  };

  const handleSubmitQuiz = async () => {
    setIsSubmitted(true);
    setShowSubmitConfirm(false);

    try {
      // TODO: Send answers to backend for evaluation
      console.log('Submitting quiz:', {
        quizId: SAMPLE_QUIZ.id,
        answers: userAnswers,
        totalQuestions: SAMPLE_QUIZ.questions.length,
        answeredQuestions: answeredQuestions.size,
      });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('Error submitting quiz:', error);
      alert('Failed to submit quiz');
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4 md:p-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 text-center space-y-6">
            <div className="text-6xl">✓</div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Quiz Submitted!
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Your quiz has been successfully submitted.
            </p>

            {timeUp && (
              <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                  ⏱️ Time's up! Your quiz was auto-submitted.
                </p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4 py-4 border-y border-gray-200 dark:border-gray-700">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Questions Answered
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {answeredQuestions.size} / {SAMPLE_QUIZ.questions.length}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Total Marks
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {SAMPLE_QUIZ.totalMarks}
                </p>
              </div>
            </div>

            <button
              onClick={() => window.location.href = '/'}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
            >
              Return to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4 md:p-8">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {SAMPLE_QUIZ.title}
            </h1>
            
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          <QuestionRenderer
            question={currentQuestion}
            userAnswer={userAnswers[currentQuestion.id]}
            onAnswerChange={handleAnswerChange}
          />

          {/* Navigation Buttons */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 flex gap-4 justify-between">
            <button
              onClick={handlePrevious}
              disabled={currentQuestionIdx === 0}
              className={`flex items-center gap-2 px-6 py-2 rounded-lg font-semibold transition-colors ${
                currentQuestionIdx === 0
                  ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                  : 'bg-gray-500 hover:bg-gray-600 text-white'
              }`}
            >
              ← Previous
            </button>

            <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <span className="font-semibold text-gray-900 dark:text-white">
                {currentQuestionIdx + 1} / {SAMPLE_QUIZ.questions.length}
              </span>
            </div>

            {currentQuestionIdx === SAMPLE_QUIZ.questions.length - 1 ? (
              <button
                onClick={() => setShowSubmitConfirm(true)}
                className="flex items-center gap-2 px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors"
              >
                Submit Quiz ✓
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
              >
                Next →
              </button>
            )}
          </div>
        </div>

        {/* Sidebar - Progress */}
        <div className="lg:col-span-1">
          <QuizProgress
            currentQuestion={currentQuestionIdx}
            totalQuestions={SAMPLE_QUIZ.questions.length}
            answeredQuestions={answeredQuestions}
            onQuestionSelect={handleQuestionSelect}
          />
        </div>
      </div>

      {/* Submit Confirmation Modal */}
      {showSubmitConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6 space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Submit Quiz?
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              You have answered{' '}
              <span className="font-semibold">
                {answeredQuestions.size} out of {SAMPLE_QUIZ.questions.length}
              </span>{' '}
              questions. Are you sure you want to submit?
            </p>

            {answeredQuestions.size < SAMPLE_QUIZ.questions.length && (
              <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                <p className="text-xs text-yellow-800 dark:text-yellow-200">
                  ⚠️ {SAMPLE_QUIZ.questions.length - answeredQuestions.size}{' '}
                  question(s) remain unanswered.
                </p>
              </div>
            )}

            <div className="flex gap-3 justify-end pt-4 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setShowSubmitConfirm(false)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitQuiz}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors"
              >
                Yes, Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
