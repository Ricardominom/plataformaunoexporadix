import React from 'react';
import { Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box, LinearProgress, Tooltip } from '@mui/material';
import { TrendingUp, TrendingDown, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../../../context/ThemeContext';

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
    const { theme } = useTheme();
    const isDarkMode = theme === 'dark';
    
    // Define theme-dependent colors
    const accentColor = isDarkMode ? '#00CC88' : '#0071e3';
    const accentColorLight = isDarkMode ? '#00FFAA' : '#40a9ff';
    const accentGradient = isDarkMode 
        ? 'linear-gradient(135deg, #00FFAA 0%, #00CC88 100%)' 
        : 'linear-gradient(135deg, #40a9ff 0%, #0071e3 100%)';
    const bgColor = isDarkMode ? '#1E1E1E' : '#FFFFFF';
    const borderColor = isDarkMode ? '#333333' : 'rgba(0, 0, 0, 0.1)';
    const textPrimary = isDarkMode ? '#FFFFFF' : '#1d1d1f';
    const textSecondary = isDarkMode ? '#BBBBBB' : '#86868b';
    

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
                return <Clock size={14} color={isDarkMode ? "#00FFAA" : accentColorLight} />;
            case 'delayed':
                return <AlertCircle size={14} color={isDarkMode ? "#00FFAA" : accentColorLight} />;
            default:
                return null;
        }
    };

    return (
        <Paper
            component={motion.div}
            whileHover={{ 
                boxShadow: `0 15px 35px ${accentColor}25`
            }}
            sx={{
                p: 3,
                borderRadius: '12px',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                background: isDarkMode 
                    ? 'linear-gradient(135deg, #1E1E1E 0%, #252525 100%)' 
                    : 'linear-gradient(135deg, #FFFFFF 0%, #F8F8F8 100%)',
                position: 'relative',
                border: `1px solid ${accentColor}`,
                boxShadow: `0 8px 24px ${accentColor}25`,
                transition: 'background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '6px',
                    background: `linear-gradient(90deg, ${accentColor} 0%, ${accentColorLight} 100%)`,
                    boxShadow: `0 0 20px ${accentColor}50`,
                    transition: 'background 0.3s ease, box-shadow 0.3s ease',
                },
                '&::after': {
                    content: '""',
                    position: 'absolute',
                    top: 6,
                    left: 0,
                    right: 0,
                    height: '1px',
                    background: `linear-gradient(90deg, ${accentColor}50 0%, ${accentColorLight}50 50%, ${accentColor}50 100%)`,
                    transition: 'background 0.3s ease',
                }
            }}
        >
            <Typography
                variant="h6"
                sx={{
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    mb: 2, // Reduced margin
                    background: isDarkMode 
                        ? 'linear-gradient(135deg, #00FFAA 0%, #007755 100%)' : accentGradient,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                    transition: 'background 0.3s ease'
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
                        background: isDarkMode ? 'rgba(0, 204, 136, 0.5)' : `${accentColor}50`,
                        borderRadius: '3px',
                        transition: 'background 0.3s ease',
                    },
                }}
            >
                <Table size="small">
                    <TableHead>
                        <TableRow sx={{ 
                            background: isDarkMode 
                                ? 'linear-gradient(180deg, rgba(0, 204, 136, 0.1) 0%, rgba(0, 0, 0, 0) 100%)'
                                : `linear-gradient(180deg, ${accentColor}10 0%, rgba(255, 255, 255, 0) 100%)`,
                            transition: 'background 0.3s ease',
                        }}>
                            <TableCell>
                                <Typography sx={{
                                    color: textSecondary,
                                    fontSize: '0.8rem', // Smaller font
                                    fontWeight: 600,
                                    transition: 'color 0.3s ease',
                                }}>
                                    Indicador
                                </Typography>
                            </TableCell>
                            <TableCell align="right">
                                <Typography sx={{
                                    color: textSecondary,
                                    fontSize: '0.8rem', // Smaller font
                                    fontWeight: 600,
                                    transition: 'color 0.3s ease',
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
                                    backgroundColor: isDarkMode ? 'rgba(0, 204, 136, 0.1)' : `${accentColor}10`,
                                    transition: { duration: 0.2 }
                                }}
                                sx={{
                                    transition: 'background-color 0.2s ease',
                                    height: '45px', // Slightly taller rows
                                    '&:nth-of-type(odd)': {
                                        backgroundColor: isDarkMode ? 'rgba(0, 204, 136, 0.05)' : `${accentColor}05`,
                                        transition: 'background-color 0.3s ease',
                                    }
                                }}
                            >
                                <TableCell>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                                        <Typography sx={{
                                            color: textPrimary,
                                            fontSize: '0.85rem', // Slightly larger
                                            fontWeight: 600,
                                            transition: 'color 0.3s ease',
                                        }}>
                                            {plan.indicator}
                                        </Typography>
                                        <LinearProgress
                                            variant="determinate"
                                            value={plan.progress}
                                            sx={{
                                                height: 5, // Slightly thicker
                                                borderRadius: 2.5,
                                                backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                                                '& .MuiLinearProgress-bar': {
                                                    borderRadius: 2.5,
                                                    background: isDarkMode 
                                                        ? 'linear-gradient(90deg, #00CC88 0%, #00FFAA 100%)'
                                                        : `linear-gradient(90deg, ${accentColor} 0%, ${accentColorLight} 100%)`,
                                                    boxShadow: isDarkMode ? '0 0 10px rgba(0, 204, 136, 0.4)' : `0 0 10px ${accentColor}40`,
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
                                                transition: 'all 0.3s ease, background-color 0.3s ease',
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
                                                background: isDarkMode 
                                                    ? 'linear-gradient(90deg, rgba(0, 204, 136, 0.3) 0%, rgba(0, 255, 170, 0.3) 100%)'
                                                    : `linear-gradient(90deg, ${accentColor}30 0%, ${accentColorLight}30 100%)`,
                                                boxShadow: isDarkMode ? '0 2px 8px rgba(0, 204, 136, 0.2)' : `0 2px 8px ${accentColor}20`,
                                                border: isDarkMode ? '1px solid rgba(0, 204, 136, 0.3)' : `1px solid ${accentColor}30`,
                                                transition: 'background 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
                                            }}
                                        >
                                            <Box
                                                component={plan.achieved >= plan.goal ? TrendingUp : TrendingDown}
                                                sx={{
                                                    color: isDarkMode ? '#00FFAA' : accentColorLight,
                                                    size: 12, // Smaller icon
                                                    mr: 0.5,
                                                    transition: 'color 0.3s ease',
                                                }}
                                            />
                                            <Typography sx={{
                                                fontSize: '0.85rem', // Slightly larger
                                                fontWeight: 700,
                                                background: accentGradient,
                                                WebkitBackgroundClip: 'text',
                                                WebkitTextFillColor: 'transparent',
                                                textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
                                                transition: 'background 0.3s ease',
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
                borderTop: isDarkMode ? '1px solid rgba(0, 204, 136, 0.3)' : `1px solid ${accentColor}30`,
                background: isDarkMode 
                    ? 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 204, 136, 0.15) 100%)'
                    : `linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, ${accentColor}15 100%)`,
                transition: 'border-color 0.3s ease, background 0.3s ease',
            }}>
                <Typography
                    variant="subtitle2"
                    sx={{
                        fontSize: '0.9rem',
                        color: textPrimary,
                        fontWeight: 700,
                        mb: 1.5,
                        textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
                        transition: 'color 0.3s ease',
                    }}
                >
                    Resumen de avance
                </Typography>
                
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}> {/* Reduced gap */}
                    {[
                        { 
                            label: 'Completados', 
                            value: plans.filter(p => p.progress === 100).length, 
                            icon: <CheckCircle2 size={12} />, 
                            gradient: isDarkMode 
                                ? 'linear-gradient(135deg, #00FFAA 0%, #00CC88 100%)'
                                : `linear-gradient(135deg, ${accentColorLight} 0%, ${accentColor} 100%)`
                        },
                        { 
                            label: 'En progreso', 
                            value: plans.filter(p => p.progress > 0 && p.progress < 100).length, 
                            icon: <Clock size={12} />, 
                            gradient: isDarkMode 
                                ? 'linear-gradient(135deg, #00CCAA 0%, #00AA88 100%)'
                                : `linear-gradient(135deg, #40a9ff 0%, #096dd9 100%)`
                        },
                        { 
                            label: 'Sin iniciar', 
                            value: plans.filter(p => p.progress === 0).length, 
                            icon: <AlertCircle size={12} />, 
                            gradient: isDarkMode 
                                ? 'linear-gradient(135deg, #00CC88 0%, #007755 100%)'
                                : `linear-gradient(135deg, #0071e3 0%, #003a8c 100%)`
                        }
                    ].map((stat, index) => (
                        <Box 
                            component={motion.div}
                            whileHover={{ 
                                scale: 1.05,
                                boxShadow: isDarkMode ? '0 8px 20px rgba(0, 204, 136, 0.3)' : `0 8px 20px ${accentColor}30`
                            }}
                            key={index}
                            sx={{
                                flex: '1 0 30%',
                                p: 1.5, // Reduced padding
                                background: isDarkMode 
                                    ? 'linear-gradient(135deg, rgba(0, 204, 136, 0.15) 0%, rgba(0, 255, 170, 0.15) 100%)'
                                    : `linear-gradient(135deg, ${accentColor}15 0%, ${accentColorLight}15 100%)`,
                                borderRadius: '8px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: 0.5, // Reduced gap
                                boxShadow: isDarkMode ? '0 4px 12px rgba(0, 204, 136, 0.15)' : `0 4px 12px ${accentColor}15`, 
                                border: isDarkMode ? '1px solid rgba(0, 204, 136, 0.2)' : `1px solid ${accentColor}20`,
                                transition: 'all 0.3s ease, background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
                            }}
                        >
                            <Box sx={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center',
                                width: 32, // Slightly larger
                                height: 32, // Slightly larger
                                borderRadius: '50%',
                                background: isDarkMode 
                                    ? 'linear-gradient(135deg, rgba(0, 204, 136, 0.3) 0%, rgba(0, 255, 170, 0.3) 100%)'
                                    : `linear-gradient(135deg, ${accentColor}30 0%, ${accentColorLight}30 100%)`,
                                color: isDarkMode ? '#00FFAA' : accentColorLight,
                                boxShadow: isDarkMode ? '0 0 10px rgba(0, 204, 136, 0.3)' : `0 0 10px ${accentColor}30`,
                                transition: 'background 0.3s ease, color 0.3s ease, box-shadow 0.3s ease',
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
                                transition: 'background 0.3s ease',
                            }}>
                                {stat.value}
                            </Typography>
                            <Typography sx={{ fontSize: '0.7rem', color: textSecondary, textAlign: 'center', fontWeight: 500, transition: 'color 0.3s ease' }}>
                                {stat.label}
                            </Typography>
                        </Box>
                    ))}
                </Box>
                
                <Box sx={{ mt: 2 }}> {/* Slightly increased margin */}
                    <Typography sx={{ fontSize: '0.8rem', color: textSecondary, mb: 0.5, fontWeight: 600, transition: 'color 0.3s ease' }}>
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
                                backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                                '& .MuiLinearProgress-bar': {
                                    borderRadius: 5,
                                    background: isDarkMode 
                                        ? 'linear-gradient(90deg, #00CC88 0%, #00FFAA 50%, #00CCAA 100%)'
                                        : `linear-gradient(90deg, ${accentColor} 0%, ${accentColorLight} 50%, ${accentColor} 100%)`,
                                    boxShadow: isDarkMode ? '0 0 15px rgba(0, 204, 136, 0.5)' : `0 0 15px ${accentColor}50`,
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
                                transition: 'all 0.3s ease, background-color 0.3s ease',
                                '&:hover': {
                                    '& .MuiLinearProgress-bar': {
                                        boxShadow: isDarkMode ? '0 0 20px rgba(0, 204, 136, 0.7)' : `0 0 20px ${accentColor}70`,
                                    }
                                }
                            }}
                        />
                        <Typography sx={{ 
                            fontSize: '1rem', 
                            fontWeight: 700,
                            background: accentGradient,
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
                            transition: 'background 0.3s ease',
                        }}>
                            {Math.round(plans.reduce((acc, plan) => acc + plan.progress, 0) / plans.length)}%
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Paper>
    );
};