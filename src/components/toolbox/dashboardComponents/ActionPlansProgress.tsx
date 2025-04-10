import React from 'react';
import { Grid, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box, LinearProgress, Tooltip, IconButton } from '@mui/material';
import { Info, TrendingUp, TrendingDown } from 'lucide-react';

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
                    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                    '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
                    },
                }}
                className="glass-effect"
            >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography
                        variant="h6"
                        sx={{
                            fontSize: '1.125rem',
                            fontWeight: 600,
                            color: 'var(--text-primary)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                        }}
                    >
                        AVANCE DE PLANES DE ACCIÓN
                        <Tooltip title="Seguimiento detallado del progreso en los planes de acción" arrow>
                            <IconButton size="small" sx={{ color: 'var(--text-secondary)' }}>
                                <Info size={16} />
                            </IconButton>
                        </Tooltip>
                    </Typography>
                </Box>

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
                                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                                            <Typography sx={{
                                                color: 'var(--text-primary)',
                                                fontSize: '0.875rem',
                                                fontWeight: 500,
                                            }}>
                                                {plan.indicator}
                                            </Typography>
                                            <LinearProgress
                                                variant="determinate"
                                                value={plan.progress}
                                                sx={{
                                                    height: 4,
                                                    borderRadius: 2,
                                                    backgroundColor: 'var(--surface-secondary)',
                                                    '& .MuiLinearProgress-bar': {
                                                        backgroundColor: plan.progress >= 100 ? '#30d158' :
                                                            plan.progress >= 70 ? '#0071e3' :
                                                                plan.progress >= 30 ? '#ff9500' : '#ff2d55',
                                                        borderRadius: 2,
                                                    },
                                                }}
                                            />
                                        </Box>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Typography sx={{
                                            color: 'var(--text-primary)',
                                            fontSize: '0.875rem',
                                            fontWeight: 500,
                                        }}>
                                            {plan.goal}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 1 }}>
                                            {plan.achieved > 0 && (
                                                <Box
                                                    component={plan.achieved >= plan.goal ? TrendingUp : TrendingDown}
                                                    sx={{
                                                        color: plan.achieved >= plan.goal ? '#30d158' : '#ff2d55',
                                                        size: 16,
                                                    }}
                                                />
                                            )}
                                            <Typography sx={{
                                                color: plan.achieved >= plan.goal ? '#30d158' : 'var(--text-primary)',
                                                fontSize: '0.875rem',
                                                fontWeight: 500,
                                            }}>
                                                {plan.achieved}
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Tooltip
                                            title={`${plan.progress}% completado`}
                                            arrow
                                            placement="left"
                                        >
                                            <Box
                                                sx={{
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    px: 1.5,
                                                    py: 0.5,
                                                    borderRadius: '12px',
                                                    backgroundColor: plan.progress >= 100 ? 'rgba(48, 209, 88, 0.1)' :
                                                        plan.progress >= 70 ? 'rgba(0, 113, 227, 0.1)' :
                                                            plan.progress >= 30 ? 'rgba(255, 149, 0, 0.1)' :
                                                                'rgba(255, 45, 85, 0.1)',
                                                }}
                                            >
                                                <Typography sx={{
                                                    color: plan.progress >= 100 ? '#30d158' :
                                                        plan.progress >= 70 ? '#0071e3' :
                                                            plan.progress >= 30 ? '#ff9500' : '#ff2d55',
                                                    fontSize: '0.875rem',
                                                    fontWeight: 600,
                                                }}>
                                                    {plan.progress}%
                                                </Typography>
                                            </Box>
                                        </Tooltip>
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