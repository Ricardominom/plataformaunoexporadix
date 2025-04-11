import React, { useState } from 'react';
import {
    Box,
    Button,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';
import { Plus } from 'lucide-react';
import { NewAccountDialog } from '../Forms/NewAccountDialog';
import { useNotification } from '../../../context/NotificationContext';

// Import mock data from centralized data module
import { balanceItems } from '../../../data/ssc';

export const AccountStatus: React.FC = () => {
    const [isNewAccountOpen, setIsNewAccountOpen] = useState(false);
    const [items, setItems] = useState(balanceItems.items);
    const { addNotification } = useNotification();

    const handleNewAccount = (account: {
        item: string;
        montoBancarizado: number;
        montoDespacho: number;
        efectivo: number;
        credito: number;
        deuda: number;
        observaciones: string;
    }) => {
        const newAccount = {
            id: (items.length + 1).toString(),
            ...account,
        };
        setItems([...items, newAccount]);
        setIsNewAccountOpen(false);
        addNotification('Cuenta agregada exitosamente');
    };

    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ color: 'var(--text-primary)' }}>
                    Estado de Cuentas
                </Typography>
                <Button
                    startIcon={<Plus size={16} />}
                    variant="outlined"
                    onClick={() => setIsNewAccountOpen(true)}
                    sx={{
                        color: '#ff2d55',
                        borderColor: '#ff2d55',
                        fontSize: '0.875rem',
                        fontWeight: 500,
                        textTransform: 'none',
                        px: 2.5,
                        borderRadius: '6px',
                        '&:hover': {
                            borderColor: '#ff2d55',
                            backgroundColor: 'rgba(255, 45, 85, 0.1)',
                        },
                    }}
                >
                    Agregar Cuenta
                </Button>
            </Box>

            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Item</TableCell>
                            <TableCell align="right">Monto Bancarizado</TableCell>
                            <TableCell align="right">Monto Despacho</TableCell>
                            <TableCell align="right">Efectivo</TableCell>
                            <TableCell align="right">Crédito</TableCell>
                            <TableCell align="right">Deuda</TableCell>
                            <TableCell>Observaciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {items.map((account) => (
                            <TableRow key={account.id}>
                                <TableCell>
                                    <Typography sx={{ color: 'var(--text-primary)' }}>
                                        {account.item}
                                    </Typography>
                                </TableCell>
                                <TableCell align="right">
                                    <Typography sx={{ color: 'var(--text-primary)' }}>
                                        ${account.montoBancarizado.toLocaleString()}
                                    </Typography>
                                </TableCell>
                                <TableCell align="right">
                                    <Typography sx={{ color: 'var(--text-primary)' }}>
                                        ${account.montoDespacho.toLocaleString()}
                                    </Typography>
                                </TableCell>
                                <TableCell align="right">
                                    <Typography sx={{ color: 'var(--text-primary)' }}>
                                        ${account.efectivo.toLocaleString()}
                                    </Typography>
                                </TableCell>
                                <TableCell align="right">
                                    <Typography sx={{ color: 'var(--text-primary)' }}>
                                        ${account.credito.toLocaleString()}
                                    </Typography>
                                </TableCell>
                                <TableCell align="right">
                                    <Typography sx={{ color: 'var(--text-primary)' }}>
                                        ${account.deuda.toLocaleString()}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography sx={{ color: 'var(--text-primary)' }}>
                                        {account.observaciones || '-'}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <NewAccountDialog
                open={isNewAccountOpen}
                onClose={() => setIsNewAccountOpen(false)}
                onSubmit={handleNewAccount}
            />
        </>
    );
};