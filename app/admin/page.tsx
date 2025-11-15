'use client';

import Link from 'next/link';

export default function AdminDashboard() {
  const stats = [
    { label: 'Total Quizzes', value: '12', icon: '📝', color: 'blue' },
    { label: 'Total Questions', value: '84', icon: '❓', color: 'green' },
    { label: 'Active Users', value: '234', icon: '👥', color: 'purple' },
    { label: 'Avg Completion', value: '78%', icon: '✓', color: 'orange' },
  ];

  const recentQuizzes = [
    {
      id: 1,
      title: 'React Basics',
      questions: 10,
      published: true,
      createdAt: '2 days ago',
    },
    {
      id: 2,
      title: 'JavaScript Advanced',
      questions: 15,
      published: false,
      createdAt: '1 week ago',
    },
    {
      id: 3,
      title: 'CSS Flexbox & Grid',
      questions: 8,
      published: true,
      createdAt: '2 weeks ago',
    },
  ];

  const colorClasses: Record<string, string> = {
    blue: 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200',
    green: 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200',
    purple: 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200',
    orange: 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200',
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          Admin Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Welcome back! Here's an overview of your quiz management system.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700"
          >
            <div className={`inline-block p-3 rounded-lg ${colorClasses[stat.color]} mb-4`}>
              <span className="text-2xl">{stat.icon}</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-1">
              {stat.label}
            </p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col md:flex-row gap-4">
        <Link
          href="/admin/quizzes/create"
          className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
        >
          ➕ Create New Quiz
        </Link>
        <Link
          href="/admin/quizzes"
          className="flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          📋 View All Quizzes
        </Link>
      </div>

      {/* Recent Quizzes */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Recent Quizzes
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Quiz Title
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Questions
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Created
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {recentQuizzes.map((quiz) => (
                <tr
                  key={quiz.id}
                  className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <td className="px-6 py-4 text-gray-900 dark:text-white font-medium">
                    {quiz.title}
                  </td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                    {quiz.questions}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        quiz.published
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200'
                          : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200'
                      }`}
                    >
                      {quiz.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                    {quiz.createdAt}
                  </td>
                  <td className="px-6 py-4">
                    <Link
                      href={`/admin/quizzes/${quiz.id}/edit`}
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
