import React from 'react';
import { Paper, Typography, Box, Grid, Tooltip, LinearProgress } from '@mui/material';
import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';

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
                background: 'linear-gradient(135deg, #1E1E1E 0%, #252525 100%)',
                position: 'relative',
                overflow: 'hidden',
                border: '1px solid #00CC88',
                boxShadow: '0 8px 24px rgba(0, 204, 136, 0.15)',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '6px',
                    background: 'linear-gradient(90deg, #00CC88 0%, #00CCAA 100%)',
                    boxShadow: '0 0 20px rgba(0, 204, 136, 0.5)',
                },
                '&:hover': {
                    boxShadow: '0 12px 30px rgba(0, 204, 136, 0.25)',
                    '& .progress-bar': {
                        boxShadow: '0 0 15px rgba(0, 204, 136, 0.7)',
                    }
                }
            }}
        >
            <Typography
                variant="h6"
                sx={{
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    mb: 2,
                    background: 'linear-gradient(135deg, #00CC88 0%, #00CCAA 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
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
                                                color: '#FFFFFF',
                                                textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
                                            }}
                                        >
                                            {account.name}
                                        </Typography>
                                        <Box sx={{ 
                                            display: 'flex', 
                                            alignItems: 'center', 
                                            gap: 1,
                                            background: 'linear-gradient(135deg, rgba(0, 204, 136, 0.3) 0%, rgba(0, 204, 170, 0.3) 100%)',
                                            px: 1.5,
                                            py: 0.5,
                                            borderRadius: '12px',
                                            boxShadow: '0 2px 8px rgba(0, 204, 136, 0.2)',
                                        }}>
                                            <TrendingUp size={14} color="#00FFAA" />
                                            <Typography sx={{ 
                                                fontSize: '0.8rem', 
                                                fontWeight: 700, 
                                                background: 'linear-gradient(135deg, #00FFAA 0%, #00CCAA 100%)',
                                                WebkitBackgroundClip: 'text',
                                                WebkitTextFillColor: 'transparent',
                                                textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
                                            }}>
                                                {calculateTotalProgress(account.progress)}% promedio
                                            </Typography>
                                        </Box>
                                    </Box>
                                    
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                                        {getProgressDetails(account).map((detail, i) => (
                                            <Tooltip 
                                                key={i} 
                                                title={`${detail.label}: ${detail.value}%`} 
                                                arrow 
                                                placement="right"
                                            >
                                                <Box sx={{ cursor: 'pointer' }}>
                                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                                                        <Typography
                                                            sx={{
                                                                fontSize: '0.85rem',
                                                                color: '#FFFFFF',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                gap: 1,
                                                                fontWeight: 500
                                                            }}
                                                        >
                                                            <Box
                                                                sx={{
                                                                    width: 8,
                                                                    height: 8,
                                                                    borderRadius: '50%',
                                                                    background: 'linear-gradient(135deg, #00FFAA 0%, #00CCAA 100%)',
                                                                    boxShadow: '0 0 5px rgba(0, 204, 170, 0.7)',
                                                                }}
                                                            />
                                                            {detail.label}
                                                        </Typography>
                                                        <Typography
                                                            sx={{
                                                                fontSize: '0.85rem',
                                                                fontWeight: 700,
                                                                background: 'linear-gradient(135deg, #00FFAA 0%, #00CCAA 100%)',
                                                                WebkitBackgroundClip: 'text',
                                                                WebkitTextFillColor: 'transparent',
                                                                textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
                                                            }}
                                                        >
                                                            {detail.value}%
                                                        </Typography>
                                                    </Box>
                                                    <LinearProgress
                                                        className="progress-bar"
                                                        variant="determinate"
                                                        value={detail.value}
                                                        sx={{
                                                            height: 10,
                                                            borderRadius: 5,
                                                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                                            '& .MuiLinearProgress-bar': {
                                                                borderRadius: 5,
                                                                background: 'linear-gradient(90deg, #00CC88 0%, #00CCAA 100%)',
                                                                boxShadow: '0 0 10px rgba(0, 204, 170, 0.5)',
                                                                '&::after': {
                                                                    content: '""',
                                                                    position: 'absolute',
                                                                    top: 0,
                                                                    right: 0,
                                                                    width: '10px',
                                                                    height: '100%',
                                                                    background: 'rgba(255, 255, 255, 0.7)',
                                                                    borderRadius: '0 5px 5px 0',
                                                                    filter: 'blur(3px)',
                                                                }
                                                            },
                                                            transition: 'all 0.3s ease',
                                                        }}
                                                    />
                                                </Box>
                                            </Tooltip>
                                        ))}
                                    </Box>
                                </Box>
                                
                                {index < accounts.length - 1 && (
                                    <Box 
                                        sx={{ 
                                            height: '1px', 
                                            background: 'linear-gradient(90deg, rgba(0, 204, 136, 0.1) 0%, rgba(0, 204, 136, 0.5) 50%, rgba(0, 204, 136, 0.1) 100%)', 
                                            my: 2 
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
                borderTop: '1px solid rgba(0, 204, 136, 0.3)',
                background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 204, 136, 0.1) 100%)',
            }}>
                <Typography
                    variant="subtitle2"
                    sx={{
                        fontSize: '0.9rem',
                        color: '#FFFFFF',
                        fontWeight: 700,
                        mb: 1,
                        textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
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
                                    boxShadow: '0 8px 20px rgba(0, 204, 136, 0.3)'
                                }}
                                sx={{
                                    p: 1.5,
                                    background: 'linear-gradient(135deg, rgba(0, 204, 136, 0.2) 0%, rgba(0, 204, 170, 0.2) 100%)',
                                    borderRadius: '8px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    boxShadow: '0 4px 15px rgba(0, 204, 136, 0.2)',
                                    border: '1px solid rgba(0, 204, 136, 0.3)',
                                    transition: 'all 0.3s ease',
                                }}
                            >
                                <Typography sx={{ 
                                    fontSize: '1.5rem', 
                                    fontWeight: 800, 
                                    background: 'linear-gradient(135deg, #00FFAA 0%, #00CCAA 100%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                }}>
                                    {calculateTotalProgress(account.progress)}%
                                </Typography>
                                <Typography sx={{ fontSize: '0.8rem', color: '#FFFFFF', textAlign: 'center', fontWeight: 500 }}>
                                    {account.name}
                                </Typography>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Paper>
    );
};