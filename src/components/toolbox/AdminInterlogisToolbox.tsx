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
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Slider,
} from '@mui/material';
import {
    FileSpreadsheet,
    DollarSign,
    Download,
    BarChart2,
    Clock,
    CheckCircle2,
    AlertCircle,
    Edit,
    Trash2,
    X,
    Plus,
} from 'lucide-react';
import { DatePicker } from '@mui/x-date-pickers';
import { motion } from 'framer-motion';
import dayjs from 'dayjs';
import { useNotification } from '../../context/NotificationContext';

// Import mock data from centralized data module
import {
    financialMetrics,
    holdingProjects as initialHoldingProjects,
    inmobiliariaProjects as initialInmobiliariaProjects,
} from '../../data/admin-interlogis';

interface Project {
    name: string;
    progress: number;
    status: 'completed' | 'in_progress' | 'delayed';
    startDate: string;
    endDate: string;
    responsible: string;
    budget: number;
    spent: number;
}

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

// Component for the delete confirmation dialog
interface DeleteConfirmDialogProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    projectName: string;
}

const DeleteConfirmDialog: React.FC<DeleteConfirmDialogProps> = ({ open, onClose, onConfirm, projectName }) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            PaperProps={{
                elevation: 0,
                component: motion.div,
                initial: { opacity: 0, y: 20, scale: 0.9 },
                animate: { opacity: 1, y: 0, scale: 1 },
                exit: { opacity: 0, y: 20, scale: 0.9 },
                transition: { duration: 0.2 },
                sx: {
                    borderRadius: '12px',
                    backgroundColor: 'var(--surface-primary)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid var(--border-color)',
                    maxWidth: '400px',
                    width: '100%',
                    mx: 2,
                },
            }}
        >
            <DialogTitle sx={{
                fontSize: '1.125rem',
                fontWeight: 600,
                color: 'var(--text-primary)',
                p: 3,
                borderBottom: '1px solid var(--border-color)',
                display: 'flex',
                alignItems: 'center',
                gap: 2,
            }}>
                <Box
                    sx={{
                        width: 40,
                        height: 40,
                        borderRadius: '10px',
                        backgroundColor: 'rgba(255, 45, 85, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <AlertCircle size={24} color="#ff2d55" />
                </Box>
                Confirmar eliminación
            </DialogTitle>
            <DialogContent sx={{ p: 3, pt: 3 }}>
                <Typography sx={{ color: 'var(--text-primary)', lineHeight: 1.6 }}>
                    ¿Estás seguro de que deseas eliminar el proyecto "{projectName}"? Esta acción no se puede deshacer.
                </Typography>
            </DialogContent>
            <DialogActions sx={{
                p: 3,
                pt: 0,
                borderTop: 'none',
                gap: 1,
                display: 'flex',
                justifyContent: 'flex-end',
            }}>
                <Button
                    onClick={onClose}
                    sx={{
                        color: 'var(--text-secondary)',
                        fontSize: '0.9375rem',
                        fontWeight: 500,
                        textTransform: 'none',
                        px: 3,
                        py: 1,
                        borderRadius: '8px',
                        '&:hover': {
                            backgroundColor: 'var(--hover-bg)',
                            color: 'var(--text-primary)',
                        },
                    }}
                >
                    Cancelar
                </Button>
                <Button
                    onClick={onConfirm}
                    startIcon={<Trash2 size={18} />}
                    sx={{
                        backgroundColor: '#ff3b30',
                        color: '#fff',
                        fontSize: '0.9375rem',
                        fontWeight: 500,
                        textTransform: 'none',
                        px: 3,
                        py: 1,
                        borderRadius: '8px',
                        boxShadow: 'none',
                        '&:hover': {
                            backgroundColor: '#ff453a',
                            boxShadow: '0 2px 8px rgba(255, 59, 48, 0.3)',
                        },
                    }}
                >
                    Eliminar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

// Component for editing a project
interface EditProjectDialogProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (project: Project) => void;
    project: Project | null;
}

const EditProjectDialog: React.FC<EditProjectDialogProps> = ({
    open,
    onClose,
    onSubmit,
    project
}) => {
    const [formData, setFormData] = useState<Project | null>(null);

    React.useEffect(() => {
        if (project) {
            setFormData({...project});
        }
    }, [project]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (formData) {
            onSubmit(formData);
        }
    };

    if (!formData) return null;

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
            PaperProps={{
                elevation: 0,
                sx: {
                    borderRadius: '12px',
                    backgroundColor: 'var(--surface-primary)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid var(--border-color)',
                    overflow: 'hidden',
                },
            }}
        >
            <form onSubmit={handleSubmit}>
                <DialogTitle
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        p: 2,
                        borderBottom: '1px solid var(--border-color)',
                        backgroundColor: 'var(--surface-secondary)',
                    }}
                >
                    <Typography
                        variant="h6"
                        sx={{
                            fontSize: '1.125rem',
                            fontWeight: 600,
                            color: 'var(--text-primary)',
                            letterSpacing: '-0.025em',
                        }}
                    >
                        Editar Proyecto
                    </Typography>
                    <IconButton
                        onClick={onClose}
                        size="small"
                        sx={{
                            color: 'var(--text-secondary)',
                            '&:hover': {
                                backgroundColor: 'var(--hover-bg)',
                                color: 'var(--text-primary)',
                            },
                        }}
                    >
                        <X size={18} />
                    </IconButton>
                </DialogTitle>

                <DialogContent sx={{ p: 3, backgroundColor: 'var(--surface-primary)' }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                label="Nombre del Proyecto"
                                fullWidth
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                size="small"
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '8px',
                                        backgroundColor: 'var(--surface-secondary)',
                                    },
                                }}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth size="small">
                                <InputLabel>Estado</InputLabel>
                                <Select
                                    value={formData.status}
                                    label="Estado"
                                    onChange={(e) => setFormData({ ...formData, status: e.target.value as Project['status'] })}
                                    sx={{
                                        borderRadius: '8px',
                                        backgroundColor: 'var(--surface-secondary)',
                                    }}
                                >
                                    <MenuItem value="completed">Completado</MenuItem>
                                    <MenuItem value="in_progress">En Progreso</MenuItem>
                                    <MenuItem value="delayed">Retrasado</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Responsable"
                                fullWidth
                                required
                                value={formData.responsible}
                                onChange={(e) => setFormData({ ...formData, responsible: e.target.value })}
                                size="small"
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '8px',
                                        backgroundColor: 'var(--surface-secondary)',
                                    },
                                }}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Typography variant="subtitle2" gutterBottom>
                                Progreso: {formData.progress}%
                            </Typography>
                            <Slider
                                value={formData.progress}
                                onChange={(_, newValue) => setFormData({ ...formData, progress: newValue as number })}
                                aria-labelledby="progress-slider"
                                valueLabelDisplay="auto"
                                step={5}
                                marks
                                min={0}
                                max={100}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <DatePicker
                                label="Fecha de Inicio"
                                value={dayjs(formData.startDate)}
                                onChange={(date) => setFormData({ ...formData, startDate: date?.format('YYYY-MM-DD') || dayjs().format('YYYY-MM-DD') })}
                                slotProps={{
                                    textField: {
                                        size: 'small',
                                        fullWidth: true,
                                        sx: {
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: '8px',
                                                backgroundColor: 'var(--surface-secondary)',
                                            },
                                        },
                                    },
                                }}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <DatePicker
                                label="Fecha de Fin"
                                value={dayjs(formData.endDate)}
                                onChange={(date) => setFormData({ ...formData, endDate: date?.format('YYYY-MM-DD') || dayjs().format('YYYY-MM-DD') })}
                                slotProps={{
                                    textField: {
                                        size: 'small',
                                        fullWidth: true,
                                        sx: {
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: '8px',
                                                backgroundColor: 'var(--surface-secondary)',
                                            },
                                        },
                                    },
                                }}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Presupuesto"
                                type="number"
                                fullWidth
                                required
                                value={formData.budget}
                                onChange={(e) => setFormData({ ...formData, budget: Number(e.target.value) })}
                                size="small"
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '8px',
                                        backgroundColor: 'var(--surface-secondary)',
                                    },
                                }}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Gastado"
                                type="number"
                                fullWidth
                                required
                                value={formData.spent}
                                onChange={(e) => setFormData({ ...formData, spent: Number(e.target.value) })}
                                size="small"
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '8px',
                                        backgroundColor: 'var(--surface-secondary)',
                                    },
                                }}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>

                <DialogActions
                    sx={{
                        p: 2,
                        borderTop: '1px solid var(--border-color)',
                        backgroundColor: 'var(--surface-secondary)',
                        gap: 1,
                    }}
                >
                    <Button
                        onClick={onClose}
                        sx={{
                            color: 'var(--text-secondary)',
                            fontSize: '0.875rem',
                            fontWeight: 500,
                            textTransform: 'none',
                            px: 2.5,
                            borderRadius: '6px',
                            '&:hover': {
                                backgroundColor: 'var(--hover-bg)',
                                color: 'var(--text-primary)',
                            },
                        }}
                    >
                        Cancelar
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{
                            backgroundColor: '#0071e3',
                            color: '#fff',
                            fontSize: '0.875rem',
                            fontWeight: 500,
                            textTransform: 'none',
                            px: 2.5,
                            borderRadius: '6px',
                            boxShadow: 'none',
                            '&:hover': {
                                backgroundColor: '#0077ED',
                                boxShadow: 'none',
                            },
                        }}
                    >
                        Guardar Cambios
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export const AdminInterlogisToolbox: React.FC = () => {
    const [currentTab, setCurrentTab] = useState(0);
    const [holdingProjects, setHoldingProjects] = useState<Project[]>(initialHoldingProjects.projects);
    const [inmobiliariaProjects, setInmobiliariaProjects] = useState<Project[]>(initialInmobiliariaProjects.projects);
    const [editingProject, setEditingProject] = useState<Project | null>(null);
    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
    const [projectToDelete, setProjectToDelete] = useState<{project: Project, isHolding: boolean} | null>(null);
    const { addNotification } = useNotification();

    const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
        setCurrentTab(newValue);
    };

    const handleEditProject = (project: Project, isHolding: boolean) => {
        setEditingProject(project);
    };

    const handleEditSubmit = (updatedProject: Project) => {
        // Determine which list to update based on the current tab
        if (currentTab === 0) {
            setHoldingProjects(prevProjects => 
                prevProjects.map(project => project.name === updatedProject.name ? updatedProject : project)
            );
        } else {
            setInmobiliariaProjects(prevProjects => 
                prevProjects.map(project => project.name === updatedProject.name ? updatedProject : project)
            );
        }
        setEditingProject(null);
        addNotification('Proyecto actualizado exitosamente');
    };

    const handleDeleteClick = (project: Project, isHolding: boolean) => {
        setProjectToDelete({ project, isHolding });
        setDeleteConfirmOpen(true);
    };

    const confirmDelete = () => {
        if (projectToDelete) {
            if (projectToDelete.isHolding) {
                setHoldingProjects(prevProjects => 
                    prevProjects.filter(project => project.name !== projectToDelete.project.name)
                );
            } else {
                setInmobiliariaProjects(prevProjects => 
                    prevProjects.filter(project => project.name !== projectToDelete.project.name)
                );
            }
            addNotification('Proyecto eliminado exitosamente');
            setDeleteConfirmOpen(false);
            setProjectToDelete(null);
        }
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

    const renderProjectTable = (projects: typeof holdingProjects.projects | typeof inmobiliariaProjects.projects, isHolding: boolean) => (
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
                        <TableCell align="center">Acciones</TableCell>
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
                            <TableCell align="center">
                                <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                                    <Tooltip title="Editar">
                                        <IconButton 
                                            size="small" 
                                            onClick={() => handleEditProject(project, isHolding)}
                                            sx={{
                                                color: 'var(--text-secondary)',
                                                '&:hover': {
                                                    backgroundColor: 'rgba(0, 113, 227, 0.1)',
                                                    color: '#0071e3',
                                                },
                                            }}
                                        >
                                            <Edit size={16} />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Eliminar">
                                        <IconButton 
                                            size="small" 
                                            onClick={() => handleDeleteClick(project, isHolding)}
                                            sx={{
                                                color: 'var(--text-secondary)',
                                                '&:hover': {
                                                    backgroundColor: 'rgba(255, 45, 85, 0.1)',
                                                    color: '#ff2d55',
                                                },
                                            }}
                                        >
                                            <Trash2 size={16} />
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                            </TableCell>
                        </TableRow>
                    ))}
                    {projects.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={10} align="center" sx={{ py: 3 }}>
                                <Typography sx={{ color: 'var(--text-secondary)' }}>
                                    No hay proyectos disponibles
                                </Typography>
                            </TableCell>
                        </TableRow>
                    )}
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
                        {currentTab === 0 && renderProjectTable(holdingProjects, true)}
                        {currentTab === 1 && renderProjectTable(inmobiliariaProjects, false)}
                    </Paper>
                </Box>
            </Container>

            {/* Edit Project Dialog */}
            <EditProjectDialog
                open={!!editingProject}
                onClose={() => setEditingProject(null)}
                onSubmit={handleEditSubmit}
                project={editingProject}
            />

            {/* Delete Confirmation Dialog */}
            {projectToDelete && (
                <DeleteConfirmDialog
                    open={deleteConfirmOpen}
                    onClose={() => {
                        setDeleteConfirmOpen(false);
                        setProjectToDelete(null);
                    }}
                    onConfirm={confirmDelete}
                    projectName={projectToDelete.project.name}
                />
            )}
        </Box>
    );
};