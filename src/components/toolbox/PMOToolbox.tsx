import React, { useState } from 'react';
import {
    Box,
    Container,
    Paper,
    Typography,
    Grid,
    LinearProgress,
    Button,
    List,
    ListItem,
    Tabs,
    Tab,
    IconButton,
    Tooltip,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Chip,
} from '@mui/material';
import {
    FileSpreadsheet,
    BarChart2,
    DollarSign,
    Download,
    TrendingUp,
    Clock,
    CheckCircle2,
    AlertCircle,
} from 'lucide-react';

// Types
interface AccountProgress {
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

interface ProgressReport {
    project: string;
    status: 'completed' | 'in_progress' | 'delayed';
    progress: number;
    lastUpdate: string;
    dueDate: string;
    responsible: string;
}

interface FinancialData {
    company: string;
    revenue: number;
    expenses: number;
    profit: number;
    growth: number;
}

// Mock data
const mockAccounts: AccountProgress[] = [
    {
        name: "Cuenta 1",
        progress: {
            estrategia: 50,
            setup: 93.5,
            acompanamiento: 70,
            gerencia: 14,
            produccion: 20,
            difusion: 30,
        }
    },
    {
        name: "Cuenta 2",
        progress: {
            estrategia: 80,
            setup: 65,
            acompanamiento: 45,
            gerencia: 30,
            produccion: 55,
            difusion: 40,
        }
    },
];

const mockProgressReports: ProgressReport[] = [
    {
        project: "Automatización de Procesos",
        status: "completed",
        progress: 100,
        lastUpdate: "2024-02-20",
        dueDate: "2024-02-25",
        responsible: "Equipo DevOps"
    },
    {
        project: "Migración de Base de Datos",
        status: "in_progress",
        progress: 75,
        lastUpdate: "2024-02-19",
        dueDate: "2024-03-01",
        responsible: "Equipo Backend"
    },
    {
        project: "Implementación CRM",
        status: "delayed",
        progress: 45,
        lastUpdate: "2024-02-18",
        dueDate: "2024-02-15",
        responsible: "Equipo Integración"
    }
];

const mockFinancialData: FinancialData[] = [
    {
        company: "Espora",
        revenue: 1500000,
        expenses: 900000,
        profit: 600000,
        growth: 15.5,
    },
    {
        company: "Mapa",
        revenue: 800000,
        expenses: 450000,
        profit: 350000,
        growth: 12.3,
    },
    {
        company: "Interlogis",
        revenue: 1200000,
        expenses: 750000,
        profit: 450000,
        growth: 8.7,
    },
];

const getStatusColor = (status: ProgressReport['status']) => {
    const colors = {
        completed: { bg: 'rgba(48, 209, 88, 0.1)', text: '#30d158' },
        in_progress: { bg: 'rgba(0, 113, 227, 0.1)', text: '#0071e3' },
        delayed: { bg: 'rgba(255, 45, 85, 0.1)', text: '#ff2d55' },
    };
    return colors[status];
};

const getStatusLabel = (status: ProgressReport['status']) => {
    const labels = {
        completed: 'Completado',
        in_progress: 'En Progreso',
        delayed: 'Retrasado',
    };
    return labels[status];
};

export const PMOToolbox: React.FC = () => {
    const [currentTab, setCurrentTab] = useState(0);

    const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
        setCurrentTab(newValue);
    };

