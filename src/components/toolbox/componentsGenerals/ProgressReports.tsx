import React, { useState } from 'react';
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
    Button,
} from '@mui/material';
import { Plus } from 'lucide-react';
import { NewReportDialog } from '../../agreements/NewReportDialog';
import { useNotification } from '../../../context/NotificationContext';

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
    const [reports, setReports] = useState(progressReports.reports);
    const [isNewReportOpen, setIsNewReportOpen] = useState(false);
    const { addNotification } = useNotification();

    const handleNewReport = (report: {
        project: string;
        status: string;
        progress: number;
        lastUpdate: string;
        dueDate: string;
        responsible: string;
    }) => {
        // Crear nuevo reporte con un ID generado
        const newReport = {
            ...report,
            id: (reports.length + 1).toString(),
        };

        // Actualizar la lista de reportes
        setReports([newReport, ...reports]);

        // Cerrar el diálogo y mostrar notificación
        setIsNewReportOpen(false);
        addNotification('Reporte agregado exitosamente');
    };

    return (
        <>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 2,
                px: 2,
                py: 2,
                backgroundColor: 'var(--surface-primary)',
                borderTopLeftRadius: '12px',
                borderTopRightRadius: '12px',
                borderBottom: '1px solid var(--border-color)',
            }}>
                <Typography
                    variant="h6"
                    sx={{
                        fontSize: '1.125rem',
                        fontWeight: 600,
                        color: 'var(--text-primary)',
                    }}
                >
                    Reportes de Avance
                </Typography>
                <Button
                    startIcon={<Plus size={16} />}
                    variant="outlined"
                    onClick={() => setIsNewReportOpen(true)}
                    sx={{
                        color: '#0071e3',
                        borderColor: '#0071e3',
                        fontSize: '0.875rem',
                        fontWeight: 500,
                        textTransform: 'none',
                        px: 2.5,
                        borderRadius: '6px',
                        '&:hover': {
                            borderColor: '#0071e3',
                            backgroundColor: 'rgba(0, 113, 227, 0.1)',
                        },
                    }}
                >
                    Agregar Reporte
                </Button>
            </Box>
            <Paper
                sx={{
                    borderRadius: '12px',
                    backgroundColor: 'var(--surface-primary)',
                    overflow: 'hidden',
                    // Remove top border radius since we have a header now
                    borderTopLeftRadius: 0,
                    borderTopRightRadius: 0,
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
                            {reports.map((report, index) => (
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
                            {reports.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
                                        <Typography sx={{ color: 'var(--text-secondary)' }}>
                                            No hay reportes disponibles
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>

            {/* Diálogo para agregar nuevo reporte */}
            <NewReportDialog
                open={isNewReportOpen}
                onClose={() => setIsNewReportOpen(false)}
                onSubmit={handleNewReport}
            />
        </>
    );
};