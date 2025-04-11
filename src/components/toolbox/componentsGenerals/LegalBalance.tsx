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
    Chip,
    IconButton,
    Tooltip,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
} from '@mui/material';
import { Plus, Edit, Trash2, AlertTriangle, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { NewLegalSectionDialog } from '../Forms/NewLegalSectionDialog';
import { useNotification } from '../../../context/NotificationContext';

// Import mock data from centralized data module
import { legalCases } from '../../../data/ssc';

type StatusType = 'Listo' | 'En proceso' | 'Detenido';

interface LegalCase {
    id: string;
    apartado: string;
    tema: string | null;
    proyecto: StatusType;
    instancias: StatusType;
    concluido: StatusType;
}

const getStatusColor = (status: StatusType) => {
    const colors = {
        'Listo': { bg: 'rgba(48, 209, 88, 0.1)', text: '#30d158' },
        'En proceso': { bg: 'rgba(255, 149, 0, 0.1)', text: '#ff9500' },
        'Detenido': { bg: 'rgba(255, 45, 85, 0.1)', text: '#ff2d55' }
    };
    return colors[status];
};

const getApartadoColor = (apartado: string) => {
    const colors = {
        'Otros': '#ff2d55',
        'Gobierno Corporativo': '#0071e3',
        'Documentos propuestos': '#ff9500',
        'Contencioso Mercantil': '#30d158',
        'Contencioso Laboral': '#ff2d55'
    };
    return colors[apartado as keyof typeof colors] || '#86868b';
};

// Component for the delete confirmation dialog
interface DeleteConfirmDialogProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    caseName: string;
}

const DeleteConfirmDialog: React.FC<DeleteConfirmDialogProps> = ({ open, onClose, onConfirm, caseName }) => {
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
                    ¿Estás seguro de que deseas eliminar el apartado legal "{caseName}"? Esta acción no se puede deshacer.
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

// Component for editing a legal case
interface EditLegalCaseDialogProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (legalCase: LegalCase) => void;
    legalCase: LegalCase | null;
}

const apartadoOptions = [
    'Gobierno Corporativo',
    'Documentos propuestos',
    'Contencioso Mercantil',
    'Contencioso Laboral',
    'Otros',
];

const statusOptions = ['Listo', 'En proceso', 'Detenido'] as const;

