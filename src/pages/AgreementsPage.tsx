import React, { useState, useMemo, useEffect } from 'react';
import {
  Avatar,
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
  Chip,
  Tooltip,
  Badge,
  Fade,
  Grid,
} from '@mui/material';
import { motion } from 'framer-motion';
import {
  Plus,
  Search,
  Trash2,
  FileText,
  AlertCircle,
  CheckCircle2,
  Clock,
} from 'lucide-react';
import { AgreementTable } from '../components/agreements/AgreementTable';
import { NewAgreementDialog } from '../components/agreements/NewAgreementDialog';
import { EditAgreementDialog } from '../components/agreements/EditAgreementDialog';
import { NewListDialog } from '../components/todos/NewListDialog';
import { Agreement, AgreementStatus } from '../types/agreement';
import { Dayjs } from 'dayjs';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import { useAgreements } from '../hooks/useAgreements';
import { AgreementStats } from '../components/agreements/AgreementStats';

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

  const getStatusCounts = useMemo(() => {
    const counts = {
      not_started: 0,
      in_progress: 0,
      stuck: 0,
      sj_review: 0,
      completed: 0,
    };
    agreements.forEach(agreement => {
      counts[agreement.status]++;
    });
    return counts;
  }, [agreements]);

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
    listId: string; // Añadido para recibir el listId seleccionado en el formulario
  }) => {
    const newId = (Math.max(...agreements.map(a => parseInt(a.id))) + 1).toString();
    const newAgreement: Agreement = {
      ...agreement,
      id: newId,
      // Ya no asignamos listId aquí, viene del formulario
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
          <Fade in={!hasShownWelcome}>
            <Paper
              sx={{
                p: 3,
                mb: 4,
                borderRadius: '12px',
                backgroundColor: 'var(--status-info-bg)',
                border: '1px solid var(--status-info-text)',
                display: 'flex',
                alignItems: 'center',
                gap: 2,
              }}
            >
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  backgroundColor: 'var(--status-info-text)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                }}
              >
                <FileText size={20} />
              </Box>
              <Box>
                <Typography
                  variant="h5"
                  sx={{
                    color: 'var(--status-info-text)',
                    fontWeight: 600,
                    mb: 0.5,
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
              </Box>
            </Paper>
          </Fade>
        )}

        {/* Page Header */}
        <Box sx={{ mb: 6 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
            <Box>
              <Typography
                variant="h4"
                component={motion.h1}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                sx={{
                  fontSize: '2rem',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  mb: 1,
                }}
              >
                Acuerdos
              </Typography>
              <Typography
                component={motion.p}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                sx={{
                  fontSize: '1rem',
                  color: 'var(--text-secondary)',
                }}
              >
                Gestión y seguimiento de acuerdos
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant="outlined"
                startIcon={<Plus size={16} />}
                onClick={() => setIsNewListOpen(true)}
                sx={{
                  borderColor: 'var(--border-color)',
                  color: 'var(--text-primary)',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  textTransform: 'none',
                  px: 2.5,
                  height: '40px',
                  borderRadius: '8px',
                  '&:hover': {
                    borderColor: 'var(--text-secondary)',
                    backgroundColor: 'transparent',
                  }
                }}
              >
                Nueva Lista
              </Button>

              <Button
                variant="contained"
                startIcon={<Plus size={16} />}
                onClick={() => setIsNewAgreementOpen(true)}
                sx={{
                  backgroundColor: 'var(--brand-primary)',
                  color: '#ffffff',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  textTransform: 'none',
                  px: 2.5,
                  height: '40px',
                  borderRadius: '8px',
                  boxShadow: 'none',
                  '&:hover': {
                    backgroundColor: 'var(--brand-primary-hover)',
                    boxShadow: 'none',
                  }
                }}
              >
                Nuevo Acuerdo
              </Button>
            </Box>
          </Box>

          {/* Stats Cards */}
          <AgreementStats counts={getStatusCounts} />

          {/* Search and Filters */}
          <Box sx={{ mt: 4, mb: 3 }}>
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
                  height: '40px',
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
                maxWidth: '100%',
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
        </Box>

        {/* Tabs for Lists */}
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
              variant="scrollable"
              scrollButtons="auto"
              sx={{
                borderBottom: '1px solid var(--border-color)',
                '& .MuiTabs-indicator': {
                  backgroundColor: lists[currentTab]?.color || 'var(--brand-primary)',
                },
                '& .MuiTabs-flexContainer': {
                  gap: 1.5, // Add gap between tabs
                },
              }}
              TabIndicatorProps={{
                style: {
                  height: '3px',
                  borderRadius: '3px 3px 0 0',
                }
              }}
            >
              {lists.map((list, index) => (
                <Tab
                  key={list.id}
                  label={
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        height: '32px',
                        py: 0.5,
                        px: 1.5,
                        borderRadius: '16px',
                        // Inverted behavior: unselected is vibrant, selected is more subtle
                        backgroundColor: currentTab === index
                          ? `${list.color}70` // 70% opacity when selected
                          : list.color, // Full opacity when not selected
                        color: '#fff', // White text for both states for better contrast
                        transition: 'all 0.2s ease',
                        boxShadow: currentTab === index
                          ? 'none' // No shadow when selected
                          : `0 2px 8px ${list.color}40`, // Shadow when not selected
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: '0.875rem',
                          fontWeight: 600,
                          mr: 1,
                        }}
                      >
                        {list.name}
                      </Typography>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          minWidth: 20,
                          height: 20,
                          borderRadius: '10px',
                          backgroundColor: 'rgba(255, 255, 255, 0.3)',
                          color: '#fff',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                        }}
                      >
                        {agreements.filter(a => a.listId === list.id).length}
                      </Box>
                    </Box>
                  }
                  value={index}
                  sx={{
                    textTransform: 'none',
                    minHeight: '48px',
                    padding: 0,
                    minWidth: 'auto',
                    marginRight: 0,
                    opacity: 1,
                  }}
                  disableRipple
                />
              ))}
            </Tabs>
            <Tooltip title="Eliminar lista" placement="left">
              <IconButton
                onClick={() => handleDeleteList(lists[currentTab])}
                size="small"
                sx={{
                  color: 'var(--text-secondary)',
                  '&:hover': {
                    color: 'var(--status-error-text)',
                    backgroundColor: 'var(--status-error-bg)',
                  },
                }}
              >
                <Trash2 size={16} />
              </IconButton>
            </Tooltip>
          </Box>
        </Paper>

        {/* Agreements Table */}
        <AgreementTable
          agreements={currentTabAgreements}
          onStatusChange={handleStatusChange}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onResponsibleChange={() => { }}
          onNewAgreement={() => setIsNewAgreementOpen(true)}
        />

        {/* Dialogs */}
        <NewAgreementDialog
          open={isNewAgreementOpen}
          onClose={() => setIsNewAgreementOpen(false)}
          onSubmit={handleNewAgreement}
          lists={lists} // Pasamos todas las listas disponibles
          currentListId={lists[currentTab]?.id} // Pasamos la lista actual como predeterminada
        />

        <EditAgreementDialog
          open={!!editingAgreement}
          onClose={() => setEditingAgreement(null)}
          onSubmit={handleEditSubmit}
          agreement={editingAgreement}
          lists={lists} // Agregar esta línea para pasar la lista de listas
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
                backgroundColor: 'var(--status-error-text)',
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
                backgroundColor: 'var(--status-error-text)',
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