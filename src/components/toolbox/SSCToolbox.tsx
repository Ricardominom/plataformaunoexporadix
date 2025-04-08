import React, { useState } from 'react';
import {
    Box,
    Container,
    Paper,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    Tabs,
    Tab,
    Chip,
    LinearProgress,
    IconButton,
} from '@mui/material';
import {
    DollarSign,
    Scale,
    BarChart2,
    Plus,
    ChevronLeft,
    ChevronRight,
} from 'lucide-react';

// Types remain the same
interface MoneyApproval {
    project: string;
    date: string;
    category: string;
    subcategory: string;
    company: string;
    item: string;
    transferredAmount: number;
    pendingAmount: number;
    totalAmount: number;
    status: 'approved' | 'pending' | 'rejected';
}

interface LegalBalanceItem {
    section: string;
    topic: string | null;
    project: 'Listo' | 'En proceso' | 'Detenido';
    instances: 'Listo' | 'En proceso' | 'Detenido';
    content: 'Listo' | 'En proceso' | 'Detenido';
    color: string;
}

interface ActionPlanIndicator {
    name: string;
    goal: number;
    achieved: number;
    progress: number;
}

// Mock data
const mockMoneyApprovals: MoneyApproval[] = [
    {
        project: 'Alpha',
        date: '2024-02-15',
        category: 'Legal Empresa',
        subcategory: 'Registro empresa',
        company: 'Interlogis',
        item: '1',
        transferredAmount: 1000,
        pendingAmount: 500,
        totalAmount: 1500,
        status: 'approved',
    },
    {
        project: 'Demotáctica',
        date: '2024-02-16',
        category: 'Legal Empresa',
        subcategory: 'Registro empresa',
        company: 'Interlogis',
        item: '2',
        transferredAmount: 800,
        pendingAmount: 700,
        totalAmount: 1500,
        status: 'pending',
    },
];

const mockLegalBalance: LegalBalanceItem[] = [
    {
        section: 'Otros',
        topic: null,
        project: 'Listo',
        instances: 'Listo',
        content: 'Listo',
        color: '#e91e63',
    },
    {
        section: 'Otros',
        topic: 'Tema 14',
        project: 'Listo',
        instances: 'Listo',
        content: 'En proceso',
        color: '#e91e63',
    },
    {
        section: 'Gobierno Corporativo',
        topic: 'Tema 8',
        project: 'En proceso',
        instances: 'En proceso',
        content: 'En proceso',
        color: '#2196f3',
    },
    {
        section: 'Gobierno Corporativo',
        topic: null,
        project: 'En proceso',
        instances: 'En proceso',
        content: 'Listo',
        color: '#2196f3',
    },
    {
        section: 'Documentos propuestos',
        topic: 'Tema 7',
        project: 'En proceso',
        instances: 'Detenido',
        content: 'En proceso',
        color: '#ffc107',
    },
    {
        section: 'Documentos propuestos',
        topic: 'Tema 6',
        project: 'En proceso',
        instances: 'En proceso',
        content: 'Listo',
        color: '#ffc107',
    },
    {
        section: 'Contencioso Mercantil',
        topic: 'Tema 11',
        project: 'Detenido',
        instances: 'Listo',
        content: 'Listo',
        color: '#4caf50',
    },
    {
        section: 'Contencioso Mercantil',
        topic: 'Tema 10',
        project: 'En proceso',
        instances: 'En proceso',
        content: 'En proceso',
        color: '#4caf50',
    },
    {
        section: 'Contencioso Laboral',
        topic: 'Tema 5',
        project: 'En proceso',
        instances: 'Detenido',
        content: 'En proceso',
        color: '#9c27b0',
    },
    {
        section: 'Contencioso Laboral',
        topic: 'Tema 4',
        project: 'Detenido',
        instances: 'En proceso',
        content: 'En proceso',
        color: '#9c27b0',
    },
];

const mockActionPlans: ActionPlanIndicator[] = [
    {
        name: 'Análisis de madurez de la información',
        goal: 100,
        achieved: 100,
        progress: 100,
    },
    {
        name: 'Definición de objetivos y alcance del proyecto',
        goal: 100,
        achieved: 100,
        progress: 100,
    },
    {
        name: 'Análisis de competencia y RM',
        goal: 100,
        achieved: 100,
        progress: 100,
    },
    {
        name: 'Accesibilidad y Usabilidad',
        goal: 100,
        achieved: 90,
        progress: 90,
    },
    {
        name: 'Prototipado y Diseño de la interfaz',
        goal: 100,
        achieved: 0,
        progress: 0,
    },
    {
        name: 'Pruebas y análisis de interacción',
        goal: 100,
        achieved: 0,
        progress: 0,
    },
    {
        name: 'Investigación de usuarios',
        goal: 100,
        achieved: 0,
        progress: 0,
    },
    {
        name: 'Análisis de impacto, interacción y mejora continua',
        goal: 100,
        achieved: 0,
        progress: 0,
    },
    {
        name: 'Optimización del SEO y rendimiento',
        goal: 100,
        achieved: 0,
        progress: 0,
    },
    {
        name: 'Lanzamiento y Monitoreo',
        goal: 100,
        achieved: 0,
        progress: 0,
    },
];

