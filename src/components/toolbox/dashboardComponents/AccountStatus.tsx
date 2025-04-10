import React from 'react';
import { Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box } from '@mui/material';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

interface AccountItem {
    account: string;
    balance: number;
    pending: number;
    status: string;
    lastUpdate: string;
}

interface AccountStatusProps {
    accounts: AccountItem[];
}

export const AccountStatus: React.FC<AccountStatusProps> = ({ accounts }) => {
    return (
        <Paper
            sx={{
                p: 3,
                borderRadius: '12px',
                backgroundColor: '#1E1E1E',
                border: '1px solid #333333',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <Typography
                variant="h6"
                sx={{
                    fontSize: '1.125rem',
                    fontWeight: 600,
                    color: '#00CC88',
                    mb: 2, // Reduced margin
                }}
            >
                ESTADO DE CUENTAS
            </Typography>

            <TableContainer sx={{ flex: 1, overflowY: 'auto' }}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <Typography sx={{ color: '#BBBBBB', fontSize: '0.8rem' }}> {/* Smaller font */}
                                    Cuenta
                                </Typography>
                            </TableCell>
                            <TableCell align="right">
                                <Typography sx={{ color: '#BBBBBB', fontSize: '0.8rem' }}> {/* Smaller font */}
                                    Balance
                                </Typography>
                            </TableCell>
                            <TableCell align="right">
                                <Typography sx={{ color: '#BBBBBB', fontSize: '0.8rem' }}> {/* Smaller font */}
                                    Pendiente
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
                        {accounts.map((account, index) => (
                            <TableRow
                                key={index}
                                sx={{
                                    transition: 'background-color 0.2s ease',
                                    '&:hover': {
                                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                    },
                                    height: '48px', // Fixed height for rows
                                }}
                            >
                                <TableCell>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Box
                                            sx={{
                                                width: 24,
                                                height: 24,
                                                borderRadius: '6px',
                                                backgroundColor: 'rgba(0, 204, 136, 0.2)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                color: '#00CC88',
                                            }}
                                        >
                                            <DollarSign size={14} />
                                        </Box>
                                        <Typography
                                            sx={{
                                                color: '#FFFFFF',
                                                fontWeight: 500,
                                                fontSize: '0.8rem', // Smaller font
                                            }}
                                        >
                                            {account.account}
                                        </Typography>
                                    </Box>
                                </TableCell>
                                <TableCell align="right">
                                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 0.5 }}>
                                        <TrendingUp size={12} color="#00CC88" /> {/* Smaller icon */}
                                        <Typography
                                            sx={{
                                                color: '#00CC88',
                                                fontWeight: 500,
                                                fontSize: '0.8rem', // Smaller font
                                            }}
                                        >
                                            ${account.balance.toLocaleString()}
                                        </Typography>
                                    </Box>
                                </TableCell>
                                <TableCell align="right">
                                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 0.5 }}>
                                        {account.pending > 0 && 
                                            <TrendingDown size={12} color="#FFFFFF" />
                                        }
                                        <Typography
                                            sx={{
                                                color: account.pending > 0 ? '#FFFFFF' : '#BBBBBB',
                                                fontWeight: account.pending > 0 ? 500 : 400,
                                                fontSize: '0.8rem', // Smaller font
                                            }}
                                        >
                                            ${account.pending.toLocaleString()}
                                        </Typography>
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Box
                                        sx={{
                                            px: 1,
                                            py: 0.25,
                                            borderRadius: '4px',
                                            backgroundColor: account.status === 'active' ? 'rgba(0, 204, 136, 0.2)' : 'rgba(255, 255, 255, 0.2)',
                                            width: 'fit-content',
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                color: account.status === 'active' ? '#00CC88' : '#FFFFFF',
                                                fontSize: '0.7rem', // Smaller font
                                                fontWeight: 500,
                                            }}
                                        >
                                            {account.status === 'active' ? 'Activa' : 'Inactiva'}
                                        </Typography>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Additional information section */}
            <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid #333333' }}>
                <Typography
                    variant="subtitle2"
                    sx={{
                        fontSize: '0.8rem',
                        color: '#FFFFFF',
                        fontWeight: 600,
                        mb: 1.5,
                    }}
                >
                    Resumen financiero
                </Typography>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box sx={{ textAlign: 'center', flex: 1 }}>
                        <Typography sx={{ fontSize: '0.7rem', color: '#BBBBBB', mb: 0.5 }}>
                            Total balance
                        </Typography>
                        <Typography sx={{ fontSize: '1.1rem', fontWeight: 600, color: '#00CC88' }}>
                            ${accounts.reduce((sum, acc) => sum + acc.balance, 0).toLocaleString()}
                        </Typography>
                    </Box>
                    
                    <Box sx={{ textAlign: 'center', flex: 1 }}>
                        <Typography sx={{ fontSize: '0.7rem', color: '#BBBBBB', mb: 0.5 }}>
                            Total pendiente
                        </Typography>
                        <Typography sx={{ fontSize: '1.1rem', fontWeight: 600, color: '#FFFFFF' }}>
                            ${accounts.reduce((sum, acc) => sum + acc.pending, 0).toLocaleString()}
                        </Typography>
                    </Box>
                    
                    <Box sx={{ textAlign: 'center', flex: 1 }}>
                        <Typography sx={{ fontSize: '0.7rem', color: '#BBBBBB', mb: 0.5 }}>
                            Cuentas activas
                        </Typography>
                        <Typography sx={{ fontSize: '1.1rem', fontWeight: 600, color: '#00CC88' }}>
                            {accounts.filter(acc => acc.status === 'active').length}/{accounts.length}
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Paper>
    );
};