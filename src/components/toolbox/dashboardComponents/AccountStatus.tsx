import React from 'react';
import { Grid, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

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
    return (
        <Grid item xs={12} lg={6}>
            <Paper
                sx={{
                    p: 3,
                    borderRadius: '12px',
                    backgroundColor: 'var(--surface-primary)',
                    height: '100%',
                }}
                className="glass-effect"
            >
                <Typography
                    variant="h6"
                    sx={{
                        fontSize: '1.125rem',
                        fontWeight: 600,
                        color: 'var(--text-primary)',
                        mb: 3,
                    }}
                >
                    ESTADO DE CUENTAS
                </Typography>
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
                                <TableRow key={index}>
                                    <TableCell>
                                        <Typography
                                            sx={{
                                                color: 'var(--text-primary)',
                                                fontWeight: account.item?.includes('Total') ? 500 : 400,
                                                fontSize: '0.875rem',
                                            }}
                                        >
                                            {account.item}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Typography
                                            sx={{
                                                color: (account.montoBancarizado || 0) > 0 ? '#30d158' : 'var(--text-primary)',
                                                fontWeight: account.item?.includes('Total') ? 500 : 400,
                                                fontSize: '0.875rem',
                                            }}
                                        >
                                            ${(account.montoBancarizado || 0).toLocaleString()}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Typography
                                            sx={{
                                                color: (account.montoDespacho || 0) > 0 ? '#30d158' : 'var(--text-primary)',
                                                fontWeight: account.item?.includes('Total') ? 500 : 400,
                                                fontSize: '0.875rem',
                                            }}
                                        >
                                            ${(account.montoDespacho || 0).toLocaleString()}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Typography
                                            sx={{
                                                color: (account.efectivo || 0) > 0 ? '#30d158' : 'var(--text-primary)',
                                                fontWeight: account.item?.includes('Total') ? 500 : 400,
                                                fontSize: '0.875rem',
                                            }}
                                        >
                                            ${(account.efectivo || 0).toLocaleString()}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Typography
                                            sx={{
                                                color: (account.credito || 0) > 0 ? '#ff9500' : 'var(--text-primary)',
                                                fontWeight: account.item?.includes('Total') ? 500 : 400,
                                                fontSize: '0.875rem',
                                            }}
                                        >
                                            ${(account.credito || 0).toLocaleString()}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Typography
                                            sx={{
                                                color: (account.deuda || 0) > 0 ? '#ff2d55' : 'var(--text-primary)',
                                                fontWeight: account.item?.includes('Total') ? 500 : 400,
                                                fontSize: '0.875rem',
                                            }}
                                        >
                                            ${(account.deuda || 0).toLocaleString()}
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Grid>
    );
};