import React, { useState, useMemo } from 'react';
import {
  Box,
  Paper,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Checkbox,
  IconButton,
  Badge,
  Divider,
  Tooltip,
  Chip,
  TextField,
  InputAdornment,
  Container,
} from '@mui/material';
import {
  Calendar,
  Star,
  Clock,
  CheckCircle2,
  Circle,
  AlertCircle,
  Plus,
  ChevronRight,
  Search,
  Info,
  X,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { TodoList, Todo, TodoPriority } from '../types/todo';
import { NewListDialog } from '../components/todos/NewListDialog';
import { NewReminderDialog } from '../components/todos/NewReminderDialog';
import { TodoHeader } from '../components/todos/TodoHeader';
import { useTodos } from '../context/TodoContext';
import dayjs from 'dayjs';

export const TodosPage: React.FC = () => {
  const [isNewListOpen, setIsNewListOpen] = useState(false);
  const [isNewReminderOpen, setIsNewReminderOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const { 
    todos, 
    lists, 
    loading, 
    selectedFilter, 
    selectedList, 
    setSelectedFilter, 
    setSelectedList, 
    getTodosCount, 
    toggleTodo, 
    filteredTodos
  } = useTodos();

  const filters = [
    { icon: <Calendar size={16} />, label: 'Hoy', filter: 'today', color: '#0071e3' },
    { icon: <Star size={16} />, label: 'Todos', filter: 'all', color: '#ff9500' },
    { icon: <Clock size={16} />, label: 'Programados', filter: 'scheduled', color: '#ff2d55' },
    { icon: <CheckCircle2 size={16} />, label: 'Terminados', filter: 'completed', color: '#30d158' },
  ];

  const currentFilter = filters.find(f => f.filter === selectedFilter)!;

  // Obtener usuario y rol desde localStorage
  const user = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem('user') || '{}');
    } catch {
      return {};
    }
  }, []);
  const isPresidente = user?.role === 'Presidente';
  const userId = user?.id;

  // Filtrar listas y todos según el rol
  const visibleLists = useMemo(() => {
    if (isPresidente) return lists;
    return lists.filter(list => list.userId === String(userId));
  }, [lists, isPresidente, userId]);

  const visibleTodos = useMemo(() => {
    if (isPresidente) return filteredTodos;
    return filteredTodos.filter(todo => todo.userId === String(userId));
  }, [filteredTodos, isPresidente, userId]);

  // Filter todos based on search term
  const searchFilteredTodos = useMemo(() => {
    if (!searchTerm) return visibleTodos;
    
    const searchLower = searchTerm.toLowerCase();
    return visibleTodos.filter(todo =>
      todo.title.toLowerCase().includes(searchLower) ||
      todo.notes?.toLowerCase().includes(searchLower)
    );
  }, [visibleTodos, searchTerm]);

  const getPriorityInfo = (priority: string) => {
    const info = {
      high: { color: '#ff2d55', icon: <AlertCircle size={12} />, label: 'Alta' },
      medium: { color: '#ff9500', icon: <Clock size={12} />, label: 'Media' },
      low: { color: '#30d158', icon: <CheckCircle2 size={12} />, label: 'Baja' },
      none: { color: 'var(--text-secondary)', icon: <Circle size={12} />, label: 'Normal' }
    };
    return info[priority as keyof typeof info] || info.none;
  };

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
    }}>
      <Container maxWidth="xl">
        <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', md: 'row' } }}>
          <Paper
            component={motion.div}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            sx={{
              width: { xs: '100%', md: 280 },
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
                gap: 1,
              }}
            >
              <TextField
                fullWidth
                size="small"
                placeholder="Buscar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search size={16} color="var(--text-secondary)" />
                    </InputAdornment>
                  ),
                  endAdornment: searchTerm && (
                    <InputAdornment position="end">
                      <IconButton
                        size="small"
                        onClick={() => setSearchTerm('')}
                        sx={{ color: 'var(--text-secondary)' }}
                      >
                        <X size={14} />
                      </IconButton>
                    </InputAdornment>
                  ),
                  sx: {
                    height: '36px',
                    backgroundColor: 'var(--surface-secondary)',
                    borderRadius: '8px',
                    '& .MuiOutlinedInput-notchedOutline': {
                      border: 'none',
                    },
                    '&:hover': {
                      backgroundColor: 'var(--hover-bg)',
                    },
                    '& input::placeholder': {
                      color: 'var(--text-secondary)',
                      opacity: 1,
                    },
                  }
                }}
              />
            </Box>

            <List sx={{ py: 1 }}>
              {filters.map((item) => (
                <ListItemButton
                  key={item.filter}
                  selected={selectedFilter === item.filter}
                  onClick={() => setSelectedFilter(item.filter)}
                  sx={{
                    borderRadius: 1,
                    mx: 1,
                    height: 36,
                    transition: 'all 0.2s ease',
                    '&.Mui-selected': {
                      backgroundColor: `${item.color}20`,
                      color: item.color,
                      '&:hover': {
                        backgroundColor: `${item.color}30`,
                      },
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 32,
                      color: selectedFilter === item.filter ? item.color : 'var(--text-primary)',
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      fontSize: '0.875rem',
                      fontWeight: selectedFilter === item.filter ? 500 : 400,
                    }}
                  />
                  {getTodosCount(item.filter) > 0 && (
                    <Typography
                      sx={{
                        fontSize: '0.875rem',
                        color: selectedFilter === item.filter ? item.color : 'var(--text-secondary)',
                      }}
                    >
                      {getTodosCount(item.filter)}
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
              {visibleLists.map((list) => (
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
                    height: 36,
                    transition: 'all 0.2s ease',
                    '&.Mui-selected': {
                      backgroundColor: `${list.color}20`,
                      color: list.color,
                      '&:hover': {
                        backgroundColor: `${list.color}30`,
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
                      color: selectedList === list.id ? list.color : 'var(--text-primary)',
                    }}
                  />
                  <Typography
                    sx={{
                      fontSize: '0.875rem',
                      color: selectedList === list.id ? list.color : 'var(--text-secondary)',
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
                  height: 36,
                  color: 'var(--brand-primary)',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    backgroundColor: 'var(--status-info-bg)',
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
            component={motion.div}
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
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
            <TodoHeader
              selectedFilter={selectedFilter}
              count={searchFilteredTodos.length}
              label={currentFilter.label}
              icon={currentFilter.icon}
              color={currentFilter.color}
              onNewReminder={() => setIsNewReminderOpen(true)}
            />

            <List sx={{ flex: 1, p: 0, overflowY: 'auto' }}>
              <AnimatePresence>
                {searchFilteredTodos.map((todo, index) => (
                  <motion.div
                    key={todo.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                  >
                    <ListItemButton
                      onClick={() => toggleTodo(todo.id)}
                      sx={{
                        py: 2,
                        px: 2,
                        opacity: todo.completed ? 0.6 : 1,
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          backgroundColor: 'var(--hover-bg)',
                        },
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: 40 }}>
                        <Checkbox
                          edge="start"
                          checked={todo.completed}
                          sx={{
                            color: 'var(--text-secondary)',
                            '&.Mui-checked': {
                              color: getPriorityInfo(todo.priority).color,
                            },
                            transition: 'color 0.2s ease',
                          }}
                        />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography
                              sx={{
                                fontSize: '0.875rem',
                                color: todo.completed ? 'var(--text-secondary)' : 'var(--text-primary)',
                                textDecoration: todo.completed ? 'line-through' : 'none',
                                fontWeight: 500,
                              }}
                            >
                              {todo.title}
                            </Typography>
                            <Chip
                              size="small"
                              label={getPriorityInfo(todo.priority).label}
                              icon={getPriorityInfo(todo.priority).icon}
                              sx={{
                                height: '20px',
                                backgroundColor: `${getPriorityInfo(todo.priority).color}20`,
                                color: getPriorityInfo(todo.priority).color,
                                '& .MuiChip-icon': { color: 'inherit' },
                                '& .MuiChip-label': { px: 1, fontSize: '0.7rem', fontWeight: 500 },
                              }}
                            />
                          </Box>
                        }
                        secondary={
                          <Typography
                            sx={{
                              fontSize: '0.75rem',
                              color: 'var(--text-secondary)',
                              mt: 0.5,
                            }}
                          >
                            Vence el {dayjs(todo.dueDate).format('D [de] MMMM')}
                          </Typography>
                        }
                      />
                      <ChevronRight size={16} color="var(--text-secondary)" />
                    </ListItemButton>
                    {index < searchFilteredTodos.length - 1 && (
                      <Divider sx={{ borderColor: 'var(--border-color)' }} />
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
              {searchFilteredTodos.length === 0 && (
                <Box sx={{ p: 4, textAlign: 'center' }}>
                  <Typography variant="body1" color="text.secondary">
                    No hay tareas para mostrar
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    {searchTerm ? 'Intenta con otra búsqueda' : 'Crea una nueva tarea para comenzar'}
                  </Typography>
                </Box>
              )}
            </List>
          </Paper>
        </Box>
      </Container>

      <NewListDialog
        open={isNewListOpen}
        onClose={() => setIsNewListOpen(false)}
      />

      <NewReminderDialog
        open={isNewReminderOpen}
        onClose={() => setIsNewReminderOpen(false)}
      />
    </Box>
  );
};