const getStatusColor = (status: string) => {
    const colors = {
        approved: { bg: 'var(--status-success-bg)', text: 'var(--status-success-text)' },
        pending: { bg: 'var(--status-warning-bg)', text: 'var(--status-warning-text)' },
        rejected: { bg: 'var(--status-error-bg)', text: 'var(--status-error-text)' },
        'En proceso': { bg: 'var(--status-info-bg)', text: 'var(--status-info-text)' },
        Detenido: { bg: 'var(--status-error-bg)', text: 'var(--status-error-text)' },
        Listo: { bg: 'var(--status-success-bg)', text: 'var(--status-success-text)' },
    };
    return colors[status] || { bg: 'var(--surface-secondary)', text: 'var(--text-secondary)' };
};

export const SSCToolbox: React.FC = () => {
    const [currentTab, setCurrentTab] = useState(0);

    const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
        setCurrentTab(newValue);
    };

    const renderMoneyApprovals = () => (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ color: 'var(--text-primary)' }}>
                    Aprobaciones de Dinero
                </Typography>
                <Button
                    startIcon={<Plus size={16} />}
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
                    Agregar cuenta
                </Button>
            </Box>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Proyecto</TableCell>
                            <TableCell>Fecha</TableCell>
                            <TableCell>Categoría</TableCell>
                            <TableCell>Subcategoría</TableCell>
                            <TableCell>Empresa</TableCell>
                            <TableCell>Item</TableCell>
                            <TableCell>Monto Transferido</TableCell>
                            <TableCell>Monto Pendiente</TableCell>
                            <TableCell>Monto Total</TableCell>
                            <TableCell>Estado</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {mockMoneyApprovals.map((approval, index) => (
                            <TableRow key={index}>
                                <TableCell>{approval.project}</TableCell>
                                <TableCell>{new Date(approval.date).toLocaleDateString()}</TableCell>
                                <TableCell>{approval.category}</TableCell>
                                <TableCell>{approval.subcategory}</TableCell>
                                <TableCell>{approval.company}</TableCell>
                                <TableCell>{approval.item}</TableCell>
                                <TableCell>${approval.transferredAmount.toLocaleString()}</TableCell>
                                <TableCell>${approval.pendingAmount.toLocaleString()}</TableCell>
                                <TableCell>${approval.totalAmount.toLocaleString()}</TableCell>
                                <TableCell>
                                    <Chip
                                        label={approval.status.charAt(0).toUpperCase() + approval.status.slice(1)}
                                        sx={{
                                            backgroundColor: getStatusColor(approval.status).bg,
                                            color: getStatusColor(approval.status).text,
                                            fontSize: '0.75rem',
                                            height: '24px',
                                            borderRadius: '12px',
                                            fontWeight: 400,
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

    const renderLegalBalance = () => (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ color: 'var(--text-primary)' }}>
                    Balance Legal
                </Typography>
                <Button
                    startIcon={<Plus size={16} />}
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
                    Agregar apartado
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
                            <TableCell>Contenido</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {mockLegalBalance.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Box
                                            sx={{
                                                width: 4,
                                                height: 24,
                                                backgroundColor: item.color,
                                                marginRight: 1,
                                            }}
                                        />
                                        {item.section}
                                    </Box>
                                </TableCell>
                                <TableCell>{item.topic || 'null'}</TableCell>
                                <TableCell>
                                    <Chip
                                        label={item.project}
                                        sx={{
                                            backgroundColor: getStatusColor(item.project).bg,
                                            color: getStatusColor(item.project).text,
                                            fontSize: '0.75rem',
                                            height: '24px',
                                            borderRadius: '12px',
                                            fontWeight: 400,
                                        }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={item.instances}
                                        sx={{
                                            backgroundColor: getStatusColor(item.instances).bg,
                                            color: getStatusColor(item.instances).text,
                                            fontSize: '0.75rem',
                                            height: '24px',
                                            borderRadius: '12px',
                                            fontWeight: 400,
                                        }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={item.content}
                                        sx={{
                                            backgroundColor: getStatusColor(item.content).bg,
                                            color: getStatusColor(item.content).text,
                                            fontSize: '0.75rem',
                                            height: '24px',
                                            borderRadius: '12px',
                                            fontWeight: 400,
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
                    Avance de Planes de Acción
                </Typography>
                <Button
                    startIcon={<Plus size={16} />}
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
                    Agregar indicador
                </Button>
            </Box>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Indicador</TableCell>
                            <TableCell align="center">Meta</TableCell>
                            <TableCell align="center">Realizado</TableCell>
                            <TableCell>% de avance</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {mockActionPlans.map((indicator, index) => (
                            <TableRow key={index}>
                                <TableCell>{indicator.name}</TableCell>
                                <TableCell align="center">{indicator.goal}</TableCell>
                                <TableCell align="center">{indicator.achieved}</TableCell>
                                <TableCell>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <LinearProgress
                                            variant="determinate"
                                            value={indicator.progress}
                                            sx={{
                                                width: '100%',
                                                height: 6,
                                                borderRadius: 3,
                                                backgroundColor: 'var(--surface-secondary)',
                                                '& .MuiLinearProgress-bar': {
                                                    backgroundColor: indicator.progress < 30 ? '#ff3b30' :
                                                        indicator.progress < 70 ? '#ff9500' : '#30d158',
                                                    borderRadius: 3,
                                                },
                                            }}
                                        />
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                minWidth: 40,
                                                color: 'var(--text-primary)',
                                                fontWeight: 500,
                                            }}
                                        >
                                            {indicator.progress}%
                                        </Typography>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2, gap: 1 }}>
                <Typography sx={{ color: 'var(--text-secondary)' }}>
                    1-10 / 10
                </Typography>
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
                    <ChevronLeft size={16} />
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
                    <ChevronRight size={16} />
                </IconButton>
            </Box>
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
                </Paper>
            </Container>
        </Box>
    );
};