    const renderAccountProgress = () => (
        <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
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
                        Importar Excel
                    </Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: 2,
                            p: 4,
                            border: '2px dashed var(--border-color)',
                            borderRadius: '8px',
                            backgroundColor: 'var(--surface-secondary)',
                        }}
                    >
                        <FileSpreadsheet size={48} color="var(--text-secondary)" />
                        <Button
                            variant="outlined"
                            sx={{
                                color: 'var(--text-primary)',
                                borderColor: 'var(--border-color)',
                                '&:hover': {
                                    borderColor: 'var(--text-primary)',
                                },
                            }}
                        >
                            Seleccionar archivo
                        </Button>
                        <Typography
                            variant="caption"
                            sx={{
                                color: 'var(--text-secondary)',
                                textAlign: 'center',
                            }}
                        >
                            Arrastra y suelta tu archivo Excel o haz clic para seleccionarlo
                        </Typography>
                    </Box>
                </Paper>
            </Grid>

            <Grid item xs={12} md={8}>
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
                        Avance de Cuentas
                    </Typography>
                    <List>
                        {mockAccounts.map((account, index) => (
                            <ListItem
                                key={index}
                                sx={{
                                    flexDirection: 'column',
                                    alignItems: 'stretch',
                                    gap: 2,
                                    py: 2,
                                    borderBottom: '1px solid var(--border-color)',
                                }}
                            >
                                <Typography
                                    variant="subtitle1"
                                    sx={{
                                        fontWeight: 600,
                                        color: 'var(--text-primary)',
                                    }}
                                >
                                    {account.name}
                                </Typography>
                                <Grid container spacing={2}>
                                    {Object.entries(account.progress).map(([key, value]) => (
                                        <Grid item xs={12} sm={6} key={key}>
                                            <Box sx={{ mb: 1 }}>
                                                <Typography
                                                    variant="caption"
                                                    sx={{
                                                        color: 'var(--text-secondary)',
                                                        textTransform: 'capitalize',
                                                    }}
                                                >
                                                    {key}
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        color: 'var(--text-primary)',
                                                        fontWeight: 600,
                                                    }}
                                                >
                                                    {value}%
                                                </Typography>
                                            </Box>
                                            <LinearProgress
                                                variant="determinate"
                                                value={value}
                                                sx={{
                                                    height: 6,
                                                    borderRadius: 3,
                                                    backgroundColor: 'var(--surface-secondary)',
                                                    '& .MuiLinearProgress-bar': {
                                                        backgroundColor: value < 30 ? '#ff3b30' :
                                                            value < 70 ? '#ff9500' : '#30d158',
                                                        borderRadius: 3,
                                                    },
                                                }}
                                            />
                                        </Grid>
                                    ))}
                                </Grid>
                            </ListItem>
                        ))}
                    </List>
                </Paper>
            </Grid>
        </Grid>
    );

    const renderProgressReports = () => (
        <Paper
            sx={{
                borderRadius: '12px',
                backgroundColor: 'var(--surface-primary)',
                overflow: 'hidden',
            }}
            className="glass-effect"
        >
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Proyecto</TableCell>
                            <TableCell>Estado</TableCell>
                            <TableCell>Progreso</TableCell>
                            <TableCell>Última Actualización</TableCell>
                            <TableCell>Fecha Límite</TableCell>
                            <TableCell>Responsable</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {mockProgressReports.map((report, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    <Typography
                                        sx={{
                                            color: 'var(--text-primary)',
                                            fontWeight: 500,
                                        }}
                                    >
                                        {report.project}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={getStatusLabel(report.status)}
                                        sx={{
                                            backgroundColor: getStatusColor(report.status).bg,
                                            color: getStatusColor(report.status).text,
                                            fontWeight: 500,
                                        }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <LinearProgress
                                            variant="determinate"
                                            value={report.progress}
                                            sx={{
                                                width: 100,
                                                height: 6,
                                                borderRadius: 3,
                                                backgroundColor: 'var(--surface-secondary)',
                                                '& .MuiLinearProgress-bar': {
                                                    backgroundColor: report.status === 'delayed' ? '#ff3b30' :
                                                        report.status === 'completed' ? '#30d158' : '#0071e3',
                                                    borderRadius: 3,
                                                },
                                            }}
                                        />
                                        <Typography
                                            sx={{
                                                color: 'var(--text-primary)',
                                                fontWeight: 500,
                                            }}
                                        >
                                            {report.progress}%
                                        </Typography>
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Typography sx={{ color: 'var(--text-secondary)' }}>
                                        {new Date(report.lastUpdate).toLocaleDateString()}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography sx={{ color: 'var(--text-secondary)' }}>
                                        {new Date(report.dueDate).toLocaleDateString()}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography sx={{ color: 'var(--text-secondary)' }}>
                                        {report.responsible}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );

    const renderFinancialBalance = () => (
        <Grid container spacing={3}>
            {mockFinancialData.map((data, index) => (
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
                    Toolbox
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
                            label="Avance de Cuentas"
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
                            icon={<TrendingUp size={16} />}
                            iconPosition="start"
                            label="Reporte de Avances"
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
                            label="Balance Financiero"
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
                    {currentTab === 0 && renderAccountProgress()}
                    {currentTab === 1 && renderProgressReports()}
                    {currentTab === 2 && renderFinancialBalance()}
                </Box>
            </Container>
        </Box>
    );
};
