'use client';

import React from 'react';
import TaskForm from '@/components/tasks/TaskForm';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

export default function PostPage() {
  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-[#0A1D37] mb-8">Post a New Task</h1>
          <TaskForm />
        </div>
      </main>
    </ProtectedRoute>
  );
} 