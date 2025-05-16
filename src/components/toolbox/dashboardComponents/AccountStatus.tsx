import React from 'react';
import { Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box } from '@mui/material';
import { DollarSign } from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext';

interface AccountItem {
    id?: string;
    account: string;
    balance: number;
    pending: number;
    status: string;
    lastUpdate: string;
    montoBancarizado?: number;
    montoDespacho?: number;
    efectivo?: number;
    credito?: number;
    deuda?: number;
    observaciones?: string;
}

interface AccountStatusProps {
    accounts: AccountItem[];
}

export const AccountStatus: React.FC<AccountStatusProps> = ({ accounts }) => {
    const { theme } = useTheme();
    const isDarkMode = theme === 'dark';

    return (
        <Paper
            sx={{
                p: 3,
                borderRadius: '12px',
                backgroundColor: isDarkMode ? '#1E1E1E' : '#FFFFFF',
                border: isDarkMode ? '1px solid #333333' : '1px solid rgba(0, 0, 0, 0.1)',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'background-color 0.3s ease, border-color 0.3s ease',
            }}
        >
            <Typography
                variant="h6"
                sx={{
                    fontSize: '1.125rem',
                    fontWeight: 600,
                    color: isDarkMode ? '#00CC88' : '#0071e3',
                    mb: 2, // Reduced margin
                    transition: 'color 0.3s ease',
                }}
            >
                ESTADO DE CUENTAS
            </Typography>

            <TableContainer sx={{ flex: 1, overflowY: 'auto', maxHeight: 'calc(100% - 60px)' }}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <Typography sx={{ color: isDarkMode ? '#BBBBBB' : '#86868b', fontSize: '0.8rem', transition: 'color 0.3s ease' }}>
                                    Cuenta
                                </Typography>
                            </TableCell>
                            <TableCell align="right">
                                <Typography sx={{ color: isDarkMode ? '#BBBBBB' : '#86868b', fontSize: '0.8rem', transition: 'color 0.3s ease' }}>
                                    Monto Bancarizado
                                </Typography>
                            </TableCell>
                            <TableCell align="right">
                                <Typography sx={{ color: isDarkMode ? '#BBBBBB' : '#86868b', fontSize: '0.8rem', transition: 'color 0.3s ease' }}>
                                    Monto Despacho
                                </Typography>
                            </TableCell>
                            <TableCell align="right">
                                <Typography sx={{ color: isDarkMode ? '#BBBBBB' : '#86868b', fontSize: '0.8rem', transition: 'color 0.3s ease' }}>
                                    Efectivo
                                </Typography>
                            </TableCell>
                            <TableCell align="right">
                                <Typography sx={{ color: isDarkMode ? '#BBBBBB' : '#86868b', fontSize: '0.8rem', transition: 'color 0.3s ease' }}>
                                    Crédito
                                </Typography>
                            </TableCell>
                            <TableCell align="right">
                                <Typography sx={{ color: isDarkMode ? '#BBBBBB' : '#86868b', fontSize: '0.8rem', transition: 'color 0.3s ease' }}>
                                    Deuda
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography sx={{ color: isDarkMode ? '#BBBBBB' : '#86868b', fontSize: '0.8rem', transition: 'color 0.3s ease' }}>
                                    Observaciones
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
                                        backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
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
                                                backgroundColor: isDarkMode ? 'rgba(0, 204, 136, 0.2)' : 'rgba(0, 113, 227, 0.1)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                color: isDarkMode ? '#00CC88' : '#0071e3',
                                                transition: 'background-color 0.3s ease, color 0.3s ease',
                                            }}
                                        >
                                            <DollarSign size={14} />
                                        </Box>
                                        <Typography
                                            sx={{
                                                color: isDarkMode ? '#FFFFFF' : '#1d1d1f',
                                                fontWeight: 500,
                                                fontSize: '0.8rem',
                                                transition: 'color 0.3s ease',
                                            }}
                                        >
                                            {account.account}
                                        </Typography>
                                    </Box>
                                </TableCell>
                                <TableCell align="right">
                                    <Typography
                                        sx={{
                                            color: isDarkMode ? '#00CC88' : '#0071e3',
                                            fontWeight: 500,
                                            fontSize: '0.8rem',
                                            transition: 'color 0.3s ease',
                                        }}
                                    >
                                        ${account.montoBancarizado?.toLocaleString() || 0}
                                    </Typography>
                                </TableCell>
                                <TableCell align="right">
                                    <Typography
                                        sx={{
                                            color: isDarkMode ? '#FFFFFF' : '#1d1d1f',
                                            fontWeight: 500,
                                            fontSize: '0.8rem',
                                            transition: 'color 0.3s ease',
                                        }}
                                    >
                                        ${account.montoDespacho?.toLocaleString() || 0}
                                    </Typography>
                                </TableCell>
                                <TableCell align="right">
                                    <Typography
                                        sx={{
                                            color: isDarkMode ? '#FFFFFF' : '#1d1d1f',
                                            fontWeight: 500,
                                            fontSize: '0.8rem',
                                            transition: 'color 0.3s ease',
                                        }}
                                    >
                                        ${account.efectivo?.toLocaleString() || 0}
                                    </Typography>
                                </TableCell>
                                <TableCell align="right">
                                    <Typography
                                        sx={{
                                            color: isDarkMode ? '#FFFFFF' : '#1d1d1f',
                                            fontWeight: 500,
                                            fontSize: '0.8rem',
                                            transition: 'color 0.3s ease',
                                        }}
                                    >
                                        ${account.credito?.toLocaleString() || 0}
                                    </Typography>
                                </TableCell>
                                <TableCell align="right">
                                    <Typography
                                        sx={{
                                            color: isDarkMode ? '#FFFFFF' : '#1d1d1f',
                                            fontWeight: 500,
                                            fontSize: '0.8rem',
                                            transition: 'color 0.3s ease',
                                        }}
                                    >
                                        ${account.deuda?.toLocaleString() || 0}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography
                                        sx={{
                                            color: isDarkMode ? '#BBBBBB' : '#86868b',
                                            fontSize: '0.8rem',
                                            maxWidth: 150,
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap',
                                            transition: 'color 0.3s ease',
                                        }}
                                    >
                                        {account.observaciones || '-'}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        ))}
                        {accounts.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={7} align="center" sx={{ py: 3 }}>
                                    <Typography sx={{ color: isDarkMode ? '#BBBBBB' : '#86868b', transition: 'color 0.3s ease' }}>
                                        No hay cuentas disponibles
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Additional information section */}
            <Box sx={{ mt: 2, pt: 2, borderTop: isDarkMode ? '1px solid #333333' : '1px solid rgba(0, 0, 0, 0.1)', transition: 'border-color 0.3s ease' }}>
                <Typography
                    variant="subtitle2"
                    sx={{
                        fontSize: '0.8rem',
                        color: isDarkMode ? '#FFFFFF' : '#1d1d1f',
                        fontWeight: 600,
                        mb: 1.5,
                        transition: 'color 0.3s ease',
                    }}
                >
                    Resumen financiero
                </Typography>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box sx={{ textAlign: 'center', flex: 1 }}>
                        <Typography sx={{ fontSize: '0.7rem', color: isDarkMode ? '#BBBBBB' : '#86868b', mb: 0.5, transition: 'color 0.3s ease' }}>
                            Total bancarizado
                        </Typography>
                        <Typography sx={{ fontSize: '1.1rem', fontWeight: 600, color: isDarkMode ? '#00CC88' : '#0071e3', transition: 'color 0.3s ease' }}>
                            ${accounts.reduce((sum, acc) => sum + (acc.montoBancarizado || 0), 0).toLocaleString()}
                        </Typography>
                    </Box>
                    
                    <Box sx={{ textAlign: 'center', flex: 1 }}>
                        <Typography sx={{ fontSize: '0.7rem', color: isDarkMode ? '#BBBBBB' : '#86868b', mb: 0.5, transition: 'color 0.3s ease' }}>
                            Total despacho
                        </Typography>
                        <Typography sx={{ fontSize: '1.1rem', fontWeight: 600, color: isDarkMode ? '#FFFFFF' : '#1d1d1f', transition: 'color 0.3s ease' }}>
                            ${accounts.reduce((sum, acc) => sum + (acc.montoDespacho || 0), 0).toLocaleString()}
                        </Typography>
                    </Box>
                    
                    <Box sx={{ textAlign: 'center', flex: 1 }}>
                        <Typography sx={{ fontSize: '0.7rem', color: isDarkMode ? '#BBBBBB' : '#86868b', mb: 0.5, transition: 'color 0.3s ease' }}>
                            Total deuda
                        </Typography>
                        <Typography sx={{ fontSize: '1.1rem', fontWeight: 600, color: '#FF2D55', transition: 'color 0.3s ease' }}>
                            ${accounts.reduce((sum, acc) => sum + (acc.deuda || 0), 0).toLocaleString()}
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Paper>
    );
};