import React from 'react';
import { Paper, Box, Typography, LinearProgress, Chip } from '@mui/material';
import { TrendingUp, TrendingDown, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface LegalStatusItem {
    category: string;
    completed: number;
    total: number;
    growth: number;
}

interface LegalStatusProps {
    items?: LegalStatusItem[];
}

export const LegalStatus: React.FC<LegalStatusProps> = ({ items = [] }) => {
    // If no items are provided, use these default items
    const defaultItems: LegalStatusItem[] = [
        { category: "Contratos", completed: 15, total: 20, growth: 25 },
        { category: "Compliance", completed: 8, total: 10, growth: 15 },
        { category: "Propiedad Intelectual", completed: 5, total: 8, growth: -10 },
        { category: "Regulatorio", completed: 12, total: 15, growth: 8 },
    ];

    const displayItems = items.length > 0 ? items : defaultItems;

    // Calculate overall completion percentage
    const totalCompleted = displayItems.reduce((acc, item) => acc + item.completed, 0);
    const totalItems = displayItems.reduce((acc, item) => acc + item.total, 0);
    const overallPercentage = Math.round((totalCompleted / totalItems) * 100);

    // Get status based on completion percentage
    const getStatus = (completed: number, total: number) => {
        const percentage = (completed / total) * 100;
        if (percentage >= 80) return 'completed';
        if (percentage >= 40) return 'in_progress';
        return 'delayed';
    };

    // Get status icon
    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'completed':
                return <CheckCircle2 size={14} />;
            case 'in_progress':
                return <Clock size={14} />;
            case 'delayed':
                return <AlertCircle size={14} />;
            default:
                return null;
        }
    };

    return (
        <Paper
            component={motion.div}
            whileHover={{ 
                boxShadow: '0 15px 35px rgba(0, 204, 136, 0.25)'
            }}
            sx={{
                p: 3,
                borderRadius: '12px',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                background: 'linear-gradient(135deg, #1E1E1E 0%, #252525 100%)',
                position: 'relative',
                border: '1px solid #00CC88',
                boxShadow: '0 8px 24px rgba(0, 204, 136, 0.15)',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '6px',
                    background: 'linear-gradient(90deg, #00CC88 0%, #007755 100%)',
                    boxShadow: '0 0 20px rgba(0, 204, 136, 0.5)',
                },
                '&::after': {
                    content: '""',
                    position: 'absolute',
                    top: 6,
                    left: 0,
                    right: 0,
                    height: '1px',
                    background: 'linear-gradient(90deg, rgba(0, 204, 136, 0.5) 0%, rgba(0, 119, 85, 0.5) 50%, rgba(0, 204, 136, 0.5) 100%)',
                }
            }}
        >
            <Typography
                variant="h6"
                sx={{
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    mb: 2, // Reduced margin
                    background: 'linear-gradient(135deg, #00FFAA 0%, #007755 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                }}
            >
                BALANCE LEGAL
            </Typography>

            {/* Overall progress indicator */}
            <Box 
                component={motion.div}
                whileHover={{ scale: 1.02 }}
                sx={{ 
                    mb: 3, 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between',
                    p: 2,
                    borderRadius: '10px',
                    background: 'linear-gradient(135deg, rgba(0, 204, 136, 0.1) 0%, rgba(0, 119, 85, 0.1) 100%)',
                    border: '1px solid rgba(0, 204, 136, 0.2)',
                    boxShadow: '0 4px 12px rgba(0, 204, 136, 0.1)',
                }}
            >
                <Box>
                    <Typography sx={{ fontSize: '0.8rem', color: '#BBBBBB', mb: 0.5 }}>
                        Progreso general
                    </Typography>
                    <Typography sx={{ 
                        fontSize: '1.5rem', 
                        fontWeight: 700, 
                        background: 'linear-gradient(135deg, #00FFAA 0%, #007755 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                    }}>
                        {overallPercentage}%
                    </Typography>
                </Box>
                <Chip
                    icon={getStatusIcon(getStatus(totalCompleted, totalItems))}
                    label={totalCompleted} 
                    sx={{ 
                        background: 'linear-gradient(90deg, rgba(0, 204, 136, 0.3) 0%, rgba(0, 119, 85, 0.3) 100%)',
                        color: '#00FFAA',
                        border: '1px solid rgba(0, 204, 136, 0.4)',
                        boxShadow: '0 2px 8px rgba(0, 204, 136, 0.2)',
                        '& .MuiChip-icon': {
                            color: '#00FFAA'
                        },
                        height: '28px', // Slightly taller
                        '& .MuiChip-label': {
                            fontSize: '0.8rem',
                            padding: '0 8px',
                            fontWeight: 700,
                        }
                    }}
                />
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1 }}> {/* Reduced gap */}
                {displayItems.map((item, index) => (
                    <Box 
                        component={motion.div}
                        whileHover={{ 
                            scale: 1.02,
                            x: 5,
                        }}
                        key={index}
                        sx={{
                            p: 1.5,
                            borderRadius: '8px',
                            background: 'linear-gradient(135deg, rgba(0, 204, 136, 0.05) 0%, rgba(0, 119, 85, 0.05) 100%)',
                            border: '1px solid rgba(0, 204, 136, 0.1)',
                            transition: 'all 0.2s ease',
                        }}
                    >
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}> {/* Reduced margin */}
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: '#FFFFFF',
                                        fontWeight: 600,
                                        fontSize: '0.9rem', // Slightly larger
                                    }}
                                >
                                    {item.category}
                                </Typography>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 0.5,
                                        color: item.growth >= 0 ? '#00FFAA' : '#FF3B30',
                                        fontSize: '0.7rem', // Smaller font
                                        background: item.growth >= 0 
                                            ? 'linear-gradient(90deg, rgba(0, 204, 136, 0.2) 0%, rgba(0, 255, 170, 0.2) 100%)'
                                            : 'linear-gradient(90deg, rgba(255, 59, 48, 0.2) 0%, rgba(255, 149, 0, 0.2) 100%)',
                                        px: 1,
                                        py: 0.25,
                                        borderRadius: '10px',
                                        boxShadow: item.growth >= 0 
                                            ? '0 2px 6px rgba(0, 204, 136, 0.2)'
                                            : '0 2px 6px rgba(255, 59, 48, 0.2)',
                                    }}
                                >
                                    {item.growth >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                                    {Math.abs(item.growth)}%
                                </Box>
                            </Box>
                            <Typography
                                variant="body2"
                                sx={{
                                    color: '#FFFFFF',
                                    fontSize: '0.9rem', // Slightly larger
                                    fontWeight: 600,
                                    background: 'linear-gradient(135deg, #00FFAA 0%, #00CC88 100%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                }}
                            >
                                {item.completed}/{item.total}
                            </Typography>
                        </Box>
                        <LinearProgress
                            variant="determinate"
                            value={(item.completed / item.total) * 100}
                            sx={{
                                height: 8, // Thicker progress bar
                                borderRadius: 4,
                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                '& .MuiLinearProgress-bar': {
                                    borderRadius: 4,
                                    background: 'linear-gradient(90deg, #00CC88 0%, #00FFAA 100%)',
                                    boxShadow: '0 0 12px rgba(0, 204, 136, 0.5)',
                                    '&::after': {
                                        content: '""',
                                        position: 'absolute',
                                        top: 0,
                                        right: 0,
                                        width: '8px',
                                        height: '100%',
                                        background: 'rgba(255, 255, 255, 0.8)',
                                        borderRadius: '0 4px 4px 0',
                                        filter: 'blur(3px)',
                                    }
                                },
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    '& .MuiLinearProgress-bar': {
                                        boxShadow: '0 0 15px rgba(0, 204, 136, 0.7)',
                                    }
                                }
                            }}
                        />
                    </Box>
                ))}
            </Box>

            {/* Additional details section - more compact */}
            <Box sx={{ 
                mt: 2, 
                pt: 2, 
                borderTop: '1px solid rgba(0, 204, 136, 0.3)',
                background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 204, 136, 0.15) 100%)',
            }}>
                <Typography
                    variant="subtitle2"
                    sx={{
                        fontSize: '0.9rem',
                        color: '#FFFFFF',
                        fontWeight: 700,
                        mb: 1.5,
                        textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
                    }}
                >
                    Resumen de estado legal
                </Typography>
                
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}> {/* Reduced gap */}
                    {[
                        { label: 'Completados', value: displayItems.reduce((acc, item) => acc + item.completed, 0), icon: <CheckCircle2 size={12} /> },
                        { label: 'Pendientes', value: displayItems.reduce((acc, item) => acc + (item.total - item.completed), 0), icon: <Clock size={12} /> },
                        { label: 'Total', value: displayItems.reduce((acc, item) => acc + item.total, 0), icon: <AlertCircle size={12} /> }
                    ].map((stat, index) => (
                        <Box 
                            component={motion.div}
                            whileHover={{ 
                                scale: 1.05,
                                boxShadow: '0 8px 20px rgba(0, 204, 136, 0.3)'
                            }}
                            key={index}
                            sx={{
                                flex: '1 0 30%',
                                p: 1.5, // Reduced padding
                                background: 'linear-gradient(135deg, rgba(0, 204, 136, 0.15) 0%, rgba(0, 119, 85, 0.15) 100%)',
                                borderRadius: '8px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: 0.5, // Reduced gap
                                boxShadow: '0 4px 12px rgba(0, 204, 136, 0.15)',
                                border: '1px solid rgba(0, 204, 136, 0.2)',
                                transition: 'all 0.3s ease',
                            }}
                        >
                            <Box sx={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center',
                                width: 32, // Slightly larger
                                height: 32, // Slightly larger
                                borderRadius: '50%',
                                background: 'linear-gradient(135deg, rgba(0, 204, 136, 0.3) 0%, rgba(0, 119, 85, 0.3) 100%)',
                                color: '#00FFAA',
                                boxShadow: '0 0 10px rgba(0, 204, 136, 0.3)',
                            }}>
                                {stat.icon}
                            </Box>
                            <Typography sx={{ 
                                fontSize: '1.3rem', 
                                fontWeight: 700, 
                                color: '#FFFFFF',
                                background: 'linear-gradient(135deg, #00FFAA 0%, #00CC88 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
                            }}>
                                {stat.value}
                            </Typography>
                            <Typography sx={{ fontSize: '0.7rem', color: '#BBBBBB', textAlign: 'center' }}>
                                {stat.label}
                            </Typography>
                        </Box>
                    ))}
                </Box>
                
                <Box sx={{ mt: 2 }}> {/* Slightly increased margin */}
                    <Typography sx={{ fontSize: '0.75rem', color: '#BBBBBB', mb: 0.5, fontWeight: 600 }}>
                        Progreso general
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <LinearProgress
                            variant="determinate"
                            value={overallPercentage}
                            sx={{
                                flex: 1,
                                height: 10, // Thicker progress bar
                                borderRadius: 5,
                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                '& .MuiLinearProgress-bar': {
                                    borderRadius: 5,
                                    background: 'linear-gradient(90deg, #00CC88 0%, #00FFAA 100%)',
                                    boxShadow: '0 0 15px rgba(0, 204, 136, 0.5)',
                                    '&::after': {
                                        content: '""',
                                        position: 'absolute',
                                        top: 0,
                                        right: 0,
                                        width: '10px',
                                        height: '100%',
                                        background: 'rgba(255, 255, 255, 0.8)',
                                        borderRadius: '0 5px 5px 0',
                                        filter: 'blur(3px)',
                                    }
                                },
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    '& .MuiLinearProgress-bar': {
                                        boxShadow: '0 0 20px rgba(0, 204, 136, 0.7)',
                                    }
                                }
                            }}
                        />
                        <Typography sx={{ 
                            fontSize: '1rem', 
                            fontWeight: 700,
                            background: 'linear-gradient(135deg, #00FFAA 0%, #00CC88 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
                        }}>
                            {overallPercentage}%
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Paper>
    );
};