import React from 'react';
import { Paper, Typography, Box, Chip, List, ListItemButton, ListItemIcon, ListItemText, Checkbox, Divider } from '@mui/material';
import { Calendar, Star, Clock, CheckCircle2, Circle, AlertCircle } from 'lucide-react';
import { useTodos } from '../../../context/TodoContext';
import dayjs from 'dayjs';

interface TodosOverviewProps {
    todos?: any[]; // We'll ignore this prop and use the context instead
}

export const TodosOverview: React.FC<TodosOverviewProps> = () => {
    // Use the shared TodoContext instead of component props
    const { 
        todos, 
        selectedFilter, 
        setSelectedFilter, 
        filteredTodos, 
        toggleTodo 
    } = useTodos();

    const filters = [
        { icon: <Calendar size={16} />, label: 'Hoy', filter: 'today', color: '#00CC88', bgColor: 'rgba(0, 204, 136, 0.2)' },
        { icon: <Star size={16} />, label: 'Todos', filter: 'all', color: '#00CC88', bgColor: 'rgba(0, 204, 136, 0.2)' },
        { icon: <Clock size={16} />, label: 'Prog.', filter: 'scheduled', color: '#00CC88', bgColor: 'rgba(0, 204, 136, 0.2)' },
        { icon: <CheckCircle2 size={16} />, label: 'Term.', filter: 'completed', color: '#00CC88', bgColor: 'rgba(0, 204, 136, 0.2)' },
    ];

    const getPriorityInfo = (priority: string) => {
        const info = {
            high: { color: '#FFFFFF', icon: <AlertCircle size={12} />, label: 'Alta' },
            medium: { color: '#FFFFFF', icon: <Clock size={12} />, label: 'Media' },
            low: { color: '#FFFFFF', icon: <CheckCircle2 size={12} />, label: 'Baja' },
            none: { color: '#BBBBBB', icon: <Circle size={12} />, label: 'Normal' }
        };
        return info[priority as keyof typeof info] || info.none;
    };

    const currentFilter = filters.find(f => f.filter === selectedFilter)!;
    
    // Get only the first 5 todos to display in the dashboard
    const displayTodos = filteredTodos.slice(0, 5);

    return (
        <Paper
            sx={{
                borderRadius: '12px',
                backgroundColor: '#1E1E1E',
                border: '1px solid #333333',
                overflow: 'hidden',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <Box sx={{ 
                p: 2, 
                borderBottom: '1px solid #333333',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <Typography
                    variant="h6"
                    sx={{
                        fontSize: '1.125rem',
                        fontWeight: 600,
                        color: '#00CC88',
                    }}
                >
                    TO-DOs
                </Typography>
                <Chip
                    label={`${displayTodos.length} tareas`}
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
                borderBottom: '1px solid #333333',
                backgroundColor: '#2C2C2C', // Darker gray background for filter section
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
                            color: selectedFilter === filter.filter ? filter.color : '#BBBBBB',
                            transition: 'all 0.2s ease',
                            '&:hover': {
                                backgroundColor: selectedFilter === filter.filter ? filter.bgColor : 'rgba(0, 204, 136, 0.1)',
                                color: filter.color,
                            },
                        }}
                    >
                        {filter.icon}
                        <Typography sx={{ fontSize: '0.7rem', fontWeight: 500 }}>
                            {filter.label}
                        </Typography>
                    </Box>
                ))}
            </Box>

            <List 
                sx={{ 
                    flex: 1, 
                    p: 0, 
                    overflowY: 'auto',
                    backgroundColor: '#2C2C2C', // Darker gray background for tasks area
                }}
            >
                {displayTodos.map((todo, index) => (
                    <React.Fragment key={todo.id}>
                        <ListItemButton
                            sx={{
                                py: 1.5,
                                px: 2,
                                opacity: todo.completed ? 0.6 : 1,
                                transition: 'all 0.2s ease',
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                },
                            }}
                            onClick={() => toggleTodo(todo.id)}
                        >
                            <ListItemIcon sx={{ minWidth: 36 }}>
                                <Checkbox
                                    edge="start"
                                    checked={todo.completed}
                                    sx={{
                                        color: '#BBBBBB',
                                        '&.Mui-checked': {
                                            color: '#00CC88',
                                        },
                                        transition: 'color 0.2s ease',
                                        padding: '4px',
                                    }}
                                />
                            </ListItemIcon>
                            <ListItemText
                                primary={
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Typography
                                            sx={{
                                                fontSize: '0.8rem',
                                                color: todo.completed ? '#BBBBBB' : '#FFFFFF',
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
                                                height: '18px',
                                                backgroundColor: 'rgba(0, 204, 136, 0.2)',
                                                color: '#00CC88',
                                                '& .MuiChip-icon': { color: 'inherit' },
                                                '& .MuiChip-label': { px: 1, fontSize: '0.65rem', fontWeight: 500 },
                                            }}
                                        />
                                    </Box>
                                }
                                secondary={
                                    <Typography
                                        sx={{
                                            fontSize: '0.7rem',
                                            color: '#BBBBBB',
                                            mt: 0.5,
                                        }}
                                    >
                                        {todo.dueDate ? `Vence: ${dayjs(todo.dueDate).format('D MMM')}` : 'Sin fecha'}
                                    </Typography>
                                }
                                primaryTypographyProps={{
                                    sx: { mb: 0 }
                                }}
                                secondaryTypographyProps={{
                                    sx: { mt: 0 }
                                }}
                            />
                        </ListItemButton>
                        {index < displayTodos.length - 1 && (
                            <Divider sx={{ borderColor: '#444444' }} />
                        )}
                    </React.Fragment>
                ))}
                {displayTodos.length === 0 && (
                    <Box sx={{ p: 3, textAlign: 'center' }}>
                        <Typography sx={{ color: '#BBBBBB', fontSize: '0.875rem' }}>
                            No hay tareas para mostrar
                        </Typography>
                    </Box>
                )}
            </List>
        </Paper>
    );
};