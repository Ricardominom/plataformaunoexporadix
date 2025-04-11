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
    Button,
    Chip,
    IconButton,
    TextField,
    InputAdornment,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Tooltip,
} from '@mui/material';
import {
    Plus,
    Search,
    Edit,
    Trash2,
    AlertTriangle,
    X,
} from 'lucide-react';
import { DatePicker } from '@mui/x-date-pickers';
import { motion } from 'framer-motion';
import dayjs from 'dayjs';
import { NewLeadDialog } from './Forms/NewLeadDialog';
import { useNotification } from '../../context/NotificationContext';

// Import mock data from centralized data module
import { leads } from '../../data/comercial';

interface ComercialLead {
    id: string;
    cuenta: string;
    estatus: 'Activo' | 'En pausa' | 'Cerrado' | 'Perdido';
    comentariosVentas: string;
    enlace: string;
    contacto: string;
    cita: string;
    presentacion: boolean;
    propuesta: 'Realizada' | 'En revisión' | 'Aceptada' | 'Pendiente';
    escenarioAprobado: boolean;
    monto: number;
    pagos: string;
    contrato: boolean;
    arranque: string;
    comentarios: string;
}

const getStatusColor = (status: ComercialLead['estatus']) => {
    const colors = {
        'Activo': { bg: 'rgba(48, 209, 88, 0.1)', text: '#30d158' },
        'En pausa': { bg: 'rgba(255, 149, 0, 0.1)', text: '#ff9500' },
        'Cerrado': { bg: 'rgba(0, 113, 227, 0.1)', text: '#0071e3' },
        'Perdido': { bg: 'rgba(255, 45, 85, 0.1)', text: '#ff2d55' }
    };
    return colors[status];
};

const getPropuestaColor = (propuesta: ComercialLead['propuesta']) => {
    const colors = {
        'Realizada': { bg: 'rgba(255, 149, 0, 0.1)', text: '#ff9500' },
        'En revisión': { bg: 'rgba(0, 113, 227, 0.1)', text: '#0071e3' },
        'Aceptada': { bg: 'rgba(48, 209, 88, 0.1)', text: '#30d158' },
        'Pendiente': { bg: 'rgba(255, 45, 85, 0.1)', text: '#ff2d55' }
    };
    return colors[propuesta];
};

// Component for the delete confirmation dialog
interface DeleteConfirmDialogProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    leadName: string;
}

const DeleteConfirmDialog: React.FC<DeleteConfirmDialogProps> = ({ open, onClose, onConfirm, leadName }) => {
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
                    ¿Estás seguro de que deseas eliminar el LEAD "{leadName}"? Esta acción no se puede deshacer.
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

// Component for editing a lead
interface EditLeadDialogProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (lead: ComercialLead) => void;
    lead: ComercialLead | null;
}

