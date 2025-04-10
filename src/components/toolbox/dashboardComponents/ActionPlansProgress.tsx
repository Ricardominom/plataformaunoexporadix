import React from 'react';
import { Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box, LinearProgress, Tooltip } from '@mui/material';
import { TrendingUp, TrendingDown, CheckCircle2, Clock, AlertCircle } from 'lucide-react';

interface ActionPlan {
    indicator: string;
    goal: number;
    achieved: number;
    progress: number;
}

interface ActionPlansProgressProps {
    plans: ActionPlan[];
}

export const ActionPlansProgress: React.FC<ActionPlansProgressProps> = ({ plans }) => {
    // Function to get status based on progress
    const getStatus = (progress: number) => {
        if (progress === 100) return 'completed';
        if (progress >= 50) return 'in_progress';
        return 'delayed';
    };

    // Function to get status icon
    const getStatusIcon = (progress: number) => {
        const status = getStatus(progress);
        switch (status) {
            case 'completed':
                return <CheckCircle2 size={14} color="#00CC88" />;
            case 'in_progress':
                return <Clock size={14} color="#00CC88" />;
            case 'delayed':
                return <AlertCircle size={14} color="#00CC88" />;
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
                AVANCE DE PLANES DE ACCIÓN
            </Typography>

            <TableContainer sx={{ flex: 1, overflowY: 'auto', maxHeight: '180px' }}> {/* Set max height */}
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <Typography sx={{
                                    color: '#BBBBBB',
                                    fontSize: '0.8rem', // Smaller font
                                    fontWeight: 500,
                                }}>
                                    Indicador
                                </Typography>
                            </TableCell>
                            <TableCell align="right">
                                <Typography sx={{
                                    color: '#BBBBBB',
                                    fontSize: '0.8rem', // Smaller font
                                    fontWeight: 500,
                                }}>
                                    % avance
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {plans.map((plan, index) => (
                            <TableRow
                                key={index}
                                sx={{
                                    transition: 'background-color 0.2s ease',
                                    '&:hover': {
                                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                    },
                                    height: '40px', // Fixed height for rows
                                }}
                            >
                                <TableCell>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                                        <Typography sx={{
                                            color: '#FFFFFF',
                                            fontSize: '0.8rem', // Smaller font
                                            fontWeight: 500,
                                        }}>
                                            {plan.indicator}
                                        </Typography>
                                        <LinearProgress
                                            variant="determinate"
                                            value={plan.progress}
                                            sx={{
                                                height: 3, // Thinner progress bar
                                                borderRadius: 2,
                                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                                '& .MuiLinearProgress-bar': {
                                                    backgroundColor: '#00CC88',
                                                    borderRadius: 2,
                                                },
                                            }}
                                        />
                                    </Box>
                                </TableCell>
                                <TableCell align="right">
                                    <Tooltip
                                        title={`Meta: ${plan.goal} | Realizado: ${plan.achieved}`}
                                        arrow
                                        placement="left"
                                    >
                                        <Box
                                            sx={{
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                px: 1.5,
                                                py: 0.5,
                                                borderRadius: '12px',
                                                backgroundColor: 'rgba(0, 204, 136, 0.2)',
                                            }}
                                        >
                                            <Box
                                                component={plan.achieved >= plan.goal ? TrendingUp : TrendingDown}
                                                sx={{
                                                    color: '#00CC88',
                                                    size: 12, // Smaller icon
                                                    mr: 0.5,
                                                }}
                                            />
                                            <Typography sx={{
                                                color: '#00CC88',
                                                fontSize: '0.8rem', // Smaller font
                                                fontWeight: 600,
                                            }}>
                                                {plan.progress}%
                                            </Typography>
                                        </Box>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

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
                    Resumen de avance
                </Typography>
                
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}> {/* Reduced gap */}
                    {[
                        { label: 'Completados', value: plans.filter(p => p.progress === 100).length, icon: <CheckCircle2 size={12} /> },
                        { label: 'En progreso', value: plans.filter(p => p.progress > 0 && p.progress < 100).length, icon: <Clock size={12} /> },
                        { label: 'Sin iniciar', value: plans.filter(p => p.progress === 0).length, icon: <AlertCircle size={12} /> }
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
                
                <Box sx={{ mt: 1.5 }}> {/* Reduced margin */}
                    <Typography sx={{ fontSize: '0.75rem', color: '#BBBBBB', mb: 0.5 }}>
                        Progreso general
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <LinearProgress
                            variant="determinate"
                            value={plans.reduce((acc, plan) => acc + plan.progress, 0) / plans.length}
                            sx={{
                                flex: 1,
                                height: 6,
                                borderRadius: 4,
                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                '& .MuiLinearProgress-bar': {
                                    backgroundColor: '#00CC88',
                                    borderRadius: 4,
                                },
                            }}
                        />
                        <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, color: '#00CC88' }}>
                            {Math.round(plans.reduce((acc, plan) => acc + plan.progress, 0) / plans.length)}%
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Paper>
    );
};