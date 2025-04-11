import React, { useState, useCallback } from 'react';
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
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Tooltip,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Slider,
} from '@mui/material';
import { Plus, Edit, Trash2, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNotification } from '../../../context/NotificationContext';
import { NewReportDialog } from '../../agreements/NewReportDialog';
import dayjs from 'dayjs';

// Import mock data from centralized data module
import { progressReports as initialData } from '../../../data/pmo';

// Define a proper type for reports
interface Report {
    id: string;
    project: string;
    status: 'completed' | 'in_progress' | 'delayed';
    progress: number;
    lastUpdate: string;
    dueDate: string;
    responsible: string;
}

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

// Component for the delete confirmation dialog
interface DeleteConfirmDialogProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    reportName: string;
}

const DeleteConfirmDialog: React.FC<DeleteConfirmDialogProps> = ({ open, onClose, onConfirm, reportName }) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            PaperProps={{
                elevation: 0,
                component: motion.div,
                initial: { opacity: 0, y: 20, scale: 0.9 },
                animate: { opacity: 1, y: 0, scale: 1 },
                exit: { opacity: 0, y: 20, scale: 0.9 },
                transition: { duration: 0.2 },
                sx: {
                    borderRadius: '12px',
                    backgroundColor: 'var(--surface-primary)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid var(--border-color)',
                    maxWidth: '400px',
                    width: '100%',
                    mx: 2,
                },
            }}
        >
            <DialogTitle sx={{
                fontSize: '1.125rem',
                fontWeight: 600,
                color: 'var(--text-primary)',
                p: 3,
                borderBottom: '1px solid var(--border-color)',
                display: 'flex',
                alignItems: 'center',
                gap: 2,
            }}>
                <Box
                    sx={{
                        width: 40,
                        height: 40,
                        borderRadius: '10px',
                        backgroundColor: 'rgba(255, 45, 85, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <AlertTriangle size={24} color="#ff2d55" />
                </Box>
                Confirmar eliminación
            </DialogTitle>
            <DialogContent sx={{ p: 3, pt: 3 }}>
                <Typography sx={{ color: 'var(--text-primary)', lineHeight: 1.6 }}>
                    ¿Estás seguro de que deseas eliminar el reporte "{reportName}"? Esta acción no se puede deshacer.
                </Typography>
            </DialogContent>
            <DialogActions sx={{
                p: 3,
                pt: 0,
                borderTop: 'none',
                gap: 1,
                display: 'flex',
                justifyContent: 'flex-end',
            }}>
                <Button
                    onClick={onClose}
                    sx={{
                        color: 'var(--text-secondary)',
                        fontSize: '0.9375rem',
                        fontWeight: 500,
                        textTransform: 'none',
                        px: 3,
                        py: 1,
                        borderRadius: '8px',
                        '&:hover': {
                            backgroundColor: 'var(--hover-bg)',
                            color: 'var(--text-primary)',
                        },
                    }}
                >
                    Cancelar
                </Button>
                <Button
                    onClick={onConfirm}
                    startIcon={<Trash2 size={18} />}
                    sx={{
                        backgroundColor: '#ff3b30',
                        color: '#fff',
                        fontSize: '0.9375rem',
                        fontWeight: 500,
                        textTransform: 'none',
                        px: 3,
                        py: 1,
                        borderRadius: '8px',
                        boxShadow: 'none',
                        '&:hover': {
                            backgroundColor: '#ff453a',
                            boxShadow: '0 2px 8px rgba(255, 59, 48, 0.3)',
                        },
                    }}
                >
                    Eliminar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

// Main component
export const ProgressReports: React.FC = () => {
    // Initialize with typed data
    const [reports, setReports] = useState<Report[]>(initialData.reports as Report[]);
    const [isNewReportOpen, setIsNewReportOpen] = useState(false);
    const [editingReport, setEditingReport] = useState<Report | null>(null);
    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
    const [reportToDelete, setReportToDelete] = useState<Report | null>(null);
    const { addNotification } = useNotification();

    // Handler for creating or updating a report
    const handleSaveReport = useCallback((reportData: Report) => {
        console.log("Handling save report:", reportData);
        
        if (reportData.id) {
            // Update existing report
            console.log("Updating report with ID:", reportData.id);
            setReports(prevReports => 
                prevReports.map(report => 
                    report.id === reportData.id ? reportData : report
                )
            );
            addNotification('Reporte actualizado exitosamente');
        } else {
            // Create new report
            const newId = Math.max(0, ...reports.map(r => parseInt(r.id))) + 1;
            const newReport = {
                ...reportData,
                id: newId.toString()
            };
            console.log("Creating new report with ID:", newReport.id);
            setReports(prevReports => [newReport, ...prevReports]);
            addNotification('Reporte creado exitosamente');
        }
        
        // Close dialog and reset editing state
        setIsNewReportOpen(false);
        setEditingReport(null);
    }, [reports, addNotification]);

    // Handler for editing a report
    const handleEditReport = useCallback((report: Report) => {
        console.log("Editing report:", report);
        setEditingReport({...report}); // Create a copy to avoid reference issues
        setIsNewReportOpen(true);
    }, []);

    // Handler for initiating delete process
    const handleDeleteClick = useCallback((report: Report) => {
        console.log("Initiating delete for report:", report);
        setReportToDelete(report);
        setDeleteConfirmOpen(true);
    }, []);

    // Handler for confirming deletion
    const confirmDelete = useCallback(() => {
        if (reportToDelete) {
            console.log("Confirming delete for report ID:", reportToDelete.id);
            setReports(prevReports => 
                prevReports.filter(report => report.id !== reportToDelete.id)
            );
            addNotification('Reporte eliminado exitosamente');
            setDeleteConfirmOpen(false);
            setReportToDelete(null);
        }
    }, [reportToDelete, addNotification]);

    // Handler for creating a new report
    const handleNewReport = useCallback((reportData: Omit<Report, 'id'>) => {
        const newId = Math.max(0, ...reports.map(r => parseInt(r.id))) + 1;
        const newReport: Report = {
            ...reportData,
            id: newId.toString()
        };
        console.log("Creating new report:", newReport);
        setReports(prevReports => [newReport, ...prevReports]);
        addNotification('Reporte creado exitosamente');
        setIsNewReportOpen(false);
    }, [reports, addNotification]);

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
                    onClick={() => {
                        setEditingReport(null);
                        setIsNewReportOpen(true);
                    }}
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
                                <TableCell>ID</TableCell>
                                <TableCell>Proyecto</TableCell>
                                <TableCell>Estado</TableCell>
                                <TableCell>Progreso</TableCell>
                                <TableCell>Última Actualización</TableCell>
                                <TableCell>Fecha Límite</TableCell>
                                <TableCell>Responsable</TableCell>
                                <TableCell align="center">Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {reports.map((report) => (
                                <TableRow key={report.id}>
                                    <TableCell>{report.id}</TableCell>
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
                                    <TableCell>
                                        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                                            <Tooltip title="Modificar">
                                                <IconButton 
                                                    size="small" 
                                                    onClick={() => handleEditReport(report)}
                                                    sx={{
                                                        color: 'var(--text-secondary)',
                                                        '&:hover': {
                                                            backgroundColor: 'rgba(0, 113, 227, 0.1)',
                                                            color: '#0071e3',
                                                        },
                                                    }}
                                                >
                                                    <Edit size={16} />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Eliminar">
                                                <IconButton 
                                                    size="small" 
                                                    onClick={() => handleDeleteClick(report)}
                                                    sx={{
                                                        color: 'var(--text-secondary)',
                                                        '&:hover': {
                                                            backgroundColor: 'rgba(255, 45, 85, 0.1)',
                                                            color: '#ff2d55',
                                                        },
                                                    }}
                                                >
                                                    <Trash2 size={16} />
                                                </IconButton>
                                            </Tooltip>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {reports.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={8} align="center" sx={{ py: 3 }}>
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

            {/* New Report Dialog */}
            <NewReportDialog
                open={isNewReportOpen}
                onClose={() => {
                    setIsNewReportOpen(false);
                    setEditingReport(null);
                }}
                onSubmit={editingReport ? handleSaveReport : handleNewReport}
                report={editingReport}
            />

            {/* Delete Confirmation Dialog */}
            {reportToDelete && (
                <DeleteConfirmDialog
                    open={deleteConfirmOpen}
                    onClose={() => {
                        setDeleteConfirmOpen(false);
                        setReportToDelete(null);
                    }}
                    onConfirm={confirmDelete}
                    reportName={reportToDelete.project}
                />
            )}
        </>
    );
};