import React, { useState, useEffect } from 'react';
import { Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box, Chip, LinearProgress, Tabs, Tab, Divider } from '@mui/material';
import { CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../../../context/ThemeContext';

interface Agreement {
    title: string;
    status: string;
    owner: string;
    progress: number;
    company?: string; // Added company field
}

interface RecentAgreementsProps {
    agreements?: Agreement[];
}

export const RecentAgreements: React.FC<RecentAgreementsProps> = ({ agreements = [] }) => {
    const { theme } = useTheme();
    const isDarkMode = theme === 'dark';
    
    // Define theme-dependent colors
    const accentColor = isDarkMode ? '#00CC88' : '#0071e3';
    const bgColor = isDarkMode ? '#1E1E1E' : '#FFFFFF';
    const borderColor = isDarkMode ? '#333333' : 'rgba(0, 0, 0, 0.1)';
    const textPrimary = isDarkMode ? '#FFFFFF' : '#1d1d1f';
    const textSecondary = isDarkMode ? '#BBBBBB' : '#86868b';

    // If no agreements are provided, use these default agreements
    const defaultAgreements: Agreement[] = [
        {
            title: "Contrato de Servicios Cloud",
            status: "in_progress",
            owner: "María González",
            progress: 75,
            company: "Interlogis Holding"
        },
        {
            title: "Acuerdo de Confidencialidad",
            status: "completed",
            owner: "Juan Pérez",
            progress: 100,
            company: "Interlogis Holding"
        },
        {
            title: "Términos y Condiciones App",
            status: "pending",
            owner: "Carlos Rodríguez",
            progress: 30,
            company: "Interlogis Inmobiliaria"
        },
        {
            title: "Contrato de Arrendamiento",
            status: "in_progress",
            owner: "Ana Martínez",
            progress: 60,
            company: "Interlogis Inmobiliaria"
        },
        {
            title: "Acuerdo de Servicios",
            status: "completed",
            owner: "Roberto Sánchez",
            progress: 100,
            company: "Interlogis Holding"
        }
    ];

    const displayAgreements = agreements.length > 0
        ? agreements.map(a => ({ ...a, company: a.company || "Interlogis Holding" }))
        : defaultAgreements;

    // Get unique companies from agreements
    const companies = [...new Set(displayAgreements.map(a => a.company || ""))];

    // Set initial selected company to the first one in the list
    const [selectedCompany, setSelectedCompany] = useState<string>(companies[0] || "");

    // Update selected company if companies change
    useEffect(() => {
        if (companies.length > 0 && !companies.includes(selectedCompany)) {
            setSelectedCompany(companies[0]);
        }
    }, [companies, selectedCompany]);

    // Filter agreements by selected company
    const filteredAgreements = displayAgreements.filter(a => a.company === selectedCompany);

    const getStatusColor = (status: string) => {
        const colors = {
            completed: { bg: 'rgba(0, 204, 136, 0.2)', text: '#00CC88' },
            in_progress: { bg: 'rgba(0, 204, 136, 0.2)', text: '#00CC88' },
            delayed: { bg: 'rgba(0, 204, 136, 0.2)', text: '#00CC88' },
            pending: { bg: 'rgba(0, 204, 136, 0.2)', text: '#00CC88' },
        };
        return colors[status as keyof typeof colors] || colors.pending;
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'completed':
                return <CheckCircle2 size={14} />; // Smaller icon
            case 'in_progress':
                return <Clock size={14} />; // Smaller icon
            case 'delayed':
            case 'pending':
                return <AlertCircle size={14} />; // Smaller icon
            default:
                return <Clock size={14} />; // Smaller icon
        }
    };

    const getStatusLabel = (status: string): string => {
        const labels = {
            completed: 'Completado',
            in_progress: 'En proceso',
            delayed: 'Retrasado',
            pending: 'Pendiente',
        };
        return labels[status as keyof typeof labels] || status;
    };

    const handleTabChange = (_: React.SyntheticEvent, newValue: string) => {
        setSelectedCompany(newValue);
    };

    return (
        <Paper
            sx={{
                borderRadius: '12px',
                backgroundColor: bgColor,
                border: `1px solid ${borderColor}`,
                overflow: 'hidden',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'background-color 0.3s ease, border-color 0.3s ease',
            }}
        >
            {/* Header with title */}
            <Box sx={{
                p: 2,
                borderBottom: `1px solid ${borderColor}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                transition: 'border-color 0.3s ease',
            }}>
                <Typography
                    variant="h6"
                    sx={{
                        fontSize: '1.125rem',
                        fontWeight: 600,
                        color: accentColor,
                        transition: 'color 0.3s ease',
                    }}
                >
                    ACUERDOS
                </Typography>

                {/* Optional: Add a count badge or other info on the right */}
                <Chip
                    label={`${filteredAgreements.length} acuerdos`}
                    size="small"
                    sx={{
                        backgroundColor: `${accentColor}20`,
                        color: accentColor,
                        height: '24px',
                        fontSize: '0.75rem',
                        transition: 'background-color 0.3s ease, color 0.3s ease',
                    }}
                />
            </Box>

            {/* Company Tabs - Now below the title with a divider */}
            <Box sx={{ borderBottom: `1px solid ${borderColor}`, transition: 'border-color 0.3s ease' }}>
                <Tabs
                    value={selectedCompany}
                    onChange={handleTabChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    sx={{
                        minHeight: '40px', // Slightly taller tabs
                        '& .MuiTabs-indicator': {
                            backgroundColor: accentColor,
                            height: '2px',
                            transition: 'background-color 0.3s ease',
                        },
                        '& .MuiTab-root': {
                            minHeight: '40px', // Slightly taller tabs
                            fontSize: '0.8rem', // Slightly larger font
                            fontWeight: 500,
                            color: textSecondary,
                            textTransform: 'none',
                            padding: '6px 16px', // More padding
                            '&.Mui-selected': {
                                color: accentColor,
                                fontWeight: 600,
                            },
                            transition: 'color 0.3s ease',
                        },
                    }}
                >
                    {companies.map((company) => (
                        <Tab
                            key={company}
                            value={company}
                            label={company}
                        />
                    ))}
                </Tabs>
            </Box>

            <TableContainer sx={{ flex: 1, overflowY: 'auto' }}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <Typography sx={{ color: textSecondary, fontSize: '0.8rem', transition: 'color 0.3s ease' }}> {/* Smaller font */}
                                    Acuerdo
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography sx={{ color: textSecondary, fontSize: '0.8rem', transition: 'color 0.3s ease' }}> {/* Smaller font */}
                                    Responsable
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography sx={{ color: textSecondary, fontSize: '0.8rem', transition: 'color 0.3s ease' }}> {/* Smaller font */}
                                    Progreso
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography sx={{ color: textSecondary, fontSize: '0.8rem', transition: 'color 0.3s ease' }}> {/* Smaller font */}
                                    Estado
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredAgreements.map((agreement, index) => (
                            <TableRow
                                key={index}
                                hover
                                sx={{
                                    height: '48px', // Fixed height for rows
                                }}
                            >
                                <TableCell>
                                    <Typography
                                        sx={{
                                            color: textPrimary,
                                            fontWeight: 500,
                                            fontSize: '0.8rem', // Smaller font
                                            transition: 'color 0.3s ease',
                                        }}
                                    >
                                        {agreement.title}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography
                                        sx={{
                                            color: textSecondary,
                                            fontSize: '0.8rem', // Smaller font
                                            transition: 'color 0.3s ease',
                                        }}
                                    >
                                        {agreement.owner}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Box sx={{ flex: 1, mr: 1 }}>
                                            <LinearProgress
                                                variant="determinate"
                                                value={agreement.progress}
                                                sx={{
                                                    height: 4, // Thinner progress bar
                                                    borderRadius: 3,
                                                    backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                                                    '& .MuiLinearProgress-bar': {
                                                        backgroundColor: accentColor,
                                                        borderRadius: 3,
                                                    },
                                                    transition: 'background-color 0.3s ease',
                                                }}
                                            />
                                        </Box>
                                        <Typography
                                            sx={{
                                                color: textSecondary,
                                                fontSize: '0.7rem', // Smaller font
                                                minWidth: 24, // Smaller width
                                                transition: 'color 0.3s ease',
                                            }}
                                        >
                                            {agreement.progress}%
                                        </Typography>
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        icon={getStatusIcon(agreement.status)}
                                        label={getStatusLabel(agreement.status)}
                                        size="small"
                                        sx={{
                                            backgroundColor: `${accentColor}20`,
                                            color: accentColor,
                                            '& .MuiChip-icon': {
                                                color: 'inherit',
                                            },
                                            '& .MuiChip-label': {
                                                px: 1,
                                                fontSize: '0.7rem', // Smaller font
                                            },
                                            height: '20px', // Reduced height
                                            transition: 'background-color 0.3s ease, color 0.3s ease',
                                        }}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                        {filteredAgreements.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={4} align="center" sx={{ py: 3 }}>
                                    <Typography sx={{ color: textSecondary, transition: 'color 0.3s ease' }}>
                                        No hay acuerdos para mostrar
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Summary section */}
            <Box sx={{ p: 2, borderTop: `1px solid ${borderColor}`, transition: 'border-color 0.3s ease' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box>
                        <Typography sx={{ fontSize: '0.7rem', color: textSecondary, mb: 0.5, transition: 'color 0.3s ease' }}>
                            Total acuerdos
                        </Typography>
                        <Typography sx={{ fontSize: '1rem', fontWeight: 600, color: textPrimary, transition: 'color 0.3s ease' }}>
                            {filteredAgreements.length}
                        </Typography>
                    </Box>
                    <Box>
                        <Typography sx={{ fontSize: '0.7rem', color: textSecondary, mb: 0.5, transition: 'color 0.3s ease' }}>
                            En proceso
                        </Typography>
                        <Typography sx={{ fontSize: '1rem', fontWeight: 600, color: accentColor, transition: 'color 0.3s ease' }}>
                            {filteredAgreements.filter(a => a.status === 'in_progress').length}
                        </Typography>
                    </Box>
                    <Box>
                        <Typography sx={{ fontSize: '0.7rem', color: textSecondary, mb: 0.5, transition: 'color 0.3s ease' }}>
                            Completados
                        </Typography>
                        <Typography sx={{ fontSize: '1rem', fontWeight: 600, color: accentColor, transition: 'color 0.3s ease' }}>
                            {filteredAgreements.filter(a => a.status === 'completed').length}
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Paper>
    );
};