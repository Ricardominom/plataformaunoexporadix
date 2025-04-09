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
    Badge,
    Button,
    Tooltip,
} from '@mui/material';
import {
    DollarSign,
    Circle,
    ChevronRight,
    AlertCircle,
    CheckCircle2,
    Clock,
    TrendingUp,
    TrendingDown,
    ArrowUpRight,
    ArrowDownRight,
    Download,
    Bell,
    Users,
    Target,
    Zap,
} from 'lucide-react';

// Mock data for agreements
const mockAgreements = [
    {
        title: 'Contrato de Servicios Cloud',
        status: 'in_progress',
        date: '2024-02-28',
        priority: 'high',
        owner: 'María González',
        progress: 75,
    },
    {
        title: 'Acuerdo de Confidencialidad',
        status: 'completed',
        date: '2024-02-20',
        priority: 'medium',
        owner: 'Juan Pérez',
        progress: 100,
    },
    {
        title: 'Términos y Condiciones App',
        status: 'pending',
        date: '2024-03-01',
        priority: 'low',
        owner: 'Carlos Rodríguez',
        progress: 30,
    },
];

// Mock data for financial status
const mockFinancialData = {
    revenue: {
        total: 2500000,
        previousTotal: 2000000,
        growth: 25,
        breakdown: [
            { label: 'Ventas Directas', value: 40, growth: 15 },
            { label: 'Servicios', value: 35, growth: 8 },
            { label: 'Licencias', value: 25, growth: -5 },
        ]
    },
    expenses: {
        total: 1800000,
        previousTotal: 1500000,
        growth: 20,
        breakdown: [
            { label: 'Operaciones', value: 45, growth: 12 },
            { label: 'Marketing', value: 30, growth: -8 },
            { label: 'Desarrollo', value: 25, growth: 5 },
        ]
    },
    profit: {
        current: 700000,
        previous: 500000,
        growth: 40
    }
};

// Mock data for action plans
const mockActionPlans = [
    { name: 'Análisis de madurez', progress: 100, status: 'completed', dueDate: '2024-03-01', owner: 'Ana Martínez' },
    { name: 'Definición de objetivos', progress: 85, status: 'in_progress', dueDate: '2024-03-15', owner: 'Roberto Sánchez' },
    { name: 'Análisis de competencia', progress: 60, status: 'in_progress', dueDate: '2024-03-30', owner: 'Patricia López' },
    { name: 'Implementación de mejoras', progress: 30, status: 'delayed', dueDate: '2024-04-15', owner: 'Carlos Rodríguez' },
];

// Mock data for leads
const mockLeadsData = {
    current: 2500000,
    previous: 2000000,
    growth: 25,
    conversion: 68,
    monthly: [
        { month: 'Ene', value: 1800000, leads: 120 },
        { month: 'Feb', value: 2000000, leads: 150 },
        { month: 'Mar', value: 2500000, leads: 180 },
    ]
};

// Mock data for legal status
const mockLegalStatus = [
    { category: 'Contratos', completed: 15, total: 20, growth: 25 },
    { category: 'Compliance', completed: 8, total: 10, growth: 15 },
    { category: 'Propiedad Intelectual', completed: 5, total: 8, growth: -10 },
    { category: 'Regulatorio', completed: 12, total: 15, growth: 8 },
];

// Add new mock data for TO-DOs
const mockTodos = [
    {
        title: 'Revisión de presupuesto Q2',
        dueDate: '2024-03-15',
        priority: 'high',
        status: 'pending',
        assignee: 'María González',
    },
    {
        title: 'Reunión con inversores',
        dueDate: '2024-03-10',
        priority: 'high',
        status: 'completed',
        assignee: 'Juan Pérez',
    },
    {
        title: 'Aprobación de contratos',
        dueDate: '2024-03-20',
        priority: 'medium',
        status: 'in_progress',
        assignee: 'Carlos Rodríguez',
    },
];

// Add mock data for account status
const mockAccountStatus = [
    {
        account: 'Cuenta Principal',
        balance: 1500000,
        pending: 250000,
        status: 'active',
        lastUpdate: '2024-03-01',
    },
    {
        account: 'Cuenta Operativa',
        balance: 800000,
        pending: 120000,
        status: 'active',
        lastUpdate: '2024-03-01',
    },
    {
        account: 'Cuenta Reserva',
        balance: 2000000,
        pending: 0,
        status: 'active',
        lastUpdate: '2024-03-01',
    },
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
            return <CheckCircle2 size={16} />;
        case 'in_progress':
            return <Clock size={16} />;
        case 'delayed':
            return <AlertCircle size={16} />;
        default:
            return <Circle size={16} />;
    }
};

