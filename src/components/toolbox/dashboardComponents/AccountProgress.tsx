import React from 'react';
import { Paper, Typography, Box, Grid, Tooltip } from '@mui/material';
import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext';

interface AccountProgressData {
    name: string;
    progress: {
        estrategia: number;
        setup: number;
        acompanamiento: number;
        gerencia: number;
        produccion: number;
        difusion: number;
    };
}

interface AccountProgressProps {
    accounts: AccountProgressData[];
}

export const AccountProgress: React.FC<AccountProgressProps> = ({ accounts }) => {
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

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { 
            y: 0, 
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 12
            }
        }
    };

    // Calculate total progress for each account
    const calculateTotalProgress = (progress: AccountProgressData['progress']) => {
        const values = Object.values(progress);
        return Math.round(values.reduce((a, b) => a + b, 0) / values.length);
    };

    // Create a detailed breakdown of progress values
    const getProgressDetails = (account: AccountProgressData) => {
        return Object.entries(account.progress).map(([key, value]) => {
            const label = key.charAt(0).toUpperCase() + key.slice(1);
            return { label, value };
        });
    };

    // Function to render doughnut chart
    const renderDoughnutChart = (percentage: number, size: number = 100, color: string = accentColor, trackColor: string = 'rgba(255, 255, 255, 0.1)') => {
        const strokeWidth = size * 0.1;
        const radius = (size - strokeWidth) / 2;
        const circumference = 2 * Math.PI * radius;
        const strokeDashoffset = circumference - (percentage / 100) * circumference;
        
        return (
            <Box sx={{ position: 'relative', width: size, height: size }}>
                {/* Background circle */}
                <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
                    <circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        fill="transparent"
                        stroke={trackColor}
                        strokeWidth={strokeWidth}
                    />
                    {/* Progress circle */}
                    <motion.circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        fill="transparent"
                        stroke={color}
                        strokeWidth={strokeWidth}
                        strokeDasharray={circumference}
                        initial={{ strokeDashoffset: circumference }}
                        animate={{ strokeDashoffset }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        strokeLinecap="round"
                        filter="drop-shadow(0 0 8px rgba(0, 204, 136, 0.5))"
                    />
                </svg>
                {/* Percentage text in the middle */}
                <Box sx={{ 
                    position: 'absolute', 
                    top: 0, 
                    left: 0, 
                    right: 0, 
                    bottom: 0, 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    flexDirection: 'column'
                }}>
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                    >
                        <Typography sx={{ 
                            fontSize: size * 0.22, 
                            fontWeight: 700, 
                            background: accentGradient,
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
                            transition: 'background 0.3s ease',
                        }}>
                            {percentage}%
                        </Typography>
                    </motion.div>
                </Box>
            </Box>
        );
    };

    return (
        <Paper
            component={motion.div}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
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
                overflow: 'hidden',
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
                '&:hover': {
                    boxShadow: `0 12px 30px ${accentColor}40`,
                    transition: 'box-shadow 0.3s ease',
                }
            }}
        >
            <Typography
                variant="h6"
                sx={{
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    mb: 2,
                    background: accentGradient,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                    transition: 'background 0.3s ease',
                }}
            >
                AVANCE DE CUENTAS
            </Typography>
            
            <Box sx={{ flex: 1, overflow: 'auto' }}>
                <Grid container spacing={3}>
                    {accounts.map((account, index) => (
                        <Grid item xs={12} key={index}>
                            <motion.div variants={itemVariants}>
                                <Box sx={{ mb: 2 }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                fontSize: '1.1rem',
                                                fontWeight: 600,
                                                color: textPrimary,
                                                textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
                                                transition: 'color 0.3s ease',
                                            }}
                                        >
                                            {account.name}
                                        </Typography>
                                        <Box sx={{ 
                                            display: 'flex', 
                                            alignItems: 'center', 
                                            gap: 1,
                                            background: isDarkMode 
                                                ? 'linear-gradient(135deg, rgba(0, 204, 136, 0.3) 0%, rgba(0, 204, 170, 0.3) 100%)'
                                                : 'linear-gradient(135deg, rgba(0, 113, 227, 0.3) 0%, rgba(64, 169, 255, 0.3) 100%)',
                                            px: 1.5,
                                            py: 0.5,
                                            borderRadius: '12px',
                                            boxShadow: isDarkMode 
                                                ? '0 2px 8px rgba(0, 204, 136, 0.2)'
                                                : '0 2px 8px rgba(0, 113, 227, 0.2)',
                                            transition: 'background 0.3s ease, box-shadow 0.3s ease',
                                        }}>
                                            <TrendingUp size={14} color={accentColorLight} />
                                            <Typography sx={{ 
                                                fontSize: '0.8rem', 
                                                fontWeight: 700, 
                                                background: accentGradient,
                                                WebkitBackgroundClip: 'text',
                                                WebkitTextFillColor: 'transparent',
                                                textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
                                                transition: 'background 0.3s ease',
                                            }}>
                                                {calculateTotalProgress(account.progress)}% promedio
                                            </Typography>
                                        </Box>
                                    </Box>
                                    
                                    <Grid container spacing={2}>
                                        {getProgressDetails(account).map((detail, i) => (
                                            <Grid item xs={6} sm={4} md={2} key={i}>
                                                <Tooltip 
                                                    title={`${detail.label}: ${detail.value}%`} 
                                                    arrow 
                                                    placement="top"
                                                >
                                                    <Box 
                                                        component={motion.div}
                                                        whileHover={{ scale: 1.05 }}
                                                        sx={{ 
                                                            display: 'flex', 
                                                            flexDirection: 'column', 
                                                            alignItems: 'center',
                                                            cursor: 'pointer',
                                                            p: 1,
                                                            borderRadius: '8px',
                                                            transition: 'all 0.2s ease',
                                                            '&:hover': {
                                                                background: isDarkMode 
                                                                    ? 'rgba(0, 204, 136, 0.1)'
                                                                    : 'rgba(0, 113, 227, 0.1)',
                                                                transition: 'background 0.3s ease',
                                                            }
                                                        }}
                                                    >
                                                        {renderDoughnutChart(
                                                            detail.value, 
                                                            80, 
                                                            `hsl(${(i * 30) % 360}, 100%, 70%)`,
                                                            'rgba(255, 255, 255, 0.1)'
                                                        )}
                                                        <Typography
                                                            sx={{
                                                                fontSize: '0.8rem',
                                                                color: textPrimary,
                                                                mt: 1,
                                                                fontWeight: 500,
                                                                textAlign: 'center',
                                                                transition: 'color 0.3s ease',
                                                            }}
                                                        >
                                                            {detail.label}
                                                        </Typography>
                                                    </Box>
                                                </Tooltip>
                                            </Grid>
                                        ))}
                                    </Grid>
                                </Box>
                                
                                {index < accounts.length - 1 && (
                                    <Box 
                                        sx={{ 
                                            height: '1px', 
                                            background: isDarkMode 
                                                ? 'linear-gradient(90deg, rgba(0, 204, 136, 0.1) 0%, rgba(0, 204, 136, 0.5) 50%, rgba(0, 204, 136, 0.1) 100%)'
                                                : 'linear-gradient(90deg, rgba(0, 113, 227, 0.1) 0%, rgba(0, 113, 227, 0.5) 50%, rgba(0, 113, 227, 0.1) 100%)',
                                            my: 2,
                                            transition: 'background 0.3s ease',
                                        }} 
                                    />
                                )}
                            </motion.div>
                        </Grid>
                    ))}
                </Grid>
            </Box>
            
            {/* Summary section */}
            <Box sx={{ 
                mt: 2, 
                pt: 2, 
                borderTop: isDarkMode 
                    ? '1px solid rgba(0, 204, 136, 0.3)'
                    : '1px solid rgba(0, 113, 227, 0.3)',
                background: isDarkMode 
                    ? 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 204, 136, 0.1) 100%)'
                    : 'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 113, 227, 0.1) 100%)',
                transition: 'border-color 0.3s ease, background 0.3s ease',
            }}>
                <Typography
                    variant="subtitle2"
                    sx={{
                        fontSize: '0.9rem',
                        color: textPrimary,
                        fontWeight: 700,
                        mb: 1,
                        textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
                        transition: 'color 0.3s ease',
                    }}
                >
                    Resumen de avance
                </Typography>
                
                <Grid container spacing={2}>
                    {accounts.map((account, index) => (
                        <Grid item xs={6} key={index}>
                            <Box 
                                component={motion.div}
                                whileHover={{ 
                                    scale: 1.05,
                                    boxShadow: isDarkMode 
                                        ? '0 8px 20px rgba(0, 204, 136, 0.3)'
                                        : '0 8px 20px rgba(0, 113, 227, 0.3)'
                                }}
                                sx={{
                                    p: 1.5,
                                    background: isDarkMode 
                                        ? 'linear-gradient(135deg, rgba(0, 204, 136, 0.2) 0%, rgba(0, 204, 170, 0.2) 100%)'
                                        : 'linear-gradient(135deg, rgba(0, 113, 227, 0.2) 0%, rgba(64, 169, 255, 0.2) 100%)',
                                    borderRadius: '8px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 2,
                                    boxShadow: isDarkMode 
                                        ? '0 4px 15px rgba(0, 204, 136, 0.2)'
                                        : '0 4px 15px rgba(0, 113, 227, 0.2)',
                                    border: isDarkMode 
                                        ? '1px solid rgba(0, 204, 136, 0.3)'
                                        : '1px solid rgba(0, 113, 227, 0.3)',
                                    transition: 'all 0.3s ease',
                                }}
                            >
                                {renderDoughnutChart(
                                    calculateTotalProgress(account.progress), 
                                    60, 
                                    isDarkMode ? '#00CC88' : '#0071e3'
                                )}
                                <Box>
                                    <Typography sx={{ 
                                        fontSize: '0.8rem', 
                                        color: textPrimary, 
                                        fontWeight: 500,
                                        transition: 'color 0.3s ease',
                                    }}>
                                        {account.name}
                                    </Typography>
                                    <Typography sx={{ 
                                        fontSize: '1.2rem', 
                                        fontWeight: 800, 
                                        background: accentGradient,
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                        transition: 'background 0.3s ease',
                                    }}>
                                        {calculateTotalProgress(account.progress)}%
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Paper>
    );
};