'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Quiz, Question, CreateQuizInput } from '@/types/quiz';
import { QuestionEditor } from '@/components/admin/QuestionEditor';
import { QuestionList } from '@/components/admin/QuestionList';

export default function CreateQuizPage() {
  const router = useRouter();
  const [quizDataTitle, setQuizDataTitle] = useState<string>('');

  const [questions, setQuestions] = useState<Question[]>([]);
  const [showQuestionEditor, setShowQuestionEditor] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<Question | undefined>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleQuizInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setQuizDataTitle(value);
  };

  const handleAddQuestion = () => {
    setEditingQuestion(undefined);
    setShowQuestionEditor(true);
  };

  const handleEditQuestion = (question: Question) => {
    setEditingQuestion(question);
    setShowQuestionEditor(true);
  };

  const handleSaveQuestion = (question: Question) => {
    setQuestions((prev) => {
      const existing = prev.find((q) => q.id === question.id);
      if (existing) {
        return prev.map((q) => (q.id === question.id ? question : q));
      } else {
        return [...prev, { ...question, order: prev.length }];
      }
    });
    setShowQuestionEditor(false);
    setEditingQuestion(undefined);
  };

  const handleDeleteQuestion = (questionId: string) => {
    if (confirm('Are you sure you want to delete this question?')) {
      setQuestions((prev) => prev.filter((q) => q.id !== questionId));
    }
  };

  const handleReorderQuestions = (reorderedQuestions: Question[]) => {
    setQuestions(
      reorderedQuestions.map((q, idx) => ({
        ...q,
        order: idx,
      }))
    );
  };

  const handleSubmit = async (e: React.FormEvent, publish: boolean) => {
    e.preventDefault();

    if (!quizDataTitle.trim()) {
      alert('Please enter a quiz title');
      return;
    }

    if (questions.length === 0) {
      alert('Please add at least one question');
      return;
    }

    setIsSubmitting(true);

    try {
      // TODO: Replace with actual API call
      const quiz: Quiz = {
        id: Date.now().toString(),
        title: quizDataTitle,
        questions,
        createdAt: new Date(),
        updatedAt: new Date(),
        isPublished: publish,
      };

      console.log('Saving quiz:', quiz);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      alert(`Quiz ${publish ? 'published' : 'saved'} successfully!`);
      router.push('/admin/quizzes');
    } catch (error) {
      console.error('Error saving quiz:', error);
      alert('Failed to save quiz');
    } finally {
      setIsSubmitting(false);
    }
  };

  const totalMarks = questions.reduce((sum, q) => sum + (q.marks || 0), 0);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          Create New Quiz
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Create a new quiz by adding a title, and questions.
        </p>
      </div>

      <form onSubmit={(e) => handleSubmit(e, false)} className="space-y-8">
        {/* Quiz Information */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Quiz Information
          </h2>

          <div className="space-y-5">
            {/* Quiz Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Quiz Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={quizDataTitle}
                onChange={handleQuizInputChange}
                placeholder="e.g., React Fundamentals"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

          </div>
        </div>

        {/* Questions Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                Questions
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {questions.length} question(s) added • Total marks: {totalMarks}
              </p>
            </div>
            <button
              type="button"
              onClick={handleAddQuestion}
              className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
            >
              ➕ Add Question
            </button>
          </div>

          {/* Questions List */}
          <QuestionList
            questions={questions}
            onEdit={handleEditQuestion}
            onDelete={handleDeleteQuestion}
            onReorder={handleReorderQuestions}
          />
        </div>

        {/* Submit Buttons */}
        <div className="flex flex-col md:flex-row gap-4 justify-end sticky bottom-0 bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Saving...' : '💾 Save as Draft'}
          </button>
          <button
            type="button"
            onClick={(e) => handleSubmit(e, true)}
            disabled={isSubmitting}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Publishing...' : '🚀 Publish Quiz'}
          </button>
        </div>
      </form>

      {/* Question Editor Modal */}
      {showQuestionEditor && (
        <QuestionEditor
          question={editingQuestion}
          onSave={handleSaveQuestion}
          onCancel={() => {
            setShowQuestionEditor(false);
            setEditingQuestion(undefined);
          }}
        />
      )}
    </div>
  );
}
