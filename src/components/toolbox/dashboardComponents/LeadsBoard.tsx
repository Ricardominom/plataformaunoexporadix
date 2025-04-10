import React from 'react';
import { Paper, Typography, Box, Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Circle, BarChart2 } from 'lucide-react';

interface Lead {
    cuenta: string;
    estatus: 'Activo' | 'En pausa' | 'Cerrado' | 'Perdido';
    monto: number;
    propuesta: 'Realizada' | 'En revisión' | 'Aceptada' | 'Pendiente';
    enlace: string;
}

const mockLeads: Lead[] = [
    {
        cuenta: 'Empresa A',
        estatus: 'Activo',
        monto: 50000,
        propuesta: 'En revisión',
        enlace: 'Juan Pérez',
    },
    {
        cuenta: 'Empresa B',
        estatus: 'En pausa',
        monto: 75000,
        propuesta: 'Realizada',
        enlace: 'María González',
    },
    {
        cuenta: 'Empresa C',
        estatus: 'Activo',
        monto: 120000,
        propuesta: 'Aceptada',
        enlace: 'Roberto Sánchez',
    },
    {
        cuenta: 'Empresa D',
        estatus: 'Cerrado',
        monto: 85000,
        propuesta: 'Aceptada',
        enlace: 'Ana Martínez',
    },
    {
        cuenta: 'Empresa E',
        estatus: 'Activo',
        monto: 95000,
        propuesta: 'En revisión',
        enlace: 'Carlos Rodríguez',
    }
];

const getStatusColor = (status: Lead['estatus']) => {
    const colors = {
        'Activo': { bg: 'rgba(0, 204, 136, 0.2)', text: '#00CC88' },
        'En pausa': { bg: 'rgba(0, 204, 136, 0.2)', text: '#00CC88' },
        'Cerrado': { bg: 'rgba(0, 204, 136, 0.2)', text: '#00CC88' },
        'Perdido': { bg: 'rgba(0, 204, 136, 0.2)', text: '#00CC88' }
    };
    return colors[status];
};

const getPropuestaColor = (propuesta: Lead['propuesta']) => {
    const colors = {
        'Realizada': { bg: 'rgba(0, 204, 136, 0.2)', text: '#00CC88' },
        'En revisión': { bg: 'rgba(0, 204, 136, 0.2)', text: '#00CC88' },
        'Aceptada': { bg: 'rgba(0, 204, 136, 0.2)', text: '#00CC88' },
        'Pendiente': { bg: 'rgba(0, 204, 136, 0.2)', text: '#00CC88' }
    };
    return colors[propuesta];
};

export const LeadsBoard: React.FC = () => {
    // Calculate total value of leads
    const totalValue = mockLeads.reduce((sum, lead) => sum + lead.monto, 0);
    
    return (
        <Paper
            sx={{
                borderRadius: '12px',
                backgroundColor: '#1E1E1E',
                border: '1px solid #333333',
                overflow: 'hidden',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <Box sx={{ p: 2, borderBottom: '1px solid #333333', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography
                    variant="h6"
                    sx={{
                        fontSize: '1.125rem',
                        fontWeight: 600,
                        color: '#00CC88',
                    }}
                >
                    TABLERO DE LEADS
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <BarChart2 size={16} color="#00CC88" />
                    <Typography sx={{ color: '#00CC88', fontWeight: 500, fontSize: '0.875rem' }}>
                        ${totalValue.toLocaleString()} en pipeline
                    </Typography>
                </Box>
            </Box>
            <TableContainer sx={{ flex: 1, overflowY: 'auto' }}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <Typography sx={{ color: '#BBBBBB', fontSize: '0.8rem' }}>
                                    Cuenta
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography sx={{ color: '#BBBBBB', fontSize: '0.8rem' }}>
                                    Estatus
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography sx={{ color: '#BBBBBB', fontSize: '0.8rem' }}>
                                    Propuesta
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography sx={{ color: '#BBBBBB', fontSize: '0.8rem' }}>
                                    Enlace
                                </Typography>
                            </TableCell>
                            <TableCell align="right">
                                <Typography sx={{ color: '#BBBBBB', fontSize: '0.8rem' }}>
                                    Monto
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {mockLeads.map((lead, index) => (
                            <TableRow
                                key={index}
                                sx={{
                                    '&:hover': {
                                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                    },
                                    height: '40px',
                                }}
                            >
                                <TableCell>
                                    <Typography
                                        sx={{
                                            color: '#FFFFFF',
                                            fontWeight: 500,
                                            fontSize: '0.8rem',
                                        }}
                                    >
                                        {lead.cuenta}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    {/* Smaller icon */}
                                    <Chip
                                        icon={<Circle size={10} />}
                                        label={lead.estatus}
                                        size="small"
                                        sx={{
                                            backgroundColor: getStatusColor(lead.estatus).bg,
                                            color: getStatusColor(lead.estatus).text,
                                            '& .MuiChip-icon': {
                                                color: 'inherit',
                                            },
                                            '& .MuiChip-label': {
                                                fontSize: '0.7rem',
                                                padding: '0 6px',
                                            },
                                            height: '20px',
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
                                            '& .MuiChip-label': {
                                                fontSize: '0.7rem',
                                                padding: '0 6px',
                                            },
                                            height: '20px',
                                        }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Typography
                                        sx={{
                                            color: '#BBBBBB',
                                            fontSize: '0.8rem',
                                        }}
                                    >
                                        {lead.enlace}
                                    </Typography>
                                </TableCell>
                                <TableCell align="right">
                                    <Typography
                                        sx={{
                                            color: '#00CC88',
                                            fontWeight: 500,
                                            fontSize: '0.8rem',
                                        }}
                                    >
                                        ${lead.monto.toLocaleString()}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Box sx={{ p: 2, borderTop: '1px solid #333333' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box>
                        <Typography sx={{ fontSize: '0.7rem', color: '#BBBBBB', mb: 0.5 }}>
                            Total leads
                        </Typography>
                        <Typography sx={{ fontSize: '1rem', fontWeight: 600, color: '#FFFFFF' }}>
                            {mockLeads.length}
                        </Typography>
                    </Box>
                    <Box>
                        <Typography sx={{ fontSize: '0.7rem', color: '#BBBBBB', mb: 0.5 }}>
                            Activos
                        </Typography>
                        <Typography sx={{ fontSize: '1rem', fontWeight: 600, color: '#00CC88' }}>
                            {mockLeads.filter(l => l.estatus === 'Activo').length}
                        </Typography>
                    </Box>
                    <Box>
                        <Typography sx={{ fontSize: '0.7rem', color: '#BBBBBB', mb: 0.5 }}>
                            Conversión
                        </Typography>
                        <Typography sx={{ fontSize: '1rem', fontWeight: 600, color: '#00CC88' }}>
                            {Math.round((mockLeads.filter(l => l.propuesta === 'Aceptada').length / mockLeads.length) * 100)}%
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Paper>
    );
};