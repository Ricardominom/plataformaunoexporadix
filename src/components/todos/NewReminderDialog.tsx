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
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { X } from 'lucide-react';
import dayjs from 'dayjs';
import { TodoPriority } from '../types/todo';

interface NewReminderDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (reminder: {
    title: string;
    notes?: string;
    dueDate: string;
    priority: TodoPriority;
    listId: string; // Se agrega la lista seleccionada
  }) => void;
}

const priorityOptions: { value: TodoPriority; label: string }[] = [
  { value: 'none', label: 'Ninguna' },
  { value: 'low', label: 'Baja' },
  { value: 'medium', label: 'Media' },
  { value: 'high', label: 'Alta' },
];

export const NewReminderDialog: React.FC<NewReminderDialogProps> = ({
  open,
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState({
    title: '',
    notes: '',
    dueDate: dayjs(),
    priority: 'none' as TodoPriority,
    listId: '', // Estado para la lista seleccionada
  });
  const [lists, setLists] = useState<{ id: string; name: string }[]>([]); // Estado para las opciones de listas disponibles

  // Cargar las listas desde la API
useEffect(() => {
    const fetchLists = async () => {
      const API_URL = 'http://127.0.0.1:8000/usuarios/listas/';
      const accessToken = localStorage.getItem('accessToken');
  
      if (!accessToken) {
        console.error('No estás autenticado.');
        return;
      }
  
      try {
        const response = await fetch(API_URL, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        });
  
        if (!response.ok) {
          throw new Error('Error al obtener listas.');
        }
  
        const data = await response.json();
        const formattedLists = data.map((list: any) => ({
          id: list.id.toString(),
          name: list.nombre, // Mapeo del atributo `nombre`
          color: list.color, // Agregar color desde la API
        }));
  
        setLists(formattedLists); // Actualizar el estado con listas formateadas
      } catch (error) {
        console.error('Error al conectar con la API:', error);
      }
    };
  
    fetchLists();
  }, []);
  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      dueDate: dayjs(formData.dueDate).toISOString(),
    });
    setFormData({
      title: '',
      notes: '',
      dueDate: dayjs(),
      priority: 'none',
      listId: '',
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
                        },
                    }}
                >
                    <X size={18} />
                </IconButton>
            </DialogTitle>

            <DialogContent sx={{ p: 2, pt: 3, backgroundColor: 'var(--surface-primary)' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <TextField
                        label="Título"
                        fullWidth
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
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

                    {/* Dropdown para seleccionar lista */}
                    <FormControl size="small" fullWidth>
                        <InputLabel sx={{ color: 'var(--text-secondary)' }}>Seleccionar Lista</InputLabel>
                        <Select
                            value={formData.listId}
                            label="Seleccionar Lista"
                            onChange={(e) => {
                                const selectedList = lists.find((list) => list.id === e.target.value);
                                if (selectedList) {
                                    setFormData({
                                        ...formData,
                                        listId: selectedList.id,
                                        color: selectedList.color, // Actualizar el color en el estado
                                    });
                                }
                            }}
                            sx={{
                                borderRadius: '8px',
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
                                },
                            }}
                        >
                            {lists.map((list) => (
                                <MenuItem
                                    key={list.id}
                                    value={list.id}
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 1,
                                    }}
                                >
                                    <Box
                                        sx={{
                                            width: 16,
                                            height: 16,
                                            borderRadius: '50%',
                                            backgroundColor: list.color, // Renderiza el color
                                            border: '1px solid var(--border-color)',
                                        }}
                                    />
                                    {list.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <TextField
                            label="Fecha de vencimiento"
                            type="date"
                            fullWidth
                            value={formData.dueDate}
                            onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
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

                    <TextField
                        label="Notas"
                        fullWidth
                        multiline
                        rows={3}
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
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
                    Crear Recordatorio
                </Button>
            </DialogActions>
        </form>
    </Dialog>
);
};