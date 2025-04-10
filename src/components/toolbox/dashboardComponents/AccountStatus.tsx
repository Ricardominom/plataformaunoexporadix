import React from 'react';
import { Grid, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box, Tooltip, IconButton } from '@mui/material';
import { Info, TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

interface AccountItem {
    item: string;
    montoBancarizado: number;
    montoDespacho: number;
    efectivo: number;
    credito: number;
    deuda: number;
    observaciones: string;
}

interface AccountStatusProps {
    accounts: AccountItem[];
}

export const AccountStatus: React.FC<AccountStatusProps> = ({ accounts }) => {
    const getTotalAmount = (account: AccountItem) => {
        return (account.montoBancarizado || 0) +
            (account.montoDespacho || 0) +
            (account.efectivo || 0) +
            (account.credito || 0) -
            (account.deuda || 0);
    };

    return (
        <Grid item xs={12} lg={6}>
            <Paper
                sx={{
                    p: 3,
                    borderRadius: '12px',
                    backgroundColor: 'var(--surface-primary)',
                    height: '100%',
                    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                    '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
                    },
                }}
                className="glass-effect"
            >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography
                        variant="h6"
                        sx={{
                            fontSize: '1.125rem',
                            fontWeight: 600,
                            color: 'var(--text-primary)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                        }}
                    >
                        ESTADO DE CUENTAS
                        <Tooltip title="Resumen detallado del estado financiero de las cuentas" arrow>
                            <IconButton size="small" sx={{ color: 'var(--text-secondary)' }}>
                                <Info size={16} />
                            </IconButton>
                        </Tooltip>
                    </Typography>
                </Box>

                <TableContainer sx={{ maxHeight: 400 }}>
                    <Table sx={{
                        '& .MuiTableCell-root': {
                            py: 1.5,
                            px: 2,
                            '&:last-child': {
                                pr: 2,
                            },
                        },
                    }}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Item</TableCell>
                                <TableCell align="right">Bancarizado</TableCell>
                                <TableCell align="right">Despacho</TableCell>
                                <TableCell align="right">Efectivo</TableCell>
                                <TableCell align="right">Crédito</TableCell>
                                <TableCell align="right">Deuda</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {accounts.map((account, index) => (
                                <TableRow
                                    key={index}
                                    sx={{
                                        transition: 'background-color 0.2s ease',
                                        '&:hover': {
                                            backgroundColor: 'var(--hover-bg)',
                                        },
                                        ...(account.item?.includes('Total') && {
                                            backgroundColor: 'var(--surface-secondary)',
                                        }),
                                    }}
                                >
                                    <TableCell>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            {account.item?.includes('Total') && (
                                                <Box
                                                    sx={{
                                                        width: 24,
                                                        height: 24,
                                                        borderRadius: '6px',
                                                        backgroundColor: 'rgba(0, 113, 227, 0.1)',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        color: '#0071e3',
                                                    }}
                                                >
                                                    <DollarSign size={14} />
                                                </Box>
                                            )}
                                            <Typography
                                                sx={{
                                                    color: 'var(--text-primary)',
                                                    fontWeight: account.item?.includes('Total') ? 600 : 400,
                                                    fontSize: '0.875rem',
                                                }}
                                            >
                                                {account.item}
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                    {['montoBancarizado', 'montoDespacho', 'efectivo', 'credito', 'deuda'].map((field) => (
                                        <TableCell key={field} align="right">
                                            <Tooltip
                                                title={`${field === 'deuda' ? 'Deuda pendiente' : 'Monto disponible'}: $${account[field as keyof AccountItem]?.toLocaleString() || 0}`}
                                                arrow
                                                placement="top"
                                            >
                                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 1 }}>
                                                    {(account[field as keyof AccountItem] || 0) > 0 && (
                                                        <Box
                                                            component={field === 'deuda' ? TrendingDown : TrendingUp}
                                                            sx={{
                                                                color: field === 'deuda' ? '#ff2d55' :
                                                                    field === 'credito' ? '#ff9500' : '#30d158',
                                                                size: 16,
                                                            }}
                                                        />
                                                    )}
                                                    <Typography
                                                        sx={{
                                                            color: (account[field as keyof AccountItem] || 0) > 0
                                                                ? field === 'deuda' ? '#ff2d55' :
                                                                    field === 'credito' ? '#ff9500' : '#30d158'
                                                                : 'var(--text-primary)',
                                                            fontWeight: account.item?.includes('Total') ? 600 : 400,
                                                            fontSize: '0.875rem',
                                                        }}
                                                    >
                                                        ${(account[field as keyof AccountItem] || 0).toLocaleString()}
                                                    </Typography>
                                                </Box>
                                            </Tooltip>
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Grid>
    );
};