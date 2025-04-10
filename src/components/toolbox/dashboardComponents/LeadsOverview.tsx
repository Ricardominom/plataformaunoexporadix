import React from 'react';
import { Grid, Paper, Typography, Box, Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Tooltip } from '@mui/material';
import { Download, TrendingUp, TrendingDown, Circle, Clock, CheckCircle2, XCircle } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip as ChartTooltip,
    Legend,
    Filler
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    ChartTooltip,
    Legend,
    Filler
);

interface Lead {
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

const mockLeads: Lead[] = [
    {
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

const getStatusColor = (status: Lead['estatus']) => {
    const colors = {
        'Activo': { bg: 'rgba(48, 209, 88, 0.1)', text: '#30d158' },
        'En pausa': { bg: 'rgba(255, 149, 0, 0.1)', text: '#ff9500' },
        'Cerrado': { bg: 'rgba(0, 113, 227, 0.1)', text: '#0071e3' },
        'Perdido': { bg: 'rgba(255, 45, 85, 0.1)', text: '#ff2d55' }
    };
    return colors[status];
};

const getPropuestaColor = (propuesta: Lead['propuesta']) => {
    const colors = {
        'Realizada': { bg: 'rgba(255, 149, 0, 0.1)', text: '#ff9500' },
        'En revisión': { bg: 'rgba(0, 113, 227, 0.1)', text: '#0071e3' },
        'Aceptada': { bg: 'rgba(48, 209, 88, 0.1)', text: '#30d158' },
        'Pendiente': { bg: 'rgba(255, 45, 85, 0.1)', text: '#ff2d55' }
    };
    return colors[propuesta];
};

const chartData = {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
    datasets: [
        {
            label: 'Monto Total',
            data: [50000, 75000, 120000, 90000, 150000, 180000],
            borderColor: '#0071e3',
            backgroundColor: 'rgba(0, 113, 227, 0.1)',
            fill: true,
            tension: 0.4,
        },
    ],
};

const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: false,
        },
        tooltip: {
            backgroundColor: 'var(--surface-primary)',
            titleColor: 'var(--text-primary)',
            bodyColor: 'var(--text-primary)',
            borderColor: 'var(--border-color)',
            borderWidth: 1,
            padding: 12,
            displayColors: false,
            callbacks: {
                label: function (context: any) {
                    return `$${context.raw.toLocaleString()}`;
                }
            }
        }
    },
    scales: {
        y: {
            beginAtZero: true,
            grid: {
                color: 'var(--border-color)',
                drawBorder: false,
            },
            ticks: {
                color: 'var(--text-secondary)',
                callback: function (value: any) {
                    return `$${value.toLocaleString()}`;
                }
            }
        },
        x: {
            grid: {
                display: false,
            },
            ticks: {
                color: 'var(--text-secondary)',
            }
        }
    }
};

