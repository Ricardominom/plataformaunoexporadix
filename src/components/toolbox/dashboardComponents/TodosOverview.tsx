import React from 'react';
import { Grid, Paper, Typography, Box, Chip } from '@mui/material';
import { Users, Clock } from 'lucide-react';

interface Todo {
    title: string;
    dueDate: string;
    priority: 'high' | 'medium' | 'low';
    status: 'pending' | 'completed' | 'in_progress';
    assignee: string;
}

interface TodosOverviewProps {
    todos: Todo[];
}

export const TodosOverview: React.FC<TodosOverviewProps> = ({ todos }) => {
    return (
        <Grid item xs={12} lg={4}>
            <Paper
                sx={{
                    p: 3,
                    borderRadius: '12px',
                    backgroundColor: 'var(--surface-primary)',
                    height: '100%',
                }}
                className="glass-effect"
            >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography
                        variant="h6"
                        sx={{
                            fontSize: '1.125rem',
                            fontWeight: 600,
                            color: 'var(--text-primary)',
                        }}
                    >
                        TO-DOs
                    </Typography>
                    <Chip
                        label={`${todos.filter(t => t.status === 'pending').length} pendientes`}
                        size="small"
                        sx={{
                            backgroundColor: 'rgba(255, 149, 0, 0.1)',
                            color: '#ff9500',
                        }}
                    />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {todos.map((todo, index) => (
                        <Box
                            key={index}
                            sx={{
                                p: 2,
                                borderRadius: '8px',
                                backgroundColor: 'var(--surface-secondary)',
                                border: '1px solid var(--border-color)',
                            }}
                        >
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                <Typography
                                    sx={{
                                        color: 'var(--text-primary)',
                                        fontWeight: 500,
                                        fontSize: '0.875rem',
                                    }}
                                >
                                    {todo.title}
                                </Typography>
                                <Chip
                                    label={todo.priority}
                                    size="small"
                                    sx={{
                                        backgroundColor: todo.priority === 'high' ? 'rgba(255, 45, 85, 0.1)' : 'rgba(0, 113, 227, 0.1)',
                                        color: todo.priority === 'high' ? '#ff2d55' : '#0071e3',
                                        height: '20px',
                                        fontSize: '0.75rem',
                                    }}
                                />
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Typography
                                    sx={{
                                        color: 'var(--text-secondary)',
                                        fontSize: '0.75rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 1,
                                    }}
                                >
                                    <Users size={12} />
                                    {todo.assignee}
                                </Typography>
                                <Typography
                                    sx={{
                                        color: 'var(--text-secondary)',
                                        fontSize: '0.75rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 1,
                                    }}
                                >
                                    <Clock size={12} />
                                    {new Date(todo.dueDate).toLocaleDateString()}
                                </Typography>
                            </Box>
                        </Box>
                    ))}
                </Box>
            </Paper>
        </Grid>
    );
};