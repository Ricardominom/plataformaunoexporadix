import React, { useState } from 'react';
import {
    Box,
    Button,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    Tooltip,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from '@mui/material';
import { Plus, Edit, Trash2, AlertTriangle, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { NewIndicatorDialog } from '../Forms/NewIndicatorDialog';
import { useNotification } from '../../../context/NotificationContext';

// Import mock data from centralized data module
import { actionPlans } from '../../../data/ssc';

interface ActionPlan {
    id: string;
    indicator: string;
    goal: number;
    achieved: number;
    progress: number;
}

// Component for the delete confirmation dialog
interface DeleteConfirmDialogProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    planName: string;
}

const DeleteConfirmDialog: React.FC<DeleteConfirmDialogProps> = ({ open, onClose, onConfirm, planName }) => {
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
                    <AlertTriangle size={24} color="#ff2d55" />
                </Box>
                Confirmar eliminación
            </DialogTitle>
            <DialogContent sx={{ p: 3, pt: 3 }}>
                <Typography sx={{ color: 'var(--text-primary)', lineHeight: 1.6 }}>
                    ¿Estás seguro de que deseas eliminar el indicador "{planName}"? Esta acción no se puede deshacer.
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

// Component for editing an action plan
interface EditActionPlanDialogProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (plan: ActionPlan) => void;
    plan: ActionPlan | null;
}

const EditActionPlanDialog: React.FC<EditActionPlanDialogProps> = ({
    open,
    onClose,
    onSubmit,
    plan
}) => {
    const [formData, setFormData] = useState<ActionPlan | null>(null);

    React.useEffect(() => {
        if (plan) {
            setFormData({...plan});
        }
    }, [plan]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (formData) {
            // Calculate progress based on achieved and goal
            const progress = Math.round((formData.achieved / formData.goal) * 100);
            onSubmit({
                ...formData,
                progress
            });
        }
    };

    if (!formData) return null;

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
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
                        Editar Indicador
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
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                        <TextField
                            label="Nombre del indicador"
                            fullWidth
                            value={formData.indicator}
                            onChange={(e) => setFormData({ ...formData, indicator: e.target.value })}
                            required
                            size="small"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '8px',
                                    backgroundColor: 'var(--surface-secondary)',
                                    '&:hover': {
                                        backgroundColor: 'var(--surface-secondary)',
                                    },
                                    '&.Mui-focused': {
                                        backgroundColor: 'var(--surface-secondary)',
                                        boxShadow: '0 0 0 3px rgba(0, 113, 227, 0.1)',
                                    },
                                },
                                '& .MuiInputLabel-root': {
                                    color: 'var(--text-secondary)',
                                },
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'var(--border-color)',
                                },
                                '& .MuiInputBase-input': {
                                    color: 'var(--text-primary)',
                                },
                            }}
                        />

                        <TextField
                            label="Meta"
                            type="number"
                            value={formData.goal}
                            onChange={(e) => setFormData({ ...formData, goal: Number(e.target.value) })}
                            required
                            size="small"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '8px',
                                    backgroundColor: 'var(--surface-secondary)',
                                    '&:hover': {
                                        backgroundColor: 'var(--surface-secondary)',
                                    },
                                    '&.Mui-focused': {
                                        backgroundColor: 'var(--surface-secondary)',
                                        boxShadow: '0 0 0 3px rgba(0, 113, 227, 0.1)',
                                    },
                                },
                                '& .MuiInputLabel-root': {
                                    color: 'var(--text-secondary)',
                                },
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'var(--border-color)',
                                },
                                '& .MuiInputBase-input': {
                                    color: 'var(--text-primary)',
                                },
                            }}
                        />

                        <TextField
                            label="Realizado"
                            type="number"
                            value={formData.achieved}
                            onChange={(e) => setFormData({ ...formData, achieved: Number(e.target.value) })}
                            required
                            size="small"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '8px',
                                    backgroundColor: 'var(--surface-secondary)',
                                    '&:hover': {
                                        backgroundColor: 'var(--surface-secondary)',
                                    },
                                    '&.Mui-focused': {
                                        backgroundColor: 'var(--surface-secondary)',
                                        boxShadow: '0 0 0 3px rgba(0, 113, 227, 0.1)',
                                    },
                                },
                                '& .MuiInputLabel-root': {
                                    color: 'var(--text-secondary)',
                                },
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'var(--border-color)',
                                },
                                '& .MuiInputBase-input': {
                                    color: 'var(--text-primary)',
                                },
                            }}
                        />

                        <Box>
                            <Typography sx={{ color: 'var(--text-secondary)', mb: 1, fontSize: '0.875rem' }}>
                                Progreso calculado: {Math.round((formData.achieved / formData.goal) * 100)}%
                            </Typography>
                        </Box>
                    </Box>
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

