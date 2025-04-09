import React, { useState } from 'react';
import {
    Box,
    Container,
    Paper,
    Typography,
    Grid,
    Tabs,
    Tab,
    IconButton,
} from '@mui/material';
import {
    FileSpreadsheet,
    DollarSign,
    Download,
    BarChart2,
} from 'lucide-react';

// Mock data for financial metrics
const mockFinancialData = {
    holding: {
        revenue: {
            total: 2500000,
            previous: 2000000,
            breakdown: [
                { label: 'Servicios Logísticos', value: 45 },
                { label: 'Almacenamiento', value: 35 },
                { label: 'Distribución', value: 20 },
            ]
        },
        expenses: {
            total: 1800000,
            previous: 1500000,
            breakdown: [
                { label: 'Operaciones', value: 50 },
                { label: 'Personal', value: 30 },
                { label: 'Mantenimiento', value: 20 },
            ]
        },
        profit: {
            total: 700000,
            previous: 500000,
        }
    },
    inmobiliaria: {
        revenue: {
            total: 3500000,
            previous: 3000000,
            breakdown: [
                { label: 'Arrendamientos', value: 60 },
                { label: 'Servicios', value: 25 },
                { label: 'Otros', value: 15 },
            ]
        },
        expenses: {
            total: 2200000,
            previous: 1900000,
            breakdown: [
                { label: 'Mantenimiento', value: 40 },
                { label: 'Servicios', value: 35 },
                { label: 'Administrativo', value: 25 },
            ]
        },
        profit: {
            total: 1300000,
            previous: 1100000,
        }
    }
};

export const AdminInterlogisToolbox: React.FC = () => {
    const [currentTab, setCurrentTab] = useState(0);

    const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
        setCurrentTab(newValue);
    };

    const renderFinancialBalance = (data: typeof mockFinancialData.holding | typeof mockFinancialData.inmobiliaria) => (
        <Grid container spacing={3}>
            {[
                {
                    category: 'Ingresos',
                    current: data.revenue.total,
                    previous: data.revenue.previous,
                    change: ((data.revenue.total - data.revenue.previous) / data.revenue.previous) * 100,
                    breakdown: data.revenue.breakdown,
                },
                {
                    category: 'Gastos',
                    current: data.expenses.total,
                    previous: data.expenses.previous,
                    change: ((data.expenses.total - data.expenses.previous) / data.expenses.previous) * 100,
                    breakdown: data.expenses.breakdown,
                },
                {
                    category: 'Beneficio',
                    current: data.profit.total,
                    previous: data.profit.previous,
                    change: ((data.profit.total - data.profit.previous) / data.profit.previous) * 100,
                },
            ].map((item, index) => (
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
                                {item.category}
                            </Typography>
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
                        </Box>

                        <Box sx={{ mb: 3 }}>
                            <Typography
                                variant="caption"
                                sx={{
                                    color: 'var(--text-secondary)',
                                }}
                            >
                                Actual
                            </Typography>
                            <Typography
                                variant="h4"
                                sx={{
                                    color: item.category === 'Gastos' ? '#ff2d55' : '#30d158',
                                    fontWeight: 600,
                                    fontSize: '1.5rem',
                                }}
                            >
                                ${item.current.toLocaleString()}
                            </Typography>
                        </Box>

                        <Box sx={{ mb: 3 }}>
                            <Typography
                                variant="caption"
                                sx={{
                                    color: 'var(--text-secondary)',
                                }}
                            >
                                Anterior
                            </Typography>
                            <Typography
                                variant="h4"
                                sx={{
                                    color: item.category === 'Gastos' ? '#ff2d55' : '#30d158',
                                    fontWeight: 600,
                                    fontSize: '1.5rem',
                                    opacity: 0.7,
                                }}
                            >
                                ${item.previous.toLocaleString()}
                            </Typography>
                        </Box>

                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                                color: item.change >= 0 ? '#30d158' : '#ff2d55',
                            }}
                        >
                            <BarChart2 size={16} />
                            <Typography
                                sx={{
                                    fontWeight: 500,
                                }}
                            >
                                {item.change.toFixed(1)}% vs mes anterior
                            </Typography>
                        </Box>
                    </Paper>
                </Grid>
            ))}
        </Grid>
    );

    return (
        <Box sx={{
            pt: 'calc(var(--nav-height) + 24px)',
            pb: 4,
            px: { xs: 2, sm: 3, md: 4 },
            minHeight: '100vh',
            backgroundColor: 'var(--app-bg)',
        }}>
            <Container maxWidth="xl">
                <Typography
                    variant="h4"
                    sx={{
                        fontSize: '2rem',
                        fontWeight: 600,
                        color: 'var(--text-primary)',
                        mb: 4,
                    }}
                >
                    Balance Financiero
                </Typography>

                <Paper
                    sx={{
                        borderRadius: '12px',
                        backgroundColor: 'var(--surface-primary)',
                        mb: 3,
                    }}
                    className="glass-effect"
                >
                    <Tabs
                        value={currentTab}
                        onChange={handleTabChange}
                        sx={{
                            borderBottom: '1px solid var(--border-color)',
                            '& .MuiTabs-indicator': {
                                backgroundColor: '#0071e3',
                            },
                        }}
                    >
                        <Tab
                            icon={<FileSpreadsheet size={16} />}
                            iconPosition="start"
                            label="Interlogis Holding"
                            sx={{
                                textTransform: 'none',
                                minHeight: 48,
                                color: 'var(--text-secondary)',
                                '&.Mui-selected': {
                                    color: '#0071e3',
                                },
                            }}
                        />
                        <Tab
                            icon={<DollarSign size={16} />}
                            iconPosition="start"
                            label="Interlogis Inmobiliaria"
                            sx={{
                                textTransform: 'none',
                                minHeight: 48,
                                color: 'var(--text-secondary)',
                                '&.Mui-selected': {
                                    color: '#0071e3',
                                },
                            }}
                        />
                    </Tabs>
                </Paper>

                <Box sx={{ mt: 3 }}>
                    {currentTab === 0 && renderFinancialBalance(mockFinancialData.holding)}
                    {currentTab === 1 && renderFinancialBalance(mockFinancialData.inmobiliaria)}
                </Box>
            </Container>
        </Box>
    );
};
