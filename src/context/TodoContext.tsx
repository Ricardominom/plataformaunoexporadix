import {
    useState,
    useEffect,
    useCallback,
    useMemo,
    createContext,
    useContext
  } from 'react';
  import todosData from '../mocks/todos.json';
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
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  }
  
  const TodoContext = createContext<TodoContextType | undefined>(undefined);
  
  export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [lists, setLists] = useState<TodoList[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedFilter, setSelectedFilter] = useState('today');
    const [selectedList, setSelectedList] = useState('1');
      
    // Carga de recordatorios desde la API
    useEffect(() => {
      const fetchRecordatorios = async () => {
          const API_URL = 'http://localhost:8000/usuarios/recordatorios/';
          const accessToken = localStorage.getItem('accessToken');
          if (!accessToken) {
              console.error('No se encontró token de autenticación.');
              return;
          }
          try {
              setLoading(true);
              const response = await fetch(API_URL, {
                  method: 'GET',
                  headers: {
                      Accept: 'application/json',
                      'Content-Type': 'application/json',
                      Authorization: `Bearer ${accessToken}`,
                  },
              });
              if (!response.ok) {
                  console.error('Error al obtener recordatorios:', response.statusText);
                  return;
              }
              const data = await response.json();
  
              // Aquí es donde puedes inspeccionar las fechas
              console.log('Recordatorios recibidos del backend:', data);
  
              const priorityMapBackendToTodo: Record<string, TodoPriority> = {
                  alta: 'high',
                  media: 'medium',
                  baja: 'low',
                  ninguna: 'none',
              };
  
              const todosFromBackend: Todo[] = data.map((recordatorio: any) => {
                  const title = recordatorio.nombre?.trim() || 'Sin título';
  
                  // Validar y procesar `fecha_vencimiento` recibido
                  const dueDate = recordatorio.fecha_vencimiento
                      ? dayjs(recordatorio.fecha_vencimiento, 'YYYY-MM-DD').isValid()
                          ? dayjs(recordatorio.fecha_vencimiento).toISOString() // Convertir a formato ISO
                          : null
                      : null;
  
                  // Agregar log para inspeccionar cada fecha procesada
                  console.log('Fecha procesada (dueDate):', dueDate);
  
                  return {
                      id: recordatorio.id.toString(),
                      title,
                      priority: priorityMapBackendToTodo[recordatorio.prioridad] || 'none',
                      completed: recordatorio.estado_recordatorio !== 'pendiente',
                      listId: recordatorio.lista.toString(),
                      dueDate, // Fecha convertida y validada
                      notes: recordatorio.notas || '',
                      createdAt: recordatorio.created_at || new Date().toISOString(),
                      userId: recordatorio.usuario?.toString() || '1',
                  };
              });
  
              setTodos(todosFromBackend);
              setError(null);
          } catch (error: any) {
              console.error('Error al conectar con la API de recordatorios:', error);
              setError(error.message || 'Error fetching recordatorios');
          } finally {
              setLoading(false);
          }
      };
  
      fetchRecordatorios();
  }, []);
  // Ejecutar al cargar el componente
  
  useEffect(() => {
    const fetchFilteredTodos = async () => {
        const API_URL = 'http://localhost:8000/usuarios/recordatorios/';
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            console.error('No se encontró token de autenticación.');
            return;
        }

        try {
            setLoading(true);
            const response = await fetch(API_URL, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            if (!response.ok) {
                console.error('Error al obtener recordatorios:', response.statusText);
                return;
            }

            const data = await response.json();
            const todosFromBackend = data.map((recordatorio: any) => ({
                id: recordatorio.id.toString(),
                title: recordatorio.nombre?.trim() || 'Sin título',
                priority: recordatorio.prioridad,
                completed: recordatorio.estado_recordatorio !== 'pendiente',
                listId: recordatorio.lista.toString(),
                dueDate: recordatorio.fecha_vencimiento || null,
                notes: recordatorio.notas || '',
                createdAt: recordatorio.created_at || null,
            }));

            setTodos(todosFromBackend);
            setError(null);
        } catch (error) {
            console.error('Error al conectar con la API:', error);
        } finally {
            setLoading(false);
        }
    };

    fetchFilteredTodos();
}, [selectedFilter, selectedList]); // Cambios en el filtro/lista seleccionada disparan la llamada

    // Carga de listas desde la API
    useEffect(() => {
      const fetchLists = async () => {
          const API_URL = 'http://localhost:8000/usuarios/listas/';
          const accessToken = localStorage.getItem('accessToken');
          if (!accessToken) {
              console.error('No se encontró token de autenticación para listas.');
              return;
          }
          try {
              const response = await fetch(API_URL, {
                  method: 'GET',
                  headers: {
                      Accept: 'application/json',
                      'Content-Type': 'application/json',
                      Authorization: `Bearer ${accessToken}`,
                  },
              });
              if (!response.ok) {
                  console.error('Error al obtener las listas:', response.statusText);
                  return;
              }
              const data = await response.json();
              const formattedLists: TodoList[] = data.map((list: any) => ({
                  id: list.id.toString(),
                  name: list.nombre,
                  color: list.color,
                  userId: list.usuario.toString(),
              }));
              setLists(formattedLists);
          } catch (error) {
              console.error('Error al conectar con la API de listas:', error);
          }
      };
      fetchLists();
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
  
    // Función para agregar un nuevo todo
    const addTodo = useCallback((todo: Omit<Todo, 'id'>) => {
      const newTodo: Todo = {
        ...todo,
        id: (Math.max(...todos.map(t => parseInt(t.id)), 0) + 1).toString(),
      };
      setTodos(prevTodos => [newTodo, ...prevTodos]);
    }, [todos]);
  
    const updateTodo = useCallback((todo: Todo) => {
      setTodos(prevTodos =>
        prevTodos.map(t => t.id === todo.id ? todo : t)
      );
    }, []);
  
    const deleteTodo = useCallback((todoId: string) => {
      setTodos((prevTodos) => {
          const updatedTodos = prevTodos.filter((t) => t.id !== todoId);
          localStorage.setItem('todos', JSON.stringify(updatedTodos)); // Actualiza localStorage
          return updatedTodos;
      });
  }, []);
  
    const addList = useCallback((list: Omit<TodoList, 'id'>) => {
      const newList: TodoList = {
        ...list,
        id: (Math.max(...lists.map(l => parseInt(l.id)), 0) + 1).toString(),
      };
      setLists(prevLists => [...prevLists, newList]);
    }, [lists]);
  
    const updateList = useCallback((list: TodoList) => {
      setLists(prevLists =>
        prevLists.map(l => l.id === list.id ? list : l)
      );
    }, []);
  
    const deleteList = useCallback((listId: string) => {
      setLists(prevLists => prevLists.filter(l => l.id !== listId));
      setTodos(prevTodos => prevTodos.filter(t => t.listId !== listId));
    }, []);
  
    
    // Calculamos los todos filtrados (se puede ajustar según necesidad)
    const filteredTodos = useMemo(() => {
      const today = dayjs().format('YYYY-MM-DD'); // Usar formato consistente
      return todos.filter((todo) => {
          switch (selectedFilter) {
              case 'today':
                  return (
                      !todo.completed &&
                      todo.dueDate &&
                      dayjs(todo.dueDate).format('YYYY-MM-DD') === today &&
                      (selectedList ? todo.listId === selectedList : true)
                  );
              case 'scheduled':
                  return (
                      !todo.completed &&
                      todo.dueDate &&
                      (selectedList ? todo.listId === selectedList : true)
                  );
              case 'completed':
                  return (
                      todo.completed &&
                      (selectedList ? todo.listId === selectedList : true)
                  );
              case 'all':
                  return selectedList ? todo.listId === selectedList : true;
              default:
                  return false;
          }
      });
  }, [todos, selectedFilter, selectedList]);
  
  
    // Definición de toggleRecordatorio en tu contexto:
const toggleRecordatorio = useCallback(async (todoId: string) => {
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
          'Authorization': `Bearer ${accessToken}`,
        },
      });
      if (!response.ok) {
        console.error("Error al cambiar el estado:", response.statusText);
        return;
      }
      const updatedRecordatorio = await response.json();
      setTodos(prevTodos =>
        prevTodos.map(todo =>
          todo.id === updatedRecordatorio.id.toString()
            ? {
                ...todo,
                completed: updatedRecordatorio.estado_recordatorio !== "pendiente",
              }
            : todo
        )
      );
    } catch (error: any) {
      console.error("Error al cambiar el estado del recordatorio:", error);
    }
  }, []);
  
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
          toggleRecordatorio, // Se agrega en el objeto retornado
          addTodo,
          updateTodo,
          deleteTodo,
          addList,
          updateList,
          deleteList,
          filteredTodos,
          setTodos,
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
  