import React, { useState, useEffect } from 'react';
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
import { Agreement, AgreementStatus } from '../types/agreement';
import { updateAgreementApi } from '../services/api';

interface EditAgreementDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit?: (agreement: Agreement) => void; // Ahora es opcional, la API se encarga
  agreement: Agreement | null;
  lists?: { id: string; name: string; color: string }[]; // Para cambiar de lista si es necesario
}

const statusOptions: { value: AgreementStatus; label: string }[] = [
  { value: 'not_started', label: 'Sin comenzar' },
  { value: 'in_progress', label: 'En proceso' },
  { value: 'stuck', label: 'Estancado' },
  { value: 'sj_review', label: 'Para revisión de SJ' },
  { value: 'completed', label: 'Terminado' },
];

export const EditAgreementDialog: React.FC<EditAgreementDialogProps> = ({
  open,
  onClose,
  onSubmit,
  agreement,
  lists = [],
}) => {
  const [formData, setFormData] = useState<Agreement | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (agreement) {
      setFormData({
        ...agreement,
        requestDate: agreement.requestDate ? dayjs(agreement.requestDate) : dayjs(),
        deliveryDate: agreement.deliveryDate ? dayjs(agreement.deliveryDate) : dayjs(),
      });
    }
  }, [agreement]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;
    setLoading(true);
    try {
      // Prepara el payload para la API
      const payload = {
        ...formData,
        requestDate: (formData.requestDate as any)?.format
          ? (formData.requestDate as any).format('YYYY-MM-DD')
          : formData.requestDate,
        deliveryDate: (formData.deliveryDate as any)?.format
          ? (formData.deliveryDate as any).format('YYYY-MM-DD')
          : formData.deliveryDate,
      };
      await updateAgreementApi(formData.id, payload);
      if (onSubmit) onSubmit({ ...formData, ...payload });
      onClose();
    } finally {
      setLoading(false);
    }
  };

  if (!formData) return null;

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
            Editar Acuerdo
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
                  '& .MuiInputBase-input': {
                    color: 'var(--text-primary)',
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
                  '& .MuiInputBase-input': {
                    color: 'var(--text-primary)',
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
                    '& .MuiSelect-select': {
                      color: 'var(--text-primary)',
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
                    '& .MuiSelect-select': {
                      color: 'var(--text-primary)',
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
                slotProps={{ textField: { size: 'small' } }}
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
                  '& .MuiInputBase-input': {
                    color: 'var(--text-primary)',
                  },
                }}
              />

              <DatePicker
                label="Fecha entrega"
                value={formData.deliveryDate}
                onChange={(date) => setFormData({ ...formData, deliveryDate: date })}
                slotProps={{ textField: { size: 'small' } }}
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
                  '& .MuiInputBase-input': {
                    color: 'var(--text-primary)',
                  },
                }}
              />
            </Box>

            {lists.length > 0 && (
              <FormControl size="small" sx={{ mt: 1 }}>
                <InputLabel sx={{ color: 'var(--text-secondary)' }}>Lista</InputLabel>
                <Select
                  value={formData.listId}
                  label="Lista"
                  onChange={(e) => setFormData({ ...formData, listId: e.target.value })}
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
                    <MenuItem key={list.id} value={list.id}>
                      {list.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}

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
                '& .MuiInputBase-input': {
                  color: 'var(--text-primary)',
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
            disabled={loading}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={loading}
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
            Guardar Cambios
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};