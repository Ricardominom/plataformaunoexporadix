import React from 'react';
import { Grid, Paper, Typography, Box } from '@mui/material';
import { DollarSign } from 'lucide-react';

interface PendingApprovalsProps {
    count: number;
}

export const PendingApprovals: React.FC<PendingApprovalsProps> = ({ count }) => {
    return (
        <Grid item xs={12} sm={6} md={4} lg={3}>
            <Paper
                sx={{
                    p: 3,
                    borderRadius: '12px',
                    backgroundColor: 'var(--surface-primary)',
                    transition: 'transform 0.2s ease-in-out',
                    '&:hover': {
                        transform: 'translateY(-4px)',
                    },
                }}
                className="glass-effect"
            >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box>
                        <Typography
                            variant="h3"
                            sx={{
                                fontSize: '2.5rem',
                                fontWeight: 600,
                                color: '#ff9500',
                                mb: 1,
                            }}
                        >
                            {count}
                        </Typography>
                        <Typography
                            sx={{
                                fontSize: '0.875rem',
                                color: 'var(--text-secondary)',
                                maxWidth: '160px',
                                lineHeight: 1.2,
                            }}
                        >
                            Aprobaciones financieras pendientes
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            width: 48,
                            height: 48,
                            borderRadius: '12px',
                            backgroundColor: 'rgba(255, 149, 0, 0.1)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#ff9500',
                        }}
                    >
                        <DollarSign size={24} />
                    </Box>
                </Box>
            </Paper>
        </Grid>
    );
};