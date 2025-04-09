import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

interface LogoutDialogProps {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    onConfirm: () => void;
}

export const LogoutDialog: React.FC<LogoutDialogProps> = ({
    isOpen,
    onOpenChange,
    onConfirm,
}) => {
    return (
        <Dialog
            open={isOpen}
            onClose={() => onOpenChange(false)}
            PaperProps={{
                elevation: 0,
                sx: {
                    borderRadius: '12px',
                    backgroundColor: 'var(--surface-primary)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid var(--border-color)',
                },
            }}
        >
            <DialogTitle sx={{
                fontSize: '1.125rem',
                fontWeight: 600,
                color: 'var(--text-primary)',
                p: 2,
                borderBottom: '1px solid var(--border-color)',
            }}>
                Confirmar cierre de sesión
            </DialogTitle>
            <DialogContent sx={{ p: 2, mt: 1 }}>
                <Typography sx={{ color: 'var(--text-primary)' }}>
                    ¿Estás seguro de que deseas cerrar la sesión?
                </Typography>
            </DialogContent>
            <DialogActions sx={{
                p: 2,
                borderTop: '1px solid var(--border-color)',
                gap: 1,
            }}>
                <Button
                    onClick={() => onOpenChange(false)}
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
                    onClick={onConfirm}
                    sx={{
                        backgroundColor: '#ff3b30',
                        color: '#fff',
                        fontSize: '0.875rem',
                        fontWeight: 500,
                        textTransform: 'none',
                        px: 2.5,
                        borderRadius: '6px',
                        boxShadow: 'none',
                        '&:hover': {
                            backgroundColor: '#ff453a',
                            boxShadow: 'none',
                        },
                    }}
                >
                    Cerrar Sesión
                </Button>
            </DialogActions>
        </Dialog>
    );
};
