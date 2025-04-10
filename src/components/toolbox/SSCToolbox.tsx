import React, { useState } from 'react';
import { 
    Box, 
    Button, 
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
    Tabs, 
    Tab, 
    IconButton,
    Tooltip,
    Chip,
} from '@mui/material';
import { 
    DollarSign, 
    Scale, 
    BarChart2, 
    Wallet,
    Plus,
} from 'lucide-react';
import { NewMoneyApprovalDialog } from './Forms/NewMoneyApprovalDialog';
import { NewLegalSectionDialog } from './Forms/NewLegalSectionDialog';
import { NewIndicatorDialog } from './Forms/NewIndicatorDialog';
import { NewAccountDialog } from './Forms/NewAccountDialog';
import { useNotification } from '../../context/NotificationContext';
import { useMoneyApprovals } from '../../hooks/useMoneyApprovals';

// Import mock data from centralized data module
import {
    legalCases,
    actionPlans,
    balanceItems,
} from '../../data/ssc';

const getStatusColor = (status: 'Listo' | 'En proceso' | 'Detenido') => {
  const colors = {
    'Listo': { bg: 'rgba(48, 209, 88, 0.1)', text: '#30d158' },
    'En proceso': { bg: 'rgba(255, 149, 0, 0.1)', text: '#ff9500' },
    'Detenido': { bg: 'rgba(255, 45, 85, 0.1)', text: '#ff2d55' }
  };
  return colors[status];
};

const getApartadoColor = (apartado: string) => {
  const colors = {
    'Otros': '#ff2d55',
    'Gobierno Corporativo': '#0071e3',
    'Documentos propuestos': '#ff9500',
    'Contencioso Mercantil': '#30d158',
    'Contencioso Laboral': '#ff2d55'
  };
  return colors[apartado as keyof typeof colors] || '#86868b';
};

