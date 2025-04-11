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
                    mb: 2,
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
                                            }}
                                        >
                                            {account.name}
                                        </Typography>
                                        <Box sx={{ 
                                            display: 'flex', 
                                            alignItems: 'center', 
                                            gap: 1,
                                            backgroundColor: 'rgba(0, 204, 136, 0.2)',
                                            px: 1.5,
                                            py: 0.5,
                                            borderRadius: '12px'
                                        }}>
                                            <TrendingUp size={14} color="#00CC88" />
                                            <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, color: '#00CC88' }}>
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
                                                                    backgroundColor: '#00CC88',
                                                                }}
                                                            />
                                                            {detail.label}
                                                        </Typography>
                                                        <Typography
                                                            sx={{
                                                                fontSize: '0.85rem',
                                                                color: '#00CC88',
                                                                fontWeight: 600,
                                                            }}
                                                        >
                                                            {detail.value}%
                                                        </Typography>
                                                    </Box>
                                                    <LinearProgress
                                                        variant="determinate"
                                                        value={detail.value}
                                                        sx={{
                                                            height: 8,
                                                            borderRadius: 4,
                                                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                                            '& .MuiLinearProgress-bar': {
                                                                backgroundColor: '#00CC88',
                                                                borderRadius: 4,
                                                            },
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
                                            backgroundColor: '#333333', 
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
            <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid #333333' }}>
                <Typography
                    variant="subtitle2"
                    sx={{
                        fontSize: '0.9rem',
                        color: '#FFFFFF',
                        fontWeight: 600,
                        mb: 1,
                    }}
                >
                    Resumen de avance
                </Typography>
                
                <Grid container spacing={2}>
                    {accounts.map((account, index) => (
                        <Grid item xs={6} key={index}>
                            <Box 
                                sx={{
                                    p: 1.5,
                                    backgroundColor: 'rgba(0, 204, 136, 0.1)',
                                    borderRadius: '8px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}
                            >
                                <Typography sx={{ fontSize: '1.25rem', fontWeight: 600, color: '#00CC88' }}>
                                    {calculateTotalProgress(account.progress)}%
                                </Typography>
                                <Typography sx={{ fontSize: '0.8rem', color: '#BBBBBB', textAlign: 'center' }}>
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