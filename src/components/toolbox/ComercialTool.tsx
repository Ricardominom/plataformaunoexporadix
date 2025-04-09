import React, { useState } from 'react';
import {
    Box,
    Container,
    Paper,
    Typography,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    Chip,
    IconButton,
    TextField,
    InputAdornment,
} from '@mui/material';
import {
    Plus,
    Search,
    Download,
    MoreVertical,
} from 'lucide-react';
import { NewLeadDialog } from './Forms/NewLeadDialog';
import { useNotification } from '../../context/NotificationContext';

interface ComercialLead {
    id: string;
    cuenta: string;
    estatus: 'Activo' | 'En pausa' | 'Cerrado' | 'Perdido';
    comentariosVentas: string;
    enlace: string;
    contacto: string;
    cita: string;
    presentacion: boolean;
    propuesta: 'Realizada' | 'En revisión' | 'Aceptada' | 'Pendiente';
    escenarioAprobado: boolean;
    monto: number;
    pagos: string;
    contrato: boolean;
    arranque: string;
    comentarios: string;
}

const mockLeads: ComercialLead[] = [
    {
        id: '1',
        cuenta: 'Empresa A',
        estatus: 'Activo',
        comentariosVentas: 'Cliente potencial interesado en servicios completos',
        enlace: 'Juan Pérez',
        contacto: 'contacto@empresaa.com',
        cita: '2024-03-01',
        presentacion: true,
        propuesta: 'En revisión',
        escenarioAprobado: false,
        monto: 50000,
        pagos: 'Mensual',
        contrato: false,
        arranque: '2024-04-01',
        comentarios: 'En proceso de negociación final'
    },
    {
        id: '2',
        cuenta: 'Empresa B',
        estatus: 'En pausa',
        comentariosVentas: 'Esperando aprobación de presupuesto',
        enlace: 'María González',
        contacto: 'contacto@empresab.com',
        cita: '2024-02-28',
        presentacion: true,
        propuesta: 'Realizada',
        escenarioAprobado: false,
        monto: 75000,
        pagos: 'Trimestral',
        contrato: false,
        arranque: '2024-05-01',
        comentarios: 'Cliente solicita revisión de términos'
    },
    {
        id: '3',
        cuenta: 'Empresa C',
        estatus: 'Activo',
        comentariosVentas: 'Interesado en expansión de servicios actuales',
        enlace: 'Roberto Sánchez',
        contacto: 'contacto@empresac.com',
        cita: '2024-03-15',
        presentacion: true,
        propuesta: 'Aceptada',
        escenarioAprobado: true,
        monto: 120000,
        pagos: 'Anual',
        contrato: true,
        arranque: '2024-04-15',
        comentarios: 'Cliente premium con alto potencial de crecimiento'
    }
];

const getStatusColor = (status: ComercialLead['estatus']) => {
    const colors = {
        'Activo': { bg: 'rgba(48, 209, 88, 0.1)', text: '#30d158' },
        'En pausa': { bg: 'rgba(255, 149, 0, 0.1)', text: '#ff9500' },
        'Cerrado': { bg: 'rgba(0, 113, 227, 0.1)', text: '#0071e3' },
        'Perdido': { bg: 'rgba(255, 45, 85, 0.1)', text: '#ff2d55' }
    };
    return colors[status];
};

const getPropuestaColor = (propuesta: ComercialLead['propuesta']) => {
    const colors = {
        'Realizada': { bg: 'rgba(255, 149, 0, 0.1)', text: '#ff9500' },
        'En revisión': { bg: 'rgba(0, 113, 227, 0.1)', text: '#0071e3' },
        'Aceptada': { bg: 'rgba(48, 209, 88, 0.1)', text: '#30d158' },
        'Pendiente': { bg: 'rgba(255, 45, 85, 0.1)', text: '#ff2d55' }
    };
    return colors[propuesta];
};

