import { useState, useEffect, useCallback, useMemo } from 'react';
import todosData from '../mocks/todos.json';
import { Todo, TodoList } from '../types/todo';
import dayjs from 'dayjs';

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>(todosData.todos);
  const [lists, setLists] = useState<TodoList[]>(todosData.lists);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadTodos = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      // In a real app, this would be an API call
      setTodos(todosData.todos);
      setLists(todosData.lists);
    } catch (err) {
      setError('Error loading todos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const getTodosCount = useCallback((filter: string): number => {
    const today = dayjs().startOf('day');

    return todos.filter(todo => {
      switch (filter) {
        case 'today':
          return !todo.completed && dayjs(todo.dueDate).startOf('day').isSame(today);
        case 'scheduled':
          return !todo.completed && todo.dueDate;
        case 'all':
          return !todo.completed;
        case 'completed':
          return todo.completed;
        default:
          return false;
      }
    }).length;
  }, [todos]);

  const toggleTodo = useCallback((todoId: string) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, []);

  useEffect(() => {
    loadTodos();
  }, [loadTodos]);

  return {
    todos,
    lists,
    loading,
    error,
    getTodosCount,
    toggleTodo,
    setTodos,
    setLists
  };
};