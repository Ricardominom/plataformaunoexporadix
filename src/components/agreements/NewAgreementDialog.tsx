import React, { useState, useRef } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  IconButton,
  Input,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { X, Upload, FileText, Trash2 } from 'lucide-react';
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
              fontSize: '1.125rem',
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
              },
            }}
          >
            <X size={18} />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ p: 2, backgroundColor: 'var(--surface-primary)' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                label="Elemento"
                fullWidth
                value={formData.element}
                onChange={(e) => setFormData({ ...formData, element: e.target.value })}
                required
                size="small"
                sx={{
                  flex: 2,
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
                }}
              />
              <FormControl
                size="small"
                sx={{
                  flex: 1,
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
                }}
              >
                <InputLabel>Responsable</InputLabel>
                <Select
                  value={formData.responsible}
                  label="Responsable"
                  onChange={(e) => setFormData({ ...formData, responsible: e.target.value })}
                  required
                >
                  {responsibleOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <Box sx={{ display: 'flex', gap: 2 }}>
              <FormControl size="small" sx={{ flex: 1 }}>
                <InputLabel sx={{ color: 'var(--text-secondary)' }}>Estado</InputLabel>
                <Select
                  value={formData.status}
                  label="Estado"
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as AgreementStatus })}
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
                  }}
                >
                  {statusOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl size="small" sx={{ flex: 1 }}>
                <InputLabel sx={{ color: 'var(--text-secondary)' }}>Estado SJ</InputLabel>
                <Select
                  value={formData.sjStatus}
                  label="Estado SJ"
                  onChange={(e) => setFormData({ ...formData, sjStatus: e.target.value as AgreementStatus })}
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
                  }}
                >
                  {statusOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <Box sx={{ display: 'flex', gap: 2 }}>
              <DatePicker
                label="Fecha solicitud"
                value={formData.requestDate}
                onChange={(date) => setFormData({ ...formData, requestDate: date ?? dayjs() })}
                slotProps={{ 
                  textField: { 
                    size: 'small',
                    sx: {
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: 'var(--surface-secondary)',
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'var(--border-color)',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: 'var(--text-secondary)',
                      },
                    }
                  }
                }}
                sx={{
                  flex: 1,
                }}
              />

              <DatePicker
                label="Fecha entrega"
                value={formData.deliveryDate}
                onChange={(date) => setFormData({ ...formData, deliveryDate: date ?? dayjs() })}
                slotProps={{ 
                  textField: { 
                    size: 'small',
                    sx: {
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: 'var(--surface-secondary)',
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'var(--border-color)',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: 'var(--text-secondary)',
                      },
                    }
                  }
                }}
                sx={{
                  flex: 1,
                }}
              />
            </Box>

            <TextField
              label="Relato"
              fullWidth
              multiline
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
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
              }}
            />

            <TextField
              label="Solicitud SJ"
              fullWidth
              multiline
              rows={3}
              value={formData.sjRequest}
              onChange={(e) => setFormData({ ...formData, sjRequest: e.target.value })}
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
              }}
            />

            {/* File Upload Section */}
            <Box
              sx={{
                p: 2,
                borderRadius: '8px',
                backgroundColor: 'var(--surface-secondary)',
                border: '1px dashed var(--border-color)',
              }}
            >
              <Input
                type="file"
                onChange={handleFileChange}
                sx={{ display: 'none' }}
                inputRef={fileInputRef}
              />
              
              {formData.deliverable ? (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <FileText size={20} color="var(--text-secondary)" />
                  <Typography
                    sx={{
                      flex: 1,
                      fontSize: '0.875rem',
                      color: 'var(--text-primary)',
                    }}
                  >
                    {formData.deliverableName}
                  </Typography>
                  <IconButton
                    size="small"
                    onClick={handleRemoveFile}
                    sx={{
                      color: 'var(--text-secondary)',
                      '&:hover': {
                        color: '#ff2d55',
                      },
                    }}
                  >
                    <Trash2 size={16} />
                  </IconButton>
                </Box>
              ) : (
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  startIcon={<Upload size={16} />}
                  sx={{
                    width: '100%',
                    color: 'var(--text-secondary)',
                    textTransform: 'none',
                    '&:hover': {
                      backgroundColor: 'var(--hover-bg)',
                    },
                  }}
                >
                  Subir entregable
                </Button>
              )}
            </Box>
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
            Crear Acuerdo
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};