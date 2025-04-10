import React from 'react';
import { Grid, Paper, Typography, Box } from '@mui/material';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

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
    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '75%',
        layout: {
            padding: {
                left: 20,
                right: 20,
                top: 20,
                bottom: 20
            }
        },
        plugins: {
            legend: {
                position: 'bottom' as const,
                align: 'center' as const,
                labels: {
                    boxWidth: 12,
                    boxHeight: 12,
                    padding: 15,
                    font: {
                        size: 11,
                        family: "'Inter', sans-serif",
                    },
                    color: 'var(--text-primary)',
                    usePointStyle: true,
                    pointStyle: 'circle'
                }
            },
            tooltip: {
                backgroundColor: 'var(--surface-primary)',
                titleColor: 'var(--text-primary)',
                bodyColor: 'var(--text-primary)',
                borderColor: 'var(--border-color)',
                borderWidth: 1,
                padding: 12,
                boxPadding: 6,
                usePointStyle: true,
                titleFont: {
                    size: 13,
                    family: "'Inter', sans-serif",
                    weight: '600'
                },
                bodyFont: {
                    size: 12,
                    family: "'Inter', sans-serif"
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
            estrategia: '#0071e3',
            setup: '#30d158',
            acompanamiento: '#ff9500',
            gerencia: '#5856d6',
            produccion: '#ff2d55',
            difusion: '#64d2ff'
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

    return (
        <Grid item xs={12} lg={8}>
            <Paper
                sx={{
                    p: 3,
                    borderRadius: '12px',
                    backgroundColor: 'var(--surface-primary)',
                    height: '100%',
                }}
                className="glass-effect"
            >
                <Typography
                    variant="h6"
                    sx={{
                        fontSize: '1.125rem',
                        fontWeight: 600,
                        color: 'var(--text-primary)',
                        mb: 3,
                    }}
                >
                    AVANCE DE CUENTAS
                </Typography>
                <Grid container spacing={4}>
                    {accounts.map((account, index) => (
                        <Grid item xs={12} md={6} key={index}>
                            <Box
                                sx={{
                                    position: 'relative',
                                    height: 360,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}
                            >
                                <Box
                                    sx={{
                                        position: 'relative',
                                        width: '100%',
                                        height: 280,
                                        mb: 2,
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
                                                fontSize: '2.5rem',
                                                fontWeight: 600,
                                                color: 'var(--text-primary)',
                                                lineHeight: 1,
                                            }}
                                        >
                                            {calculateTotalProgress(account.progress)}%
                                        </Typography>
                                        <Typography
                                            sx={{
                                                fontSize: '0.875rem',
                                                color: 'var(--text-secondary)',
                                                mt: 0.5,
                                            }}
                                        >
                                            Promedio
                                        </Typography>
                                    </Box>
                                    <Doughnut data={getChartData(account)} options={chartOptions} />
                                </Box>
                                <Typography
                                    sx={{
                                        fontSize: '1rem',
                                        fontWeight: 500,
                                        color: 'var(--text-primary)',
                                        textAlign: 'center',
                                    }}
                                >
                                    {account.name}
                                </Typography>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Paper>
        </Grid>
    );
};