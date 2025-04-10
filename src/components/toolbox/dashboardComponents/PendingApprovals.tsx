import React, { useState } from 'react';
import { 
    Paper, 
    Typography, 
    Box, 
    Badge, 
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
    IconButton
} from '@mui/material';
import { DollarSign, TrendingUp, CheckCircle, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useMoneyApprovals } from '../../../hooks/useMoneyApprovals';

interface PendingApprovalsProps {
    count: number;
}

export const PendingApprovals: React.FC<PendingApprovalsProps> = ({ count: initialCount }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { 
        pendingApprovals, 
        approveExpense, 
        rejectExpense, 
        count 
    } = useMoneyApprovals();

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleApprove = (id: string) => {
        approveExpense(id);
    };

    const handleReject = (id: string) => {
        rejectExpense(id);
    };

    return (
        <>
            <Paper
                component={motion.div}
                whileHover={{ 
                    scale: 1.02,
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)'
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                onClick={handleOpenModal}
                sx={{
                    p: 3,
                    borderRadius: '12px',
                    backgroundColor: '#1E1E1E',
                    border: '1px solid #333333',
                    transition: 'all 0.3s ease-in-out',
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    position: 'relative',
                    cursor: 'pointer',
                    overflow: 'hidden',
                    '&::after': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'radial-gradient(circle at center, rgba(0, 204, 136, 0.05) 0%, rgba(0, 0, 0, 0) 70%)',
                        pointerEvents: 'none',
                    }
                }}
            >
                {/* Notification Badge in top-right corner - SIGNIFICANTLY INCREASED SIZE with hover effect */}
                <motion.div
                    whileHover={{ scale: 1.3 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    style={{
                        position: 'absolute',
                        top: 12,
                        right: 12,
                        zIndex: 10
                    }}
                >
                    <Badge
                        badgeContent={count}
                        color="default"
                        sx={{
                            '& .MuiBadge-badge': {
                                backgroundColor: '#00CC88',
                                color: '#FFFFFF',
                                fontWeight: 600,
                                fontSize: '1.25rem', // Further increased font size
                                minWidth: '50px', // Further increased width
                                height: '50px', // Further increased height
                                borderRadius: '25px', // Increased border radius to maintain circular shape
                                padding: '0 8px', // Added padding for better text display
                                transition: 'all 0.3s ease', // Smooth transition for hover effect
                            }
                        }}
                    />
                </motion.div>

                <Typography
                    variant="h6"
                    sx={{
                        fontSize: '1.125rem',
                        fontWeight: 600,
                        color: '#00CC88',
                        mb: 2, // Reduced margin for better spacing
                    }}
                >
                    APROBACIONES PENDIENTES
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 2 }}>
                    <Box
                        sx={{
                            width: 56, // Slightly smaller
                            height: 56, // Slightly smaller
                            borderRadius: '12px',
                            backgroundColor: 'rgba(0, 204, 136, 0.2)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#00CC88',
                        }}
                    >
                        <DollarSign size={28} /> {/* Slightly smaller */}
                    </Box>
                    <Box>
                        <Typography
                            sx={{
                                fontSize: '0.8rem', // Slightly smaller
                                color: '#BBBBBB',
                                maxWidth: '200px',
                                lineHeight: 1.4,
                            }}
                        >
                            Aprobaciones financieras requieren tu atención
                        </Typography>
                        <Box sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: 1,
                            mt: 1
                        }}>
                            <TrendingUp size={16} color="#00CC88" />
                            <Typography
                                sx={{
                                    fontSize: '0.875rem',
                                    fontWeight: 500,
                                    color: '#00CC88',
                                }}
                            >
                                Actualizado hoy
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Paper>

            {/* Modal with Money Approvals Table */}
            <Dialog
                open={isModalOpen}
                onClose={handleCloseModal}
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
                                                    onClick={() => handleApprove(approval.id)}
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
                                                    Aprobar
                                                </Button>
                                                <Button
                                                    variant="contained"
                                                    size="small"
                                                    startIcon={<XCircle size={16} />}
                                                    onClick={() => handleReject(approval.id)}
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
                                                    Rechazar
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
                        onClick={handleCloseModal}
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
        </>
    );
};