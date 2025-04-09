import React from 'react';
import {
    Box,
    Container,
    Paper,
    Typography,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Chip,
    LinearProgress,
    IconButton,
} from '@mui/material';
import {
    DollarSign,
    Circle,
    ChevronRight,
    AlertCircle,
    CheckCircle,
    Clock,
} from 'lucide-react';

// Mock data for agreements
const mockAgreements = [
    {
        title: 'Contrato de Servicios Cloud',
        status: 'in_progress',
        date: '2024-02-28',
        priority: 'high',
    },
    {
        title: 'Acuerdo de Confidencialidad',
        status: 'completed',
        date: '2024-02-20',
        priority: 'medium',
    },
    {
        title: 'Términos y Condiciones App',
        status: 'pending',
        date: '2024-03-01',
        priority: 'low',
    },
];

// Mock data for financial status
const mockFinancialData = {
    revenue: {
        total: 2500000,
        breakdown: [
            { label: 'Ventas Directas', value: 40 },
            { label: 'Servicios', value: 35 },
            { label: 'Licencias', value: 25 },
        ]
    },
    expenses: {
        total: 1800000,
        breakdown: [
            { label: 'Operaciones', value: 45 },
            { label: 'Marketing', value: 30 },
            { label: 'Desarrollo', value: 25 },
        ]
    }
};

// Mock data for action plans
const mockActionPlans = [
    { name: 'Análisis de madurez', progress: 100, status: 'completed' },
    { name: 'Definición de objetivos', progress: 85, status: 'in_progress' },
    { name: 'Análisis de competencia', progress: 60, status: 'in_progress' },
    { name: 'Implementación de mejoras', progress: 30, status: 'delayed' },
];

// Mock data for leads
const mockLeadsData = {
    current: 2500000,
    previous: 2000000,
    growth: 25,
    monthly: [
        { month: 'Ene', value: 1800000 },
        { month: 'Feb', value: 2000000 },
        { month: 'Mar', value: 2500000 },
    ]
};

// Mock data for legal status
const mockLegalStatus = [
    { category: 'Contratos', completed: 15, total: 20 },
    { category: 'Compliance', completed: 8, total: 10 },
    { category: 'Propiedad Intelectual', completed: 5, total: 8 },
    { category: 'Regulatorio', completed: 12, total: 15 },
];

const getStatusColor = (status: string) => {
    const colors = {
        completed: { bg: 'rgba(48, 209, 88, 0.1)', text: '#30d158' },
        in_progress: { bg: 'rgba(0, 113, 227, 0.1)', text: '#0071e3' },
        delayed: { bg: 'rgba(255, 45, 85, 0.1)', text: '#ff2d55' },
        pending: { bg: 'rgba(255, 149, 0, 0.1)', text: '#ff9500' },
    };
    return colors[status] || colors.pending;
};

const getStatusIcon = (status: string) => {
    switch (status) {
        case 'completed':
            return <CheckCircle size={16} />;
        case 'in_progress':
            return <Clock size={16} />;
        case 'delayed':
            return <AlertCircle size={16} />;
        default:
            return <Circle size={16} />;
    }
};