export const ActionPlans: React.FC = () => {
    const [isNewIndicatorOpen, setIsNewIndicatorOpen] = useState(false);
    const [plans, setPlans] = useState<ActionPlan[]>(actionPlans.plans);
    const [editingPlan, setEditingPlan] = useState<ActionPlan | null>(null);
    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
    const [planToDelete, setPlanToDelete] = useState<ActionPlan | null>(null);
    const { addNotification } = useNotification();

    const handleNewIndicator = (indicator: {
        indicator: string;
        goal: number;
        achieved: number;
    }) => {
        const newIndicator = {
            id: (plans.length + 1).toString(),
            indicator: indicator.indicator,
            goal: indicator.goal,
            achieved: indicator.achieved,
            progress: Math.round((indicator.achieved / indicator.goal) * 100),
        };
        setPlans([...plans, newIndicator]);
        setIsNewIndicatorOpen(false);
        addNotification('Indicador agregado exitosamente');
    };

    const handleEditPlan = (plan: ActionPlan) => {
        setEditingPlan(plan);
    };

    const handleEditSubmit = (updatedPlan: ActionPlan) => {
        setPlans(prevPlans => 
            prevPlans.map(p => p.id === updatedPlan.id ? updatedPlan : p)
        );
        setEditingPlan(null);
        addNotification('Indicador actualizado exitosamente');
    };

    const handleDeleteClick = (plan: ActionPlan) => {
        setPlanToDelete(plan);
        setDeleteConfirmOpen(true);
    };

    const confirmDelete = () => {
        if (planToDelete) {
            setPlans(prevPlans => prevPlans.filter(p => p.id !== planToDelete.id));
            addNotification('Indicador eliminado exitosamente');
            setDeleteConfirmOpen(false);
            setPlanToDelete(null);
        }
    };

    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ color: 'var(--text-primary)' }}>
                    Avance de planes de acción
                </Typography>
                <Button
                    startIcon={<Plus size={16} />}
                    variant="outlined"
                    onClick={() => setIsNewIndicatorOpen(true)}
                    sx={{
                        color: '#ff2d55',
                        borderColor: '#ff2d55',
                        fontSize: '0.875rem',
                        fontWeight: 500,
                        textTransform: 'none',
                        px: 2.5,
                        borderRadius: '6px',
                        '&:hover': {
                            borderColor: '#ff2d55',
                            backgroundColor: 'rgba(255, 45, 85, 0.1)',
                        },
                    }}
                >
                    Agregar Indicador
                </Button>
            </Box>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Indicador</TableCell>
                            <TableCell align="right">Meta</TableCell>
                            <TableCell align="right">Realizado</TableCell>
                            <TableCell align="right">% de avance</TableCell>
                            <TableCell align="center">Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {plans.map((plan) => (
                            <TableRow key={plan.id}>
                                <TableCell>
                                    <Typography sx={{ color: 'var(--text-primary)' }}>
                                        {plan.indicator}
                                    </Typography>
                                </TableCell>
                                <TableCell align="right">
                                    <Typography sx={{ color: 'var(--text-primary)' }}>
                                        {plan.goal}
                                    </Typography>
                                </TableCell>
                                <TableCell align="right">
                                    <Typography sx={{ color: 'var(--text-primary)' }}>
                                        {plan.achieved}
                                    </Typography>
                                </TableCell>
                                <TableCell align="right">
                                    <Typography sx={{ color: 'var(--text-primary)' }}>
                                        {plan.progress}%
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                                        <Tooltip title="Editar">
                                            <IconButton 
                                                size="small" 
                                                onClick={() => handleEditPlan(plan)}
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
                                                onClick={() => handleDeleteClick(plan)}
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
                        {plans.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={5} align="center" sx={{ py: 3 }}>
                                    <Typography sx={{ color: 'var(--text-secondary)' }}>
                                        No hay indicadores disponibles
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Dialogs */}
            <NewIndicatorDialog
                open={isNewIndicatorOpen}
                onClose={() => setIsNewIndicatorOpen(false)}
                onSubmit={handleNewIndicator}
            />

            <EditActionPlanDialog
                open={!!editingPlan}
                onClose={() => setEditingPlan(null)}
                onSubmit={handleEditSubmit}
                plan={editingPlan}
            />

            {planToDelete && (
                <DeleteConfirmDialog
                    open={deleteConfirmOpen}
                    onClose={() => {
                        setDeleteConfirmOpen(false);
                        setPlanToDelete(null);
                    }}
                    onConfirm={confirmDelete}
                    planName={planToDelete.indicator}
                />
            )}
        </>
    );
};