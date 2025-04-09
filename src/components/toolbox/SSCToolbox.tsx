import React, { useState } from 'react';
import { 
    Box, 
    Button, 
    Chip, 
    Container, 
    LinearProgress, 
    Paper, 
    Tab, 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow, 
    Tabs, 
    Typography,
    Grid,
    IconButton,
    Tooltip,
} from '@mui/material';
import { 
    BarChart2, 
    DollarSign, 
    Plus, 
    Scale, 
    Wallet,
    ArrowUpRight,
    ArrowDownRight,
    Clock,
    CheckCircle2,
    XCircle,
    Download,
} from 'lucide-react';
import { NewMoneyApprovalDialog } from './Forms/NewMoneyApprovalDialog';
import { NewLegalSectionDialog } from './Forms/NewLegalSectionDialog';
import { NewIndicatorDialog } from './Forms/NewIndicatorDialog';
import { NewAccountDialog } from './Forms/NewAccountDialog';

interface LegalCase {
  id: string;
  apartado: string;
  tema: string | null;
  proyecto: 'Listo' | 'En proceso' | 'Detenido';
  instancias: 'Listo' | 'En proceso' | 'Detenido';
  concluido: 'Listo' | 'En proceso' | 'Detenido';
}

interface ActionPlan {
  id: string;
  indicator: string;
  goal: number;
  achieved: number;
  progress: number;
}

interface FinancialMetric {
    category: string;
    current: number;
    previous: number;
    change: number;
}

interface MoneyApproval {
    id: string;
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
}

interface BalanceItem {
    id: string;
    item: string;
    montoBancarizado: number;
    montoDespacho: number;
    efectivo: number;
    credito: number;
    deuda: number;
    observaciones: string;
}

const mockBalanceItems: BalanceItem[] = [
    {
        id: '1',
        item: 'Tarjetas Espora',
        montoBancarizado: 0,
        montoDespacho: 0,
        efectivo: 0,
        credito: 0,
        deuda: 0,
        observaciones: 'Texto'
    },
    {
        id: '2',
        item: 'Demotáctica',
        montoBancarizado: 0,
        montoDespacho: 0,
        efectivo: 0,
        credito: 0,
        deuda: 0,
        observaciones: 'Texto'
    },
    {
        id: '3',
        item: 'Dotcom',
        montoBancarizado: 0,
        montoDespacho: 0,
        efectivo: 0,
        credito: 0,
        deuda: 0,
        observaciones: 'Texto'
    },
    {
        id: '4',
        item: 'Otras empresas, Datafi, Data...',
        montoBancarizado: 0,
        montoDespacho: 0,
        efectivo: 0,
        credito: 0,
        deuda: 0,
        observaciones: 'Texto'
    },
    {
        id: '5',
        item: 'Sub Total Grupo Espora',
        montoBancarizado: 0,
        montoDespacho: 0,
        efectivo: 0,
        credito: 0,
        deuda: 0,
        observaciones: 'Texto'
    },
    {
        id: '6',
        item: 'Grupo Mapa',
        montoBancarizado: 0,
        montoDespacho: 0,
        efectivo: 0,
        credito: 0,
        deuda: 0,
        observaciones: 'Texto'
    },
    {
        id: '7',
        item: 'Despachos',
        montoBancarizado: 0,
        montoDespacho: 0,
        efectivo: 0,
        credito: 0,
        deuda: 0,
        observaciones: 'Texto'
    },
    {
        id: '8',
        item: 'Cajas',
        montoBancarizado: 0,
        montoDespacho: 0,
        efectivo: 0,
        credito: 0,
        deuda: 0,
        observaciones: 'Texto'
    },
    {
        id: '9',
        item: 'Sub Total Disponible Espora',
        montoBancarizado: 0,
        montoDespacho: 0,
        efectivo: 0,
        credito: 0,
        deuda: 0,
        observaciones: 'Texto'
    },
    {
        id: '10',
        item: 'Segio José',
        montoBancarizado: 0,
        montoDespacho: 0,
        efectivo: 0,
        credito: 0,
        deuda: 0,
        observaciones: 'Texto'
    },
    {
        id: '11',
        item: 'Interlogis',
        montoBancarizado: 0,
        montoDespacho: 0,
        efectivo: 0,
        credito: 0,
        deuda: 0,
        observaciones: 'Texto'
    },
    {
        id: '12',
        item: 'Gran Total',
        montoBancarizado: 0,
        montoDespacho: 0,
        efectivo: 0,
        credito: 0,
        deuda: 0,
        observaciones: 'Texto'
    }
];

