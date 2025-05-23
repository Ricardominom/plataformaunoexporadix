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
    Button,
} from '@mui/material';
import {
    Download,
    Plus,
    Code2,
    CheckCircle2,
    Clock,
    AlertCircle,
    Zap,
    Database,
    Bot,
    Workflow,
} from 'lucide-react';

// Import mock data from centralized data module
import { automationProjects } from '../../data/research-dev';

// Project type icons and colors
const typeConfig = {
    'RPA': { icon: <Workflow size={16} />, color: '#0071e3' },
    'ML': { icon: <Database size={16} />, color: '#5856d6' },
    'AI': { icon: <Bot size={16} />, color: '#ff9500' },
};

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

export const ResearchDevToolbox: React.FC = () => {
    const [projects] = useState(automationProjects.projects);

    // Calculate overall metrics
    const metrics = {
        totalProjects: projects.length,
        completedProjects: projects.filter(p => p.status === 'completed').length,
        avgTimeReduction: Math.round(projects.reduce((acc, p) => acc + p.timeReduction, 0) / projects.length),
        avgErrorReduction: Math.round(projects.reduce((acc, p) => acc + p.errorReduction, 0) / projects.length),
    };

    return (
        <Box sx={{
            pt: 'calc(var(--nav-height) + 24px)',
            pb: 4,
            px: { xs: 2, sm: 3, md: 4 },
            minHeight: '100vh',
            backgroundColor: 'var(--app-bg)',
        }}>
            <Container maxWidth="xl">
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                    <Box>
                        <Typography
                            variant="h4"
                            sx={{
                                fontSize: '2rem',
                                fontWeight: 600,
                                color: 'var(--text-primary)',
                                mb: 1,
                            }}
                        >
                            Avance de Automatización
                        </Typography>
                        <Typography
                            sx={{
                                fontSize: '1rem',
                                color: 'var(--text-secondary)',
                            }}
                        >
                            Seguimiento de proyectos de automatización e inteligencia artificial
                        </Typography>
                    </Box>
                    <Button
                        variant="contained"
                        startIcon={<Plus size={16} />}
                        sx={{
                            backgroundColor: '#0071e3',
                            color: '#fff',
                            '&:hover': {
                                backgroundColor: '#0077ED',
                            },
                        }}
                    >
                        Nuevo Proyecto
                    </Button>
                </Box>

                {/* Quick Stats Section */}
                <Grid container spacing={3} sx={{ mb: 4 }}>
                    {[
                        {
                            title: 'Proyectos Totales',
                            value: metrics.totalProjects,
                            icon: <Code2 size={24} />,
                            color: '#0071e3',
                        },
                        {
                            title: 'Proyectos Completados',
                            value: metrics.completedProjects,
                            icon: <CheckCircle2 size={24} />,
                            color: '#30d158',
                        },
                        {
                            title: 'Reducción de Tiempo Promedio',
                            value: `${metrics.avgTimeReduction}%`,
                            icon: <Clock size={24} />,
                            color: '#ff9500',
                        },
                        {
                            title: 'Reducción de Errores Promedio',
                            value: `${metrics.avgErrorReduction}%`,
                            icon: <Zap size={24} />,
                            color: '#5856d6',
                        },
                    ].map((stat, index) => (
                        <Grid item xs={12} sm={6} md={3} key={index}>
                            <Paper
                                sx={{
                                    p: 3,
                                    borderRadius: '12px',
                                    backgroundColor: 'var(--surface-primary)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 2,
                                }}
                                className="glass-effect"
                            >
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
                                <Box>
                                    <Typography
                                        sx={{
                                            fontSize: '0.875rem',
                                            color: 'var(--text-secondary)',
                                            mb: 0.5,
                                        }}
                                    >
                                        {stat.title}
                                    </Typography>
                                    <Typography
                                        sx={{
                                            fontSize: '1.5rem',
                                            fontWeight: 600,
                                            color: 'var(--text-primary)',
                                        }}
                                    >
                                        {stat.value}
                                    </Typography>
                                </Box>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>

                {/* Projects Table */}
                <Paper
                    sx={{
                        borderRadius: '12px',
                        overflow: 'hidden',
                        backgroundColor: 'var(--surface-primary)',
                    }}
                    className="glass-effect"
                >
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Proyecto</TableCell>
                                    <TableCell>Tipo</TableCell>
                                    <TableCell>Estado</TableCell>
                                    <TableCell>Progreso</TableCell>
                                    <TableCell>Responsable</TableCell>
                                    <TableCell>Última Actualización</TableCell>
                                    <TableCell>Próximo Hito</TableCell>
                                    <TableCell>Métricas</TableCell>
                                    <TableCell align="right">Acciones</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {projects.map((project) => (
                                    <TableRow key={project.id}>
                                        <TableCell>
                                            <Box sx={{ maxWidth: 300 }}>
                                                <Typography
                                                    sx={{
                                                        color: 'var(--text-primary)',
                                                        fontWeight: 500,
                                                        mb: 0.5,
                                                    }}
                                                >
                                                    {project.name}
                                                </Typography>
                                                <Typography
                                                    variant="caption"
                                                    sx={{
                                                        color: 'var(--text-secondary)',
                                                        display: '-webkit-box',
                                                        WebkitLineClamp: 2,
                                                        WebkitBoxOrient: 'vertical',
                                                        overflow: 'hidden',
                                                    }}
                                                >
                                                    {project.description}
                                                </Typography>
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            <Chip
                                                icon={typeConfig[project.type as keyof typeof typeConfig].icon}
                                                label={project.type}
                                                size="small"
                                                sx={{
                                                    backgroundColor: `${typeConfig[project.type as keyof typeof typeConfig].color}20`,
                                                    color: typeConfig[project.type as keyof typeof typeConfig].color,
                                                    '& .MuiChip-icon': {
                                                        color: 'inherit',
                                                    },
                                                }}
                                            />
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
                                            {new Date(project.lastUpdate).toLocaleDateString()}
                                        </TableCell>
                                        <TableCell>{project.nextMilestone}</TableCell>
                                        <TableCell>
                                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                                                <Typography variant="caption" sx={{ color: 'var(--text-secondary)' }}>
                                                    Tiempo: -{project.timeReduction}%
                                                </Typography>
                                                <Typography variant="caption" sx={{ color: 'var(--text-secondary)' }}>
                                                    Errores: -{project.errorReduction}%
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
                </Paper>
            </Container>
        </Box>
    );
};