export const AssistantToolbox: React.FC = () => {
    return (
        <Box sx={{
            pt: 'calc(var(--nav-height) + 24px)',
            pb: 4,
            px: { xs: 2, sm: 3, md: 4 },
            minHeight: '100vh',
            backgroundColor: 'var(--app-bg)',
        }}>
            <Container maxWidth="xl">
                {/* Header Section */}
                <Box sx={{ mb: 4 }}>
                    <Typography
                        variant="h4"
                        sx={{
                            fontSize: '2rem',
                            fontWeight: 600,
                            color: 'var(--text-primary)',
                            mb: 1,
                        }}
                    >
                        Panel de Control
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: '1rem',
                            color: 'var(--text-secondary)',
                        }}
                    >
                        Vista general de operaciones y métricas clave
                    </Typography>
                </Box>

                {/* Financial Approvals Card */}
                <Paper
                    sx={{
                        p: 3,
                        mb: 3,
                        borderRadius: '12px',
                        backgroundColor: 'rgba(255, 45, 85, 0.1)',
                        border: '1px solid rgba(255, 45, 85, 0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                    }}
                >
                    <Box
                        sx={{
                            width: 48,
                            height: 48,
                            borderRadius: '12px',
                            backgroundColor: 'rgba(255, 45, 85, 0.2)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <DollarSign size={24} color="#ff2d55" />
                    </Box>
                    <Box>
                        <Typography
                            sx={{
                                fontSize: '0.875rem',
                                color: '#ff2d55',
                                opacity: 0.8,
                                mb: 0.5,
                            }}
                        >
                            Aprobaciones Financieras
                        </Typography>
                        <Typography
                            sx={{
                                fontSize: '1.5rem',
                                fontWeight: 600,
                                color: '#ff2d55',
                            }}
                        >
                            15 pendientes
                        </Typography>
                    </Box>
                </Paper>

                <Grid container spacing={3}>
                    {/* Agreements Section */}
                    <Grid item xs={12} lg={8}>
                        <Paper
                            sx={{
                                p: 3,
                                borderRadius: '12px',
                                backgroundColor: 'var(--surface-primary)',
                                border: '1px solid var(--border-color)',
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
                                    ACUERDOS
                                </Typography>
                                <IconButton size="small">
                                    <ChevronRight size={20} />
                                </IconButton>
                            </Box>
                            <TableContainer>
                                <Table>
                                    <TableBody>
                                        {mockAgreements.map((agreement, index) => (
                                            <TableRow key={index}>
                                                <TableCell sx={{ pl: 0 }}>
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                        {getStatusIcon(agreement.status)}
                                                        <Typography variant="body2">
                                                            {agreement.title}
                                                        </Typography>
                                                    </Box>
                                                </TableCell>
                                                <TableCell align="right">
                                                    <Chip
                                                        label={agreement.status === 'completed' ? 'Completado' : 'En Proceso'}
                                                        size="small"
                                                        sx={{
                                                            backgroundColor: getStatusColor(agreement.status).bg,
                                                            color: getStatusColor(agreement.status).text,
                                                            fontSize: '0.75rem',
                                                            height: '24px',
                                                        }}
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                    </Grid>

                    {/* Financial Status */}
                    <Grid item xs={12} lg={4}>
                        <Paper
                            sx={{
                                p: 3,
                                borderRadius: '12px',
                                backgroundColor: 'var(--surface-primary)',
                                border: '1px solid var(--border-color)',
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
                                ESTADO DE CUENTAS
                            </Typography>
                            <Box sx={{ mb: 4 }}>
                                <Typography variant="subtitle2" sx={{ mb: 2, color: 'var(--text-secondary)' }}>
                                    Ingresos
                                </Typography>
                                <Typography variant="h4" sx={{ color: '#30d158', mb: 1 }}>
                                    ${mockFinancialData.revenue.total.toLocaleString()}
                                </Typography>
                                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                    {mockFinancialData.revenue.breakdown.map((item, index) => (
                                        <Chip
                                            key={index}
                                            label={`${item.label} ${item.value}%`}
                                            size="small"
                                            sx={{
                                                backgroundColor: 'rgba(48, 209, 88, 0.1)',
                                                color: '#30d158',
                                                fontSize: '0.75rem',
                                            }}
                                        />
                                    ))}
                                </Box>
                            </Box>
                            <Box>
                                <Typography variant="subtitle2" sx={{ mb: 2, color: 'var(--text-secondary)' }}>
                                    Gastos
                                </Typography>
                                <Typography variant="h4" sx={{ color: '#ff2d55', mb: 1 }}>
                                    ${mockFinancialData.expenses.total.toLocaleString()}
                                </Typography>
                                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                    {mockFinancialData.expenses.breakdown.map((item, index) => (
                                        <Chip
                                            key={index}
                                            label={`${item.label} ${item.value}%`}
                                            size="small"
                                            sx={{
                                                backgroundColor: 'rgba(255, 45, 85, 0.1)',
                                                color: '#ff2d55',
                                                fontSize: '0.75rem',
                                            }}
                                        />
                                    ))}
                                </Box>
                            </Box>
                        </Paper>
                    </Grid>

                    {/* Action Plans Progress */}
                    <Grid item xs={12} lg={4}>
                        <Paper
                            sx={{
                                p: 3,
                                borderRadius: '12px',
                                backgroundColor: 'var(--surface-primary)',
                                border: '1px solid var(--border-color)',
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
                                AVANCE PLANES DE ACCIÓN
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                                {mockActionPlans.map((plan, index) => (
                                    <Box key={index}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                            <Typography variant="body2" sx={{ color: 'var(--text-primary)' }}>
                                                {plan.name}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    color: getStatusColor(plan.status).text,
                                                    fontWeight: 500,
                                                }}
                                            >
                                                {plan.progress}%
                                            </Typography>
                                        </Box>
                                        <LinearProgress
                                            variant="determinate"
                                            value={plan.progress}
                                            sx={{
                                                height: 6,
                                                borderRadius: 3,
                                                backgroundColor: 'var(--surface-secondary)',
                                                '& .MuiLinearProgress-bar': {
                                                    backgroundColor: getStatusColor(plan.status).text,
                                                    borderRadius: 3,
                                                },
                                            }}
                                        />
                                    </Box>
                                ))}
                            </Box>
                        </Paper>
                    </Grid>

                    {/* Legal Balance */}
                    <Grid item xs={12} lg={4}>
                        <Paper
                            sx={{
                                p: 3,
                                borderRadius: '12px',
                                backgroundColor: 'var(--surface-primary)',
                                border: '1px solid var(--border-color)',
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
                                BALANCE LEGAL
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                {mockLegalStatus.map((item, index) => (
                                    <Box key={index}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                            <Typography variant="body2" sx={{ color: 'var(--text-primary)' }}>
                                                {item.category}
                                            </Typography>
                                            <Typography variant="body2" sx={{ color: 'var(--text-secondary)' }}>
                                                {item.completed}/{item.total}
                                            </Typography>
                                        </Box>
                                        <LinearProgress
                                            variant="determinate"
                                            value={(item.completed / item.total) * 100}
                                            sx={{
                                                height: 6,
                                                borderRadius: 3,
                                                backgroundColor: 'var(--surface-secondary)',
                                                '& .MuiLinearProgress-bar': {
                                                    backgroundColor: '#0071e3',
                                                    borderRadius: 3,
                                                },
                                            }}
                                        />
                                    </Box>
                                ))}
                            </Box>
                        </Paper>
                    </Grid>

                    {/* Leads Performance */}
                    <Grid item xs={12} lg={4}>
                        <Paper
                            sx={{
                                p: 3,
                                borderRadius: '12px',
                                backgroundColor: 'var(--surface-primary)',
                                border: '1px solid var(--border-color)',
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
                                TABLERO DE LEADS
                            </Typography>
                            <Box sx={{ mb: 3 }}>
                                <Typography variant="h4" sx={{ color: '#0071e3', mb: 1 }}>
                                    ${mockLeadsData.current.toLocaleString()}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: mockLeadsData.growth >= 0 ? '#30d158' : '#ff2d55',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 0.5,
                                    }}
                                >
                                    {mockLeadsData.growth >= 0 ? '+' : ''}{mockLeadsData.growth}% vs mes anterior
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'flex-end', height: 100, gap: 2 }}>
                                {mockLeadsData.monthly.map((month, index) => (
                                    <Box
                                        key={index}
                                        sx={{
                                            flex: 1,
                                            height: `${(month.value / Math.max(...mockLeadsData.monthly.map(m => m.value))) * 100}%`,
                                            backgroundColor: '#0071e3',
                                            borderRadius: '4px 4px 0 0',
                                            position: 'relative',
                                            '&::before': {
                                                content: '""',
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                right: 0,
                                                bottom: 0,
                                                background: 'linear-gradient(180deg, rgba(0,113,227,0.2) 0%, rgba(0,113,227,1) 100%)',
                                                borderRadius: '4px 4px 0 0',
                                            },
                                        }}
                                    />
                                ))}
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                                {mockLeadsData.monthly.map((month, index) => (
                                    <Typography key={index} variant="caption" sx={{ color: 'var(--text-secondary)' }}>
                                        {month.month}
                                    </Typography>
                                ))}
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};
