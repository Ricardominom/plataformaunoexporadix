import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Chip,
    Box,
    Typography,
} from '@mui/material';
import { DollarSign, CheckCircle, XCircle } from 'lucide-react';
import { useMoneyApprovals } from '../../../hooks/useMoneyApprovals';

interface MoneyApprovalsModalProps {
    open: boolean;
    onClose: () => void;
}

export const MoneyApprovalsModal: React.FC<MoneyApprovalsModalProps> = ({ open, onClose }) => {
    const { pendingApprovals, approveExpense, rejectExpense } = useMoneyApprovals();

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="lg"
            fullWidth
            PaperProps={{
                sx: {
                    backgroundColor: '#1E1E1E',
                    borderRadius: '12px',
                    border: '1px solid #333333',
                    color: '#FFFFFF',
                }
            }}
        >
            <DialogTitle sx={{ 
                borderBottom: '1px solid #333333',
                backgroundColor: '#2C2C2C',
                color: '#00CC88',
                fontWeight: 600,
                fontSize: '1.25rem',
                display: 'flex',
                alignItems: 'center',
                gap: 2
            }}>
                <DollarSign size={24} color="#00CC88" />
                Aprobaciones Financieras Pendientes
            </DialogTitle>
            <DialogContent sx={{ p: 0 }}>
                <TableContainer sx={{ maxHeight: '60vh' }}>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ backgroundColor: '#2C2C2C', color: '#BBBBBB' }}>Urgente</TableCell>
                                <TableCell sx={{ backgroundColor: '#2C2C2C', color: '#BBBBBB' }}>Fecha de pago</TableCell>
                                <TableCell sx={{ backgroundColor: '#2C2C2C', color: '#BBBBBB' }}>Categoría</TableCell>
                                <TableCell sx={{ backgroundColor: '#2C2C2C', color: '#BBBBBB' }}>Subcategoría</TableCell>
                                <TableCell sx={{ backgroundColor: '#2C2C2C', color: '#BBBBBB' }}>Concepto</TableCell>
                                <TableCell sx={{ backgroundColor: '#2C2C2C', color: '#BBBBBB' }}>Comentarios SSC</TableCell>
                                <TableCell sx={{ backgroundColor: '#2C2C2C', color: '#BBBBBB' }}>Suma</TableCell>
                                <TableCell sx={{ backgroundColor: '#2C2C2C', color: '#BBBBBB' }}>Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {pendingApprovals.map((approval) => (
                                <TableRow key={approval.id} hover sx={{ '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.05)' } }}>
                                    <TableCell>
                                        <Chip
                                            label={approval.urgent ? 'Urgente' : 'Normal'}
                                            size="small"
                                            sx={{
                                                backgroundColor: approval.urgent ? 'rgba(255, 45, 85, 0.2)' : 'rgba(0, 204, 136, 0.2)',
                                                color: approval.urgent ? '#FF2D55' : '#00CC88',
                                                fontSize: '0.75rem',
                                                height: '24px',
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell sx={{ color: '#FFFFFF' }}>
                                        {new Date(approval.paymentDate).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell sx={{ color: '#FFFFFF' }}>{approval.category}</TableCell>
                                    <TableCell sx={{ color: '#FFFFFF' }}>{approval.subcategory}</TableCell>
                                    <TableCell sx={{ color: '#FFFFFF' }}>{approval.concept}</TableCell>
                                    <TableCell sx={{ color: '#FFFFFF' }}>{approval.sscComments}</TableCell>
                                    <TableCell sx={{ color: '#00CC88', fontWeight: 600 }}>
                                        ${approval.amount.toLocaleString()}
                                    </TableCell>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', gap: 1 }}>
                                            <Button
                                                variant="contained"
                                                size="small"
                                                startIcon={<CheckCircle size={16} />}
                                                onClick={() => approveExpense(approval.id)}
                                                sx={{
                                                    backgroundColor: 'rgba(0, 204, 136, 0.2)',
                                                    color: '#00CC88',
                                                    '&:hover': {
                                                        backgroundColor: 'rgba(0, 204, 136, 0.3)',
                                                    },
                                                    textTransform: 'none',
                                                    fontSize: '0.75rem',
                                                }}
                                            >
                                                Aprobar Erogación
                                            </Button>
                                            <Button
                                                variant="contained"
                                                size="small"
                                                startIcon={<XCircle size={16} />}
                                                onClick={() => rejectExpense(approval.id)}
                                                sx={{
                                                    backgroundColor: 'rgba(255, 45, 85, 0.2)',
                                                    color: '#FF2D55',
                                                    '&:hover': {
                                                        backgroundColor: 'rgba(255, 45, 85, 0.3)',
                                                    },
                                                    textTransform: 'none',
                                                    fontSize: '0.75rem',
                                                }}
                                            >
                                                Cancelar Erogación
                                            </Button>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {pendingApprovals.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={8} sx={{ textAlign: 'center', py: 4, color: '#BBBBBB' }}>
                                        No hay aprobaciones pendientes
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </DialogContent>
            <DialogActions sx={{ borderTop: '1px solid #333333', p: 2 }}>
                <Button 
                    onClick={onClose}
                    sx={{
                        color: '#FFFFFF',
                        '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        },
                        textTransform: 'none',
                    }}
                >
                    Cerrar
                </Button>
            </DialogActions>
        </Dialog>
    );
};