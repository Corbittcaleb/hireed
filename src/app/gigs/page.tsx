'use client';

import React, { useState, useEffect } from 'react';
import { categories } from '@/data/mockData';
import { Task } from '@/types/task';
import TaskCard from '@/components/tasks/TaskCard';
import { storage } from '@/utils/storage';

interface Filters {
  category: string;
  maxBudget: string;
  deadline: string;
}

export default function GigsPage(): JSX.Element {
  const [filters, setFilters] = useState<Filters>({
    category: '',
    maxBudget: '',
    deadline: ''
  });
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        // Fetch from API
        const response = await fetch('/api/tasks');
        if (!response.ok) {
          throw new Error('Failed to fetch tasks');
        }
        const apiTasks = await response.json();
        
        // Get tasks from localStorage
        const localTasks = storage.getTasks();
        
        // Combine and deduplicate tasks based on ID
        const allTasks = [...apiTasks, ...localTasks];
        const uniqueTasks = allTasks.reduce((acc: Task[], current) => {
          const exists = acc.find(task => task.id === current.id);
          if (!exists) {
            acc.push(current);
          }
          return acc;
        }, []);

        setTasks(uniqueTasks);
      } catch (err) {
        console.error('Error fetching tasks:', err);
        setError('Failed to load tasks. Please try again later.');
        // Fallback to localStorage only
        const localTasks = storage.getTasks();
        setTasks(localTasks);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const filteredTasks = tasks.filter(task => {
    if (filters.category && task.category !== filters.category) return false;
    if (filters.maxBudget && task.budget > parseInt(filters.maxBudget)) return false;
    if (filters.deadline && new Date(task.deadline) > new Date(filters.deadline)) return false;
    return true;
  });

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-[#0A1D37] mb-8">Find Gigs</h1>
        
        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                id="category"
                name="category"
                value={filters.category}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F4B400] focus:border-transparent"
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="maxBudget" className="block text-sm font-medium text-gray-700 mb-1">
                Max Budget
              </label>
              <input
                type="number"
                id="maxBudget"
                name="maxBudget"
                value={filters.maxBudget}
                onChange={handleFilterChange}
                min="0"
                step="5"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F4B400] focus:border-transparent"
                placeholder="Enter max budget"
              />
            </div>
            
            <div>
              <label htmlFor="deadline" className="block text-sm font-medium text-gray-700 mb-1">
                Deadline
              </label>
              <input
                type="date"
                id="deadline"
                name="deadline"
                value={filters.deadline}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F4B400] focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Loading and Error States */}
        {isLoading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0A1D37] mx-auto mb-4"></div>
            <p className="text-gray-600">Loading tasks...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded-md mb-8">
            {error}
          </div>
        )}

        {/* Task Grid */}
        {!isLoading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTasks.length > 0 ? (
              filteredTasks.map(task => (
                <TaskCard key={task.id} task={task} />
              ))
            ) : (
              <div className="col-span-full text-center py-8 text-gray-500">
                No tasks found matching your criteria.
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
} 