const EditLegalCaseDialog: React.FC<EditLegalCaseDialogProps> = ({
    open,
    onClose,
    onSubmit,
    legalCase
}) => {
    const [formData, setFormData] = useState<LegalCase | null>(null);

    React.useEffect(() => {
        if (legalCase) {
            setFormData({...legalCase});
        }
    }, [legalCase]);

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
                        Editar Apartado Legal
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
                        <FormControl
                            fullWidth
                            required
                            size="small"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '8px',
                                    backgroundColor: 'var(--surface-secondary)',
                                },
                            }}
                        >
                            <InputLabel>Apartado</InputLabel>
                            <Select
                                value={formData.apartado}
                                label="Apartado"
                                onChange={(e) => setFormData({ ...formData, apartado: e.target.value })}
                            >
                                {apartadoOptions.map((option) => (
                                    <MenuItem key={option} value={option}>
                                        {option}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <TextField
                            label="Tema"
                            fullWidth
                            size="small"
                            value={formData.tema || ''}
                            onChange={(e) => setFormData({ ...formData, tema: e.target.value || null })}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '8px',
                                    backgroundColor: 'var(--surface-secondary)',
                                },
                            }}
                        />

                        <FormControl
                            fullWidth
                            required
                            size="small"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '8px',
                                    backgroundColor: 'var(--surface-secondary)',
                                },
                            }}
                        >
                            <InputLabel>Estado del Proyecto</InputLabel>
                            <Select
                                value={formData.proyecto}
                                label="Estado del Proyecto"
                                onChange={(e) => setFormData({ ...formData, proyecto: e.target.value as StatusType })}
                            >
                                {statusOptions.map((option) => (
                                    <MenuItem key={option} value={option}>
                                        {option}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl
                            fullWidth
                            required
                            size="small"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '8px',
                                    backgroundColor: 'var(--surface-secondary)',
                                },
                            }}
                        >
                            <InputLabel>Estado de Instancias</InputLabel>
                            <Select
                                value={formData.instancias}
                                label="Estado de Instancias"
                                onChange={(e) => setFormData({ ...formData, instancias: e.target.value as StatusType })}
                            >
                                {statusOptions.map((option) => (
                                    <MenuItem key={option} value={option}>
                                        {option}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl
                            fullWidth
                            required
                            size="small"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '8px',
                                    backgroundColor: 'var(--surface-secondary)',
                                },
                            }}
                        >
                            <InputLabel>Estado de Conclusión</InputLabel>
                            <Select
                                value={formData.concluido}
                                label="Estado de Conclusión"
                                onChange={(e) => setFormData({ ...formData, concluido: e.target.value as StatusType })}
                            >
                                {statusOptions.map((option) => (
                                    <MenuItem key={option} value={option}>
                                        {option}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
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

export const LegalBalance: React.FC = () => {
    const [isNewLegalSectionOpen, setIsNewLegalSectionOpen] = useState(false);
    const [cases, setCases] = useState<LegalCase[]>(legalCases.cases);
    const [editingCase, setEditingCase] = useState<LegalCase | null>(null);
    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
    const [caseToDelete, setCaseToDelete] = useState<LegalCase | null>(null);
    const { addNotification } = useNotification();

    const handleNewLegalSection = (section: {
        apartado: string;
        tema: string | null;
        proyecto: StatusType;
        instancias: StatusType;
        concluido: StatusType;
    }) => {
        const newCase = {
            id: (cases.length + 1).toString(),
            ...section,
        };
        setCases([...cases, newCase]);
        setIsNewLegalSectionOpen(false);
        addNotification('Apartado legal agregado exitosamente');
    };

    const handleEditCase = (legalCase: LegalCase) => {
        setEditingCase(legalCase);
    };

    const handleEditSubmit = (updatedCase: LegalCase) => {
        setCases(prevCases => 
            prevCases.map(c => c.id === updatedCase.id ? updatedCase : c)
        );
        setEditingCase(null);
        addNotification('Apartado legal actualizado exitosamente');
    };

    const handleDeleteClick = (legalCase: LegalCase) => {
        setCaseToDelete(legalCase);
        setDeleteConfirmOpen(true);
    };

    const confirmDelete = () => {
        if (caseToDelete) {
            setCases(prevCases => prevCases.filter(c => c.id !== caseToDelete.id));
            addNotification('Apartado legal eliminado exitosamente');
            setDeleteConfirmOpen(false);
            setCaseToDelete(null);
        }
    };

    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ color: 'var(--text-primary)' }}>
                    Balance Legal
                </Typography>
                <Button
                    startIcon={<Plus size={16} />}
                    variant="outlined"
                    onClick={() => setIsNewLegalSectionOpen(true)}
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
                    Agregar Apartado
                </Button>
            </Box>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Apartado</TableCell>
                            <TableCell>Tema</TableCell>
                            <TableCell>Proyecto</TableCell>
                            <TableCell>Instancias</TableCell>
                            <TableCell>Concluido</TableCell>
                            <TableCell align="center">Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cases.map((caso) => (
                            <TableRow key={caso.id}>
                                <TableCell>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Box
                                            sx={{
                                                width: 8,
                                                height: 8,
                                                borderRadius: '50%',
                                                backgroundColor: getApartadoColor(caso.apartado),
                                            }}
                                        />
                                        <Typography sx={{ color: 'var(--text-primary)' }}>
                                            {caso.apartado}
                                        </Typography>
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Typography sx={{ color: 'var(--text-primary)' }}>
                                        {caso.tema || '-'}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={caso.proyecto}
                                        size="small"
                                        sx={{
                                            backgroundColor: getStatusColor(caso.proyecto).bg,
                                            color: getStatusColor(caso.proyecto).text,
                                        }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={caso.instancias}
                                        size="small"
                                        sx={{
                                            backgroundColor: getStatusColor(caso.instancias).bg,
                                            color: getStatusColor(caso.instancias).text,
                                        }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={caso.concluido}
                                        size="small"
                                        sx={{
                                            backgroundColor: getStatusColor(caso.concluido).bg,
                                            color: getStatusColor(caso.concluido).text,
                                        }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                                        <Tooltip title="Editar">
                                            <IconButton 
                                                size="small" 
                                                onClick={() => handleEditCase(caso)}
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
                                                onClick={() => handleDeleteClick(caso)}
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
                        {cases.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
                                    <Typography sx={{ color: 'var(--text-secondary)' }}>
                                        No hay apartados legales disponibles
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Dialogs */}
            <NewLegalSectionDialog
                open={isNewLegalSectionOpen}
                onClose={() => setIsNewLegalSectionOpen(false)}
                onSubmit={handleNewLegalSection}
            />

            <EditLegalCaseDialog
                open={!!editingCase}
                onClose={() => setEditingCase(null)}
                onSubmit={handleEditSubmit}
                legalCase={editingCase}
            />

            {caseToDelete && (
                <DeleteConfirmDialog
                    open={deleteConfirmOpen}
                    onClose={() => {
                        setDeleteConfirmOpen(false);
                        setCaseToDelete(null);
                    }}
                    onConfirm={confirmDelete}
                    caseName={`${caseToDelete.apartado}${caseToDelete.tema ? ` - ${caseToDelete.tema}` : ''}`}
                />
            )}
        </>
    );
};