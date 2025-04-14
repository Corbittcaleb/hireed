import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-[#0A1D37] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              OU Students Helping OU Students
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-300">
              Connect with fellow students for help with tasks, projects, and more
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/post"
                className="bg-[#F4B400] text-[#0A1D37] px-8 py-3 rounded-md font-semibold hover:bg-opacity-90 transition-colors duration-300"
              >
                Post a Task
              </Link>
              <Link
                href="/gigs"
                className="bg-white text-[#0A1D37] px-8 py-3 rounded-md font-semibold hover:bg-opacity-90 transition-colors duration-300"
              >
                Find Gigs
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Three-Step Process */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-[#0A1D37] mb-12">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="bg-[#F4B400] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-[#0A1D37]">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Post</h3>
              <p className="text-gray-600">
                Create a task listing with details about what you need help with
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="bg-[#F4B400] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-[#0A1D37]">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Match</h3>
              <p className="text-gray-600">
                Connect with qualified students who can help with your task
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="bg-[#F4B400] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-[#0A1D37]">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Collaborate</h3>
              <p className="text-gray-600">
                Work together and get your task completed successfully
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 