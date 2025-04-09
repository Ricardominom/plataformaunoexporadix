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

const mockAgreements: Agreement[] = [
  {
    id: '1',
    listId: '1',
    element: 'Contrato de Servicios Cloud',
    responsible: 'Director comercial',
    status: 'in_progress',
    requestDate: '2024-02-15',
    deliveryDate: '2024-02-28',
    description: 'Revisión y actualización del contrato de servicios cloud con el proveedor principal',
    sjRequest: 'Revisar cláusulas de seguridad y privacidad',
    sjStatus: 'sj_review',
  },
  {
    id: '2',
    listId: '1',
    element: 'Acuerdo de Confidencialidad',
    responsible: 'PMO',
    status: 'completed',
    requestDate: '2024-02-10',
    deliveryDate: '2024-02-20',
    description: 'Preparación de NDA para nuevo proyecto de innovación',
    sjRequest: 'Verificar alcance y duración',
    sjStatus: 'completed',
  },
  {
    id: '3',
    listId: '1',
    element: 'Términos y Condiciones App',
    responsible: 'Directora SSC',
    status: 'stuck',
    requestDate: '2024-02-18',
    deliveryDate: '2024-03-01',
    description: 'Actualización de T&C para la nueva versión de la aplicación móvil',
    sjRequest: 'Incluir nuevas funcionalidades',
    sjStatus: 'not_started',
  },
  {
    id: '4',
    listId: '2',
    element: 'Auditoría GDPR',
    responsible: 'Director General de Espora',
    status: 'in_progress',
    requestDate: '2024-02-12',
    deliveryDate: '2024-03-15',
    description: 'Revisión de cumplimiento con regulaciones GDPR',
    sjRequest: 'Evaluar procesos de datos personales',
    sjStatus: 'in_progress',
  },
  {
    id: '5',
    listId: '2',
    element: 'Política de Seguridad',
    responsible: 'Research and Development',
    status: 'sj_review',
    requestDate: '2024-02-14',
    deliveryDate: '2024-02-25',
    description: 'Actualización de políticas de seguridad corporativa',
    sjRequest: 'Revisar medidas de ciberseguridad',
    sjStatus: 'in_progress',
  },
  {
    id: '6',
    listId: '2',
    element: 'Certificación ISO 27001',
    responsible: 'Presidente',
    status: 'not_started',
    requestDate: '2024-02-20',
    deliveryDate: '2024-04-01',
    description: 'Preparación para certificación de seguridad ISO',
    sjRequest: 'Documentar procesos de seguridad',
    sjStatus: 'not_started',
  },
];

interface List {
  id: string;
  name: string;
  color: string;
}

const initialLists: List[] = [
  { id: '1', name: 'Contratos', color: '#ff9500' },
  { id: '2', name: 'Compliance', color: '#5856d6' },
];

export const AgreementsPage: React.FC = () => {
  const { user, hasShownWelcome, setHasShownWelcome } = useAuth();
  const [agreements, setAgreements] = useState<Agreement[]>(mockAgreements);
  const [lists, setLists] = useState<List[]>(initialLists);
  const [currentTab, setCurrentTab] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [isNewAgreementOpen, setIsNewAgreementOpen] = useState(false);
  const [isNewListOpen, setIsNewListOpen] = useState(false);
  const [editingAgreement, setEditingAgreement] = useState<Agreement | null>(null);
  const [deletingAgreement, setDeletingAgreement] = useState<Agreement | null>(null);
  const [deletingList, setDeletingList] = useState<List | null>(null);

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
    setAgreements(agreements.map(agreement =>
      agreement.id === id 
        ? { 
            ...agreement, 
            [isSJStatus ? 'sjStatus' : 'status']: status 
          } 
        : agreement
    ));
  };

  const handleResponsibleChange = (id: string, responsible: string) => {
    setAgreements(agreements.map(agreement =>
      agreement.id === id ? { ...agreement, responsible } : agreement
    ));
  };

  const handleEdit = (agreement: Agreement) => {
    setEditingAgreement(agreement);
  };

  const handleEditSubmit = (updatedAgreement: Agreement) => {
    setAgreements(agreements.map(agreement =>
      agreement.id === updatedAgreement.id ? updatedAgreement : agreement
    ));
    setEditingAgreement(null);
  };

  const handleDelete = (agreement: Agreement) => {
    setDeletingAgreement(agreement);
  };

  const confirmDelete = () => {
    if (deletingAgreement) {
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
    setIsNewAgreementOpen(false);
  };

  const handleNewList = (list: { name: string; color: string }) => {
    const newList: List = {
      id: (lists.length + 1).toString(),
      name: list.name,
      color: list.color,
    };
    setLists([...lists, newList]);
    setCurrentTab(lists.length);
  };

  const handleDeleteList = (list: List) => {
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
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <Box sx={{ position: 'relative', zIndex: 1 }}>
              <Typography
                variant="h5"
                sx={{
                  color: 'var(--status-info-text)',
                  fontWeight: 600,
                  mb: 1,
                  animation: 'slideIn 0.5s ease-out',
                }}
              >
                ¡Bienvenido, {user?.name}!
              </Typography>
              <Typography
                sx={{
                  color: 'var(--status-info-text)',
                  opacity: 0.9,
                  animation: 'fadeIn 0.5s ease-out 0.2s both',
                }}
              >
                Nos alegra tenerte de vuelta. Aquí tienes un resumen de tus acuerdos y actividades pendientes.
              </Typography>
            </Box>
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '30%',
                height: '100%',
                background: 'linear-gradient(45deg, transparent, var(--status-info-bg))',
                animation: 'float 3s ease-in-out infinite',
              }}
            />
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
          onResponsibleChange={handleResponsibleChange}
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
            <Typography sx={{
              color: 'var(--text-secondary)',
              fontSize: '0.875rem',
              mt: 1,
            }}>
              Esta acción no se puede deshacer.
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
              Se eliminarán todos los acuerdos asociados a esta lista. Esta acción no se puede deshacer.
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
