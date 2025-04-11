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
    IconButton,
    Tooltip,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    FormControl,
} from '@mui/material';
import { Plus, Edit, Trash2, AlertTriangle, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { NewAccountDialog } from '../Forms/NewAccountDialog';
import { useNotification } from '../../../context/NotificationContext';

// Import mock data from centralized data module
import { balanceItems } from '../../../data/ssc';

interface AccountItem {
    id: string;
    item: string;
    montoBancarizado: number;
    montoDespacho: number;
    efectivo: number;
    credito: number;
    deuda: number;
    observaciones: string;
}

// Component for the delete confirmation dialog
interface DeleteConfirmDialogProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    accountName: string;
}

const DeleteConfirmDialog: React.FC<DeleteConfirmDialogProps> = ({ open, onClose, onConfirm, accountName }) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            PaperProps={{
                elevation: 0,
                component: motion.div,
                initial: { opacity: 0, y: 20, scale: 0.9 },
                animate: { opacity: 1, y: 0, scale: 1 },
                exit: { opacity: 0, y: 20, scale: 0.9 },
                transition: { duration: 0.2 },
                sx: {
                    borderRadius: '12px',
                    backgroundColor: 'var(--surface-primary)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid var(--border-color)',
                    maxWidth: '400px',
                    width: '100%',
                    mx: 2,
                },
            }}
        >
            <DialogTitle sx={{
                fontSize: '1.125rem',
                fontWeight: 600,
                color: 'var(--text-primary)',
                p: 3,
                borderBottom: '1px solid var(--border-color)',
                display: 'flex',
                alignItems: 'center',
                gap: 2,
            }}>
                <Box
                    sx={{
                        width: 40,
                        height: 40,
                        borderRadius: '10px',
                        backgroundColor: 'rgba(255, 45, 85, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <AlertTriangle size={24} color="#ff2d55" />
                </Box>
                Confirmar eliminación
            </DialogTitle>
            <DialogContent sx={{ p: 3, pt: 3 }}>
                <Typography sx={{ color: 'var(--text-primary)', lineHeight: 1.6 }}>
                    ¿Estás seguro de que deseas eliminar la cuenta "{accountName}"? Esta acción no se puede deshacer.
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
                    onClick={onClose}
                    sx={{
                        color: 'var(--text-secondary)',
                        fontSize: '0.9375rem',
                        fontWeight: 500,
                        textTransform: 'none',
                        px: 3,
                        py: 1,
                        borderRadius: '8px',
                        '&:hover': {
                            backgroundColor: 'var(--hover-bg)',
                            color: 'var(--text-primary)',
                        },
                    }}
                >
                    Cancelar
                </Button>
                <Button
                    onClick={onConfirm}
                    startIcon={<Trash2 size={18} />}
                    sx={{
                        backgroundColor: '#ff3b30',
                        color: '#fff',
                        fontSize: '0.9375rem',
                        fontWeight: 500,
                        textTransform: 'none',
                        px: 3,
                        py: 1,
                        borderRadius: '8px',
                        boxShadow: 'none',
                        '&:hover': {
                            backgroundColor: '#ff453a',
                            boxShadow: '0 2px 8px rgba(255, 59, 48, 0.3)',
                        },
                    }}
                >
                    Eliminar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

// Component for editing an account
interface EditAccountDialogProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (account: AccountItem) => void;
    account: AccountItem | null;
}

const EditAccountDialog: React.FC<EditAccountDialogProps> = ({
    open,
    onClose,
    onSubmit,
    account
}) => {
    const [formData, setFormData] = useState<AccountItem | null>(null);

    React.useEffect(() => {
        if (account) {
            setFormData({...account});
        }
    }, [account]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (formData) {
            onSubmit(formData);
        }
    };

    if (!formData) return null;

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                elevation: 0,
                sx: {
                    borderRadius: '12px',
                    backgroundColor: 'var(--surface-primary)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid var(--border-color)',
                    overflow: 'hidden',
                },
            }}
        >
            <form onSubmit={handleSubmit}>
                <DialogTitle
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        p: 2,
                        borderBottom: '1px solid var(--border-color)',
                        backgroundColor: 'var(--surface-secondary)',
                    }}
                >
                    <Typography
                        variant="h6"
                        sx={{
                            fontSize: '1.125rem',
                            fontWeight: 600,
                            color: 'var(--text-primary)',
                            letterSpacing: '-0.025em',
                        }}
                    >
                        Editar Cuenta
                    </Typography>
                    <IconButton
                        onClick={onClose}
                        size="small"
                        sx={{
                            color: 'var(--text-secondary)',
                            '&:hover': {
                                backgroundColor: 'var(--hover-bg)',
                                color: 'var(--text-primary)',
                            },
                        }}
                    >
                        <X size={18} />
                    </IconButton>
                </DialogTitle>

                <DialogContent sx={{ p: 2, pt: 3, backgroundColor: 'var(--surface-primary)' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                        <TextField
                            label="Nombre de la cuenta"
                            fullWidth
                            value={formData.item}
                            onChange={(e) => setFormData({ ...formData, item: e.target.value })}
                            required
                            size="small"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '8px',
                                    backgroundColor: 'var(--surface-secondary)',
                                    '&:hover': {
                                        backgroundColor: 'var(--surface-secondary)',
                                    },
                                    '&.Mui-focused': {
                                        backgroundColor: 'var(--surface-secondary)',
                                        boxShadow: '0 0 0 3px rgba(0, 113, 227, 0.1)',
                                    },
                                },
                                '& .MuiInputLabel-root': {
                                    color: 'var(--text-secondary)',
                                },
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'var(--border-color)',
                                },
                                '& .MuiInputBase-input': {
                                    color: 'var(--text-primary)',
                                },
                            }}
                        />

                        <TextField
                            label="Monto Bancarizado"
                            type="number"
                            value={formData.montoBancarizado}
                            onChange={(e) => setFormData({ ...formData, montoBancarizado: Number(e.target.value) })}
                            required
                            size="small"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '8px',
                                    backgroundColor: 'var(--surface-secondary)',
                                    '&:hover': {
                                        backgroundColor: 'var(--surface-secondary)',
                                    },
                                    '&.Mui-focused': {
                                        backgroundColor: 'var(--surface-secondary)',
                                        boxShadow: '0 0 0 3px rgba(0, 113, 227, 0.1)',
                                    },
                                },
                                '& .MuiInputLabel-root': {
                                    color: 'var(--text-secondary)',
                                },
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'var(--border-color)',
                                },
                                '& .MuiInputBase-input': {
                                    color: 'var(--text-primary)',
                                },
                            }}
                        />

                        <TextField
                            label="Monto Despacho"
                            type="number"
                            value={formData.montoDespacho}
                            onChange={(e) => setFormData({ ...formData, montoDespacho: Number(e.target.value) })}
                            required
                            size="small"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '8px',
                                    backgroundColor: 'var(--surface-secondary)',
                                    '&:hover': {
                                        backgroundColor: 'var(--surface-secondary)',
                                    },
                                    '&.Mui-focused': {
                                        backgroundColor: 'var(--surface-secondary)',
                                        boxShadow: '0 0 0 3px rgba(0, 113, 227, 0.1)',
                                    },
                                },
                                '& .MuiInputLabel-root': {
                                    color: 'var(--text-secondary)',
                                },
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'var(--border-color)',
                                },
                                '& .MuiInputBase-input': {
                                    color: 'var(--text-primary)',
                                },
                            }}
                        />

                        <TextField
                            label="Efectivo"
                            type="number"
                            value={formData.efectivo}
                            onChange={(e) => setFormData({ ...formData, efectivo: Number(e.target.value) })}
                            required
                            size="small"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '8px',
                                    backgroundColor: 'var(--surface-secondary)',
                                    '&:hover': {
                                        backgroundColor: 'var(--surface-secondary)',
                                    },
                                    '&.Mui-focused': {
                                        backgroundColor: 'var(--surface-secondary)',
                                        boxShadow: '0 0 0 3px rgba(0, 113, 227, 0.1)',
                                    },
                                },
                                '& .MuiInputLabel-root': {
                                    color: 'var(--text-secondary)',
                                },
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'var(--border-color)',
                                },
                                '& .MuiInputBase-input': {
                                    color: 'var(--text-primary)',
                                },
                            }}
                        />

                        <TextField
                            label="Crédito"
                            type="number"
                            value={formData.credito}
                            onChange={(e) => setFormData({ ...formData, credito: Number(e.target.value) })}
                            required
                            size="small"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '8px',
                                    backgroundColor: 'var(--surface-secondary)',
                                    '&:hover': {
                                        backgroundColor: 'var(--surface-secondary)',
                                    },
                                    '&.Mui-focused': {
                                        backgroundColor: 'var(--surface-secondary)',
                                        boxShadow: '0 0 0 3px rgba(0, 113, 227, 0.1)',
                                    },
                                },
                                '& .MuiInputLabel-root': {
                                    color: 'var(--text-secondary)',
                                },
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'var(--border-color)',
                                },
                                '& .MuiInputBase-input': {
                                    color: 'var(--text-primary)',
                                },
                            }}
                        />

                        <TextField
                            label="Deuda"
                            type="number"
                            value={formData.deuda}
                            onChange={(e) => setFormData({ ...formData, deuda: Number(e.target.value) })}
                            required
                            size="small"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '8px',
                                    backgroundColor: 'var(--surface-secondary)',
                                    '&:hover': {
                                        backgroundColor: 'var(--surface-secondary)',
                                    },
                                    '&.Mui-focused': {
                                        backgroundColor: 'var(--surface-secondary)',
                                        boxShadow: '0 0 0 3px rgba(0, 113, 227, 0.1)',
                                    },
                                },
                                '& .MuiInputLabel-root': {
                                    color: 'var(--text-secondary)',
                                },
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'var(--border-color)',
                                },
                                '& .MuiInputBase-input': {
                                    color: 'var(--text-primary)',
                                },
                            }}
                        />

                        <TextField
                            label="Observaciones"
                            multiline
                            rows={3}
                            value={formData.observaciones}
                            onChange={(e) => setFormData({ ...formData, observaciones: e.target.value })}
                            size="small"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '8px',
                                    backgroundColor: 'var(--surface-secondary)',
                                    '&:hover': {
                                        backgroundColor: 'var(--surface-secondary)',
                                    },
                                    '&.Mui-focused': {
                                        backgroundColor: 'var(--surface-secondary)',
                                        boxShadow: '0 0 0 3px rgba(0, 113, 227, 0.1)',
                                    },
                                },
                                '& .MuiInputLabel-root': {
                                    color: 'var(--text-secondary)',
                                },
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'var(--border-color)',
                                },
                                '& .MuiInputBase-input': {
                                    color: 'var(--text-primary)',
                                },
                            }}
                        />
                    </Box>
                </DialogContent>

                <DialogActions
                    sx={{
                        p: 2,
                        borderTop: '1px solid var(--border-color)',
                        backgroundColor: 'var(--surface-secondary)',
                        gap: 1,
                    }}
                >
                    <Button
                        onClick={onClose}
                        sx={{
                            color: 'var(--text-secondary)',
                            fontSize: '0.875rem',
                            fontWeight: 500,
                            textTransform: 'none',
                            px: 2.5,
                            borderRadius: '6px',
                            '&:hover': {
                                backgroundColor: 'var(--hover-bg)',
                                color: 'var(--text-primary)',
                            },
                        }}
                    >
                        Cancelar
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{
                            backgroundColor: '#0071e3',
                            color: '#fff',
                            fontSize: '0.875rem',
                            fontWeight: 500,
                            textTransform: 'none',
                            px: 2.5,
                            borderRadius: '6px',
                            boxShadow: 'none',
                            '&:hover': {
                                backgroundColor: '#0077ED',
                                boxShadow: 'none',
                            },
                        }}
                    >
                        Guardar Cambios
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export const AccountStatus: React.FC = () => {
    const [isNewAccountOpen, setIsNewAccountOpen] = useState(false);
    const [items, setItems] = useState<AccountItem[]>(balanceItems.items);
    const [editingAccount, setEditingAccount] = useState<AccountItem | null>(null);
    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
    const [accountToDelete, setAccountToDelete] = useState<AccountItem | null>(null);
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

    const handleEditAccount = (account: AccountItem) => {
        setEditingAccount(account);
    };

    const handleEditSubmit = (updatedAccount: AccountItem) => {
        setItems(prevItems => 
            prevItems.map(item => item.id === updatedAccount.id ? updatedAccount : item)
        );
        setEditingAccount(null);
        addNotification('Cuenta actualizada exitosamente');
    };

    const handleDeleteClick = (account: AccountItem) => {
        setAccountToDelete(account);
        setDeleteConfirmOpen(true);
    };

    const confirmDelete = () => {
        if (accountToDelete) {
            setItems(prevItems => prevItems.filter(item => item.id !== accountToDelete.id));
            addNotification('Cuenta eliminada exitosamente');
            setDeleteConfirmOpen(false);
            setAccountToDelete(null);
        }
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
                            <TableCell align="center">Acciones</TableCell>
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
                                <TableCell>
                                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                                        <Tooltip title="Editar">
                                            <IconButton 
                                                size="small" 
                                                onClick={() => handleEditAccount(account)}
                                                sx={{
                                                    color: 'var(--text-secondary)',
                                                    '&:hover': {
                                                        backgroundColor: 'rgba(0, 113, 227, 0.1)',
                                                        color: '#0071e3',
                                                    },
                                                }}
                                            >
                                                <Edit size={16} />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Eliminar">
                                            <IconButton 
                                                size="small" 
                                                onClick={() => handleDeleteClick(account)}
                                                sx={{
                                                    color: 'var(--text-secondary)',
                                                    '&:hover': {
                                                        backgroundColor: 'rgba(255, 45, 85, 0.1)',
                                                        color: '#ff2d55',
                                                    },
                                                }}
                                            >
                                                <Trash2 size={16} />
                                            </IconButton>
                                        </Tooltip>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ))}
                        {items.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={8} align="center" sx={{ py: 3 }}>
                                    <Typography sx={{ color: 'var(--text-secondary)' }}>
                                        No hay cuentas disponibles
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Dialogs */}
            <NewAccountDialog
                open={isNewAccountOpen}
                onClose={() => setIsNewAccountOpen(false)}
                onSubmit={handleNewAccount}
            />

            <EditAccountDialog
                open={!!editingAccount}
                onClose={() => setEditingAccount(null)}
                onSubmit={handleEditSubmit}
                account={editingAccount}
            />

            {accountToDelete && (
                <DeleteConfirmDialog
                    open={deleteConfirmOpen}
                    onClose={() => {
                        setDeleteConfirmOpen(false);
                        setAccountToDelete(null);
                    }}
                    onConfirm={confirmDelete}
                    accountName={accountToDelete.item}
                />
            )}
        </>
    );
};