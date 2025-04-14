'use client';

import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import ErrorMessage from '@/components/ui/ErrorMessage';

export default function ProfilePage() {
  const { user, isLoading, error } = useAuth();

  if (isLoading) {
    return <LoadingSpinner fullScreen />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ErrorMessage message={error} />
        </div>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Profile Header */}
            <div className="bg-[#0A1D37] h-32"></div>
            <div className="px-6 pb-6">
              <div className="relative -mt-16">
                <div className="w-32 h-32 rounded-full border-4 border-white bg-gray-200 overflow-hidden">
                  {user?.photo ? (
                    <img
                      src={user.photo}
                      alt={user.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                      <span className="text-4xl text-gray-500">
                        {user?.name.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-4">
                <h1 className="text-2xl font-bold text-[#0A1D37]">{user?.name}</h1>
                <p className="text-gray-600">{user?.major}</p>
                <p className="text-gray-500 text-sm mt-1">{user?.email}</p>
              </div>

              {/* Stats */}
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Member Since</p>
                  <p className="text-2xl font-bold text-[#0A1D37]">2024</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Account Type</p>
                  <p className="text-2xl font-bold text-[#0A1D37]">Student</p>
                </div>
              </div>

              {/* Bio */}
              <div className="mt-6">
                <h2 className="text-lg font-semibold text-[#0A1D37] mb-2">About</h2>
                <p className="text-gray-600">
                  OU student looking to connect with fellow students for collaboration and mutual support.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </ProtectedRoute>
  );
} 