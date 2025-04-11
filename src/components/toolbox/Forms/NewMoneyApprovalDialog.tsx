import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    FormControlLabel,
    Switch,
    Grid,
    Typography,
    IconButton,
    Box,
} from '@mui/material';
import { X } from 'lucide-react';

interface NewMoneyApprovalDialogProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: any) => void;
}

export const NewMoneyApprovalDialog: React.FC<NewMoneyApprovalDialogProps> = ({
    open,
    onClose,
    onSubmit,
}) => {
    const [formData, setFormData] = useState({
        urgent: false,
        paymentDate: '',
        category: '',
        subcategory: '',
        concept: '',
        sscComments: '',
        amount: '',
        transferToEspora: '',
        toDispatchForTransfer: '',
        transferToInterlogis: '',
        transferToDemotactica: '',
        transferToDotcom: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
        setFormData({
            urgent: false,
            paymentDate: '',
            category: '',
            subcategory: '',
            concept: '',
            sscComments: '',
            amount: '',
            transferToEspora: '',
            toDispatchForTransfer: '',
            transferToInterlogis: '',
            transferToDemotactica: '',
            transferToDotcom: '',
        });
        onClose();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
            PaperProps={{
                elevation: 0,
                sx: {
                    borderRadius: '12px',
                    backgroundColor: 'var(--surface-primary)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid var(--border-color)',
                    overflow: 'hidden',
                    maxHeight: '90vh',
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
                        Nueva Aprobación de Erogacion
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

                <DialogContent sx={{ p: 2, backgroundColor: 'var(--surface-primary)' }}>
                    <Box sx={{ pt: 2 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={formData.urgent}
                                            onChange={handleChange}
                                            name="urgent"
                                            sx={{
                                                '& .MuiSwitch-switchBase.Mui-checked': {
                                                    color: '#0071e3',
                                                },
                                                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                                    backgroundColor: '#0071e3',
                                                },
                                            }}
                                        />
                                    }
                                    label="Urgente"
                                    sx={{
                                        color: 'var(--text-primary)',
                                    }}
                                />
                            </Grid>

                            {[
                                { name: 'paymentDate', label: 'Fecha de Pago', type: 'date', half: true },
                                { name: 'category', label: 'Categoría', half: true },
                                { name: 'subcategory', label: 'Subcategoría', half: true },
                                { name: 'concept', label: 'Concepto', multiline: true, rows: 2 },
                                { name: 'sscComments', label: 'Comentarios SSC', multiline: true, rows: 2 },
                                { name: 'amount', label: 'Monto Total', type: 'number', half: true },
                                { name: 'transferToEspora', label: 'Transferencia a Espora', type: 'number', half: true },
                                { name: 'toDispatchForTransfer', label: 'A despacho para transferir', type: 'number', half: true },
                                { name: 'transferToInterlogis', label: 'Transferencia a Interlogis', type: 'number', half: true },
                                { name: 'transferToDemotactica', label: 'Transferencia a Demotáctica', type: 'number', half: true },
                                { name: 'transferToDotcom', label: 'Transferencia a Dotcom', type: 'number', half: true },
                            ].map((field, index) => (
                                <Grid item xs={12} sm={field.half ? 6 : 12} key={index}>
                                    <TextField
                                        fullWidth
                                        label={field.label}
                                        name={field.name}
                                        type={field.type || 'text'}
                                        value={formData[field.name as keyof typeof formData]}
                                        onChange={handleChange}
                                        multiline={field.multiline}
                                        rows={field.rows}
                                        InputLabelProps={field.type === 'date' ? { shrink: true } : undefined}
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
                                </Grid>
                            ))}
                        </Grid>
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
                        Crear Aprobación
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};