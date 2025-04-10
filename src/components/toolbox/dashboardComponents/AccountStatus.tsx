import React from 'react';
import { Grid, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip } from '@mui/material';

interface AccountItem {
    account: string;
    balance: number;
    pending: number;
    status: 'active' | 'inactive';
    lastUpdate: string;
}

interface AccountStatusProps {
    accounts: AccountItem[];
}

export const AccountStatus: React.FC<AccountStatusProps> = ({ accounts }) => {
    return (
        <Grid item xs={12} lg={8}>
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
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Cuenta</TableCell>
                                <TableCell align="right">Balance</TableCell>
                                <TableCell align="right">Pendiente</TableCell>
                                <TableCell>Estado</TableCell>
                                <TableCell>Última Actualización</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {accounts.map((account, index) => (
                                <TableRow key={index}>
                                    <TableCell>
                                        <Typography
                                            sx={{
                                                color: 'var(--text-primary)',
                                                fontWeight: 500,
                                            }}
                                        >
                                            {account.account}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Typography
                                            sx={{
                                                color: '#30d158',
                                                fontWeight: 600,
                                            }}
                                        >
                                            ${account.balance.toLocaleString()}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Typography
                                            sx={{
                                                color: account.pending > 0 ? '#ff9500' : 'var(--text-secondary)',
                                                fontWeight: account.pending > 0 ? 600 : 400,
                                            }}
                                        >
                                            ${account.pending.toLocaleString()}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            label={account.status === 'active' ? 'Activa' : 'Inactiva'}
                                            size="small"
                                            sx={{
                                                backgroundColor: account.status === 'active' ? 'rgba(48, 209, 88, 0.1)' : 'rgba(255, 45, 85, 0.1)',
                                                color: account.status === 'active' ? '#30d158' : '#ff2d55',
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            sx={{
                                                color: 'var(--text-secondary)',
                                                fontSize: '0.875rem',
                                            }}
                                        >
                                            {new Date(account.lastUpdate).toLocaleDateString()}
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