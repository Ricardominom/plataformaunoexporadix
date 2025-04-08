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
} from '@mui/material';
import { X } from 'lucide-react';

interface NewLegalSectionDialogProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (section: {
        apartado: string;
        tema: string | null;
        proyecto: 'Listo' | 'En proceso' | 'Detenido';
        instancias: 'Listo' | 'En proceso' | 'Detenido';
        concluido: 'Listo' | 'En proceso' | 'Detenido';
    }) => void;
}

const apartadoOptions = [
    'Gobierno Corporativo',
    'Documentos propuestos',
    'Contencioso Mercantil',
    'Contencioso Laboral',
    'Otros',
];

const statusOptions = ['Listo', 'En proceso', 'Detenido'] as const;

export const NewLegalSectionDialog: React.FC<NewLegalSectionDialogProps> = ({
    open,
    onClose,
    onSubmit,
}) => {
    const [formData, setFormData] = useState({
        apartado: '',
        tema: '',
        proyecto: 'En proceso' as const,
        instancias: 'En proceso' as const,
        concluido: 'En proceso' as const,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({
            ...formData,
            tema: formData.tema || null,
        });
        onClose();
    };

    const handleClose = () => {
        setFormData({
            apartado: '',
            tema: '',
            proyecto: 'En proceso',
            instancias: 'En proceso',
            concluido: 'En proceso',
        });
        onClose();
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
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
                        Nuevo Apartado Legal
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
                            value={formData.tema}
                            onChange={(e) => setFormData({ ...formData, tema: e.target.value })}
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
                                onChange={(e) => setFormData({ ...formData, proyecto: e.target.value as typeof statusOptions[number] })}
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
                                onChange={(e) => setFormData({ ...formData, instancias: e.target.value as typeof statusOptions[number] })}
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
                                onChange={(e) => setFormData({ ...formData, concluido: e.target.value as typeof statusOptions[number] })}
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
                        Crear Apartado
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};