import React from 'react';
import { Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box, LinearProgress, Tooltip } from '@mui/material';
import { TrendingUp, TrendingDown, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

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
                return <CheckCircle2 size={14} color="#00FFAA" />;
            case 'in_progress':
                return <Clock size={14} color="#00FFAA" />;
            case 'delayed':
                return <AlertCircle size={14} color="#00FFAA" />;
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
                    background: 'linear-gradient(90deg, #00CC88 0%, #00FFAA 50%, #00CCAA 100%)',
                    boxShadow: '0 0 20px rgba(0, 204, 136, 0.5)',
                },
                '&::after': {
                    content: '""',
                    position: 'absolute',
                    top: 6,
                    left: 0,
                    right: 0,
                    height: '1px',
                    background: 'linear-gradient(90deg, rgba(0, 204, 136, 0.5) 0%, rgba(0, 255, 170, 0.5) 50%, rgba(0, 204, 136, 0.5) 100%)',
                }
            }}
        >
            <Typography
                variant="h6"
                sx={{
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    mb: 2, // Reduced margin
                    background: 'linear-gradient(135deg, #00FFAA 0%, #00CCAA 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                }}
            >
                AVANCE DE PLANES DE ACCIÓN
            </Typography>

            <TableContainer 
                sx={{ 
                    flex: 1, 
                    overflowY: 'auto', 
                    maxHeight: '180px',
                    '&::-webkit-scrollbar': {
                        width: '6px',
                    },
                    '&::-webkit-scrollbar-track': {
                        background: 'rgba(0, 0, 0, 0.1)',
                        borderRadius: '3px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        background: 'rgba(0, 204, 136, 0.5)',
                        borderRadius: '3px',
                    },
                }}
            >
                <Table size="small">
                    <TableHead>
                        <TableRow sx={{ 
                            background: 'linear-gradient(180deg, rgba(0, 204, 136, 0.1) 0%, rgba(0, 0, 0, 0) 100%)',
                        }}>
                            <TableCell>
                                <Typography sx={{
                                    color: '#BBBBBB',
                                    fontSize: '0.8rem', // Smaller font
                                    fontWeight: 600,
                                }}>
                                    Indicador
                                </Typography>
                            </TableCell>
                            <TableCell align="right">
                                <Typography sx={{
                                    color: '#BBBBBB',
                                    fontSize: '0.8rem', // Smaller font
                                    fontWeight: 600,
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
                                component={motion.tr}
                                whileHover={{ 
                                    backgroundColor: 'rgba(0, 204, 136, 0.1)',
                                    transition: { duration: 0.2 }
                                }}
                                sx={{
                                    transition: 'background-color 0.2s ease',
                                    height: '45px', // Slightly taller rows
                                    '&:nth-of-type(odd)': {
                                        backgroundColor: 'rgba(0, 204, 136, 0.05)',
                                    }
                                }}
                            >
                                <TableCell>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                                        <Typography sx={{
                                            color: '#FFFFFF',
                                            fontSize: '0.85rem', // Slightly larger
                                            fontWeight: 600,
                                        }}>
                                            {plan.indicator}
                                        </Typography>
                                        <LinearProgress
                                            variant="determinate"
                                            value={plan.progress}
                                            sx={{
                                                height: 5, // Slightly thicker
                                                borderRadius: 2.5,
                                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                                '& .MuiLinearProgress-bar': {
                                                    borderRadius: 2.5,
                                                    background: 'linear-gradient(90deg, #00CC88 0%, #00FFAA 100%)',
                                                    boxShadow: '0 0 10px rgba(0, 204, 136, 0.4)',
                                                    '&::after': {
                                                        content: '""',
                                                        position: 'absolute',
                                                        top: 0,
                                                        right: 0,
                                                        width: '5px',
                                                        height: '100%',
                                                        background: 'rgba(255, 255, 255, 0.8)',
                                                        borderRadius: '0 2.5px 2.5px 0',
                                                        filter: 'blur(2px)',
                                                    }
                                                },
                                                transition: 'all 0.3s ease',
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
                                            component={motion.div}
                                            whileHover={{ scale: 1.1 }}
                                            sx={{
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                px: 1.5,
                                                py: 0.5,
                                                borderRadius: '12px',
                                                background: 'linear-gradient(90deg, rgba(0, 204, 136, 0.3) 0%, rgba(0, 255, 170, 0.3) 100%)',
                                                boxShadow: '0 2px 8px rgba(0, 204, 136, 0.2)',
                                                border: '1px solid rgba(0, 204, 136, 0.3)',
                                            }}
                                        >
                                            <Box
                                                component={plan.achieved >= plan.goal ? TrendingUp : TrendingDown}
                                                sx={{
                                                    color: '#00FFAA',
                                                    size: 12, // Smaller icon
                                                    mr: 0.5,
                                                }}
                                            />
                                            <Typography sx={{
                                                fontSize: '0.85rem', // Slightly larger
                                                fontWeight: 700,
                                                background: 'linear-gradient(135deg, #00FFAA 0%, #00CC88 100%)',
                                                WebkitBackgroundClip: 'text',
                                                WebkitTextFillColor: 'transparent',
                                                textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
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
                    Resumen de avance
                </Typography>
                
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}> {/* Reduced gap */}
                    {[
                        { label: 'Completados', value: plans.filter(p => p.progress === 100).length, icon: <CheckCircle2 size={12} />, gradient: 'linear-gradient(135deg, #00FFAA 0%, #00CC88 100%)' },
                        { label: 'En progreso', value: plans.filter(p => p.progress > 0 && p.progress < 100).length, icon: <Clock size={12} />, gradient: 'linear-gradient(135deg, #00CCAA 0%, #00AA88 100%)' },
                        { label: 'Sin iniciar', value: plans.filter(p => p.progress === 0).length, icon: <AlertCircle size={12} />, gradient: 'linear-gradient(135deg, #00CC88 0%, #007755 100%)' }
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
                                background: 'linear-gradient(135deg, rgba(0, 204, 136, 0.15) 0%, rgba(0, 255, 170, 0.15) 100%)',
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
                                background: 'linear-gradient(135deg, rgba(0, 204, 136, 0.3) 0%, rgba(0, 255, 170, 0.3) 100%)',
                                color: '#00FFAA',
                                boxShadow: '0 0 10px rgba(0, 204, 136, 0.3)',
                            }}>
                                {stat.icon}
                            </Box>
                            <Typography sx={{ 
                                fontSize: '1.3rem', 
                                fontWeight: 700,
                                background: stat.gradient,
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
                            }}>
                                {stat.value}
                            </Typography>
                            <Typography sx={{ fontSize: '0.7rem', color: '#BBBBBB', textAlign: 'center', fontWeight: 500 }}>
                                {stat.label}
                            </Typography>
                        </Box>
                    ))}
                </Box>
                
                <Box sx={{ mt: 2 }}> {/* Slightly increased margin */}
                    <Typography sx={{ fontSize: '0.8rem', color: '#BBBBBB', mb: 0.5, fontWeight: 600 }}>
                        Progreso general
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <LinearProgress
                            variant="determinate"
                            value={plans.reduce((acc, plan) => acc + plan.progress, 0) / plans.length}
                            sx={{
                                flex: 1,
                                height: 10, // Thicker progress bar
                                borderRadius: 5,
                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                '& .MuiLinearProgress-bar': {
                                    borderRadius: 5,
                                    background: 'linear-gradient(90deg, #00CC88 0%, #00FFAA 50%, #00CCAA 100%)',
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
                            {Math.round(plans.reduce((acc, plan) => acc + plan.progress, 0) / plans.length)}%
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Paper>
    );
};