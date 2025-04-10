import React from 'react';
import { Paper, Box, Typography, LinearProgress, Chip } from '@mui/material';
import { TrendingUp, TrendingDown, CheckCircle2, Clock, AlertCircle } from 'lucide-react';

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
            sx={{
                p: 3,
                borderRadius: '12px',
                backgroundColor: '#1E1E1E',
                border: '1px solid #333333',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <Typography
                variant="h6"
                sx={{
                    fontSize: '1.125rem',
                    fontWeight: 600,
                    color: '#00CC88',
                    mb: 2, // Reduced margin
                }}
            >
                BALANCE LEGAL
            </Typography>

            {/* Overall progress indicator */}
            <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                    <Typography sx={{ fontSize: '0.8rem', color: '#BBBBBB', mb: 0.5 }}>
                        Progreso general
                    </Typography>
                    <Typography sx={{ fontSize: '1.25rem', fontWeight: 600, color: '#FFFFFF' }}>
                        {overallPercentage}%
                    </Typography>
                </Box>
                <Chip
                    icon={getStatusIcon(getStatus(totalCompleted, totalItems))}
                    label={totalCompleted} 
                    sx={{ 
                        backgroundColor: 'rgba(0, 204, 136, 0.2)',
                        color: '#00CC88',
                        border: '1px solid rgba(0, 204, 136, 0.3)',
                        '& .MuiChip-icon': {
                            color: '#00CC88'
                        },
                        height: '24px', // Smaller height
                        '& .MuiChip-label': {
                            fontSize: '0.75rem',
                            padding: '0 8px',
                        }
                    }}
                />
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1 }}> {/* Reduced gap */}
                {displayItems.map((item, index) => (
                    <Box key={index}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}> {/* Reduced margin */}
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: '#FFFFFF',
                                        fontWeight: 500,
                                        fontSize: '0.8rem', // Smaller font
                                    }}
                                >
                                    {item.category}
                                </Typography>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 0.5,
                                        color: '#00CC88',
                                        fontSize: '0.7rem', // Smaller font
                                    }}
                                >
                                    {item.growth >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                                    {Math.abs(item.growth)}%
                                </Box>
                            </Box>
                            <Typography
                                variant="body2"
                                sx={{
                                    color: '#BBBBBB',
                                    fontSize: '0.8rem', // Smaller font
                                }}
                            >
                                {item.completed}/{item.total}
                            </Typography>
                        </Box>
                        <LinearProgress
                            variant="determinate"
                            value={(item.completed / item.total) * 100}
                            sx={{
                                height: 5, // Thinner progress bar
                                borderRadius: 3,
                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                '& .MuiLinearProgress-bar': {
                                    backgroundColor: '#00CC88',
                                    borderRadius: 3,
                                },
                            }}
                        />
                    </Box>
                ))}
            </Box>

            {/* Additional details section - more compact */}
            <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid #333333' }}>
                <Typography
                    variant="subtitle2"
                    sx={{
                        fontSize: '0.8rem',
                        color: '#FFFFFF',
                        fontWeight: 600,
                        mb: 1.5,
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
                            key={index}
                            sx={{
                                flex: '1 0 30%',
                                p: 1.5, // Reduced padding
                                backgroundColor: 'rgba(0, 204, 136, 0.1)',
                                borderRadius: '8px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: 0.5, // Reduced gap
                            }}
                        >
                            <Box sx={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center',
                                width: 28, // Smaller size
                                height: 28, // Smaller size
                                borderRadius: '50%',
                                backgroundColor: 'rgba(0, 204, 136, 0.2)',
                                color: '#00CC88'
                            }}>
                                {stat.icon}
                            </Box>
                            <Typography sx={{ fontSize: '1.1rem', fontWeight: 600, color: '#FFFFFF' }}>
                                {stat.value}
                            </Typography>
                            <Typography sx={{ fontSize: '0.7rem', color: '#BBBBBB', textAlign: 'center' }}>
                                {stat.label}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            </Box>
        </Paper>
    );
};