import React, { useState } from 'react';
import { Grid, Paper, Typography, Box, Chip, List, ListItemButton, ListItemIcon, ListItemText, Checkbox, Divider } from '@mui/material';
import { Calendar, Star, Clock, CheckCircle2, Circle } from 'lucide-react';
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
        }).slice(0, 5); // Only show top 5 todos
    };

    const filters = [
        { icon: <Calendar size={16} />, label: 'Hoy', filter: 'today', color: '#0071e3' },
        { icon: <Star size={16} />, label: 'Todos', filter: 'all', color: '#ff9500' },
        { icon: <Clock size={16} />, label: 'Programados', filter: 'scheduled', color: '#ff2d55' },
        { icon: <CheckCircle2 size={16} />, label: 'Terminados', filter: 'completed', color: '#30d158' },
    ];

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'high':
                return '#ff2d55';
            case 'medium':
                return '#ff9500';
            case 'low':
                return '#30d158';
            default:
                return 'var(--text-secondary)';
        }
    };

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
                }}
                className="glass-effect"
            >
                <Box sx={{ p: 2, borderBottom: '1px solid var(--border-color)' }}>
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
                        <Circle
                            size={8}
                            fill={filters.find(f => f.filter === selectedFilter)?.color}
                            color={filters.find(f => f.filter === selectedFilter)?.color}
                        />
                        TO-DOs
                    </Typography>
                </Box>

                <Box sx={{ display: 'flex', borderBottom: '1px solid var(--border-color)' }}>
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
                                color: selectedFilter === filter.filter ? filter.color : 'var(--text-secondary)',
                                borderBottom: selectedFilter === filter.filter ? `2px solid ${filter.color}` : 'none',
                                '&:hover': {
                                    backgroundColor: 'var(--hover-bg)',
                                },
                            }}
                        >
                            {filter.icon}
                            <Typography sx={{ fontSize: '0.75rem' }}>
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
                                    py: 1,
                                    px: 2,
                                    opacity: todo.completed ? 0.6 : 1,
                                    transition: 'opacity 0.2s ease',
                                }}
                            >
                                <ListItemIcon sx={{ minWidth: 32 }}>
                                    <Checkbox
                                        edge="start"
                                        checked={todo.completed}
                                        sx={{
                                            color: 'var(--text-secondary)',
                                            '&.Mui-checked': {
                                                color: '#30d158',
                                            },
                                        }}
                                    />
                                </ListItemIcon>
                                <ListItemText
                                    primary={todo.title}
                                    secondary={
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Circle size={8} fill={getPriorityColor(todo.priority)} color={getPriorityColor(todo.priority)} />
                                            <Typography component="span" sx={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                                                {dayjs(todo.dueDate).format('D MMM')}
                                            </Typography>
                                        </Box>
                                    }
                                    primaryTypographyProps={{
                                        fontSize: '0.875rem',
                                        color: todo.completed ? 'var(--text-secondary)' : 'var(--text-primary)',
                                        sx: {
                                            textDecoration: todo.completed ? 'line-through' : 'none',
                                        },
                                    }}
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