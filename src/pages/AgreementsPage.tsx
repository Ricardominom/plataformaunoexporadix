import React, { useState, useMemo, useEffect, useCallback } from 'react';
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
  Download,
} from 'lucide-react';
import { AgreementTable } from '../components/agreements/AgreementTable';
import { NewAgreementDialog } from '../components/agreements/NewAgreementDialog';
import { EditAgreementDialog } from '../components/agreements/EditAgreementDialog';
import { NewListDialog } from '../components/todos/NewListDialog';
import {
  fetchLists,
  createListApi,
  deleteListApi,
  createAgreementApi,
  updateAgreementApi,
  deleteAgreementApi,
} from '../services/api';
import api from '../services/api';
import { Agreement, AgreementStatus } from '../types/agreement';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import { AgreementStats } from '../components/agreements/AgreementStats';

export const AgreementsPage: React.FC = () => {
  const { user, hasShownWelcome, setHasShownWelcome } = useAuth();
  const { addNotification } = useNotification();

  const [agreements, setAgreements] = useState<Agreement[]>([]);
  const [lists, setLists] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [currentTab, setCurrentTab] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [isNewAgreementOpen, setIsNewAgreementOpen] = useState(false);
  const [isNewListOpen, setIsNewListOpen] = useState(false);
  const [editingAgreement, setEditingAgreement] = useState<Agreement | null>(null);
  const [deletingAgreement, setDeletingAgreement] = useState<Agreement | null>(null);
  const [deletingList, setDeletingList] = useState<{ id: string; name: string } | null>(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [listsRes, agreementsRes] = await Promise.all([
        fetchLists(),
        api.get('/agreements'),
      ]);
      setLists(listsRes.data || listsRes);
      setAgreements(agreementsRes.data.data || agreementsRes.data);
    } catch (err) {
      setLists([]);
      setAgreements([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

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

  const handleStatusChange = async (id: string, status: AgreementStatus, isSJStatus = false) => {
    setLoading(true);
    try {
      await api.patch(`/agreements/${id}/status`, { status, isSJStatus });
      await loadData();
      const agreement = agreements.find(a => a.id === id);
      if (agreement) {
        addNotification('agreement', 'updated', agreement);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (agreement: Agreement) => {
    setEditingAgreement(agreement);
  };

  const handleEditSubmit = async (updatedAgreement: Agreement) => {
    setLoading(true);
    try {
      await updateAgreementApi(updatedAgreement.id, updatedAgreement);
      await loadData();
      addNotification('agreement', 'updated', updatedAgreement);
      setEditingAgreement(null);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (agreement: Agreement) => {
    setDeletingAgreement(agreement);
  };

  const confirmDelete = async () => {
    if (deletingAgreement) {
      setLoading(true);
      try {
        await deleteAgreementApi(deletingAgreement.id);
        await loadData();
        addNotification('agreement', 'deleted', deletingAgreement);
      } finally {
        setDeletingAgreement(null);
        setLoading(false);
      }
    }
  };

  const handleNewAgreement = async (agreement: {
    element: string;
    responsible: string;
    status: AgreementStatus;
    requestDate: any;
    deliveryDate: any;
    description: string;
    sjRequest: string;
    sjStatus: AgreementStatus;
    deliverable?: File | null;
    deliverableName?: string;
    listId: string;
  }) => {
    setLoading(true);
    try {
      const payload = {
        ...agreement,
        requestDate: agreement.requestDate.format('YYYY-MM-DD'),
        deliveryDate: agreement.deliveryDate.format('YYYY-MM-DD'),
      };
      await createAgreementApi(payload);
      await loadData();
      addNotification('agreement', 'created', payload);
      setIsNewAgreementOpen(false);
    } finally {
      setLoading(false);
    }
  };

  const handleNewList = async (list: { name: string; color: string }) => {
    setLoading(true);
    try {
      await createListApi(list);
      await loadData();
      addNotification('list', 'created', {
        title: list.name,
        listId: '',
        completed: false,
        createdAt: new Date().toISOString(),
      });
      setIsNewListOpen(false);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteList = (list: { id: string; name: string }) => {
    setDeletingList(list);
  };

  const confirmDeleteList = async () => {
    if (deletingList) {
      setLoading(true);
      try {
        await deleteListApi(deletingList.id);
        await loadData();
      } finally {
        setDeletingList(null);
        setLoading(false);
      }
    }
  };

  const handleDownloadDeliverable = async (agreement: Agreement) => {
    if (!agreement.deliverablePath) return;
    try {
      const res = await api.get(`/agreements/${agreement.id}/deliverable`, {
        responseType: 'blob',
      });
      const filename = agreement.deliverableName || 'archivo';
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert('No se pudo descargar el archivo.');
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

          <AgreementStats counts={getStatusCounts} />

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
                  gap: 1.5,
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
                        backgroundColor: currentTab === index
                          ? `${list.color}70`
                          : list.color,
                        color: '#fff',
                        transition: 'all 0.2s ease',
                        boxShadow: currentTab === index
                          ? 'none'
                          : `0 2px 8px ${list.color}40`,
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

        <AgreementTable
          agreements={currentTabAgreements}
          onStatusChange={handleStatusChange}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onResponsibleChange={() => { }}
          onNewAgreement={() => setIsNewAgreementOpen(true)}
          onDownloadDeliverable={handleDownloadDeliverable}
        />

        <NewAgreementDialog
          open={isNewAgreementOpen}
          onClose={() => setIsNewAgreementOpen(false)}
          onSubmit={handleNewAgreement}
          lists={lists}
          currentListId={lists[currentTab]?.id}
        />

        <EditAgreementDialog
          open={!!editingAgreement}
          onClose={() => setEditingAgreement(null)}
          onSubmit={handleEditSubmit}
          agreement={editingAgreement}
          lists={lists}
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