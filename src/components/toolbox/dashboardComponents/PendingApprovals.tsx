import React from 'react';
import { Grid, Paper, Typography, Box, LinearProgress, Tooltip } from '@mui/material';
import { DollarSign, TrendingUp, Clock } from 'lucide-react';

interface PendingApprovalsProps {
    count: number;
}

export const PendingApprovals: React.FC<PendingApprovalsProps> = ({ count }) => {
    // Calculate percentage for progress bar
    const progressPercentage = Math.min((count / 20) * 100, 100);

    return (
        <Grid item xs={12} sm={6} md={6} lg={4}>
            <Paper
                sx={{
                    p: 3,
                    borderRadius: '12px',
                    backgroundColor: 'var(--surface-primary)',
                    transition: 'all 0.3s ease-in-out',
                    minHeight: '200px',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 12px 24px rgba(0, 0, 0, 0.1)',
                    },
                }}
                className="glass-effect"
            >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Box
                        sx={{
                            width: 48,
                            height: 48,
                            borderRadius: '12px',
                            backgroundColor: 'rgba(255, 149, 0, 0.1)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#ff9500',
                            transition: 'transform 0.3s ease',
                            '&:hover': {
                                transform: 'scale(1.1)',
                            },
                        }}
                    >
                        <DollarSign size={24} />
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            backgroundColor: 'rgba(255, 149, 0, 0.1)',
                            borderRadius: '20px',
                            padding: '4px 12px',
                        }}
                    >
                        <Clock size={14} color="#ff9500" />
                        <Typography
                            sx={{
                                fontSize: '0.75rem',
                                color: '#ff9500',
                                fontWeight: 500,
                            }}
                        >
                            Pendientes
                        </Typography>
                    </Box>
                </Box>

                <Box sx={{ mb: 3 }}>
                    <Typography
                        variant="h3"
                        sx={{
                            fontSize: '2.5rem',
                            fontWeight: 600,
                            color: '#ff9500',
                            mb: 1,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                        }}
                    >
                        {count}
                        <TrendingUp size={24} style={{ marginLeft: '8px' }} />
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: '0.875rem',
                            color: 'var(--text-secondary)',
                            maxWidth: '200px',
                            lineHeight: 1.4,
                        }}
                    >
                        Aprobaciones financieras requieren tu atención
                    </Typography>
                </Box>

                <Box sx={{ mt: 'auto' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography
                            sx={{
                                fontSize: '0.75rem',
                                color: 'var(--text-secondary)',
                            }}
                        >
                            Progreso
                        </Typography>
                        <Typography
                            sx={{
                                fontSize: '0.75rem',
                                color: 'var(--text-secondary)',
                            }}
                        >
                            {progressPercentage.toFixed(0)}%
                        </Typography>
                    </Box>
                    <Tooltip title={`${count} aprobaciones pendientes de un total de 20`} arrow>
                        <LinearProgress
                            variant="determinate"
                            value={progressPercentage}
                            sx={{
                                height: 6,
                                borderRadius: 3,
                                backgroundColor: 'rgba(255, 149, 0, 0.1)',
                                '& .MuiLinearProgress-bar': {
                                    backgroundColor: '#ff9500',
                                    borderRadius: 3,
                                },
                            }}
                        />
                    </Tooltip>
                </Box>
            </Paper>
        </Grid>
    );
};