import React, { useState, useEffect } from 'react';
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
    FormHelperText,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { X, AlertCircle, Clock, CheckCircle2, Circle } from 'lucide-react';
import { motion } from 'framer-motion';
import dayjs from 'dayjs';
import { TodoPriority } from '../../types/todo';
import { useTodos } from '../../context/TodoContext';

interface NewReminderDialogProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (reminder: {
        title: string;
        notes?: string;
        dueDate: string;
        priority: TodoPriority;
        listId: string;
    }) => void;
}

const priorityOptions: { value: TodoPriority; label: string; icon: React.ReactNode; color: string }[] = [
    { value: 'none', label: 'Ninguna', icon: <Circle size={16} />, color: 'var(--text-secondary)' },
    { value: 'low', label: 'Baja', icon: <CheckCircle2 size={16} />, color: '#30d158' },
    { value: 'medium', label: 'Media', icon: <Clock size={16} />, color: '#ff9500' },
    { value: 'high', label: 'Alta', icon: <AlertCircle size={16} />, color: '#ff2d55' },
];

export const NewReminderDialog: React.FC<NewReminderDialogProps> = ({
    open,
    onClose,
    onSubmit,
}) => {
    const { lists } = useTodos();
    const [formData, setFormData] = useState({
        title: '',
        notes: '',
        dueDate: dayjs(),
        priority: 'none' as TodoPriority,
        listId: '',
    });
    const [errors, setErrors] = useState<{
        title?: string;
        listId?: string;
    }>({});

    // Reset form when dialog opens
    useEffect(() => {
        if (open) {
            setFormData({
                title: '',
                notes: '',
                dueDate: dayjs(),
                priority: 'none',
                listId: lists.length > 0 ? lists[0].id : '',
            });
            setErrors({});
        }
    }, [open, lists]);

    const validateForm = () => {
        const newErrors: {
            title?: string;
            listId?: string;
        } = {};
        
        if (!formData.title.trim()) {
            newErrors.title = 'El título es obligatorio';
        }
        
        if (!formData.listId) {
            newErrors.listId = 'Debes seleccionar una lista';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (validateForm()) {
            onSubmit({
                ...formData,
                dueDate: formData.dueDate.toISOString(),
            });
            onClose();
        }
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
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
                    <Typography
                        variant="h6"
                        sx={{
                            fontSize: '1.25rem',
                            fontWeight: 600,
                            color: 'var(--text-primary)',
                            letterSpacing: '-0.025em',
                        }}
                    >
                        Nuevo Recordatorio
                    </Typography>
                    <IconButton
                        onClick={onClose}
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
                                label="Título"
                                fullWidth
                                value={formData.title}
                                onChange={(e) => {
                                    setFormData({ ...formData, title: e.target.value });
                                    if (e.target.value.trim()) {
                                        setErrors({ ...errors, title: undefined });
                                    }
                                }}
                                required
                                error={!!errors.title}
                                helperText={errors.title}
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
                                        borderColor: errors.title ? 'var(--status-error-text)' : 'var(--border-color)',
                                    },
                                    '& .MuiInputBase-input': {
                                        color: 'var(--text-primary)',
                                    },
                                }}
                            />
                        </Grid>

                        {/* New List Selection Field */}
                        <Grid item xs={12}>
                            <FormControl 
                                fullWidth 
                                error={!!errors.listId}
                                required
                            >
                                <InputLabel sx={{ color: 'var(--text-secondary)' }}>Lista</InputLabel>
                                <Select
                                    value={formData.listId}
                                    label="Lista"
                                    onChange={(e) => {
                                        setFormData({ ...formData, listId: e.target.value });
                                        if (e.target.value) {
                                            setErrors({ ...errors, listId: undefined });
                                        }
                                    }}
                                    sx={{
                                        borderRadius: '10px',
                                        backgroundColor: 'var(--surface-secondary)',
                                        '&:hover': {
                                            backgroundColor: 'var(--surface-secondary)',
                                        },
                                        '&.Mui-focused': {
                                            backgroundColor: 'var(--surface-secondary)',
                                            boxShadow: '0 0 0 3px rgba(0, 113, 227, 0.1)',
                                        },
                                        '& .MuiOutlinedInput-notchedOutline': {
                                            borderColor: errors.listId ? 'var(--status-error-text)' : 'var(--border-color)',
                                        },
                                        '& .MuiSelect-select': {
                                            color: 'var(--text-primary)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 1,
                                        },
                                    }}
                                    MenuProps={{
                                        PaperProps: {
                                            sx: {
                                                backgroundColor: 'var(--surface-primary)',
                                                backgroundImage: 'none',
                                                borderRadius: '12px',
                                                boxShadow: 'var(--shadow-lg)',
                                                border: '1px solid var(--border-color)',
                                                mt: 1,
                                                '& .MuiMenuItem-root': {
                                                    fontSize: '0.875rem',
                                                    py: 1,
                                                    px: 2,
                                                    '&:hover': {
                                                        backgroundColor: 'var(--hover-bg)',
                                                    },
                                                },
                                            },
                                        },
                                    }}
                                    renderValue={(selected) => {
                                        const selectedList = lists.find(list => list.id === selected);
                                        if (!selectedList) return <em>Selecciona una lista</em>;
                                        
                                        return (
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <Box
                                                    sx={{
                                                        width: 12,
                                                        height: 12,
                                                        borderRadius: '50%',
                                                        backgroundColor: selectedList.color,
                                                    }}
                                                />
                                                {selectedList.name}
                                            </Box>
                                        );
                                    }}
                                >
                                    {lists.map((list) => (
                                        <MenuItem key={list.id} value={list.id}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <Box
                                                    sx={{
                                                        width: 12,
                                                        height: 12,
                                                        borderRadius: '50%',
                                                        backgroundColor: list.color,
                                                    }}
                                                />
                                                {list.name}
                                            </Box>
                                        </MenuItem>
                                    ))}
                                </Select>
                                {errors.listId && (
                                    <FormHelperText error>{errors.listId}</FormHelperText>
                                )}
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <DatePicker
                                label="Fecha de vencimiento"
                                value={formData.dueDate}
                                onChange={(date) => setFormData({ ...formData, dueDate: date || dayjs() })}
                                sx={{
                                    width: '100%',
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

                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth>
                                <InputLabel sx={{ color: 'var(--text-secondary)' }}>Prioridad</InputLabel>
                                <Select
                                    value={formData.priority}
                                    label="Prioridad"
                                    onChange={(e) => setFormData({ ...formData, priority: e.target.value as TodoPriority })}
                                    sx={{
                                        borderRadius: '10px',
                                        backgroundColor: 'var(--surface-secondary)',
                                        '&:hover': {
                                            backgroundColor: 'var(--surface-secondary)',
                                        },
                                        '&.Mui-focused': {
                                            backgroundColor: 'var(--surface-secondary)',
                                            boxShadow: '0 0 0 3px rgba(0, 113, 227, 0.1)',
                                        },
                                        '& .MuiOutlinedInput-notchedOutline': {
                                            borderColor: 'var(--border-color)',
                                        },
                                        '& .MuiSelect-select': {
                                            color: 'var(--text-primary)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 1,
                                        },
                                    }}
                                    MenuProps={{
                                        PaperProps: {
                                            sx: {
                                                backgroundColor: 'var(--surface-primary)',
                                                backgroundImage: 'none',
                                                borderRadius: '12px',
                                                boxShadow: 'var(--shadow-lg)',
                                                border: '1px solid var(--border-color)',
                                                mt: 1,
                                                '& .MuiMenuItem-root': {
                                                    fontSize: '0.875rem',
                                                    py: 1,
                                                    px: 2,
                                                    '&:hover': {
                                                        backgroundColor: 'var(--hover-bg)',
                                                    },
                                                },
                                            },
                                        },
                                    }}
                                    renderValue={(selected) => {
                                        const option = priorityOptions.find(opt => opt.value === selected);
                                        return (
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <Box sx={{ color: option?.color }}>{option?.icon}</Box>
                                                {option?.label}
                                            </Box>
                                        );
                                    }}
                                >
                                    {priorityOptions.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <Box sx={{ color: option.color }}>{option.icon}</Box>
                                                {option.label}
                                            </Box>
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                label="Notas"
                                fullWidth
                                multiline
                                rows={4}
                                value={formData.notes}
                                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
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
                        type="submit"
                        variant="contained"
                        sx={{
                            backgroundColor: '#0071e3',
                            color: '#fff',
                            fontSize: '0.9375rem',
                            fontWeight: 500,
                            textTransform: 'none',
                            px: 3,
                            py: 1,
                            borderRadius: '8px',
                            boxShadow: 'none',
                            '&:hover': {
                                backgroundColor: '#0077ED',
                                boxShadow: '0 2px 8px rgba(0, 113, 227, 0.3)',
                                transform: 'translateY(-2px)',
                            },
                            '&:active': {
                                transform: 'translateY(0)',
                            },
                        }}
                    >
                        Crear Recordatorio
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};