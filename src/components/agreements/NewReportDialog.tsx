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
    Slider,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { X } from 'lucide-react';
import { motion } from 'framer-motion';
import dayjs from 'dayjs';

interface NewReportDialogProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (report: any) => void;
}

// Opciones para el estado del reporte
const statusOptions = [
    { value: 'completed', label: 'Completado' },
    { value: 'in_progress', label: 'En Progreso' },
    { value: 'delayed', label: 'Retrasado' },
];

// Opciones para responsables
const responsibleOptions = [
    'Gerente de Proyecto',
    'Coordinador PMO',
    'Líder Técnico',
    'Director de Operaciones',
    'Desarrollador Senior',
    'Analista de Negocio',
    'Especialista UX',
    'Tester Principal',
    'Arquitecto de Software',
];

// Estado inicial del formulario
const initialFormState = {
    project: '',
    status: 'in_progress',
    progress: 0,
    lastUpdate: dayjs(),
    dueDate: dayjs().add(1, 'month'),
    responsible: '',
};

// Estilos comunes para campos más compactos
const inputStyles = {
    '& .MuiOutlinedInput-root': {
        borderRadius: '8px',
        backgroundColor: 'var(--surface-secondary)',
        height: '40px',
        '&:hover': {
            backgroundColor: 'var(--surface-secondary)',
        },
        '&.Mui-focused': {
            backgroundColor: 'var(--surface-secondary)',
            boxShadow: '0 0 0 2px rgba(0, 113, 227, 0.1)',
        },
    },
    '& .MuiInputLabel-root': {
        color: 'var(--text-secondary)',
        fontSize: '0.8rem',
        transform: 'translate(14px, 12px) scale(1)',
        '&.MuiInputLabel-shrink': {
            transform: 'translate(14px, -6px) scale(0.75)',
        },
    },
    '& .MuiOutlinedInput-notchedOutline': {
        borderColor: 'var(--border-color)',
    },
    '& .MuiInputBase-input': {
        color: 'var(--text-primary)',
        fontSize: '0.8rem',
        padding: '8px 14px',
    },
};

export const NewReportDialog: React.FC<NewReportDialogProps> = ({
    open,
    onClose,
    onSubmit,
}) => {
    const [formData, setFormData] = useState(initialFormState);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({
            ...formData,
            lastUpdate: formData.lastUpdate.format('YYYY-MM-DD'),
            dueDate: formData.dueDate.format('YYYY-MM-DD'),
        });
        setFormData(initialFormState); // Reset form to initial state
    };

    const handleClose = () => {
        setFormData(initialFormState); // Reset form when closing
        onClose();
    };

    const handleProgressChange = (_: Event, newValue: number | number[]) => {
        setFormData({
            ...formData,
            progress: Array.isArray(newValue) ? newValue[0] : newValue
        });
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="md"
            fullWidth
            sx={{
                '& .MuiDialog-paper': {
                    margin: '16px',
                    width: 'calc(100% - 32px)',
                    maxWidth: '600px'
                }
            }}
            PaperProps={{
                elevation: 0,
                component: motion.div,
                initial: { opacity: 0, y: 20, scale: 0.95 },
                animate: { opacity: 1, y: 0, scale: 1 },
                exit: { opacity: 0, y: 20, scale: 0.95 },
                transition: { duration: 0.2 },
                sx: {
                    borderRadius: '12px',
                    backgroundColor: 'var(--surface-primary)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid var(--border-color)',
                    overflow: 'auto',
                    height: 'auto',
                    maxHeight: '90vh',
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
                            fontSize: '1rem',
                            fontWeight: 600,
                            color: 'var(--text-primary)',
                        }}
                    >
                        Nuevo Reporte de Avance
                    </Typography>
                    <IconButton
                        onClick={handleClose}
                        size="small"
                        sx={{
                            color: 'var(--text-secondary)',
                            padding: '4px',
                            '&:hover': {
                                backgroundColor: 'var(--hover-bg)',
                                color: 'var(--text-primary)',
                            },
                        }}
                    >
                        <X size={18} />
                    </IconButton>
                </DialogTitle>

                <DialogContent sx={{ p: 2, backgroundColor: 'var(--surface-primary)' }}>
                    <Grid container spacing={2} sx={{ pt: 1 }}>
                        <Grid item xs={12}>
                            <TextField
                                label="Nombre del Proyecto"
                                fullWidth
                                value={formData.project}
                                onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                                required
                                sx={inputStyles}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth sx={inputStyles}>
                                <InputLabel>Estado</InputLabel>
                                <Select
                                    value={formData.status}
                                    label="Estado"
                                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                    required
                                    sx={{
                                        fontSize: '0.8rem',
                                    }}
                                >
                                    {statusOptions.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth sx={inputStyles}>
                                <InputLabel>Responsable</InputLabel>
                                <Select
                                    value={formData.responsible}
                                    label="Responsable"
                                    onChange={(e) => setFormData({ ...formData, responsible: e.target.value })}
                                    required
                                    sx={{
                                        fontSize: '0.8rem',
                                    }}
                                >
                                    {responsibleOptions.map((option) => (
                                        <MenuItem key={option} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                            <Typography
                                variant="subtitle2"
                                sx={{
                                    mb: 1,
                                    color: 'var(--text-secondary)',
                                    fontSize: '0.8rem',
                                }}
                            >
                                Progreso: {formData.progress}%
                            </Typography>
                            <Slider
                                value={formData.progress}
                                onChange={handleProgressChange}
                                aria-labelledby="progress-slider"
                                valueLabelDisplay="auto"
                                step={5}
                                marks
                                min={0}
                                max={100}
                                sx={{
                                    color: formData.status === 'delayed' ? '#ff3b30' :
                                        formData.status === 'completed' ? '#30d158' : '#0071e3',
                                    '& .MuiSlider-thumb': {
                                        height: 20,
                                        width: 20,
                                    },
                                    '& .MuiSlider-valueLabel': {
                                        backgroundColor: formData.status === 'delayed' ? '#ff3b30' :
                                            formData.status === 'completed' ? '#30d158' : '#0071e3',
                                    }
                                }}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <DatePicker
                                label="Última Actualización"
                                value={formData.lastUpdate}
                                onChange={(date) => setFormData({ ...formData, lastUpdate: date || dayjs() })}
                                slotProps={{
                                    textField: {
                                        fullWidth: true,
                                        size: "small",
                                        sx: inputStyles
                                    }
                                }}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <DatePicker
                                label="Fecha Límite"
                                value={formData.dueDate}
                                onChange={(date) => setFormData({ ...formData, dueDate: date || dayjs() })}
                                slotProps={{
                                    textField: {
                                        fullWidth: true,
                                        size: "small",
                                        sx: inputStyles
                                    }
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
                            fontSize: '0.8rem',
                            fontWeight: 500,
                            textTransform: 'none',
                            px: 2,
                            py: 0.75,
                            borderRadius: '6px',
                            minHeight: '32px',
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
                            fontSize: '0.8rem',
                            fontWeight: 500,
                            textTransform: 'none',
                            px: 2,
                            py: 0.75,
                            borderRadius: '6px',
                            minHeight: '32px',
                            boxShadow: 'none',
                            '&:hover': {
                                backgroundColor: '#0077ED',
                                boxShadow: 'none',
                            },
                        }}
                    >
                        Crear Reporte
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};