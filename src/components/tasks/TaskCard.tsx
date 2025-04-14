import React from 'react';
import { Task } from '@/types/task';

interface TaskCardProps {
  task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-[#0A1D37]">{task.title}</h3>
        <span className="bg-[#F4B400] text-[#0A1D37] px-3 py-1 rounded-full text-sm font-medium">
          ${task.budget}
        </span>
      </div>
      
      <p className="text-gray-600 mb-4 line-clamp-2">{task.description}</p>
      
      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center space-x-4">
          <span className="bg-gray-100 px-3 py-1 rounded-full">
            {task.category}
          </span>
          <span className="flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Due {formatDate(task.deadline)}
          </span>
        </div>
        <button className="bg-[#0A1D37] text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors duration-300">
          View Details
        </button>
      </div>
    </div>
  );
};

export default TaskCard; 