import React from 'react';
import {
    Box,
    Grid,
    Paper,
    Typography,
    IconButton,
    Tooltip,
} from '@mui/material';
import {
    Download,
    BarChart2,
} from 'lucide-react';

// Import mock data from centralized data module
import { financialData } from '../../../data/pmo';

export const FinancialBalance: React.FC = () => {
    return (
        <Grid container spacing={3}>
            {financialData.companies.map((data, index) => (
                <Grid item xs={12} md={4} key={index}>
                    <Paper
                        sx={{
                            p: 3,
                            borderRadius: '12px',
                            backgroundColor: 'var(--surface-primary)',
                        }}
                        className="glass-effect"
                    >
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                            <Typography
                                variant="h6"
                                sx={{
                                    fontSize: '1.125rem',
                                    fontWeight: 600,
                                    color: 'var(--text-primary)',
                                }}
                            >
                                {data.company}
                            </Typography>
                            <Tooltip title="Descargar reporte">
                                <IconButton
                                    size="small"
                                    sx={{
                                        color: 'var(--text-secondary)',
                                        '&:hover': {
                                            color: 'var(--text-primary)',
                                        },
                                    }}
                                >
                                    <Download size={16} />
                                </IconButton>
                            </Tooltip>
                        </Box>

                        <Box sx={{ mb: 3 }}>
                            <Typography
                                variant="caption"
                                sx={{
                                    color: 'var(--text-secondary)',
                                }}
                            >
                                Ingresos
                            </Typography>
                            <Typography
                                variant="h4"
                                sx={{
                                    color: '#30d158',
                                    fontWeight: 600,
                                    fontSize: '1.5rem',
                                }}
                            >
                                ${data.revenue.toLocaleString()}
                            </Typography>
                        </Box>

                        <Box sx={{ mb: 3 }}>
                            <Typography
                                variant="caption"
                                sx={{
                                    color: 'var(--text-secondary)',
                                }}
                            >
                                Gastos
                            </Typography>
                            <Typography
                                variant="h4"
                                sx={{
                                    color: '#ff3b30',
                                    fontWeight: 600,
                                    fontSize: '1.5rem',
                                }}
                            >
                                ${data.expenses.toLocaleString()}
                            </Typography>
                        </Box>

                        <Box sx={{ mb: 3 }}>
                            <Typography
                                variant="caption"
                                sx={{
                                    color: 'var(--text-secondary)',
                                }}
                            >
                                Beneficio
                            </Typography>
                            <Typography
                                variant="h4"
                                sx={{
                                    color: '#0071e3',
                                    fontWeight: 600,
                                    fontSize: '1.5rem',
                                }}
                            >
                                ${data.profit.toLocaleString()}
                            </Typography>
                        </Box>

                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                                color: data.growth >= 0 ? '#30d158' : '#ff3b30',
                            }}
                        >
                            <BarChart2 size={16} />
                            <Typography
                                sx={{
                                    fontWeight: 500,
                                }}
                            >
                                {data.growth}% vs mes anterior
                            </Typography>
                        </Box>
                    </Paper>
                </Grid>
            ))}
        </Grid>
    );
};