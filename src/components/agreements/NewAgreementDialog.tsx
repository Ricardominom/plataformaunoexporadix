import React, { useState, useRef } from 'react';
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
import { X, Upload, FileText, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import dayjs from 'dayjs';
import { AgreementStatus } from '../../types/agreement';

interface NewAgreementDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (agreement: any) => void;
  lists: { id: string; name: string; color: string }[]; // Añadido para recibir las listas disponibles
  currentListId?: string; // Añadido para recibir la lista actual como predeterminada
}

const statusOptions: { value: AgreementStatus; label: string }[] = [
  { value: 'not_started', label: 'Sin comenzar' },
  { value: 'in_progress', label: 'En proceso' },
  { value: 'stuck', label: 'Estancado' },
  { value: 'sj_review', label: 'Para revisión de SJ' },
  { value: 'completed', label: 'Terminado' },
];

const responsibleOptions = [
  'Presidente',
  'Asistente',
  'PMO',
  'Directora SSC',
  'Director comercial',
  'Director General de Espora',
  'Director de Mapa',
  'Gerente de Interlogis',
  'Administrador de Interlogis',
  'Research and Development',
];

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

// Estilos para campos multilinea
const multilineStyles = {
  ...inputStyles,
  '& .MuiOutlinedInput-root': {
    ...inputStyles['& .MuiOutlinedInput-root'],
    height: 'auto',
  },
  '& .MuiInputBase-inputMultiline': {
    padding: '8px 14px',
  },
};

