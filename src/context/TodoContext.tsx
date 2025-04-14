import React, { createContext, useContext, useState, useEffect } from 'react';
import { Todo, TodoList, TodoPriority } from '../types/todo';
import dayjs from 'dayjs';

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
  toggleRecordatorio: (todoId: string) => Promise<void>;
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
  const [todos, setTodos] = useState<Todo[]>([]);
  const [lists, setLists] = useState<TodoList[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState('today');
  const [selectedList, setSelectedList] = useState('1');

  // Carga inicial desde la API para todos y listas
  useEffect(() => {
    const fetchData = async () => {
      const TODOS_API_URL = 'http://localhost:8000/usuarios/recordatorios/';
      const LISTS_API_URL = 'http://localhost:8000/usuarios/listas/';
      const accessToken = localStorage.getItem('accessToken');

      if (!accessToken) {
        console.error("Token de autenticación no encontrado.");
        setError('No se encontró token de autenticación.');
        return;
      }

      try {
        setLoading(true);

        // Fetch todos
        const todosResponse = await fetch(TODOS_API_URL, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (!todosResponse.ok) {
          throw new Error('Error al obtener recordatorios.');
        }
        const todosData = await todosResponse.json();

        // Fetch lists
        const listsResponse = await fetch(LISTS_API_URL, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (!listsResponse.ok) {
          throw new Error('Error al obtener listas.');
        }
        const listsData = await listsResponse.json();

        // Mapear los datos de la API a nuestro formato
        const priorityMapBackendToTodo: Record<string, TodoPriority> = {
          alta: 'high',
          media: 'medium',
          baja: 'low',
          ninguna: 'none',
        };

        const todosMapped = todosData.map((todo: any) => ({
          id: todo.id.toString(),
          title: todo.nombre || 'Sin título',
          priority: priorityMapBackendToTodo[todo.prioridad] || 'none',
          completed: todo.estado_recordatorio !== 'pendiente',
          listId: todo.lista.toString(),
          dueDate: todo.fecha_vencimiento,
          notes: todo.notas || '',
          createdAt: todo.created_at || new Date().toISOString(),
        }));

        const listsMapped = listsData.map((list: any) => ({
          id: list.id.toString(),
          name: list.nombre,
          color: list.color,
        }));

        setTodos(todosMapped);
        setLists(listsMapped);

        setError(null);
      } catch (error: any) {
        console.error('Error al cargar datos:', error.message);
        setError(error.message || 'Error desconocido.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleRecordatorio = async (todoId: string) => {
    const API_URL = `http://localhost:8000/usuarios/recordatorios/${todoId}/toggle_estado/`;
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      console.error("Token de autenticación no encontrado.");
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error('Error al cambiar el estado del recordatorio.');
      }

      const updatedTodo = await response.json();
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === updatedTodo.id.toString()
            ? {
                ...todo,
                completed: updatedTodo.estado_recordatorio !== 'pendiente',
              }
            : todo
        )
      );
    } catch (error: any) {
      console.error('Error al cambiar estado:', error.message);
    }
  };

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
        getTodosCount: (filter) => {
          const today = dayjs().startOf('day');
          return todos.filter((todo) => {
            switch (filter) {
              case 'today':
                return !todo.completed && dayjs(todo.dueDate).startOf('day').isSame(today);
              case 'scheduled':
                return !todo.completed && todo.dueDate;
              case 'completed':
                return todo.completed;
              default:
                return true;
            }
          }).length;
        },
        toggleTodo: (todoId) => {
          setTodos((prevTodos) =>
            prevTodos.map((todo) =>
              todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
            )
          );
        },
        toggleRecordatorio,
        addTodo: (todo) => {
          setTodos((prevTodos) => [
            {
              ...todo,
              id: (Math.max(...prevTodos.map((t) => parseInt(t.id)), 0) + 1).toString(),
            },
            ...prevTodos,
          ]);
        },
        updateTodo: (todo) => {
          setTodos((prevTodos) =>
            prevTodos.map((t) => (t.id === todo.id ? todo : t))
          );
        },
        deleteTodo: (todoId) => {
          setTodos((prevTodos) => prevTodos.filter((t) => t.id !== todoId));
        },
        addList: (list) => {
          setLists((prevLists) => [
            {
              ...list,
              id: (Math.max(...prevLists.map((l) => parseInt(l.id)), 0) + 1).toString(),
            },
            ...prevLists,
          ]);
        },
        updateList: (list) => {
          setLists((prevLists) =>
            prevLists.map((l) => (l.id === list.id ? list : l))
          );
        },
        deleteList: (listId) => {
          setLists((prevLists) => prevLists.filter((l) => l.id !== listId));
          setTodos((prevTodos) => prevTodos.filter((t) => t.listId !== listId));
        },
        filteredTodos: todos.filter((todo) => {
          const today = dayjs().startOf('day');
          switch (selectedFilter) {
            case 'today':
              return !todo.completed && dayjs(todo.dueDate).startOf('day').isSame(today);
            case 'scheduled':
              return !todo.completed && todo.dueDate;
            case 'completed':
              return todo.completed;
            default:
              return true;
          }
        }),
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodos = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodos must be used within a TodoProvider');
  }
  return context;
};
