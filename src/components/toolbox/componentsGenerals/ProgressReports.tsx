import React from 'react';
import {
    Box,
    Paper,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Chip,
    LinearProgress,
} from '@mui/material';

// Import mock data from centralized data module
import { progressReports } from '../../../data/pmo';

// Utility functions for status rendering
const getStatusColor = (status: string) => {
    const colors = {
        completed: { bg: 'rgba(48, 209, 88, 0.1)', text: '#30d158' },
        in_progress: { bg: 'rgba(0, 113, 227, 0.1)', text: '#0071e3' },
        delayed: { bg: 'rgba(255, 45, 85, 0.1)', text: '#ff2d55' },
    };
    return colors[status as keyof typeof colors] || colors.in_progress;
};

const getStatusLabel = (status: string) => {
    const labels = {
        completed: 'Completado',
        in_progress: 'En Progreso',
        delayed: 'Retrasado',
    };
    return labels[status as keyof typeof labels] || status;
};

export const ProgressReports: React.FC = () => {
    return (
        <Paper
            sx={{
                borderRadius: '12px',
                backgroundColor: 'var(--surface-primary)',
                overflow: 'hidden',
            }}
            className="glass-effect"
        >
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Proyecto</TableCell>
                            <TableCell>Estado</TableCell>
                            <TableCell>Progreso</TableCell>
                            <TableCell>Última Actualización</TableCell>
                            <TableCell>Fecha Límite</TableCell>
                            <TableCell>Responsable</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {progressReports.reports.map((report, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    <Typography
                                        sx={{
                                            color: 'var(--text-primary)',
                                            fontWeight: 500,
                                        }}
                                    >
                                        {report.project}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={getStatusLabel(report.status)}
                                        sx={{
                                            backgroundColor: getStatusColor(report.status).bg,
                                            color: getStatusColor(report.status).text,
                                            fontWeight: 500,
                                        }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <LinearProgress
                                            variant="determinate"
                                            value={report.progress}
                                            sx={{
                                                width: 100,
                                                height: 6,
                                                borderRadius: 3,
                                                backgroundColor: 'var(--surface-secondary)',
                                                '& .MuiLinearProgress-bar': {
                                                    backgroundColor: report.status === 'delayed' ? '#ff3b30' :
                                                        report.status === 'completed' ? '#30d158' : '#0071e3',
                                                    borderRadius: 3,
                                                },
                                            }}
                                        />
                                        <Typography
                                            sx={{
                                                color: 'var(--text-primary)',
                                                fontWeight: 500,
                                            }}
                                        >
                                            {report.progress}%
                                        </Typography>
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Typography sx={{ color: 'var(--text-secondary)' }}>
                                        {new Date(report.lastUpdate).toLocaleDateString()}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography sx={{ color: 'var(--text-secondary)' }}>
                                        {new Date(report.dueDate).toLocaleDateString()}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography sx={{ color: 'var(--text-secondary)' }}>
                                        {report.responsible}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};