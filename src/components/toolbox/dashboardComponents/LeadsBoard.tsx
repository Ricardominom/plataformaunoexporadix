import React from 'react';
import { Paper, Typography, Box, Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Circle, BarChart2, TrendingUp, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../../../context/ThemeContext';

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
    const { theme } = useTheme();
    const isDarkMode = theme === 'dark';
    
    // Define theme-dependent colors
    const accentColor = isDarkMode ? '#00CC88' : '#0071e3';
    const accentColorLight = isDarkMode ? '#00FFAA' : '#40a9ff';
    const accentGradient = isDarkMode 
        ? 'linear-gradient(135deg, #00FFAA 0%, #00CC88 100%)' 
        : 'linear-gradient(135deg, #40a9ff 0%, #0071e3 100%)';
    const bgColor = isDarkMode ? '#1E1E1E' : '#FFFFFF';
    const borderColor = isDarkMode ? '#333333' : 'rgba(0, 0, 0, 0.1)';
    const textPrimary = isDarkMode ? '#FFFFFF' : '#1d1d1f';
    const textSecondary = isDarkMode ? '#BBBBBB' : '#86868b';

    // Calculate total value of leads
    const totalValue = mockLeads.reduce((sum, lead) => sum + lead.monto, 0);
    
    return (
        <Paper
            component={motion.div}
            whileHover={{ 
                boxShadow: `0 15px 35px ${accentColor}25`
            }}
            sx={{
                borderRadius: '12px',
                overflow: 'hidden',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                background: isDarkMode 
                    ? 'linear-gradient(135deg, #1E1E1E 0%, #252525 100%)' 
                    : 'linear-gradient(135deg, #FFFFFF 0%, #F8F8F8 100%)',
                position: 'relative',
                border: `1px solid ${accentColor}`,
                boxShadow: `0 8px 24px ${accentColor}25`,
                transition: 'background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '6px',
                    background: `linear-gradient(90deg, ${accentColor} 0%, ${accentColorLight} 100%)`,
                    boxShadow: `0 0 20px ${accentColor}50`,
                    transition: 'background 0.3s ease, box-shadow 0.3s ease',
                },
                '&::after': {
                    content: '""',
                    position: 'absolute',
                    top: 6,
                    left: 0,
                    right: 0,
                    height: '1px',
                    background: `linear-gradient(90deg, ${accentColorLight}50 0%, ${accentColor}50 50%, ${accentColorLight}50 100%)`,
                    transition: 'background 0.3s ease',
                }
            }}
        >
            <Box sx={{ 
                p: 2, 
                borderBottom: isDarkMode ? '1px solid rgba(0, 204, 136, 0.3)' : `1px solid ${accentColor}30`, 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                background: isDarkMode 
                    ? 'linear-gradient(180deg, rgba(0, 204, 136, 0.15) 0%, rgba(0, 0, 0, 0) 100%)' 
                    : `linear-gradient(180deg, ${accentColor}15 0%, rgba(255, 255, 255, 0) 100%)`,
                transition: 'background 0.3s ease, border-color 0.3s ease',
            }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box
                        sx={{
                            width: 40,
                            height: 40,
                            borderRadius: '50%',
                            background: `linear-gradient(135deg, ${accentColor} 0%, ${accentColorLight} 100%)`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: `0 0 15px ${accentColor}50`,
                            transition: 'background 0.3s ease, box-shadow 0.3s ease',
                        }}
                    >
                        <BarChart2 size={20} color={isDarkMode ? '#FFFFFF' : '#FFFFFF'} />
                    </Box>
                    <Typography
                        variant="h6"
                        sx={{
                            fontSize: '1.25rem',
                            fontWeight: 700,
                            background: accentGradient,
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                            transition: 'background 0.3s ease',
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
                        background: isDarkMode 
                            ? 'linear-gradient(90deg, rgba(0, 204, 136, 0.2) 0%, rgba(0, 255, 170, 0.2) 100%)' 
                            : `linear-gradient(90deg, ${accentColor}20 0%, ${accentColorLight}20 100%)`,
                        px: 2,
                        py: 1,
                        borderRadius: '20px',
                        boxShadow: isDarkMode ? '0 4px 12px rgba(0, 204, 136, 0.2)' : `0 4px 12px ${accentColor}20`,
                        border: isDarkMode ? '1px solid rgba(0, 204, 136, 0.3)' : `1px solid ${accentColor}30`,
                        transition: 'background 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
                    }}
                >
                    <DollarSign size={18} color={isDarkMode ? '#00FFAA' : accentColorLight} />
                    <Typography sx={{ 
                        fontWeight: 700, 
                        fontSize: '1rem',
                        background: accentGradient,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
                        transition: 'background 0.3s ease',
                    }}>
                        ${totalValue.toLocaleString()} en pipeline
                    </Typography>
                </Box>
            </Box>
            <TableContainer sx={{ flex: 1, overflowY: 'auto' }}>
                <Table size="small">
                    <TableHead>
                        <TableRow sx={{ 
                            background: isDarkMode 
                                ? 'linear-gradient(180deg, rgba(0, 204, 136, 0.1) 0%, rgba(0, 0, 0, 0) 100%)'
                                : `linear-gradient(180deg, ${accentColor}10 0%, rgba(255, 255, 255, 0) 100%)`,
                            transition: 'background 0.3s ease',
                        }}>
                            <TableCell>
                                <Typography sx={{ color: textSecondary, fontSize: '0.8rem', fontWeight: 600, transition: 'color 0.3s ease' }}>
                                    Cuenta
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography sx={{ color: textSecondary, fontSize: '0.8rem', fontWeight: 600, transition: 'color 0.3s ease' }}>
                                    Estatus
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography sx={{ color: textSecondary, fontSize: '0.8rem', fontWeight: 600, transition: 'color 0.3s ease' }}>
                                    Propuesta
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography sx={{ color: textSecondary, fontSize: '0.8rem', fontWeight: 600, transition: 'color 0.3s ease' }}>
                                    Enlace
                                </Typography>
                            </TableCell>
                            <TableCell align="right">
                                <Typography sx={{ color: textSecondary, fontSize: '0.8rem', fontWeight: 600, transition: 'color 0.3s ease' }}>
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
                                    backgroundColor: isDarkMode ? 'rgba(0, 204, 136, 0.1)' : `${accentColor}10`,
                                    transition: { duration: 0.2 }
                                }}
                                sx={{
                                    height: '40px',
                                    transition: 'background-color 0.2s ease',
                                    '&:nth-of-type(odd)': {
                                        backgroundColor: isDarkMode ? 'rgba(0, 204, 136, 0.05)' : `${accentColor}05`,
                                        transition: 'background-color 0.3s ease',
                                    }
                                }}
                            >
                                <TableCell>
                                    <Typography
                                        sx={{
                                            color: textPrimary,
                                            fontWeight: 500,
                                            fontSize: '0.8rem',
                                            transition: 'color 0.3s ease',
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
                                            backgroundColor: `${accentColor}20`,
                                            color: accentColorLight,
                                            '& .MuiChip-icon': {
                                                color: 'inherit',
                                            },
                                            '& .MuiChip-label': {
                                                fontSize: '0.7rem',
                                                padding: '0 6px',
                                                fontWeight: 600,
                                            },
                                            height: '20px',
                                            background: `linear-gradient(90deg, ${accentColor}30 0%, ${accentColorLight}30 100%)`,
                                            boxShadow: `0 2px 6px ${accentColor}20`,
                                            border: `1px solid ${accentColor}30`,
                                            transition: 'background 0.3s ease, color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
                                        }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={lead.propuesta}
                                        size="small"
                                        sx={{
                                            backgroundColor: `${accentColor}20`,
                                            color: accentColorLight,
                                            '& .MuiChip-label': {
                                                fontSize: '0.7rem',
                                                padding: '0 6px',
                                                fontWeight: 600,
                                            },
                                            height: '20px',
                                            background: `linear-gradient(90deg, ${accentColorLight}30 0%, ${accentColor}30 100%)`,
                                            boxShadow: `0 2px 6px ${accentColor}20`,
                                            border: `1px solid ${accentColor}30`,
                                            transition: 'background 0.3s ease, color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
                                        }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Typography
                                        sx={{
                                            color: textSecondary,
                                            fontSize: '0.8rem',
                                            transition: 'color 0.3s ease',
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
                                            background: accentGradient,
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                            textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
                                            transition: 'background 0.3s ease',
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
                borderTop: isDarkMode ? '1px solid rgba(0, 204, 136, 0.3)' : `1px solid ${accentColor}30`,
                background: isDarkMode 
                    ? 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 204, 136, 0.15) 100%)'
                    : `linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, ${accentColor}15 100%)`,
                transition: 'border-color 0.3s ease, background 0.3s ease',
            }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box 
                        component={motion.div}
                        whileHover={{ scale: 1.05 }}
                        sx={{ 
                            p: 1.5, 
                            borderRadius: '8px', 
                            background: isDarkMode 
                                ? 'linear-gradient(135deg, rgba(0, 255, 170, 0.1) 0%, rgba(0, 204, 136, 0.1) 100%)'
                                : `linear-gradient(135deg, ${accentColorLight}10 0%, ${accentColor}10 100%)`,
                            border: isDarkMode ? '1px solid rgba(0, 204, 136, 0.2)' : `1px solid ${accentColor}20`,
                            transition: 'all 0.2s ease, background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
                            boxShadow: isDarkMode ? '0 4px 12px rgba(0, 204, 136, 0.1)' : `0 4px 12px ${accentColor}10`,
                        }}
                    >
                        <Typography sx={{ fontSize: '0.7rem', color: textSecondary, mb: 0.5, transition: 'color 0.3s ease' }}>
                            Total leads
                        </Typography>
                        <Typography sx={{ 
                            fontSize: '1.2rem', 
                            fontWeight: 700,
                            background: accentGradient,
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
                            transition: 'background 0.3s ease',
                        }}>
                            {mockLeads.length}
                        </Typography>
                    </Box>
                    <Box 
                        component={motion.div}
                        whileHover={{ scale: 1.05 }}
                        sx={{ 
                            p: 1.5, 
                            borderRadius: '8px', 
                            background: isDarkMode 
                                ? 'linear-gradient(135deg, rgba(0, 255, 170, 0.1) 0%, rgba(0, 204, 136, 0.1) 100%)'
                                : `linear-gradient(135deg, ${accentColorLight}10 0%, ${accentColor}10 100%)`,
                            border: isDarkMode ? '1px solid rgba(0, 204, 136, 0.2)' : `1px solid ${accentColor}20`,
                            transition: 'all 0.2s ease, background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
                            boxShadow: isDarkMode ? '0 4px 12px rgba(0, 204, 136, 0.1)' : `0 4px 12px ${accentColor}10`,
                        }}
                    >
                        <Typography sx={{ fontSize: '0.7rem', color: textSecondary, mb: 0.5, transition: 'color 0.3s ease' }}>
                            Activos
                        </Typography>
                        <Typography sx={{ 
                            fontSize: '1.2rem', 
                            fontWeight: 700,
                            background: accentGradient,
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
                            transition: 'background 0.3s ease',
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
                            background: isDarkMode 
                                ? 'linear-gradient(135deg, rgba(0, 255, 170, 0.1) 0%, rgba(0, 204, 136, 0.1) 100%)'
                                : `linear-gradient(135deg, ${accentColorLight}10 0%, ${accentColor}10 100%)`,
                            border: isDarkMode ? '1px solid rgba(0, 204, 136, 0.2)' : `1px solid ${accentColor}20`,
                            transition: 'all 0.2s ease, background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
                            boxShadow: isDarkMode ? '0 4px 12px rgba(0, 204, 136, 0.1)' : `0 4px 12px ${accentColor}10`,
                        }}
                    >
                        <Typography sx={{ fontSize: '0.7rem', color: textSecondary, mb: 0.5, transition: 'color 0.3s ease' }}>
                            Conversión
                        </Typography>
                        <Typography sx={{ 
                            fontSize: '1.2rem', 
                            fontWeight: 700,
                            background: accentGradient,
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
                            transition: 'background 0.3s ease',
                        }}>
                            {Math.round((mockLeads.filter(l => l.propuesta === 'Aceptada').length / mockLeads.length) * 100)}%
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Paper>
    );
};