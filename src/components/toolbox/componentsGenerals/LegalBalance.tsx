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
    Chip,
} from '@mui/material';
import { Plus } from 'lucide-react';
import { NewLegalSectionDialog } from '../Forms/NewLegalSectionDialog';
import { useNotification } from '../../../context/NotificationContext';

// Import mock data from centralized data module
import { legalCases } from '../../../data/ssc';

type StatusType = 'Listo' | 'En proceso' | 'Detenido';

const getStatusColor = (status: StatusType) => {
    const colors = {
        'Listo': { bg: 'rgba(48, 209, 88, 0.1)', text: '#30d158' },
        'En proceso': { bg: 'rgba(255, 149, 0, 0.1)', text: '#ff9500' },
        'Detenido': { bg: 'rgba(255, 45, 85, 0.1)', text: '#ff2d55' }
    };
    return colors[status];
};

const getApartadoColor = (apartado: string) => {
    const colors = {
        'Otros': '#ff2d55',
        'Gobierno Corporativo': '#0071e3',
        'Documentos propuestos': '#ff9500',
        'Contencioso Mercantil': '#30d158',
        'Contencioso Laboral': '#ff2d55'
    };
    return colors[apartado as keyof typeof colors] || '#86868b';
};

export const LegalBalance: React.FC = () => {
    const [isNewLegalSectionOpen, setIsNewLegalSectionOpen] = useState(false);
    const [cases, setCases] = useState(legalCases.cases);
    const { addNotification } = useNotification();

    const handleNewLegalSection = (section: {
        apartado: string;
        tema: string | null;
        proyecto: StatusType;
        instancias: StatusType;
        concluido: StatusType;
    }) => {
        const newCase = {
            id: (cases.length + 1).toString(),
            ...section,
        };
        setCases([...cases, newCase]);
        setIsNewLegalSectionOpen(false);
        addNotification('Apartado legal agregado exitosamente');
    };

    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ color: 'var(--text-primary)' }}>
                    Balance Legal
                </Typography>
                <Button
                    startIcon={<Plus size={16} />}
                    variant="outlined"
                    onClick={() => setIsNewLegalSectionOpen(true)}
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
                    Agregar Apartado
                </Button>
            </Box>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Apartado</TableCell>
                            <TableCell>Tema</TableCell>
                            <TableCell>Proyecto</TableCell>
                            <TableCell>Instancias</TableCell>
                            <TableCell>Concluido</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cases.map((caso) => (
                            <TableRow key={caso.id}>
                                <TableCell>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Box
                                            sx={{
                                                width: 8,
                                                height: 8,
                                                borderRadius: '50%',
                                                backgroundColor: getApartadoColor(caso.apartado),
                                            }}
                                        />
                                        <Typography sx={{ color: 'var(--text-primary)' }}>
                                            {caso.apartado}
                                        </Typography>
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Typography sx={{ color: 'var(--text-primary)' }}>
                                        {caso.tema || '-'}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={caso.proyecto}
                                        size="small"
                                        sx={{
                                            backgroundColor: getStatusColor(caso.proyecto).bg,
                                            color: getStatusColor(caso.proyecto).text,
                                        }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={caso.instancias}
                                        size="small"
                                        sx={{
                                            backgroundColor: getStatusColor(caso.instancias).bg,
                                            color: getStatusColor(caso.instancias).text,
                                        }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={caso.concluido}
                                        size="small"
                                        sx={{
                                            backgroundColor: getStatusColor(caso.concluido).bg,
                                            color: getStatusColor(caso.concluido).text,
                                        }}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <NewLegalSectionDialog
                open={isNewLegalSectionOpen}
                onClose={() => setIsNewLegalSectionOpen(false)}
                onSubmit={handleNewLegalSection}
            />
        </>
    );
};