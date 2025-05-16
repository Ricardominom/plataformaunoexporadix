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
            backgroundColor: theme === 'dark' ? '#121212' : '#f5f5f7', // Theme-aware background
            transition: 'background-color 0.3s ease',
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