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
import { CirclePicker } from 'react-color';
import { X } from 'lucide-react';

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

export const NewListDialog: React.FC<NewListDialogProps> = ({
  open,
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    color: '#ff9500',
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
      maxWidth="xs"
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
            Nueva Lista
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
              label="Nombre de la lista"
              fullWidth
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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

            <Box>
              <Typography
                sx={{
                  fontSize: '0.875rem',
                  color: 'var(--text-secondary)',
                  mb: 1.5,
                  fontWeight: 500,
                }}
              >
                Color
              </Typography>
              <CirclePicker
                color={formData.color}
                colors={colorOptions}
                onChange={(color) => setFormData({ ...formData, color: color.hex })}
                circleSize={28}
                circleSpacing={12}
              />
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
            Crear Lista
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};