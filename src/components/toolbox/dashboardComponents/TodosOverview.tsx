import React from 'react';
import { Paper, Typography, Box, Chip, List, ListItemButton, ListItemIcon, ListItemText, Checkbox, Divider } from '@mui/material';
import { Calendar, Star, Clock, CheckCircle2, Circle, AlertCircle } from 'lucide-react';
import { useTodos } from '../../../context/TodoContext';
import dayjs from 'dayjs';
import { useTheme } from '../../../context/ThemeContext';

interface TodosOverviewProps {
    todos?: any[]; // We'll ignore this prop and use the context instead
}

export const TodosOverview: React.FC<TodosOverviewProps> = () => {
    const { theme } = useTheme();
    const isDarkMode = theme === 'dark';
    
    // Define theme-dependent colors
    const accentColor = isDarkMode ? '#00CC88' : '#0071e3';
    const accentColorLight = isDarkMode ? '#00FFAA' : '#40a9ff';
    const bgColor = isDarkMode ? '#1E1E1E' : '#FFFFFF';
    const borderColor = isDarkMode ? '#333333' : 'rgba(0, 0, 0, 0.1)';
    const textPrimary = isDarkMode ? '#FFFFFF' : '#1d1d1f';
    const textSecondary = isDarkMode ? '#BBBBBB' : '#86868b';

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
                backgroundColor: bgColor,
                border: `1px solid ${borderColor}`,
                overflow: 'hidden',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'background-color 0.3s ease, border-color 0.3s ease',
            }}
        >
            <Box sx={{ 
                p: 2, 
                borderBottom: `1px solid ${borderColor}`,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                transition: 'border-color 0.3s ease',
            }}>
                <Typography
                    variant="h6"
                    sx={{
                        fontSize: '1.125rem',
                        fontWeight: 600,
                        color: accentColor,
                        transition: 'color 0.3s ease',
                    }}
                >
                    TO-DOs
                </Typography>
                <Chip
                    label={`${displayTodos.length} tareas`}
                    size="small"
                    sx={{
                        backgroundColor: `${accentColor}20`,
                        color: accentColor,
                        fontWeight: 500,
                        fontSize: '0.75rem',
                        transition: 'background-color 0.3s ease, color 0.3s ease',
                    }}
                />
            </Box>

            <Box sx={{ 
                display: 'flex', 
                borderBottom: `1px solid ${borderColor}`,
                backgroundColor: isDarkMode ? '#2C2C2C' : '#F5F5F7', // Background for filter section
                p: 0.5,
                gap: 0.5,
                transition: 'background-color 0.3s ease, border-color 0.3s ease',
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
                            backgroundColor: selectedFilter === filter.filter ? `${accentColor}20` : 'transparent',
                            color: selectedFilter === filter.filter ? accentColor : textSecondary,
                            transition: 'all 0.2s ease',
                            '&:hover': {
                                backgroundColor: selectedFilter === filter.filter ? `${accentColor}20` : `${accentColor}10`,
                                color: accentColor,
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
                    backgroundColor: isDarkMode ? '#2C2C2C' : '#F5F5F7', // Background for tasks area
                    transition: 'background-color 0.3s ease',
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
                                    backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
                                },
                            }}
                            onClick={() => toggleTodo(todo.id)}
                        >
                            <ListItemIcon sx={{ minWidth: 36 }}>
                                <Checkbox
                                    edge="start"
                                    checked={todo.completed}
                                    sx={{
                                        color: textSecondary,
                                        '&.Mui-checked': {
                                            color: accentColor,
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
                                                color: todo.completed ? textSecondary : textPrimary,
                                                textDecoration: todo.completed ? 'line-through' : 'none',
                                                fontWeight: 500,
                                                transition: 'color 0.3s ease',
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
                                                backgroundColor: `${accentColor}20`,
                                                color: accentColor,
                                                '& .MuiChip-icon': { color: 'inherit' },
                                                '& .MuiChip-label': { px: 1, fontSize: '0.65rem', fontWeight: 500 },
                                                transition: 'background-color 0.3s ease, color 0.3s ease',
                                            }}
                                        />
                                    </Box>
                                }
                                secondary={
                                    <Typography
                                        sx={{
                                            fontSize: '0.7rem',
                                            color: textSecondary,
                                            mt: 0.5,
                                            transition: 'color 0.3s ease',
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
                            <Divider sx={{ borderColor: isDarkMode ? '#444444' : 'rgba(0, 0, 0, 0.1)', transition: 'border-color 0.3s ease' }} />
                        )}
                    </React.Fragment>
                ))}
                {displayTodos.length === 0 && (
                    <Box sx={{ p: 3, textAlign: 'center' }}>
                        <Typography sx={{ color: textSecondary, fontSize: '0.875rem', transition: 'color 0.3s ease' }}>
                            No hay tareas para mostrar
                        </Typography>
                    </Box>
                )}
            </List>
        </Paper>
    );
};