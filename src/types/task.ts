export interface Task {
  id: string;
  title: string;
  description: string;
  category: string;
  deadline: string;
  budget: number;
  postedBy: string;
  status: 'open' | 'in-progress' | 'completed';
}

export interface UserProfile {
  id: string;
  name: string;
  major: string;
  photo: string;
  skills: string[];
  bio: string;
  completedTasks: number;
} 