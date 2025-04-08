import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Box,
    Typography,
    IconButton,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Switch,
    FormControlLabel,
    Divider,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { X, AlertCircle } from 'lucide-react';
import dayjs from 'dayjs';

interface NewMoneyApprovalDialogProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (approval: any) => void;
}

const categories = [
    'Operaciones',
    'Recursos Humanos',
    'Marketing',
    'Tecnología',
    'Finanzas',
    'Legal',
    'Administración',
];

const subcategories = {
    'Operaciones': ['Equipamiento', 'Mantenimiento', 'Suministros', 'Logística'],
    'Recursos Humanos': ['Capacitación', 'Reclutamiento', 'Beneficios', 'Eventos'],
    'Marketing': ['Publicidad', 'Eventos', 'Material promocional', 'Investigación'],
    'Tecnología': ['Software', 'Hardware', 'Servicios Cloud', 'Soporte'],
    'Finanzas': ['Impuestos', 'Seguros', 'Auditoría', 'Consultoría'],
    'Legal': ['Contratos', 'Licencias', 'Consultoría', 'Trámites'],
    'Administración': ['Oficina', 'Servicios', 'Viáticos', 'Otros'],
};

export const NewMoneyApprovalDialog: React.FC<NewMoneyApprovalDialogProps> = ({
    open,
    onClose,
    onSubmit,
}) => {
    const [formData, setFormData] = useState({
        urgent: false,
        paymentDate: dayjs(),
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
        onSubmit({
            ...formData,
            paymentDate: formData.paymentDate.format('YYYY-MM-DD'),
            amount: parseFloat(formData.amount) || 0,
            transferToEspora: parseFloat(formData.transferToEspora) || 0,
            toDispatchForTransfer: parseFloat(formData.toDispatchForTransfer) || 0,
            transferToInterlogis: parseFloat(formData.transferToInterlogis) || 0,
            transferToDemotactica: parseFloat(formData.transferToDemotactica) || 0,
            transferToDotcom: parseFloat(formData.transferToDotcom) || 0,
        });
        onClose();
    };

    const handleClose = () => {
        setFormData({
            urgent: false,
            paymentDate: dayjs(),
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

    return (
        <Dialog
            open={open}
            onClose={handleClose}
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
                    display: 'flex',
                    flexDirection: 'column',
                },
            }}
        >
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <DialogTitle
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        p: 2,
                        borderBottom: '1px solid var(--border-color)',
                        backgroundColor: 'var(--surface-secondary)',
                        flexShrink: 0,
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
                        Nueva Aprobación de Dinero
                    </Typography>
                    <IconButton
                        onClick={handleClose}
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

                <DialogContent 
                    sx={{ 
                        p: 3, 
                        backgroundColor: 'var(--surface-primary)',
                        overflowY: 'auto',
                        flexGrow: 1,
                        '&::-webkit-scrollbar': {
                            width: '8px',
                        },
                        '&::-webkit-scrollbar-track': {
                            background: 'transparent',
                        },
                        '&::-webkit-scrollbar-thumb': {
                            background: 'var(--text-tertiary)',
                            borderRadius: '4px',
                            '&:hover': {
                                background: 'var(--text-secondary)',
                            },
                        },
                    }}
                >
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                        {/* Sección de Información General */}
                        <Box>
                            <Typography
                                variant="subtitle2"
                                sx={{
                                    color: 'var(--text-secondary)',
                                    mb: 2,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                }}
                            >
                                INFORMACIÓN GENERAL
                            </Typography>

                            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={formData.urgent}
                                            onChange={(e) => setFormData({ ...formData, urgent: e.target.checked })}
                                            color="error"
                                        />
                                    }
                                    label="Urgente"
                                />

                                <DatePicker
                                    label="Fecha de pago"
                                    value={formData.paymentDate}
                                    onChange={(date) => setFormData({ ...formData, paymentDate: date || dayjs() })}
                                    sx={{
                                        flex: 1,
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '8px',
                                            backgroundColor: 'var(--surface-secondary)',
                                        },
                                    }}
                                />
                            </Box>

                            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                                <FormControl 
                                    fullWidth
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '8px',
                                            backgroundColor: 'var(--surface-secondary)',
                                        },
                                    }}
                                >
                                    <InputLabel>Categoría</InputLabel>
                                    <Select
                                        value={formData.category}
                                        label="Categoría"
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value, subcategory: '' })}
                                    >
                                        {categories.map((category) => (
                                            <MenuItem key={category} value={category}>
                                                {category}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                                <FormControl 
                                    fullWidth
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '8px',
                                            backgroundColor: 'var(--surface-secondary)',
                                        },
                                    }}
                                >
                                    <InputLabel>Subcategoría</InputLabel>
                                    <Select
                                        value={formData.subcategory}
                                        label="Subcategoría"
                                        onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
                                        disabled={!formData.category}
                                    >
                                        {formData.category && subcategories[formData.category as keyof typeof subcategories].map((subcategory) => (
                                            <MenuItem key={subcategory} value={subcategory}>
                                                {subcategory}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Box>

                            <TextField
                                fullWidth
                                label="Concepto"
                                value={formData.concept}
                                onChange={(e) => setFormData({ ...formData, concept: e.target.value })}
                                multiline
                                rows={2}
                                sx={{
                                    mb: 2,
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '8px',
                                        backgroundColor: 'var(--surface-secondary)',
                                    },
                                }}
                            />

                            <TextField
                                fullWidth
                                label="Comentarios SSC"
                                value={formData.sscComments}
                                onChange={(e) => setFormData({ ...formData, sscComments: e.target.value })}
                                multiline
                                rows={2}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '8px',
                                        backgroundColor: 'var(--surface-secondary)',
                                    },
                                }}
                            />
                        </Box>

                        <Divider />

                        {/* Sección de Montos */}
                        <Box>
                            <Typography
                                variant="subtitle2"
                                sx={{
                                    color: 'var(--text-secondary)',
                                    mb: 2,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                }}
                            >
                                MONTOS Y TRANSFERENCIAS
                            </Typography>

                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                <TextField
                                    fullWidth
                                    label="Suma"
                                    type="number"
                                    value={formData.amount}
                                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                                    InputProps={{
                                        startAdornment: <Typography sx={{ color: 'var(--text-secondary)', mr: 1 }}>$</Typography>,
                                    }}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '8px',
                                            backgroundColor: 'var(--surface-secondary)',
                                        },
                                    }}
                                />

                                <TextField
                                    fullWidth
                                    label="Transferencia a Espora"
                                    type="number"
                                    value={formData.transferToEspora}
                                    onChange={(e) => setFormData({ ...formData, transferToEspora: e.target.value })}
                                    InputProps={{
                                        startAdornment: <Typography sx={{ color: 'var(--text-secondary)', mr: 1 }}>$</Typography>,
                                    }}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '8px',
                                            backgroundColor: 'var(--surface-secondary)',
                                        },
                                    }}
                                />

                                <TextField
                                    fullWidth
                                    label="A despacho para transferir"
                                    type="number"
                                    value={formData.toDispatchForTransfer}
                                    onChange={(e) => setFormData({ ...formData, toDispatchForTransfer: e.target.value })}
                                    InputProps={{
                                        startAdornment: <Typography sx={{ color: 'var(--text-secondary)', mr: 1 }}>$</Typography>,
                                    }}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '8px',
                                            backgroundColor: 'var(--surface-secondary)',
                                        },
                                    }}
                                />

                                <TextField
                                    fullWidth
                                    label="Transferencia a Interlogis"
                                    type="number"
                                    value={formData.transferToInterlogis}
                                    onChange={(e) => setFormData({ ...formData, transferToInterlogis: e.target.value })}
                                    InputProps={{
                                        startAdornment: <Typography sx={{ color: 'var(--text-secondary)', mr: 1 }}>$</Typography>,
                                    }}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '8px',
                                            backgroundColor: 'var(--surface-secondary)',
                                        },
                                    }}
                                />

                                <TextField
                                    fullWidth
                                    label="Transferencia a Demotáctica"
                                    type="number"
                                    value={formData.transferToDemotactica}
                                    onChange={(e) => setFormData({ ...formData, transferToDemotactica: e.target.value })}
                                    InputProps={{
                                        startAdornment: <Typography sx={{ color: 'var(--text-secondary)', mr: 1 }}>$</Typography>,
                                    }}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '8px',
                                            backgroundColor: 'var(--surface-secondary)',
                                        },
                                    }}
                                />

                                <TextField
                                    fullWidth
                                    label="Transferencia a Dotcom"
                                    type="number"
                                    value={formData.transferToDotcom}
                                    onChange={(e) => setFormData({ ...formData, transferToDotcom: e.target.value })}
                                    InputProps={{
                                        startAdornment: <Typography sx={{ color: 'var(--text-secondary)', mr: 1 }}>$</Typography>,
                                    }}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '8px',
                                            backgroundColor: 'var(--surface-secondary)',
                                        },
                                    }}
                                />
                            </Box>
                        </Box>
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
                        onClick={handleClose}
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