const mockMoneyApprovals: MoneyApproval[] = [
    {
        id: '1',
        urgent: true,
        paymentDate: '2024-02-25',
        category: 'Operaciones',
        subcategory: 'Equipamiento',
        concept: 'Compra de equipos de oficina',
        sscComments: 'Pendiente de revisión de inventario',
        amount: 25000,
        transferToEspora: 10000,
        toDispatchForTransfer: 4000,
        transferToInterlogis: 5000,
        transferToDemotactica: 5000,
        transferToDotcom: 5000
    },
    {
        id: '2',
        urgent: false,
        paymentDate: '2024-02-28',
        category: 'Recursos Humanos',
        subcategory: 'Capacitación',
        concept: 'Programa de desarrollo profesional',
        sscComments: 'Aprobado por dirección',
        amount: 15000,
        transferToEspora: 5000,
        toDispatchForTransfer: 4000,
        transferToInterlogis: 3000,
        transferToDemotactica: 4000,
        transferToDotcom: 3000
    }
];

const mockLegalCases: LegalCase[] = [
  {
    id: '1',
    apartado: 'Otros',
    tema: null,
    proyecto: 'Listo',
    instancias: 'Listo',
    concluido: 'Listo'
  },
  {
    id: '2',
    apartado: 'Otros',
    tema: 'Tema 14',
    proyecto: 'Listo',
    instancias: 'Listo',
    concluido: 'En proceso'
  },
  {
    id: '3',
    apartado: 'Gobierno Corporativo',
    tema: 'Tema 8',
    proyecto: 'En proceso',
    instancias: 'En proceso',
    concluido: 'En proceso'
  },
  {
    id: '4',
    apartado: 'Gobierno Corporativo',
    tema: null,
    proyecto: 'En proceso',
    instancias: 'En proceso',
    concluido: 'Listo'
  },
  {
    id: '5',
    apartado: 'Documentos propuestos',
    tema: 'Tema 7',
    proyecto: 'En proceso',
    instancias: 'Detenido',
    concluido: 'En proceso'
  },
  {
    id: '6',
    apartado: 'Documentos propuestos',
    tema: 'Tema 6',
    proyecto: 'En proceso',
    instancias: 'En proceso',
    concluido: 'Listo'
  },
  {
    id: '7',
    apartado: 'Contencioso Mercantil',
    tema: 'Tema 11',
    proyecto: 'Detenido',
    instancias: 'Listo',
    concluido: 'Listo'
  },
  {
    id: '8',
    apartado: 'Contencioso Mercantil',
    tema: 'Tema 10',
    proyecto: 'En proceso',
    instancias: 'En proceso',
    concluido: 'En proceso'
  },
  {
    id: '9',
    apartado: 'Contencioso Laboral',
    tema: 'Tema 5',
    proyecto: 'En proceso',
    instancias: 'Detenido',
    concluido: 'En proceso'
  },
  {
    id: '10',
    apartado: 'Contencioso Laboral',
    tema: 'Tema 4',
    proyecto: 'Detenido',
    instancias: 'En proceso',
    concluido: 'En proceso'
  }
];

const mockActionPlans: ActionPlan[] = [
  {
    id: '1',
    indicator: 'Análisis de arquitectura de la información',
    goal: 100,
    achieved: 100,
    progress: 100
  },
  {
    id: '2',
    indicator: 'Definición de objetivos y alcance del proyecto',
    goal: 100,
    achieved: 100,
    progress: 100
  },
  {
    id: '3',
    indicator: 'Análisis de competencia y BM',
    goal: 100,
    achieved: 100,
    progress: 100
  },
  {
    id: '4',
    indicator: 'Accesibilidad y Usabilidad',
    goal: 100,
    achieved: 100,
    progress: 100
  },
  {
    id: '5',
    indicator: 'Prototipado y Diseño de la interfaz',
    goal: 100,
    achieved: 90,
    progress: 90
  },
  {
    id: '6',
    indicator: 'Pruebas y análisis de interacción',
    goal: 100,
    achieved: 0,
    progress: 0
  },
  {
    id: '7',
    indicator: 'Investigación de Usuarios',
    goal: 100,
    achieved: 0,
    progress: 0
  },
  {
    id: '8',
    indicator: 'Análisis de impacto, interacción y mejora continua',
    goal: 100,
    achieved: 0,
    progress: 0
  },
  {
    id: '9',
    indicator: 'Optimización del SEO y rendimiento',
    goal: 100,
    achieved: 0,
    progress: 0
  },
  {
    id: '10',
    indicator: 'Lanzamiento y Monitoreo',
    goal: 100,
    achieved: 0,
    progress: 0
  }
];

