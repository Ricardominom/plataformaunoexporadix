import React from 'react';
import {
    Box,
    Container,
    Grid,
    Typography,
} from '@mui/material';
import { LegalStatus } from '../components/toolbox/dashboardComponents/LegalStatus';
import { RecentAgreements } from '../components/toolbox/dashboardComponents/RecentAgreements';
import { TodosOverview } from '../components/toolbox/dashboardComponents/TodosOverview';
import { AccountStatus } from '../components/toolbox/dashboardComponents/AccountStatus';
import { AccountProgress } from '../components/toolbox/dashboardComponents/AccountProgress';
import { PendingApprovals } from '../components/toolbox/dashboardComponents/PendingApprovals';
import { ActionPlansProgress } from '../components/toolbox/dashboardComponents/ActionPlansProgress';
import { LeadsBoard } from '../components/toolbox/dashboardComponents/LeadsBoard';
import { useAuth } from '../context/AuthContext';

// Import mock data from centralized data module
import {
    accountProgress,
    actionPlans,
    legalStatus,
    agreements,
    todos,
    accountStatus,
} from '../data/dashboard';

export const PresidentToolbox: React.FC = () => {
    const { user } = useAuth();

    return (
        <Box sx={{
            pt: 'calc(var(--nav-height) + 24px)',
            pb: 4,
            px: { xs: 2, sm: 3, md: 4 },
            minHeight: '100vh',
            backgroundColor: 'var(--app-bg)',
        }}>
            <Container maxWidth="xl">
                <Box sx={{ mb: 4 }}>
                    <Typography
                        variant="h4"
                        sx={{
                            fontSize: '2rem',
                            fontWeight: 600,
                            color: 'var(--text-primary)',
                            mb: 1,
                        }}
                    >
                        Dashboard General
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: '1rem',
                            color: 'var(--text-secondary)',
                        }}
                    >
                        {user?.role}
                    </Typography>
                </Box>

                <Grid container spacing={3}>
                    <RecentAgreements agreements={agreements.agreements} />
                    <LegalStatus items={legalStatus.items} />
                    <PendingApprovals count={15} />
                    <TodosOverview todos={todos.todos} />
                    <AccountProgress accounts={accountProgress.accounts} />
                    <ActionPlansProgress plans={actionPlans.plans} />
                    <AccountStatus accounts={accountStatus.accounts} />
                    <LeadsBoard />
                </Grid>
            </Container>
        </Box>
    );
};