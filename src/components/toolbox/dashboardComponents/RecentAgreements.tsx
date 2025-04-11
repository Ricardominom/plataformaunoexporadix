import React, { useState, useEffect } from 'react';
import { Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box, Chip, LinearProgress, Tabs, Tab, Divider } from '@mui/material';
import { CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

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
                backgroundColor: '#1E1E1E',
                border: '1px solid #333333',
                overflow: 'hidden',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            {/* Header with title */}
            <Box sx={{
                p: 2,
                borderBottom: '1px solid #333333',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                <Typography
                    variant="h6"
                    sx={{
                        fontSize: '1.125rem',
                        fontWeight: 600,
                        color: '#00CC88',
                    }}
                >
                    ACUERDOS
                </Typography>

                {/* Optional: Add a count badge or other info on the right */}
                <Chip
                    label={`${filteredAgreements.length} acuerdos`}
                    size="small"
                    sx={{
                        backgroundColor: 'rgba(0, 204, 136, 0.2)',
                        color: '#00CC88',
                        height: '24px',
                        fontSize: '0.75rem',
                    }}
                />
            </Box>

            {/* Company Tabs - Now below the title with a divider */}
            <Box sx={{ borderBottom: '1px solid #333333' }}>
                <Tabs
                    value={selectedCompany}
                    onChange={handleTabChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    sx={{
                        minHeight: '40px', // Slightly taller tabs
                        '& .MuiTabs-indicator': {
                            backgroundColor: '#00CC88',
                            height: '2px',
                        },
                        '& .MuiTab-root': {
                            minHeight: '40px', // Slightly taller tabs
                            fontSize: '0.8rem', // Slightly larger font
                            fontWeight: 500,
                            color: '#BBBBBB',
                            textTransform: 'none',
                            padding: '6px 16px', // More padding
                            '&.Mui-selected': {
                                color: '#00CC88',
                                fontWeight: 600,
                            },
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
                                <Typography sx={{ color: '#BBBBBB', fontSize: '0.8rem' }}> {/* Smaller font */}
                                    Acuerdo
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography sx={{ color: '#BBBBBB', fontSize: '0.8rem' }}> {/* Smaller font */}
                                    Responsable
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography sx={{ color: '#BBBBBB', fontSize: '0.8rem' }}> {/* Smaller font */}
                                    Progreso
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography sx={{ color: '#BBBBBB', fontSize: '0.8rem' }}> {/* Smaller font */}
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
                                            color: '#FFFFFF',
                                            fontWeight: 500,
                                            fontSize: '0.8rem', // Smaller font
                                        }}
                                    >
                                        {agreement.title}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography
                                        sx={{
                                            color: '#BBBBBB',
                                            fontSize: '0.8rem', // Smaller font
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
                                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                                    '& .MuiLinearProgress-bar': {
                                                        backgroundColor: '#00CC88',
                                                        borderRadius: 3,
                                                    },
                                                }}
                                            />
                                        </Box>
                                        <Typography
                                            sx={{
                                                color: '#BBBBBB',
                                                fontSize: '0.7rem', // Smaller font
                                                minWidth: 24, // Smaller width
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
                                            backgroundColor: getStatusColor(agreement.status).bg,
                                            color: getStatusColor(agreement.status).text,
                                            '& .MuiChip-icon': {
                                                color: 'inherit',
                                            },
                                            '& .MuiChip-label': {
                                                px: 1,
                                                fontSize: '0.7rem', // Smaller font
                                            },
                                            height: '20px', // Reduced height
                                        }}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                        {filteredAgreements.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={4} align="center" sx={{ py: 3 }}>
                                    <Typography sx={{ color: '#BBBBBB' }}>
                                        No hay acuerdos para mostrar
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Summary section */}
            <Box sx={{ p: 2, borderTop: '1px solid #333333' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box>
                        <Typography sx={{ fontSize: '0.7rem', color: '#BBBBBB', mb: 0.5 }}>
                            Total acuerdos
                        </Typography>
                        <Typography sx={{ fontSize: '1rem', fontWeight: 600, color: '#FFFFFF' }}>
                            {filteredAgreements.length}
                        </Typography>
                    </Box>
                    <Box>
                        <Typography sx={{ fontSize: '0.7rem', color: '#BBBBBB', mb: 0.5 }}>
                            En proceso
                        </Typography>
                        <Typography sx={{ fontSize: '1rem', fontWeight: 600, color: '#00CC88' }}>
                            {filteredAgreements.filter(a => a.status === 'in_progress').length}
                        </Typography>
                    </Box>
                    <Box>
                        <Typography sx={{ fontSize: '0.7rem', color: '#BBBBBB', mb: 0.5 }}>
                            Completados
                        </Typography>
                        <Typography sx={{ fontSize: '1rem', fontWeight: 600, color: '#00CC88' }}>
                            {filteredAgreements.filter(a => a.status === 'completed').length}
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Paper>
    );
};