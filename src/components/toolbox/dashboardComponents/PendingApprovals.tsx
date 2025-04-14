import React, { useState } from 'react';
import { 
  IconButton, 
  Badge, 
  Popper, 
  Grow, 
  Paper, 
  ClickAwayListener,
  Box,
  Typography,
  Button,
  Chip,
} from '@mui/material';
import { DollarSign, TrendingUp, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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
                    scale: 1.03,
                    boxShadow: '0 10px 30px rgba(0, 204, 136, 0.3)'
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                onClick={handleOpenModal}
                sx={{
                    p: 3,
                    borderRadius: '12px',
                    transition: 'all 0.3s ease-in-out',
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    position: 'relative',
                    cursor: 'pointer',
                    overflow: 'hidden',
                    background: 'linear-gradient(135deg, #00CC88 0%, #007755 100%)',
                    border: '1px solid #00CC88',
                    boxShadow: '0 8px 24px rgba(0, 204, 136, 0.2)',
                    color: '#FFFFFF',
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.15) 0%, rgba(0, 0, 0, 0) 70%)',
                        pointerEvents: 'none',
                    }
                }}
            >
                {/* Notification Badge in top-right corner - Now shows "?" when count > 0 */}
                {count > 0 && (
                    <motion.div
                        whileHover={{ scale: 1.3 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        style={{
                            position: 'absolute',
                            top: 12,
                            right: 12,
                            zIndex: 10
                        }}
                    >
                        <Badge
                            badgeContent="?"
                            color="default"
                            sx={{
                                '& .MuiBadge-badge': {
                                    background: 'linear-gradient(135deg, #FFFFFF 0%, #E0FFF0 100%)',
                                    color: '#00AA77',
                                    fontWeight: 800,
                                    fontSize: '1.5rem',
                                    minWidth: '50px',
                                    height: '50px',
                                    borderRadius: '25px',
                                    padding: '0 8px',
                                    transition: 'all 0.3s ease',
                                    boxShadow: '0 0 20px rgba(255, 255, 255, 0.6), 0 0 30px rgba(0, 204, 136, 0.4)'
                                }
                            }}
                        />
                    </motion.div>
                )}

                <Typography
                    variant="h6"
                    sx={{
                        fontSize: '1.25rem',
                        fontWeight: 700,
                        color: '#FFFFFF',
                        mb: 2,
                        textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                    }}
                >
                    APROBACIONES PENDIENTES
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 2 }}>
                    {/* Replaced dollar sign icon with the count number */}
                    <Box
                        component={motion.div}
                        whileHover={{ scale: 1.1 }}
                        animate={{ 
                            boxShadow: ['0 0 20px rgba(255, 255, 255, 0.4)', '0 0 40px rgba(255, 255, 255, 0.6)', '0 0 20px rgba(255, 255, 255, 0.4)'],
                        }}
                        transition={{ 
                            duration: 2,
                            repeat: Infinity,
                            repeatType: "reverse"
                        }}
                        sx={{
                            width: 80,
                            height: 80,
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, #FFFFFF 0%, #E0FFF0 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 0 30px rgba(255, 255, 255, 0.5), 0 0 50px rgba(0, 204, 136, 0.3)',
                            position: 'relative',
                            '&::after': {
                                content: '""',
                                position: 'absolute',
                                top: -5,
                                left: -5,
                                right: -5,
                                bottom: -5,
                                borderRadius: '50%',
                                border: '2px solid rgba(255, 255, 255, 0.3)',
                                animation: 'pulse 2s infinite',
                            }
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: '2.5rem',
                                fontWeight: 800,
                                background: 'linear-gradient(135deg, #007755 0%, #00AA77 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                            }}
                        >
                            {count}
                        </Typography>
                    </Box>
                    <Box>
                        <Typography
                            sx={{
                                fontSize: '1rem',
                                color: '#FFFFFF',
                                maxWidth: '200px',
                                lineHeight: 1.4,
                                fontWeight: 500,
                                textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
                            }}
                        >
                            Aprobaciones financieras requieren tu atención
                        </Typography>
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            mt: 1,
                            background: 'rgba(255, 255, 255, 0.2)',
                            borderRadius: '20px',
                            px: 2,
                            py: 0.5,
                            width: 'fit-content'
                        }}>
                            <TrendingUp size={16} color="#FFFFFF" />
                            <Typography
                                sx={{
                                    fontSize: '0.875rem',
                                    fontWeight: 600,
                                    color: '#FFFFFF',
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