export const ComercialTool: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [leads, setLeads] = useState<ComercialLead[]>(mockLeads);
    const [isNewLeadDialogOpen, setIsNewLeadDialogOpen] = useState(false);
    const { addNotification } = useNotification();

    const handleNewLead = (lead: Omit<ComercialLead, 'id'>) => {
        const newLead: ComercialLead = {
            ...lead,
            id: (leads.length + 1).toString(),
            presentacion: false,
            escenarioAprobado: false,
            contrato: false,
        };

        setLeads([newLead, ...leads]);
        addNotification('list', 'created', {
            id: newLead.id,
            title: `Nuevo LEAD: ${newLead.cuenta}`,
            listId: newLead.id,
            completed: false,
            createdAt: new Date().toISOString(),
        });
    };

    const filteredLeads = leads.filter(lead => {
        if (!searchTerm) return true;
        const searchLower = searchTerm.toLowerCase();
        return (
            lead.cuenta.toLowerCase().includes(searchLower) ||
            lead.enlace.toLowerCase().includes(searchLower) ||
            lead.comentariosVentas.toLowerCase().includes(searchLower)
        );
    });

    return (
        <Box sx={{
            pt: 'calc(var(--nav-height) + 24px)',
            pb: 4,
            px: { xs: 2, sm: 3, md: 4 },
            minHeight: '100vh',
            backgroundColor: 'var(--app-bg)',
        }}>
            <Container maxWidth="xl">
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 4,
                }}>
                    <Typography
                        variant="h4"
                        sx={{
                            fontSize: '2rem',
                            fontWeight: 600,
                            color: 'var(--text-primary)',
                        }}
                    >
                        Reporte del Estado de Ventas
                        Prospección
                    </Typography>

                    <Button
                        variant="contained"
                        startIcon={<Plus size={16} />}
                        onClick={() => setIsNewLeadDialogOpen(true)}
                        sx={{
                            backgroundColor: '#0071e3',
                            color: '#ffffff',
                            fontSize: '0.875rem',
                            fontWeight: 500,
                            textTransform: 'none',
                            px: 2.5,
                            borderRadius: '6px',
                            '&:hover': {
                                backgroundColor: '#0077ED',
                            },
                        }}
                    >
                        Agregar LEADs
                    </Button>
                </Box>

                <Box sx={{ mb: 4 }}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Buscar oportunidades..."
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
                                '& fieldset': { border: 'none' },
                                '&:hover fieldset': { border: 'none' },
                                '&.Mui-focused fieldset': { border: 'none' },
                            },
                        }}
                    />
                </Box>

                <Paper
                    sx={{
                        borderRadius: '12px',
                        overflow: 'hidden',
                        backgroundColor: 'var(--surface-primary)',
                    }}
                    className="glass-effect"
                >
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Cuenta</TableCell>
                                    <TableCell>Estatus</TableCell>
                                    <TableCell>Comentarios Ventas</TableCell>
                                    <TableCell>Enlace</TableCell>
                                    <TableCell>Contacto</TableCell>
                                    <TableCell>Cita</TableCell>
                                    <TableCell>Presentación</TableCell>
                                    <TableCell>Propuesta</TableCell>
                                    <TableCell>Monto</TableCell>
                                    <TableCell>Pagos</TableCell>
                                    <TableCell>Contrato</TableCell>
                                    <TableCell>Arranque</TableCell>
                                    <TableCell>Comentarios</TableCell>
                                    <TableCell align="right">Acciones</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredLeads.map((lead) => (
                                    <TableRow key={lead.id}>
                                        <TableCell>
                                            <Typography
                                                sx={{
                                                    color: 'var(--text-primary)',
                                                    fontWeight: 500,
                                                }}
                                            >
                                                {lead.cuenta}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Chip
                                                label={lead.estatus}
                                                size="small"
                                                sx={{
                                                    backgroundColor: getStatusColor(lead.estatus).bg,
                                                    color: getStatusColor(lead.estatus).text,
                                                    fontSize: '0.75rem',
                                                    height: '24px',
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Typography
                                                sx={{
                                                    color: 'var(--text-secondary)',
                                                    fontSize: '0.875rem',
                                                    maxWidth: 200,
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap',
                                                }}
                                            >
                                                {lead.comentariosVentas}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>{lead.enlace}</TableCell>
                                        <TableCell>{lead.contacto}</TableCell>
                                        <TableCell>
                                            {new Date(lead.cita).toLocaleDateString()}
                                        </TableCell>
                                        <TableCell>
                                            <Chip
                                                label={lead.presentacion ? 'Realizada' : 'Pendiente'}
                                                size="small"
                                                sx={{
                                                    backgroundColor: lead.presentacion ? 'rgba(48, 209, 88, 0.1)' : 'rgba(255, 149, 0, 0.1)',
                                                    color: lead.presentacion ? '#30d158' : '#ff9500',
                                                    fontSize: '0.75rem',
                                                    height: '24px',
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Chip
                                                label={lead.propuesta}
                                                size="small"
                                                sx={{
                                                    backgroundColor: getPropuestaColor(lead.propuesta).bg,
                                                    color: getPropuestaColor(lead.propuesta).text,
                                                    fontSize: '0.75rem',
                                                    height: '24px',
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Typography
                                                sx={{
                                                    color: 'var(--text-primary)',
                                                    fontWeight: 500,
                                                }}
                                            >
                                                ${lead.monto.toLocaleString()}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>{lead.pagos}</TableCell>
                                        <TableCell>
                                            <Chip
                                                label={lead.contrato ? 'Firmado' : 'Pendiente'}
                                                size="small"
                                                sx={{
                                                    backgroundColor: lead.contrato ? 'rgba(48, 209, 88, 0.1)' : 'rgba(255, 149, 0, 0.1)',
                                                    color: lead.contrato ? '#30d158' : '#ff9500',
                                                    fontSize: '0.75rem',
                                                    height: '24px',
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            {new Date(lead.arranque).toLocaleDateString()}
                                        </TableCell>
                                        <TableCell>
                                            <Typography
                                                sx={{
                                                    color: 'var(--text-secondary)',
                                                    fontSize: '0.875rem',
                                                    maxWidth: 200,
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap',
                                                }}
                                            >
                                                {lead.comentarios}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="right">
                                            <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                                                <IconButton
                                                    size="small"
                                                    sx={{
                                                        color: 'var(--text-secondary)',
                                                        '&:hover': {
                                                            backgroundColor: 'var(--hover-bg)',
                                                            color: 'var(--text-primary)',
                                                        }
                                                    }}
                                                >
                                                    <Download size={16} />
                                                </IconButton>
                                                <IconButton
                                                    size="small"
                                                    sx={{
                                                        color: 'var(--text-secondary)',
                                                        '&:hover': {
                                                            backgroundColor: 'var(--hover-bg)',
                                                            color: 'var(--text-primary)',
                                                        }
                                                    }}
                                                >
                                                    <MoreVertical size={16} />
                                                </IconButton>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>

                <NewLeadDialog
                    open={isNewLeadDialogOpen}
                    onClose={() => setIsNewLeadDialogOpen(false)}
                    onSubmit={handleNewLead}
                />
            </Container>
        </Box>
    );
};