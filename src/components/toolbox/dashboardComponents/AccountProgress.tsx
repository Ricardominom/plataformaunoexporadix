import React from 'react';
import { Paper, Typography, Box, Grid, Tooltip } from '@mui/material';
import { Chart as ChartJS, ArcElement, Tooltip as ChartTooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { motion } from 'framer-motion';

ChartJS.register(ArcElement, ChartTooltip, Legend);

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

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '75%',
        layout: {
            padding: {
                left: 5,
                right: 5,
                top: 5,
                bottom: 5
            }
        },
        plugins: {
            legend: {
                display: false, // Hide legend from chart itself
            },
            tooltip: {
                backgroundColor: '#1E1E1E',
                titleColor: '#FFFFFF',
                bodyColor: '#FFFFFF',
                borderColor: '#333333',
                borderWidth: 1,
                padding: 8,
                boxPadding: 4,
                usePointStyle: true,
                titleFont: {
                    size: 12,
                    family: "'SF Pro Text', sans-serif",
                    weight: '600'
                },
                bodyFont: {
                    size: 11,
                    family: "'SF Pro Text', sans-serif"
                },
                callbacks: {
                    label: function (context: any) {
                        return `${context.label}: ${context.raw}%`;
                    }
                }
            }
        }
    };

    const getChartData = (account: AccountProgressData) => {
        const colors = {
            estrategia: '#00CC88',
            setup: '#00CC88',
            acompanamiento: '#00CC88',
            gerencia: '#00CC88',
            produccion: '#00CC88',
            difusion: '#00CC88'
        };

        const labels = {
            estrategia: 'Estrategia',
            setup: 'Setup',
            acompanamiento: 'Acompañamiento',
            gerencia: 'Gerencia',
            produccion: 'Producción',
            difusion: 'Difusión'
        };

        return {
            labels: Object.values(labels),
            datasets: [
                {
                    data: Object.values(account.progress),
                    backgroundColor: Object.values(colors),
                    borderWidth: 0,
                    hoverOffset: 4,
                    borderRadius: 4,
                },
            ],
        };
    };

    const calculateTotalProgress = (progress: AccountProgressData['progress']) => {
        const values = Object.values(progress);
        return Math.round(values.reduce((a, b) => a + b, 0) / values.length);
    };

    // Create a detailed breakdown of progress values
    const getProgressDetails = (account: AccountProgressData) => {
        return Object.entries(account.progress).map(([key, value]) => {
            const label = key.charAt(0).toUpperCase() + key.slice(1);
            const color = '#00CC88'; // All green
            return { label, value, color };
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
                    mb: 2, // Reduced margin
                }}
            >
                AVANCE DE CUENTAS
            </Typography>
            
            {/* Legend for all charts - more compact */}
            <Box sx={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                justifyContent: 'center', 
                gap: 1, // Reduced gap
                mb: 2, // Reduced margin
                px: 1 // Reduced padding
            }}>
                {Object.entries({
                    estrategia: 'Estrategia',
                    setup: 'Setup',
                    acompanamiento: 'Acomp.',
                    gerencia: 'Gerencia',
                    produccion: 'Prod.',
                    difusion: 'Difusión'
                }).map(([key, label]) => (
                    <Box 
                        key={key} 
                        sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: 0.5, // Reduced gap
                            backgroundColor: 'rgba(0, 204, 136, 0.2)',
                            px: 1, // Reduced padding
                            py: 0.25, // Reduced padding
                            borderRadius: '12px'
                        }}
                    >
                        <Box
                            sx={{
                                width: 8, // Smaller dot
                                height: 8, // Smaller dot
                                borderRadius: '50%',
                                backgroundColor: '#00CC88',
                            }}
                        />
                        <Typography
                            sx={{
                                fontSize: '0.65rem', // Smaller font
                                color: '#FFFFFF',
                                fontWeight: 500,
                            }}
                        >
                            {label}
                        </Typography>
                    </Box>
                ))}
            </Box>
            
            <Box sx={{ flex: 1, overflow: 'auto' }}>
                <Grid container spacing={3}>
                    {accounts.map((account, index) => (
                        <Grid item xs={12} md={6} key={index}>
                            <motion.div variants={itemVariants}>
                                <Box sx={{ mb: 1 }}> {/* Reduced margin */}
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontSize: '1.1rem', // Smaller font
                                            fontWeight: 600,
                                            color: '#FFFFFF',
                                            textAlign: 'center',
                                            mb: 0.5, // Reduced margin
                                        }}
                                    >
                                        {account.name}
                                    </Typography>
                                </Box>
                                
                                <Grid container spacing={2}> {/* Reduced spacing */}
                                    {/* Chart Column */}
                                    <Grid item xs={12} md={5}>
                                        <Box
                                            sx={{
                                                position: 'relative',
                                                height: 160, // Reduced height
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                mb: { xs: 1, md: 0 } // Reduced margin
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    position: 'absolute',
                                                    top: '50%',
                                                    left: '50%',
                                                    transform: 'translate(-50%, -50%)',
                                                    textAlign: 'center',
                                                    zIndex: 1,
                                                }}
                                            >
                                                <Typography
                                                    sx={{
                                                        fontSize: '1.75rem', // Smaller font
                                                        fontWeight: 700,
                                                        color: '#FFFFFF',
                                                        lineHeight: 1,
                                                    }}
                                                >
                                                    {calculateTotalProgress(account.progress)}%
                                                </Typography>
                                                <Typography
                                                    sx={{
                                                        fontSize: '0.7rem', // Smaller font
                                                        color: '#BBBBBB',
                                                        mt: 0.25, // Reduced margin
                                                    }}
                                                >
                                                    Promedio
                                                </Typography>
                                            </Box>
                                            <Doughnut data={getChartData(account)} options={chartOptions} />
                                        </Box>
                                    </Grid>
                                    
                                    {/* Progress Details Column */}
                                    <Grid item xs={12} md={7}>
                                        <Box sx={{ 
                                            height: '100%', 
                                            display: 'flex', 
                                            flexDirection: 'column', 
                                            justifyContent: 'center',
                                            gap: 1 // Reduced gap
                                        }}>
                                            {getProgressDetails(account).map((detail, i) => (
                                                <Tooltip 
                                                    key={i} 
                                                    title={`${detail.label}: ${detail.value}%`} 
                                                    arrow 
                                                    placement="right"
                                                >
                                                    <Box sx={{ cursor: 'pointer' }}>
                                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.25 }}> {/* Reduced margin */}
                                                            <Typography
                                                                sx={{
                                                                    fontSize: '0.75rem', // Smaller font
                                                                    color: '#FFFFFF',
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    gap: 0.5,
                                                                    fontWeight: 500
                                                                }}
                                                            >
                                                                <Box
                                                                    sx={{
                                                                        width: 6, // Smaller dot
                                                                        height: 6, // Smaller dot
                                                                        borderRadius: '50%',
                                                                        backgroundColor: detail.color,
                                                                    }}
                                                                />
                                                                {detail.label}
                                                            </Typography>
                                                            <Typography
                                                                sx={{
                                                                    fontSize: '0.75rem', // Smaller font
                                                                    color: detail.color,
                                                                    fontWeight: 600,
                                                                }}
                                                            >
                                                                {detail.value}%
                                                            </Typography>
                                                        </Box>
                                                        <Box
                                                            sx={{
                                                                height: 4, // Thinner progress bar
                                                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                                                borderRadius: 3,
                                                                overflow: 'hidden',
                                                            }}
                                                        >
                                                            <Box
                                                                sx={{
                                                                    height: '100%',
                                                                    width: `${detail.value}%`,
                                                                    backgroundColor: detail.color,
                                                                    borderRadius: 3,
                                                                }}
                                                            />
                                                        </Box>
                                                    </Box>
                                                </Tooltip>
                                            ))}
                                        </Box>
                                    </Grid>
                                </Grid>
                            </motion.div>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Paper>
    );
};