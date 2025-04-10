import React, { useState } from 'react';
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
    Tabs,
    Tab,
    IconButton,
    Badge,
    Chip,
    LinearProgress,
    Tooltip,
} from '@mui/material';
import {
    FileSpreadsheet,
    DollarSign,
    Download,
    BarChart2,
    Clock,
    CheckCircle2,
    AlertCircle,
} from 'lucide-react';

// Import mock data from centralized data module
import {
    financialMetrics,
    holdingProjects,
    inmobiliariaProjects,
} from '../../data/admin-interlogis';

const getStatusColor = (status: string) => {
    const colors = {
        completed: { bg: 'rgba(48, 209, 88, 0.1)', text: '#30d158' },
        in_progress: { bg: 'rgba(0, 113, 227, 0.1)', text: '#0071e3' },
        delayed: { bg: 'rgba(255, 45, 85, 0.1)', text: '#ff2d55' },
    };
    return colors[status as keyof typeof colors] || colors.in_progress;
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
            return <Clock size={16} />;
    }
};

const getStatusLabel = (status: string) => {
    const labels = {
        completed: 'Completado',
        in_progress: 'En Progreso',
        delayed: 'Retrasado',
    };
    return labels[status as keyof typeof labels] || status;
};

export const AdminInterlogisToolbox: React.FC = () => {
    const [currentTab, setCurrentTab] = useState(0);

    const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
        setCurrentTab(newValue);
    };

    const renderFinancialBalance = () => (
        <Grid container spacing={3}>
            {[
                {
                    category: 'Ingresos',
                    current: currentTab === 0 ? financialMetrics.holding.revenue.total : financialMetrics.inmobiliaria.revenue.total,
                    previous: currentTab === 0 ? financialMetrics.holding.revenue.previous : financialMetrics.inmobiliaria.revenue.previous,
                    change: ((currentTab === 0 ? financialMetrics.holding.revenue.total : financialMetrics.inmobiliaria.revenue.total) -
                        (currentTab === 0 ? financialMetrics.holding.revenue.previous : financialMetrics.inmobiliaria.revenue.previous)) /
                        (currentTab === 0 ? financialMetrics.holding.revenue.previous : financialMetrics.inmobiliaria.revenue.previous) * 100,
                    breakdown: currentTab === 0 ? financialMetrics.holding.revenue.breakdown : financialMetrics.inmobiliaria.revenue.breakdown,
                },
                {
                    category: 'Gastos',
                    current: currentTab === 0 ? financialMetrics.holding.expenses.total : financialMetrics.inmobiliaria.expenses.total,
                    previous: currentTab === 0 ? financialMetrics.holding.expenses.previous : financialMetrics.inmobiliaria.expenses.previous,
                    change: ((currentTab === 0 ? financialMetrics.holding.expenses.total : financialMetrics.inmobiliaria.expenses.total) -
                        (currentTab === 0 ? financialMetrics.holding.expenses.previous : financialMetrics.inmobiliaria.expenses.previous)) /
                        (currentTab === 0 ? financialMetrics.holding.expenses.previous : financialMetrics.inmobiliaria.expenses.previous) * 100,
                    breakdown: currentTab === 0 ? financialMetrics.holding.expenses.breakdown : financialMetrics.inmobiliaria.expenses.breakdown,
                },
                {
                    category: 'Beneficio',
                    current: currentTab === 0 ? financialMetrics.holding.profit.total : financialMetrics.inmobiliaria.profit.total,
                    previous: currentTab === 0 ? financialMetrics.holding.profit.previous : financialMetrics.inmobiliaria.profit.previous,
                    change: ((currentTab === 0 ? financialMetrics.holding.profit.total : financialMetrics.inmobiliaria.profit.total) -
                        (currentTab === 0 ? financialMetrics.holding.profit.previous : financialMetrics.inmobiliaria.profit.previous)) /
                        (currentTab === 0 ? financialMetrics.holding.profit.previous : financialMetrics.inmobiliaria.profit.previous) * 100,
                },
            ].map((data, index) => (
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
                                {data.category}
                            </Typography>
                            <IconButton size="small">
                                <Download size={18} />
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
                                    color: data.category === 'Gastos' ? '#ff2d55' : '#30d158',
                                    fontWeight: 600,
                                    fontSize: '1.5rem',
                                }}
                            >
                                ${data.current.toLocaleString()}
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
                                    color: data.category === 'Gastos' ? '#ff2d55' : '#30d158',
                                    fontWeight: 600,
                                    fontSize: '1.5rem',
                                    opacity: 0.7,
                                }}
                            >
                                ${data.previous.toLocaleString()}
                            </Typography>
                        </Box>

                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                                color: data.change >= 0 ? '#30d158' : '#ff2d55',
                            }}
                        >
                            <BarChart2 size={16} />
                            <Typography
                                sx={{
                                    fontWeight: 500,
                                }}
                            >
                                {data.change.toFixed(1)}% vs mes anterior
                            </Typography>
                        </Box>
                    </Paper>
                </Grid>
            ))}
        </Grid>
    );

    const renderProjectTable = (projects: typeof holdingProjects.projects | typeof inmobiliariaProjects.projects) => (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Proyecto</TableCell>
                        <TableCell>Estado</TableCell>
                        <TableCell>Progreso</TableCell>
                        <TableCell>Responsable</TableCell>
                        <TableCell>Fecha Inicio</TableCell>
                        <TableCell>Fecha Fin</TableCell>
                        <TableCell>Presupuesto</TableCell>
                        <TableCell>Gastado</TableCell>
                        <TableCell>% Utilizado</TableCell>
                        <TableCell align="right">Acciones</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {projects.map((project, index) => (
                        <TableRow key={index}>
                            <TableCell>
                                <Typography
                                    sx={{
                                        color: 'var(--text-primary)',
                                        fontWeight: 500,
                                    }}
                                >
                                    {project.name}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Chip
                                    icon={getStatusIcon(project.status)}
                                    label={getStatusLabel(project.status)}
                                    size="small"
                                    sx={{
                                        backgroundColor: getStatusColor(project.status).bg,
                                        color: getStatusColor(project.status).text,
                                        '& .MuiChip-icon': {
                                            color: 'inherit',
                                        },
                                    }}
                                />
                            </TableCell>
                            <TableCell>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: 150 }}>
                                    <LinearProgress
                                        variant="determinate"
                                        value={project.progress}
                                        sx={{
                                            flex: 1,
                                            height: 6,
                                            borderRadius: 3,
                                            backgroundColor: 'var(--surface-secondary)',
                                            '& .MuiLinearProgress-bar': {
                                                backgroundColor: getStatusColor(project.status).text,
                                                borderRadius: 3,
                                            },
                                        }}
                                    />
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: 'var(--text-primary)',
                                            minWidth: 40,
                                        }}
                                    >
                                        {project.progress}%
                                    </Typography>
                                </Box>
                            </TableCell>
                            <TableCell>{project.responsible}</TableCell>
                            <TableCell>
                                {new Date(project.startDate).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                                {new Date(project.endDate).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                                ${project.budget.toLocaleString()}
                            </TableCell>
                            <TableCell>
                                ${project.spent.toLocaleString()}
                            </TableCell>
                            <TableCell>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <BarChart2
                                        size={16}
                                        color={(project.spent / project.budget) > 0.9 ? '#ff2d55' : '#30d158'}
                                    />
                                    <Typography
                                        sx={{
                                            color: (project.spent / project.budget) > 0.9 ? '#ff2d55' : '#30d158',
                                        }}
                                    >
                                        {Math.round((project.spent / project.budget) * 100)}%
                                    </Typography>
                                </Box>
                            </TableCell>
                            <TableCell align="right">
                                <IconButton
                                    size="small"
                                    sx={{
                                        color: 'var(--text-secondary)',
                                        '&:hover': {
                                            backgroundColor: 'var(--hover-bg)',
                                            color: 'var(--text-primary)',
                                        },
                                    }}
                                >
                                    <Download size={16} />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
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
                    {renderFinancialBalance()}
                </Box>

                <Box sx={{ mt: 4 }}>
                    <Paper
                        sx={{
                            borderRadius: '12px',
                            overflow: 'hidden',
                            backgroundColor: 'var(--surface-primary)',
                        }}
                        className="glass-effect"
                    >
                        <Box sx={{ p: 3, borderBottom: '1px solid var(--border-color)' }}>
                            <Typography
                                variant="h6"
                                sx={{
                                    fontSize: '1.125rem',
                                    fontWeight: 600,
                                    color: 'var(--text-primary)',
                                }}
                            >
                                Proyectos Activos
                            </Typography>
                        </Box>
                        {currentTab === 0 && renderProjectTable(holdingProjects.projects)}
                        {currentTab === 1 && renderProjectTable(inmobiliariaProjects.projects)}
                    </Paper>
                </Box>
            </Container>
        </Box>
    );
};