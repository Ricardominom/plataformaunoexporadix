import React, { useState, useMemo } from 'react';
import {
  Box,
  Paper,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Badge,
  Checkbox,
  IconButton,
} from '@mui/material';
import {
  Calendar,
  Circle,
  Clock,
  CheckCircle2,
  Plus,
  Star,
  ChevronRight,
  MoreVertical,
  Search,
} from 'lucide-react';
import { TodoList, Todo, TodoPriority } from '../types/todo';
import { NewListDialog } from '../components/todos/NewListDialog';
import { NewReminderDialog } from '../components/todos/NewReminderDialog';
import dayjs from 'dayjs';

// Mock data
const mockLists: TodoList[] = [
  { id: '1', name: 'Trabajo', color: '#ff9500', userId: '1' },
  { id: '2', name: 'Personal', color: '#30d158', userId: '1' },
];

const initialTodos: Todo[] = [
  // Trabajo tasks
  {
    id: '1',
    listId: '1',
    title: 'Preparar presentación trimestral',
    completed: false,
    createdAt: new Date().toISOString(),
    dueDate: new Date().toISOString(),
    userId: '1',
    priority: 'high',
    notes: 'Incluir KPIs y proyecciones',
  },
  {
    id: '2',
    listId: '1',
    title: 'Reunión con equipo de desarrollo',
    completed: false,
    createdAt: new Date().toISOString(),
    dueDate: dayjs().add(1, 'day').toISOString(),
    userId: '1',
    priority: 'medium',
    notes: 'Revisar sprint actual',
  },
  {
    id: '3',
    listId: '1',
    title: 'Revisar propuesta de marketing',
    completed: true,
    createdAt: new Date().toISOString(),
    dueDate: dayjs().subtract(1, 'day').toISOString(),
    userId: '1',
    priority: 'low',
  },
  {
    id: '4',
    listId: '1',
    title: 'Actualizar documentación del proyecto',
    completed: false,
    createdAt: new Date().toISOString(),
    dueDate: new Date().toISOString(),
    userId: '1',
    priority: 'medium',
  },

  // Personal tasks
  {
    id: '5',
    listId: '2',
    title: 'Ir al gimnasio',
    completed: false,
    createdAt: new Date().toISOString(),
    dueDate: new Date().toISOString(),
    userId: '1',
    priority: 'high',
    notes: 'Rutina de cardio',
  },
  {
    id: '6',
    listId: '2',
    title: 'Comprar víveres',
    completed: false,
    createdAt: new Date().toISOString(),
    dueDate: new Date().toISOString(),
    userId: '1',
    priority: 'medium',
    notes: 'Frutas, verduras y proteínas',
  },
  {
    id: '7',
    listId: '2',
    title: 'Llamar al dentista',
    completed: false,
    createdAt: new Date().toISOString(),
    dueDate: dayjs().add(2, 'day').toISOString(),
    userId: '1',
    priority: 'low',
  },
  {
    id: '8',
    listId: '2',
    title: 'Pagar servicios',
    completed: true,
    createdAt: new Date().toISOString(),
    dueDate: dayjs().subtract(1, 'day').toISOString(),
    userId: '1',
    priority: 'high',
  },
];