const mockFinancialMetrics: FinancialMetric[] = [
    {
        category: 'Ingresos',
        current: 1500000,
        previous: 1200000,
        change: 25
    },
    {
        category: 'Gastos',
        current: 800000,
        previous: 700000,
        change: 14.3
    },
    {
        category: 'Beneficio',
        current: 700000,
        previous: 500000,
        change: 40
    },
    {
        category: 'ROI',
        current: 35,
        previous: 30,
        change: 16.7
    }
];

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
    const [actionPlans, setActionPlans] = useState(mockActionPlans);
    const [legalCases, setLegalCases] = useState<LegalCase[]>(mockLegalCases);
    const [balanceItems, setBalanceItems] = useState<BalanceItem[]>(mockBalanceItems);
    const [moneyApprovals, setMoneyApprovals] = useState<MoneyApproval[]>(mockMoneyApprovals);

    const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
        setCurrentTab(newValue);
    };

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
        const newApproval: MoneyApproval = {
            id: (moneyApprovals.length + 1).toString(),
            ...approval,
        };
        setMoneyApprovals([...moneyApprovals, newApproval]);
        setIsNewApprovalOpen(false);
    };

    const handleNewLegalSection = (section: {
        apartado: string;
        tema: string | null;
        proyecto: 'Listo' | 'En proceso' | 'Detenido';
        instancias: 'Listo' | 'En proceso' | 'Detenido';
        concluido: 'Listo' | 'En proceso' | 'Detenido';
    }) => {
        const newLegalCase: LegalCase = {
            id: (legalCases.length + 1).toString(),
            ...section,
        };
        setLegalCases([...legalCases, newLegalCase]);
        setIsNewLegalSectionOpen(false);
    };

    const handleNewIndicator = (indicator: {
        indicator: string;
        goal: number;
        achieved: number;
    }) => {
        const newIndicator = {
            id: (actionPlans.length + 1).toString(),
            indicator: indicator.indicator,
            goal: indicator.goal,
            achieved: indicator.achieved,
            progress: Math.round((indicator.achieved / indicator.goal) * 100),
        };
        setActionPlans([...actionPlans, newIndicator]);
        setIsNewIndicatorOpen(false);
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
        const newAccount: BalanceItem = {
            id: (balanceItems.length + 1).toString(),
            ...account,
        };
        setBalanceItems([...balanceItems, newAccount]);
        setIsNewAccountOpen(false);
    };

    const renderMoneyApprovals = () => (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ color: 'var(--text-primary)' }}>
                    Aprobaciones de Dinero
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
                    Agregar Cuenta
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
    {moneyApprovals.map((approval) => (
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
</TableBody>        
                </Table>
            </TableContainer>
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
    {legalCases.map((caso) => (
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
    {actionPlans.map((plan) => (
        <TableRow key={plan.id}>
            <TableCell>
                <Typography sx={{ color: 'var(--text-primary)' }}>
                    {plan.indicator}
                </Typography>
            </TableCell>
            <TableCell>
                <Typography sx={{ color: 'var(--text-primary)' }}>
                    {plan.goal}
                </Typography>
            </TableCell>
            <TableCell>
                <Typography sx={{ color: 'var(--text-primary)' }}>
                    {plan.achieved}
                </Typography>
            </TableCell>
            <TableCell>
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
    {balanceItems.map((account) => (
        <TableRow key={account.id}>
            <TableCell>
                <Typography sx={{ color: 'var(--text-primary)' }}>
                    {account.item}
                </Typography>
            </TableCell>
            <TableCell>
                <Typography sx={{ color: 'var(--text-primary)' }}>
                    ${account.montoBancarizado.toLocaleString()}
                </Typography>
            </TableCell>
            <TableCell>
                <Typography sx={{ color: 'var(--text-primary)' }}>
                    ${account.montoDespacho.toLocaleString()}
                </Typography>
            </TableCell>
            <TableCell>
                <Typography sx={{ color: 'var(--text-primary)' }}>
                    ${account.efectivo.toLocaleString()}
                </Typography>
            </TableCell>
            <TableCell>
                <Typography sx={{ color: 'var(--text-primary)' }}>
                    ${account.credito.toLocaleString()}
                </Typography>
            </TableCell>
            <TableCell>
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
                        mb: 10,
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
                            label="Aprobaciones de Dinero"
                            sx={{
                                textTransform: 'none',
                                minHeight: 48,
                                color: 'var(--text-secondary)',
                                '&.Mui-selected': {
                                    color: '#0071e3',
                                },
                            }} 
                        />
                        <Tab icon={<Scale size={16} />}
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