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

// Initial form state
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
};

export const NewAgreementDialog: React.FC<NewAgreementDialogProps> = ({
  open,
  onClose,
  onSubmit,
}) => {
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
            Nuevo Acuerdo
          </Typography>
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
            <Grid item xs={12} md={8}>
              <TextField
                label="Elemento"
                fullWidth
                value={formData.element}
                onChange={(e) => setFormData({ ...formData, element: e.target.value })}
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
            <Grid item xs={12} md={4}>
              <FormControl
                fullWidth
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
                }}
              >
                <InputLabel>Responsable</InputLabel>
                <Select
                  value={formData.responsible}
                  label="Responsable"
                  onChange={(e) => setFormData({ ...formData, responsible: e.target.value })}
                  required
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
              <FormControl fullWidth>
                <InputLabel sx={{ color: 'var(--text-secondary)' }}>Estado</InputLabel>
                <Select
                  value={formData.status}
                  label="Estado"
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as AgreementStatus })}
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
              <FormControl fullWidth>
                <InputLabel sx={{ color: 'var(--text-secondary)' }}>Estado SJ</InputLabel>
                <Select
                  value={formData.sjStatus}
                  label="Estado SJ"
                  onChange={(e) => setFormData({ ...formData, sjStatus: e.target.value as AgreementStatus })}
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
                    size: "medium",
                    fullWidth: true,
                    sx: {
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: 'var(--surface-secondary)',
                        borderRadius: '10px',
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'var(--border-color)',
                        },
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
                      '& .MuiInputBase-input': {
                        color: 'var(--text-primary)',
                      },
                    }
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
                    size: "medium",
                    fullWidth: true,
                    sx: {
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: 'var(--surface-secondary)',
                        borderRadius: '10px',
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'var(--border-color)',
                        },
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
                      '& .MuiInputBase-input': {
                        color: 'var(--text-primary)',
                      },
                    }
                  }
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Relato"
                fullWidth
                multiline
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
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
              <TextField
                label="Solicitud SJ"
                fullWidth
                multiline
                rows={3}
                value={formData.sjRequest}
                onChange={(e) => setFormData({ ...formData, sjRequest: e.target.value })}
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

            {/* File Upload Section */}
            <Grid item xs={12}>
              <Box
                sx={{
                  p: 3,
                  borderRadius: '10px',
                  backgroundColor: 'var(--surface-secondary)',
                  border: '1px dashed var(--border-color)',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    borderColor: '#0071e3',
                    backgroundColor: 'rgba(0, 113, 227, 0.05)',
                  },
                }}
              >
                <input
                  type="file"
                  onChange={handleFileChange}
                  sx={{ display: 'none' }}
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                />
                
                {(formData.deliverable || formData.deliverableName) ? (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: '10px',
                        backgroundColor: 'rgba(0, 113, 227, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <FileText size={20} color="#0071e3" />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography
                        sx={{
                          fontSize: '0.875rem',
                          color: 'var(--text-primary)',
                          fontWeight: 500,
                          mb: 0.5,
                        }}
                      >
                        {formData.deliverableName}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: '0.75rem',
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
                        color: 'var(--text-secondary)',
                        '&:hover': {
                          color: '#ff2d55',
                          backgroundColor: 'rgba(255, 45, 85, 0.1)',
                        },
                      }}
                    >
                      <Trash2 size={18} />
                    </IconButton>
                  </Box>
                ) : (
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 2,
                      cursor: 'pointer',
                    }}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Box
                      sx={{
                        width: 60,
                        height: 60,
                        borderRadius: '50%',
                        backgroundColor: 'rgba(0, 113, 227, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Upload size={24} color="#0071e3" />
                    </Box>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography
                        sx={{
                          fontSize: '0.875rem',
                          color: 'var(--text-primary)',
                          fontWeight: 500,
                          mb: 0.5,
                        }}
                      >
                        Arrastra y suelta o haz clic para subir
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: '0.75rem',
                          color: 'var(--text-secondary)',
                        }}
                      >
                        Soporta PDF, Word, Excel y otros documentos
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
              },
            }}
          >
            Crear Acuerdo
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};