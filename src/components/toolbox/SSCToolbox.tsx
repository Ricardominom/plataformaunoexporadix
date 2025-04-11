import React, { useState } from 'react';
import {
    Box,
    Container,
    Paper,
    Typography,
    Tabs,
    Tab,
} from '@mui/material';
import {
    DollarSign,
    Scale,
    BarChart2,
    Wallet,
} from 'lucide-react';

// Importar los componentes modulares
import { FinancialApprovals } from './componentsGenerals/FinancialApprovals';
import { LegalBalance } from './componentsGenerals/LegalBalance';
import { ActionPlans } from './componentsGenerals/ActionPlans';
import { AccountStatus } from './componentsGenerals/AccountStatus';

export const SSCToolbox: React.FC = () => {
    const [currentTab, setCurrentTab] = useState(0);

    const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
        setCurrentTab(newValue);
    };

    return (
        <Box sx={{
            pt: 'calc(var(--nav-height) + 24px)',
            pb: 4,
            px: { xs: 2, sm: 3, md: 4 },
            minHeight: '100vh',
            backgroundColor: 'var(--app-bg)',
        }}>
            <Container maxWidth="xl">
                <Typography
                    variant="h4"
                    sx={{
                        fontSize: '2rem',
                        fontWeight: 600,
                        color: 'var(--text-primary)',
                        mb: 4,
                    }}
                >
                    Toolbox
                </Typography>

                <Paper
                    sx={{
                        borderRadius: '12px',
                        backgroundColor: 'var(--surface-primary)',
                        mb: 3,
                    }}
                    className="glass-effect"
                >
                    <Tabs
                        value={currentTab}
                        onChange={handleTabChange}
                        sx={{
                            borderBottom: '1px solid var(--border-color)',
                            '& .MuiTabs-indicator': {
                                backgroundColor: '#0071e3',
                            },
                        }}
                    >
                        <Tab
                            icon={<DollarSign size={16} />}
                            iconPosition="start"
                            label="Aprobaciones Financieras Pendientes"
                            sx={{
                                textTransform: 'none',
                                minHeight: 48,
                                color: 'var(--text-secondary)',
                                '&.Mui-selected': {
                                    color: '#0071e3',
                                },
                            }}
                        />
                        <Tab
                            icon={<Scale size={16} />}
                            iconPosition="start"
                            label="Balance Legal"
                            sx={{
                                textTransform: 'none',
                                minHeight: 48,
                                color: 'var(--text-secondary)',
                                '&.Mui-selected': {
                                    color: '#0071e3',
                                },
                            }}
                        />
                        <Tab
                            icon={<BarChart2 size={16} />}
                            iconPosition="start"
                            label="Avance de Planes"
                            sx={{
                                textTransform: 'none',
                                minHeight: 48,
                                color: 'var(--text-secondary)',
                                '&.Mui-selected': {
                                    color: '#0071e3',
                                },
                            }}
                        />
                        <Tab
                            icon={<Wallet size={16} />}
                            iconPosition="start"
                            label="Estado de Cuentas"
                            sx={{
                                textTransform: 'none',
                                minHeight: 48,
                                color: 'var(--text-secondary)',
                                '&.Mui-selected': {
                                    color: '#0071e3',
                                },
                            }}
                        />
                    </Tabs>
                </Paper>

                <Paper
                    sx={{
                        p: 3,
                        borderRadius: '12px',
                        backgroundColor: 'var(--surface-primary)',
                    }}
                    className="glass-effect"
                >
                    {currentTab === 0 && <FinancialApprovals />}
                    {currentTab === 1 && <LegalBalance />}
                    {currentTab === 2 && <ActionPlans />}
                    {currentTab === 3 && <AccountStatus />}
                </Paper>
            </Container>
        </Box>
    );
};