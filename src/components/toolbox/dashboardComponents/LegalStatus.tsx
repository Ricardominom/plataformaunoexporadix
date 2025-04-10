import React from 'react';
import { Grid, Paper, Box, Typography, LinearProgress } from '@mui/material';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface LegalStatusItem {
    category: string;
    completed: number;
    total: number;
    growth: number;
}

interface LegalStatusProps {
    items: LegalStatusItem[];
}

export const LegalStatus: React.FC<LegalStatusProps> = ({ items }) => {
    return (
        <Grid item xs={12} lg={6}>
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
                    ESTADO LEGAL
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    {items.map((item, index) => (
                        <Box key={index}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: 'var(--text-primary)',
                                            fontWeight: 500,
                                        }}
                                    >
                                        {item.category}
                                    </Typography>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 0.5,
                                            color: item.growth >= 0 ? '#30d158' : '#ff2d55',
                                            fontSize: '0.75rem',
                                        }}
                                    >
                                        {item.growth >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                                        {Math.abs(item.growth)}%
                                    </Box>
                                </Box>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: 'var(--text-secondary)',
                                    }}
                                >
                                    {item.completed}/{item.total}
                                </Typography>
                            </Box>
                            <LinearProgress
                                variant="determinate"
                                value={(item.completed / item.total) * 100}
                                sx={{
                                    height: 6,
                                    borderRadius: 3,
                                    backgroundColor: 'var(--surface-secondary)',
                                    '& .MuiLinearProgress-bar': {
                                        backgroundColor: '#0071e3',
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