export const TodosPage: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState('today');
  const [selectedList, setSelectedList] = useState('1'); // Default to Trabajo list
  const [isNewListOpen, setIsNewListOpen] = useState(false);
  const [isNewReminderOpen, setIsNewReminderOpen] = useState(false);
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [lists, setLists] = useState<TodoList[]>(mockLists);

  const getTodosCount = (filter: string): number => {
    const today = dayjs().startOf('day');

    switch (filter) {
      case 'today':
        return todos.filter(todo =>
          !todo.completed &&
          dayjs(todo.dueDate).startOf('day').isSame(today)
        ).length;
      case 'scheduled':
        return todos.filter(todo => !todo.completed && todo.dueDate).length;
      case 'all':
        return todos.filter(todo => !todo.completed).length;
      case 'completed':
        return todos.filter(todo => todo.completed).length;
      default:
        return 0;
    }
  };

  const getListTodos = (listId: string) => {
    return todos.filter(todo => todo.listId === listId);
  };

  const handleNewList = (list: { name: string; color: string }) => {
    const newList: TodoList = {
      id: (lists.length + 1).toString(),
      name: list.name,
      color: list.color,
      userId: '1',
    };
    setLists([...lists, newList]);
    setSelectedList(newList.id);
    setSelectedFilter('all');
    setIsNewListOpen(false);
  };

  const handleNewReminder = (reminder: {
    title: string;
    notes?: string;
    dueDate: string;
    priority: TodoPriority;
  }) => {
    const newTodo: Todo = {
      id: (todos.length + 1).toString(),
      listId: selectedList,
      title: reminder.title,
      notes: reminder.notes,
      dueDate: reminder.dueDate,
      priority: reminder.priority,
      completed: false,
      createdAt: new Date().toISOString(),
      userId: '1',
    };
    setTodos([...todos, newTodo]);
  };

  const handleToggleTodo = (todoId: string) => {
    setTodos(todos.map(todo =>
      todo.id === todoId
        ? { ...todo, completed: !todo.completed }
        : todo
    ));
  };

  const filteredTodos = useMemo(() => {
    let filtered = [...todos];
    const today = dayjs().startOf('day');

    // Apply filter
    switch (selectedFilter) {
      case 'today':
        filtered = filtered.filter(todo =>
          dayjs(todo.dueDate).startOf('day').isSame(today)
        );
        break;
      case 'scheduled':
        filtered = filtered.filter(todo => todo.dueDate);
        break;
      case 'completed':
        filtered = filtered.filter(todo => todo.completed);
        break;
      case 'all':
        // No additional filtering needed
        break;
    }

    // If a specific list is selected and we're not in a special filter
    if (selectedList && selectedFilter === 'all') {
      filtered = filtered.filter(todo => todo.listId === selectedList);
    }

    // Sort todos
    return filtered.sort((a, b) => {
      // First by completion status
      if (a.completed !== b.completed) {
        return a.completed ? 1 : -1;
      }

      // Then by priority
      const priorityOrder = { high: 0, medium: 1, low: 2, none: 3 };
      if (a.priority !== b.priority) {
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }

      // Finally by due date
      return dayjs(a.dueDate).isBefore(dayjs(b.dueDate)) ? -1 : 1;
    });
  }, [todos, selectedFilter, selectedList]);

  const getSelectedListName = () => {
    if (selectedFilter === 'today') return 'Hoy';
    if (selectedFilter === 'all') return 'Todos';
    if (selectedFilter === 'scheduled') return 'Programados';
    if (selectedFilter === 'completed') return 'Terminados';
    return lists.find(list => list.id === selectedList)?.name || '';
  };

  const getSelectedListColor = () => {
    if (selectedFilter === 'today') return '#0071e3';
    if (selectedFilter === 'all') return '#ff9500';
    if (selectedFilter === 'scheduled') return '#ff2d55';
    if (selectedFilter === 'completed') return '#30d158';
    return lists.find(list => list.id === selectedList)?.color || '#0071e3';
  };

  return (
    <Box sx={{
      pt: 'calc(var(--nav-height) + 24px)',
      pb: 4,
      px: { xs: 2, sm: 3, md: 4 },
      minHeight: '100vh',
      backgroundColor: 'var(--app-bg)',
      display: 'flex',
      gap: 3,
    }}>
      <Paper
        sx={{
          width: 280,
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: 'none',
          height: 'fit-content',
          backgroundColor: 'var(--surface-primary)',
        }}
        className="glass-effect"
      >
        <Box
          sx={{
            p: 1.5,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              flex: 1,
              height: 28,
              backgroundColor: 'var(--surface-secondary)',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              px: 1.5,
              gap: 1,
              color: 'var(--text-secondary)',
              '&:hover': {
                backgroundColor: 'var(--hover-bg)',
              },
            }}
          >
            <Search size={14} />
            <Typography
              sx={{
                fontSize: '0.875rem',
                color: 'var(--text-secondary)',
              }}
            >
              Buscar
            </Typography>
          </Box>
        </Box>

        <List sx={{ py: 1 }}>
          {[
            { icon: <Calendar size={18} />, label: 'Hoy', filter: 'today', count: getTodosCount('today') },
            { icon: <Star size={18} />, label: 'Todos', filter: 'all', count: getTodosCount('all') },
            { icon: <Clock size={18} />, label: 'Programados', filter: 'scheduled', count: getTodosCount('scheduled') },
            { icon: <CheckCircle2 size={18} />, label: 'Terminados', filter: 'completed', count: getTodosCount('completed') },
          ].map((item) => (
            <ListItemButton
              key={item.filter}
              selected={selectedFilter === item.filter}
              onClick={() => setSelectedFilter(item.filter)}
              sx={{
                borderRadius: 1,
                mx: 1,
                height: 32,
                '&.Mui-selected': {
                  backgroundColor: 'var(--hover-bg)',
                  '&:hover': {
                    backgroundColor: 'var(--hover-bg)',
                  },
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 32,
                  color: item.filter === 'today' ? '#0071e3' :
                    item.filter === 'all' ? '#ff9500' :
                      item.filter === 'scheduled' ? '#ff2d55' : '#30d158'
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontSize: '0.875rem',
                  fontWeight: selectedFilter === item.filter ? 500 : 400,
                  color: 'var(--text-primary)',
                }}
              />
              {item.count > 0 && (
                <Typography
                  sx={{
                    fontSize: '0.875rem',
                    color: 'var(--text-secondary)',
                    ml: 1,
                  }}
                >
                  {item.count}
                </Typography>
              )}
            </ListItemButton>
          ))}
        </List>

        <Divider sx={{ my: 1, borderColor: 'var(--border-color)' }} />

        <List sx={{ py: 1 }}>
          <Typography
            variant="overline"
            sx={{
              fontSize: '0.75rem',
              fontWeight: 500,
              color: 'var(--text-secondary)',
              px: 2,
              py: 1,
            }}
          >
            Mis listas
          </Typography>
          {lists.map((list) => (
            <ListItemButton
              key={list.id}
              selected={selectedList === list.id && selectedFilter === 'all'}
              onClick={() => {
                setSelectedList(list.id);
                setSelectedFilter('all');
              }}
              sx={{
                borderRadius: 1,
                mx: 1,
                height: 32,
                '&.Mui-selected': {
                  backgroundColor: 'var(--hover-bg)',
                  '&:hover': {
                    backgroundColor: 'var(--hover-bg)',
                  },
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 32 }}>
                <Circle size={12} fill={list.color} color={list.color} />
              </ListItemIcon>
              <ListItemText
                primary={list.name}
                primaryTypographyProps={{
                  fontSize: '0.875rem',
                  color: 'var(--text-primary)',
                }}
              />
              <Typography
                sx={{
                  fontSize: '0.875rem',
                  color: 'var(--text-secondary)',
                  ml: 1,
                }}
              >
                {getListTodos(list.id).length}
              </Typography>
            </ListItemButton>
          ))}
          <ListItemButton
            onClick={() => setIsNewListOpen(true)}
            sx={{
              borderRadius: 1,
              mx: 1,
              height: 32,
              color: '#0071e3',
              '&:hover': {
                backgroundColor: 'rgba(0, 113, 227, 0.04)',
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 32, color: 'inherit' }}>
              <Plus size={16} />
            </ListItemIcon>
            <ListItemText
              primary="Nueva Lista"
              primaryTypographyProps={{
                fontSize: '0.875rem',
              }}
            />
          </ListItemButton>
        </List>
      </Paper>

      <Paper
        sx={{
          flex: 1,
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: 'none',
          backgroundColor: 'var(--surface-primary)',
          display: 'flex',
          flexDirection: 'column',
        }}
        className="glass-effect"
      >
        <Box
          sx={{
            p: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid var(--border-color)',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 500,
                color: 'var(--text-primary)',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <Circle size={12} fill={getSelectedListColor()} color={getSelectedListColor()} />
              {getSelectedListName().toUpperCase()}
            </Typography>
            <Typography
              sx={{
                fontSize: '0.875rem',
                color: 'var(--text-secondary)',
              }}
            >
              {filteredTodos.length}
            </Typography>
          </Box>
          <IconButton size="small">
            <MoreVertical size={16} color="var(--text-secondary)" />
          </IconButton>
        </Box>

        <List sx={{ flex: 1, p: 0 }}>
          {filteredTodos.map((todo) => (
            <ListItemButton
              key={todo.id}
              sx={{
                py: 1,
                px: 2,
                '&:hover': {
                  backgroundColor: 'var(--hover-bg)',
                },
                opacity: todo.completed ? 0.6 : 1,
                transition: 'opacity 0.2s ease',
              }}
              onClick={() => handleToggleTodo(todo.id)}
            >
              <Checkbox
                checked={todo.completed}
                sx={{
                  color: 'var(--text-secondary)',
                  '&.Mui-checked': {
                    color: '#30d158',
                  },
                  transition: 'color 0.2s ease',
                }}
              />
              <ListItemText
                primary={todo.title}
                secondary={todo.notes}
                primaryTypographyProps={{
                  fontSize: '0.875rem',
                  color: todo.completed ? 'var(--text-secondary)' : 'var(--text-primary)',
                  sx: {
                    textDecoration: todo.completed ? 'line-through' : 'none',
                    transition: 'all 0.2s ease',
                  },
                }}
                secondaryTypographyProps={{
                  fontSize: '0.75rem',
                  color: 'var(--text-secondary)',
                  sx: {
                    textDecoration: todo.completed ? 'line-through' : 'none',
                    transition: 'all 0.2s ease',
                  },
                }}
              />
            </ListItemButton>
          ))}
        </List>

        <Box
          sx={{
            p: 2,
            borderTop: '1px solid var(--border-color)',
          }}
        >
          <ListItemButton
            onClick={() => setIsNewReminderOpen(true)}
            sx={{
              borderRadius: 1,
              color: '#0071e3',
              '&:hover': {
                backgroundColor: 'rgba(0, 113, 227, 0.04)',
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 36, color: 'inherit' }}>
              <Plus size={18} />
            </ListItemIcon>
            <ListItemText
              primary="Nuevo Recordatorio"
              primaryTypographyProps={{
                fontSize: '0.875rem',
              }}
            />
          </ListItemButton>
        </Box>
      </Paper>

      <NewListDialog
        open={isNewListOpen}
        onClose={() => setIsNewListOpen(false)}
        onSubmit={handleNewList}
      />

      <NewReminderDialog
        open={isNewReminderOpen}
        onClose={() => setIsNewReminderOpen(false)}
        onSubmit={handleNewReminder}
      />
    </Box>
  );
};