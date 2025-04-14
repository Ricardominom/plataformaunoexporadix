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
    Grid,
} from '@mui/material';
import { CirclePicker } from 'react-color';
import { X, Circle } from 'lucide-react';
import { motion } from 'framer-motion';

interface NewListDialogProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (list: { name: string; color: string }) => void;
}

const colorOptions = [
    '#ff9500', // orange
    '#ff2d55', // red
    '#5856d6', // purple
    '#007aff', // blue
    '#4cd964', // green
    '#5ac8fa', // light blue
    '#ffcc00', // yellow
    '#ff3b30', // coral
];

const initialFormData = {
    name: '',
    color: '#ff9500',
};

export const NewListDialog: React.FC<NewListDialogProps> = ({
    open,
    onClose,
    onSubmit,
}) => {
    const [formData, setFormData] = useState(initialFormData);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        const API_URL = 'http://127.0.0.1:8000/usuarios/listas/';
        const accessToken = localStorage.getItem('accessToken');
    
        if (!accessToken) {
            alert('No estás autenticado.');
            return;
        }
    
        const payload = {
            nombre: formData.name,
            color: formData.color,
        };
    
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify(payload),
            });
    
            const data = await response.json();
    
            if (!response.ok) {
                console.error('Error al crear la lista:', data);
                alert(`Error: ${data.detail || 'No se pudo crear la lista.'}`);
                return;
            }
    
            // Llamar a la función onSubmit con los datos de la nueva lista
            onSubmit({
                name: data.nombre,
                color: data.color,
            });
    
            // Limpiar el formulario
            setFormData(initialFormData);
    
            alert('Lista creada con éxito.');
            onClose();
        } catch (error) {
            console.error('Error al conectar con la API:', error);
            alert('Error de conexión con el servidor.');
        }
    };
    
    

    const handleClose = () => {
        setFormData(initialFormData); // Resetear el formulario al cerrar
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
                component: motion.div,
                initial: { opacity: 0, y: 20, scale: 0.95 },
                animate: { opacity: 1, y: 0, scale: 1 },
                exit: { opacity: 0, y: 20, scale: 0.95 },
                transition: { duration: 0.2 },
                sx: {
                    borderRadius: '16px',
                    backgroundColor: 'var(--surface-primary)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid var(--border-color)',
                    overflow: 'hidden',
                    maxWidth: '450px',
                },
            }}
        >
            <form onSubmit={handleSubmit}>
                <DialogTitle
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        p: 3,
                        borderBottom: '1px solid var(--border-color)',
                        backgroundColor: 'var(--surface-secondary)',
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Box
                            sx={{
                                width: 32,
                                height: 32,
                                borderRadius: '8px',
                                backgroundColor: `${formData.color}20`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Circle size={16} color={formData.color} fill={formData.color} />
                        </Box>
                        <Typography
                            variant="h6"
                            sx={{
                                fontSize: '1.25rem',
                                fontWeight: 600,
                                color: 'var(--text-primary)',
                                letterSpacing: '-0.025em',
                            }}
                        >
                            Nueva Lista
                        </Typography>
                    </Box>
                    <IconButton
                        onClick={handleClose}
                        size="small"
                        sx={{
                            color: 'var(--text-secondary)',
                            '&:hover': {
                                backgroundColor: 'var(--hover-bg)',
                                color: 'var(--text-primary)',
                                transform: 'rotate(90deg)',
                            },
                            transition: 'all 0.3s ease',
                        }}
                    >
                        <X size={20} />
                    </IconButton>
                </DialogTitle>

                <DialogContent sx={{ p: 3, backgroundColor: 'var(--surface-primary)' }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                label="Nombre de la lista"
                                fullWidth
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '10px',
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
                        </Grid>

                        <Grid item xs={12}>
                            <Typography
                                sx={{
                                    fontSize: '0.875rem',
                                    color: 'var(--text-secondary)',
                                    mb: 2,
                                    fontWeight: 500,
                                }}
                            >
                                Color
                            </Typography>
                            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                <CirclePicker
                                    color={formData.color}
                                    colors={colorOptions}
                                    onChange={(color) => setFormData({ ...formData, color: color.hex })}
                                    circleSize={36}
                                    circleSpacing={16}
                                />
                            </Box>
                        </Grid>
                    </Grid>
                </DialogContent>

                <DialogActions
                    sx={{
                        p: 3,
                        borderTop: '1px solid var(--border-color)',
                        backgroundColor: 'var(--surface-secondary)',
                        gap: 1,
                    }}
                >
                    <Button
                        onClick={handleClose}
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
                        type="submit"
                        variant="contained"
                        sx={{
                            backgroundColor: formData.color,
                            color: '#fff',
                            fontSize: '0.9375rem',
                            fontWeight: 500,
                            textTransform: 'none',
                            px: 3,
                            py: 1,
                            borderRadius: '8px',
                            boxShadow: 'none',
                            '&:hover': {
                                backgroundColor: formData.color,
                                opacity: 0.9,
                                boxShadow: `0 2px 8px ${formData.color}40`,
                                transform: 'translateY(-2px)',
                            },
                            '&:active': {
                                transform: 'translateY(0)',
                            },
                        }}
                    >
                        Crear Lista
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};
