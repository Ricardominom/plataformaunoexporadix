import React from 'react';
import { Grid, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

interface ActionPlan {
    indicator: string;
    goal: number;
    achieved: number;
    progress: number;
}

interface ActionPlansProgressProps {
    plans: ActionPlan[];
}

export const ActionPlansProgress: React.FC<ActionPlansProgressProps> = ({ plans }) => {
    return (
        <Grid item xs={12} lg={6}>
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
                    AVANCE DE PLANES DE ACCIÓN
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
                                        Indicador
                                    </Typography>
                                </TableCell>
                                <TableCell align="right">
                                    <Typography sx={{
                                        color: 'var(--text-secondary)',
                                        fontSize: '0.875rem',
                                        fontWeight: 500,
                                    }}>
                                        Meta
                                    </Typography>
                                </TableCell>
                                <TableCell align="right">
                                    <Typography sx={{
                                        color: 'var(--text-secondary)',
                                        fontSize: '0.875rem',
                                        fontWeight: 500,
                                    }}>
                                        Realizado
                                    </Typography>
                                </TableCell>
                                <TableCell align="right">
                                    <Typography sx={{
                                        color: 'var(--text-secondary)',
                                        fontSize: '0.875rem',
                                        fontWeight: 500,
                                    }}>
                                        % avance
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {plans.map((plan, index) => (
                                <TableRow key={index}>
                                    <TableCell>
                                        <Typography sx={{
                                            color: 'var(--text-primary)',
                                            fontSize: '0.875rem',
                                        }}>
                                            {plan.indicator}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Typography sx={{
                                            color: 'var(--text-primary)',
                                            fontSize: '0.875rem',
                                        }}>
                                            {plan.goal}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Typography sx={{
                                            color: plan.achieved >= plan.goal ? '#30d158' : 'var(--text-primary)',
                                            fontSize: '0.875rem',
                                        }}>
                                            {plan.achieved}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Typography sx={{
                                            color: plan.progress >= 100 ? '#30d158' :
                                                plan.progress >= 70 ? '#0071e3' :
                                                    plan.progress >= 30 ? '#ff9500' : '#ff2d55',
                                            fontSize: '0.875rem',
                                            fontWeight: 500,
                                        }}>
                                            {plan.progress}%
                                        </Typography>
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