export const PresidentToolbox: React.FC = () => {
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
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography
                            variant="h4"
                            sx={{
                                fontSize: '2rem',
                                fontWeight: 600,
                                color: 'var(--text-primary)',
                            }}
                        >
                            Panel Ejecutivo
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <Button
                                variant="contained"
                                startIcon={<Download size={18} />}
                                sx={{
                                    backgroundColor: '#0071e3',
                                    '&:hover': { backgroundColor: '#0077ED' },
                                }}
                            >
                                Descargar Reporte
                            </Button>
                        </Box>
                    </Box>
                    <Typography
                        sx={{
                            fontSize: '1rem',
                            color: 'var(--text-secondary)',
                        }}
                    >
                        Vista general de operaciones y métricas clave
                    </Typography>
                </Box>

                {/* Quick Stats Section */}
                <Grid container spacing={3} sx={{ mb: 4 }}>
                    {[
                        {
                            title: 'Ingresos Totales',
                            value: `$${mockFinancialData.revenue.total.toLocaleString()}`,
                            change: mockFinancialData.revenue.growth,
                            icon: <DollarSign size={24} />,
                            color: '#0071e3',
                        },
                        {
                            title: 'Conversión de Leads',
                            value: `${mockLeadsData.conversion}%`,
                            change: 12,
                            icon: <Target size={24} />,
                            color: '#30d158',
                        },
                        {
                            title: 'Proyectos Activos',
                            value: '24',
                            change: 8,
                            icon: <Zap size={24} />,
                            color: '#ff9500',
                        },
                        {
                            title: 'Equipo',
                            value: '45',
                            change: 15,
                            icon: <Users size={24} />,
                            color: '#5856d6',
                        },
                    ].map((stat, index) => (
                        <Grid item xs={12} sm={6} md={3} key={index}>
                            <Paper
                                sx={{
                                    p: 3,
                                    borderRadius: '12px',
                                    backgroundColor: 'var(--surface-primary)',
                                    transition: 'transform 0.2s ease-in-out',
                                    '&:hover': {
                                        transform: 'translateY(-4px)',
                                    },
                                }}
                                className="glass-effect"
                            >
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                    <Box
                                        sx={{
                                            width: 48,
                                            height: 48,
                                            borderRadius: '12px',
                                            backgroundColor: `${stat.color}20`,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: stat.color,
                                        }}
                                    >
                                        {stat.icon}
                                    </Box>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 0.5,
                                            color: stat.change >= 0 ? '#30d158' : '#ff2d55',
                                            backgroundColor: stat.change >= 0 ? 'rgba(48, 209, 88, 0.1)' : 'rgba(255, 45, 85, 0.1)',
                                            px: 1,
                                            py: 0.5,
                                            borderRadius: '6px',
                                            fontSize: '0.875rem',
                                        }}
                                    >
                                        {stat.change >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                                        {Math.abs(stat.change)}%
                                    </Box>
                                </Box>
                                <Typography
                                    variant="h4"
                                    sx={{
                                        fontSize: '1.75rem',
                                        fontWeight: 600,
                                        color: 'var(--text-primary)',
                                        mb: 0.5,
                                    }}
                                >
                                    {stat.value}
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: '0.875rem',
                                        color: 'var(--text-secondary)',
                                    }}
                                >
                                    {stat.title}
                                </Typography>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>

                <Grid container spacing={3}>
                    {/* Financial Overview */}
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
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontSize: '1.125rem',
                                        fontWeight: 600,
                                        color: 'var(--text-primary)',
                                    }}
                                >
                                    RESUMEN FINANCIERO
                                </Typography>
                                <IconButton size="small">
                                    <Download size={18} />
                                </IconButton>
                            </Box>
                            <Grid container spacing={3}>
                                {[
                                    {
                                        title: 'Ingresos',
                                        current: mockFinancialData.revenue.total,
                                        previous: mockFinancialData.revenue.previousTotal,
                                        color: '#30d158',
                                        breakdown: mockFinancialData.revenue.breakdown,
                                    },
                                    {
                                        title: 'Gastos',
                                        current: mockFinancialData.expenses.total,
                                        previous: mockFinancialData.expenses.previousTotal,
                                        color: '#ff2d55',
                                        breakdown: mockFinancialData.expenses.breakdown,
                                    },
                                ].map((section, index) => (
                                    <Grid item xs={12} md={6} key={index}>
                                        <Box sx={{ mb: 3 }}>
                                            <Typography
                                                sx={{
                                                    fontSize: '0.875rem',
                                                    color: 'var(--text-secondary)',
                                                    mb: 1,
                                                }}
                                            >
                                                {section.title}
                                            </Typography>
                                            <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 2, mb: 2 }}>
                                                <Typography
                                                    variant="h4"
                                                    sx={{
                                                        color: section.color,
                                                        fontWeight: 600,
                                                    }}
                                                >
                                                    ${section.current.toLocaleString()}
                                                </Typography>
                                                <Typography
                                                    sx={{
                                                        color: 'var(--text-secondary)',
                                                        fontSize: '0.875rem',
                                                        mb: 1,
                                                    }}
                                                >
                                                    vs ${section.previous.toLocaleString()}
                                                </Typography>
                                            </Box>
                                            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                                {section.breakdown.map((item, i) => (
                                                    <Chip
                                                        key={i}
                                                        label={
                                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                                                {item.label}
                                                                <Box
                                                                    component="span"
                                                                    sx={{
                                                                        display: 'flex',
                                                                        alignItems: 'center',
                                                                        color: item.growth >= 0 ? '#30d158' : '#ff2d55',
                                                                    }}
                                                                >
                                                                    {item.growth >= 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                                                                    {Math.abs(item.growth)}%
                                                                </Box>
                                                            </Box>
                                                        }
                                                        size="small"
                                                        sx={{
                                                            backgroundColor: 'var(--surface-secondary)',
                                                            '& .MuiChip-label': {
                                                                color: 'var(--text-primary)',
                                                            },
                                                        }}
                                                    />
                                                ))}
                                            </Box>
                                        </Box>
                                    </Grid>
                                ))}
                            </Grid>
                        </Paper>
                    </Grid>

                    {/* Action Plans Progress */}
                    <Grid item xs={12} lg={4}>
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
                                PLANES DE ACCIÓN
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                                {mockActionPlans.map((plan, index) => (
                                    <Box key={index}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                            <Box>
                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        color: 'var(--text-primary)',
                                                        fontWeight: 500,
                                                        mb: 0.5,
                                                    }}
                                                >
                                                    {plan.name}
                                                </Typography>
                                                <Typography
                                                    variant="caption"
                                                    sx={{
                                                        color: 'var(--text-secondary)',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: 1,
                                                    }}
                                                >
                                                    <Users size={12} />
                                                    {plan.owner}
                                                </Typography>
                                            </Box>
                                            <Chip
                                                icon={getStatusIcon(plan.status)}
                                                label={`${plan.progress}%`}
                                                size="small"
                                                sx={{
                                                    backgroundColor: getStatusColor(plan.status).bg,
                                                    color: getStatusColor(plan.status).text,
                                                    '& .MuiChip-icon': {
                                                        color: 'inherit',
                                                    },
                                                }}
                                            />
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

                    {/* Legal Status */}
                    <Grid item xs={12} lg={6}>
                        <Paper
                            sx={{
                                p: 3,
                                borderRadius: '12px',
                                backgroundColor: 'var(--surface-primary)',
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
                                ESTADO LEGAL
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                                {mockLegalStatus.map((item, index) => (
                                    <Box key={index}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        color: 'var(--text-primary)',
                                                        fontWeight: 500,
                                                    }}
                                                >
                                                    {item.category}
                                                </Typography>
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: 0.5,
                                                        color: item.growth >= 0 ? '#30d158' : '#ff2d55',
                                                        fontSize: '0.75rem',
                                                    }}
                                                >
                                                    {item.growth >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                                                    {Math.abs(item.growth)}%
                                                </Box>
                                            </Box>
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    color: 'var(--text-secondary)',
                                                }}
                                            >
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

                    {/* Recent Agreements */}
                    <Grid item xs={12} lg={6}>
                        <Paper
                            sx={{
                                p: 3,
                                borderRadius: '12px',
                                backgroundColor: 'var(--surface-primary)',
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
                                ACUERDOS RECIENTES
                            </Typography>
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Acuerdo</TableCell>
                                            <TableCell>Responsable</TableCell>
                                            <TableCell>Progreso</TableCell>
                                            <TableCell>Estado</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {mockAgreements.map((agreement, index) => (
                                            <TableRow key={index}>
                                                <TableCell>
                                                    <Typography
                                                        sx={{
                                                            color: 'var(--text-primary)',
                                                            fontWeight: 500,
                                                        }}
                                                    >
                                                        {agreement.title}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography
                                                        sx={{
                                                            color: 'var(--text-secondary)',
                                                            fontSize: '0.875rem',
                                                        }}
                                                    >
                                                        {agreement.owner}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                        <LinearProgress
                                                            variant="determinate"
                                                            value={agreement.progress}
                                                            sx={{
                                                                width: 60,
                                                                height: 6,
                                                                borderRadius: 3,
                                                                backgroundColor: 'var(--surface-secondary)',
                                                                '& .MuiLinearProgress-bar': {
                                                                    backgroundColor: getStatusColor(agreement.status).text,
                                                                    borderRadius: 3,
                                                                },
                                                            }}
                                                        />
                                                        <Typography
                                                            sx={{
                                                                color: 'var(--text-secondary)',
                                                                fontSize: '0.875rem',
                                                            }}
                                                        >
                                                            {agreement.progress}%
                                                        </Typography>
                                                    </Box>
                                                </TableCell>
                                                <TableCell>
                                                    <Chip
                                                        icon={getStatusIcon(agreement.status)}
                                                        label={agreement.status === 'completed' ? 'Completado' : 'En Proceso'}
                                                        size="small"
                                                        sx={{
                                                            backgroundColor: getStatusColor(agreement.status).bg,
                                                            color: getStatusColor(agreement.status).text,
                                                            '& .MuiChip-icon': {
                                                                color: 'inherit',
                                                            },
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
                </Grid>

                {/* Add new sections after the existing Grid container */}
                <Grid container spacing={3} sx={{ mt: 3 }}>
                    {/* TO-DOs Section */}
                    <Grid item xs={12} lg={4}>
                        <Paper
                            sx={{
                                p: 3,
                                borderRadius: '12px',
                                backgroundColor: 'var(--surface-primary)',
                                height: '100%',
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
                                    TO-DOs
                                </Typography>
                                <Chip
                                    label={`${mockTodos.filter(t => t.status === 'pending').length} pendientes`}
                                    size="small"
                                    sx={{
                                        backgroundColor: 'rgba(255, 149, 0, 0.1)',
                                        color: '#ff9500',
                                    }}
                                />
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                {mockTodos.map((todo, index) => (
                                    <Box
                                        key={index}
                                        sx={{
                                            p: 2,
                                            borderRadius: '8px',
                                            backgroundColor: 'var(--surface-secondary)',
                                            border: '1px solid var(--border-color)',
                                        }}
                                    >
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                            <Typography
                                                sx={{
                                                    color: 'var(--text-primary)',
                                                    fontWeight: 500,
                                                    fontSize: '0.875rem',
                                                }}
                                            >
                                                {todo.title}
                                            </Typography>
                                            <Chip
                                                label={todo.priority}
                                                size="small"
                                                sx={{
                                                    backgroundColor: todo.priority === 'high' ? 'rgba(255, 45, 85, 0.1)' : 'rgba(0, 113, 227, 0.1)',
                                                    color: todo.priority === 'high' ? '#ff2d55' : '#0071e3',
                                                    height: '20px',
                                                    fontSize: '0.75rem',
                                                }}
                                            />
                                        </Box>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <Typography
                                                sx={{
                                                    color: 'var(--text-secondary)',
                                                    fontSize: '0.75rem',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 1,
                                                }}
                                            >
                                                <Users size={12} />
                                                {todo.assignee}
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    color: 'var(--text-secondary)',
                                                    fontSize: '0.75rem',
                                                }}
                                            >
                                                Vence: {new Date(todo.dueDate).toLocaleDateString()}
                                            </Typography>
                                        </Box>
                                    </Box>
                                ))}
                            </Box>
                        </Paper>
                    </Grid>

                    {/* Account Status Section */}
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
                                ESTADO DE CUENTAS
                            </Typography>
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Cuenta</TableCell>
                                            <TableCell align="right">Balance</TableCell>
                                            <TableCell align="right">Pendiente</TableCell>
                                            <TableCell>Estado</TableCell>
                                            <TableCell>Última Actualización</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {mockAccountStatus.map((account, index) => (
                                            <TableRow key={index}>
                                                <TableCell>
                                                    <Typography
                                                        sx={{
                                                            color: 'var(--text-primary)',
                                                            fontWeight: 500,
                                                        }}
                                                    >
                                                        {account.account}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell align="right">
                                                    <Typography
                                                        sx={{
                                                            color: '#30d158',
                                                            fontWeight: 600,
                                                        }}
                                                    >
                                                        ${account.balance.toLocaleString()}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell align="right">
                                                    <Typography
                                                        sx={{
                                                            color: account.pending > 0 ? '#ff9500' : 'var(--text-secondary)',
                                                            fontWeight: account.pending > 0 ? 600 : 400,
                                                        }}
                                                    >
                                                        ${account.pending.toLocaleString()}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Chip
                                                        label={account.status === 'active' ? 'Activa' : 'Inactiva'}
                                                        size="small"
                                                        sx={{
                                                            backgroundColor: account.status === 'active' ? 'rgba(48, 209, 88, 0.1)' : 'rgba(255, 45, 85, 0.1)',
                                                            color: account.status === 'active' ? '#30d158' : '#ff2d55',
                                                        }}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <Typography
                                                        sx={{
                                                            color: 'var(--text-secondary)',
                                                            fontSize: '0.875rem',
                                                        }}
                                                    >
                                                        {new Date(account.lastUpdate).toLocaleDateString()}
                                                    </Typography>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};
