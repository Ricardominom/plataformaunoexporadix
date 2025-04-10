import React from 'react';
import { Box, Typography, IconButton, Tooltip, Badge, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { Calendar, Star, Clock, CheckCircle2, Info, Plus } from 'lucide-react';

interface TodoHeaderProps {
    selectedFilter: string;
    count: number;
    label: string;
    icon: React.ReactNode;
    color: string;
    onNewReminder: () => void;
}

export const TodoHeader: React.FC<TodoHeaderProps> = ({
    selectedFilter,
    count,
    label,
    icon,
    color,
    onNewReminder,
}) => {
    return (
        <Box
            sx={{
                p: 2,
                borderBottom: '1px solid var(--border-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    <Box
                        sx={{
                            width: 40,
                            height: 40,
                            borderRadius: '12px',
                            backgroundColor: `${color}20`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: color,
                            transition: 'transform 0.2s ease',
                            '&:hover': {
                                transform: 'scale(1.05)',
                            },
                        }}
                    >
                        {icon}
                    </Box>
                </motion.div>
                <Box>
                    <Typography
                        variant="h6"
                        sx={{
                            fontSize: '1.125rem',
                            fontWeight: 600,
                            color: 'var(--text-primary)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                        }}
                    >
                        {label}
                        <Tooltip title="Vista general de tus tareas" arrow>
                            <IconButton size="small" sx={{ color: 'var(--text-secondary)' }}>
                                <Info size={14} />
                            </IconButton>
                        </Tooltip>
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: '0.875rem',
                            color: 'var(--text-secondary)',
                        }}
                    >
                        {count} {count === 1 ? 'tarea' : 'tareas'}
                    </Typography>
                </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Badge
                    badgeContent={count}
                    color="primary"
                    sx={{
                        '& .MuiBadge-badge': {
                            backgroundColor: color,
                            color: '#fff',
                            fontSize: '0.75rem',
                            minWidth: '20px',
                            height: '20px',
                        },
                    }}
                />
                <Button
                    variant="contained"
                    startIcon={<Plus size={16} />}
                    onClick={onNewReminder}
                    sx={{
                        backgroundColor: color,
                        color: '#fff',
                        fontSize: '0.875rem',
                        fontWeight: 500,
                        textTransform: 'none',
                        px: 2,
                        height: '32px',
                        borderRadius: '8px',
                        boxShadow: 'none',
                        '&:hover': {
                            backgroundColor: color,
                            opacity: 0.9,
                            boxShadow: 'none',
                        },
                    }}
                >
                    Nuevo
                </Button>
            </Box>
        </Box>
    );
};