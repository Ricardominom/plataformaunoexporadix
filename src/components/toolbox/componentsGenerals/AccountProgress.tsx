import React, { useState } from 'react';
import {
    Box,
    Grid,
    Paper,
    Typography,
    TextField,
    Button,
    Slider,
    List,
    ListItem,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    LinearProgress,
    Alert,
    Snackbar,
    IconButton,
    Tooltip,
} from '@mui/material';
import { Save, TrendingUp, Edit, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

// Import mock data from centralized data module
import { accounts } from '../../../data/pmo';

export const AccountProgress: React.FC = () => {
    // State for the new form
    const [formData, setFormData] = useState({
        accountName: '',
        estrategia: 0,
        setup: 0,
        acompanamiento: 0,
        gerencia: 0,
        produccion: 0,
        difusion: 0,
    });
    
    // State for success message
    const [showSuccess, setShowSuccess] = useState(false);
    
    // State for form validation
    const [errors, setErrors] = useState<{[key: string]: string}>({});
    
    // State for accounts data
    const [accountsData, setAccountsData] = useState(accounts.accounts);
    
    // State for account being edited
    const [editingAccount, setEditingAccount] = useState<number | null>(null);
    
    // State for delete confirmation
    const [deleteConfirmation, setDeleteConfirmation] = useState<number | null>(null);

    // Handle form input changes
    const handleInputChange = (field: string, value: number | string) => {
        // Validate numeric inputs
        if (typeof value === 'number' && (field !== 'accountName')) {
            if (value < 0) value = 0;
            if (value > 100) value = 100;
        }
        
        setFormData({
            ...formData,
            [field]: value
        });
        
        // Clear error for this field if it exists
        if (errors[field]) {
            setErrors({
                ...errors,
                [field]: ''
            });
        }
    };

    // Validate form before submission
    const validateForm = () => {
        const newErrors: {[key: string]: string} = {};
        
        if (!formData.accountName.trim()) {
            newErrors.accountName = 'El nombre de la cuenta es obligatorio';
        }
        
        // All progress fields should be between 0-100
        ['estrategia', 'setup', 'acompanamiento', 'gerencia', 'produccion', 'difusion'].forEach(field => {
            const value = formData[field as keyof typeof formData] as number;
            if (value < 0 || value > 100) {
                newErrors[field] = 'El valor debe estar entre 0 y 100';
            }
        });
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }
        
        // Create new account progress object
        const newAccount = {
            name: formData.accountName,
            progress: {
                estrategia: formData.estrategia,
                setup: formData.setup,
                acompanamiento: formData.acompanamiento,
                gerencia: formData.gerencia,
                produccion: formData.produccion,
                difusion: formData.difusion
            }
        };
        
        // Add to accounts data
        setAccountsData([...accountsData, newAccount]);
        
        // Reset form
        setFormData({
            accountName: '',
            estrategia: 0,
            setup: 0,
            acompanamiento: 0,
            gerencia: 0,
            produccion: 0,
            difusion: 0,
        });
        
        // Show success message
        setShowSuccess(true);
    };
    
    // Handle edit account
    const handleEditAccount = (index: number) => {
        const account = accountsData[index];
        setFormData({
            accountName: account.name,
            estrategia: account.progress.estrategia,
            setup: account.progress.setup,
            acompanamiento: account.progress.acompanamiento,
            gerencia: account.progress.gerencia,
            produccion: account.progress.produccion,
            difusion: account.progress.difusion,
        });
        setEditingAccount(index);
    };
    
    // Handle update account
    const handleUpdateAccount = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validateForm() || editingAccount === null) {
            return;
        }
        
        // Create updated account object
        const updatedAccount = {
            name: formData.accountName,
            progress: {
                estrategia: formData.estrategia,
                setup: formData.setup,
                acompanamiento: formData.acompanamiento,
                gerencia: formData.gerencia,
                produccion: formData.produccion,
                difusion: formData.difusion
            }
        };
        
        // Update accounts data
        const newAccountsData = [...accountsData];
        newAccountsData[editingAccount] = updatedAccount;
        setAccountsData(newAccountsData);
        
        // Reset form and editing state
        setFormData({
            accountName: '',
            estrategia: 0,
            setup: 0,
            acompanamiento: 0,
            gerencia: 0,
            produccion: 0,
            difusion: 0,
        });
        setEditingAccount(null);
        
        // Show success message
        setShowSuccess(true);
    };
    
    // Handle delete account
    const handleDeleteAccount = (index: number) => {
        setDeleteConfirmation(index);
    };
    
    // Confirm delete account
    const confirmDeleteAccount = () => {
        if (deleteConfirmation !== null) {
            const newAccountsData = accountsData.filter((_, index) => index !== deleteConfirmation);
            setAccountsData(newAccountsData);
            setDeleteConfirmation(null);
            setShowSuccess(true);
        }
    };
    
    // Cancel delete account
    const cancelDeleteAccount = () => {
        setDeleteConfirmation(null);
    };

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
                <Paper
                    component={motion.div}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
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
                        {editingAccount !== null ? 'Actualizar Avance de Cuenta' : 'Registrar Avance de Cuenta'}
                    </Typography>
                    
                    <form onSubmit={editingAccount !== null ? handleUpdateAccount : handleSubmit}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                            <TextField
                                label="Nombre de la Cuenta"
                                fullWidth
                                value={formData.accountName}
                                onChange={(e) => handleInputChange('accountName', e.target.value)}
                                error={!!errors.accountName}
                                helperText={errors.accountName}
                                required
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '8px',
                                        backgroundColor: 'var(--surface-secondary)',
                                    },
                                }}
                            />
                            
                            {/* Progress Fields */}
                            {[
                                { id: 'estrategia', label: 'Estrategia', color: '#00CC88' },
                                { id: 'setup', label: 'Setup', color: '#0071e3' },
                                { id: 'acompanamiento', label: 'Acompañamiento', color: '#ff9500' },
                                { id: 'gerencia', label: 'Gerencia', color: '#5856d6' },
                                { id: 'produccion', label: 'Producción', color: '#ff2d55' },
                                { id: 'difusion', label: 'Difusión', color: '#5ac8fa' },
                            ].map((field) => (
                                <Box key={field.id} sx={{ width: '100%' }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                                        <Typography
                                            sx={{
                                                fontSize: '0.875rem',
                                                fontWeight: 500,
                                                color: 'var(--text-primary)',
                                            }}
                                        >
                                            {field.label}
                                        </Typography>
                                        <Typography
                                            sx={{
                                                fontSize: '0.875rem',
                                                fontWeight: 600,
                                                color: field.color,
                                            }}
                                        >
                                            {formData[field.id as keyof typeof formData]}%
                                        </Typography>
                                    </Box>
                                    <Slider
                                        value={formData[field.id as keyof typeof formData] as number}
                                        onChange={(_, value) => handleInputChange(field.id, value as number)}
                                        aria-labelledby={`${field.id}-slider`}
                                        valueLabelDisplay="auto"
                                        step={5}
                                        marks
                                        min={0}
                                        max={100}
                                        sx={{
                                            color: field.color,
                                            '& .MuiSlider-thumb': {
                                                height: 20,
                                                width: 20,
                                            },
                                            '& .MuiSlider-valueLabel': {
                                                backgroundColor: field.color,
                                            }
                                        }}
                                    />
                                    {errors[field.id] && (
                                        <Typography color="error" variant="caption">
                                            {errors[field.id]}
                                        </Typography>
                                    )}
                                </Box>
                            ))}
                            
                            <Button
                                type="submit"
                                variant="contained"
                                startIcon={<Save size={16} />}
                                sx={{
                                    backgroundColor: 'var(--brand-primary)',
                                    color: '#fff',
                                    fontSize: '0.875rem',
                                    fontWeight: 500,
                                    textTransform: 'none',
                                    px: 2.5,
                                    py: 1,
                                    borderRadius: '8px',
                                    boxShadow: 'none',
                                    mt: 2,
                                    '&:hover': {
                                        backgroundColor: 'var(--brand-primary-hover)',
                                        boxShadow: '0 4px 12px rgba(0, 113, 227, 0.2)',
                                    },
                                }}
                            >
                                {editingAccount !== null ? 'Actualizar Avance' : 'Guardar Avance'}
                            </Button>
                            
                            {editingAccount !== null && (
                                <Button
                                    variant="outlined"
                                    onClick={() => {
                                        setEditingAccount(null);
                                        setFormData({
                                            accountName: '',
                                            estrategia: 0,
                                            setup: 0,
                                            acompanamiento: 0,
                                            gerencia: 0,
                                            produccion: 0,
                                            difusion: 0,
                                        });
                                    }}
                                    sx={{
                                        color: 'var(--text-secondary)',
                                        borderColor: 'var(--border-color)',
                                        fontSize: '0.875rem',
                                        fontWeight: 500,
                                        textTransform: 'none',
                                        px: 2.5,
                                        py: 1,
                                        borderRadius: '8px',
                                        '&:hover': {
                                            backgroundColor: 'var(--hover-bg)',
                                            borderColor: 'var(--text-secondary)',
                                        },
                                    }}
                                >
                                    Cancelar
                                </Button>
                            )}
                        </Box>
                    </form>
                    
                    <Snackbar
                        open={showSuccess}
                        autoHideDuration={6000}
                        onClose={() => setShowSuccess(false)}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    >
                        <Alert 
                            onClose={() => setShowSuccess(false)} 
                            severity="success" 
                            sx={{ width: '100%' }}
                        >
                            {editingAccount !== null ? 'Avance de cuenta actualizado exitosamente' : 'Avance de cuenta registrado exitosamente'}
                        </Alert>
                    </Snackbar>
                </Paper>
            </Grid>

            <Grid item xs={12} md={8}>
                <Paper
                    sx={{
                        p: 3,
                        borderRadius: '12px',
                        backgroundColor: 'var(--surface-primary)',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
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
                        Avance de Cuentas
                    </Typography>

                    <List sx={{ flex: 1, overflowY: 'auto' }}>
                        {accountsData.map((account, index) => (
                            <ListItem
                                key={index}
                                sx={{
                                    flexDirection: 'column',
                                    alignItems: 'stretch',
                                    gap: 2,
                                    py: 2,
                                    borderBottom: '1px solid var(--border-color)',
                                    position: 'relative',
                                }}
                            >
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                                    <Typography
                                        variant="subtitle1"
                                        sx={{
                                            fontWeight: 600,
                                            color: 'var(--text-primary)',
                                        }}
                                    >
                                        {account.name}
                                    </Typography>
                                    <Box sx={{ display: 'flex', gap: 1 }}>
                                        <Tooltip title="Editar cuenta">
                                            <IconButton 
                                                size="small" 
                                                onClick={() => handleEditAccount(index)}
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
                                        <Tooltip title="Eliminar cuenta">
                                            <IconButton 
                                                size="small" 
                                                onClick={() => handleDeleteAccount(index)}
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
                                </Box>
                                <Grid container spacing={2}>
                                    {Object.entries(account.progress).map(([key, value]) => (
                                        <Grid item xs={12} sm={6} key={key}>
                                            <Box sx={{ mb: 1 }}>
                                                <Typography
                                                    variant="caption"
                                                    sx={{
                                                        color: 'var(--text-secondary)',
                                                        textTransform: 'capitalize',
                                                    }}
                                                >
                                                    {key}
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        color: 'var(--text-primary)',
                                                        fontWeight: 600,
                                                    }}
                                                >
                                                    {value}%
                                                </Typography>
                                            </Box>
                                            <LinearProgress
                                                variant="determinate"
                                                value={value as number}
                                                sx={{
                                                    height: 6,
                                                    borderRadius: 3,
                                                    backgroundColor: 'var(--surface-secondary)',
                                                    '& .MuiLinearProgress-bar': {
                                                        backgroundColor: (value as number) < 30 ? '#ff3b30' :
                                                            (value as number) < 70 ? '#ff9500' : '#30d158',
                                                        borderRadius: 3,
                                                    },
                                                }}
                                            />
                                        </Grid>
                                    ))}
                                </Grid>
                            </ListItem>
                        ))}
                        {accountsData.length === 0 && (
                            <Box sx={{ textAlign: 'center', py: 4 }}>
                                <Typography color="text.secondary">
                                    No hay datos de avance disponibles
                                </Typography>
                            </Box>
                        )}
                    </List>
                </Paper>
            </Grid>
            
            {/* Delete Confirmation Dialog */}
            {deleteConfirmation !== null && (
                <Box
                    sx={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 1300,
                    }}
                >
                    <Paper
                        sx={{
                            p: 3,
                            borderRadius: '12px',
                            backgroundColor: 'var(--surface-primary)',
                            maxWidth: 400,
                            width: '100%',
                        }}
                    >
                        <Typography
                            variant="h6"
                            sx={{
                                fontSize: '1.125rem',
                                fontWeight: 600,
                                color: 'var(--text-primary)',
                                mb: 2,
                            }}
                        >
                            Confirmar eliminación
                        </Typography>
                        <Typography
                            sx={{
                                color: 'var(--text-primary)',
                                mb: 3,
                            }}
                        >
                            ¿Estás seguro de que deseas eliminar la cuenta "{accountsData[deleteConfirmation]?.name}"? Esta acción no se puede deshacer.
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                            <Button
                                variant="outlined"
                                onClick={cancelDeleteAccount}
                                sx={{
                                    color: 'var(--text-secondary)',
                                    borderColor: 'var(--border-color)',
                                    fontSize: '0.875rem',
                                    fontWeight: 500,
                                    textTransform: 'none',
                                    px: 2.5,
                                    py: 1,
                                    borderRadius: '8px',
                                    '&:hover': {
                                        backgroundColor: 'var(--hover-bg)',
                                        borderColor: 'var(--text-secondary)',
                                    },
                                }}
                            >
                                Cancelar
                            </Button>
                            <Button
                                variant="contained"
                                onClick={confirmDeleteAccount}
                                sx={{
                                    backgroundColor: '#ff3b30',
                                    color: '#fff',
                                    fontSize: '0.875rem',
                                    fontWeight: 500,
                                    textTransform: 'none',
                                    px: 2.5,
                                    py: 1,
                                    borderRadius: '8px',
                                    boxShadow: 'none',
                                    '&:hover': {
                                        backgroundColor: '#ff453a',
                                        boxShadow: '0 4px 12px rgba(255, 59, 48, 0.2)',
                                    },
                                }}
                            >
                                Eliminar
                            </Button>
                        </Box>
                    </Paper>
                </Box>
            )}
        </Grid>
    );
};