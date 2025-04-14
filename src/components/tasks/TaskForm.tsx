import React, { useState } from 'react';
import { categories } from '@/data/mockData';
import { Task } from '@/types/task';
import { useRouter } from 'next/navigation';
import { storage } from '@/utils/storage';

interface FormData {
  title: string;
  description: string;
  category: string;
  deadline: string;
  budget: string;
}

interface FormErrors {
  title?: string;
  description?: string;
  category?: string;
  deadline?: string;
  budget?: string;
}

const TaskForm = (): JSX.Element => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    category: categories[0],
    deadline: '',
    budget: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    // Title validation
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length < 10) {
      newErrors.title = 'Title must be at least 10 characters long';
    } else if (formData.title.length > 100) {
      newErrors.title = 'Title must be less than 100 characters';
    }
    
    // Description validation
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.length < 30) {
      newErrors.description = 'Description must be at least 30 characters long';
    } else if (formData.description.length > 1000) {
      newErrors.description = 'Description must be less than 1000 characters';
    }
    
    // Category validation
    if (!formData.category) {
      newErrors.category = 'Category is required';
    } else if (!categories.includes(formData.category)) {
      newErrors.category = 'Invalid category selected';
    }
    
    // Deadline validation
    if (!formData.deadline) {
      newErrors.deadline = 'Deadline is required';
    } else {
      const deadlineDate = new Date(formData.deadline);
      const today = new Date();
      const maxDate = new Date();
      maxDate.setMonth(maxDate.getMonth() + 6);

      if (deadlineDate < today) {
        newErrors.deadline = 'Deadline cannot be in the past';
      } else if (deadlineDate > maxDate) {
        newErrors.deadline = 'Deadline cannot be more than 6 months in the future';
      }
    }
    
    // Budget validation
    if (!formData.budget) {
      newErrors.budget = 'Budget is required';
    } else {
      const budget = parseFloat(formData.budget);
      if (isNaN(budget) || budget <= 0) {
        newErrors.budget = 'Budget must be a positive number';
      } else if (budget < 5) {
        newErrors.budget = 'Minimum budget is $5';
      } else if (budget > 1000) {
        newErrors.budget = 'Maximum budget is $1000';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setSubmitError(null);
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Create the new task object
      const newTask: Task = {
        id: Math.random().toString(36).substr(2, 9), // Generate a random ID for now
        title: formData.title.trim(),
        description: formData.description.trim(),
        category: formData.category,
        deadline: formData.deadline,
        budget: parseFloat(formData.budget),
        postedBy: 'user1', // Using mock user for now
        status: 'open'
      };

      // Save to API
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
      });

      if (!response.ok) {
        throw new Error('Failed to create task');
      }

      // Save to localStorage
      storage.saveTask(newTask);

      // Show success message
      setShowSuccess(true);
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        category: categories[0],
        deadline: '',
        budget: ''
      });

      // Redirect after 2 seconds
      setTimeout(() => {
        router.push('/gigs');
      }, 2000);
    } catch (error) {
      setSubmitError('Failed to create task. Please try again.');
      console.error('Error creating task:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-[#0A1D37] mb-6">Post a New Task</h2>
      
      {submitError && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {submitError}
        </div>
      )}

      {showSuccess && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
          Task created successfully! Redirecting to gigs page...
        </div>
      )}
      
      <div className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#F4B400] focus:border-transparent ${
              errors.title ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="What do you need help with?"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-500">{errors.title}</p>
          )}
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={4}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#F4B400] focus:border-transparent ${
              errors.description ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Provide details about your task..."
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-500">{errors.description}</p>
          )}
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#F4B400] focus:border-transparent ${
              errors.category ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="mt-1 text-sm text-red-500">{errors.category}</p>
          )}
        </div>

        <div>
          <label htmlFor="deadline" className="block text-sm font-medium text-gray-700 mb-1">
            Deadline
          </label>
          <input
            type="date"
            id="deadline"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            required
            min={new Date().toISOString().split('T')[0]}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#F4B400] focus:border-transparent ${
              errors.deadline ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.deadline && (
            <p className="mt-1 text-sm text-red-500">{errors.deadline}</p>
          )}
        </div>

        <div>
          <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-1">
            Budget ($)
          </label>
          <input
            type="number"
            id="budget"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#F4B400] focus:border-transparent ${
              errors.budget ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter your budget"
          />
          {errors.budget && (
            <p className="mt-1 text-sm text-red-500">{errors.budget}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full bg-[#0A1D37] text-white py-2 px-4 rounded-md transition-colors duration-300 font-medium ${
            isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-opacity-90'
          }`}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Task'}
        </button>
      </div>
    </form>
  );
};

export default TaskForm; 