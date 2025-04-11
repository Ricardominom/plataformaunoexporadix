import React, { useState } from 'react';
import {
    Paper,
    Typography,
    Box,
    Badge,
    Button,
    Chip,
    IconButton
} from '@mui/material';
import { DollarSign, TrendingUp, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { useMoneyApprovals } from '../../../hooks/useMoneyApprovals';
import { MoneyApprovalsModal } from './MoneyApprovalsModal';

interface PendingApprovalsProps {
    count: number;
}

export const PendingApprovals: React.FC<PendingApprovalsProps> = ({ count: initialCount }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { count } = useMoneyApprovals();

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
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

            {/* Money Approvals Modal */}
            <MoneyApprovalsModal
                open={isModalOpen}
                onClose={handleCloseModal}
            />
        </>
    );
};