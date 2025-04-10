import React, { useState } from 'react';
import { Grid, Paper, Typography, Box, Chip, List, ListItemButton, ListItemIcon, ListItemText, Checkbox, Divider, Tooltip, IconButton } from '@mui/material';
import { Calendar, Star, Clock, CheckCircle2, Circle, AlertCircle, Info } from 'lucide-react';
import { useTodos } from '../../../hooks/useTodos';
import dayjs from 'dayjs';

export const TodosOverview: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState('today');
  const { todos, getTodosCount, toggleTodo } = useTodos();

  const getFilteredTodos = () => {
    const today = dayjs().startOf('day');
    
    return todos.filter(todo => {
      switch (selectedFilter) {
        case 'today':
          return !todo.completed && dayjs(todo.dueDate).startOf('day').isSame(today);
        case 'all':
          return !todo.completed;
        case 'scheduled':
          return !todo.completed && todo.dueDate;
        case 'completed':
          return todo.completed;
        default:
          return false;
      }
    }).sort((a, b) => {
      if (a.completed !== b.completed) return a.completed ? 1 : -1;
      const priorityOrder = { high: 0, medium: 1, low: 2, none: 3 };
      if (a.priority !== b.priority) {
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }
      return dayjs(a.dueDate).isBefore(dayjs(b.dueDate)) ? -1 : 1;
    }).slice(0, 5);
  };

  const filters = [
    { icon: <Calendar size={16} />, label: 'Hoy', filter: 'today', color: '#0071e3', bgColor: 'rgba(0, 113, 227, 0.1)' },
    { icon: <Star size={16} />, label: 'Todos', filter: 'all', color: '#ff9500', bgColor: 'rgba(255, 149, 0, 0.1)' },
    { icon: <Clock size={16} />, label: 'Programados', filter: 'scheduled', color: '#ff2d55', bgColor: 'rgba(255, 45, 85, 0.1)' },
    { icon: <CheckCircle2 size={16} />, label: 'Terminados', filter: 'completed', color: '#30d158', bgColor: 'rgba(48, 209, 88, 0.1)' },
  ];

  const getPriorityInfo = (priority: string) => {
    const info = {
      high: { color: '#ff2d55', icon: <AlertCircle size={12} />, label: 'Alta' },
      medium: { color: '#ff9500', icon: <Clock size={12} />, label: 'Media' },
      low: { color: '#30d158', icon: <CheckCircle2 size={12} />, label: 'Baja' },
      none: { color: 'var(--text-secondary)', icon: <Circle size={12} />, label: 'Normal' }
    };
    return info[priority as keyof typeof info] || info.none;
  };

  const currentFilter = filters.find(f => f.filter === selectedFilter)!;

  return (
    <Grid item xs={12} lg={4}>
      <Paper
        sx={{
          borderRadius: '12px',
          backgroundColor: 'var(--surface-primary)',
          overflow: 'hidden',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
          },
        }}
        className="glass-effect"
      >
        <Box sx={{ 
          p: 2, 
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography
              variant="h6"
              sx={{
                fontSize: '1rem',
                fontWeight: 600,
                color: 'var(--text-primary)',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              TO-DOs
            </Typography>
            <Tooltip title="Vista general de tus tareas pendientes" arrow>
              <IconButton size="small" sx={{ color: 'var(--text-secondary)' }}>
                <Info size={14} />
              </IconButton>
            </Tooltip>
          </Box>
          <Chip
            label={`${getTodosCount(selectedFilter)} tareas`}
            size="small"
            sx={{
              backgroundColor: currentFilter.bgColor,
              color: currentFilter.color,
              fontWeight: 500,
              fontSize: '0.75rem',
            }}
          />
        </Box>

        <Box sx={{ 
          display: 'flex', 
          borderBottom: '1px solid var(--border-color)',
          backgroundColor: 'var(--surface-secondary)',
          p: 0.5,
          gap: 0.5
        }}>
          {filters.map((filter) => (
            <Box
              key={filter.filter}
              onClick={() => setSelectedFilter(filter.filter)}
              sx={{
                flex: 1,
                p: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 0.5,
                cursor: 'pointer',
                borderRadius: '8px',
                backgroundColor: selectedFilter === filter.filter ? filter.bgColor : 'transparent',
                color: selectedFilter === filter.filter ? filter.color : 'var(--text-secondary)',
                transition: 'all 0.2s ease',
                '&:hover': {
                  backgroundColor: filter.bgColor,
                  color: filter.color,
                },
              }}
            >
              {filter.icon}
              <Typography sx={{ fontSize: '0.75rem', fontWeight: 500 }}>
                {getTodosCount(filter.filter)}
              </Typography>
            </Box>
          ))}
        </Box>

        <List sx={{ flex: 1, p: 0, overflowY: 'auto' }}>
          {getFilteredTodos().map((todo, index) => (
            <React.Fragment key={todo.id}>
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
              </ListItemButton>
              {index < getFilteredTodos().length - 1 && (
                <Divider sx={{ borderColor: 'var(--border-color)' }} />
              )}
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </Grid>
  );
};
