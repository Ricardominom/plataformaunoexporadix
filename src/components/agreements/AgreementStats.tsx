import React from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { Clock, AlertCircle, CheckCircle2, FileText } from 'lucide-react';

interface StatsProps {
    counts: {
        not_started: number;
        in_progress: number;
        stuck: number;
        sj_review: number;
        completed: number;
    };
}

export const AgreementStats: React.FC<StatsProps> = ({ counts }) => {
    const stats = [
        {
            label: 'Sin comenzar',
            value: counts.not_started,
            icon: Clock,
            color: 'var(--text-primary)',
            bgColor: 'rgba(0, 0, 0, 0.04)',
        },
        {
            label: 'En proceso',
            value: counts.in_progress,
            icon: Clock,
            color: '#0071e3',
            bgColor: 'rgba(0, 113, 227, 0.1)',
        },
        {
            label: 'Estancado',
            value: counts.stuck,
            icon: AlertCircle,
            color: '#ff2d55',
            bgColor: 'rgba(255, 45, 85, 0.1)',
        },
        {
            label: 'Para revisión',
            value: counts.sj_review,
            icon: FileText,
            color: '#ff9500',
            bgColor: 'rgba(255, 149, 0, 0.1)',
        },
        {
            label: 'Completado',
            value: counts.completed,
            icon: CheckCircle2,
            color: '#30d158',
            bgColor: 'rgba(48, 209, 88, 0.1)',
        },
    ];

    return (
        <Grid container spacing={2}>
            {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                    <Grid item xs={12} sm={6} md={2.4} key={stat.label}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                            <Paper
                                sx={{
                                    p: 2,
                                    height: '100%',
                                    backgroundColor: 'var(--surface-primary)',
                                    borderRadius: '12px',
                                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                                    '&:hover': {
                                        transform: 'translateY(-4px)',
                                        boxShadow: '0 12px 20px rgba(0, 0, 0, 0.1)',
                                    },
                                }}
                                className="glass-effect"
                            >
                                <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                                    <Box>
                                        <Typography
                                            variant="h4"
                                            sx={{
                                                fontSize: '1.5rem',
                                                fontWeight: 600,
                                                color: stat.color,
                                                mb: 1,
                                            }}
                                        >
                                            {stat.value}
                                        </Typography>
                                        <Typography
                                            sx={{
                                                fontSize: '0.875rem',
                                                color: 'var(--text-secondary)',
                                                fontWeight: 500,
                                            }}
                                        >
                                            {stat.label}
                                        </Typography>
                                    </Box>
                                    <Box
                                        sx={{
                                            width: 40,
                                            height: 40,
                                            borderRadius: '10px',
                                            backgroundColor: stat.bgColor,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: stat.color,
                                        }}
                                    >
                                        <Icon size={20} />
                                    </Box>
                                </Box>
                            </Paper>
                        </motion.div>
                    </Grid>
                );
            })}
        </Grid>
    );
};