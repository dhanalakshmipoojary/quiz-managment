'use client';

import Link from 'next/link';
import { useState } from 'react';

export function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { href: '/admin', label: 'Dashboard', icon: '📊' },
    { href: '/admin/quizzes', label: 'Manage Quizzes', icon: '📝' },
    { href: '/admin/quizzes/create', label: 'Create Quiz', icon: '➕' },
    { href: '/admin/reports', label: 'Reports', icon: '📈' },
    { href: '/admin/users', label: 'Users', icon: '👥' },
    { href: '/admin/settings', label: 'Settings', icon: '⚙️' },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed bottom-6 right-6 z-40 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
      >
        ☰
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed lg:relative w-64 h-screen bg-gray-900 dark:bg-gray-950 text-white transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } z-30`}
      >
        <div className="p-6 border-b border-gray-800">
          <h1 className="text-2xl font-bold">Quiz Manager</h1>
          <p className="text-sm text-gray-400">Admin Panel</p>
        </div>

        <nav className="p-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-800 transition-colors"
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-gray-800">
          <Link
            href="/login"
            className="flex items-center justify-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors w-full"
          >
            🚪 Logout
          </Link>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-20"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
