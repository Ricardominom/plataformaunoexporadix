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
} from '@mui/material';
import { X } from 'lucide-react';

interface NewAccountDialogProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (account: {
        item: string;
        montoBancarizado: number;
        montoDespacho: number;
        efectivo: number;
        credito: number;
        deuda: number;
        observaciones: string;
    }) => void;
}

export const NewAccountDialog: React.FC<NewAccountDialogProps> = ({
    open,
    onClose,
    onSubmit,
}) => {
    const [formData, setFormData] = useState({
        item: '',
        montoBancarizado: 0,
        montoDespacho: 0,
        efectivo: 0,
        credito: 0,
        deuda: 0,
        observaciones: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
        setFormData({
            item: '',
            montoBancarizado: 0,
            montoDespacho: 0,
            efectivo: 0,
            credito: 0,
            deuda: 0,
            observaciones: '',
        });
        onClose();
    };

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
                        Nueva Cuenta
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

                <DialogContent sx={{ p: 2, pt: 3, backgroundColor: 'var(--surface-primary)' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                        <TextField
                            label="Nombre de la cuenta"
                            fullWidth
                            value={formData.item}
                            onChange={(e) => setFormData({ ...formData, item: e.target.value })}
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
                            label="Monto Bancarizado"
                            type="number"
                            value={formData.montoBancarizado}
                            onChange={(e) => setFormData({ ...formData, montoBancarizado: Number(e.target.value) })}
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
                            label="Monto Despacho"
                            type="number"
                            value={formData.montoDespacho}
                            onChange={(e) => setFormData({ ...formData, montoDespacho: Number(e.target.value) })}
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
                            label="Efectivo"
                            type="number"
                            value={formData.efectivo}
                            onChange={(e) => setFormData({ ...formData, efectivo: Number(e.target.value) })}
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
                            label="Crédito"
                            type="number"
                            value={formData.credito}
                            onChange={(e) => setFormData({ ...formData, credito: Number(e.target.value) })}
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
                            label="Deuda"
                            type="number"
                            value={formData.deuda}
                            onChange={(e) => setFormData({ ...formData, deuda: Number(e.target.value) })}
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
                            label="Observaciones"
                            multiline
                            rows={3}
                            value={formData.observaciones}
                            onChange={(e) => setFormData({ ...formData, observaciones: e.target.value })}
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
                        Crear Cuenta
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};