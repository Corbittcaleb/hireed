import { Task, UserProfile } from '@/types/task';

export const categories = [
  'Academic Help',
  'Tech Support',
  'Design & Creative',
  'Writing & Editing',
  'Campus Services',
  'Other'
];

export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Need help with Calculus homework',
    description: 'Looking for someone to help me understand derivatives and integrals for my MATH 1823 class.',
    category: 'Academic Help',
    deadline: '2024-04-15',
    budget: 25,
    postedBy: 'user1',
    status: 'open'
  },
  {
    id: '2',
    title: 'Website design for class project',
    description: 'Need a simple website designed for my business class presentation.',
    category: 'Design & Creative',
    deadline: '2024-04-20',
    budget: 50,
    postedBy: 'user2',
    status: 'open'
  },
  {
    id: '3',
    title: 'Python programming help',
    description: 'Need assistance with a Python project for CS 1313.',
    category: 'Tech Support',
    deadline: '2024-04-18',
    budget: 30,
    postedBy: 'user3',
    status: 'open'
  }
];

export const mockProfiles: UserProfile[] = [
  {
    id: 'user1',
    name: 'Sarah Johnson',
    major: 'Computer Science',
    photo: '/images/profile1.jpg',
    skills: ['Python', 'Web Development', 'Data Structures'],
    bio: 'Junior CS student passionate about helping others learn programming.',
    completedTasks: 12
  },
  {
    id: 'user2',
    name: 'Michael Chen',
    major: 'Graphic Design',
    photo: '/images/profile2.jpg',
    skills: ['UI/UX Design', 'Adobe Creative Suite', 'Web Design'],
    bio: 'Senior design student looking to help with creative projects.',
    completedTasks: 8
  }
]; 