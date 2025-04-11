import React, { useState, useRef } from 'react';
import {
    Box,
    Paper,
    Typography,
    Grid,
    LinearProgress,
    Button,
    List,
    ListItem,
} from '@mui/material';
import {
    FileSpreadsheet,
    Upload,
} from 'lucide-react';

// Import mock data from centralized data module
import { accounts } from '../../../data/pmo';

export const AccountProgress: React.FC = () => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileSelect = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            if (file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
                file.type === 'application/vnd.ms-excel') {
                setSelectedFile(file);
            } else {
                alert('Por favor, selecciona un archivo Excel válido (.xlsx o .xls)');
            }
        }
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();

        const file = event.dataTransfer.files[0];
        if (file) {
            if (file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
                file.type === 'application/vnd.ms-excel') {
                setSelectedFile(file);
            } else {
                alert('Por favor, selecciona un archivo Excel válido (.xlsx o .xls)');
            }
        }
    };

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
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
                        Importar Excel
                    </Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: 2,
                            p: 4,
                            border: '2px dashed var(--border-color)',
                            borderRadius: '8px',
                            backgroundColor: 'var(--surface-secondary)',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            '&:hover': {
                                borderColor: 'var(--text-primary)',
                                backgroundColor: 'var(--hover-bg)',
                            },
                        }}
                        onClick={handleFileSelect}
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                    >
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept=".xlsx,.xls"
                            style={{ display: 'none' }}
                        />
                        {selectedFile ? (
                            <>
                                <FileSpreadsheet size={48} color="var(--status-success-text)" />
                                <Typography
                                    sx={{
                                        color: 'var(--text-primary)',
                                        textAlign: 'center',
                                        fontWeight: 500,
                                    }}
                                >
                                    {selectedFile.name}
                                </Typography>
                                <Button
                                    variant="contained"
                                    startIcon={<Upload size={16} />}
                                    sx={{
                                        backgroundColor: 'var(--status-success-text)',
                                        color: '#fff',
                                        '&:hover': {
                                            backgroundColor: 'var(--status-success-text)',
                                            opacity: 0.9,
                                        },
                                    }}
                                >
                                    Subir archivo
                                </Button>
                            </>
                        ) : (
                            <>
                                <FileSpreadsheet size={48} color="var(--text-secondary)" />
                                <Button
                                    variant="outlined"
                                    sx={{
                                        color: 'var(--text-primary)',
                                        borderColor: 'var(--border-color)',
                                        '&:hover': {
                                            borderColor: 'var(--text-primary)',
                                            backgroundColor: 'transparent',
                                        },
                                    }}
                                >
                                    Seleccionar archivo
                                </Button>
                                <Typography
                                    variant="caption"
                                    sx={{
                                        color: 'var(--text-secondary)',
                                        textAlign: 'center',
                                    }}
                                >
                                    Arrastra y suelta tu archivo Excel o haz clic para seleccionarlo
                                </Typography>
                            </>
                        )}
                    </Box>
                </Paper>
            </Grid>

            <Grid item xs={12} md={8}>
                <Paper
                    sx={{
                        p: 3,
                        borderRadius: '12px',
                        backgroundColor: 'var(--surface-primary)',
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
                    <List>
                        {accounts.accounts.map((account, index) => (
                            <ListItem
                                key={index}
                                sx={{
                                    flexDirection: 'column',
                                    alignItems: 'stretch',
                                    gap: 2,
                                    py: 2,
                                    borderBottom: '1px solid var(--border-color)',
                                }}
                            >
                                <Typography
                                    variant="subtitle1"
                                    sx={{
                                        fontWeight: 600,
                                        color: 'var(--text-primary)',
                                    }}
                                >
                                    {account.name}
                                </Typography>
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
                    </List>
                </Paper>
            </Grid>
        </Grid>
    );
};