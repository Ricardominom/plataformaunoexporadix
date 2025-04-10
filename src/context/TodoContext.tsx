import React, { createContext, useContext, useState, useEffect } from 'react';
import { Todo, TodoList, TodoPriority } from '../types/todo';
import { useNotification } from './NotificationContext';
import dayjs from 'dayjs';

// Import mock data
import todosData from '../mocks/todos.json';

interface TodoContextType {
  todos: Todo[];
  lists: TodoList[];
  loading: boolean;
  error: string | null;
  selectedFilter: string;
  selectedList: string;
  setSelectedFilter: (filter: string) => void;
  setSelectedList: (listId: string) => void;
  getTodosCount: (filter: string) => number;
  toggleTodo: (todoId: string) => void;
  addTodo: (todo: Omit<Todo, 'id'>) => void;
  updateTodo: (todo: Todo) => void;
  deleteTodo: (todoId: string) => void;
  addList: (list: Omit<TodoList, 'id'>) => void;
  updateList: (list: TodoList) => void;
  deleteList: (listId: string) => void;
  filteredTodos: Todo[];
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>(todosData.todos);
  const [lists, setLists] = useState<TodoList[]>(todosData.lists);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState('today');
  const [selectedList, setSelectedList] = useState('1');
  
  const { addNotification } = useNotification();

  // Load todos from localStorage on mount
  useEffect(() => {
    const loadTodos = () => {
      try {
        setLoading(true);
        const savedTodos = localStorage.getItem('todos');
        const savedLists = localStorage.getItem('todoLists');
        
        if (savedTodos) {
          setTodos(JSON.parse(savedTodos));
        }
        
        if (savedLists) {
          setLists(JSON.parse(savedLists));
        }
        
        setError(null);
      } catch (err) {
        setError('Error loading todos');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    loadTodos();
  }, []);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // Save lists to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('todoLists', JSON.stringify(lists));
  }, [lists]);

  const getTodosCount = (filter: string): number => {
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
  };

  const toggleTodo = (todoId: string) => {
    const todo = todos.find(t => t.id === todoId);
    if (todo) {
      const updatedTodo = { ...todo, completed: !todo.completed };
      setTodos(prevTodos =>
        prevTodos.map(t => t.id === todoId ? updatedTodo : t)
      );
      
      if (updatedTodo.completed) {
        addNotification('todo', 'updated', updatedTodo);
      }
    }
  };

  const addTodo = (todo: Omit<Todo, 'id'>) => {
    const newTodo: Todo = {
      ...todo,
      id: (Math.max(...todos.map(t => parseInt(t.id)), 0) + 1).toString(),
    };
    
    setTodos(prevTodos => [newTodo, ...prevTodos]);
    addNotification('todo', 'created', newTodo);
  };

  const updateTodo = (todo: Todo) => {
    setTodos(prevTodos =>
      prevTodos.map(t => t.id === todo.id ? todo : t)
    );
    addNotification('todo', 'updated', todo);
  };

  const deleteTodo = (todoId: string) => {
    const todoToDelete = todos.find(t => t.id === todoId);
    if (todoToDelete) {
      setTodos(prevTodos => prevTodos.filter(t => t.id !== todoId));
      addNotification('todo', 'deleted', todoToDelete);
    }
  };

  const addList = (list: Omit<TodoList, 'id'>) => {
    const newList: TodoList = {
      ...list,
      id: (Math.max(...lists.map(l => parseInt(l.id)), 0) + 1).toString(),
    };
    
    setLists(prevLists => [...prevLists, newList]);
    addNotification('list', 'created', {
      id: newList.id,
      title: newList.name,
      listId: newList.id,
      completed: false,
      createdAt: new Date().toISOString(),
    });
  };

  const updateList = (list: TodoList) => {
    setLists(prevLists =>
      prevLists.map(l => l.id === list.id ? list : l)
    );
  };

  const deleteList = (listId: string) => {
    setLists(prevLists => prevLists.filter(l => l.id !== listId));
    setTodos(prevTodos => prevTodos.filter(t => t.listId !== listId));
  };

  // Filtered todos based on current filter and search
  const filteredTodos = React.useMemo(() => {
    const today = dayjs().startOf('day');
    let filtered = [...todos];

    // Apply status filter
    filtered = filtered.filter(todo => {
      switch (selectedFilter) {
        case 'today':
          return !todo.completed && dayjs(todo.dueDate).startOf('day').isSame(today);
        case 'all':
          if (selectedList !== 'all') {
            return !todo.completed && todo.listId === selectedList;
          }
          return !todo.completed;
        case 'scheduled':
          return !todo.completed && todo.dueDate;
        case 'completed':
          return todo.completed;
        default:
          return false;
      }
    });

    // Sort todos
    return filtered.sort((a, b) => {
      if (a.completed !== b.completed) return a.completed ? 1 : -1;
      const priorityOrder = { high: 0, medium: 1, low: 2, none: 3 };
      if (a.priority !== b.priority) {
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }
      return dayjs(a.dueDate).isBefore(dayjs(b.dueDate)) ? -1 : 1;
    });
  }, [todos, selectedFilter, selectedList]);

  return (
    <TodoContext.Provider
      value={{
        todos,
        lists,
        loading,
        error,
        selectedFilter,
        selectedList,
        setSelectedFilter,
        setSelectedList,
        getTodosCount,
        toggleTodo,
        addTodo,
        updateTodo,
        deleteTodo,
        addList,
        updateList,
        deleteList,
        filteredTodos,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodos = () => {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error('useTodos must be used within a TodoProvider');
  }
  return context;
};