export const SSCToolbox: React.FC = () => {
    const [currentTab, setCurrentTab] = useState(0);
    const [isNewApprovalOpen, setIsNewApprovalOpen] = useState(false);
    const [isNewLegalSectionOpen, setIsNewLegalSectionOpen] = useState(false);
    const [isNewIndicatorOpen, setIsNewIndicatorOpen] = useState(false);
    const [isNewAccountOpen, setIsNewAccountOpen] = useState(false);
    const [cases, setCases] = useState(legalCases.cases);
    const [plans, setPlans] = useState(actionPlans.plans);
    const [items, setItems] = useState(balanceItems.items);
    const { addNotification } = useNotification();
    
    // Use the money approvals hook
    const { 
        pendingApprovals, 
        approvedApprovals, 
        rejectedApprovals, 
        addPendingApproval 
    } = useMoneyApprovals();

    const handleNewApproval = (approval: {
        urgent: boolean;
        paymentDate: string;
        category: string;
        subcategory: string;
        concept: string;
        sscComments: string;
        amount: number;
        transferToEspora: number;
        toDispatchForTransfer: number;
        transferToInterlogis: number;
        transferToDemotactica: number;
        transferToDotcom: number;
    }) => {
        addPendingApproval(approval);
        setIsNewApprovalOpen(false);
        addNotification('Aprobación agregada exitosamente');
    };

    const handleNewLegalSection = (section: {
        apartado: string;
        tema: string | null;
        proyecto: 'Listo' | 'En proceso' | 'Detenido';
        instancias: 'Listo' | 'En proceso' | 'Detenido';
        concluido: 'Listo' | 'En proceso' | 'Detenido';
    }) => {
        const newCase = {
            id: (cases.length + 1).toString(),
            ...section,
        };
        setCases([...cases, newCase]);
        setIsNewLegalSectionOpen(false);
        addNotification('Apartado legal agregado exitosamente');
    };

    const handleNewIndicator = (indicator: {
        indicator: string;
        goal: number;
        achieved: number;
    }) => {
        const newIndicator = {
            id: (plans.length + 1).toString(),
            indicator: indicator.indicator,
            goal: indicator.goal,
            achieved: indicator.achieved,
            progress: Math.round((indicator.achieved / indicator.goal) * 100),
        };
        setPlans([...plans, newIndicator]);
        setIsNewIndicatorOpen(false);
        addNotification('Indicador agregado exitosamente');
    };

    const handleNewAccount = (account: {
        item: string;
        montoBancarizado: number;
        montoDespacho: number;
        efectivo: number;
        credito: number;
        deuda: number;
        observaciones: string;
    }) => {
        const newAccount = {
            id: (items.length + 1).toString(),
            ...account,
        };
        setItems([...items, newAccount]);
        setIsNewAccountOpen(false);
        addNotification('Cuenta agregada exitosamente');
    };

    const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
        setCurrentTab(newValue);
    };

    const renderMoneyApprovals = () => (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ color: 'var(--text-primary)' }}>
                    Aprobaciones Financieras Pendientes
                </Typography>
                <Button
                    startIcon={<Plus size={16} />}
                    variant="outlined"
                    onClick={() => setIsNewApprovalOpen(true)}
                    sx={{
                        color: '#ff2d55',
                        borderColor: '#ff2d55',
                        fontSize: '0.875rem',
                        fontWeight: 500,
                        textTransform: 'none',
                        px: 2.5,
                        borderRadius: '6px',
                        '&:hover': {
                            borderColor: '#ff2d55',
                            backgroundColor: 'rgba(255, 45, 85, 0.1)',
                        },
                    }}
                >
                    Agregar Aprobación
                </Button>
            </Box>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Urgente</TableCell>
                            <TableCell>Fecha de pago</TableCell>
                            <TableCell>Categoría</TableCell>
                            <TableCell>Subcategoría</TableCell>
                            <TableCell>Concepto</TableCell>
                            <TableCell>Comentarios SSC</TableCell>
                            <TableCell>Suma</TableCell>
                            <TableCell>Transferencia a Espora</TableCell>
                            <TableCell>A despacho para transferir</TableCell>
                            <TableCell>Transferencia a Interlogis</TableCell>
                            <TableCell>Transferencia a Demotáctica</TableCell>
                            <TableCell>Transferencia a Dotcom</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {pendingApprovals.map((approval) => (
                            <TableRow key={approval.id}>
                                <TableCell>
                                    <Chip
                                        label={approval.urgent ? 'Urgente' : 'Normal'}
                                        size="small"
                                        sx={{
                                            backgroundColor: approval.urgent ? 'rgba(255, 45, 85, 0.1)' : 'rgba(0, 113, 227, 0.1)',
                                            color: approval.urgent ? '#ff2d55' : '#0071e3',
                                        }}
                                    />
                                </TableCell>
                                <TableCell>{new Date(approval.paymentDate).toLocaleDateString()}</TableCell>
                                <TableCell>{approval.category}</TableCell>
                                <TableCell>{approval.subcategory}</TableCell>
                                <TableCell>{approval.concept}</TableCell>
                                <TableCell>{approval.sscComments}</TableCell>
                                <TableCell>
                                    <Typography sx={{ color: 'var(--text-primary)', fontWeight: 500 }}>
                                        ${approval.amount.toLocaleString()}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography sx={{ color: 'var(--text-primary)' }}>
                                        ${approval.transferToEspora.toLocaleString()}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography sx={{ color: 'var(--text-primary)' }}>
                                        ${approval.toDispatchForTransfer.toLocaleString()}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography sx={{ color: 'var(--text-primary)' }}>
                                        ${approval.transferToInterlogis.toLocaleString()}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography sx={{ color: 'var(--text-primary)' }}>
                                        ${approval.transferToDemotactica.toLocaleString()}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography sx={{ color: 'var(--text-primary)' }}>
                                        ${approval.transferToDotcom.toLocaleString()}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        ))}
                        {pendingApprovals.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={12} align="center" sx={{ py: 3 }}>
                                    No hay aprobaciones pendientes
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Approved Expenses Section */}
            {approvedApprovals.length > 0 && (
                <Box sx={{ mt: 4 }}>
                    <Typography variant="h6" sx={{ color: 'var(--text-primary)', mb: 2 }}>
                        Erogaciones Aprobadas
                    </Typography>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Urgente</TableCell>
                                    <TableCell>Fecha de pago</TableCell>
                                    <TableCell>Categoría</TableCell>
                                    <TableCell>Concepto</TableCell>
                                    <TableCell>Suma</TableCell>
                                    <TableCell>Estado</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {approvedApprovals.map((approval) => (
                                    <TableRow key={approval.id}>
                                        <TableCell>
                                            <Chip
                                                label={approval.urgent ? 'Urgente' : 'Normal'}
                                                size="small"
                                                sx={{
                                                    backgroundColor: approval.urgent ? 'rgba(255, 45, 85, 0.1)' : 'rgba(0, 113, 227, 0.1)',
                                                    color: approval.urgent ? '#ff2d55' : '#0071e3',
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell>{new Date(approval.paymentDate).toLocaleDateString()}</TableCell>
                                        <TableCell>{approval.category}</TableCell>
                                        <TableCell>{approval.concept}</TableCell>
                                        <TableCell>
                                            <Typography sx={{ color: 'var(--text-primary)', fontWeight: 500 }}>
                                                ${approval.amount.toLocaleString()}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Chip
                                                label="Aprobado"
                                                size="small"
                                                sx={{
                                                    backgroundColor: 'rgba(48, 209, 88, 0.1)',
                                                    color: '#30d158',
                                                }}
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            )}

            {/* Rejected Expenses Section */}
            {rejectedApprovals.length > 0 && (
                <Box sx={{ mt: 4 }}>
                    <Typography variant="h6" sx={{ color: 'var(--text-primary)', mb: 2 }}>
                        Erogaciones Rechazadas
                    </Typography>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Urgente</TableCell>
                                    <TableCell>Fecha de pago</TableCell>
                                    <TableCell>Categoría</TableCell>
                                    <TableCell>Concepto</TableCell>
                                    <TableCell>Suma</TableCell>
                                    <TableCell>Estado</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rejectedApprovals.map((approval) => (
                                    <TableRow key={approval.id}>
                                        <TableCell>
                                            <Chip
                                                label={approval.urgent ? 'Urgente' : 'Normal'}
                                                size="small"
                                                sx={{
                                                    backgroundColor: approval.urgent ? 'rgba(255, 45, 85, 0.1)' : 'rgba(0, 113, 227, 0.1)',
                                                    color: approval.urgent ? '#ff2d55' : '#0071e3',
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell>{new Date(approval.paymentDate).toLocaleDateString()}</TableCell>
                                        <TableCell>{approval.category}</TableCell>
                                        <TableCell>{approval.concept}</TableCell>
                                        <TableCell>
                                            <Typography sx={{ color: 'var(--text-primary)', fontWeight: 500 }}>
                                                ${approval.amount.toLocaleString()}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Chip
                                                label="Rechazado"
                                                size="small"
                                                sx={{
                                                    backgroundColor: 'rgba(255, 45, 85, 0.1)',
                                                    color: '#ff2d55',
                                                }}
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            )}
        </>
    );

    const renderLegalBalance = () => (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ color: 'var(--text-primary)' }}>
                    Balance Legal
                </Typography>
                <Button
                    startIcon={<Plus size={16} />}
                    variant="outlined"
                    onClick={() => setIsNewLegalSectionOpen(true)}
                    sx={{
                        color: '#ff2d55',
                        borderColor: '#ff2d55',
                        fontSize: '0.875rem',
                        fontWeight: 500,
                        textTransform: 'none',
                        px: 2.5,
                        borderRadius: '6px',
                        '&:hover': {
                            borderColor: '#ff2d55',
                            backgroundColor: 'rgba(255, 45, 85, 0.1)',
                        },
                    }}
                >
                    Agregar Apartado
                </Button>
            </Box>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Apartado</TableCell>
                            <TableCell>Tema</TableCell>
                            <TableCell>Proyecto</TableCell>
                            <TableCell>Instancias</TableCell>
                            <TableCell>Concluido</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cases.map((caso) => (
                            <TableRow key={caso.id}>
                                <TableCell>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Box
                                            sx={{
                                                width: 8,
                                                height: 8,
                                                borderRadius: '50%',
                                                backgroundColor: getApartadoColor(caso.apartado),
                                            }}
                                        />
                                        <Typography sx={{ color: 'var(--text-primary)' }}>
                                            {caso.apartado}
                                        </Typography>
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Typography sx={{ color: 'var(--text-primary)' }}>
                                        {caso.tema || '-'}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={caso.proyecto}
                                        size="small"
                                        sx={{
                                            backgroundColor: getStatusColor(caso.proyecto).bg,
                                            color: getStatusColor(caso.proyecto).text,
                                        }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={caso.instancias}
                                        size="small"
                                        sx={{
                                            backgroundColor: getStatusColor(caso.instancias).bg,
                                            color: getStatusColor(caso.instancias).text,
                                        }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={caso.concluido}
                                        size="small"
                                        sx={{
                                            backgroundColor: getStatusColor(caso.concluido).bg,
                                            color: getStatusColor(caso.concluido).text,
                                        }}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );

    const renderActionPlans = () => (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ color: 'var(--text-primary)' }}>
                    Avance de planes de acción
                </Typography>
                <Button
                    startIcon={<Plus size={16} />}
                    variant="outlined"
                    onClick={() => setIsNewIndicatorOpen(true)}
                    sx={{
                        color: '#ff2d55',
                        borderColor: '#ff2d55',
                        fontSize: '0.875rem',
                        fontWeight: 500,
                        textTransform: 'none',
                        px: 2.5,
                        borderRadius: '6px',
                        '&:hover': {
                            borderColor: '#ff2d55',
                            backgroundColor: 'rgba(255, 45, 85, 0.1)',
                        },
                    }}
                >
                    Agregar Indicador
                </Button>
            </Box>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Indicador</TableCell>
                            <TableCell align="right">Meta</TableCell>
                            <TableCell align="right">Realizado</TableCell>
                            <TableCell align="right">% de avance</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {plans.map((plan) => (
                            <TableRow key={plan.id}>
                                <TableCell>
                                    <Typography sx={{ color: 'var(--text-primary)' }}>
                                        {plan.indicator}
                                    </Typography>
                                </TableCell>
                                <TableCell align="right">
                                    <Typography sx={{ color: 'var(--text-primary)' }}>
                                        {plan.goal}
                                    </Typography>
                                </TableCell>
                                <TableCell align="right">
                                    <Typography sx={{ color: 'var(--text-primary)' }}>
                                        {plan.achieved}
                                    </Typography>
                                </TableCell>
                                <TableCell align="right">
                                    <Typography sx={{ color: 'var(--text-primary)' }}>
                                        {plan.progress}%
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );

    const renderBalanceGeneral = () => (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ color: 'var(--text-primary)' }}>
                    Estado de Cuentas
                </Typography>
                <Button
                    startIcon={<Plus size={16} />}
                    variant="outlined"
                    onClick={() => setIsNewAccountOpen(true)}
                    sx={{
                        color: '#ff2d55',
                        borderColor: '#ff2d55',
                        fontSize: '0.875rem',
                        fontWeight: 500,
                        textTransform: 'none',
                        px: 2.5,
                        borderRadius: '6px',
                        '&:hover': {
                            borderColor: '#ff2d55',
                            backgroundColor: 'rgba(255, 45, 85, 0.1)',
                        },
                    }}
                >
                    Agregar Cuenta
                </Button>
            </Box>

            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Item</TableCell>
                            <TableCell align="right">Monto Bancarizado</TableCell>
                            <TableCell align="right">Monto Despacho</TableCell>
                            <TableCell align="right">Efectivo</TableCell>
                            <TableCell align="right">Crédito</TableCell>
                            <TableCell align="right">Deuda</TableCell>
                            <TableCell>Observaciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {items.map((account) => (
                            <TableRow key={account.id}>
                                <TableCell>
                                    <Typography sx={{ color: 'var(--text-primary)' }}>
                                        {account.item}
                                    </Typography>
                                </TableCell>
                                <TableCell align="right">
                                    <Typography sx={{ color: 'var(--text-primary)' }}>
                                        ${account.montoBancarizado.toLocaleString()}
                                    </Typography>
                                </TableCell>
                                <TableCell align="right">
                                    <Typography sx={{ color: 'var(--text-primary)' }}>
                                        ${account.montoDespacho.toLocaleString()}
                                    </Typography>
                                </TableCell>
                                <TableCell align="right">
                                    <Typography sx={{ color: 'var(--text-primary)' }}>
                                        ${account.efectivo.toLocaleString()}
                                    </Typography>
                                </TableCell>
                                <TableCell align="right">
                                    <Typography sx={{ color: 'var(--text-primary)' }}>
                                        ${account.credito.toLocaleString()}
                                    </Typography>
                                </TableCell>
                                <TableCell align="right">
                                    <Typography sx={{ color: 'var(--text-primary)' }}>
                                        ${account.deuda.toLocaleString()}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography sx={{ color: 'var(--text-primary)' }}>
                                        {account.observaciones || '-'}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );

    return (
        <Box sx={{
            pt: 'calc(var(--nav-height) + 24px)',
            pb: 4,
            px: { xs: 2, sm: 3, md: 4 },
            minHeight: '100vh',
            backgroundColor: 'var(--app-bg)',
        }}>
            <Container maxWidth="xl">
                <Typography
                    variant="h4"
                    sx={{
                        fontSize: '2rem',
                        fontWeight: 600,
                        color: 'var(--text-primary)',
                        mb: 4,
                    }}
                >
                    Toolbox
                </Typography>

                <Paper
                    sx={{
                        borderRadius: '12px',
                        backgroundColor: 'var(--surface-primary)',
                        mb: 3,
                    }}
                    className="glass-effect"
                >
                    <Tabs
                        value={currentTab}
                        onChange={handleTabChange}
                        sx={{
                            borderBottom: '1px solid var(--border-color)',
                            '& .MuiTabs-indicator': {
                                backgroundColor: '#0071e3',
                            },
                        }}
                    >
                        <Tab 
                            icon={<DollarSign size={16} />}
                            iconPosition="start"
                            label="Aprobaciones Financieras Pendientes"
                            sx={{
                                textTransform: 'none',
                                minHeight: 48,
                                color: 'var(--text-secondary)',
                                '&.Mui-selected': {
                                    color: '#0071e3',
                                },
                            }} 
                        />
                        <Tab 
                            icon={<Scale size={16} />}
                            iconPosition="start"
                            label="Balance Legal"
                            sx={{
                                textTransform: 'none',
                                minHeight: 48,
                                color: 'var(--text-secondary)',
                                '&.Mui-selected': {
                                    color: '#0071e3',
                                },
                            }}
                        />
                        <Tab 
                            icon={<BarChart2 size={16} />}
                            iconPosition="start"
                            label="Avance de Planes"
                            sx={{
                                textTransform: 'none',
                                minHeight: 48,
                                color: 'var(--text-secondary)',
                                '&.Mui-selected': {
                                    color: '#0071e3',
                                },
                            }}
                        />
                        <Tab 
                            icon={<Wallet size={16} />}
                            iconPosition="start"
                            label="Estado de Cuentas"
                            sx={{
                                textTransform: 'none',
                                minHeight: 48,
                                color: 'var(--text-secondary)',
                                '&.Mui-selected': {
                                    color: '#0071e3',
                                },
                            }}
                        />
                    </Tabs>
                </Paper>

                <Paper 
                    sx={{
                        p: 3,
                        borderRadius: '12px',
                        backgroundColor: 'var(--surface-primary)',
                    }}
                    className="glass-effect"
                >
                    {currentTab === 0 && renderMoneyApprovals()}
                    {currentTab === 1 && renderLegalBalance()}
                    {currentTab === 2 && renderActionPlans()}
                    {currentTab === 3 && renderBalanceGeneral()}
                </Paper>

                <NewMoneyApprovalDialog
                    open={isNewApprovalOpen}
                    onClose={() => setIsNewApprovalOpen(false)}
                    onSubmit={handleNewApproval}
                />

                <NewLegalSectionDialog
                    open={isNewLegalSectionOpen}
                    onClose={() => setIsNewLegalSectionOpen(false)}
                    onSubmit={handleNewLegalSection}
                />

                <NewIndicatorDialog
                    open={isNewIndicatorOpen}
                    onClose={() => setIsNewIndicatorOpen(false)}
                    onSubmit={handleNewIndicator}
                />
                        
                <NewAccountDialog 
                    open={isNewAccountOpen}
                    onClose={() => setIsNewAccountOpen(false)}
                    onSubmit={handleNewAccount}
                />
            </Container>
        </Box>
    );
};