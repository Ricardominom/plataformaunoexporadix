import React, { useState } from 'react';
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
import { DollarSign, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useMoneyApprovals } from '../../../hooks/useMoneyApprovals';

interface MoneyApprovalsModalProps {
    open: boolean;
    onClose: () => void;
}

interface ConfirmationDialogProps {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    onConfirm: () => void;
    title: string;
    message: string;
    confirmText: string;
    confirmColor: string;
    confirmIcon: React.ReactNode;
}

// Reusable confirmation dialog component
const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
    isOpen,
    onOpenChange,
    onConfirm,
    title,
    message,
    confirmText,
    confirmColor,
    confirmIcon,
}) => {
    return (
        <Dialog
            open={isOpen}
            onClose={() => onOpenChange(false)}
            PaperProps={{
                elevation: 0,
                component: motion.div,
                initial: { opacity: 0, y: 20, scale: 0.9 },
                animate: { opacity: 1, y: 0, scale: 1 },
                exit: { opacity: 0, y: 20, scale: 0.9 },
                transition: { duration: 0.2 },
                sx: {
                    borderRadius: '12px',
                    backgroundColor: '#1E1E1E',
                    border: '1px solid #333333',
                    maxWidth: '400px',
                    width: '100%',
                    mx: 2,
                },
            }}
        >
            <DialogTitle sx={{
                fontSize: '1.125rem',
                fontWeight: 600,
                color: '#FFFFFF',
                p: 3,
                borderBottom: '1px solid #333333',
                display: 'flex',
                alignItems: 'center',
                gap: 2,
            }}>
                <Box
                    sx={{
                        width: 40,
                        height: 40,
                        borderRadius: '10px',
                        backgroundColor: `${confirmColor}20`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <AlertCircle size={24} color={confirmColor} />
                </Box>
                {title}
            </DialogTitle>
            <DialogContent sx={{ p: 3, pt: 3 }}>
                <Typography sx={{ color: '#FFFFFF', lineHeight: 1.6 }}>
                    {message}
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
                    onClick={() => onOpenChange(false)}
                    sx={{
                        color: '#BBBBBB',
                        fontSize: '0.9375rem',
                        fontWeight: 500,
                        textTransform: 'none',
                        px: 3,
                        py: 1,
                        borderRadius: '8px',
                        '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            color: '#FFFFFF',
                        },
                    }}
                >
                    Cancelar
                </Button>
                <Button
                    onClick={onConfirm}
                    startIcon={confirmIcon}
                    sx={{
                        backgroundColor: `${confirmColor}20`,
                        color: confirmColor,
                        fontSize: '0.9375rem',
                        fontWeight: 500,
                        textTransform: 'none',
                        px: 3,
                        py: 1,
                        borderRadius: '8px',
                        boxShadow: 'none',
                        '&:hover': {
                            backgroundColor: `${confirmColor}30`,
                            boxShadow: `0 2px 8px ${confirmColor}20`,
                        },
                    }}
                >
                    {confirmText}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export const MoneyApprovalsModal: React.FC<MoneyApprovalsModalProps> = ({ open, onClose }) => {
    const { pendingApprovals, approveExpense, rejectExpense } = useMoneyApprovals();

    // State for confirmation dialogs
    const [approvalToConfirm, setApprovalToConfirm] = useState<string | null>(null);
    const [rejectionToConfirm, setRejectionToConfirm] = useState<string | null>(null);

    // Get approval details for confirmation message
    const getApprovalDetails = (id: string) => {
        const approval = pendingApprovals.find(a => a.id === id);
        return approval ? {
            concept: approval.concept,
            amount: approval.amount.toLocaleString()
        } : { concept: '', amount: '0' };
    };

    // Handle approve confirmation
    const handleApproveClick = (id: string) => {
        setApprovalToConfirm(id);
    };

    const handleApproveConfirm = () => {
        if (approvalToConfirm) {
            approveExpense(approvalToConfirm);
            setApprovalToConfirm(null);
        }
    };

    // Handle reject confirmation
    const handleRejectClick = (id: string) => {
        setRejectionToConfirm(id);
    };

    const handleRejectConfirm = () => {
        if (rejectionToConfirm) {
            rejectExpense(rejectionToConfirm);
            setRejectionToConfirm(null);
        }
    };

    return (
        <>
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
                                                    onClick={() => handleApproveClick(approval.id)}
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
                                                    onClick={() => handleRejectClick(approval.id)}
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

            {/* Approve Confirmation Dialog */}
            {approvalToConfirm && (
                <ConfirmationDialog
                    isOpen={!!approvalToConfirm}
                    onOpenChange={() => setApprovalToConfirm(null)}
                    onConfirm={handleApproveConfirm}
                    title="Confirmar Aprobación"
                    message={`¿Estás seguro de que deseas aprobar la erogación "${getApprovalDetails(approvalToConfirm).concept}" por $${getApprovalDetails(approvalToConfirm).amount}?`}
                    confirmText="Aprobar Erogación"
                    confirmColor="#00CC88"
                    confirmIcon={<CheckCircle size={18} />}
                />
            )}

            {/* Reject Confirmation Dialog */}
            {rejectionToConfirm && (
                <ConfirmationDialog
                    isOpen={!!rejectionToConfirm}
                    onOpenChange={() => setRejectionToConfirm(null)}
                    onConfirm={handleRejectConfirm}
                    title="Confirmar Cancelación"
                    message={`¿Estás seguro de que deseas cancelar la erogación "${getApprovalDetails(rejectionToConfirm).concept}" por $${getApprovalDetails(rejectionToConfirm).amount}?`}
                    confirmText="Cancelar Erogación"
                    confirmColor="#FF2D55"
                    confirmIcon={<XCircle size={18} />}
                />
            )}
        </>
    );
};