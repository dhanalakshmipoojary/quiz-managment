'use client';

import Link from 'next/link';
import { useState } from 'react';

const SAMPLE_QUIZZES = [
  {
    id: 1,
    title: 'React Basics',
    description: 'Learn the fundamentals of React',
    subject: 'Web Development',
    questions: 10,
    marks: 50,
    published: true,
    createdAt: '2025-11-10',
  },
  {
    id: 2,
    title: 'JavaScript Advanced',
    description: 'Master advanced JavaScript concepts',
    subject: 'Programming',
    questions: 15,
    marks: 75,
    published: true,
    createdAt: '2025-11-08',
  },
  {
    id: 3,
    title: 'CSS Flexbox & Grid',
    description: 'Understanding CSS layout techniques',
    subject: 'Web Development',
    questions: 8,
    marks: 40,
    published: false,
    createdAt: '2025-11-05',
  },
  {
    id: 4,
    title: 'TypeScript Fundamentals',
    description: 'Introduction to TypeScript',
    subject: 'Programming',
    questions: 12,
    marks: 60,
    published: true,
    createdAt: '2025-11-01',
  },
];

export default function QuizzesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPublished, setFilterPublished] = useState<'all' | 'published' | 'draft'>(
    'all'
  );

  const filteredQuizzes = SAMPLE_QUIZZES.filter((quiz) => {
    const matchesSearch =
      quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quiz.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterPublished === 'all' ||
      (filterPublished === 'published' && quiz.published) ||
      (filterPublished === 'draft' && !quiz.published);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Manage Quizzes
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            View and manage all your quizzes
          </p>
        </div>
        <Link
          href="/admin/quizzes/create"
          className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
        >
          ➕ Create New Quiz
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search quizzes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex gap-2">
            {['all', 'published', 'draft'].map((filter) => (
              <button
                key={filter}
                onClick={() => setFilterPublished(filter as any)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filterPublished === filter
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Quizzes Grid */}
      {filteredQuizzes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredQuizzes.map((quiz) => (
            <div
              key={quiz.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="p-6 space-y-4">
                {/* Header */}
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-2">
                      {quiz.title}
                    </h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                        quiz.published
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200'
                          : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200'
                      }`}
                    >
                      {quiz.published ? '✓ Published' : '📝 Draft'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                    {quiz.description}
                  </p>
                </div>

                {/* Subject */}
                {quiz.subject && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      📚 {quiz.subject}
                    </span>
                  </div>
                )}

                {/* Stats */}
                <div className="flex gap-4 text-sm">
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Questions:</span>
                    <span className="font-semibold text-gray-900 dark:text-white ml-1">
                      {quiz.questions}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Marks:</span>
                    <span className="font-semibold text-gray-900 dark:text-white ml-1">
                      {quiz.marks}
                    </span>
                  </div>
                </div>

                {/* Date */}
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Created on {quiz.createdAt}
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <Link
                    href={`/admin/quizzes/${quiz.id}/edit`}
                    className="flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors text-center"
                  >
                    Edit
                  </Link>
                  <button className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    Delete
                  </button>
                  <button className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    Preview
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
          <p className="text-gray-600 dark:text-gray-400 text-lg mb-4">
            No quizzes found matching your criteria
          </p>
          <Link
            href="/admin/quizzes/create"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
          >
            ➕ Create Your First Quiz
          </Link>
        </div>
      )}
    </div>
  );
}
