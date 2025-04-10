import React from 'react';
import { Grid, Paper, Box, Typography, IconButton } from '@mui/material';
import { Download, BarChart2 } from 'lucide-react';
import { Chip } from '@mui/material';

interface FinancialMetric {
    category: string;
    current: number;
    previous: number;
    change: number;
    breakdown?: {
        label: string;
        value: number;
        growth: number;
    }[];
    color?: string;
}

interface FinancialOverviewProps {
    metrics: FinancialMetric[];
}

export const FinancialOverview: React.FC<FinancialOverviewProps> = ({ metrics }) => {
    return (
        <Grid item xs={12} lg={8}>
            <Paper
                sx={{
                    p: 3,
                    borderRadius: '12px',
                    backgroundColor: 'var(--surface-primary)',
                    height: '100%',
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
                        }}
                    >
                        RESUMEN FINANCIERO
                    </Typography>
                    <IconButton size="small">
                        <Download size={18} />
                    </IconButton>
                </Box>
                <Grid container spacing={3}>
                    {metrics.map((section, index) => (
                        <Grid item xs={12} md={6} key={index}>
                            <Box sx={{ mb: 3 }}>
                                <Typography
                                    sx={{
                                        fontSize: '0.875rem',
                                        color: 'var(--text-secondary)',
                                        mb: 1,
                                    }}
                                >
                                    {section.title}
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 2, mb: 2 }}>
                                    <Typography
                                        variant="h4"
                                        sx={{
                                            color: section.color || '#30d158',
                                            fontWeight: 600,
                                        }}
                                    >
                                        ${section.current.toLocaleString()}
                                    </Typography>
                                    <Typography
                                        sx={{
                                            color: 'var(--text-secondary)',
                                            fontSize: '0.875rem',
                                            mb: 1,
                                        }}
                                    >
                                        vs ${section.previous.toLocaleString()}
                                    </Typography>
                                </Box>
                                {section.breakdown && (
                                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                        {section.breakdown.map((item, i) => (
                                            <Chip
                                                key={i}
                                                label={
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                                        {item.label}
                                                        <Box
                                                            component="span"
                                                            sx={{
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                color: item.growth >= 0 ? '#30d158' : '#ff2d55',
                                                            }}
                                                        >
                                                            {item.growth >= 0 ? '+' : ''}{item.growth}%
                                                        </Box>
                                                    </Box>
                                                }
                                                size="small"
                                                sx={{
                                                    backgroundColor: 'var(--surface-secondary)',
                                                    '& .MuiChip-label': {
                                                        color: 'var(--text-primary)',
                                                    },
                                                }}
                                            />
                                        ))}
                                    </Box>
                                )}
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 1,
                                        color: section.change >= 0 ? '#30d158' : '#ff2d55',
                                        mt: 2,
                                    }}
                                >
                                    <BarChart2 size={16} />
                                    <Typography sx={{ fontWeight: 500 }}>
                                        {section.change}% vs mes anterior
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Paper>
        </Grid>
    );
};