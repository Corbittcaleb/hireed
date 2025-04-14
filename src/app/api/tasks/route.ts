import { NextResponse } from 'next/server';
import { mockTasks } from '@/data/mockData';
import type { Task } from '@/data/mockData';

// In-memory storage for tasks (this will reset on server restart)
let tasks = [...mockTasks];

export async function GET() {
  return NextResponse.json(tasks);
}

export async function POST(request: Request) {
  try {
    const task: Task = await request.json();
    
    // Validate required fields
    if (!task.title || !task.description || !task.category || !task.deadline || !task.budget) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Add task to our in-memory storage
    tasks.push(task);
    
    return NextResponse.json(task, { status: 201 });
  } catch (error) {
    console.error('Error creating task:', error);
    return NextResponse.json(
      { error: 'Failed to create task' },
      { status: 500 }
    );
  }
} 