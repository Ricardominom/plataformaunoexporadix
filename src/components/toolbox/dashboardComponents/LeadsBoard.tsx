import React from 'react';
import { Paper, Typography, Box, Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Circle, BarChart2, TrendingUp, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';

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
            component={motion.div}
            whileHover={{ 
                boxShadow: '0 15px 35px rgba(0, 204, 136, 0.25)'
            }}
            sx={{
                borderRadius: '12px',
                overflow: 'hidden',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                background: 'linear-gradient(135deg, #1E1E1E 0%, #252525 100%)',
                position: 'relative',
                border: '1px solid #00CC88',
                boxShadow: '0 8px 24px rgba(0, 204, 136, 0.15)',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '6px',
                    background: 'linear-gradient(90deg, #00CC88 0%, #00FFAA 100%)',
                    boxShadow: '0 0 20px rgba(0, 204, 136, 0.5)',
                },
                '&::after': {
                    content: '""',
                    position: 'absolute',
                    top: 6,
                    left: 0,
                    right: 0,
                    height: '1px',
                    background: 'linear-gradient(90deg, rgba(0, 255, 170, 0.5) 0%, rgba(0, 204, 136, 0.5) 50%, rgba(0, 255, 170, 0.5) 100%)',
                }
            }}
        >
            <Box sx={{ 
                p: 2, 
                borderBottom: '1px solid rgba(0, 204, 136, 0.3)', 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                background: 'linear-gradient(180deg, rgba(0, 204, 136, 0.15) 0%, rgba(0, 0, 0, 0) 100%)',
            }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box
                        sx={{
                            width: 40,
                            height: 40,
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, #00CC88 0%, #00FFAA 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 0 15px rgba(0, 204, 136, 0.5)',
                        }}
                    >
                        <BarChart2 size={20} color="#FFFFFF" />
                    </Box>
                    <Typography
                        variant="h6"
                        sx={{
                            fontSize: '1.25rem',
                            fontWeight: 700,
                            background: 'linear-gradient(135deg, #00FFAA 0%, #00CC88 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                        }}
                    >
                        TABLERO DE LEADS
                    </Typography>
                </Box>
                <Box 
                    component={motion.div}
                    whileHover={{ scale: 1.05 }}
                    sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: 1,
                        background: 'linear-gradient(90deg, rgba(0, 204, 136, 0.2) 0%, rgba(0, 255, 170, 0.2) 100%)',
                        px: 2,
                        py: 1,
                        borderRadius: '20px',
                        boxShadow: '0 4px 12px rgba(0, 204, 136, 0.2)',
                        border: '1px solid rgba(0, 204, 136, 0.3)',
                    }}
                >
                    <DollarSign size={18} color="#00FFAA" />
                    <Typography sx={{ 
                        fontWeight: 700, 
                        fontSize: '1rem',
                        background: 'linear-gradient(135deg, #00FFAA 0%, #00CC88 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
                    }}>
                        ${totalValue.toLocaleString()} en pipeline
                    </Typography>
                </Box>
            </Box>
            <TableContainer sx={{ flex: 1, overflowY: 'auto' }}>
                <Table size="small">
                    <TableHead>
                        <TableRow sx={{ 
                            background: 'linear-gradient(180deg, rgba(0, 204, 136, 0.1) 0%, rgba(0, 0, 0, 0) 100%)',
                        }}>
                            <TableCell>
                                <Typography sx={{ color: '#BBBBBB', fontSize: '0.8rem', fontWeight: 600 }}>
                                    Cuenta
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography sx={{ color: '#BBBBBB', fontSize: '0.8rem', fontWeight: 600 }}>
                                    Estatus
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography sx={{ color: '#BBBBBB', fontSize: '0.8rem', fontWeight: 600 }}>
                                    Propuesta
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography sx={{ color: '#BBBBBB', fontSize: '0.8rem', fontWeight: 600 }}>
                                    Enlace
                                </Typography>
                            </TableCell>
                            <TableCell align="right">
                                <Typography sx={{ color: '#BBBBBB', fontSize: '0.8rem', fontWeight: 600 }}>
                                    Monto
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {mockLeads.map((lead, index) => (
                            <TableRow
                                key={index}
                                component={motion.tr}
                                whileHover={{ 
                                    backgroundColor: 'rgba(0, 204, 136, 0.1)',
                                    transition: { duration: 0.2 }
                                }}
                                sx={{
                                    height: '40px',
                                    transition: 'background-color 0.2s ease',
                                    '&:nth-of-type(odd)': {
                                        backgroundColor: 'rgba(0, 204, 136, 0.05)',
                                    }
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
                                    <Chip
                                        icon={<Circle size={10} />}
                                        label={lead.estatus}
                                        size="small"
                                        sx={{
                                            backgroundColor: 'rgba(0, 204, 136, 0.2)',
                                            color: '#00FFAA',
                                            '& .MuiChip-icon': {
                                                color: 'inherit',
                                            },
                                            '& .MuiChip-label': {
                                                fontSize: '0.7rem',
                                                padding: '0 6px',
                                                fontWeight: 600,
                                            },
                                            height: '20px',
                                            background: 'linear-gradient(90deg, rgba(0, 204, 136, 0.3) 0%, rgba(0, 255, 170, 0.3) 100%)',
                                            boxShadow: '0 2px 6px rgba(0, 204, 136, 0.2)',
                                            border: '1px solid rgba(0, 204, 136, 0.3)',
                                        }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={lead.propuesta}
                                        size="small"
                                        sx={{
                                            backgroundColor: 'rgba(0, 204, 136, 0.2)',
                                            color: '#00FFAA',
                                            '& .MuiChip-label': {
                                                fontSize: '0.7rem',
                                                padding: '0 6px',
                                                fontWeight: 600,
                                            },
                                            height: '20px',
                                            background: 'linear-gradient(90deg, rgba(0, 255, 170, 0.3) 0%, rgba(0, 204, 136, 0.3) 100%)',
                                            boxShadow: '0 2px 6px rgba(0, 204, 136, 0.2)',
                                            border: '1px solid rgba(0, 204, 136, 0.3)',
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
                                            fontWeight: 700,
                                            fontSize: '0.9rem',
                                            background: 'linear-gradient(135deg, #00FFAA 0%, #00CC88 100%)',
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                            textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
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

            <Box sx={{ 
                p: 2, 
                borderTop: '1px solid rgba(0, 204, 136, 0.3)',
                background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 204, 136, 0.15) 100%)',
            }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box 
                        component={motion.div}
                        whileHover={{ scale: 1.05 }}
                        sx={{ 
                            p: 1.5, 
                            borderRadius: '8px', 
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid rgba(0, 204, 136, 0.2)',
                            transition: 'all 0.2s ease',
                        }}
                    >
                        <Typography sx={{ fontSize: '0.7rem', color: '#BBBBBB', mb: 0.5 }}>
                            Total leads
                        </Typography>
                        <Typography sx={{ fontSize: '1.2rem', fontWeight: 700, color: '#FFFFFF' }}>
                            {mockLeads.length}
                        </Typography>
                    </Box>
                    <Box 
                        component={motion.div}
                        whileHover={{ scale: 1.05 }}
                        sx={{ 
                            p: 1.5, 
                            borderRadius: '8px', 
                            background: 'linear-gradient(135deg, rgba(0, 204, 136, 0.1) 0%, rgba(0, 255, 170, 0.1) 100%)',
                            border: '1px solid rgba(0, 204, 136, 0.2)',
                            transition: 'all 0.2s ease',
                        }}
                    >
                        <Typography sx={{ fontSize: '0.7rem', color: '#BBBBBB', mb: 0.5 }}>
                            Activos
                        </Typography>
                        <Typography sx={{ 
                            fontSize: '1.2rem', 
                            fontWeight: 700,
                            background: 'linear-gradient(135deg, #00FFAA 0%, #00CC88 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
                        }}>
                            {mockLeads.filter(l => l.estatus === 'Activo').length}
                        </Typography>
                    </Box>
                    <Box 
                        component={motion.div}
                        whileHover={{ scale: 1.05 }}
                        sx={{ 
                            p: 1.5, 
                            borderRadius: '8px', 
                            background: 'linear-gradient(135deg, rgba(0, 255, 170, 0.1) 0%, rgba(0, 204, 136, 0.1) 100%)',
                            border: '1px solid rgba(0, 204, 136, 0.2)',
                            transition: 'all 0.2s ease',
                            boxShadow: '0 4px 12px rgba(0, 204, 136, 0.1)',
                        }}
                    >
                        <Typography sx={{ fontSize: '0.7rem', color: '#BBBBBB', mb: 0.5 }}>
                            Conversión
                        </Typography>
                        <Typography sx={{ 
                            fontSize: '1.2rem', 
                            fontWeight: 700,
                            background: 'linear-gradient(135deg, #00FFAA 0%, #00CC88 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
                        }}>
                            {Math.round((mockLeads.filter(l => l.propuesta === 'Aceptada').length / mockLeads.length) * 100)}%
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Paper>
    );
};