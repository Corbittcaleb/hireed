import type { Task } from '@/types/task';

const TASKS_KEY = 'hireED_tasks';

export const storage = {
  getTasks: (): Task[] => {
    if (typeof window === 'undefined') return [];
    const tasks = localStorage.getItem(TASKS_KEY);
    return tasks ? JSON.parse(tasks) : [];
  },

  saveTask: (task: Task): void => {
    if (typeof window === 'undefined') return;
    const tasks = storage.getTasks();
    tasks.push(task);
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  },

  clearTasks: (): void => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(TASKS_KEY);
  }
}; 