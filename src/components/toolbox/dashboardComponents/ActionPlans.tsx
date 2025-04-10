import React from 'react';
import { Grid, Paper, Box, Typography, Chip, LinearProgress } from '@mui/material';
import { Users } from 'lucide-react';

interface ActionPlan {
    name: string;
    progress: number;
    status: 'completed' | 'in_progress' | 'delayed';
    dueDate: string;
    owner: string;
}

interface ActionPlansProps {
    plans: ActionPlan[];
}

const getStatusColor = (status: string) => {
    const colors = {
        completed: { bg: 'rgba(48, 209, 88, 0.1)', text: '#30d158' },
        in_progress: { bg: 'rgba(0, 113, 227, 0.1)', text: '#0071e3' },
        delayed: { bg: 'rgba(255, 45, 85, 0.1)', text: '#ff2d55' },
    };
    return colors[status as keyof typeof colors] || colors.in_progress;
};

export const ActionPlans: React.FC<ActionPlansProps> = ({ plans }) => {
    return (
        <Grid item xs={12} lg={4}>
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
                    PLANES DE ACCIÓN
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    {plans.map((plan, index) => (
                        <Box key={index}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                <Box>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: 'var(--text-primary)',
                                            fontWeight: 500,
                                            mb: 0.5,
                                        }}
                                    >
                                        {plan.name}
                                    </Typography>
                                    <Typography
                                        variant="caption"
                                        sx={{
                                            color: 'var(--text-secondary)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 1,
                                        }}
                                    >
                                        <Users size={12} />
                                        {plan.owner}
                                    </Typography>
                                </Box>
                                <Chip
                                    label={`${plan.progress}%`}
                                    size="small"
                                    sx={{
                                        backgroundColor: getStatusColor(plan.status).bg,
                                        color: getStatusColor(plan.status).text,
                                    }}
                                />
                            </Box>
                            <LinearProgress
                                variant="determinate"
                                value={plan.progress}
                                sx={{
                                    height: 6,
                                    borderRadius: 3,
                                    backgroundColor: 'var(--surface-secondary)',
                                    '& .MuiLinearProgress-bar': {
                                        backgroundColor: getStatusColor(plan.status).text,
                                        borderRadius: 3,
                                    },
                                }}
                            />
                        </Box>
                    ))}
                </Box>
            </Paper>
        </Grid>
    );
};