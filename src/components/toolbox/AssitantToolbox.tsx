import React from 'react';
import {
    Box,
    Container,
    Typography,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { DarkDashboard } from './dashboardComponents/DarkDashboard';

// Import mock data from centralized data module
import {
    accountProgress,
    actionPlans,
    legalStatus,
    agreements,
    todos,
    accountStatus,
} from '../../data/assistant';

export const AssistantToolbox: React.FC = () => {
    const { user } = useAuth();

    return (
        <Box sx={{
            pt: 'calc(var(--nav-height) + 24px)',
            pb: 4,
            px: { xs: 2, sm: 3, md: 4 },
            minHeight: '100vh',
            backgroundColor: '#121212', // Dark background
        }}>
            <Container maxWidth="xl">
                {/* Dark Dashboard Component */}
                <DarkDashboard 
                    accountProgress={accountProgress.accounts}
                    actionPlans={actionPlans.plans}
                    legalStatus={legalStatus.items}
                    agreements={agreements.agreements}
                    todos={todos.todos}
                    accountStatus={accountStatus.accounts}
                />
            </Container>
        </Box>
    );
};