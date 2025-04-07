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
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { X } from 'lucide-react';
import dayjs from 'dayjs';
import { TodoPriority } from '../../types/todo';

interface NewElementDialogProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (element: any) => void;
    listId: string;
}

const priorityOptions: { value: TodoPriority; label: string }[] = [
    { value: 'none', label: 'Ninguna' },
    { value: 'low', label: 'Baja' },
    { value: 'medium', label: 'Media' },
    { value: 'high', label: 'Alta' },
];

export const NewElementDialog: React.FC<NewElementDialogProps> = ({
    open,
    onClose,
    onSubmit,
    listId,
}) => {
    const [formData, setFormData] = useState({
        title: '',
        dueDate: null as dayjs.Dayjs | null,
        priority: 'none' as TodoPriority,
        notes: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({
            ...formData,
            listId,
            completed: false,
            createdAt: new Date().toISOString(),
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
                sx: {
                    borderRadius: '12px',
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                },
                className: "glass-effect"
            }}
        >
            <form onSubmit={handleSubmit}>
                <DialogTitle
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        p: 2,
                        borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
                    }}
                >
                    <Typography
                        variant="h6"
                        sx={{
                            fontSize: '1.125rem',
                            fontWeight: 500,
                            color: '#1d1d1f',
                        }}
                    >
                        Nuevo Elemento
                    </Typography>
                    <Button
                        onClick={onClose}
                        sx={{
                            minWidth: 'auto',
                            p: 0.5,
                            color: '#86868b',
                            '&:hover': {
                                backgroundColor: 'transparent',
                                color: '#1d1d1f',
                            },
                        }}
                    >
                        <X size={20} />
                    </Button>
                </DialogTitle>

                <DialogContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                        <TextField
                            label="Título"
                            fullWidth
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            required
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '8px',
                                },
                            }}
                        />

                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <DatePicker
                                label="Fecha de vencimiento"
                                value={formData.dueDate}
                                onChange={(date) => setFormData({ ...formData, dueDate: date })}
                                sx={{
                                    flex: 1,
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '8px',
                                    },
                                }}
                            />

                            <FormControl sx={{ flex: 1 }}>
                                <InputLabel>Prioridad</InputLabel>
                                <Select
                                    value={formData.priority}
                                    label="Prioridad"
                                    onChange={(e) => setFormData({ ...formData, priority: e.target.value as TodoPriority })}
                                    sx={{
                                        borderRadius: '8px',
                                    }}
                                >
                                    {priorityOptions.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>

                        <TextField
                            label="Notas"
                            fullWidth
                            multiline
                            rows={3}
                            value={formData.notes}
                            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '8px',
                                },
                            }}
                        />
                    </Box>
                </DialogContent>

                <DialogActions
                    sx={{
                        p: 2,
                        borderTop: '1px solid rgba(0, 0, 0, 0.1)',
                    }}
                >
                    <Button
                        onClick={onClose}
                        sx={{
                            color: '#86868b',
                            '&:hover': {
                                backgroundColor: 'transparent',
                                color: '#1d1d1f',
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
                            borderRadius: '980px',
                            textTransform: 'none',
                            px: 3,
                            '&:hover': {
                                backgroundColor: '#0077ED',
                            },
                        }}
                    >
                        Crear Elemento
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};