export const LeadsOverview: React.FC = () => {
    const totalMonto = mockLeads.reduce((sum, lead) => sum + lead.monto, 0);
    const promedioMonto = totalMonto / mockLeads.length;
    const leadsActivos = mockLeads.filter(lead => lead.estatus === 'Activo').length;
    const conversionRate = (mockLeads.filter(lead => lead.propuesta === 'Aceptada').length / mockLeads.length) * 100;

    return (
        <Grid container spacing={3}>
            {/* KPI Cards */}
            <Grid item xs={12}>
                <Grid container spacing={3}>
                    {[
                        {
                            title: 'Monto Total',
                            value: `$${totalMonto.toLocaleString()}`,
                            change: 25,
                            color: '#0071e3'
                        },
                        {
                            title: 'Promedio por Lead',
                            value: `$${promedioMonto.toLocaleString()}`,
                            change: 15,
                            color: '#30d158'
                        },
                        {
                            title: 'Leads Activos',
                            value: leadsActivos,
                            change: 10,
                            color: '#ff9500'
                        },
                        {
                            title: 'Tasa de Conversión',
                            value: `${Math.round(conversionRate)}%`,
                            change: 5,
                            color: '#5856d6'
                        },
                    ].map((metric, index) => (
                        <Grid item xs={12} sm={6} md={3} key={index}>
                            <Paper
                                sx={{
                                    p: 3,
                                    borderRadius: '12px',
                                    backgroundColor: 'var(--surface-primary)',
                                    transition: 'transform 0.2s ease-in-out',
                                    '&:hover': {
                                        transform: 'translateY(-4px)',
                                    },
                                }}
                                className="glass-effect"
                            >
                                <Typography
                                    sx={{
                                        fontSize: '0.875rem',
                                        color: 'var(--text-secondary)',
                                        mb: 1,
                                    }}
                                >
                                    {metric.title}
                                </Typography>
                                <Typography
                                    variant="h4"
                                    sx={{
                                        fontSize: '1.5rem',
                                        fontWeight: 600,
                                        color: metric.color,
                                        mb: 1,
                                    }}
                                >
                                    {metric.value}
                                </Typography>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 0.5,
                                        color: metric.change >= 0 ? '#30d158' : '#ff2d55',
                                    }}
                                >
                                    {metric.change >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                                    <Typography
                                        sx={{
                                            fontSize: '0.875rem',
                                            fontWeight: 500,
                                        }}
                                    >
                                        {Math.abs(metric.change)}% vs mes anterior
                                    </Typography>
                                </Box>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Grid>

            {/* Chart */}
            <Grid item xs={12} lg={4}>
                <Paper
                    sx={{
                        p: 3,
                        borderRadius: '12px',
                        backgroundColor: 'var(--surface-primary)',
                        height: '100%',
                        minHeight: 400,
                    }}
                    className="glass-effect"
                >
                    <Typography
                        variant="h6"
                        sx={{
                            fontSize: '1rem',
                            fontWeight: 600,
                            color: 'var(--text-primary)',
                            mb: 3,
                        }}
                    >
                        TENDENCIA DE VENTAS
                    </Typography>
                    <Box sx={{ height: 300 }}>
                        <Line data={chartData} options={chartOptions} />
                    </Box>
                </Paper>
            </Grid>

            {/* Leads Table */}
            <Grid item xs={12} lg={8}>
                <Paper
                    sx={{
                        borderRadius: '12px',
                        backgroundColor: 'var(--surface-primary)',
                        overflow: 'hidden',
                    }}
                    className="glass-effect"
                >
                    <Box sx={{ p: 2, borderBottom: '1px solid var(--border-color)' }}>
                        <Typography
                            variant="h6"
                            sx={{
                                fontSize: '1rem',
                                fontWeight: 600,
                                color: 'var(--text-primary)',
                            }}
                        >
                            Tablero De Leads
                        </Typography>
                    </Box>
                    <TableContainer sx={{ maxHeight: 400 }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Cuenta</TableCell>
                                    <TableCell>Estado</TableCell>
                                    <TableCell>Propuesta</TableCell>
                                    <TableCell>Monto</TableCell>
                                    <TableCell>Pagos</TableCell>
                                    <TableCell>Arranque</TableCell>
                                    <TableCell>Acciones</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {mockLeads.map((lead, index) => (
                                    <TableRow key={index}>
                                        <TableCell>
                                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                                                <Typography sx={{ color: 'var(--text-primary)', fontWeight: 500 }}>
                                                    {lead.cuenta}
                                                </Typography>
                                                <Typography sx={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>
                                                    {lead.enlace}
                                                </Typography>
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            <Chip
                                                label={lead.estatus}
                                                size="small"
                                                sx={{
                                                    backgroundColor: getStatusColor(lead.estatus).bg,
                                                    color: getStatusColor(lead.estatus).text,
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
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Typography sx={{ color: 'var(--text-primary)', fontWeight: 500 }}>
                                                ${lead.monto.toLocaleString()}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>{lead.pagos}</TableCell>
                                        <TableCell>
                                            {new Date(lead.arranque).toLocaleDateString()}
                                        </TableCell>
                                        <TableCell>
                                            <Tooltip title="Descargar detalles">
                                                <IconButton size="small">
                                                    <Download size={16} />
                                                </IconButton>
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Grid>
        </Grid>
    );
};