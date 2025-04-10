import React from 'react';
import { Grid, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box, Chip } from '@mui/material';
import { CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { useAgreements } from '../../../hooks/useAgreements';

const getStatusColor = (status: string) => {
    const colors = {
        not_started: { bg: 'rgba(0, 0, 0, 0.04)', text: 'var(--text-primary)' },
        in_progress: { bg: 'rgba(0, 113, 227, 0.1)', text: '#0071e3' },
        stuck: { bg: 'rgba(255, 45, 85, 0.1)', text: '#ff2d55' },
        sj_review: { bg: 'rgba(255, 149, 0, 0.1)', text: '#ff9500' },
        completed: { bg: 'rgba(48, 209, 88, 0.1)', text: '#30d158' },
    };
    return colors[status as keyof typeof colors] || colors.not_started;
};

const getStatusIcon = (status: string) => {
    switch (status) {
        case 'completed':
            return <CheckCircle2 size={16} />;
        case 'in_progress':
        case 'sj_review':
            return <Clock size={16} />;
        case 'stuck':
            return <AlertCircle size={16} />;
        default:
            return <Clock size={16} />;
    }
};

const getStatusLabel = (status: string): string => {
    const labels = {
        not_started: 'Sin comenzar',
        in_progress: 'En proceso',
        stuck: 'Estancado',
        sj_review: 'Para revisión de SJ',
        completed: 'Terminado',
    };
    return labels[status as keyof typeof labels] || status;
};

export const RecentAgreements: React.FC = () => {
    const { agreements, loading } = useAgreements();

    if (loading) {
        return null;
    }

    return (
        <Grid item xs={12}>
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
                        ACUERDOS
                    </Typography>
                </Box>
                <TableContainer sx={{ maxHeight: 400, overflowY: 'auto' }}>
                    <Table size="small" sx={{
                        '& .MuiTableCell-root': {
                            py: 1.5,
                            px: 2,
                            whiteSpace: 'nowrap',
                            '&:last-child': {
                                pr: 2,
                            },
                        },
                    }}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Elemento</TableCell>
                                <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>Responsable</TableCell>
                                <TableCell>Estado</TableCell>
                                <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>Fecha solicitud</TableCell>
                                <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>Fecha entrega</TableCell>
                                <TableCell sx={{ display: { xs: 'none', lg: 'table-cell' } }}>Relato</TableCell>
                                <TableCell sx={{ display: { xs: 'none', lg: 'table-cell' } }}>Solicitud SJ</TableCell>
                                <TableCell>Estado SJ</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {agreements.map((agreement, index) => (
                                <TableRow key={index} hover>
                                    <TableCell>
                                        <Typography
                                            sx={{
                                                color: 'var(--text-primary)',
                                                fontWeight: 500,
                                                fontSize: '0.875rem',
                                                maxWidth: { xs: 120, sm: 200 },
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                            }}
                                        >
                                            {agreement.element}
                                        </Typography>
                                    </TableCell>
                                    <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>
                                        <Typography
                                            sx={{
                                                color: 'var(--text-secondary)',
                                                fontSize: '0.875rem',
                                            }}
                                        >
                                            {agreement.responsible}
                                        </Typography>
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
                                                    fontSize: '0.75rem',
                                                },
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                                        <Typography sx={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                                            {new Date(agreement.requestDate).toLocaleDateString('es-ES', {
                                                day: 'numeric',
                                                month: 'short'
                                            })}
                                        </Typography>
                                    </TableCell>
                                    <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                                        <Typography sx={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                                            {new Date(agreement.deliveryDate).toLocaleDateString('es-ES', {
                                                day: 'numeric',
                                                month: 'short'
                                            })}
                                        </Typography>
                                    </TableCell>
                                    <TableCell sx={{ display: { xs: 'none', lg: 'table-cell' } }}>
                                        <Typography
                                            sx={{
                                                maxWidth: 200,
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap',
                                                color: 'var(--text-primary)',
                                                fontSize: '0.875rem',
                                            }}
                                        >
                                            {agreement.description}
                                        </Typography>
                                    </TableCell>
                                    <TableCell sx={{ display: { xs: 'none', lg: 'table-cell' } }}>
                                        <Typography
                                            sx={{
                                                maxWidth: 200,
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap',
                                                color: 'var(--text-primary)',
                                                fontSize: '0.875rem',
                                            }}
                                        >
                                            {agreement.sjRequest}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            icon={getStatusIcon(agreement.sjStatus)}
                                            label={getStatusLabel(agreement.sjStatus)}
                                            size="small"
                                            sx={{
                                                backgroundColor: getStatusColor(agreement.sjStatus).bg,
                                                color: getStatusColor(agreement.sjStatus).text,
                                                '& .MuiChip-icon': {
                                                    color: 'inherit',
                                                },
                                                '& .MuiChip-label': {
                                                    px: 1,
                                                    fontSize: '0.75rem',
                                                },
                                            }}
                                        />
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