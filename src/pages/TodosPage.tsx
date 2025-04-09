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
import { useNotification } from '../context/NotificationContext';
import { useTodos } from '../hooks/useTodos';
import dayjs from 'dayjs';

export const TodosPage: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState('today');
  const [selectedList, setSelectedList] = useState('1');
  const [isNewListOpen, setIsNewListOpen] = useState(false);
  const [isNewReminderOpen, setIsNewReminderOpen] = useState(false);
  
  const { todos, lists, loading, getTodosCount, toggleTodo, setTodos, setLists } = useTodos();
  const { addNotification } = useNotification();

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
    
    // Add notification for new list creation
    addNotification('list', 'created', {
      id: newList.id,
      title: newList.name,
      listId: newList.id,
      completed: false,
      createdAt: new Date().toISOString(),
    });
    
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
    addNotification('todo', 'created', newTodo);
    setIsNewReminderOpen(false);
  };

  const handleToggleTodo = (todoId: string) => {
    const todo = todos.find(t => t.id === todoId);
    if (todo) {
      const updatedTodo = { ...todo, completed: !todo.completed };
      setTodos(todos.map(t => t.id === todoId ? updatedTodo : t));
      
      if (updatedTodo.completed) {
        addNotification('todo', 'updated', updatedTodo);
      }
    }
  };

  const filteredTodos = useMemo(() => {
    let filtered = [...todos];
    const today = dayjs().startOf('day');

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
        if (selectedList) {
          filtered = filtered.filter(todo => todo.listId === selectedList);
        }
        break;
    }

    return filtered.sort((a, b) => {
      if (a.completed !== b.completed) return a.completed ? 1 : -1;
      const priorityOrder = { high: 0, medium: 1, low: 2, none: 3 };
      if (a.priority !== b.priority) {
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }
      return dayjs(a.dueDate).isBefore(dayjs(b.dueDate)) ? -1 : 1;
    });
  }, [todos, selectedFilter, selectedList]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography>Loading...</Typography>
      </Box>
    );
  }

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
                {todos.filter(todo => todo.listId === list.id).length}
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
              <Circle
                size={12}
                fill={selectedFilter === 'today' ? '#0071e3' :
                  selectedFilter === 'all' ? '#ff9500' :
                    selectedFilter === 'scheduled' ? '#ff2d55' :
                      selectedFilter === 'completed' ? '#30d158' :
                        lists.find(l => l.id === selectedList)?.color || '#0071e3'}
                color={selectedFilter === 'today' ? '#0071e3' :
                  selectedFilter === 'all' ? '#ff9500' :
                    selectedFilter === 'scheduled' ? '#ff2d55' :
                      selectedFilter === 'completed' ? '#30d158' :
                        lists.find(l => l.id === selectedList)?.color || '#0071e3'}
              />
              {selectedFilter === 'today' ? 'HOY' :
                selectedFilter === 'all' ? 'TODOS' :
                  selectedFilter === 'scheduled' ? 'PROGRAMADOS' :
                    selectedFilter === 'completed' ? 'TERMINADOS' :
                      lists.find(l => l.id === selectedList)?.name.toUpperCase() || ''}
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