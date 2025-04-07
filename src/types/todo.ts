export type TodoPriority = 'none' | 'low' | 'medium' | 'high';

export interface TodoList {
  id: string;
  name: string;
  color: string;
  userId: string;
}

export interface Todo {
  id: string;
  listId: string;
  title: string;
  completed: boolean;
  dueDate?: string;
  priority: TodoPriority;
  notes?: string;
  createdAt: string;
  userId: string;
}