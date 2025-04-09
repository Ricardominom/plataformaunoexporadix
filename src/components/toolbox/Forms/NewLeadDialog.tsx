import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Box,
    Typography,
    IconButton,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Grid,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { X } from 'lucide-react';
import dayjs from 'dayjs';

interface NewLeadDialogProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (lead: {
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
    }) => void;
}

const initialFormState = {
    cuenta: '',
    estatus: 'Activo' as const,
    comentariosVentas: '',
    enlace: '',
    contacto: '',
    cita: dayjs().format('YYYY-MM-DD'),
    presentacion: false,
    propuesta: 'Pendiente' as const,
    escenarioAprobado: false,
    monto: 0,
    pagos: '',
    contrato: false,
    arranque: dayjs().format('YYYY-MM-DD'),
    comentarios: '',
};

export const NewLeadDialog: React.FC<NewLeadDialogProps> = ({
    open,
    onClose,
    onSubmit,
}) => {
    const [formData, setFormData] = useState(initialFormState);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
        setFormData(initialFormState);
        onClose();
    };

    const handleClose = () => {
        setFormData(initialFormState);
        onClose();
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
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
                        Nuevo LEAD
                    </Typography>
                    <IconButton
                        onClick={handleClose}
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
                                    onChange={(e) => setFormData({ ...formData, estatus: e.target.value as typeof formData.estatus })}
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
                                    onChange={(e) => setFormData({ ...formData, propuesta: e.target.value as typeof formData.propuesta })}
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
                        onClick={handleClose}
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
                        Crear LEAD
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};