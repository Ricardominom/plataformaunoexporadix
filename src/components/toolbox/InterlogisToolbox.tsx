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
    Chip,
    LinearProgress,
    IconButton,
    Tabs,
    Tab,
} from '@mui/material';
import { Download, TrendingUp, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

// Mock data for Interlogis Holding
const mockHoldingProjects = [
    {
        name: 'Expansión Regional',
        progress: 75,
        status: 'in_progress',
        startDate: '2024-01-15',
        endDate: '2024-06-30',
        responsible: 'Juan Pérez',
        budget: 1500000,
        spent: 1000000,
    },
    {
        name: 'Optimización de Operaciones',
        progress: 90,
        status: 'completed',
        startDate: '2023-11-01',
        endDate: '2024-02-28',
        responsible: 'María González',
        budget: 800000,
        spent: 750000,
    },
    {
        name: 'Implementación ERP',
        progress: 30,
        status: 'delayed',
        startDate: '2024-02-01',
        endDate: '2024-07-31',
        responsible: 'Carlos Rodríguez',
        budget: 2000000,
        spent: 800000,
    },
];

// Mock data for Interlogis Inmobiliaria
const mockInmobiliariaProjects = [
    {
        name: 'Desarrollo Centro Logístico Norte',
        progress: 60,
        status: 'in_progress',
        startDate: '2024-01-01',
        endDate: '2024-12-31',
        responsible: 'Ana Martínez',
        budget: 5000000,
        spent: 2800000,
    },
    {
        name: 'Renovación Almacenes Sur',
        progress: 100,
        status: 'completed',
        startDate: '2023-09-15',
        endDate: '2024-02-15',
        responsible: 'Roberto Sánchez',
        budget: 1200000,
        spent: 1150000,
    },
    {
        name: 'Adquisición Terrenos Este',
        progress: 45,
        status: 'delayed',
        startDate: '2024-02-01',
        endDate: '2024-05-31',
        responsible: 'Patricia López',
        budget: 3000000,
        spent: 1500000,
    },
];

const getStatusColor = (status: string) => {
    const colors = {
        completed: { bg: 'rgba(48, 209, 88, 0.1)', text: '#30d158' },
        in_progress: { bg: 'rgba(0, 113, 227, 0.1)', text: '#0071e3' },
        delayed: { bg: 'rgba(255, 45, 85, 0.1)', text: '#ff2d55' },
    };
    return colors[status] || colors.in_progress;
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
    return labels[status] || status;
};

export const InterlogisToolbox: React.FC = () => {
    const [currentTab, setCurrentTab] = useState(0);

    const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
        setCurrentTab(newValue);
    };

    const renderProjectTable = (projects: typeof mockHoldingProjects) => (
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
                                    <TrendingUp
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
                    Reporte de Avances
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

                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Paper
                            sx={{
                                borderRadius: '12px',
                                overflow: 'hidden',
                                backgroundColor: 'var(--surface-primary)',
                            }}
                            className="glass-effect"
                        >
                            {currentTab === 0 && renderProjectTable(mockHoldingProjects)}
                            {currentTab === 1 && renderProjectTable(mockInmobiliariaProjects)}
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};
