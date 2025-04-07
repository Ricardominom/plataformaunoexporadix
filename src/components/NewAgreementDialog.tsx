import React, { useState } from 'react';
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
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { X } from 'lucide-react';
import dayjs from 'dayjs';
import { AgreementStatus } from '../types/agreement';

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

export const NewAgreementDialog: React.FC<NewAgreementDialogProps> = ({
  open,
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState({
    element: '',
    responsible: '',
    status: 'not_started' as AgreementStatus,
    requestDate: dayjs(),
    deliveryDate: dayjs().add(1, 'week'),
    description: '',
    sjRequest: '',
    sjStatus: 'not_started' as AgreementStatus,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
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
              <TextField
                label="Responsable"
                value={formData.responsible}
                onChange={(e) => setFormData({ ...formData, responsible: e.target.value })}
                required
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
              />
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
                onChange={(date) => setFormData({ ...formData, requestDate: date })}
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
                onChange={(date) => setFormData({ ...formData, deliveryDate: date })}
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
            Crear Acuerdo
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};