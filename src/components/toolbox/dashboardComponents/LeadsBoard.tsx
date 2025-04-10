import React from 'react';
import { Grid, Paper, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip } from '@mui/material';
import { Circle } from 'lucide-react';

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

export const LeadsBoard: React.FC = () => {
    return (
        <Grid item xs={12}>
            <Paper
                sx={{
                    borderRadius: '12px',
                    backgroundColor: 'var(--surface-primary)',
                    overflow: 'hidden',
                    height: '100%',
                    maxHeight: '400px',
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
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                        }}
                    >
                        TABLERO DE LEADS
                    </Typography>
                </Box>

                <TableContainer sx={{ maxHeight: 'calc(400px - 60px)', overflowY: 'auto' }}>
                    <Table sx={{
                        '& .MuiTableCell-root': {
                            py: 1.5,
                            px: 2,
                            '&:last-child': {
                                pr: 2,
                            },
                        },
                    }}>
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
                                <TableCell>Escenario</TableCell>
                                <TableCell>Monto</TableCell>
                                <TableCell>Pagos</TableCell>
                                <TableCell>Contrato</TableCell>
                                <TableCell>Arranque</TableCell>
                                <TableCell>Comentarios</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {mockLeads.map((lead, index) => (
                                <TableRow
                                    key={index}
                                    sx={{
                                        '&:hover': {
                                            backgroundColor: 'var(--hover-bg)',
                                        },
                                    }}
                                >
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
                                            icon={<Circle size={12} />}
                                            label={lead.estatus}
                                            size="small"
                                            sx={{
                                                backgroundColor: getStatusColor(lead.estatus).bg,
                                                color: getStatusColor(lead.estatus).text,
                                                '& .MuiChip-icon': {
                                                    color: 'inherit',
                                                },
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
                                        <Chip
                                            label={lead.escenarioAprobado ? 'Aprobado' : 'Pendiente'}
                                            size="small"
                                            sx={{
                                                backgroundColor: lead.escenarioAprobado ? 'rgba(48, 209, 88, 0.1)' : 'rgba(255, 149, 0, 0.1)',
                                                color: lead.escenarioAprobado ? '#30d158' : '#ff9500',
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
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Grid>
    );
};