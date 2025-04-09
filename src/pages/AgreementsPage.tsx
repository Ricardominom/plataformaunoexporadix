import React, { useState, useMemo, useEffect } from 'react';
import {
  Box,
  Button,
  Container,
  Tab,
  Tabs,
  TextField,
  Typography,
  Paper,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from '@mui/material';
import { Plus, Search, Trash2 } from 'lucide-react';
import { AgreementTable } from '../components/agreements/AgreementTable';
import { NewAgreementDialog } from '../components/agreements/NewAgreementDialog';
import { EditAgreementDialog } from '../components/agreements/EditAgreementDialog';
import { NewListDialog } from '../components/todos/NewListDialog';
import { Agreement, AgreementStatus } from '../types/agreement';
import { Dayjs } from 'dayjs';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import { useAgreements } from '../hooks/useAgreements';

export const AgreementsPage: React.FC = () => {
  const { user, hasShownWelcome, setHasShownWelcome } = useAuth();
  const { addNotification } = useNotification();
  const { agreements, lists, loading, updateAgreementStatus, setAgreements, setLists } = useAgreements();
  
  const [currentTab, setCurrentTab] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [isNewAgreementOpen, setIsNewAgreementOpen] = useState(false);
  const [isNewListOpen, setIsNewListOpen] = useState(false);
  const [editingAgreement, setEditingAgreement] = useState<Agreement | null>(null);
  const [deletingAgreement, setDeletingAgreement] = useState<Agreement | null>(null);
  const [deletingList, setDeletingList] = useState<{ id: string; name: string } | null>(null);

  useEffect(() => {
    if (!hasShownWelcome) {
      const timer = setTimeout(() => {
        setHasShownWelcome(true);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [hasShownWelcome, setHasShownWelcome]);

  const filteredAgreements = useMemo(() => {
    if (!searchTerm) return agreements;
    const searchLower = searchTerm.toLowerCase();
    return agreements.filter((agreement) => {
      return (
        agreement.element.toLowerCase().includes(searchLower) ||
        agreement.responsible.toLowerCase().includes(searchLower) ||
        agreement.description.toLowerCase().includes(searchLower) ||
        agreement.sjRequest.toLowerCase().includes(searchLower)
      );
    });
  }, [searchTerm, agreements]);

  const handleStatusChange = (id: string, status: AgreementStatus, isSJStatus = false) => {
    updateAgreementStatus(id, status, isSJStatus);
    const agreement = agreements.find(a => a.id === id);
    if (agreement) {
      addNotification('agreement', 'updated', agreement);
    }
  };

  const handleEdit = (agreement: Agreement) => {
    setEditingAgreement(agreement);
  };

  const handleEditSubmit = (updatedAgreement: Agreement) => {
    setAgreements(agreements.map(agreement =>
      agreement.id === updatedAgreement.id ? updatedAgreement : agreement
    ));
    addNotification('agreement', 'updated', updatedAgreement);
    setEditingAgreement(null);
  };

  const handleDelete = (agreement: Agreement) => {
    setDeletingAgreement(agreement);
  };

  const confirmDelete = () => {
    if (deletingAgreement) {
      addNotification('agreement', 'deleted', deletingAgreement);
      setAgreements(agreements.filter(a => a.id !== deletingAgreement.id));
      setDeletingAgreement(null);
    }
  };

  const handleNewAgreement = (agreement: {
    element: string;
    responsible: string;
    status: AgreementStatus;
    requestDate: Dayjs;
    deliveryDate: Dayjs;
    description: string;
    sjRequest: string;
    sjStatus: AgreementStatus;
    deliverable?: File | null;
    deliverableName?: string;
  }) => {
    const newId = (Math.max(...agreements.map(a => parseInt(a.id))) + 1).toString();
    const newAgreement: Agreement = {
      ...agreement,
      id: newId,
      listId: lists[currentTab].id,
      requestDate: agreement.requestDate.format('YYYY-MM-DD'),
      deliveryDate: agreement.deliveryDate.format('YYYY-MM-DD'),
    };

    setAgreements([newAgreement, ...agreements]);
    addNotification('agreement', 'created', newAgreement);
    setIsNewAgreementOpen(false);
  };

  const handleNewList = (list: { name: string; color: string }) => {
    const newList = {
      id: (lists.length + 1).toString(),
      name: list.name,
      color: list.color,
    };
    
    setLists([...lists, newList]);
    setCurrentTab(lists.length);
    
    // Add notification for new list creation
    addNotification('list', 'created', {
      id: newList.id,
      title: newList.name,
      listId: newList.id,
      completed: false,
      createdAt: new Date().toISOString(),
    });
    
    setIsNewListOpen(false);
  };

  const handleDeleteList = (list: { id: string; name: string }) => {
    setDeletingList(list);
  };

  const confirmDeleteList = () => {
    if (deletingList) {
      setLists(lists.filter(l => l.id !== deletingList.id));
      setAgreements(agreements.filter(a => a.listId !== deletingList.id));
      if (currentTab >= lists.length - 1) {
        setCurrentTab(0);
      }
      setDeletingList(null);
    }
  };

  const currentTabAgreements = useMemo(() => {
    const currentList = lists[currentTab];
    if (!currentList) return [];
    return filteredAgreements.filter(agreement => agreement.listId === currentList.id);
  }, [currentTab, filteredAgreements, lists]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{
      pt: 'calc(var(--nav-height) + 24px)',
      pb: 4,
      px: { xs: 2, sm: 3, md: 4 },
      minHeight: '100vh',
      backgroundColor: 'var(--app-bg)',
    }}>
      <Container maxWidth="xl">
        {!hasShownWelcome && (
          <Paper
            sx={{
              p: 3,
              mb: 4,
              borderRadius: '12px',
              backgroundColor: 'var(--status-info-bg)',
              border: '1px solid var(--status-info-text)',
              animation: 'fadeIn 0.5s ease-out',
            }}
          >
            <Typography
              variant="h5"
              sx={{
                color: 'var(--status-info-text)',
                fontWeight: 600,
                mb: 1,
              }}
            >
              ¡Bienvenido, {user?.name}!
            </Typography>
            <Typography
              sx={{
                color: 'var(--status-info-text)',
                opacity: 0.9,
              }}
            >
              Aquí tienes un resumen de tus acuerdos y actividades pendientes.
            </Typography>
          </Paper>
        )}

        <Box sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: 2,
          mb: 6,
        }}>
          <Button
            variant="contained"
            startIcon={<Plus size={16} />}
            onClick={() => setIsNewAgreementOpen(true)}
            sx={{
              backgroundColor: '#0071e3',
              fontSize: '0.875rem',
              fontWeight: 400,
              textTransform: 'none',
              borderRadius: '980px',
              px: 3,
              height: '32px',
              boxShadow: 'none',
              '&:hover': {
                backgroundColor: '#0077ED',
                boxShadow: 'none',
              }
            }}
          >
            Nuevo Acuerdo
          </Button>
          <Button
            variant="outlined"
            startIcon={<Plus size={16} />}
            onClick={() => setIsNewListOpen(true)}
            sx={{
              borderColor: 'var(--border-color)',
              color: 'var(--text-primary)',
              fontSize: '0.875rem',
              fontWeight: 400,
              textTransform: 'none',
              borderRadius: '980px',
              px: 3,
              height: '32px',
              '&:hover': {
                borderColor: 'var(--text-secondary)',
                backgroundColor: 'transparent',
              }
            }}
          >
            Nueva Lista
          </Button>
        </Box>

        <Box sx={{ mb: 4 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Buscar acuerdos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search size={16} color="var(--text-secondary)" />
                </InputAdornment>
              ),
              sx: {
                fontSize: '0.875rem',
                height: '36px',
                backgroundColor: 'var(--surface-secondary)',
                color: 'var(--text-primary)',
                '&:hover': {
                  backgroundColor: 'var(--hover-bg)',
                },
                '& .MuiInputBase-input::placeholder': {
                  color: 'var(--text-secondary)',
                  opacity: 1,
                },
              }
            }}
            sx={{
              maxWidth: '600px',
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
                '& fieldset': {
                  border: 'none',
                },
                '&:hover fieldset': {
                  border: 'none',
                },
                '&.Mui-focused fieldset': {
                  border: 'none',
                },
              },
            }}
          />
        </Box>

        <Paper
          sx={{
            mb: 4,
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: 'none',
            backgroundColor: 'var(--surface-primary)',
          }}
          className="glass-effect"
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2 }}>
            <Tabs
              value={currentTab}
              onChange={(_, newValue: number) => setCurrentTab(newValue)}
              sx={{
                borderBottom: '1px solid var(--border-color)',
                '& .MuiTabs-indicator': {
                  backgroundColor: lists[currentTab]?.color || '#0071e3',
                },
              }}
            >
              {lists.map((list, index) => (
                <Tab
                  key={list.id}
                  label={list.name}
                  value={index}
                  sx={{
                    textTransform: 'none',
                    fontSize: '0.875rem',
                    fontWeight: 400,
                    color: 'var(--text-secondary)',
                    '&.Mui-selected': {
                      color: list.color,
                    },
                  }}
                />
              ))}
            </Tabs>
            <IconButton
              onClick={() => handleDeleteList(lists[currentTab])}
              size="small"
              sx={{
                color: 'var(--text-secondary)',
                '&:hover': {
                  color: '#ff2d55',
                  backgroundColor: 'rgba(255, 45, 85, 0.1)',
                },
              }}
            >
              <Trash2 size={16} />
            </IconButton>
          </Box>
        </Paper>

        <AgreementTable
          agreements={currentTabAgreements}
          onStatusChange={handleStatusChange}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onResponsibleChange={() => {}}
        />

        <NewAgreementDialog
          open={isNewAgreementOpen}
          onClose={() => setIsNewAgreementOpen(false)}
          onSubmit={handleNewAgreement}
        />

        <EditAgreementDialog
          open={!!editingAgreement}
          onClose={() => setEditingAgreement(null)}
          onSubmit={handleEditSubmit}
          agreement={editingAgreement}
        />

        <NewListDialog
          open={isNewListOpen}
          onClose={() => setIsNewListOpen(false)}
          onSubmit={handleNewList}
        />

        <Dialog
          open={!!deletingAgreement}
          onClose={() => setDeletingAgreement(null)}
          PaperProps={{
            elevation: 0,
            sx: {
              borderRadius: '12px',
              backgroundColor: 'var(--surface-primary)',
              backdropFilter: 'blur(20px)',
              border: '1px solid var(--border-color)',
            },
          }}
        >
          <DialogTitle sx={{
            fontSize: '1.125rem',
            fontWeight: 600,
            color: 'var(--text-primary)',
            p: 2,
            borderBottom: '1px solid var(--border-color)',
          }}>
            Confirmar eliminación
          </DialogTitle>
          <DialogContent sx={{ p: 2, mt: 1 }}>
            <Typography sx={{ color: 'var(--text-primary)' }}>
              ¿Estás seguro de que deseas eliminar este acuerdo?
            </Typography>
          </DialogContent>
          <DialogActions sx={{
            p: 2,
            borderTop: '1px solid var(--border-color)',
            gap: 1,
          }}>
            <Button
              onClick={() => setDeletingAgreement(null)}
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
              onClick={confirmDelete}
              sx={{
                backgroundColor: '#ff3b30',
                color: '#fff',
                fontSize: '0.875rem',
                fontWeight: 500,
                textTransform: 'none',
                px: 2.5,
                borderRadius: '6px',
                boxShadow: 'none',
                '&:hover': {
                  backgroundColor: '#ff453a',
                  boxShadow: 'none',
                },
              }}
            >
              Eliminar
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={!!deletingList}
          onClose={() => setDeletingList(null)}
          PaperProps={{
            elevation: 0,
            sx: {
              borderRadius: '12px',
              backgroundColor: 'var(--surface-primary)',
              backdropFilter: 'blur(20px)',
              border: '1px solid var(--border-color)',
            },
          }}
        >
          <DialogTitle sx={{
            fontSize: '1.125rem',
            fontWeight: 600,
            color: 'var(--text-primary)',
            p: 2,
            borderBottom: '1px solid var(--border-color)',
          }}>
            Confirmar eliminación de lista
          </DialogTitle>
          <DialogContent sx={{ p: 2, mt: 1 }}>
            <Typography sx={{ color: 'var(--text-primary)' }}>
              ¿Estás seguro de que deseas eliminar esta lista?
            </Typography>
            <Typography sx={{
              color: 'var(--text-secondary)',
              fontSize: '0.875rem',
              mt: 1,
            }}>
              Se eliminarán todos los acuerdos asociados a esta lista.
            </Typography>
          </DialogContent>
          <DialogActions sx={{
            p: 2,
            borderTop: '1px solid var(--border-color)',
            gap: 1,
          }}>
            <Button
              onClick={() => setDeletingList(null)}
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
              onClick={confirmDeleteList}
              sx={{
                backgroundColor: '#ff3b30',
                color: '#fff',
                fontSize: '0.875rem',
                fontWeight: 500,
                textTransform: 'none',
                px: 2.5,
                borderRadius: '6px',
                boxShadow: 'none',
                '&:hover': {
                  backgroundColor: '#ff453a',
                  boxShadow: 'none',
                },
              }}
            >
              Eliminar Lista
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};