const EditLeadDialog: React.FC<EditLeadDialogProps> = ({
    open,
    onClose,
    onSubmit,
    lead
}) => {
    const [formData, setFormData] = useState<ComercialLead | null>(null);

    React.useEffect(() => {
        if (lead) {
            setFormData({...lead});
        }
    }, [lead]);

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
                        Editar LEAD
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
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Cuenta"
                                fullWidth
                                required
                                value={formData.cuenta}
                                onChange={(e) => setFormData({ ...formData, cuenta: e.target.value })}
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
                                <InputLabel>Estatus</InputLabel>
                                <Select
                                    value={formData.estatus}
                                    label="Estatus"
                                    onChange={(e) => setFormData({ ...formData, estatus: e.target.value as ComercialLead['estatus'] })}
                                    sx={{
                                        borderRadius: '8px',
                                        backgroundColor: 'var(--surface-secondary)',
                                    }}
                                >
                                    <MenuItem value="Activo">Activo</MenuItem>
                                    <MenuItem value="En pausa">En pausa</MenuItem>
                                    <MenuItem value="Cerrado">Cerrado</MenuItem>
                                    <MenuItem value="Perdido">Perdido</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                label="Comentarios Ventas"
                                fullWidth
                                multiline
                                rows={2}
                                value={formData.comentariosVentas}
                                onChange={(e) => setFormData({ ...formData, comentariosVentas: e.target.value })}
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
                                label="Enlace"
                                fullWidth
                                required
                                value={formData.enlace}
                                onChange={(e) => setFormData({ ...formData, enlace: e.target.value })}
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
                                label="Contacto"
                                fullWidth
                                required
                                value={formData.contacto}
                                onChange={(e) => setFormData({ ...formData, contacto: e.target.value })}
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
                            <DatePicker
                                label="Fecha de Cita"
                                value={dayjs(formData.cita)}
                                onChange={(date) => setFormData({ ...formData, cita: date?.format('YYYY-MM-DD') || dayjs().format('YYYY-MM-DD') })}
                                slotProps={{
                                    textField: {
                                        size: 'small',
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
                            <FormControl fullWidth size="small">
                                <InputLabel>Propuesta</InputLabel>
                                <Select
                                    value={formData.propuesta}
                                    label="Propuesta"
                                    onChange={(e) => setFormData({ ...formData, propuesta: e.target.value as ComercialLead['propuesta'] })}
                                    sx={{
                                        borderRadius: '8px',
                                        backgroundColor: 'var(--surface-secondary)',
                                    }}
                                >
                                    <MenuItem value="Realizada">Realizada</MenuItem>
                                    <MenuItem value="En revisión">En revisión</MenuItem>
                                    <MenuItem value="Aceptada">Aceptada</MenuItem>
                                    <MenuItem value="Pendiente">Pendiente</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Monto"
                                type="number"
                                fullWidth
                                required
                                value={formData.monto}
                                onChange={(e) => setFormData({ ...formData, monto: Number(e.target.value) })}
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
                                label="Pagos"
                                fullWidth
                                value={formData.pagos}
                                onChange={(e) => setFormData({ ...formData, pagos: e.target.value })}
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
                            <DatePicker
                                label="Fecha de Arranque"
                                value={dayjs(formData.arranque)}
                                onChange={(date) => setFormData({ ...formData, arranque: date?.format('YYYY-MM-DD') || dayjs().format('YYYY-MM-DD') })}
                                slotProps={{
                                    textField: {
                                        size: 'small',
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
                            <FormControl fullWidth size="small">
                                <InputLabel>Presentación</InputLabel>
                                <Select
                                    value={formData.presentacion ? "true" : "false"}
                                    label="Presentación"
                                    onChange={(e) => setFormData({ ...formData, presentacion: e.target.value === "true" })}
                                    sx={{
                                        borderRadius: '8px',
                                        backgroundColor: 'var(--surface-secondary)',
                                    }}
                                >
                                    <MenuItem value="true">Realizada</MenuItem>
                                    <MenuItem value="false">Pendiente</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth size="small">
                                <InputLabel>Contrato</InputLabel>
                                <Select
                                    value={formData.contrato ? "true" : "false"}
                                    label="Contrato"
                                    onChange={(e) => setFormData({ ...formData, contrato: e.target.value === "true" })}
                                    sx={{
                                        borderRadius: '8px',
                                        backgroundColor: 'var(--surface-secondary)',
                                    }}
                                >
                                    <MenuItem value="true">Firmado</MenuItem>
                                    <MenuItem value="false">Pendiente</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth size="small">
                                <InputLabel>Escenario Aprobado</InputLabel>
                                <Select
                                    value={formData.escenarioAprobado ? "true" : "false"}
                                    label="Escenario Aprobado"
                                    onChange={(e) => setFormData({ ...formData, escenarioAprobado: e.target.value === "true" })}
                                    sx={{
                                        borderRadius: '8px',
                                        backgroundColor: 'var(--surface-secondary)',
                                    }}
                                >
                                    <MenuItem value="true">Sí</MenuItem>
                                    <MenuItem value="false">No</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                label="Comentarios"
                                fullWidth
                                multiline
                                rows={2}
                                value={formData.comentarios}
                                onChange={(e) => setFormData({ ...formData, comentarios: e.target.value })}
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

export const ComercialTool: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [leadsList, setLeadsList] = useState<ComercialLead[]>(leads.leads);
    const [isNewLeadDialogOpen, setIsNewLeadDialogOpen] = useState(false);
    const [editingLead, setEditingLead] = useState<ComercialLead | null>(null);
    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
    const [leadToDelete, setLeadToDelete] = useState<ComercialLead | null>(null);
    const { addNotification } = useNotification();

    const handleNewLead = (lead: Omit<ComercialLead, 'id'>) => {
        const newLead: ComercialLead = {
            ...lead,
            id: (leadsList.length + 1).toString(),
        };

        setLeadsList([newLead, ...leadsList]);
        addNotification('list', 'created', {
            id: newLead.id,
            title: `Nuevo LEAD: ${newLead.cuenta}`,
            listId: newLead.id,
            completed: false,
            createdAt: new Date().toISOString(),
        });
    };

    const handleEditLead = (lead: ComercialLead) => {
        setEditingLead(lead);
    };

    const handleEditSubmit = (updatedLead: ComercialLead) => {
        setLeadsList(prevLeads => 
            prevLeads.map(lead => lead.id === updatedLead.id ? updatedLead : lead)
        );
        setEditingLead(null);
        addNotification('LEAD actualizado exitosamente');
    };

    const handleDeleteClick = (lead: ComercialLead) => {
        setLeadToDelete(lead);
        setDeleteConfirmOpen(true);
    };

    const confirmDelete = () => {
        if (leadToDelete) {
            setLeadsList(prevLeads => prevLeads.filter(lead => lead.id !== leadToDelete.id));
            addNotification('LEAD eliminado exitosamente');
            setDeleteConfirmOpen(false);
            setLeadToDelete(null);
        }
    };

    const filteredLeads = leadsList.filter(lead => {
        if (!searchTerm) return true;
        const searchLower = searchTerm.toLowerCase();
        return (
            lead.cuenta.toLowerCase().includes(searchLower) ||
            lead.enlace.toLowerCase().includes(searchLower) ||
            lead.comentariosVentas.toLowerCase().includes(searchLower)
        );
    });

    return (
        <Box sx={{
            pt: 'calc(var(--nav-height) + 24px)',
            pb: 4,
            px: { xs: 2, sm: 3, md: 4 },
            minHeight: '100vh',
            backgroundColor: 'var(--app-bg)',
        }}>
            <Container maxWidth="xl">
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 4,
                }}>
                    <Typography
                        variant="h4"
                        sx={{
                            fontSize: '2rem',
                            fontWeight: 600,
                            color: 'var(--text-primary)',
                        }}
                    >
                        Reporte del Estado de Ventas
                        Prospección
                    </Typography>

                    <Button
                        variant="contained"
                        startIcon={<Plus size={16} />}
                        onClick={() => setIsNewLeadDialogOpen(true)}
                        sx={{
                            backgroundColor: '#0071e3',
                            color: '#ffffff',
                            fontSize: '0.875rem',
                            fontWeight: 500,
                            textTransform: 'none',
                            px: 2.5,
                            borderRadius: '6px',
                            '&:hover': {
                                backgroundColor: '#0077ED',
                            },
                        }}
                    >
                        Agregar LEADs
                    </Button>
                </Box>

                <Box sx={{ mb: 4 }}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Buscar oportunidades..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search size={16} color="var(--text-secondary)" />
                                </InputAdornment>
                            ),
                            sx: {
                                fontSize: '0.875rem',
                                height: '36px',
                                backgroundColor: 'var(--surface-secondary)',
                                color: 'var(--text-primary)',
                                '&:hover': {
                                    backgroundColor: 'var(--hover-bg)',
                                },
                                '& .MuiInputBase-input::placeholder': {
                                    color: 'var(--text-secondary)',
                                    opacity: 1,
                                },
                            }
                        }}
                        sx={{
                            maxWidth: '600px',
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '8px',
                                '& fieldset': { border: 'none' },
                                '&:hover fieldset': { border: 'none' },
                                '&.Mui-focused fieldset': { border: 'none' },
                            },
                        }}
                    />
                </Box>

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
                                    <TableCell>Cuenta</TableCell>
                                    <TableCell>Estatus</TableCell>
                                    <TableCell>Comentarios Ventas</TableCell>
                                    <TableCell>Enlace</TableCell>
                                    <TableCell>Contacto</TableCell>
                                    <TableCell>Cita</TableCell>
                                    <TableCell>Presentación</TableCell>
                                    <TableCell>Propuesta</TableCell>
                                    <TableCell>Monto</TableCell>
                                    <TableCell>Pagos</TableCell>
                                    <TableCell>Contrato</TableCell>
                                    <TableCell>Arranque</TableCell>
                                    <TableCell>Comentarios</TableCell>
                                    <TableCell align="center">Acciones</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredLeads.map((lead) => (
                                    <TableRow key={lead.id}>
                                        <TableCell>
                                            <Typography
                                                sx={{
                                                    color: 'var(--text-primary)',
                                                    fontWeight: 500,
                                                }}
                                            >
                                                {lead.cuenta}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Chip
                                                label={lead.estatus}
                                                size="small"
                                                sx={{
                                                    backgroundColor: getStatusColor(lead.estatus).bg,
                                                    color: getStatusColor(lead.estatus).text,
                                                    fontSize: '0.75rem',
                                                    height: '24px',
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Typography
                                                sx={{
                                                    color: 'var(--text-secondary)',
                                                    fontSize: '0.875rem',
                                                    maxWidth: 200,
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap',
                                                }}
                                            >
                                                {lead.comentariosVentas}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>{lead.enlace}</TableCell>
                                        <TableCell>{lead.contacto}</TableCell>
                                        <TableCell>
                                            {new Date(lead.cita).toLocaleDateString()}
                                        </TableCell>
                                        <TableCell>
                                            <Chip
                                                label={lead.presentacion ? 'Realizada' : 'Pendiente'}
                                                size="small"
                                                sx={{
                                                    backgroundColor: lead.presentacion ? 'rgba(48, 209, 88, 0.1)' : 'rgba(255, 149, 0, 0.1)',
                                                    color: lead.presentacion ? '#30d158' : '#ff9500',
                                                    fontSize: '0.75rem',
                                                    height: '24px',
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Chip
                                                label={lead.propuesta}
                                                size="small"
                                                sx={{
                                                    backgroundColor: getPropuestaColor(lead.propuesta).bg,
                                                    color: getPropuestaColor(lead.propuesta).text,
                                                    fontSize: '0.75rem',
                                                    height: '24px',
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Typography
                                                sx={{
                                                    color: 'var(--text-primary)',
                                                    fontWeight: 500,
                                                }}
                                            >
                                                ${lead.monto.toLocaleString()}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>{lead.pagos}</TableCell>
                                        <TableCell>
                                            <Chip
                                                label={lead.contrato ? 'Firmado' : 'Pendiente'}
                                                size="small"
                                                sx={{
                                                    backgroundColor: lead.contrato ? 'rgba(48, 209, 88, 0.1)' : 'rgba(255, 149, 0, 0.1)',
                                                    color: lead.contrato ? '#30d158' : '#ff9500',
                                                    fontSize: '0.75rem',
                                                    height: '24px',
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            {new Date(lead.arranque).toLocaleDateString()}
                                        </TableCell>
                                        <TableCell>
                                            <Typography
                                                sx={{
                                                    color: 'var(--text-secondary)',
                                                    fontSize: '0.875rem',
                                                    maxWidth: 200,
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap',
                                                }}
                                            >
                                                {lead.comentarios}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                                                <Tooltip title="Editar">
                                                    <IconButton 
                                                        size="small" 
                                                        onClick={() => handleEditLead(lead)}
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
                                                        onClick={() => handleDeleteClick(lead)}
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
                                {filteredLeads.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={14} align="center" sx={{ py: 3 }}>
                                            <Typography sx={{ color: 'var(--text-secondary)' }}>
                                                No se encontraron LEADs
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>

                <NewLeadDialog
                    open={isNewLeadDialogOpen}
                    onClose={() => setIsNewLeadDialogOpen(false)}
                    onSubmit={handleNewLead}
                />

                <EditLeadDialog
                    open={!!editingLead}
                    onClose={() => setEditingLead(null)}
                    onSubmit={handleEditSubmit}
                    lead={editingLead}
                />

                {leadToDelete && (
                    <DeleteConfirmDialog
                        open={deleteConfirmOpen}
                        onClose={() => {
                            setDeleteConfirmOpen(false);
                            setLeadToDelete(null);
                        }}
                        onConfirm={confirmDelete}
                        leadName={leadToDelete.cuenta}
                    />
                )}
            </Container>
        </Box>
    );
};