export const NewAgreementDialog: React.FC<NewAgreementDialogProps> = ({
  open,
  onClose,
  onSubmit,
  lists = [], // Parámetro nuevo para recibir las listas
  currentListId, // Parámetro nuevo para la lista predeterminada
}) => {
  // Inicialización del estado del formulario incluyendo el listId
  const initialFormState = {
    element: '',
    responsible: '',
    status: 'not_started' as AgreementStatus,
    requestDate: dayjs(),
    deliveryDate: dayjs().add(1, 'week'),
    description: '',
    sjRequest: '',
    sjStatus: 'not_started' as AgreementStatus,
    deliverable: null as File | null,
    deliverableName: '',
    listId: currentListId || (lists.length > 0 ? lists[0].id : ''), // Valor predeterminado
  };

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState(initialFormState);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData(initialFormState); // Reset form to initial state
  };

  const handleClose = () => {
    setFormData(initialFormState); // Reset form when closing
    onClose();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      setFormData({
        ...formData,
        deliverable: file,
        deliverableName: file.name,
      });
    }
  };

  const handleRemoveFile = () => {
    setFormData({
      ...formData,
      deliverable: null,
      deliverableName: '',
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
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
          maxWidth: '800px'
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
          maxHeight: '95vh',
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
            Nuevo Acuerdo
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
          <Grid container spacing={2}>
            {/* Selector de Lista - NUEVO CAMPO */}
            <Grid item xs={12}>
              <FormControl fullWidth required sx={inputStyles}>
                <InputLabel>Lista</InputLabel>
                <Select
                  value={formData.listId}
                  label="Lista"
                  onChange={(e) => setFormData({ ...formData, listId: e.target.value })}
                  sx={{
                    fontSize: '0.8rem',
                  }}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        backgroundColor: 'var(--surface-primary)',
                        backgroundImage: 'none',
                        borderRadius: '8px',
                        boxShadow: 'var(--shadow-lg)',
                        border: '1px solid var(--border-color)',
                        mt: 1,
                        '& .MuiMenuItem-root': {
                          fontSize: '0.8rem',
                          py: 0.75,
                          px: 2,
                        },
                      },
                    },
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
                            backgroundColor: list.color
                          }}
                        />
                        {list.name}
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={8}>
              <TextField
                label="Elemento"
                fullWidth
                value={formData.element}
                onChange={(e) => setFormData({ ...formData, element: e.target.value })}
                required
                sx={inputStyles}
              />
            </Grid>
            <Grid item xs={12} md={4}>
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
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        backgroundColor: 'var(--surface-primary)',
                        backgroundImage: 'none',
                        borderRadius: '8px',
                        boxShadow: 'var(--shadow-lg)',
                        border: '1px solid var(--border-color)',
                        mt: 1,
                        '& .MuiMenuItem-root': {
                          fontSize: '0.8rem',
                          py: 0.75,
                          px: 2,
                        },
                      },
                    },
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

            <Grid item xs={12} md={6}>
              <FormControl fullWidth sx={inputStyles}>
                <InputLabel>Estado</InputLabel>
                <Select
                  value={formData.status}
                  label="Estado"
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as AgreementStatus })}
                  sx={{
                    fontSize: '0.8rem',
                  }}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        backgroundColor: 'var(--surface-primary)',
                        backgroundImage: 'none',
                        borderRadius: '8px',
                        boxShadow: 'var(--shadow-lg)',
                        border: '1px solid var(--border-color)',
                        mt: 1,
                        '& .MuiMenuItem-root': {
                          fontSize: '0.8rem',
                          py: 0.75,
                          px: 2,
                        },
                      },
                    },
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
                <InputLabel>Estado SJ</InputLabel>
                <Select
                  value={formData.sjStatus}
                  label="Estado SJ"
                  onChange={(e) => setFormData({ ...formData, sjStatus: e.target.value as AgreementStatus })}
                  sx={{
                    fontSize: '0.8rem',
                  }}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        backgroundColor: 'var(--surface-primary)',
                        backgroundImage: 'none',
                        borderRadius: '8px',
                        boxShadow: 'var(--shadow-lg)',
                        border: '1px solid var(--border-color)',
                        mt: 1,
                        '& .MuiMenuItem-root': {
                          fontSize: '0.8rem',
                          py: 0.75,
                          px: 2,
                        },
                      },
                    },
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
              <DatePicker
                label="Fecha solicitud"
                value={formData.requestDate}
                onChange={(date) => setFormData({ ...formData, requestDate: date ?? dayjs() })}
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
                label="Fecha entrega"
                value={formData.deliveryDate}
                onChange={(date) => setFormData({ ...formData, deliveryDate: date ?? dayjs() })}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    size: "small",
                    sx: inputStyles
                  }
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Relato"
                fullWidth
                multiline
                rows={2}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                sx={multilineStyles}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Solicitud SJ"
                fullWidth
                multiline
                rows={2}
                value={formData.sjRequest}
                onChange={(e) => setFormData({ ...formData, sjRequest: e.target.value })}
                sx={multilineStyles}
              />
            </Grid>

            {/* File Upload Section - Compactado */}
            <Grid item xs={12}>
              <Box
                sx={{
                  p: 2,
                  borderRadius: '8px',
                  backgroundColor: 'var(--surface-secondary)',
                  border: '1px dashed var(--border-color)',
                  transition: 'all 0.2s ease',
                }}
              >
                <input
                  type="file"
                  onChange={handleFileChange}
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                />

                {(formData.deliverable || formData.deliverableName) ? (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Box
                      sx={{
                        width: 32,
                        height: 32,
                        borderRadius: '6px',
                        backgroundColor: 'rgba(0, 113, 227, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <FileText size={16} color="#0071e3" />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography
                        sx={{
                          fontSize: '0.8rem',
                          color: 'var(--text-primary)',
                          fontWeight: 500,
                        }}
                      >
                        {formData.deliverableName}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: '0.7rem',
                          color: 'var(--text-secondary)',
                        }}
                      >
                        {formData.deliverable?.size ? `${(formData.deliverable.size / 1024).toFixed(2)} KB` : ''}
                      </Typography>
                    </Box>
                    <IconButton
                      size="small"
                      onClick={handleRemoveFile}
                      sx={{
                        padding: '4px',
                        color: 'var(--text-secondary)',
                      }}
                    >
                      <Trash2 size={16} />
                    </IconButton>
                  </Box>
                ) : (
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      cursor: 'pointer',
                    }}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: '6px',
                        backgroundColor: 'rgba(0, 113, 227, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Upload size={20} color="#0071e3" />
                    </Box>
                    <Box>
                      <Typography
                        sx={{
                          fontSize: '0.8rem',
                          color: 'var(--text-primary)',
                          fontWeight: 500,
                        }}
                      >
                        Clic para subir documento
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: '0.7rem',
                          color: 'var(--text-secondary)',
                        }}
                      >
                        Soporta PDF, Word, Excel
                      </Typography>
                    </Box>
                  </Box>
                )}
              </Box>
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
            }}
          >
            Crear Acuerdo
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};