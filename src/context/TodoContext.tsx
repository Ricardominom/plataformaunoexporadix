import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Todo, TodoList, TodoPriority } from '../types/todo';
import { useNotification } from './NotificationContext';
import { useAuth } from './AuthContext';
import dayjs from 'dayjs';
import { 
  fetchTodos, 
  fetchLists, 
  createTodoApi, 
  updateTodoApi, 
  deleteTodoApi, 
  toggleTodoApi, 
  createListApi, 
  updateListApi, 
  deleteListApi 
} from '../services/api';

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
  toggleTodo: (todoId: string) => Promise<void>;
  addTodo: (todo: Omit<Todo, 'id'>) => Promise<void>;
  updateTodo: (todo: Todo) => Promise<void>;
  deleteTodo: (todoId: string) => Promise<void>;
  addList: (list: Omit<TodoList, 'id'>) => Promise<void>;
  updateList: (list: TodoList) => Promise<void>;
  deleteList: (listId: string) => Promise<void>;
  filteredTodos: Todo[];
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [lists, setLists] = useState<TodoList[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState('today');
  const [selectedList, setSelectedList] = useState('1');
  const { addNotification } = useNotification();
  const { user } = useAuth();

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [listsRes, todosRes] = await Promise.all([
        fetchLists(),
        fetchTodos(),
      ]);
      setLists(listsRes.data || listsRes);
      setTodos(todosRes.data || todosRes);
      setError(null);
    } catch (err) {
      setError('Error cargando datos');
      setLists([]);
      setTodos([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user) {
      loadData();
    } else {
      setLists([]);
      setTodos([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // Contador de tareas según filtro
  const getTodosCount = (filter: string): number => {
    const today = dayjs().startOf('day');
    return todos.filter(todo => {
      switch (filter) {
        case 'today':
          return !todo.completed && todo.dueDate && dayjs(todo.dueDate).startOf('day').isSame(today);
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

  // Toggle tarea completada
  const toggleTodo = async (todoId: string) => {
    setLoading(true);
    try {
      await toggleTodoApi(todoId);
      await loadData(); // Recarga desde la API
    } catch (err) {
      setError('Error actualizando tarea');
    } finally {
      setLoading(false);
    }
  };

  // Crear tarea
  const addTodo = async (todo: Omit<Todo, 'id' | 'userId'>) => {
    setLoading(true);
    try {
      // No enviar userId, el backend lo toma del token
      await createTodoApi(todo);
      await loadData(); // Recarga desde la API
    } catch (err) {
      setError('Error creando tarea');
    } finally {
      setLoading(false);
    }
  };

  // Actualizar tarea
  const updateTodo = async (todo: Todo) => {
    setLoading(true);
    try {
      await updateTodoApi(todo.id, todo);
      await loadData(); // Recarga desde la API
    } catch (err) {
      setError('Error actualizando tarea');
    } finally {
      setLoading(false);
    }
  };

  // Eliminar tarea
  const deleteTodo = async (todoId: string) => {
    setLoading(true);
    try {
      await deleteTodoApi(todoId);
      await loadData(); // Recarga desde la API
    } catch (err) {
      setError('Error eliminando tarea');
    } finally {
      setLoading(false);
    }
  };

  // Crear lista
  const addList = async (list: Omit<TodoList, 'id' | 'userId'>) => {
    setLoading(true);
    try {
      // No enviar userId, el backend lo toma del token
      await createListApi(list);
      await loadData(); // Recarga desde la API
    } catch (err) {
      setError('Error creando lista');
    } finally {
      setLoading(false);
    }
  };

  // Actualizar lista
  const updateList = async (list: TodoList) => {
    setLoading(true);
    try {
      await updateListApi(list.id, list);
      await loadData(); // Recarga desde la API
    } catch (err) {
      setError('Error actualizando lista');
    } finally {
      setLoading(false);
    }
  };

  // Eliminar lista (y tareas asociadas)
  const deleteList = async (listId: string) => {
    setLoading(true);
    try {
      await deleteListApi(listId);
      await loadData(); // Recarga desde la API
    } catch (err) {
      setError('Error eliminando lista');
    } finally {
      setLoading(false);
    }
  };

  // Filtrado de tareas según filtro y lista seleccionada
  const filteredTodos = React.useMemo(() => {
    const today = dayjs().startOf('day');
    let filtered = [...todos];
    filtered = filtered.filter(todo => {
      switch (selectedFilter) {
        case 'today':
          return !todo.completed && todo.dueDate && dayjs(todo.dueDate).startOf('day').isSame(today);
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