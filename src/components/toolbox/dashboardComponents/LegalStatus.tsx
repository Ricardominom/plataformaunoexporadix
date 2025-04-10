import React from 'react';
import { Grid, Paper, Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

interface LegalCase {
    apartado: string;
    tema: string | null;
    proyecto: 'Listo' | 'En proceso' | 'Detenido';
    instancias: 'Listo' | 'En proceso' | 'Detenido';
    concluido: 'Listo' | 'En proceso' | 'Detenido';
}

interface LegalStatusProps {
    cases: LegalCase[];
}

const getStatusColor = (status: 'Listo' | 'En proceso' | 'Detenido') => {
    const colors = {
        'Listo': '#30d158',
        'En proceso': '#ff9500',
        'Detenido': '#ff2d55'
    };
    return colors[status];
};

const getApartadoColor = (apartado: string) => {
    const colors: { [key: string]: string } = {
        'Otros': '#ff2d55',
        'Gobierno Corporativo': '#0071e3',
        'Documentos propuestos': '#ff9500',
        'Contencioso Mercantil': '#30d158',
        'Contencioso Laboral': '#ff2d55'
    };
    return colors[apartado] || '#86868b';
};

const mockData: LegalCase[] = [
    {
        apartado: 'Otros',
        tema: null,
        proyecto: 'Listo',
        instancias: 'Listo',
        concluido: 'Listo'
    },
    {
        apartado: 'Gobierno Corporativo',
        tema: 'Tema 8',
        proyecto: 'En proceso',
        instancias: 'En proceso',
        concluido: 'Detenido'
    }
];

export const LegalStatus: React.FC = () => {
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
                <Typography
                    variant="h6"
                    sx={{
                        fontSize: '1.125rem',
                        fontWeight: 600,
                        color: 'var(--text-primary)',
                        mb: 3,
                    }}
                >
                    BALANCE LEGAL
                </Typography>

                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <Typography sx={{
                                        color: 'var(--text-secondary)',
                                        fontSize: '0.875rem',
                                        fontWeight: 500,
                                    }}>
                                        Apartado
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography sx={{
                                        color: 'var(--text-secondary)',
                                        fontSize: '0.875rem',
                                        fontWeight: 500,
                                    }}>
                                        Tema
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography sx={{
                                        color: 'var(--text-secondary)',
                                        fontSize: '0.875rem',
                                        fontWeight: 500,
                                    }}>
                                        Proyecto
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography sx={{
                                        color: 'var(--text-secondary)',
                                        fontSize: '0.875rem',
                                        fontWeight: 500,
                                    }}>
                                        Instancias
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography sx={{
                                        color: 'var(--text-secondary)',
                                        fontSize: '0.875rem',
                                        fontWeight: 500,
                                    }}>
                                        Concluido
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {mockData.map((item, index) => (
                                <TableRow
                                    key={index}
                                    sx={{
                                        transition: 'background-color 0.2s ease',
                                        '&:hover': {
                                            backgroundColor: 'var(--hover-bg)',
                                        },
                                    }}
                                >
                                    <TableCell>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Box
                                                sx={{
                                                    width: 3,
                                                    height: 24,
                                                    borderRadius: '2px',
                                                    backgroundColor: getApartadoColor(item.apartado),
                                                }}
                                            />
                                            <Typography sx={{
                                                color: 'var(--text-primary)',
                                                fontSize: '0.875rem',
                                                fontWeight: 500,
                                            }}>
                                                {item.apartado}
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Typography sx={{
                                            color: 'var(--text-secondary)',
                                            fontSize: '0.875rem',
                                        }}>
                                            {item.tema || '-'}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Box
                                            sx={{
                                                px: 2,
                                                py: 0.5,
                                                borderRadius: '4px',
                                                backgroundColor: `${getStatusColor(item.proyecto)}20`,
                                                width: 'fit-content',
                                            }}
                                        >
                                            <Typography sx={{
                                                color: getStatusColor(item.proyecto),
                                                fontSize: '0.75rem',
                                                fontWeight: 500,
                                            }}>
                                                {item.proyecto}
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Box
                                            sx={{
                                                px: 2,
                                                py: 0.5,
                                                borderRadius: '4px',
                                                backgroundColor: `${getStatusColor(item.instancias)}20`,
                                                width: 'fit-content',
                                            }}
                                        >
                                            <Typography sx={{
                                                color: getStatusColor(item.instancias),
                                                fontSize: '0.75rem',
                                                fontWeight: 500,
                                            }}>
                                                {item.instancias}
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Box
                                            sx={{
                                                px: 2,
                                                py: 0.5,
                                                borderRadius: '4px',
                                                backgroundColor: `${getStatusColor(item.concluido)}20`,
                                                width: 'fit-content',
                                            }}
                                        >
                                            <Typography sx={{
                                                color: getStatusColor(item.concluido),
                                                fontSize: '0.75rem',
                                                fontWeight: 500,
                                            }}>
                                                {item.concluido}
                                            </Typography>
                                        </Box>
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