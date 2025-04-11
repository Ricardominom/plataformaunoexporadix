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
import { NewIndicatorDialog } from '../Forms/NewIndicatorDialog';
import { useNotification } from '../../../context/NotificationContext';

// Import mock data from centralized data module
import { actionPlans } from '../../../data/ssc';

export const ActionPlans: React.FC = () => {
    const [isNewIndicatorOpen, setIsNewIndicatorOpen] = useState(false);
    const [plans, setPlans] = useState(actionPlans.plans);
    const { addNotification } = useNotification();

    const handleNewIndicator = (indicator: {
        indicator: string;
        goal: number;
        achieved: number;
    }) => {
        const newIndicator = {
            id: (plans.length + 1).toString(),
            indicator: indicator.indicator,
            goal: indicator.goal,
            achieved: indicator.achieved,
            progress: Math.round((indicator.achieved / indicator.goal) * 100),
        };
        setPlans([...plans, newIndicator]);
        setIsNewIndicatorOpen(false);
        addNotification('Indicador agregado exitosamente');
    };

    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ color: 'var(--text-primary)' }}>
                    Avance de planes de acción
                </Typography>
                <Button
                    startIcon={<Plus size={16} />}
                    variant="outlined"
                    onClick={() => setIsNewIndicatorOpen(true)}
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
                    Agregar Indicador
                </Button>
            </Box>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Indicador</TableCell>
                            <TableCell align="right">Meta</TableCell>
                            <TableCell align="right">Realizado</TableCell>
                            <TableCell align="right">% de avance</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {plans.map((plan) => (
                            <TableRow key={plan.id}>
                                <TableCell>
                                    <Typography sx={{ color: 'var(--text-primary)' }}>
                                        {plan.indicator}
                                    </Typography>
                                </TableCell>
                                <TableCell align="right">
                                    <Typography sx={{ color: 'var(--text-primary)' }}>
                                        {plan.goal}
                                    </Typography>
                                </TableCell>
                                <TableCell align="right">
                                    <Typography sx={{ color: 'var(--text-primary)' }}>
                                        {plan.achieved}
                                    </Typography>
                                </TableCell>
                                <TableCell align="right">
                                    <Typography sx={{ color: 'var(--text-primary)' }}>
                                        {plan.progress}%
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <NewIndicatorDialog
                open={isNewIndicatorOpen}
                onClose={() => setIsNewIndicatorOpen(false)}
                onSubmit={handleNewIndicator}
            />
        </>
    );
};