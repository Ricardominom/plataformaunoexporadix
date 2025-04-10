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
  Chip,
  Tooltip,
  Badge,
  Fade,
} from '@mui/material';
import { Plus, Search, Trash2, FileText, AlertCircle, CheckCircle2, Clock } from 'lucide-react';
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
                backgroundColor: 'rgba(0, 113, 227, 0.1)',
                border: '1px solid #0071e3',
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
                  backgroundColor: '#0071e3',
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
                    color: '#0071e3',
                    fontWeight: 600,
                    mb: 0.5,
                  }}
                >
                  ¡Bienvenido, {user?.name}!
                </Typography>
                <Typography
                  sx={{
                    color: '#0071e3',
                    opacity: 0.9,
                  }}
                >
                  Aquí tienes un resumen de tus acuerdos y actividades pendientes.
                </Typography>
              </Box>
            </Paper>
          </Fade>
        )}

        <Box sx={{ mb: 6 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
            <Box>
              <Typography
                variant="h4"
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
                  backgroundColor: '#0071e3',
                  color: '#ffffff',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  textTransform: 'none',
                  px: 2.5,
                  height: '40px',
                  borderRadius: '8px',
                  boxShadow: 'none',
                  '&:hover': {
                    backgroundColor: '#0077ED',
                    boxShadow: 'none',
                  }
                }}
              >
                Nuevo Acuerdo
              </Button>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
            {[
              { status: 'not_started', label: 'Sin comenzar', icon: <Clock size={16} /> },
              { status: 'in_progress', label: 'En proceso', icon: <Clock size={16} /> },
              { status: 'stuck', label: 'Estancado', icon: <AlertCircle size={16} /> },
              { status: 'sj_review', label: 'Para revisión', icon: <Clock size={16} /> },
              { status: 'completed', label: 'Completado', icon: <CheckCircle2 size={16} /> },
            ].map((item) => (
              <Paper
                key={item.status}
                sx={{
                  p: 2,
                  borderRadius: '12px',
                  backgroundColor: 'var(--surface-primary)',
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1,
                  transition: 'transform 0.2s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                  },
                }}
                className="glass-effect"
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box
                    sx={{
                      width: 32,
                      height: 32,
                      borderRadius: '8px',
                      backgroundColor: item.status === 'not_started' ? 'rgba(0, 0, 0, 0.04)' :
                        item.status === 'in_progress' ? 'rgba(0, 113, 227, 0.1)' :
                          item.status === 'stuck' ? 'rgba(255, 45, 85, 0.1)' :
                            item.status === 'sj_review' ? 'rgba(255, 149, 0, 0.1)' :
                              'rgba(48, 209, 88, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: item.status === 'not_started' ? 'var(--text-primary)' :
                        item.status === 'in_progress' ? '#0071e3' :
                          item.status === 'stuck' ? '#ff2d55' :
                            item.status === 'sj_review' ? '#ff9500' :
                              '#30d158',
                    }}
                  >
                    {item.icon}
                  </Box>
                  <Typography
                    sx={{
                      fontSize: '0.875rem',
                      color: 'var(--text-secondary)',
                    }}
                  >
                    {item.label}
                  </Typography>
                </Box>
                <Typography
                  variant="h4"
                  sx={{
                    fontSize: '1.5rem',
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                  }}
                >
                  {getStatusCounts[item.status as keyof typeof getStatusCounts]}
                </Typography>
              </Paper>
            ))}
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, mt: 4 }}>
            <TextField
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
                width: '300px',
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                  '& fieldset': { border: 'none' },
                  '&:hover fieldset': { border: 'none' },
                  '&.Mui-focused fieldset': { border: 'none' },
                },
              }}
            />
          </Box>
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
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          backgroundColor: list.color,
                        }}
                      />
                      {list.name}
                      <Badge
                        badgeContent={agreements.filter(a => a.listId === list.id).length}
                        color="primary"
                        sx={{
                          '& .MuiBadge-badge': {
                            backgroundColor: list.color,
                            color: '#fff',
                            fontSize: '0.75rem',
                            minWidth: '20px',
                            height: '20px',
                          },
                        }}
                      />
                    </Box>
                  }
                  value={index}
                  sx={{
                    textTransform: 'none',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    minHeight: '48px',
                    color: 'var(--text-secondary)',
                    '&.Mui-selected': {
                      color: list.color,
                    },
                  }}
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
                    color: '#ff2d55',
                    backgroundColor: 'rgba(255, 45, 85, 0.1)',
                  },
                }}
              >
                <Trash2 size={16} />
              </IconButton>
            </Tooltip>
          </Box>
        </Paper>

        <AgreementTable
          agreements={currentTabAgreements}
          onStatusChange={handleStatusChange}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onResponsibleChange={() => { }}
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